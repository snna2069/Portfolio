import React, { useRef, useState, useEffect, FormEvent } from 'react';
import Timeline from '../components/Timeline';
import About from './About';
import { motion, useScroll, useTransform } from 'framer-motion';
import Icon from '../components/ui/Icon';
import { FadeIn, WordReveal } from '../components/animations';
import { personalInfo, projects, education, experiences, socialLinks } from '../data/portfolio';

// Animated button wrapper
const AnimatedButton = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {children}
  </motion.div>
);

// Animated tagline - smooth wave entrance + continuous wave motion
const AnimatedTagline = ({ text }: { text: string }) => {
  const words = text.split(' ');

  return (
    <motion.span
      className="inline-flex flex-wrap justify-center gap-x-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            animation: `taglineWave 2.5s ease-in-out ${2 + index * 0.15}s infinite`,
          }}
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8 + index * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

// Social icons for contact section
const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  mail: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

// Contact Section Component
const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-black-100 relative overflow-hidden">
      {/* Static background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,95,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Contact</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-display-md font-display text-cream mb-6">
              Let's Talk
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-cream/60 text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.3}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-cream/70 text-sm mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-br from-white via-[#fafbfe] to-[#f0f4f8] border border-[#1e3a5f]/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors shadow-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-cream/70 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-br from-white via-[#fafbfe] to-[#f0f4f8] border border-[#1e3a5f]/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors shadow-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-cream/70 text-sm mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gradient-to-br from-white via-[#fafbfe] to-[#f0f4f8] border border-[#1e3a5f]/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors shadow-sm"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-cream/70 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gradient-to-br from-white via-[#fafbfe] to-[#f0f4f8] border border-[#1e3a5f]/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors shadow-sm resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.p>
                )}
              </form>
            </FadeIn>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.4}>
              <div className="glass p-8 rounded-lg mb-8">
                <h3 className="text-xl font-display text-cream mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-cream/40 text-sm mb-1">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-cream hover:text-gold transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-cream/40 text-sm mb-1">Phone</p>
                    <a
                      href="tel:+17207618618"
                      className="text-cream hover:text-gold transition-colors"
                    >
                      +1 (720) 761-8618
                    </a>
                  </div>

                  <div>
                    <p className="text-cream/40 text-sm mb-1">Location</p>
                    <p className="text-cream">{personalInfo.location}</p>
                  </div>

                  <div>
                    <p className="text-cream/40 text-sm mb-1">Availability</p>
                    <p className="text-gold">{personalInfo.availability}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass p-8 rounded-lg">
                <h3 className="text-xl font-display text-cream mb-6">
                  Connect With Me
                </h3>

                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-cream/70 hover:text-gold hover:border-gold/30 transition-colors"
                    >
                      {socialIcons[social.icon]}
                      <span className="text-sm">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

// Unique cartoon-style illustrations for each project
const ProjectIllustration = ({ projectId }: { projectId: string }) => {
  switch (projectId) {
    case 'project-1': // MindBloom - Mental Health Journal
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full">
          <defs>
            <linearGradient id="p1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0fdf4"/><stop offset="100%" stopColor="#dcfce7"/>
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#p1-bg)"/>
          <rect x="210" y="65" width="140" height="185" rx="8" fill="white" stroke="#16a34a" strokeWidth="2.5"/>
          <line x1="235" y1="100" x2="325" y2="100" stroke="#d4d4d8" strokeWidth="2"/>
          <line x1="235" y1="125" x2="315" y2="125" stroke="#d4d4d8" strokeWidth="2"/>
          <line x1="235" y1="150" x2="305" y2="150" stroke="#d4d4d8" strokeWidth="2"/>
          <line x1="235" y1="175" x2="320" y2="175" stroke="#d4d4d8" strokeWidth="2"/>
          <line x1="235" y1="200" x2="310" y2="200" stroke="#d4d4d8" strokeWidth="2"/>
          <circle cx="300" cy="350" r="32" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
          <circle cx="289" cy="343" r="3.5" fill="#713f12"/>
          <circle cx="311" cy="343" r="3.5" fill="#713f12"/>
          <path d="M287 360 Q300 372 313 360" stroke="#713f12" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M430 350 C430 300 440 250 450 210" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <ellipse cx="458" cy="205" rx="16" ry="10" fill="#4ade80" transform="rotate(-30,458,205)"/>
          <ellipse cx="442" cy="250" rx="13" ry="8" fill="#86efac" transform="rotate(25,442,250)"/>
          <ellipse cx="460" cy="175" rx="11" ry="7" fill="#bbf7d0" transform="rotate(-50,460,175)"/>
          <circle cx="450" cy="165" r="6" fill="#fbbf24" opacity="0.7"/>
          <path d="M150 140 C150 126 165 120 173 134 C181 120 196 126 196 140 C196 160 173 175 173 175 C173 175 150 160 150 140Z" fill="#fb7185" opacity="0.5"/>
          <circle cx="100" cy="350" r="5" fill="#16a34a" opacity="0.15"/>
          <circle cx="120" cy="320" r="3" fill="#16a34a" opacity="0.1"/>
          <circle cx="500" cy="100" r="4" fill="#16a34a" opacity="0.12"/>
        </svg>
      );
    case 'project-2': // SemEval - NLP/Transformers
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full">
          <defs>
            <linearGradient id="p2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eff6ff"/><stop offset="100%" stopColor="#dbeafe"/>
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#p2-bg)"/>
          <path d="M250 120 C250 90 280 70 310 80 C330 60 370 65 380 90 C410 85 430 110 420 140 C440 155 435 185 415 195 C420 220 400 240 375 235 C365 260 330 265 310 250 C290 265 255 260 245 235 C220 240 200 220 205 195 C185 185 180 155 200 140 C190 110 210 85 250 120Z" fill="none" stroke="#2563eb" strokeWidth="2.5"/>
          <circle cx="280" cy="140" r="6" fill="#3b82f6"/>
          <circle cx="340" cy="130" r="6" fill="#3b82f6"/>
          <circle cx="310" cy="180" r="6" fill="#3b82f6"/>
          <circle cx="260" cy="190" r="6" fill="#3b82f6"/>
          <circle cx="360" cy="185" r="6" fill="#3b82f6"/>
          <circle cx="310" cy="230" r="6" fill="#3b82f6"/>
          <line x1="280" y1="140" x2="340" y2="130" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
          <line x1="280" y1="140" x2="310" y2="180" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
          <line x1="340" y1="130" x2="310" y2="180" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
          <line x1="260" y1="190" x2="310" y2="180" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
          <line x1="360" y1="185" x2="310" y2="180" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
          <line x1="310" y1="180" x2="310" y2="230" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
          <rect x="140" y="300" width="100" height="120" rx="6" fill="white" stroke="#2563eb" strokeWidth="2"/>
          <line x1="160" y1="330" x2="220" y2="330" stroke="#93c5fd" strokeWidth="2"/>
          <line x1="160" y1="350" x2="210" y2="350" stroke="#93c5fd" strokeWidth="2"/>
          <line x1="160" y1="370" x2="215" y2="370" stroke="#93c5fd" strokeWidth="2"/>
          <line x1="160" y1="390" x2="200" y2="390" stroke="#93c5fd" strokeWidth="2"/>
          <circle cx="440" cy="330" r="35" fill="none" stroke="#2563eb" strokeWidth="3"/>
          <line x1="465" y1="355" x2="490" y2="380" stroke="#2563eb" strokeWidth="4" strokeLinecap="round"/>
          <text x="425" y="340" fontSize="20" fill="#3b82f6" fontFamily="monospace" fontWeight="bold">AI</text>
          <path d="M500 100 L503 110 L513 113 L503 116 L500 126 L497 116 L487 113 L497 110Z" fill="#8b5cf6" opacity="0.5"/>
          <path d="M130 200 L132 207 L139 209 L132 211 L130 218 L128 211 L121 209 L128 207Z" fill="#8b5cf6" opacity="0.4"/>
        </svg>
      );
    case 'project-3': // Data Mining
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full">
          <defs>
            <linearGradient id="p3-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/>
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#p3-bg)"/>
          <rect x="100" y="270" width="35" height="110" rx="4" fill="#f59e0b" opacity="0.7"/>
          <rect x="150" y="230" width="35" height="150" rx="4" fill="#d97706" opacity="0.7"/>
          <rect x="200" y="190" width="35" height="190" rx="4" fill="#b45309" opacity="0.7"/>
          <rect x="250" y="250" width="35" height="130" rx="4" fill="#f59e0b" opacity="0.7"/>
          <rect x="300" y="170" width="35" height="210" rx="4" fill="#d97706" opacity="0.7"/>
          <line x1="85" y1="380" x2="350" y2="380" stroke="#92400e" strokeWidth="2"/>
          <line x1="85" y1="380" x2="85" y2="160" stroke="#92400e" strokeWidth="2"/>
          <path d="M117 270 L167 230 L217 190 L267 250 L317 170" stroke="#0891b2" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="6 4"/>
          <circle cx="470" cy="180" r="60" fill="#fbbf24" opacity="0.6"/>
          <path d="M470 180 L470 120 A60 60 0 0 1 522 210Z" fill="#0891b2" opacity="0.6"/>
          <path d="M470 180 L522 210 A60 60 0 0 1 430 228Z" fill="#f97316" opacity="0.6"/>
          <circle cx="460" cy="350" r="30" fill="none" stroke="#92400e" strokeWidth="2.5"/>
          <line x1="481" y1="371" x2="505" y2="395" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="450" cy="342" r="3" fill="#d97706"/>
          <circle cx="465" cy="355" r="3" fill="#d97706"/>
          <circle cx="458" cy="340" r="3" fill="#d97706"/>
          <circle cx="470" cy="348" r="3" fill="#d97706"/>
          <circle cx="160" cy="120" r="20" fill="none" stroke="#92400e" strokeWidth="2.5" opacity="0.4"/>
          <circle cx="160" cy="120" r="8" fill="none" stroke="#92400e" strokeWidth="2" opacity="0.4"/>
        </svg>
      );
    case 'project-4': // Course Experience Exchange
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full">
          <defs>
            <linearGradient id="p4-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f9ff"/><stop offset="100%" stopColor="#e0f2fe"/>
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#p4-bg)"/>
          <rect x="160" y="90" width="280" height="180" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
          <rect x="175" y="105" width="250" height="150" rx="4" fill="white"/>
          <path d="M120 270 L480 270 L460 300 L140 300Z" fill="#334155"/>
          <rect x="190" y="120" width="105" height="55" rx="4" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1"/>
          <rect x="305" y="120" width="105" height="55" rx="4" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1"/>
          <rect x="190" y="185" width="105" height="55" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="1"/>
          <rect x="305" y="185" width="105" height="55" rx="4" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="1"/>
          <polygon points="220,135 223,143 232,143 225,148 227,157 220,152 213,157 215,148 208,143 217,143" fill="#f59e0b" opacity="0.8"/>
          <polygon points="240,135 243,143 252,143 245,148 247,157 240,152 233,157 235,148 228,143 237,143" fill="#f59e0b" opacity="0.8"/>
          <polygon points="260,135 263,143 272,143 265,148 267,157 260,152 253,157 255,148 248,143 257,143" fill="#f59e0b" opacity="0.8"/>
          <rect x="420" y="130" width="120" height="60" rx="10" fill="white" stroke="#0284c7" strokeWidth="2"/>
          <line x1="440" y1="150" x2="520" y2="150" stroke="#bae6fd" strokeWidth="2"/>
          <line x1="440" y1="165" x2="500" y2="165" stroke="#bae6fd" strokeWidth="2"/>
          <polygon points="430,190 445,190 430,205" fill="white" stroke="#0284c7" strokeWidth="2" strokeLinejoin="round"/>
          <polygon points="100,200 140,180 180,200 140,220" fill="#0284c7" opacity="0.6"/>
          <line x1="140" y1="200" x2="140" y2="240" stroke="#0284c7" strokeWidth="2" opacity="0.6"/>
          <rect x="130" y="240" width="20" height="5" rx="2" fill="#0284c7" opacity="0.6"/>
          <rect x="80" y="340" width="80" height="60" rx="4" fill="white" stroke="#0284c7" strokeWidth="2"/>
          <line x1="120" y1="340" x2="120" y2="400" stroke="#0284c7" strokeWidth="2"/>
          <line x1="90" y1="360" x2="115" y2="360" stroke="#bae6fd" strokeWidth="1.5"/>
          <line x1="90" y1="375" x2="110" y2="375" stroke="#bae6fd" strokeWidth="1.5"/>
        </svg>
      );
    case 'project-5': // Women Safety System (IEEE Publication)
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full">
          <defs>
            <linearGradient id="p5-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdf2f8"/><stop offset="100%" stopColor="#fce7f3"/>
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#p5-bg)"/>
          <path d="M300 60 L380 95 L380 190 C380 260 300 310 300 310 C300 310 220 260 220 190 L220 95Z" fill="white" stroke="#db2777" strokeWidth="3"/>
          <path d="M300 90 L355 115 L355 190 C355 240 300 278 300 278 C300 278 245 240 245 190 L245 115Z" fill="#fce7f3"/>
          <path d="M300 150 C300 150 330 175 330 195 C330 212 316 225 300 225 C284 225 270 212 270 195 C270 175 300 150 300 150Z" fill="#db2777" opacity="0.7"/>
          <circle cx="300" cy="195" r="10" fill="white"/>
          <rect x="110" y="330" width="120" height="50" rx="25" fill="none" stroke="#1e3a5f" strokeWidth="3"/>
          <rect x="145" y="340" width="50" height="30" rx="4" fill="#1e3a5f"/>
          <circle cx="170" cy="355" r="6" fill="#22c55e"/>
          <path d="M405 200 C420 185 420 165 405 150" stroke="#db2777" strokeWidth="2.5" fill="none" opacity="0.6"/>
          <path d="M420 210 C445 185 445 155 420 130" stroke="#db2777" strokeWidth="2.5" fill="none" opacity="0.4"/>
          <path d="M435 220 C470 185 470 145 435 110" stroke="#db2777" strokeWidth="2.5" fill="none" opacity="0.2"/>
          <rect x="440" y="300" width="60" height="100" rx="8" fill="white" stroke="#1e3a5f" strokeWidth="2"/>
          <rect x="448" y="315" width="44" height="65" rx="2" fill="#e0f2fe"/>
          <circle cx="470" cy="390" r="5" fill="none" stroke="#1e3a5f" strokeWidth="1.5"/>
          <text x="452" y="355" fontSize="14" fill="#ef4444" fontWeight="bold" fontFamily="sans-serif">SOS</text>
          <line x1="170" y1="270" x2="170" y2="285" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="170" cy="290" r="2" fill="#f59e0b"/>
          <polygon points="170,255 155,285 185,285" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      );
    case 'project-6': // Dimensionality Reduction with PCA on Handwritten Digits
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full">
          <defs>
            <linearGradient id="p6-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5f3ff"/><stop offset="100%" stopColor="#ede9fe"/>
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#p6-bg)"/>
          {/* 8x8 pixel grid representing a handwritten digit */}
          {[0,1,2,3,4,5,6,7].map(r => [0,1,2,3,4,5,6,7].map(c => {
            const digitPattern = [
              [0,0,1,1,1,1,0,0],
              [0,1,1,0,0,1,1,0],
              [0,1,0,0,0,0,1,0],
              [0,0,0,0,0,1,1,0],
              [0,0,0,1,1,1,0,0],
              [0,0,1,1,0,0,0,0],
              [0,1,1,0,0,0,0,0],
              [0,1,1,1,1,1,1,0],
            ];
            const filled = digitPattern[r][c];
            return <rect key={`${r}-${c}`} x={100 + c * 22} y={80 + r * 22} width="20" height="20" rx="2" fill={filled ? '#7c3aed' : '#e9e5f5'} opacity={filled ? 0.75 : 0.4} stroke="#c4b5fd" strokeWidth="0.5"/>;
          }))}
          {/* Arrow showing dimensionality reduction */}
          <path d="M310 170 L370 170" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowP6)"/>
          <defs>
            <marker id="arrowP6" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#7c3aed"/>
            </marker>
          </defs>
          {/* Compressed representation - smaller grid */}
          {[0,1,2,3].map(r => [0,1,2,3].map(c => {
            const compPattern = [[1,1,0,0],[0,1,1,0],[1,0,1,1],[0,1,0,1]];
            const filled = compPattern[r][c];
            return <rect key={`c${r}-${c}`} x={390 + c * 22} y={120 + r * 22} width="20" height="20" rx="2" fill={filled ? '#7c3aed' : '#e9e5f5'} opacity={filled ? 0.6 : 0.3} stroke="#c4b5fd" strokeWidth="0.5"/>;
          }))}
          <text x="390" y="240" fontSize="11" fill="#7c3aed" fontFamily="monospace" opacity="0.7">25 PCs</text>
          {/* Eigenvalue bar chart */}
          <line x1="100" y1="380" x2="280" y2="380" stroke="#6d28d9" strokeWidth="1.5" opacity="0.5"/>
          <line x1="100" y1="380" x2="100" y2="290" stroke="#6d28d9" strokeWidth="1.5" opacity="0.5"/>
          <rect x="110" y="300" width="14" height="80" rx="2" fill="#7c3aed" opacity="0.8"/>
          <rect x="130" y="320" width="14" height="60" rx="2" fill="#7c3aed" opacity="0.65"/>
          <rect x="150" y="335" width="14" height="45" rx="2" fill="#7c3aed" opacity="0.5"/>
          <rect x="170" y="348" width="14" height="32" rx="2" fill="#a78bfa" opacity="0.5"/>
          <rect x="190" y="356" width="14" height="24" rx="2" fill="#a78bfa" opacity="0.4"/>
          <rect x="210" y="362" width="14" height="18" rx="2" fill="#c4b5fd" opacity="0.4"/>
          <rect x="230" y="366" width="14" height="14" rx="2" fill="#c4b5fd" opacity="0.35"/>
          <rect x="250" y="370" width="14" height="10" rx="2" fill="#ddd6fe" opacity="0.35"/>
          <text x="120" y="400" fontSize="10" fill="#6d28d9" fontFamily="monospace" opacity="0.5">eigenvalues</text>
          {/* Scatter plot showing 2D projection */}
          <rect x="380" y="280" width="160" height="130" rx="6" fill="white" stroke="#c4b5fd" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="410" cy="320" r="4" fill="#7c3aed" opacity="0.7"/>
          <circle cx="425" cy="335" r="4" fill="#7c3aed" opacity="0.6"/>
          <circle cx="440" cy="310" r="4" fill="#7c3aed" opacity="0.7"/>
          <circle cx="415" cy="350" r="4" fill="#7c3aed" opacity="0.5"/>
          <circle cx="490" cy="370" r="4" fill="#db2777" opacity="0.6"/>
          <circle cx="505" cy="355" r="4" fill="#db2777" opacity="0.7"/>
          <circle cx="510" cy="380" r="4" fill="#db2777" opacity="0.5"/>
          <circle cx="480" cy="360" r="4" fill="#db2777" opacity="0.6"/>
          <circle cx="455" cy="340" r="4" fill="#f59e0b" opacity="0.6"/>
          <circle cx="465" cy="325" r="4" fill="#f59e0b" opacity="0.6"/>
          <circle cx="450" cy="360" r="4" fill="#f59e0b" opacity="0.5"/>
          <text x="420" y="405" fontSize="10" fill="#6d28d9" fontFamily="monospace" opacity="0.5">PC1 vs PC2</text>
          {/* Label */}
          <text x="100" y="70" fontSize="13" fill="#6d28d9" fontFamily="monospace" opacity="0.5">64D input</text>
          <text x="390" y="110" fontSize="13" fill="#6d28d9" fontFamily="monospace" opacity="0.5">reduced</text>
        </svg>
      );
    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] flex items-center justify-center rounded-lg">
          <svg viewBox="0 0 100 100" className="w-20 h-20 opacity-20">
            <text x="20" y="65" fontSize="40" fill="#1e3a5f" fontFamily="monospace">{'</>'}</text>
          </svg>
        </div>
      );
  }
};

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [activeFilter, setActiveFilter] = useState('All');
  const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Experience image popup: DOM-only scroll-aware hover (no React re-renders)
  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let rafId = 0;
    let prevHovered: HTMLElement | null = null;

    const check = () => {
      rafId = 0;
      if (mouseX === 0 && mouseY === 0) return;
      const el = document.elementFromPoint(mouseX, mouseY);
      const card = el?.closest('[data-exp-index]') as HTMLElement | null;
      if (card !== prevHovered) {
        prevHovered?.removeAttribute('data-exp-hovered');
        card?.setAttribute('data-exp-hovered', '');
        prevHovered = card;
      }
    };

    const scheduleCheck = () => {
      if (!rafId) rafId = requestAnimationFrame(check);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', scheduleCheck, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', scheduleCheck);
      if (rafId) cancelAnimationFrame(rafId);
      prevHovered?.removeAttribute('data-exp-hovered');
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background - Clean white with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9]" />

        {/* Static decorative shapes - no animation on blurred elements for performance */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1e3a5f] rounded-full blur-[150px] opacity-[0.04]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#e63946] rounded-full blur-[150px] opacity-[0.03]" />
        </div>

        {/* Animated geometric background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'radial-gradient(circle, #1e3a5f 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Accent lines */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.1, scaleX: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent"
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.08, scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#cbd5e1] to-transparent"
          />
          {/* Floating geometric shapes - CSS transform animations only for performance */}
          <div className="absolute top-[12%] left-[8%] w-16 h-16 border-2 border-[#1e3a5f]/[0.08] rounded-lg rotate-45" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div className="absolute top-[60%] right-[10%] w-14 h-14 border-2 border-[#e63946]/[0.06] rounded-full" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
          <div className="absolute top-[28%] right-[20%] w-8 h-8 bg-[#1e3a5f]/[0.04] rounded-full" style={{ animation: 'float 9s ease-in-out infinite 1s' }} />
          <div className="absolute bottom-[25%] left-[15%] w-20 h-20 border border-[#1e3a5f]/[0.06] rounded-xl rotate-12" style={{ animation: 'float 11s ease-in-out infinite 3s' }} />
          <div className="absolute top-[72%] left-[40%] w-6 h-6 bg-[#e63946]/[0.04] rounded-full" style={{ animation: 'float 7s ease-in-out infinite 1.5s' }} />
          <div className="absolute top-[42%] right-[30%] w-10 h-10 border border-[#1e3a5f]/[0.05] rounded-full" style={{ animation: 'float 8s ease-in-out infinite 4s' }} />
          <div className="absolute bottom-[15%] right-[35%] w-12 h-12 border border-[#1e3a5f]/[0.07] rounded-lg rotate-[30deg]" style={{ animation: 'float 9s ease-in-out infinite 2.5s' }} />
          {/* Decorative SVG shapes */}
          <svg className="absolute top-[18%] left-[28%] w-40 h-40 opacity-[0.04]" style={{ animation: 'float 12s ease-in-out infinite 2s' }}>
            <circle cx="80" cy="80" r="60" stroke="#1e3a5f" strokeWidth="1" fill="none" />
            <circle cx="80" cy="80" r="40" stroke="#1e3a5f" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute bottom-[10%] right-[18%] w-32 h-32 opacity-[0.04]" style={{ animation: 'float 10s ease-in-out infinite 1s' }}>
            <polygon points="64,10 118,50 100,110 28,110 10,50" stroke="#1e3a5f" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container-custom text-center"
        >
          {/* Intro text */}
          <FadeIn delay={0.2}>
            <p className="text-gold/80 text-sm md:text-base tracking-[0.3em] uppercase mb-6">
              {personalInfo.title}
            </p>
          </FadeIn>

          {/* Main heading */}
          <div className="mb-8">
            <h1 className="text-display-lg font-display text-cream mb-4 name-glow">
              <WordReveal text={personalInfo.name} delay={0.4} />
            </h1>
            <p className="text-display-sm font-display text-cream/60">
              <AnimatedTagline text={personalInfo.tagline} />
            </p>
          </div>

          {/* CTA Buttons */}
          <FadeIn delay={1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <AnimatedButton>
                <a
                  href="/#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="btn-primary cursor-pointer"
                >
                  View My Work
                </a>
              </AnimatedButton>
              <AnimatedButton>
                <a href="/SnehaNagaraju_Resume.pdf" download className="group btn-outline inline-flex items-center justify-center" aria-label="Download Resume">
                  <span
                    className="text-gold group-hover:text-white transition-colors duration-200"
                  >
                    <Icon name="download" className="w-5 h-5" />
                  </span>
                  <span className="ml-2">Resume</span>
                </a>
              </AnimatedButton>
              <AnimatedButton>
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="btn-outline cursor-pointer"
                >
                  Get in Touch
                </a>
              </AnimatedButton>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* About (full) - reuse About page content (hide About CTA on Home) */}
      <section id="about">
        <About hideCTA />
      </section>

      {/* Education Roadmap Preview (shared) */}
      <section id="education" className="section-padding relative overflow-hidden">
        {/* Animated decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#1e3a5f]/5 blur-3xl opacity-40" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gold/[0.04] blur-3xl opacity-30" />
          {/* Floating bubbles and shapes */}
          <div className="absolute top-[10%] right-[5%] w-14 h-14 border border-[#1e3a5f]/[0.08] rounded-full" style={{ animation: 'float 9s ease-in-out infinite' }} />
          <div className="absolute bottom-[15%] left-[4%] w-16 h-16 border border-gold/[0.06] rounded-full" style={{ animation: 'float 11s ease-in-out infinite 2s' }} />
          <div className="absolute top-[45%] right-[3%] w-8 h-8 bg-[#1e3a5f]/[0.05] rounded-full" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
          <div className="absolute top-[30%] left-[6%] w-10 h-10 border border-[#1e3a5f]/[0.06] rounded-full" style={{ animation: 'float 10s ease-in-out infinite 3s' }} />
          <div className="absolute top-[65%] right-[12%] w-6 h-6 bg-[#1e3a5f]/[0.04] rounded-full" style={{ animation: 'float 7s ease-in-out infinite 0.5s' }} />
          <div className="absolute top-[20%] left-[20%] w-12 h-12 border border-[#1e3a5f]/[0.05] rounded-full" style={{ animation: 'float 12s ease-in-out infinite 4s' }} />
          <div className="absolute bottom-[30%] right-[25%] w-5 h-5 bg-gold/[0.04] rounded-full" style={{ animation: 'float 8s ease-in-out infinite 2.5s' }} />
          <div className="absolute top-[75%] left-[15%] w-9 h-9 border border-gold/[0.05] rounded-full" style={{ animation: 'float 9s ease-in-out infinite 1.5s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p
                className="text-gold text-sm tracking-[0.2em] uppercase mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Background
              </motion.p>
              <motion.h2
                className="text-display-md font-display text-cream"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Education
              </motion.h2>
            </div>
          </div>

          <Timeline
            items={education}
            renderItem={(edu: any, index: number) => (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  className={`inline-block mb-3 ${index % 2 === 0 ? 'lg:float-right lg:ml-4' : 'lg:float-left lg:mr-4'}`}
                >
                  <span className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs font-medium rounded-full shadow-lg">
                    {edu.duration.split(' - ')[0]}
                  </span>
                </motion.div>

                <div className="clear-both" />

                <div className={`glass rounded-2xl hover:shadow-xl transition-shadow duration-300 overflow-hidden ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
                  {/* Education Image */}
                  {edu.image && (
                    <div className="w-full h-40 overflow-hidden">
                      <img
                        src={edu.image}
                        alt={edu.institution}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-display text-cream mb-1.5">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gold font-medium text-sm mb-2">{edu.institution}</p>
                    <p className="text-cream/60 text-xs mb-3">{edu.duration}</p>
                    <p className="text-cream/70 text-sm mb-5 text-left">{edu.description}</p>

                  {edu.achievements.length > 0 && (
                    <div className="mb-5 text-left">
                      <p className="text-cream/80 text-xs font-medium mb-2">Achievements</p>
                      <ul className="space-y-1.5">
                        {edu.achievements.map((achievement: string | { text: string; link?: string; linkText?: string }, i: number) => {
                          const isObject = typeof achievement === 'object';
                          const text = isObject ? achievement.text : achievement;
                          const link = isObject ? achievement.link : undefined;
                          const linkText = isObject ? achievement.linkText : undefined;

                          // Render achievement with partial link (only linkText is clickable)
                          const renderAchievementText = () => {
                            if (link && linkText && text.includes(linkText)) {
                              const parts = text.split(linkText);
                              return (
                                <span>
                                  {parts[0]}
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 hover:text-gold transition-colors"
                                  >
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <span className="underline underline-offset-2">{linkText}</span>
                                  </a>
                                  {parts[1]}
                                </span>
                              );
                            }
                            return text;
                          };

                          return (
                            <li key={i} className="flex items-start gap-2 text-cream/60 text-sm">
                              <span className="text-gold mt-0.5">✓</span>
                              {renderAchievementText()}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {edu.coursework && edu.coursework.length > 0 && (
                    <div className="text-left">
                      <p className="text-cream/80 text-xs font-medium mb-2">Relevant Coursework</p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((course: string) => (
                          <span
                            key={course}
                            className="px-2.5 py-1 text-[11px] text-cream/60 bg-[#1e3a5f]/10 border border-[#1e3a5f]/15 rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </>
            )}
          />
        </div>
      </section>

      {/* Experience Roadmap Preview (shared) */}
      <section id="experience" className="section-padding bg-black-100 relative overflow-hidden">
        {/* Static decorative background elements */}
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-gold/5 blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#1e3a5f]/5 blur-3xl opacity-40" />

        <div className="container-custom relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p
                className="text-gold text-sm tracking-[0.2em] uppercase mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Career
              </motion.p>
              <motion.h2
                className="text-display-md font-display text-cream"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Experience
              </motion.h2>
            </div>
          </div>

          <Timeline
            items={experiences}
            renderItem={(exp: any, index: number) => (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  className={`inline-block mb-3 ${index % 2 === 0 ? 'lg:float-right lg:ml-4' : 'lg:float-left lg:mr-4'}`}
                >
                  <span className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs font-medium rounded-full shadow-lg">
                    {exp.duration.split(' - ')[0]}
                  </span>
                </motion.div>

                <div className="clear-both" />

                <motion.div
                  data-exp-index={index}
                  className={`group relative glass rounded-2xl overflow-visible hover:shadow-2xl transition-all duration-500 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Floating image popup - CSS hover + DOM attribute for scroll-aware detection */}
                  {exp.image && (
                    <div
                      className={`exp-popup absolute w-60 h-44 z-20 pointer-events-none hidden lg:block transition-all duration-500 ease-out top-1/2 -translate-y-1/2 opacity-0 scale-[0.8] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 ${
                        index % 2 === 0 ? '-translate-x-[40px] -right-64' : 'translate-x-[40px] -left-64'
                      }`}
                    >
                      {/* Arrow connector pointing from card to image */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          index % 2 === 0 ? '-left-4' : '-right-4'
                        }`}
                      >
                        <svg
                          width="16" height="24" viewBox="0 0 16 24"
                          className={index % 2 === 0 ? '' : 'rotate-180'}
                        >
                          <path d="M0 12 L16 0 L16 24 Z" fill="rgba(30,58,95,0.15)" />
                        </svg>
                      </div>
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gold/30 shadow-2xl shadow-gold/15">
                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display text-cream mb-1.5 group-hover:text-gold transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-gold font-medium text-sm mb-2">{exp.company}</p>
                    <p className="text-cream/60 text-xs mb-3">{exp.duration}</p>
                    <p className="text-cream/80 text-sm mb-5 text-left leading-relaxed">{exp.description}</p>

                    <div className="mb-5 text-left">
                      <p className="text-cream/90 text-xs font-medium mb-2">Key Achievements</p>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((achievement: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-cream/70 text-sm">
                            <span className="text-gold mt-0.5">✓</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-left">
                      <p className="text-cream/80 text-xs font-medium mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-[11px] text-cream/60 bg-[#1e3a5f]/10 border border-[#1e3a5f]/15 rounded-full"
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

      {/* Projects Section */}
      <section id="projects" className="section-padding relative overflow-hidden">
        {/* Static background elements - no continuous animation for performance */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1e3a5f]/3 blur-[100px]" />
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gold/[0.02] blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#1e3a5f]/[0.04] blur-[60px]" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="mb-12">
            <motion.p
              className="text-gold text-sm tracking-[0.2em] uppercase mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              My Work
            </motion.p>
            <motion.h2
              className="text-display-md font-display text-cream mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Projects
            </motion.h2>

            {/* Category Filters */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-gold/20 border-gold/50 text-gold'
                      : 'border-[#1e3a5f]/20 text-cream/50 hover:border-gold/30 hover:text-cream/70'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-24">
            {projects
              .filter((p) => activeFilter === 'All' || p.category === activeFilter)
              .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Project Illustration */}
                  <motion.div
                    className={`aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-shadow duration-300 ${
                      index % 2 === 1 ? 'lg:col-start-2' : ''
                    }`}
                    style={{ filter: 'saturate(0.45) brightness(1.03)' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProjectIllustration projectId={project.id} />
                  </motion.div>

                  {/* Project Info */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <motion.p
                      className="text-gold/70 text-sm tracking-wider mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {project.category}
                    </motion.p>
                    <motion.h3
                      className="text-3xl md:text-4xl font-display text-cream mb-4 group-hover:text-gold transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className="text-cream/60 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Tech Stack */}
                    <motion.div
                      className="flex flex-wrap gap-1.5 mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] text-cream/60 bg-[#1e3a5f]/10 border border-[#1e3a5f]/15 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>

                    {/* Links */}
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-gold hover:-translate-y-1 transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                      {project.report && (
                        <a
                          href={project.report}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.report, '_blank', 'noopener,noreferrer');
                          }}
                          className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-gold hover:-translate-y-1 transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Report
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      

      {/* Contact Section */}
      <ContactSection />
    </>
  );
};

export default Home;
