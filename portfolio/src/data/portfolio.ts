// Portfolio Data Types
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  availability: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: string;
  image: string;
  images: string[];
  link?: string;
  github?: string;
  report?: string;
  featured: boolean;
  year: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  technologies: string[];
  color: string;
  gradient: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  image?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface EducationAchievement {
  text: string;
  link?: string;
  linkText?: string; // The specific text within 'text' that should be clickable
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  description: string;
  achievements: (string | EducationAchievement)[];
  coursework?: string[];
  image?: string;
  theme: {
    primary: string;
    secondary: string;
    gradient: string;
    icon: 'cu-boulder' | 'ramaiah';
  };
}

// Personal Information
export const personalInfo: PersonalInfo = {
  name: 'Sneha Nagaraju!',
  title: 'Software Engineer',
  tagline: 'Creating Technology with Purpose and Precision',
  bio: `I’m a software engineer with 3+ years of experience building scalable, secure, and reliable systems across full-stack applications, microservices, and cloud infrastructure. I’ve worked in semiconductor industry, research labs, and fast-moving teams, turning complex, mission-critical problems into production-ready solutions that scale and perform.

I care deeply about system design, performance optimization, and developer experience, and I enjoy collaborating across teams to ship thoughtful, user-centered products from real-time platforms to AI-powered developer tools.
Music fuels my creativity and brings rhythm to how I think about problem-solving.`,
  location: 'Boulder, CO (Open to Relocate)',
  email: 'Sneha.Nagaraju@colorado.edu',
  availability: 'Available for full-time opportunities',
};

// Projects
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'MindBloom',
    description: 'A secure mental health journaling web application with mood tracking',
    longDescription: `MindBloom is a secure journaling platform with JWT authentication and mood-tagged workflows.
                      The application features automated testing with Jest, Supertest, and Prisma mocks,
                      improving backend reliability by 40% and increasing test coverage and stability by 25%.
                      Deployed with frontend on Vercel and backend on GCP Cloud Run with CI/CD via GitHub Actions.`,
    techStack: ['Typescript','Prisma', 'JWT', 'Jest', 'Supertest', 'GCP Cloud Run', 'Vercel', 'GitHub Actions'],
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop',
    ],
    github: 'https://github.com/snna2069/Mind-Bloom',
    report: "/reports/MindBloom.pptx",
    featured: true,
    year: '2025',
  },
  {
  id: 'project-2',
  title: 'SemEval Task 11: Scientific Reasoning with Transformers',
  description: 'Evaluating logical validity and plausibility of scientific claims using transformer models',
  longDescription: `Developed a transformer-based NLP system for SemEval Task 11, a global benchmark focused
                    on separating content understanding from formal logical reasoning in scientific text.
                    Built and fine-tuned multiple multilingual transformer models to classify whether
                    scientific statements are logically valid or invalid. Designed a span-based explanation
                    model to generate concise, evidence-grounded plausibility justifications for claims.
                    Performed comparative model evaluation and error analysis to identify high-performing
                    architectures and limitations in reasoning-heavy NLP tasks.`,
  techStack: [
    'Python',
    'PyTorch',
    'Transformers',
    'Pretrained Language Models (PLMs): mDeBERTa-v3, XLM-RoBERTa, DeBERTa-v3',
    'Multilingual NLP',
  ],
  category: 'Machine Learning / NLP',
  image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop'
  ],
  github: 'https://github.com/snna2069/semEvalTask11',
  report: '/reports/NLP_SemEvalTask_Report.pdf',
  featured: true,
  year: '2025',
},

