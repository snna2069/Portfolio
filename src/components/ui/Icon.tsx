interface IconProps {
  name: string;
  className?: string;
}

const Icon = ({ name, className = '' }: IconProps) => {
  const common = { width: 40, height: 40, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };

  switch (name) {
    case 'code':
      return (
        <svg {...common} className={className}>
          <path d="M16 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 6L2 12l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'layout':
      return (
        <svg {...common} className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'browser':
      return (
        <svg {...common} className={className}>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="6.5" r="0.8" fill="currentColor" />
          <circle cx="8.5" cy="6.5" r="0.8" fill="currentColor" />
          <circle cx="11" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'terminal':
      return (
        <svg {...common} className={className}>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 10l3 2-3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'server':
      return (
        <svg {...common} className={className}>
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'database':
      return (
        <svg {...common} className={className}>
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 6v6c0 1.7 4 3 8 3s8-1.3 8-3V6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...common} className={className}>
          <path d="M20 17.5A4.5 4.5 0 0016 13h-1a6 6 0 10-11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common} className={className}>
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 13v6M15 7v12M21 3v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...common} className={className}>
          <path d="M12 3l1.5 3L17 8l-3 1.5L12 13l-1.5-3L7 8l3-1.5L12 3z" stroke="currentColor" strokeWidth="1" fill="currentColor" />
        </svg>
      );
    case 'test-tube':
      return (
        <svg {...common} className={className}>
          <g transform="rotate(-25 12 12)">
            <path d="M7 3c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6a4 4 0 01-4 4H11a4 4 0 01-4-4V3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M9 11c0 1.2 1.6 2.2 3 2.2s3-1 3-2.2" fill="currentColor" opacity="0.12" />
            <path d="M9 5h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </g>
        </svg>
      );
    case 'download':
      return (
        <svg {...common} className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M8 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
};

export default Icon;
