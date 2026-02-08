import { motion } from 'framer-motion';
import { useState } from 'react';

// Personal interests data
const personalInterests = [
  {
    id: 'events',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
      </svg>
    ),
    label: 'Events',
    description: 'Planning & hosting',
    color: '#e63946',
  },
  {
    id: 'music',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    ),
    label: 'Music',
    description: 'Indian Music Buff',
    color: '#9c27b0',
  },
  {
    id: 'india',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    label: 'Boulder, CO',
    description: 'Originally from India',
    color: '#ff9800',
  },
  {
    id: 'travel',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    ),
    label: 'Loves Travelling',
    description: 'Explorer at heart',
    color: '#00bcd4',
  },
  {
    id: 'editing',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
      </svg>
    ),
    label: 'Editor',
    description: 'Visual storytelling',
    color: '#4caf50',
  },
  {
    id: 'photography',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="3.2"/>
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
    ),
    label: 'Photography',
    description: 'Capturing moments',
    color: '#2196f3',
  },
];

// Orbiting icon with hover expand effect
const OrbitingIcon = ({
  icon,
  label,
  description,
  color,
  radius,
  duration,
  startAngle,
  reverse = false,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
  radius: number;
  duration: number;
  startAngle: number;
  reverse?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute z-20"
      style={{
        width: radius * 2,
        height: radius * 2,
        left: '50%',
        top: '50%',
        marginLeft: -radius,
        marginTop: -radius,
        animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
        pointerEvents: 'none',
      }}
    >
      {/* Icon positioned on the orbit path */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) rotate(${startAngle}deg) translateY(-${radius}px) rotate(-${startAngle}deg)`,
          pointerEvents: 'auto',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Counter-rotate to keep icon upright */}
        <div
          style={{
            animation: `spin ${duration}s linear infinite ${reverse ? '' : 'reverse'}`,
          }}
        >
          <motion.div
            className="flex items-center rounded-xl backdrop-blur-sm shadow-lg border overflow-hidden cursor-pointer"
            animate={{
              scale: isHovered ? 1.15 : 1,
              width: isHovered ? 150 : 44,
            }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: isHovered ? `${color}15` : 'rgba(255,255,255,0.95)',
              borderColor: isHovered ? `${color}40` : 'rgba(30,58,95,0.1)',
              height: 44,
            }}
          >
            <div
              className="flex-shrink-0 w-11 h-11 flex items-center justify-center"
              style={{ color }}
            >
              {icon}
            </div>

            {isHovered && (
              <div className="flex flex-col pr-3 overflow-hidden">
                <span className="text-xs font-semibold whitespace-nowrap" style={{ color }}>
                  {label}
                </span>
                <span className="text-[10px] text-[#1e3a5f]/60 whitespace-nowrap">
                  {description}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Rotating ring with CSS animation
const Ring = ({ radius, dashed = false, duration = 60, reverse = false }: { radius: number; dashed?: boolean; duration?: number; reverse?: boolean }) => (
  <div
    className="absolute rounded-full"
    style={{
      width: radius * 2,
      height: radius * 2,
      left: '50%',
      top: '50%',
      marginLeft: -radius,
      marginTop: -radius,
      border: dashed ? '2px dashed #1e3a5f20' : '1px solid #1e3a5f15',
      animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
    }}
  />
);

const AboutGraphics = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* Background gradient blob */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div
          className="w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, #1e3a5f20 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Centered container for rings and image */}
      <div className="relative w-[520px] h-[520px]">
        {/* Rotating concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Ring radius={140} duration={45} />
          <Ring radius={180} dashed duration={60} reverse />
          <Ring radius={220} duration={80} />
        </div>

        {/* Profile image container */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          initial={{ scale: 0.9, opacity: 0, rotate: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
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
          <div className="relative">
            {/* Main image container */}
            <div className="relative w-56 h-56 rounded-full overflow-hidden bg-gradient-to-br from-[#f1f5f9] to-white border-4 border-white shadow-2xl transition-shadow duration-300 hover:shadow-[0_25px_50px_-12px_rgba(30,58,95,0.3)]">
              <img
                src="/sneha-profile.jpeg"
                alt="Sneha Nagaraju"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] to-[#1e3a5f]/80">
                <span className="text-5xl font-display text-white">SN</span>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#1e3a5f]/40 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#1e3a5f]/40 rounded-bl-lg" />
          </div>
        </motion.div>

        {/* Orbiting interest icons - distributed across orbital rings at different speeds */}
        {/* Inner orbit (radius 140) - faster, 2 icons - matches Ring duration 45s */}
        <OrbitingIcon
          {...personalInterests[0]}
          radius={140}
          duration={45}
          startAngle={0}
        />
        <OrbitingIcon
          {...personalInterests[1]}
          radius={140}
          duration={45}
          startAngle={180}
        />

        {/* Middle orbit (radius 180) - medium speed, reverse, 2 icons - matches Ring duration 60s */}
        <OrbitingIcon
          {...personalInterests[2]}
          radius={180}
          duration={60}
          startAngle={60}
          reverse
        />
        <OrbitingIcon
          {...personalInterests[3]}
          radius={180}
          duration={60}
          startAngle={240}
          reverse
        />

        {/* Outer orbit (radius 220) - slower, 2 icons - matches Ring duration 80s */}
        <OrbitingIcon
          {...personalInterests[4]}
          radius={220}
          duration={80}
          startAngle={120}
        />
        <OrbitingIcon
          {...personalInterests[5]}
          radius={220}
          duration={80}
          startAngle={300}
        />

        {/* Stats badges */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-[#1e3a5f]/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center">
              <span className="text-[#1e3a5f] font-bold text-xs">3+</span>
            </div>
            <div>
              <p className="text-[9px] text-[#1e3a5f]/60">Years</p>
              <p className="text-[10px] font-semibold text-[#1e3a5f]">Experience</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-[#1e3a5f]/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#1e3a5f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-[9px] text-[#1e3a5f]/60">Master's</p>
              <p className="text-[10px] font-semibold text-[#1e3a5f]">CS Grad</p>
            </div>
          </div>
        </motion.div>

        {/* Static decorative dots */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#1e3a5f]/20"
            style={{
              left: `${20 + i * 20}%`,
              top: `${50 + (i % 2 === 0 ? -30 : 30)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutGraphics;