{
  id: 'project-3',
  title: 'Stock Market Pattern Mining',
  description: 'End-to-end data mining and machine learning pipeline for market data analysis',
  longDescription: `Designed and implemented a complete data mining pipeline in Python that integrates data ingestion,
                    exploratory data analysis, feature engineering, model training, evaluation, and live prediction.
                    Features include automated extraction of financial and news data, engineered indicators such as
                    moving averages and volatility, classification modeling (e.g., logistic regression and random
                    forest) with evaluation metrics (accuracy, precision, recall, F1), and optional real-time sentiment
                    analysis via external APIs. Saved visualizations and EDA outputs under reports, and provided a
                    scriptable CLI for end-to-end workflow execution. Educational project showcasing practical
                    data mining workflows from raw data to actionable insights.`, 
  techStack: [
    'Python',
    'scikit-learn',
    'Pandas',
    'yfinance API',
    'Machine Learning',
    'Feature Engineering',
    'Data Pre-processing',
    'Data Modelling',
    'Data Visualization'
  ],
  category: 'Data Science / Data Mining',
  image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560264280-1983bc2f8d97?w=1200&h=800&fit=crop'
  ],
  github: 'https://github.com/snna2069/StockMarketPatternMining',
  report: '/reports/Stock Market Pattern Mining Final Report.pdf',
  featured: false,
  year: '2025',
},


  {
    id: 'project-4',
    title: 'Course Experience Exchange',
    description: 'A web platform helping students make informed course decisions using senior feedback',
    longDescription: `A comprehensive web-based platform to help students make informed course decisions using senior feedback.
                      Features include ratings for each course based on Difficulty, Relevance, and Practical Knowledge.
                      Built with search and filter functionality using Next.js & PostgreSQL,
                      improving navigation efficiency by 30%.`,
    techStack: ['Node.js', 'Next.js', 'NextAuth.js', 'React','MongoDB', 'Apache Kafka', 'PostgreSQL', 
      'Javascript','Tailwind CSS', 'Docker', 'Vercel'],

    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop',
    ],
    github: 'https://github.com/snna2069/course-experience-exchange',
    report: '/reports/CourseExperienceExchangeReport.pdf',
    featured: true,
    year: '2024',
  },
  {
  id: 'project-5',
  title: 'Women Safety System (IEEE Publication)',
  description: 'GPS-GSM based wearable system for real-time women’s safety and emergency alerting',
  longDescription: `Designed and developed a GPS-GSM enabled wearable wristband aimed at enhancing women’s
                    safety through real-time location tracking and instant emergency alerts. The system
                    enables rapid communication with predefined contacts during distress situations,
                    ensuring timely intervention. Conducted iterative user testing to refine usability
                    and responsiveness, resulting in a 15% increase in user engagement. The project was
                    peer-reviewed and published in an IEEE journal, highlighting its practical impact
                    and real-world deployment potential.`,
  techStack: [
    'Embedded Systems',
    'System Integration',
    'GPS',
    'GSM',
    'IoT',
    'MSP4300 Microcontroller Processing',
    'Real-Time Data Handling',
    'User Testing'
  ],
  category: 'IoT / Embedded Systems',
  image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9b6b09?w=1200&h=800&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1581092334651-ddf26d9b6b09?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&fit=crop'
  ],
  report: 'https://ieeexplore.ieee.org/document/10057852',
  featured: true,
  year: '2023',
},
{
  id: 'project-6',
  title: 'Dimensionality Reduction with PCA on Handwritten Digits',
  description: 'Applied PCA for dimensionality reduction and image reconstruction analysis using PSNR',
  longDescription: `Implemented Principal Component Analysis (PCA) on the Optdigits handwritten digits dataset
                    to reduce high-dimensional image data while preserving maximum variance. Analyzed the
                    trade-off between dimensionality reduction and information loss by visualizing principal
                    components, eigenvalues, and covariance structures. Demonstrated that 90% of the data
                    variance could be retained using only 25 principal components (down from 64). Reconstructed
                    compressed images and evaluated reconstruction quality using Peak Signal-to-Noise Ratio
                    (PSNR), achieving a PSNR of 19.35 dB. The project combined mathematical foundations,
                    visualization, and practical evaluation of dimensionality reduction techniques.`,
  techStack: [
    'Python',
    'NumPy',
    'Pandas',
    'scikit-learn',
    'PCA',
    'OpenCV',
    'Matplotlib',
    'Seaborn'
  ],
  category: 'Machine Learning / NLP',
  image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1581092334651-ddf26d9b6b09?w=1200&h=800&fit=crop'
  ],
  report: '/reports/DimensionalityReductionwithPCAonHandwrittenDigitsReport.pdf',
  featured: false,
  year: '2022',
}


];

