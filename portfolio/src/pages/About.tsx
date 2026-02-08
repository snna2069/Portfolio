import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn, WordReveal, StaggerChildren, StaggerItem } from '../components/animations';
import { SkillCard, AboutGraphics } from '../components/ui';
import { personalInfo, skills } from '../data/portfolio';

interface AboutProps {
  hideCTA?: boolean;
}

// Static background shapes - no continuous animation for performance
const FloatingShape = ({
  className,
  size = 100,
}: {
  className?: string;
  size?: number;
}) => (
  <div
    className={`absolute rounded-full opacity-[0.03] ${className}`}
    style={{ width: size, height: size }}
  />
);

// Animated line decoration
const AnimatedLine = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent ${className}`}
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
  />
);

const About = ({ hideCTA = false }: AboutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingShape className="bg-gold left-[10%] top-[20%]" size={300} />
          <FloatingShape className="bg-[#1e3a5f] right-[15%] top-[40%]" size={200} />
          <FloatingShape className="bg-gold left-[60%] bottom-[20%]" size={150} />
        </div>

        {/* Parallax background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black-100/50 to-transparent"
          style={{ y: backgroundY }}
        />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div style={{ y: textY }}>
              {/* Animated label */}
              <motion.p
                className="text-gold text-sm tracking-[0.2em] uppercase mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                About
              </motion.p>

              {/* Name - scroll-triggered entrance */}
              <motion.h1
                className="text-display-md font-display text-cream mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {personalInfo.name}
              </motion.h1>

              {/* Title with character animation */}
              <motion.p
                className="text-gold/80 text-lg mb-6 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.4 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {personalInfo.title}
                </motion.span>
              </motion.p>

              {/* Bio with fade-in animation */}
              <motion.p
                className="text-cream/70 text-base leading-relaxed mb-4 text-justify"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                {personalInfo.bio}
              </motion.p>

              {/* Location with icon animation */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <motion.svg
                  className="w-4 h-4 text-gold"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.5, type: "spring" }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </motion.svg>
                <p className="text-cream/50">
                  Based in {personalInfo.location}
                </p>
              </motion.div>

            </motion.div>

            {/* Animated Profile Graphics */}
            <motion.div
              className="relative hidden lg:flex lg:items-center lg:justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <AboutGraphics />
            </motion.div>

            {/* Mobile Profile Image */}
            <FadeIn delay={0.3} direction="left" className="lg:hidden">
              <div className="relative flex justify-center">
                <motion.div
                  className="w-64 h-64 rounded-full overflow-hidden bg-[#f1f5f9] border-4 border-[#1e3a5f]/20 flex items-center justify-center shadow-xl shadow-[#1e3a5f]/10"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -3, 3, -2, 2, 0],
                    transition: {
                      rotate: {
                        duration: 0.6,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 0.3,
                      },
                    },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/sneha-profile.jpeg"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="hidden text-6xl font-display text-gold">SN</span>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Animated section divider */}
        <AnimatedLine className="absolute bottom-0 left-0 right-0" delay={1.5} />
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-black-100 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.03) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>

        <div className="container-custom relative z-10">
          {/* Section header */}
          <motion.p
            className="text-gold text-sm tracking-[0.2em] uppercase mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Expertise
          </motion.p>

          <motion.h2
            className="text-display-md font-display text-cream mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Skills & Technologies
          </motion.h2>

          {/* Skills grid with staggered animation */}
          <StaggerChildren stagger={0.05} delay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <StaggerItem key={skill.id}>
                <SkillCard skill={skill} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section (optional) */}
      {!hideCTA && (
        <section className="py-24 bg-black-100 relative overflow-hidden">
          {/* Static background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
            }}
          />

          <div className="container-custom text-center relative z-10">
            <motion.h2
              className="text-display-sm font-display text-cream mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <WordReveal text="Let's build something great together" />
            </motion.h2>

            <motion.p
              className="text-cream/60 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I'm currently available for internship or full-time opportunities.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/experience" className="btn-primary">
                  View Experience
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/projects" className="btn-outline">
                  View Projects
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
