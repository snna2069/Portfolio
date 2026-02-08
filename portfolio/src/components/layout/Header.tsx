import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, personalInfo } from '../../data/portfolio';
import { useAnimation } from '../../context/AnimationContext';

// Separate NavItem component to ensure proper re-rendering
const NavItem = ({
  link,
  scrollspyPath,
  onScrollToSection,
}: {
  link: { name: string; path: string; sectionId?: string };
  scrollspyPath: string;
  onScrollToSection: (sectionId: string) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionId = link.sectionId || (link.path === '/' ? 'home' : link.path.replace('/#', ''));

  // Active state based on scrollspy
  const expectedPath = link.path === '/' ? '/' : `/${sectionId}`;
  const isActive = scrollspyPath === expectedPath || scrollspyPath === link.path;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      onScrollToSection(sectionId);
    }
  };

  return (
    <a
      href={link.path}
      onClick={handleClick}
      className={`relative text-sm tracking-wide uppercase transition-colors duration-300 cursor-pointer ${
        isActive
          ? 'text-gold font-semibold'
          : 'text-cream/60 hover:text-cream'
      }`}
    >
      {link.name}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
      )}
    </a>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollspyPath, setScrollspyPath] = useState('/');
  const { scrollTo } = useAnimation();

  const isHomePage = location.pathname === '/';

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Scrollspy: observe sections on the page and update scrollspyPath
  useEffect(() => {
    if (!isHomePage) {
      // If not on home page, set path based on current location
      setScrollspyPath(location.pathname);
      return;
    }

    setScrollspyPath('/');

    const sectionIds = navLinks.map((l) => l.sectionId || (l.path === '/' ? 'home' : l.path.replace('/#', '')));
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    // Track which sections are visible
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        // Find the section with highest visibility, preferring sections closer to top
        if (visibleSections.size > 0) {
          // Sort by intersection ratio, then by position in document
          const sortedSections = Array.from(visibleSections.entries())
            .sort((a, b) => {
              // If ratios are similar, prefer the one higher in the document
              if (Math.abs(a[1] - b[1]) < 0.1) {
                const aEl = document.getElementById(a[0]);
                const bEl = document.getElementById(b[0]);
                if (aEl && bEl) {
                  return aEl.getBoundingClientRect().top - bEl.getBoundingClientRect().top;
                }
              }
              return b[1] - a[1];
            });

          const topSection = sortedSections[0][0];
          const path = topSection === 'home' ? '/' : `/${topSection}`;
          setScrollspyPath(path);
        }
      },
      { root: null, rootMargin: '-20% 0px -20% 0px', threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHomePage, location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      transition: { type: 'spring', stiffness: 400, damping: 40 } as const,
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: { type: 'spring', stiffness: 20, restDelta: 2 } as const,
    },
  };

  const navItemVariants = {
    closed: { opacity: 0, y: 50 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <>
      <motion.header
        key={location.pathname}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-white/95 backdrop-blur-md border-b border-[#1e3a5f]/10 shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-50 group" onClick={() => scrollTo(0)}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl font-display font-medium text-cream group-hover:text-gold transition-colors">
                {personalInfo.name.split(' ')[0]}
              </span>
              <span className="text-gold">.</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavItem
                key={`${link.path}-${location.pathname}`}
                link={link}
                scrollspyPath={scrollspyPath}
                onScrollToSection={handleScrollToSection}
              />
            ))}
          </nav>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 w-12 h-12 flex items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <motion.span
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                className="w-full h-0.5 bg-cream origin-left"
              />
              <motion.span
                animate={{ opacity: isMenuOpen ? 0 : 1, x: isMenuOpen ? 20 : 0 }}
                className="w-full h-0.5 bg-cream"
              />
              <motion.span
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                className="w-full h-0.5 bg-cream origin-left"
              />
            </div>
          </button>

          {/* Contact Button (Desktop) */}
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              } else {
                handleScrollToSection('contact');
              }
            }}
            className="hidden md:block btn-outline text-xs cursor-pointer"
          >
            Let's Talk
          </a>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-black-100 md:hidden"
          >
            <div className="h-full flex flex-col items-center justify-center">
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, i) => {
                  const sectionId = link.sectionId || (link.path === '/' ? 'home' : link.path.replace('/#', ''));
                  const expectedPath = link.path === '/' ? '/' : `/${sectionId}`;
                  const isActive = scrollspyPath === expectedPath || scrollspyPath === link.path;

                  return (
                    <motion.div
                      key={link.path}
                      custom={i}
                      variants={navItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <a
                        href={link.path}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMenuOpen(false);

                          if (location.pathname !== '/') {
                            navigate('/');
                            setTimeout(() => {
                              const el = document.getElementById(sectionId);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                          } else {
                            const el = document.getElementById(sectionId);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className={`text-4xl font-display transition-colors cursor-pointer ${
                          isActive
                            ? 'text-gold font-semibold'
                            : 'text-cream/70 hover:text-cream'
                        }`}
                      >
                        {link.name}
                      </a>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Social Links in Mobile Menu */}
              <motion.div
                variants={navItemVariants}
                custom={navLinks.length}
                initial="closed"
                animate="open"
                className="mt-16 flex gap-6"
              >
                <a href="https://github.com/snna2069" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/snehan-raju" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold transition-colors">
                  LinkedIn
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
