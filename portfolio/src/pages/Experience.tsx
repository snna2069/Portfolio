import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/animations';
import { experiences } from '../data/portfolio';
import Timeline from '../components/Timeline';

const Experience = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <FadeIn>
            <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Career</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-display-lg font-display text-cream mb-6">
              Work Experience
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-cream/60 text-lg max-w-2xl">
              My professional journey and the roles that have shaped my career as a software developer.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Experience Roadmap Section (shared) */}
      <section className="pb-24">
        <div className="container-custom">
          <Timeline
            items={experiences}
            renderItem={(exp, index) => (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  className={`inline-block mb-4 ${index % 2 === 0 ? 'lg:float-right lg:ml-4' : 'lg:float-left lg:mr-4'}`}
                >
                  <span className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-full shadow-lg">
                    {exp.duration.split(' - ')[0]}
                  </span>
                </motion.div>

                <div className="clear-both" />

                <motion.div
                  className={`group relative glass rounded-2xl overflow-visible hover:shadow-2xl transition-all duration-500 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Floating image trigger - CSS based for reliability */}
                  {/* Images appear towards center: right side for left cards, left side for right cards */}
                  <style>{`
                    .group:hover .exp-floating-cloud-${index} {
                      opacity: 1 !important;
                      transform: translateY(-50%) translateX(0) scale(1) !important;
                    }
                  `}</style>
                  {exp.image && (
                    <div
                      className={`exp-floating-cloud-${index} absolute top-1/2 -translate-y-1/2 w-56 h-44 z-20 pointer-events-none hidden lg:block transition-all duration-500 ease-out ${
                        index % 2 === 0 ? '-right-64' : '-left-64'
                      }`}
                      style={{
                        opacity: 0,
                        transform: `translateY(-50%) translateX(${index % 2 === 0 ? '-40px' : '40px'}) scale(0.8)`,
                      }}
                    >
                      <div className="relative w-full h-full">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl transform scale-110" />
                        {/* Image container */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gold/40 shadow-2xl shadow-gold/20">
                          <img
                            src={exp.image}
                            alt={exp.company}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-display text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-gold font-medium mb-3">{exp.company}</p>
                    <p className="text-cream/60 text-sm mb-4">{exp.duration}</p>
                    <p className="text-cream/80 mb-6 text-left leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6 text-left">
                      <p className="text-cream/90 text-sm font-medium mb-3">Key Achievements</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-cream/70 text-sm">
                            <span className="text-gold mt-0.5">✓</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="text-left">
                      <p className="text-cream/90 text-sm font-medium mb-3">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-xs text-cream/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-gold/20 hover:border-gold/40 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black-100">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-display-sm font-display text-cream mb-6">
              Interested in working together?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-cream/60 mb-8 max-w-xl mx-auto">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link to="/projects" className="btn-outline">
                View Projects
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default Experience;
