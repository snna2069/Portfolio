import { motion } from 'framer-motion';
import { Education } from '../../data/portfolio';

interface EducationCardProps {
  edu: Education;
  index: number;
}

// CU Boulder themed illustration - static version
const CUBoulderIllustration = ({ color }: { color: string }) => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    {/* Flatirons Mountains */}
    <path
      d="M0 160 L40 80 L60 110 L90 50 L120 100 L150 60 L200 160 Z"
      fill={`${color}15`}
      stroke={color}
      strokeWidth="1.5"
      opacity="0.8"
    />
    <path
      d="M20 160 L70 90 L100 120 L130 70 L180 160 Z"
      fill={`${color}10`}
    />

    {/* Sun */}
    <circle cx="160" cy="35" r="20" fill={color} fillOpacity="0.3" />
    <circle cx="160" cy="35" r="12" fill={color} fillOpacity="0.5" />

    {/* Buffalo silhouette */}
    <path
      d="M25 140 Q30 130 40 130 L45 125 Q50 120 55 125 L60 130 Q70 130 75 140"
      fill={color}
      fillOpacity="0.6"
    />
    <circle cx="42" cy="127" r="2" fill={color} fillOpacity="0.8" />

    {/* Code elements */}
    <text x="140" y="90" fontSize="12" fill={color} fontFamily="monospace" opacity="0.5">{'</>'}</text>
    <text x="15" y="60" fontSize="10" fill={color} fontFamily="monospace" opacity="0.4">{'{ }'}</text>

    {/* Neural network nodes */}
    <g opacity="0.4">
      <circle cx="165" cy="110" r="4" fill={color} />
      <circle cx="180" cy="95" r="3" fill={color} />
      <circle cx="185" cy="115" r="3" fill={color} />
      <line x1="165" y1="110" x2="180" y2="95" stroke={color} strokeWidth="1" />
      <line x1="165" y1="110" x2="185" y2="115" stroke={color} strokeWidth="1" />
    </g>
  </svg>
);

// Ramaiah/ECE themed illustration - static version
const RamaiahIllustration = ({ primary, secondary }: { primary: string; secondary: string }) => (
  <svg viewBox="0 0 200 160" className="w-full h-full">
    {/* Circuit board pattern */}
    <g opacity="0.3">
      <line x1="0" y1="40" x2="60" y2="40" stroke={primary} strokeWidth="2" />
      <line x1="80" y1="40" x2="200" y2="40" stroke={primary} strokeWidth="2" />
      <line x1="0" y1="80" x2="120" y2="80" stroke={primary} strokeWidth="2" />
      <line x1="140" y1="80" x2="200" y2="80" stroke={primary} strokeWidth="2" />
      <line x1="0" y1="120" x2="80" y2="120" stroke={primary} strokeWidth="2" />
      <line x1="60" y1="40" x2="60" y2="80" stroke={primary} strokeWidth="2" />
      <line x1="120" y1="80" x2="120" y2="120" stroke={primary} strokeWidth="2" />
    </g>

    {/* Circuit nodes */}
    <circle cx="60" cy="40" r="5" fill={primary} fillOpacity="0.7" />
    <circle cx="80" cy="40" r="5" fill={secondary} fillOpacity="0.7" />
    <circle cx="120" cy="80" r="5" fill={primary} fillOpacity="0.7" />
    <circle cx="140" cy="80" r="5" fill={secondary} fillOpacity="0.7" />

    {/* Sine wave */}
    <path
      d="M10 130 Q30 110 50 130 T90 130 T130 130 T170 130"
      fill="none"
      stroke={secondary}
      strokeWidth="2"
      strokeOpacity="0.5"
    />

    {/* IC Chip */}
    <g>
      <rect x="150" y="100" width="40" height="30" rx="3" fill={primary} fillOpacity="0.2" stroke={primary} strokeWidth="1.5" />
      <line x1="155" y1="100" x2="155" y2="95" stroke={primary} strokeWidth="2" />
      <line x1="165" y1="100" x2="165" y2="95" stroke={primary} strokeWidth="2" />
      <line x1="175" y1="100" x2="175" y2="95" stroke={primary} strokeWidth="2" />
      <line x1="185" y1="100" x2="185" y2="95" stroke={primary} strokeWidth="2" />
      <line x1="155" y1="130" x2="155" y2="135" stroke={primary} strokeWidth="2" />
      <line x1="165" y1="130" x2="165" y2="135" stroke={primary} strokeWidth="2" />
      <line x1="175" y1="130" x2="175" y2="135" stroke={primary} strokeWidth="2" />
      <line x1="185" y1="130" x2="185" y2="135" stroke={primary} strokeWidth="2" />
      <text x="160" y="118" fontSize="8" fill={primary} fontFamily="monospace">ECE</text>
    </g>

    {/* Resistor symbol */}
    <path
      d="M20 60 L25 60 L28 55 L34 65 L40 55 L46 65 L52 55 L55 60 L60 60"
      fill="none"
      stroke={primary}
      strokeWidth="1.5"
      strokeOpacity="0.5"
    />

    {/* Antenna waves */}
    <g opacity="0.4">
      <path d="M30 20 Q35 10 40 20" fill="none" stroke={secondary} strokeWidth="1.5" />
      <path d="M25 25 Q35 5 45 25" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.7" />
      <path d="M20 30 Q35 0 50 30" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.5" />
      <line x1="35" y1="20" x2="35" y2="35" stroke={secondary} strokeWidth="2" />
    </g>
  </svg>
);

