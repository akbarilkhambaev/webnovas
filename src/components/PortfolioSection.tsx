import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";

const PortfolioSection = () => {
  const { language, t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const projects = [
    {
      title: "AKFA-COMFORT.UZ",
      category: language === 'ru' ? 'Сайт-каталог' : 'Sayt-katalog',
      image: "/akfa-confort.png",
      link:"https://akfa-comfort.uz",
    },
    {
      title: "MELBOURNEMASTERWORKS.COM",
      category: language === 'ru' ? 'Сайт-каталог' : 'Sayt-katalog',
      image: "/melbourne.png",
      link:"https://melbournemasterworks.com",
    },
    {
      title: "AMUDAGRO.UZ",
      category: language === 'ru' ? 'Сайт-каталог' : 'Sayt-katalog',
      image: "/amudagro.png",
      link:"https://amudagro.uz",
    },
    {
      title: "DIVID.UZ",
      category: language === 'ru' ? 'Сайт-каталог' : 'Sayt-katalog',
      image: "/dividend.png",
      link:"https://divid-uz-2.vercel.app/",
    },
    {
      title: "AKFATERRACESYSTEMS.UZ",
      category: language === 'ru' ? 'Сайт-каталог' : 'Sayt-katalog',
      image: "/akfaterrace.png",
      link:"https://akbarilkhambaev.github.io/callcenter/",
    },
    {
      title: "GIJJA-STOP.UZ",
      category: language === 'ru' ? 'Лендинг' : 'Landing',
      image: "/giffastop.png",
      link:"http://gijastop.vercel.app/",
    },
  ];

  return (
    <section id="portfolio" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('portfolio.title')}</span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('portfolio.heading')} <span className="gradient-text">{t('portfolio.headingHighlight')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group glass rounded-2xl overflow-hidden hover-glow cursor-pointer scroll-reveal-scale ${inView ? 'active' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="px-6 py-3 rounded-full border-2 border-white text-white font-semibold text-sm tracking-wide hover:bg-white hover:text-black transition-colors duration-200"
                  >
                    {language === 'ru' ? 'Посетить сайт' : 'Saytga o\'tish'} →
                  </a>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="text-xl font-display font-semibold text-foreground mt-1">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