// Skills
export const skills: Skill[] = [
  {
    id: 'skill-1',
    name: 'Languages',
    description: 'Proficient in multiple programming languages for diverse application development.',
    icon: 'code',
    technologies: ['Python', 'Java', 'C++', 'Smalltalk', 'TypeScript', 'JavaScript', 'C#', 'Ruby on Rails', 'GoLang', 'Embedded C'],
    color: '#6366f1',
    gradient: 'from-indigo-500/20 to-violet-500/20',
  },
  {
    id: 'skill-2',
    name: 'Frontend Development',
    description: 'Building responsive, performant, and accessible user interfaces with modern frameworks.',
    icon: 'browser',
    technologies: ['React.js', 'Next.js', 'Angular', 'HTML', 'Redux', 'Tailwind CSS', 'WebSockets'],
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-teal-500/20',
  },
  {
    id: 'skill-3',
    name: 'Backend & Frameworks',
    description: 'Designing and implementing scalable server architectures, microservices, and RESTful APIs.',
    icon: 'terminal',
    technologies: ['Node.js', 'Express.js', 'Java Spring Boot', 'Microservices', 'RESTful APIs'],
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-green-500/20',
  },
  {
    id: 'skill-4',
    name: 'Databases & Data',
    description: 'Working with relational and NoSQL databases, data modeling, and real-time data pipelines.',
    icon: 'database',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka', 'Spark'],
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'skill-5',
    name: 'Cloud & DevOps',
    description: 'Deploying and managing applications with modern cloud infrastructure and CI/CD pipelines.',
    icon: 'cloud',
    technologies: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    color: '#3b82f6',
    gradient: 'from-blue-500/20 to-sky-500/20',
  },
  {
    id: 'skill-6',
    name: 'Data & Analytics',
    description: 'Working with data warehousing, business intelligence, and data visualization tools.',
    icon: 'chart',
    technologies: ['Snowflake', 'Tableau', 'Data Modeling', 'BigQuery', 'ETL Pipelines'],
    color: '#ec4899',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 'skill-7',
    name: 'AI/LLM Tools',
    description: 'Building intelligent applications with modern AI frameworks and large language models.',
    icon: 'sparkles',
    technologies: ['Hugging Face', 'OpenAI API', 'RAG', 'LangChain', 'LangGraph', 'AutoGen'],
    color: '#8b5cf6',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    id: 'skill-8',
    name: 'Testing & QA',
    description: 'Ensuring reliability and correctness through automated testing, end-to-end suites, and test-driven development.',
    icon: 'test-tube',
    technologies: ['Jest', 'Cypress', 'Postman', 'JUnit', 'Prisma Mocks'],
    color: '#ef4444',
    gradient: 'from-red-500/20 to-orange-500/20',
  },
];

