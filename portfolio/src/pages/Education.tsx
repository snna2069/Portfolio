import { Link } from 'react-router-dom';
import { FadeIn } from '../components/animations';
import { EducationCard } from '../components/ui';
import { education } from '../data/portfolio';
import Timeline from '../components/Timeline';

const Education = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <FadeIn>
            <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Background</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-display-lg font-display text-cream mb-6">
              Education
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-cream/60 text-lg max-w-2xl">
              My academic journey and the foundation that shaped my technical expertise.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Education Roadmap Section */}
      <section className="pb-24">
        <div className="container-custom">
          <Timeline
            items={education}
            renderItem={(edu, index) => (
              <EducationCard edu={edu} index={index} />
            )}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black-100">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-display-sm font-display text-cream mb-6">
              Want to see my work experience?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-cream/60 mb-8 max-w-xl mx-auto">
              Check out my professional experience and the projects I've worked on.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/experience" className="btn-primary">
                View Experience
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

export default Education;
