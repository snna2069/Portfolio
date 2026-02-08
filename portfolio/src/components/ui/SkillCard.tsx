import React from 'react';
import Icon from './Icon';
import { Skill } from '../../data/portfolio';

interface SkillCardProps {
  skill: Skill;
}

// Domain-specific decorative SVG illustrations (static for performance)
const DomainIllustration = ({ icon, color }: { icon: string; color: string }) => {
  const illustrations: Record<string, React.ReactNode> = {
    code: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <text x="10" y="30" fontSize="14" fill={color} fontFamily="monospace" opacity="0.5">{'{ }'}</text>
        <text x="60" y="50" fontSize="12" fill={color} fontFamily="monospace" opacity="0.6">func()</text>
        <text x="20" y="75" fontSize="16" fill={color} fontFamily="monospace" opacity="0.4">{'</>'}</text>
        <circle cx="95" cy="90" r="15" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
      </svg>
    ),
    layout: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="10" y="10" width="40" height="25" rx="3" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
        <rect x="60" y="10" width="50" height="25" rx="3" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
        <rect x="10" y="45" width="100" height="35" rx="3" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        <rect x="10" y="90" width="30" height="20" rx="3" fill={color} fillOpacity="0.3" />
      </svg>
    ),
    browser: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="10" y="15" width="100" height="75" rx="6" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M10 35 L110 35" stroke={color} strokeWidth="2" opacity="0.5" />
        <circle cx="25" cy="25" r="4" fill={color} opacity="0.5" />
        <circle cx="40" cy="25" r="4" fill={color} opacity="0.5" />
        <circle cx="55" cy="25" r="4" fill={color} opacity="0.5" />
        <rect x="20" y="45" width="35" height="35" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
        <rect x="65" y="45" width="35" height="15" rx="2" fill={color} fillOpacity="0.3" />
        <rect x="65" y="65" width="35" height="15" rx="2" fill={color} fillOpacity="0.2" />
      </svg>
    ),
    terminal: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="10" y="15" width="100" height="75" rx="6" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M10 35 L110 35" stroke={color} strokeWidth="2" opacity="0.5" />
        <path d="M25 50 L45 65 L25 80" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
        <path d="M55 75 L85 75" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <circle cx="25" cy="25" r="4" fill={color} opacity="0.5" />
        <circle cx="40" cy="25" r="4" fill={color} opacity="0.5" />
      </svg>
    ),
    server: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="20" y="15" width="80" height="25" rx="4" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        <circle cx="35" cy="27" r="4" fill={color} opacity="0.7" />
        <rect x="20" y="50" width="80" height="25" rx="4" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        <circle cx="35" cy="62" r="4" fill={color} opacity="0.7" />
        <path d="M60 85 L60 105 M50 95 L70 95" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    database: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <ellipse cx="60" cy="25" rx="40" ry="12" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M20 25 L20 55 Q20 67 60 67 Q100 67 100 55 L100 25" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M20 55 L20 85 Q20 97 60 97 Q100 97 100 85 L100 55" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
        <ellipse cx="60" cy="55" rx="40" ry="12" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <path d="M30 70 Q10 70 10 55 Q10 40 30 40 Q35 25 55 25 Q80 25 85 45 Q110 45 110 60 Q110 75 90 75 L30 75" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        <line x1="40" y1="85" x2="40" y2="100" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
        <line x1="60" y1="85" x2="60" y2="105" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
        <line x1="80" y1="85" x2="80" y2="95" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="15" y="70" width="15" height="35" fill={color} fillOpacity="0.4" rx="2" />
        <rect x="40" y="50" width="15" height="55" fill={color} fillOpacity="0.5" rx="2" />
        <rect x="65" y="35" width="15" height="70" fill={color} fillOpacity="0.6" rx="2" />
        <rect x="90" y="20" width="15" height="85" fill={color} fillOpacity="0.7" rx="2" />
        <line x1="10" y1="105" x2="110" y2="105" stroke={color} strokeWidth="2" opacity="0.5" />
      </svg>
    ),
    sparkles: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <path d="M60 10 L63 25 L78 28 L63 31 L60 46 L57 31 L42 28 L57 25 Z" fill={color} opacity="0.6" />
        <path d="M25 55 L27 65 L37 67 L27 69 L25 79 L23 69 L13 67 L23 65 Z" fill={color} opacity="0.5" />
        <path d="M90 70 L92 82 L104 84 L92 86 L90 98 L88 86 L76 84 L88 82 Z" fill={color} opacity="0.5" />
        <circle cx="60" cy="80" r="3" fill={color} opacity="0.4" />
      </svg>
    ),
    'test-tube': (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <path d="M45 15 L45 70 Q45 95 60 95 Q75 95 75 70 L75 15" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M45 60 Q60 55 75 60 L75 70 Q75 95 60 95 Q45 95 45 70 Z" fill={color} fillOpacity="0.3" />
        <circle cx="55" cy="75" r="4" fill={color} fillOpacity="0.5" />
        <circle cx="65" cy="80" r="3" fill={color} fillOpacity="0.4" />
        <line x1="40" y1="15" x2="80" y2="15" stroke={color} strokeWidth="3" opacity="0.6" />
      </svg>
    ),
  };

  return illustrations[icon] || illustrations.code;
};

const SkillCard = ({ skill }: SkillCardProps) => {
  // Monochrome color scheme
  const accentColor = '#1e3a5f';

  return (
    <div className="relative group h-full">
      <div
        className="relative overflow-hidden p-8 rounded-2xl h-full min-h-[320px] flex flex-col bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-lg transition-all duration-300 group-hover:border-[#1e3a5f]/30 group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:from-[#f7f9fc] group-hover:to-[#eef2f7]"
      >
        {/* Domain illustration in background */}
        <div
          className="absolute top-0 right-0 w-32 h-32 transform translate-x-4 -translate-y-4 opacity-15 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300"
        >
          <DomainIllustration icon={skill.icon} color={accentColor} />
        </div>

        {/* Accent bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r from-gray-500 via-gray-400 to-gray-600 group-hover:from-[#1e3a5f] group-hover:via-[#2a5080] group-hover:to-[#1e3a5f] transition-all duration-300" />

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-grow">
          {/* Icon with color change on hover */}
          <div className="icon-bounce w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border border-gray-200/50 shadow-sm transition-all duration-300 group-hover:from-[#1e3a5f]/12 group-hover:to-[#1e3a5f]/20 group-hover:text-[#1e3a5f] group-hover:border-[#1e3a5f]/25">
            <Icon name={skill.icon} className="w-7 h-7" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-display text-gray-800 mb-2 transition-colors duration-300 group-hover:text-[#1e3a5f]">
            {skill.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-grow">
            {skill.description}
          </p>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {skill.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-full cursor-default bg-white text-gray-700 border border-gray-300 shadow-sm transition-all duration-300 group-hover:bg-[#1e3a5f]/5 group-hover:text-[#1e3a5f]/80 group-hover:border-[#1e3a5f]/15"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
