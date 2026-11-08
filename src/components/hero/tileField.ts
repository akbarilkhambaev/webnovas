import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  Euler,
  ExtrudeGeometry,
  Fog,
  Group,
  InstancedMesh,
  Matrix4,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Plane,
  PMREMGenerator,
  PointLight,
  Quaternion,
  Raycaster,
  Scene,
  Shape,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap } from "gsap";

/*
 * Сцена первого экрана: поле глазурованных изразцов «звезда и крест» —
 * классическая среднеазиатская раскладка, где восьмиконечные звёзды и кресты
 * заполняют плоскость без пустот.
 *
 * При загрузке плитки слетаются и собираются в узор. Потом по полю идёт
 * медленная волна, плитки под курсором приподнимаются и ловят блик,
 * а при прокрутке поле наклоняется и уходит назад.
 */

export interface TileField {
  dispose: () => void;
}

interface TileFieldOptions {
  container: HTMLElement;
  reducedMotion: boolean;
}

/* ---------- Геометрия раскладки ---------- */

// Звезда из двух квадратов: внутренние вершины лежат на 0.7654 внешнего радиуса
const STAR_INNER_RATIO = 0.7654;
const S = Math.SQRT1_2; // 0.7071
const C = 1 - Math.SQRT1_2; // 0.2929

// Четверть контура креста, который заполняет промежуток между четырьмя звёздами
// (решётка звёзд с шагом 2R, крест в центре ячейки). Остальные три четверти — повороты на 90°.
const CROSS_QUARTER: ReadonlyArray<readonly [number, number]> = [
  [0, -1],
  [C, -S],
  [C, -C],
  [S, -C],
];

const LATTICE_R = 0.5; // шаг решётки = 1
const GROUT = 0.89; // плитки чуть меньше ячейки — остаётся шов
const BEVEL = 0.03;
const DEPTH = 0.07;

/* ---------- Цвета майолики ---------- */

// [цвет, доля]: в основном глубокая бирюза, изредка белая и золотая звезда
type Palette = ReadonlyArray<readonly [string, number]>;
const STAR_PALETTE: Palette = [
  ["#1A8F9C", 0.35],
  ["#22A9B5", 0.27],
  ["#3FD0D4", 0.2],
  ["#11707E", 0.09],
  ["#EDEAE3", 0.05],
  ["#E3B04B", 0.04],
];
const CROSS_PALETTE: Palette = [
  ["#14225A", 0.4],
  ["#1B2F7A", 0.35],
  ["#24409E", 0.25],
];

function pickColor(palette: Palette) {
  let r = Math.random();
  for (const [hex, share] of palette) {
    r -= share;
    if (r <= 0) return hex;
  }
  return palette[0][0];
}

// Дальние плитки уходят в цвет неба — так у поля появляется глубина
const FOG_COLOR = "#0E1640";

/* ---------- Движение ---------- */

const BASE_TILT = -0.92; // наклон поля «от зрителя»
const PATTERN_TURN = 0.36; // поворот узора в плоскости
const ASSEMBLE_WINDOW = 0.45; // доля общего времени сборки, за которую садится одна плитка
const RIPPLE_AMP = 0.06;
const RIPPLE_K = 0.9;
const RIPPLE_SPEED = 1.1;
const LIFT = 0.5;
const LIFT_SIGMA = 2.2;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (v: number) => 1 - (1 - v) ** 3;

