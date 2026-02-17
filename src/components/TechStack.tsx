import { useLanguage } from "@/hooks/useLanguage";
import { Progress } from "./ui/progress";
import { Code2, Database, Palette, Smartphone } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const TechStack = () => {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const technologies = [
    {
      category: language === 'ru' ? 'Frontend' : 'Frontend',
      icon: Code2,
      skills: [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Vue.js / Nuxt', level: 85 },
      ],
    },
    {
      category: language === 'ru' ? 'Backend' : 'Backend',
      icon: Database,
      skills: [
        { name: 'Node.js / Express', level: 90 },
        { name: 'Python / Django', level: 85 },
        { name: 'PostgreSQL / MongoDB', level: 90 },
        { name: 'REST / GraphQL APIs', level: 88 },
      ],
    },
    {
      category: language === 'ru' ? 'Дизайн' : 'Dizayn',
      icon: Palette,
      skills: [
        { name: 'UI/UX Design', level: 92 },
        { name: 'Figma / Adobe XD', level: 95 },
        { name: 'Responsive Design', level: 98 },
        { name: 'Prototyping', level: 88 },
      ],
    },
    {
      category: language === 'ru' ? 'Мобильная разработка' : 'Mobil dasturlash',
      icon: Smartphone,
      skills: [
        { name: 'React Native', level: 85 },
        { name: 'Flutter', level: 80 },
        { name: 'PWA', level: 90 },
        { name: 'Telegram Mini Apps', level: 92 },
      ],
    },
  ];

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 tech-grid opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t('techStack.title')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('techStack.heading')}{" "}
            <span className="gradient-text">{t('techStack.headingHighlight')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-8 hover-glow scroll-reveal ${inView ? 'active' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <tech.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-display font-bold">{tech.category}</h3>
              </div>

              <div className="space-y-4">
                {tech.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