const EducationCard = ({ edu, index }: EducationCardProps) => {
  const isLeft = index % 2 === 0;

  return (
    <>
      {/* Duration badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.1, 0.2) }}
        className={`inline-block mb-4 ${isLeft ? 'lg:float-right lg:ml-4' : 'lg:float-left lg:mr-4'}`}
      >
        <span
          className="px-4 py-2 text-white text-sm font-medium rounded-full shadow-lg"
          style={{ backgroundColor: edu.theme.primary }}
        >
          {edu.duration.split(' - ')[0]}
        </span>
      </motion.div>

      <div className="clear-both" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.15) }}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${edu.theme.gradient} border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${isLeft ? 'lg:mr-8' : 'lg:ml-8'}`}
        style={{
          boxShadow: `0 4px 20px ${edu.theme.primary}15`,
        }}
      >
        {/* Static illustration background */}
        <div className="absolute top-0 right-0 w-48 h-40 opacity-60 pointer-events-none overflow-hidden">
          {edu.theme.icon === 'cu-boulder' ? (
            <CUBoulderIllustration color={edu.theme.primary} />
          ) : (
            <RamaiahIllustration primary={edu.theme.primary} secondary={edu.theme.secondary} />
          )}
        </div>

        {/* Colored accent bar */}
        <div
          className="absolute top-0 left-0 w-full h-1.5"
          style={{
            background: `linear-gradient(90deg, ${edu.theme.primary}, ${edu.theme.secondary})`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Institution logo placeholder / icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: `${edu.theme.primary}20` }}
          >
            {edu.theme.icon === 'cu-boulder' ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill={edu.theme.primary}>
                <path d="M12 2L2 8l10 6 10-6-10-6zM2 17l10 6 10-6M2 12l10 6 10-6" stroke={edu.theme.primary} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill={edu.theme.primary}>
                <circle cx="12" cy="12" r="3" stroke={edu.theme.primary} strokeWidth="2" fill="none"/>
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke={edu.theme.primary} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </div>

          <h3 className="text-2xl font-display text-cream mb-2">
            {edu.degree} in {edu.field}
          </h3>
          <p className="font-medium mb-3" style={{ color: edu.theme.primary }}>
            {edu.institution}
          </p>
          <p className="text-cream/60 text-sm mb-4">{edu.duration}</p>
          <p className="text-cream/70 mb-6 text-left">{edu.description}</p>

          {/* Achievements */}
          {edu.achievements.length > 0 && (
            <div className="mb-6 text-left">
              <p className="text-cream/80 text-sm font-medium mb-3">Achievements</p>
              <ul className="space-y-2">
                {edu.achievements.map((achievement, i: number) => {
                  const isObject = typeof achievement === 'object';
                  const text = isObject ? achievement.text : achievement;
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-cream/60 text-sm"
                    >
                      <span style={{ color: edu.theme.primary }} className="mt-0.5">&#10003;</span>
                      {text}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Coursework */}
          {edu.coursework && edu.coursework.length > 0 && (
            <div className="text-left">
              <p className="text-cream/80 text-sm font-medium mb-3">Relevant Coursework</p>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course: string) => (
                  <span
                    key={course}
                    className="px-3 py-1.5 text-xs font-medium rounded-full cursor-default hover:scale-105 transition-transform duration-150"
                    style={{
                      backgroundColor: `${edu.theme.primary}10`,
                      color: edu.theme.primary,
                      border: `1px solid ${edu.theme.primary}30`,
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Decorative corner */}
        <div
          className="absolute bottom-0 right-0 w-24 h-24"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${edu.theme.primary}10 50%)`,
          }}
        />
      </motion.div>
    </>
  );
};

export default EducationCard;