function starShape(radius: number) {
  const shape = new Shape();
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    const r = i % 2 === 0 ? radius : radius * STAR_INNER_RATIO;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function crossShape(radius: number) {
  const shape = new Shape();
  let first = true;
  for (let q = 0; q < 4; q++) {
    const cos = Math.round(Math.cos((q * Math.PI) / 2));
    const sin = Math.round(Math.sin((q * Math.PI) / 2));
    for (const [x, y] of CROSS_QUARTER) {
      const px = (x * cos - y * sin) * radius;
      const py = (x * sin + y * cos) * radius;
      if (first) {
        shape.moveTo(px, py);
        first = false;
      } else {
        shape.lineTo(px, py);
      }
    }
  }
  shape.closePath();
  return shape;
}

function tileGeometry(shape: Shape) {
  const geometry = new ExtrudeGeometry(shape, {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: BEVEL,
    bevelSegments: 3,
    curveSegments: 1,
  });
  geometry.translate(0, 0, -DEPTH / 2);
  return geometry;
}

/** Данные плиток одного типа: базовая позиция, задержка сборки, откуда летит и как повёрнута в начале */
interface TileSet {
  mesh: InstancedMesh;
  count: number;
  base: Float32Array; // x, y
  scatter: Float32Array; // dx, dy, z, rx, ry, rz
  delay: Float32Array;
}

export function createTileField({ container, reducedMotion }: TileFieldOptions): TileField {
  /* ---------- Рендерер и сцена ---------- */

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  container.appendChild(canvas);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 0.35;
  scene.fog = new Fog(FOG_COLOR, 10, 20);

  const camera = new PerspectiveCamera(40, 1, 0.1, 100);

  const tilt = new Group();
  tilt.rotation.x = BASE_TILT;
  const pattern = new Group();
  pattern.rotation.z = PATTERN_TURN;
  tilt.add(pattern);
  scene.add(tilt);

  scene.add(new AmbientLight("#8FA6FF", 0.18));
  const key = new DirectionalLight("#FFE6BF", 1.6);
  key.position.set(-5, 6, 8);
  scene.add(key);
  const fill = new DirectionalLight("#6E8BFF", 0.5);
  fill.position.set(6, -4, 3);
  scene.add(fill);

  // Блик под курсором и золотой свет, который медленно ходит по полю
  const glint = new PointLight("#E9FEFF", 0, 4, 2);
  const sweep = new PointLight("#FFD27A", reducedMotion ? 0 : 3, 6, 2);
  pattern.add(glint, sweep);

  /* ---------- Плитки ---------- */

  const compact = window.innerWidth < 1024;
  const pixelsPerUnit = () =>
    window.innerWidth < 1024 ? 56 : Math.min(104, Math.max(72, window.innerWidth / 16));

  // Половина стороны поля в шагах решётки: с запасом, чтобы наклонённое поле закрывало кадр
  const span = Math.hypot(Math.max(window.innerWidth, container.clientWidth), Math.max(container.clientHeight, 360));
  const half = Math.min(compact ? 9 : 13, Math.ceil((span / pixelsPerUnit()) * 0.8) + 2);

  const material = new MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.32,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });

  const shapeRadius = LATTICE_R * GROUT - BEVEL;
  const starGeometry = tileGeometry(starShape(shapeRadius));
  const crossGeometry = tileGeometry(crossShape(shapeRadius));

  const color = new Color();

  function makeSet(positions: number[], geometry: ExtrudeGeometry, palette: Palette): TileSet {
    const count = positions.length / 2;
    const mesh = new InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    mesh.frustumCulled = false;

    const scatter = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 1.5 + Math.random() * 3.5;
      scatter[i * 6] = Math.cos(angle) * distance;
      scatter[i * 6 + 1] = Math.sin(angle) * distance;
      scatter[i * 6 + 2] = 3 + Math.random() * 5;
      scatter[i * 6 + 3] = (Math.random() - 0.5) * Math.PI * 2;
      scatter[i * 6 + 4] = (Math.random() - 0.5) * Math.PI * 2;
      scatter[i * 6 + 5] = (Math.random() - 0.5) * Math.PI;
      mesh.setColorAt(i, color.set(pickColor(palette)));
    }
    pattern.add(mesh);
    return { mesh, count, base: new Float32Array(positions), scatter, delay: new Float32Array(count) };
  }

  const starPositions: number[] = [];
  const crossPositions: number[] = [];
  for (let i = -half; i <= half; i++) {
    for (let j = -half; j <= half; j++) {
      starPositions.push(i, j);
      if (i < half && j < half) crossPositions.push(i + 0.5, j + 0.5);
    }
  }
  const sets = [
    makeSet(starPositions, starGeometry, STAR_PALETTE),
    makeSet(crossPositions, crossGeometry, CROSS_PALETTE),
  ];

  /* ---------- Точка фокуса и курсор ---------- */

  const raycaster = new Raycaster();
  const plane = new Plane();
  const ndc = new Vector2();
  const planeNormal = new Vector3();
  const planePoint = new Vector3();
  const hit = new Vector3();

  /** Точка экрана (NDC) → координаты в плоскости узора */
  function screenToPattern(x: number, y: number, out: Vector3) {
    raycaster.setFromCamera(ndc.set(x, y), camera);
    pattern.updateWorldMatrix(true, false);
    planeNormal.set(0, 0, 1).transformDirection(pattern.matrixWorld);
    planePoint.setFromMatrixPosition(pattern.matrixWorld);
    plane.setFromNormalAndCoplanarPoint(planeNormal, planePoint);
    if (!raycaster.ray.intersectPlane(plane, hit)) return false;
    out.copy(pattern.worldToLocal(hit));
    out.z = 0;
    return true;
  }

  // Откуда начинается сборка и расходится волна: на широком экране — справа от текста
  const focal = new Vector3();
  const focalScreen = () => (window.innerWidth < 1024 ? [0, 0.15] : [0.48, 0.08]);

  function assignDelays() {
    for (const set of sets) {
      let max = 0;
      for (let i = 0; i < set.count; i++) {
        const d = Math.hypot(set.base[i * 2] - focal.x, set.base[i * 2 + 1] - focal.y);
        set.delay[i] = d;
        if (d > max) max = d;
      }
      for (let i = 0; i < set.count; i++) {
        const jitter = (Math.random() - 0.5) * 0.08;
        set.delay[i] = clamp01(set.delay[i] / (max || 1) + jitter) * (1 - ASSEMBLE_WINDOW);
      }
    }
  }

  const pointer = { active: false, x: 0, y: 0, strength: 0 };
  const pointerLocal = new Vector3();
  const pointerTarget = new Vector3();

  function onPointerMove(event: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    pointer.active = inside;
    if (!inside) return;
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function onPointerLeave() {
    pointer.active = false;
  }

  /* ---------- Размер ---------- */

  let heroHeight = container.clientHeight;

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    heroHeight = height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const visibleHeight = height / pixelsPerUnit();
    const distance = visibleHeight / (2 * Math.tan((camera.fov * Math.PI) / 360));
    camera.position.set(0, 0, distance);
    camera.updateProjectionMatrix();
    const fog = scene.fog as Fog;
    fog.near = distance * 0.85;
    fog.far = distance * 1.9;
    const [fx, fy] = focalScreen();
    if (!screenToPattern(fx, fy, focal)) focal.set(0, 0, 0);
  }

  /* ---------- Кадр ---------- */

  const state = { assemble: reducedMotion ? 1 : 0 };
  const matrix = new Matrix4();
  const position = new Vector3();
  const quaternion = new Quaternion();
  const scale = new Vector3();
  const euler = new Euler();

  function update(time: number) {
    // Прокрутка: поле наклоняется и уходит вверх
    const scrolled = clamp01(window.scrollY / Math.max(1, heroHeight));
    tilt.rotation.x = BASE_TILT - scrolled * 0.45;
    tilt.position.y = scrolled * 1.2;

    // Курсор: плавно догоняем точку под указателем
    if (pointer.active && screenToPattern(pointer.x, pointer.y, pointerTarget)) {
      pointerLocal.lerp(pointerTarget, 0.14);
    }
    pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.06;

    glint.position.set(pointerLocal.x, pointerLocal.y, 0.9);
    glint.intensity = pointer.strength * 8;
    sweep.position.set(
      focal.x + Math.cos(time * 0.35) * 3.2,
      focal.y + Math.sin(time * 0.27) * 2.2,
      1.2
    );

    const ripple = reducedMotion ? 0 : RIPPLE_AMP;
    const strength = pointer.strength;

    for (const set of sets) {
      const { base, scatter, delay, mesh, count } = set;
      for (let i = 0; i < count; i++) {
        const bx = base[i * 2];
        const by = base[i * 2 + 1];
        const e = easeOutCubic(clamp01((state.assemble - delay[i]) / ASSEMBLE_WINDOW));
        const rest = 1 - e;

        // Волна от точки фокуса: высота и наклон по её склону
        const fx = bx - focal.x;
        const fy = by - focal.y;
        const d = Math.hypot(fx, fy) || 1e-4;
        const phase = d * RIPPLE_K - time * RIPPLE_SPEED;
        let z = ripple * Math.sin(phase);
        const slope = ripple * RIPPLE_K * Math.cos(phase);
        let mx = (slope * fx) / d;
        let my = (slope * fy) / d;

        // Бугор под курсором
        if (strength > 0.001) {
          const px = bx - pointerLocal.x;
          const py = by - pointerLocal.y;
          const lift = strength * LIFT * Math.exp(-(px * px + py * py) / LIFT_SIGMA);
          z += lift;
          mx += ((-2 * px) / LIFT_SIGMA) * lift;
          my += ((-2 * py) / LIFT_SIGMA) * lift;
        }

        const o = i * 6;
        position.set(bx + scatter[o] * rest, by + scatter[o + 1] * rest, z * e + scatter[o + 2] * rest);
        euler.set(my + scatter[o + 3] * rest, -mx + scatter[o + 4] * rest, scatter[o + 5] * rest);
        quaternion.setFromEuler(euler);
        const size = Math.sqrt(e);
        scale.set(size, size, size);
        matrix.compose(position, quaternion, scale);
        mesh.setMatrixAt(i, matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  function render(time = performance.now() / 1000) {
    update(time);
    renderer.render(scene, camera);
  }

  /* ---------- Цикл ---------- */

  let frame = 0;
  let inView = true;
  let disposed = false;

  const loop = () => {
    frame = 0;
    if (disposed || !inView || document.hidden) return;
    render();
    frame = requestAnimationFrame(loop);
  };

  const startLoop = () => {
    if (!reducedMotion && !frame && !disposed) frame = requestAnimationFrame(loop);
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (reducedMotion) render(0);
  });
  resizeObserver.observe(container);

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) startLoop();
  });
  intersectionObserver.observe(container);

  const onVisibility = () => {
    if (!document.hidden) startLoop();
  };
  document.addEventListener("visibilitychange", onVisibility);

  resize();
  assignDelays();

  let tween: gsap.core.Tween | null = null;
  if (reducedMotion) {
    render(0);
  } else {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    tween = gsap.to(state, { assemble: 1, duration: 2.8, ease: "power1.out", delay: 0.2 });
    startLoop();
  }

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      tween?.kill();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      for (const set of sets) set.mesh.dispose();
      starGeometry.dispose();
      crossGeometry.dispose();
      material.dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
