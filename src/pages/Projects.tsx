import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/animations';
import { projects } from '../data/portfolio';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <FadeIn>
            <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Portfolio</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-display-lg font-display text-cream mb-6">
              Projects
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-cream/60 text-lg max-w-2xl">
              A collection of projects that showcase my expertise in creative development,
              from immersive web experiences to scalable applications.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12">
        <div className="container-custom">
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-5 py-2 text-sm tracking-wide transition-all duration-300 rounded-full border ${
                    filter === category
                      ? 'bg-gold text-black border-gold'
                      : 'text-cream/70 border-[#1e3a5f]/15 hover:border-gold/50 hover:text-cream'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/projects/${project.id}`}
                    className="group block"
                    data-cursor="project"
                  >
                    <div className="image-container aspect-[4/3] rounded-lg overflow-hidden mb-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/90 via-[#1e3a5f]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-gold/80 text-xs tracking-wider uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-display text-cream mb-2 group-hover:text-gold transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-cream/50 text-sm line-clamp-2 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs text-cream/40 border border-[#1e3a5f]/10 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-1 text-xs text-cream/40">
                            +{project.techStack.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link to="/contact" className="btn-primary">
              Start a Project
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default Projects;
