import { Internship, Application, OfferLetter, EmailNotification, SmtpConfig, GoogleFormsIntegrationConfig } from '../types';

export const ALL_20_DOMAINS: Internship[] = [
  {
    id: 'int-01',
    domainKey: 'frontend-dev',
    title: 'Frontend Development Internship',
    category: 'Engineering',
    department: 'Web Technologies',
    description: 'Work on cutting-edge responsive web applications, modern CSS architectures, interactive dashboards, and performance optimization across global web client architectures.',
    responsibilities: [
      'Build responsive, accessible user interfaces using semantic HTML5, modern CSS, and vanilla TypeScript',
      'Optimize web vitals (LCP, FID, CLS) and implement code-splitting strategies',
      'Collaborate with UI/UX designers to translate Figma design tokens into clean component code',
      'Conduct cross-browser testing and write unit tests for critical user flows'
    ],
    requiredSkills: ['HTML5', 'CSS3/Tailwind', 'JavaScript (ES6+)', 'TypeScript', 'Git', 'Webpack/Vite'],
    eligibility: ['Pursuing or completed Bachelor in CS, IT, or related fields', 'Strong foundation in DOM manipulation & browser APIs'],
    educationalRequirements: 'B.Sc / B.Tech / BCA in Computer Science, Software Engineering, or equivalent experience',
    duration: '2 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 24,
    deadline: '2026-12-15',
    stipend: '$600 - $900/month',
    certificateInfo: 'Verified Certificate of Completion & Letter of Recommendation (LoR) with unique QR credential validation',
    learningOutcomes: [
      'Master modern component architectures and micro-frontends',
      'Production debugging with DevTools and lighthouse performance profiling',
      'Real-world CI/CD deployment pipelines'
    ],
    customQuestions: [
      { id: 'q1', question: 'Share a link to your best responsive web project with code repository', type: 'text', required: true },
      { id: 'q2', question: 'How do you handle CSS specificity conflicts and layout shifts?', type: 'textarea', required: false }
    ],
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScertofthings-frontend/viewform',
    isDemoListing: true,
    isActive: true,
    iconName: 'Layout',
    postedDate: '2026-11-01'
  },
  {
    id: 'int-02',
    domainKey: 'react-dev',
    title: 'React.js Development Internship',
    category: 'Engineering',
    department: 'Frontend Engineering',
    description: 'Dive deep into React 19, server actions, client state management, custom hooks, and concurrent rendering architectures within high-scale enterprise platforms.',
    responsibilities: [
      'Develop modular component systems with React 19 hooks and context providers',
      'Manage complex client state with Zustand and React Query caching layers',
      'Implement real-time updates via WebSockets and optimistic UI renders',
      'Profile memory leaks and reduce component re-rendering bottlenecks'
    ],
    requiredSkills: ['React 18/19', 'TypeScript', 'Zustand / Redux Toolkit', 'Tailwind CSS', 'Next.js', 'Jest/Vitest'],
    eligibility: ['Hands-on experience building at least 2 full-fledged React applications', 'Solid understanding of component lifecycles'],
    educationalRequirements: 'Undergraduate or Graduate student in Computing sciences or self-taught developer with portfolio',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 18,
    deadline: '2026-12-20',
    stipend: '$750 - $1,100/month',
    certificateInfo: 'Industry-standard Verified Certificate of Achievement & Executive LoR',
    learningOutcomes: [
      'Deep mastery of custom hooks, concurrency, and render passes',
      'State synchronization patterns and caching strategies',
      'Automated testing with React Testing Library'
    ],
    customQuestions: [
      { id: 'q1', question: 'Explain how you prevent unnecessary re-renders in deep component trees', type: 'textarea', required: true },
      { id: 'q2', question: 'Link to your public GitHub profile or deployed React project', type: 'text', required: true }
    ],
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScertofthings-react/viewform',
    isDemoListing: true,
    isActive: true,
    iconName: 'Atom',
    postedDate: '2026-11-03'
  },
  {
    id: 'int-03',
    domainKey: 'backend-dev',
    title: 'Backend Development Internship',
    category: 'Engineering',
    department: 'Core Services',
    description: 'Engineer scalable distributed backend services, design resilient RESTful & gRPC APIs, implement caching strategies, and guarantee 99.9% uptime architectures.',
    responsibilities: [
      'Design RESTful API specifications with OpenAPI/Swagger standards',
      'Optimize database queries, indexing, connection pooling, and migrations',
      'Implement authentication flows (JWT, OAuth2, session governance)',
      'Construct rate limiting, idempotency keys, and circuit breaker patterns'
    ],
    requiredSkills: ['Node.js/Go', 'REST APIs', 'SQL & NoSQL Databases', 'Redis', 'Docker', 'System Design'],
    eligibility: ['Familiarity with server-side runtime environments and relational/document databases', 'Strong algorithmic problem-solving'],
    educationalRequirements: 'Degree in Computer Science, Software Engineering, or related technical disciplines',
    duration: '3 Months',
    location: 'Hybrid',
    mode: 'Hybrid',
    positions: 15,
    deadline: '2026-12-18',
    stipend: '$850 - $1,250/month',
    certificateInfo: 'Certified Backend Systems Fellow Credential & Signed Recommendation Letter',
    learningOutcomes: [
      'Microservice communications and message queues (RabbitMQ/Kafka)',
      'High-throughput database tuning and transaction locks',
      'Automated API integration test harnesses'
    ],
    customQuestions: [
      { id: 'q1', question: 'Describe your approach to handling database connection spikes and API rate limiting', type: 'textarea', required: true }
    ],
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScertofthings-backend/viewform',
    isDemoListing: true,
    isActive: true,
    iconName: 'Server',
    postedDate: '2026-11-02'
  },
  {
    id: 'int-04',
    domainKey: 'node-dev',
    title: 'Node.js Development Internship',
    category: 'Engineering',
    department: 'Runtime Engineering',
    description: 'Specialize in asynchronous event-driven I/O, Node.js worker threads, Express/Fastify server architectures, and streaming pipelines for real-time web services.',
    responsibilities: [
      'Build performant microservices utilizing Express and Fastify framework engines',
      'Process high-volume asynchronous file and data streams with Node stream APIs',
      'Implement secure middleware for header sanitization, CORS, and JWT authorization',
      'Profile event loop latency and eliminate blocking operations'
    ],
    requiredSkills: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB / Mongoose', 'Redis', 'Streams & Buffers'],
    eligibility: ['Understanding of Node.js event loop, event emitters, and async/await mechanics', 'Basic Docker proficiency'],
    educationalRequirements: 'Computer Science, IT, or proven open-source contributions',
    duration: '2 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 20,
    deadline: '2026-12-25',
    stipend: '$700 - $1,050/month',
    certificateInfo: 'Verified Node.js Specialist Certificate & Verifiable Skill Credential',
    learningOutcomes: [
      'Master Node.js event loop internals and thread pool offloading',
      'Secure token authorization and cryptographic signing',
      'Deploying containerized Node apps to cloud environments'
    ],
    customQuestions: [
      { id: 'q1', question: 'What is the difference between process.nextTick() and setImmediate()?', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Cpu',
    postedDate: '2026-11-04'
  },
  {
    id: 'int-05',
    domainKey: 'fullstack-dev',
    title: 'Full Stack Development Internship',
    category: 'Engineering',
    department: 'Product Engineering',
    description: 'Bridge the gap between fluid client user experiences and resilient server infrastructures, delivering end-to-end features from database schema to interactive UI.',
    responsibilities: [
      'Develop end-to-end features spanning React frontend and Node/Express backend layers',
      'Create and maintain relational & document database schemas with migration tracking',
      'Integrate third-party services including payment gateways, OAuth, and webhooks',
      'Deploy full-stack applications with automated testing and continuous integration'
    ],
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL / MongoDB', 'Git'],
    eligibility: ['Prior experience shipping at least 1 full-stack project with active database persistence', 'Strong ownership mindset'],
    educationalRequirements: 'B.Tech / B.E. / B.S. in Computer Science or Software Engineering',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 30,
    deadline: '2026-12-30',
    stipend: '$900 - $1,350/month',
    certificateInfo: 'Full Stack Software Engineer Fellowship Certificate & Executive Endorsement',
    learningOutcomes: [
      'Comprehensive full-stack architecture design and state hydration',
      'Production deployment and real-time error telemetry',
      'Collaborative Agile sprint velocity & code review standards'
    ],
    customQuestions: [
      { id: 'q1', question: 'Link to a deployed full-stack app with credentials or test instructions', type: 'text', required: true },
      { id: 'q2', question: 'How do you design database schemas to support high-read vs high-write workloads?', type: 'textarea', required: false }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Layers',
    postedDate: '2026-11-05'
  },
  {
    id: 'int-06',
    domainKey: 'python-dev',
    title: 'Python Development Internship',
    category: 'Engineering',
    department: 'Python & Data Systems',
    description: 'Build enterprise backend services, automation scripts, asynchronous web crawlers, and data transformation engines with Python 3.12, FastAPI, and Celery.',
    responsibilities: [
      'Develop high-throughput REST and WebSocket APIs using FastAPI and Pydantic',
      'Write asynchronous background worker tasks managed via Celery and Redis',
      'Automate system operations, ETL workflows, and external data extraction scripts',
      'Write thorough pytest test suites with mock interfaces and fixtures'
    ],
    requiredSkills: ['Python 3.11+', 'FastAPI / Django', 'SQLAlchemy', 'PostgreSQL', 'pytest', 'Docker'],
    eligibility: ['Strong object-oriented and functional programming skills in Python', 'Familiarity with typing and virtual environments'],
    educationalRequirements: 'Enrolled in or graduated with a Computer Science, Data, or Engineering degree',
    duration: '2 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 22,
    deadline: '2026-12-22',
    stipend: '$700 - $1,100/month',
    certificateInfo: 'Python Engineering Certificate of Excellence & Verified LoR',
    learningOutcomes: [
      'Asyncio mastery and concurrent task scheduling',
      'ORM tuning, raw SQL queries, and database transactions',
      'Packaging and containerization best practices'
    ],
    customQuestions: [
      { id: 'q1', question: 'Describe how you use Python generators to process large data files with minimal memory footprint', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Terminal',
    postedDate: '2026-11-02'
  },
  {
    id: 'int-07',
    domainKey: 'ai-development',
    title: 'Artificial Intelligence Internship',
    category: 'Artificial Intelligence',
    department: 'AI Research & Applications',
    description: 'Explore neural network architectures, prompt engineering pipelines, autonomous agents, and multimodal reasoning systems using cutting-edge Gemini and foundation models.',
    responsibilities: [
      'Construct agentic workflows utilizing function calling, grounding, and memory stores',
      'Evaluate model outputs against safety benchmarks and factual consistency metrics',
      'Implement retrieval-augmented generation (RAG) pipelines with hybrid search',
      'Fine-tune lightweight parameter-efficient models (LoRA) for domain-specific tasks'
    ],
    requiredSkills: ['Python', 'Gemini / LLM APIs', 'LangChain / LlamaIndex', 'Vector Databases', 'Prompt Engineering'],
    eligibility: ['Solid grasp of linear algebra, calculus, and neural network fundamentals', 'Experience with modern AI APIs'],
    educationalRequirements: 'B.S. / M.S. in Computer Science, Data Science, AI, or Mathematics',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 16,
    deadline: '2026-12-28',
    stipend: '$1,000 - $1,500/month',
    certificateInfo: 'AI Systems Specialist Fellowship Certificate & Research Recommendation',
    learningOutcomes: [
      'Autonomous multi-step tool use and reasoning execution',
      'Vector embeddings indexing, chunking, and semantic ranking',
      'Production inference latency and token optimization'
    ],
    customQuestions: [
      { id: 'q1', question: 'What strategies do you employ to mitigate hallucinations in RAG pipelines?', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Sparkles',
    postedDate: '2026-11-06'
  },
  {
    id: 'int-08',
    domainKey: 'machine-learning',
    title: 'Machine Learning Internship',
    category: 'Artificial Intelligence',
    department: 'Applied Machine Learning',
    description: 'Train, evaluate, and deploy classical and deep learning models for classification, regression, clustering, and anomaly detection in real-world scenarios.',
    responsibilities: [
      'Preprocess messy real-world datasets, engineer predictive features, and impute missing variables',
      'Train supervised and unsupervised models using scikit-learn, XGBoost, and PyTorch',
      'Perform hyperparameter tuning, cross-validation, and ROC/PR curve evaluations',
      'Export models to ONNX and deploy scalable inference REST microservices'
    ],
    requiredSkills: ['Python', 'PyTorch / TensorFlow', 'scikit-learn', 'Pandas & NumPy', 'Feature Engineering'],
    eligibility: ['Proven machine learning coursework or Kaggle notebook submissions', 'Sound mathematical intuition'],
    educationalRequirements: 'Undergraduate or Master student in STEM or Computational Sciences',
    duration: '3 Months',
    location: 'Hybrid',
    mode: 'Hybrid',
    positions: 14,
    deadline: '2026-12-24',
    stipend: '$900 - $1,400/month',
    certificateInfo: 'Applied Machine Learning Fellow Credential & Verifiable LoR',
    learningOutcomes: [
      'End-to-end model training lifecycle from EDA to deployment',
      'Handling class imbalance, data drift, and model decay',
      'MLflow experiment tracking and model registry'
    ],
    customQuestions: [
      { id: 'q1', question: 'Share a link to your Kaggle, GitHub, or research paper showcasing your ML projects', type: 'text', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'BrainCircuit',
    postedDate: '2026-11-04'
  },
  {
    id: 'int-09',
    domainKey: 'data-science',
    title: 'Data Science Internship',
    category: 'Data & Analytics',
    department: 'Data Intelligence',
    description: 'Uncover actionable strategic insights from complex telemetry and business datasets through statistical hypothesis testing, predictive modeling, and storytelling.',
    responsibilities: [
      'Formulate statistical hypotheses, run A/B test experiments, and compute statistical significance',
      'Build automated ETL data ingestion scripts and exploratory visual dashboards',
      'Develop clustering algorithms for customer segmentation and retention modeling',
      'Deliver executive presentations translating numerical findings into commercial actions'
    ],
    requiredSkills: ['Python / R', 'SQL (Advanced Window Functions)', 'Pandas', 'Seaborn / Plotly', 'Statistics'],
    eligibility: ['Proficiency with statistical analysis, regression models, and SQL querying', 'Strong analytical mindset'],
    educationalRequirements: 'Bachelor or Master candidate in Statistics, Economics, CS, or Data Science',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 18,
    deadline: '2026-12-21',
    stipend: '$800 - $1,200/month',
    certificateInfo: 'Certified Data Science Associate & Industry Recommendation',
    learningOutcomes: [
      'Experimentation design and causal inference foundations',
      'Advanced SQL data modeling and dimensional warehousing',
      'Executive dashboard presentation skills'
    ],
    customQuestions: [
      { id: 'q1', question: 'How do you determine the required sample size and statistical power for an A/B test?', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'LineChart',
    postedDate: '2026-11-03'
  },
  {
    id: 'int-10',
    domainKey: 'data-analytics',
    title: 'Data Analytics Internship',
    category: 'Data & Analytics',
    department: 'Business Intelligence',
    description: 'Transform raw data into beautiful, actionable dashboards in Power BI, Tableau, and SQL to monitor organizational KPIs and power executive decision-making.',
    responsibilities: [
      'Design interactive executive dashboards with Power BI, Tableau, or Metabase',
      'Write optimized SQL queries and stored procedures to aggregate metric tables',
      'Audit data pipelines for accuracy, consistency, and completeness anomalies',
      'Coordinate with product managers to define tracking events and user journey funnels'
    ],
    requiredSkills: ['SQL', 'Power BI / Tableau', 'Excel (Macros & DAX)', 'Data Cleaning', 'KPI Modeling'],
    eligibility: ['Demonstrated ability to clean, shape, and visualize business data', 'Familiarity with business metrics (CAC, LTV, Churn)'],
    educationalRequirements: 'Business, Engineering, Mathematics, or Information Systems degree',
    duration: '2 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 25,
    deadline: '2026-12-19',
    stipend: '$650 - $950/month',
    certificateInfo: 'Professional Data Analytics Credential & Certificate of Merit',
    learningOutcomes: [
      'Star schema and snowflake dimensional data modeling',
      'Interactive executive KPI storytelling',
      'Automated scheduled report distribution'
    ],
    customQuestions: [
      { id: 'q1', question: 'Describe a project where your data analysis led directly to a business or academic decision', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'BarChart3',
    postedDate: '2026-11-01'
  },
  {
    id: 'int-11',
    domainKey: 'cybersecurity',
    title: 'Cybersecurity Internship',
    category: 'Security & Operations',
    department: 'Information Security',
    description: 'Protect cloud infrastructure, perform vulnerability assessments, investigate security alerts, and master threat modeling and defensive posture engineering.',
    responsibilities: [
      'Conduct static and dynamic vulnerability scans across web applications and network endpoints',
      'Assist in incident response triage, log correlation (SIEM), and packet inspection',
      'Audit IAM policies, encryption at rest/in-transit, and security compliance postures',
      'Simulate phishing campaigns and draft security awareness guidelines'
    ],
    requiredSkills: ['Network Security (TCP/IP)', 'Linux Fundamentals', 'Wireshark & Nmap', 'OWASP Top 10', 'Python Scripting'],
    eligibility: ['Basic understanding of security fundamentals, cryptography, and network topologies', 'Passion for ethical defense'],
    educationalRequirements: 'Studies in Cybersecurity, Computer Networks, CS, or recognized security certifications (Security+, CEH)',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 12,
    deadline: '2026-12-27',
    stipend: '$850 - $1,300/month',
    certificateInfo: 'Cyber Defense Specialist Credential & Security LoR',
    learningOutcomes: [
      'Hands-on penetration testing methodology and report writing',
      'SIEM log analysis and automated alert triage',
      'Cloud security posture management (CSPM)'
    ],
    customQuestions: [
      { id: 'q1', question: 'How would you identify and remediate a blind SQL injection vulnerability?', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'ShieldAlert',
    postedDate: '2026-11-05'
  },
  {
    id: 'int-12',
    domainKey: 'ui-ux-design',
    title: 'UI/UX Design Internship',
    category: 'Design & Creative',
    department: 'Product Design',
    description: 'Craft elegant, human-centric design systems, clickable prototypes, wireframes, and conducted user research for next-generation dark-mode SaaS platforms.',
    responsibilities: [
      'Create high-fidelity component libraries and design tokens in Figma',
      'Conduct usability interviews, synthesize findings, and map user journey flows',
      'Build interactive micro-prototypes testing animation timings and user feedback',
      'Ensure WCAG 2.1 AA accessibility compliance across contrast, typography, and focus states'
    ],
    requiredSkills: ['Figma (Auto Layout & Components)', 'Design Systems', 'Wireframing', 'User Research', 'Usability Testing'],
    eligibility: ['A visual design portfolio featuring at least 2 detailed case studies', 'Strong understanding of typography and layout grid math'],
    educationalRequirements: 'Graphic Design, HCI, Product Design, or self-directed UI portfolio',
    duration: '2 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 20,
    deadline: '2026-12-22',
    stipend: '$700 - $1,100/month',
    certificateInfo: 'Product Design Fellowship Certificate & Verified Recommendation',
    learningOutcomes: [
      'Design tokens and atomic design methodology',
      'Design-to-engineering handoff workflows',
      'Complex dashboard layout orchestration and micro-interactions'
    ],
    customQuestions: [
      { id: 'q1', question: 'Please share your Figma, Behance, or personal design portfolio URL', type: 'text', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Palette',
    postedDate: '2026-11-04'
  },
  {
    id: 'int-13',
    domainKey: 'graphic-design',
    title: 'Graphic Design Internship',
    category: 'Design & Creative',
    department: 'Brand & Marketing',
    description: 'Develop magnetic brand assets, digital marketing collateral, vector illustrations, editorial typography, and social media creative campaigns.',
    responsibilities: [
      'Design high-impact visual banners, infographics, and editorial promotional decks',
      'Craft vector logos, brand marks, and iconography guidelines in Adobe Illustrator',
      'Produce visual templates for product announcements, newsletters, and social channels',
      'Ensure visual harmony with global brand guidelines across digital touchpoints'
    ],
    requiredSkills: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Typography & Color Theory', 'Brand Identity'],
    eligibility: ['Curated digital portfolio showcasing typography, layout, and composition skills', 'Eye for detail and creative flair'],
    educationalRequirements: 'Fine Arts, Visual Communication, Graphic Design, or equivalent portfolio',
    duration: '2 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 15,
    deadline: '2026-12-16',
    stipend: '$600 - $900/month',
    certificateInfo: 'Creative Brand Designer Certificate & Professional LoR',
    learningOutcomes: [
      'Commercial brand identity system construction',
      'Color management and print vs screen export standards',
      'Fast-paced creative turnaround in sprint environments'
    ],
    customQuestions: [
      { id: 'q1', question: 'Link to your graphic design portfolio (Behance / Dribbble / PDF)', type: 'text', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'PenTool',
    postedDate: '2026-11-02'
  },
  {
    id: 'int-14',
    domainKey: 'mobile-app-dev',
    title: 'Mobile App Development Internship',
    category: 'Engineering',
    department: 'Mobile Technologies',
    description: 'Engineer responsive, native-feeling mobile applications for iOS and Android using React Native and Flutter with offline-first synchronization.',
    responsibilities: [
      'Build performant cross-platform mobile screens using React Native / Flutter',
      'Integrate device hardware APIs (camera, geolocation, biometric authentication)',
      'Implement offline SQLite / WatermelonDB local caching and optimistic syncing',
      'Optimize bundle size, launch times, and 60 FPS scrolling smoothness'
    ],
    requiredSkills: ['React Native / Flutter', 'TypeScript / Dart', 'Mobile Navigation', 'REST / GraphQL', 'App Store / Play Store basics'],
    eligibility: ['Prior experience compiling and testing a mobile app on real devices or emulators', 'Good understanding of mobile UI guidelines'],
    educationalRequirements: 'Computer Science, Software Engineering, or related technical background',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 16,
    deadline: '2026-12-26',
    stipend: '$800 - $1,250/month',
    certificateInfo: 'Mobile Systems Engineering Certificate & Verifiable Credential',
    learningOutcomes: [
      'Deep linking and push notification architectures',
      'Native bridge modules and performance profiling',
      'Mobile CI/CD build pipelines (Fastlane)'
    ],
    customQuestions: [
      { id: 'q1', question: 'Have you published an app or APK to GitHub/stores? Share links here', type: 'text', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Smartphone',
    postedDate: '2026-11-05'
  },
  {
    id: 'int-15',
    domainKey: 'cloud-computing',
    title: 'Cloud Computing Internship',
    category: 'Cloud & Infrastructure',
    department: 'Cloud Architecture',
    description: 'Architect, provision, and maintain resilient cloud infrastructure on Google Cloud Platform and AWS using Infrastructure as Code (Terraform) and serverless services.',
    responsibilities: [
      'Write reusable Terraform / CloudFormation templates to provision VPCs, clusters, and buckets',
      'Configure serverless Cloud Functions, Cloud Run, and container deployments',
      'Monitor cloud resource consumption, implement auto-scaling policies, and reduce egress costs',
      'Set up centralized CloudWatch / Cloud Logging alerting and uptime dashboards'
    ],
    requiredSkills: ['Google Cloud / AWS', 'Terraform (IaC)', 'Docker', 'Linux Administration', 'Networking (VPC, DNS, CDN)'],
    eligibility: ['Foundational knowledge of public cloud services and virtualization', 'Comfort with Linux command line'],
    educationalRequirements: 'Cloud Computing, Computer Science, IT, or AWS/GCP associate certification',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 14,
    deadline: '2026-12-23',
    stipend: '$900 - $1,400/month',
    certificateInfo: 'Cloud Solutions Associate Credential & Executive Recommendation',
    learningOutcomes: [
      'Multi-region resilient cloud architecture design',
      'Zero-trust cloud network security policies',
      'Cost optimization and FinOps auditing'
    ],
    customQuestions: [
      { id: 'q1', question: 'Explain how you configure a private VPC subnet with secure egress via NAT gateway', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Cloud',
    postedDate: '2026-11-03'
  },
  {
    id: 'int-16',
    domainKey: 'devops-engineering',
    title: 'DevOps Engineering Internship',
    category: 'Cloud & Infrastructure',
    department: 'Platform Engineering',
    description: 'Automate build, test, and release pipelines using GitHub Actions, Docker, Kubernetes, Helm, and GitOps workflows to supercharge engineering velocity.',
    responsibilities: [
      'Construct automated CI/CD workflows using GitHub Actions and ArgoCD',
      'Manage container orchestration using Kubernetes manifests, ingress, and configmaps',
      'Implement Prometheus and Grafana telemetry dashboards and PagerDuty alert triggers',
      'Manage security scans in pipeline (Trivy, SonarQube, secret scanners)'
    ],
    requiredSkills: ['Kubernetes (K8s)', 'Docker', 'CI/CD (GitHub Actions)', 'Linux & Bash', 'Prometheus & Grafana'],
    eligibility: ['Experience with containerization and writing automated shell or pipeline scripts', 'Understanding of 12-factor apps'],
    educationalRequirements: 'Computer Engineering, IT, Software Engineering, or equivalent practical track',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 12,
    deadline: '2026-12-29',
    stipend: '$950 - $1,450/month',
    certificateInfo: 'DevOps & Site Reliability Fellow Credential & Industry LoR',
    learningOutcomes: [
      'Production Kubernetes cluster administration',
      'Zero-downtime blue/green and canary deployments',
      'Automated disaster recovery testing'
    ],
    customQuestions: [
      { id: 'q1', question: 'Walk through how you would configure a blue/green deployment strategy using Kubernetes', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Workflow',
    postedDate: '2026-11-06'
  },
  {
    id: 'int-17',
    domainKey: 'qa-testing',
    title: 'Software Testing and QA Internship',
    category: 'Engineering',
    department: 'Quality Assurance',
    description: 'Ensure flawless software quality by designing test plans, writing automated end-to-end regression suites with Playwright/Cypress, and conducting load testing.',
    responsibilities: [
      'Author structured test plans, test cases, and edge-case test matrices from product specs',
      'Develop automated end-to-end and API integration tests using Playwright and Jest',
      'Run stress and load tests using k6 to identify concurrency bottlenecks',
      'File detailed bug tickets with reproducible steps, network traces, and video attachments'
    ],
    requiredSkills: ['Manual & Automation Testing', 'Playwright / Cypress', 'Postman / REST Testing', 'k6 Load Testing', 'Jira / Bug Tracking'],
    eligibility: ['Analytical mindset with keen eye for edge cases and regressions', 'Basic JavaScript/TypeScript scripting ability'],
    educationalRequirements: 'Computer Science, Quality Engineering, Information Technology, or ISTQB cert',
    duration: '2 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 18,
    deadline: '2026-12-17',
    stipend: '$650 - $950/month',
    certificateInfo: 'Quality Assurance Engineer Certificate & Letter of Recommendation',
    learningOutcomes: [
      'Automated UI and API test suite orchestration',
      'CI/CD test report generation and failure triaging',
      'Performance benchmarking and stress testing'
    ],
    customQuestions: [
      { id: 'q1', question: 'How do you design an edge-case test matrix for a payment checkout flow?', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'CheckCircle2',
    postedDate: '2026-11-02'
  },
  {
    id: 'int-18',
    domainKey: 'database-mgmt',
    title: 'Database Management Internship',
    category: 'Data & Infrastructure',
    department: 'Data Platform Operations',
    description: 'Design robust relational and document database schemas, fine-tune query execution plans, manage high-availability replication, and execute data migrations.',
    responsibilities: [
      'Design normalized relational schemas (PostgreSQL) and flexible document models (MongoDB)',
      'Analyze query execution plans (`EXPLAIN ANALYZE`), build B-tree/GIN indexes, and vacuum tables',
      'Implement automated backup retention schedules and point-in-time recovery simulations',
      'Audit database security, role privileges, connection pooling (PgBouncer), and encryption'
    ],
    requiredSkills: ['PostgreSQL', 'MongoDB', 'Query Optimization', 'Database Indexing', 'PgBouncer / Pooling', 'Data Modeling'],
    eligibility: ['Strong grasp of relational algebra, ACID guarantees, and database normal forms', 'Command of SQL and NoSQL queries'],
    educationalRequirements: 'Computer Science, Database Engineering, or relevant technical field',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 14,
    deadline: '2026-12-25',
    stipend: '$800 - $1,200/month',
    certificateInfo: 'Database Administration Fellow Credential & Verified LoR',
    learningOutcomes: [
      'High-scale database performance tuning and caching layers',
      'Zero-downtime database schema migration workflows',
      'Replication lag management and disaster recovery'
    ],
    customQuestions: [
      { id: 'q1', question: 'How do you diagnose and fix a slow query that performs a sequential table scan?', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Database',
    postedDate: '2026-11-04'
  },
  {
    id: 'int-19',
    domainKey: 'blockchain-dev',
    title: 'Blockchain Development Internship',
    category: 'Engineering',
    department: 'Decentralized Systems',
    description: 'Architect secure Solidity smart contracts, write gas-optimized EVM code, interact with Web3 client libraries (viem/wagmi), and conduct automated security audits.',
    responsibilities: [
      'Develop smart contracts adhering to ERC-20, ERC-721, and ERC-1155 standards in Solidity',
      'Write automated contract unit tests and fuzzing tests using Foundry and Hardhat',
      'Integrate frontend dApps using wagmi, viem, and RainbowKit wallet connectors',
      'Audit contracts for common vulnerabilities (reentrancy, integer overflow, flash loans)'
    ],
    requiredSkills: ['Solidity', 'Foundry / Hardhat', 'Ethereum / EVM', 'Web3.js / Viem', 'TypeScript'],
    eligibility: ['Solid understanding of cryptographic primitives, consensus mechanisms, and EVM gas dynamics', 'Solidity project experience'],
    educationalRequirements: 'Computer Science, Cryptography, Mathematics, or proven web3 portfolio',
    duration: '3 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 10,
    deadline: '2026-12-31',
    stipend: '$1,000 - $1,600/month',
    certificateInfo: 'Blockchain Systems Specialist Fellowship Certificate & Executive LoR',
    learningOutcomes: [
      'Gas optimization techniques and assembly (Yul) basics',
      'Smart contract security auditing methodology',
      'Zero-knowledge proof concepts and Layer 2 rollups'
    ],
    customQuestions: [
      { id: 'q1', question: 'Explain how you protect a smart contract from a reentrancy attack with code examples', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Boxes',
    postedDate: '2026-11-07'
  },
  {
    id: 'int-20',
    domainKey: 'digital-marketing',
    title: 'Digital Marketing Internship',
    category: 'Marketing & Growth',
    department: 'Growth & Acquisition',
    description: 'Drive candidate acquisition, design high-converting PPC campaigns, execute technical SEO strategies, manage email funnels, and track conversion attribution.',
    responsibilities: [
      'Manage search and social ad campaigns across Google Ads, Meta, and LinkedIn Ads',
      'Perform on-page and technical SEO keyword research and content optimization',
      'Write compelling copywriting for high-converting landing pages and email nurture sequences',
      'Track full-funnel conversion analytics with Google Analytics 4 and Mixpanel'
    ],
    requiredSkills: ['Google Analytics 4', 'SEO (Ahrefs/SEMrush)', 'Paid Social & Search Ads', 'Copywriting', 'Email Automation'],
    eligibility: ['Passionate about digital growth strategies, conversion rate optimization, and data-backed marketing', 'Strong written English'],
    educationalRequirements: 'Marketing, Mass Communications, Business, or proven track record running digital campaigns',
    duration: '2 Months',
    location: 'Remote',
    mode: 'Remote',
    positions: 20,
    deadline: '2026-12-18',
    stipend: '$600 - $950/month',
    certificateInfo: 'Digital Growth & Performance Marketing Certificate & Verified LoR',
    learningOutcomes: [
      'Full-funnel paid media budget allocation and ROAS optimization',
      'Technical SEO site architecture and structured schema markup',
      'Multi-touch conversion attribution modeling'
    ],
    customQuestions: [
      { id: 'q1', question: 'Describe a marketing campaign you initiated and how you measured its ROI and CAC', type: 'textarea', required: true }
    ],
    isDemoListing: true,
    isActive: true,
    iconName: 'Megaphone',
    postedDate: '2026-11-03'
  }
];

export const INITIAL_USER = {
  id: 'usr-sawaira-01',
  name: 'Sawaira Maryam',
  email: 'SawairaMaryam12@outlook.com',
  role: 'candidate' as const,
  headline: 'Aspiring Full Stack & AI Software Engineer',
  phone: '+1 (555) 234-5678',
  university: 'University of Engineering & Technology',
  degree: 'Bachelor of Science in Computer Science',
  semester: '7th Semester',
  cgpa: '3.85 / 4.0',
  skills: ['React.js', 'Node.js', 'TypeScript', 'Python', 'Tailwind CSS', 'MongoDB', 'REST APIs', 'Git'],
  experience: '2 years of project development & academic software engineering research in full-stack web applications and machine learning.',
  resumeName: 'Sawaira_Maryam_CV_Software_Engineer.pdf',
  resumeUrl: '#',
  linkedIn: 'maryam-55b6653b8/',
  github: 'https://github.com/sawairamaryam837-spec',
  portfolio: 'https://sawairamaryam.dev'
};

export const INITIAL_ADMIN = {
  id: 'usr-admin-01',
  name: 'Anglina Vance',
  email: 'anglina.admin@certofthings.io',
  role: 'admin' as const,
  headline: 'Head of Global Talent & Recruitment Operations',
  phone: '+1 (555) 987-6543',
  skills: ['Talent Acquisition', 'Engineering Recruitment', 'Pipeline Analytics', 'Candidate Evaluation']
};

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-01',
    applicationNumber: '#COT-20462',
    internshipId: 'int-02',
    domainTitle: 'React.js Development Internship',
    candidateId: 'usr-sawaira-01',
    candidateName: 'Sawaira Maryam',
    candidateEmail: 'SawairaMaryam12@outlook.com',
    candidatePhone: '+1 (555) 234-5678',
    university: 'University of Engineering & Technology',
    degree: 'B.S. in Computer Science',
    semester: '7th Semester',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Node.js'],
    relevantExperience: 'Built production-grade interactive SaaS portals with real-time state, responsive dark themes, and modular components.',
    purposeStatement: 'I am passionate about building exceptional user experiences and mastering enterprise React architectures at CertOfThings.',
    projectExperience: 'Engineered a full-stack candidate discovery dashboard and real-time collaboration canvas with WebSocket synchronization.',
    availableHoursPerWeek: 25,
    resumeName: 'Sawaira_Maryam_CV_Software_Engineer.pdf',
    portfolioUrl: 'https://sawairamaryam.dev',
    answers: {
      q1: 'I prevent re-renders using React.memo, stable useCallback/useMemo references, and granular Zustand selector subscriptions.',
      q2: 'https://github.com/sawairamaryam837-spec'
    },
    status: 'offer_issued',
    appliedDate: '2026-11-02',
    reviewDate: '2026-11-06',
    reviewNotes: 'Outstanding technical portfolio, pristine code samples, and stellar answers during the architectural technical round.',
    timeline: [
      { step: 1, title: 'Application Submitted', description: 'Application received and validated via CertOfThings portal.', timestamp: '2026-11-02 10:15 AM', completed: true },
      { step: 2, title: 'Confirmation Email Sent', description: 'Immediate confirmation email dispatched to candidate inbox.', timestamp: '2026-11-02 10:16 AM', completed: true },
      { step: 3, title: 'Application Under Review', description: 'Candidate profile and CV reviewed by engineering talent team.', timestamp: '2026-11-03 02:40 PM', completed: true },
      { step: 4, title: 'Shortlisted', description: 'Passed screening review with an A+ rating on technical portfolio.', timestamp: '2026-11-04 11:20 AM', completed: true },
      { step: 5, title: 'Interview Conducted', description: 'Live architectural evaluation and code walkthrough completed.', timestamp: '2026-11-06 03:00 PM', completed: true },
      { step: 6, title: 'Final Decision: Approved', description: 'Recruitment committee approved candidate for final fellowship.', timestamp: '2026-11-08 09:30 AM', completed: true },
      { step: 7, title: 'Offer Letter Issued', description: 'Official signed internship offer letter generated and emailed.', timestamp: '2026-11-09 01:00 PM', completed: true }
    ],
    interview: {
      scheduledDate: '2026-11-06',
      scheduledTime: '15:00 - 15:45 EST',
      interviewerName: 'Dr. Adrian Vance',
      meetLink: 'https://meet.google.com/cot-rec-vance',
      roundName: 'Technical & System Architecture Round',
      notes: 'Exceptional communication and deep understanding of React concurrent rendering.'
    },
    offerLetterId: 'offer-01',
    submissionSource: 'native_portal'
  },
  {
    id: 'app-02',
    applicationNumber: '#COT-20463',
    internshipId: 'int-05',
    domainTitle: 'Full Stack Development Internship',
    candidateId: 'usr-sawaira-01',
    candidateName: 'Sawaira Maryam',
    candidateEmail: 'SawairaMaryam12@outlook.com',
    candidatePhone: '+1 (555) 234-5678',
    university: 'University of Engineering & Technology',
    degree: 'B.S. in Computer Science',
    semester: '7th Semester',
    skills: ['Node.js', 'Express', 'React', 'MongoDB', 'REST APIs'],
    relevantExperience: 'Experience structuring backend REST APIs, authentication middleware, and database schema migrations.',
    purposeStatement: 'Eager to deepen my full-stack engineering skills across scalable cloud architectures.',
    projectExperience: 'Built automated email notification queues and REST endpoints with rate limiting and schema validation.',
    availableHoursPerWeek: 20,
    resumeName: 'Sawaira_Maryam_CV_Software_Engineer.pdf',
    portfolioUrl: 'https://sawairamaryam.dev',
    answers: {
      q1: 'https://github.com/sawairamaryam837-spec',
      q2: 'I design relational schemas with foreign key constraints and strategic composite indexing on query filter columns.'
    },
    status: 'interview_scheduled',
    appliedDate: '2026-11-04',
    reviewDate: '2026-11-07',
    reviewNotes: 'Impressive full stack project experience. Scheduled for technical panel.',
    timeline: [
      { step: 1, title: 'Application Submitted', description: 'Received successfully.', timestamp: '2026-11-04 04:20 PM', completed: true },
      { step: 2, title: 'Confirmation Email Sent', description: 'Confirmation email dispatched.', timestamp: '2026-11-04 04:21 PM', completed: true },
      { step: 3, title: 'Application Under Review', description: 'Technical lead reviewed repositories.', timestamp: '2026-11-06 01:10 PM', completed: true },
      { step: 4, title: 'Shortlisted', description: 'Selected for interview stage.', timestamp: '2026-11-07 10:00 AM', completed: true },
      { step: 5, title: 'Interview Scheduled', description: 'Interview scheduled for upcoming slot.', timestamp: '2026-11-08 02:00 PM', completed: true },
      { step: 6, title: 'Final Decision', description: 'Pending interview evaluation.', timestamp: 'Pending', completed: false },
      { step: 7, title: 'Offer Letter Issued', description: 'Pending decision.', timestamp: 'Pending', completed: false }
    ],
    interview: {
      scheduledDate: '2026-11-12',
      scheduledTime: '14:00 - 14:45 EST',
      interviewerName: 'Marcus Sterling',
      meetLink: 'https://meet.google.com/cot-fullstack-panel',
      roundName: 'Live Coding & Database Schema Discussion'
    },
    submissionSource: 'native_portal'
  },
  {
    id: 'app-03',
    applicationNumber: '#COT-20464',
    internshipId: 'int-07',
    domainTitle: 'Artificial Intelligence Internship',
    candidateId: 'usr-03',
    candidateName: 'John Myer',
    candidateEmail: 'john.myer@alumni.edu',
    candidatePhone: '+1 (555) 345-9876',
    university: 'Stanford University',
    degree: 'B.S. in Computer Science (AI Track)',
    semester: '8th Semester',
    skills: ['Python', 'PyTorch', 'Gemini APIs', 'RAG Pipelines'],
    relevantExperience: 'Researched multimodal retrieval and function-calling agentic architectures.',
    purposeStatement: 'Eager to contribute to foundation model application engineering.',
    projectExperience: 'Constructed an open-source evaluation benchmark for vector retrieval grounding.',
    availableHoursPerWeek: 30,
    resumeName: 'John_Myer_Resume.pdf',
    answers: {
      q1: 'We use contextual chunking, re-ranking with cross-encoders, and strict factual ground truth citation checks.'
    },
    status: 'under_review',
    appliedDate: '2026-11-05',
    timeline: [
      { step: 1, title: 'Application Submitted', description: 'Application filed online.', timestamp: '2026-11-05 09:00 AM', completed: true },
      { step: 2, title: 'Confirmation Email Sent', description: 'Confirmation sent.', timestamp: '2026-11-05 09:01 AM', completed: true },
      { step: 3, title: 'Application Under Review', description: 'AI research team reviewing.', timestamp: '2026-11-07 11:30 AM', completed: true },
      { step: 4, title: 'Shortlisted', description: 'Pending review.', timestamp: 'Pending', completed: false },
      { step: 5, title: 'Interview', description: 'Pending.', timestamp: 'Pending', completed: false },
      { step: 6, title: 'Final Decision', description: 'Pending.', timestamp: 'Pending', completed: false },
      { step: 7, title: 'Offer Letter Issued', description: 'Pending.', timestamp: 'Pending', completed: false }
    ],
    submissionSource: 'native_portal'
  },
  {
    id: 'app-04',
    applicationNumber: '#COT-20465',
    internshipId: 'int-11',
    domainTitle: 'Cybersecurity Internship',
    candidateId: 'usr-04',
    candidateName: 'Elena Rostova',
    candidateEmail: 'elena.rostova@techsec.org',
    candidatePhone: '+1 (555) 789-1234',
    university: 'Carnegie Mellon University',
    degree: 'M.S. in Information Security',
    semester: '2nd Semester',
    skills: ['Network Security', 'Wireshark', 'OWASP', 'Linux', 'Python'],
    relevantExperience: 'CTF participant with focus on web exploitation and reverse engineering.',
    purposeStatement: 'Committed to enterprise defense posture hardening.',
    projectExperience: 'Automated vulnerability scanner integrated with CI pipeline.',
    availableHoursPerWeek: 25,
    resumeName: 'Elena_Rostova_CyberCV.pdf',
    answers: {
      q1: 'Identify time delays with sleep/benchmark payloads, enforce parameterized queries, and disable verbose database error messages.'
    },
    status: 'shortlisted',
    appliedDate: '2026-11-06',
    reviewDate: '2026-11-08',
    reviewNotes: 'High CTF ranking and sound network security knowledge.',
    timeline: [
      { step: 1, title: 'Application Submitted', description: 'Application filed.', timestamp: '2026-11-06 11:00 AM', completed: true },
      { step: 2, title: 'Confirmation Email Sent', description: 'Confirmation dispatched.', timestamp: '2026-11-06 11:01 AM', completed: true },
      { step: 3, title: 'Application Under Review', description: 'Reviewed by SecOps Lead.', timestamp: '2026-11-07 03:15 PM', completed: true },
      { step: 4, title: 'Shortlisted', description: 'Recommended for Security Interview.', timestamp: '2026-11-08 01:45 PM', completed: true },
      { step: 5, title: 'Interview', description: 'Pending scheduling.', timestamp: 'Pending', completed: false },
      { step: 6, title: 'Final Decision', description: 'Pending.', timestamp: 'Pending', completed: false },
      { step: 7, title: 'Offer Letter Issued', description: 'Pending.', timestamp: 'Pending', completed: false }
    ],
    submissionSource: 'google_forms_sync'
  },
  {
    id: 'app-05',
    applicationNumber: '#COT-20466',
    internshipId: 'int-12',
    domainTitle: 'UI/UX Design Internship',
    candidateId: 'usr-05',
    candidateName: 'Dank Jenkins',
    candidateEmail: 'dank.jenkins@designlab.io',
    candidatePhone: '+1 (555) 432-8765',
    university: 'Rhode Island School of Design',
    degree: 'B.F.A. in Graphic & Interaction Design',
    semester: '6th Semester',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
    relevantExperience: 'Redesigned mobile banking flows with 40% increase in task completion speed.',
    purposeStatement: 'Love creating tactile, delightful dark mode dashboards.',
    projectExperience: 'Built a 120+ component design system in Figma with auto-layout and variable tokens.',
    availableHoursPerWeek: 20,
    resumeName: 'Dank_Jenkins_Portfolio.pdf',
    answers: {
      q1: 'https://behance.net/dankjenkins'
    },
    status: 'interview_scheduled',
    appliedDate: '2026-11-05',
    reviewDate: '2026-11-07',
    timeline: [
      { step: 1, title: 'Application Submitted', description: 'Application filed.', timestamp: '2026-11-05 08:30 AM', completed: true },
      { step: 2, title: 'Confirmation Email Sent', description: 'Confirmation sent.', timestamp: '2026-11-05 08:31 AM', completed: true },
      { step: 3, title: 'Application Under Review', description: 'Design portfolio evaluated.', timestamp: '2026-11-06 02:00 PM', completed: true },
      { step: 4, title: 'Shortlisted', description: 'Shortlisted for portfolio review.', timestamp: '2026-11-07 09:15 AM', completed: true },
      { step: 5, title: 'Interview Scheduled', description: 'Portfolio walkthrough scheduled.', timestamp: '2026-11-08 10:00 AM', completed: true },
      { step: 6, title: 'Final Decision', description: 'Pending review.', timestamp: 'Pending', completed: false },
      { step: 7, title: 'Offer Letter Issued', description: 'Pending.', timestamp: 'Pending', completed: false }
    ],
    interview: {
      scheduledDate: '2026-11-14',
      scheduledTime: '11:00 - 11:45 EST',
      interviewerName: 'Clara Oswald',
      meetLink: 'https://meet.google.com/cot-design-review',
      roundName: 'Portfolio Review & Live Design Exercise'
    },
    submissionSource: 'native_portal'
  }
];

export const INITIAL_OFFER_LETTER: OfferLetter = {
  id: 'offer-01',
  applicationId: 'app-01',
  applicationNumber: '#COT-20462',
  candidateName: 'Sawaira Maryam',
  candidateEmail: 'SawairaMaryam12@outlook.com',
  internshipTitle: 'React.js Development Internship',
  domain: 'Frontend Engineering',
  duration: '3 Months (Part-time / Remote)',
  startDate: '2026-12-01',
  stipend: '$1,000 / month (Paid Bi-Weekly)',
  mode: 'Remote',
  responsibilities: [
    'Design and build high-performance React 19 interface components adhering to CertOfThings design tokens',
    'Collaborate directly with senior engineering mentors on state hydration and concurrent rendering',
    'Participate in weekly sprint planning, agile standups, and peer code reviews',
    'Author robust automated unit and integration tests using Vitest and React Testing Library'
  ],
  terms: [
    'This internship is a fellowship engagement aimed at deep technical skill development and hands-on software engineering experience.',
    'Upon successful completion of the fellowship and project delivery, you will receive an official Verified Certificate of Completion and a personalized Letter of Recommendation (LoR).',
    'All intellectual property created during the fellowship shall remain the proprietary asset of CertOfThings Global Inc.',
    'Intern agrees to maintain strict confidentiality of proprietary company datasets and internal systems.'
  ],
  organizationName: 'CertOfThings Global Talent Inc.',
  authorizedSignatory: 'Dr. Adrian Vance',
  signatoryTitle: 'Vice President of Engineering & Academic Programs',
  issueDate: '2026-11-09',
  verificationCode: 'COT-VERIFY-2026-89412A',
  status: 'issued'
};

export const INITIAL_EMAIL_NOTIFICATIONS: EmailNotification[] = [
  {
    id: 'em-01',
    recipientEmail: 'SawairaMaryam12@outlook.com',
    recipientName: 'Sawaira Maryam',
    subject: 'Your Internship Application Has Been Received – CertOfThings',
    templateType: 'application_received',
    contentPreview: 'Thank you for applying for the React.js Development Internship (#COT-20462). Your application is now in our admissions pipeline.',
    htmlBody: `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #0f111a; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.2);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #a855f7; margin: 0; font-size: 24px;">CertOfThings</h2>
          <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;">Global Internship & Talent Admissions</p>
        </div>
        <p style="font-size: 16px;">Dear <strong>Sawaira Maryam</strong>,</p>
        <p style="color: #cbd5e1; line-height: 1.6;">Thank you for submitting your application for the <strong>React.js Development Internship</strong> at CertOfThings.</p>
        <div style="background: rgba(26, 29, 46, 0.8); border: 1px solid rgba(255,255,255,0.08); padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 4px 0; font-size: 14px;"><strong>Application Reference:</strong> #COT-20462</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Submission Date:</strong> November 2, 2026</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Target Role:</strong> React.js Development Internship</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Expected Review Period:</strong> 3 – 5 Business Days</p>
        </div>
        <p style="color: #cbd5e1; line-height: 1.6;">Our technical admissions committee is currently evaluating your portfolio and credentials. You can monitor the real-time status of your application via your candidate dashboard at any time.</p>
        <div style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
          CertOfThings Admissions Team · admissions@certofthings.io · certofthings.io
        </div>
      </div>
    `,
    sentAt: '2026-11-02 10:16 AM',
    status: 'sent'
  },
  {
    id: 'em-02',
    recipientEmail: 'SawairaMaryam12@outlook.com',
    recipientName: 'Sawaira Maryam',
    subject: 'Official Internship Offer Letter – CertOfThings Fellowship',
    templateType: 'offer_letter',
    contentPreview: 'Congratulations Sawaira! We are delighted to formally offer you the React.js Development Internship position.',
    htmlBody: `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #0f111a; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.3);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #c084fc; margin: 0; font-size: 24px;">CertOfThings</h2>
          <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;">Official Offer Notification</p>
        </div>
        <p style="font-size: 16px;">Dear <strong>Sawaira Maryam</strong>,</p>
        <p style="color: #cbd5e1; line-height: 1.6;">On behalf of the CertOfThings leadership and engineering team, we are thrilled to formally extend an offer for the <strong>React.js Development Internship</strong> program.</p>
        <div style="background: rgba(30, 20, 60, 0.7); border: 1px solid rgba(168, 85, 247, 0.3); padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 4px 0; font-size: 14px;"><strong>Start Date:</strong> December 1, 2026</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Duration:</strong> 3 Months (Remote)</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Stipend:</strong> $1,000 / month</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Verification ID:</strong> COT-VERIFY-2026-89412A</p>
        </div>
        <p style="color: #cbd5e1; line-height: 1.6;">Your personalized official offer letter document has been generated and attached. Please log into your portal to review and accept the offer terms.</p>
        <div style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
          CertOfThings Engineering Leadership · Dr. Adrian Vance
        </div>
      </div>
    `,
    sentAt: '2026-11-09 01:05 PM',
    status: 'sent',
    hasAttachment: true,
    attachmentName: 'CertOfThings_Offer_Letter_Sawaira_Maryam.pdf'
  }
];

export const INITIAL_SMTP_CONFIG: SmtpConfig = {
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  user: 'admissions@certofthings.io',
  fromName: 'CertOfThings Talent Team',
  fromEmail: 'admissions@certofthings.io',
  isEnabled: true
};

export const INITIAL_GOOGLE_FORMS_CONFIG: GoogleFormsIntegrationConfig = {
  formId: '1FAIpQLScertofthings-sync-2026',
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScertofthings-master-app/viewform',
  webhookSecret: 'cot_whsec_98f410d8e2a',
  autoSync: true,
  lastSyncAt: '2026-11-09 08:30 PM',
  totalSyncedCount: 42
};
