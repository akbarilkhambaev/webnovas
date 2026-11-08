/** Цвета бренда для SVG (те же, что в index.css) */
export const C = {
  primary: "#3FD0D4",
  gold: "#E3B04B",
  border: "#262A33",
  line: "#2C313B",
  ivory: "#EDEAE3",
} as const;

interface StarMarkProps {
  size?: number;
  className?: string;
}

/** Знак WebNova: восьмиконечная звезда из двух квадратов */
const StarMark = ({ size = 28, className }: StarMarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="-15 -15 30 30"
    aria-hidden="true"
    className={className}
  >
    <rect x="-9" y="-9" width="18" height="18" fill="none" stroke={C.primary} strokeWidth="1.6" />
    <rect
      x="-9"
      y="-9"
      width="18"
      height="18"
      fill="none"
      stroke={C.gold}
      strokeWidth="1.6"
      transform="rotate(45)"
    />
    <circle cx="0" cy="0" r="2.6" fill={C.primary} />
  </svg>
);

export default StarMark;
