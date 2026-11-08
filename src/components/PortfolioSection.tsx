import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import SectionHeader, { container } from "@/components/brand/SectionHeader";

const PortfolioSection = () => {
  const { language, t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const catalog = language === "ru" ? "Сайт-каталог" : "Sayt-katalog";
  const landing = language === "ru" ? "Лендинг" : "Lending";

  const projects = [
    { title: "akfa-comfort.uz", category: catalog, image: "/akfa-confort.png", link: "https://akfa-comfort.uz" },
    { title: "maxmudova.uz", category: landing, image: "/maxmudova.png", link: "http://maxmudova.uz/" },
    {
      title: "melbournemasterworks.com",
      category: catalog,
      image: "/melbourne.png",
      link: "https://melbournemasterworks.com",
    },
    { title: "amudagro.uz", category: catalog, image: "/amudagro.png", link: "https://amudagro.uz" },
    { title: "dividendgroup.uz", category: catalog, image: "/dividend.png", link: "https://dividendgroup.uz" },
    {
      title: "akfaterracesystems.uz",
      category: catalog,
      image: "/akfaterrace.png",
      // TODO: сейчас ведёт на GitHub Pages (callcenter) — заменить на рабочий адрес сайта
      link: "https://akbarilkhambaev.github.io/callcenter/",
    },
  ];

  return (
    <section id="portfolio" ref={ref} className={`${container} pt-[clamp(72px,9vw,128px)]`}>
      <div className={`scroll-reveal ${inView ? "active" : ""}`}>
        <SectionHeader
          index="02"
          label={t("home.labels.work")}
          title={t("home.work.heading")}
          sub={t("home.work.sub")}
        />
      </div>

      <ul className="border-b border-border">
        {projects.map((project, i) => (
          <li
            key={project.title}
            className={`border-t border-border scroll-reveal ${inView ? "active" : ""}`}
            style={{ transitionDelay: `${i * 0.06}s` }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="wn-row group flex flex-wrap items-center gap-x-8 gap-y-3 px-3 py-6"
            >
              <span className="w-10 font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="hidden h-16 w-28 rounded-md border border-border object-cover object-top opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:block"
              />
              <span className="min-w-0 flex-[1_1_360px] font-display text-[clamp(20px,3vw,40px)] tracking-[-0.02em] [overflow-wrap:anywhere]">
                {project.title}
              </span>
              <span className="flex-[0_1_200px] font-mono text-sm uppercase tracking-[0.04em] text-muted-foreground">
                {project.category}
              </span>
              <span className="sr-only">{t("home.work.visit")}</span>
              <ArrowUpRight
                size={28}
                aria-hidden="true"
                className="text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PortfolioSection;