// Work Experience
export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'OpenSplitTime, Boulder, CO',
    role: 'Software Engineer, Systems & Platforms',
    duration: 'Sept 2025 - Present',
    description: 'Contributing to OpenSplitTime.org to improve race-day operations and user experience by building scalable race timing systems, streamlining live split tracking and prediction, and developing a new cross-platform Racing Mobile Application.',
    achievements: [
      
      'Shipped full-stack features using Ruby on Rails, PostgreSQL, Redis, Sidekiq, Hotwire.js, and JSON APIs to support real-time race timing workflows',
      'Developed a cross-platform application (Windows, Android, iOS) to extend OpenSplitTime’s race-day tooling',
      'Integrated OpenSplitTime with RACERESULT RFID timing systems, mapping event data and consuming webhooks to accurately record timing triggers in real time',
      'Designed and implemented event-driven data pipelines to ingest, process, and persist high-frequency timing data',
      'Practiced test-driven development (RSpec), frequent pair programming, and collaborative code reviews',
    ],
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Sidekiq', 'Hotwire.js', 'RSpec', 'Flutter', 'RaceResult', 'Webhooks', 'Mobile App Development', 'Docker', 'Event-Driven Systems'],
    image: '/experience-opensplittime.png',
  },
    {
    id: 'exp-2',
    company: 'Lockheed Martin Engineering Management, CU Boulder',
    role: 'Teaching Assistant',
    duration: 'Jan 2025 - May 2026',
    description: 'Served as a Teaching Assistant for EMEN-3000: Introduction to Engineering Management, supporting course instruction through student mentoring, grading, and office hours for 150+ undergraduate students.',
    achievements: [
      'Held weekly office hours to support students with coursework and assignments related to engineering management principles',
      'Graded assignments, discussions, and projects, providing detailed feedback to reinforce learning outcomes and technical communication',
      'Supported instruction across core topics including project management, systems thinking, agile development, CI/CD workflows, and engineering decision-making',
      'Assisted students in understanding software delivery pipelines, version control, and automation concepts',
    ],
    technologies: ['Engineering Management', 'Project Management', 'Agile Development', 'CI/CD', 'Version Control', 'Technical Communication'],
    image: '/experience-cu-ta.png',
  },
  {
    id: 'exp-3',
    company: 'LearnChemE, CU Boulder',
    role: 'Graduate Research Assistant',
    duration: 'Jan 2025 - Sept 2025',
    description: 'Supported the development and delivery of interactive web-based simulations for Chemical Engineering labs, enabling 200+ students to engage with browser-based experiments used in coursework and instruction.',
    achievements: [
      'Developed and maintained interactive simulation interfaces using React and Node.js to support instructional laboratory modules',
      'Collaborated with faculty and researchers to translate engineering concepts into accessible, student-facing web tools',
      'Assisted in testing, deployment, and iteration of educational software through CI/CD workflows to ensure reliability during active courses',
      'Supported instructional use of simulations by refining lab behavior, and improving usability based on feedback',
    ],
    technologies: ['React', 'Node.js', 'CI/CD', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Git', 'Mathematica', 'Wolfram', 'Web Development'],
    image: '/experience-learncheme.jpg',
  },

  {
    id: 'exp-4',
    company: 'Lam Research, Bangalore, India',
    role: 'Software Engineer',
    duration: 'Jul 2022 - Jul 2024',
    description: 'Built and scaled software systems for semiconductor manufacturing platforms, delivering reliable, real-time data processing and full-stack features used in production environments.',
    achievements: [
      'Designed and developed full-stack features using Python, Java, C# and Smalltalk for semiconductor equipment systems, ensuring 95% real-time data reliability',
      'Led development of a high-performance VID tracking system in Python, reducing inspection turnaround time by 60% for manufacturing workflows',
      'Improved release cadence from quarterly to bi-weekly by introducing CI/CD best practices and service-level ownership',
      'Designed and secured RESTful APIs using OAuth2, JWT, and role-based access control (RBAC) to meet enterprise compliance requirements',
      'Mentored junior engineers, conducted code reviews, and reduced defect rates by ~20% through improved engineering practices',
    ],
    technologies: ['Smalltalk', 'Python','C#', 'JWT', 'Jenkins', 'Microservices', 'Parallel Processing', 'Agile/Scrum', 'Jira', 'Confluence','Semiconductor Manufacturing Systems','Deposition and Etching',
    ],
    image: '/experience-lam-swe.jpg',
  },

  {
    id: 'exp-5',
    company: 'Lam Research, Bangalore, India',
    role: 'Software Engineering Intern',
    duration: 'Feb 2022 - Jul 2022',
    description: 'Supported development of production software for semiconductor manufacturing systems, contributing to full-stack features and real-time data processing under senior engineer guidance.',
    achievements: [
      'Implemented backend and UI features using Java for PECVD semiconductor equipment software',
      'Assisted in maintaining real-time data reliability by debugging issues and improving code quality',
      'Used SonarQube to identify and resolve code smells, improving maintainability and adherence to quality standards',
      'Collaborated with senior engineers through code reviews and agile development workflows',
    ],
    technologies: ['Java', 'Software Development', 'SonarQube', 'UI Design', 'Semiconductor Manufacturing Systems'],
    image: '/experience-lam-intern.png',
  },

  {
    id: 'exp-6',
    company: 'Indian Institute of Science, Bangalore, India',
    role: 'Research Intern',
    duration: 'May 2021 - Jan 2022',
    description: 'Built an interactive React + Flask dashboard for AR/VR/MR visualization, enabling large-scale dataset analysis with real-time rendering.',
    achievements: [
      'Developed RESTful APIs and automated Python pipelines, boosting throughput by 90%',
      'Reduced manual workload through automation of academic data collection',
      'Presented work in weekly research seminars, leading to adoption by two labs',
    ],
    technologies: ['React', 'Flask', 'Python', 'RESTful APIs', 'AR/VR/MR'],
    image: '/experience-iisc.jpg',
  },
];

// Education
export const education: Education[] = [
  {
    id: 'edu-1',
    institution: 'University of Colorado Boulder',
    degree: "Master's",
    field: 'Computer Science',
    duration: 'Aug 2024 - May 2026',
    description: 'Graduate studies with CGPA: 3.7/4. ',
    achievements: [
      'Minor Track: Data Science and Engineering',
      'CU Cultural Collective Student Co-ordinator (2025-26)',
      'Undergraduate Teaching Assistant - Introduction to Engineering Management (2025-26)',
      'Graduate Member of Women in Computing CU Boulder'
    ],
    coursework: ['Design and Analysis of Algorithms', 'Natural Language Processing', 'Fundamentals of Software Engineering', 'Data Mining','Datacenter Scale Computing','Computer Vision','Cybersecurity','Fundamentals of Systems Engineering'],
    image: '/education-masters.jpg',
    theme: {
      primary: '#CFB87C',
      secondary: '#000000',
      gradient: 'from-[#CFB87C]/20 to-amber-600/20',
      icon: 'cu-boulder',
    },
  },
  {
    id: 'edu-2',
    institution: 'Ramaiah Institute of Technology, Bengaluru',
    degree: 'Bachelor of Engineering',
    field: 'Electronics and Communication',
    duration: 'Aug 2018 - Jun 2022',
    description: 'Undergraduate studies with CGPA: 3.9/4.',
    achievements: [
      { text: 'Published research on Women Safety System - IEEE Journal Publication (Mar 2023)', link: 'https://ieeexplore.ieee.org/document/10057852', linkText: 'Women Safety System' },
      'Graduated with Distinction - Top 3% of the class',
    ],
    coursework: ['Data Structures using C++', 'Mobile Application Development', 'Machine Learning and Deep Learning', 'Entrepreneurship and Development', 'Digital Design'],
    image: '/education-undergrad.jpg',
    theme: {
      primary: '#1e3a8a',
      secondary: '#dc2626',
      gradient: 'from-blue-900/20 to-red-600/20',
      icon: 'ramaiah',
    },
  },
];

// Social Links
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/snna2069',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/snehan-raju',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:Sneha.Nagaraju@colorado.edu',
    icon: 'mail',
  },
];

// Navigation Links (single-page scroll navigation)
export const navLinks = [
  { name: 'Home', path: '/', sectionId: 'home' },
  { name: 'About', path: '/#about', sectionId: 'about' },
  { name: 'Education', path: '/#education', sectionId: 'education' },
  { name: 'Experience', path: '/#experience', sectionId: 'experience' },
  { name: 'Projects', path: '/#projects', sectionId: 'projects' },
  { name: 'Contact', path: '/#contact', sectionId: 'contact' },
];

// Export all data
export default {
  personalInfo,
  projects,
  skills,
  experiences,
  education,
  socialLinks,
  navLinks,
};
