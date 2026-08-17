import type { Station } from '@/types/stations'

export const STATIONS: Station[] = [
  {
    id: 'base-town',
    index: 1,
    name: 'Base Town',
    kicker: 'Where the journey begins',
    title: 'Arthur Torres',
    role: 'Computer Engineer · Full Stack Engineer',
    tagline:
      'Computer Engineer with 8+ years building web applications that run fast, hold up under load, and grow with the business.',
    map: { x: 51.7, y: 66 },
    blocks: [
      {
        type: 'prose',
        lead: true,
        text: 'I am a Computer Engineer, and I approach every project with method: I understand the problem, measure, decide with criteria, and build solutions that are meant to last. And when no clear path exists, I design one.',
      },
      {
        type: 'pillars',
        items: [
          { label: 'Method', note: 'measure, decide, build with criteria' },
          { label: 'Resilient', note: 'systems that hold under load' },
          { label: 'Maintainable', note: 'built for the next engineer' },
        ],
      },
      {
        type: 'prose',
        text: 'The road here was never a straight line. I come from a humble family that taught me two things — to believe in God and to never give up. I fell for computing before university out of pure curiosity: tinkering with scripts, modding games, building my first website. That is how I taught myself HTML, CSS, JavaScript, PHP and SQL.',
      },
      {
        type: 'prose',
        text: 'Life took a detour — six years at Timberland, from the warehouse floor to store manager. It gave me discipline, people skills, and a real sense of what it means to lead a team. In 2018 I returned to my true path: software, first as a frontend developer, then full stack. The consistency, and the drive to do things right rather than merely fast, come from my faith — the foundation under everything I build.',
      },
      {
        type: 'prose',
        text: 'Base Town is home base — the place every road on this map starts from. Grounded, honest, and built on solid foundations.',
      },
    ],
  },
  {
    id: 'workshop-cabin',
    index: 2,
    name: 'Workshop Cabin',
    kicker: 'Tools laid out on the bench',
    title: 'Stack & Craft',
    tagline:
      'The tools I reach for — chosen for fit, not fashion. Sharpened by clean architecture.',
    map: { x: 54.8, y: 50 },
    blocks: [
      {
        type: 'prose',
        lead: true,
        text: 'Every project gets the right tool for the job. These are the ones I know deeply — not just syntactically, but architecturally.',
      },
      {
        type: 'chips',
        groups: [
          {
            label: 'Frontend',
            items: ['React', 'Angular', 'Vue 3', 'Next.js', 'TypeScript', 'RxJS', 'Tailwind CSS', 'MUI', 'shadcn/ui', 'Three.js', 'GSAP', 'Framer Motion', 'Redux Toolkit', 'Zustand', 'TanStack Query', 'React Hook Form'],
          },
          {
            label: 'Backend',
            items: ['NestJS', 'Node.js', 'Express', 'Laravel', 'PHP', 'Prisma', 'Socket.io'],
          },
          {
            label: 'Data',
            items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Redis'],
          },
          {
            label: 'Payments & Auth',
            items: ['Stripe', 'PayPal', 'NextAuth.js', 'OAuth 2.0', 'JWT'],
          },
          {
            label: 'Cloud & Infra',
            items: ['AWS', 'Azure', 'Vercel', 'Firebase', 'Docker', 'Terraform', 'GitHub Actions', 'Hostinger'],
          },
          {
            label: 'Mobile',
            items: ['React Native', 'Expo', 'Ionic'],
          },
          {
            label: 'Tools',
            items: ['Git', 'GitHub', 'GitLab', 'Jira', 'Figma', 'Vitest', 'ESLint', 'Vite', 'Webpack', 'pnpm'],
          },
          {
            label: 'Foundation',
            items: ['Clean Architecture', 'Hexagonal Architecture', 'Atomic Design', 'TDD'],
          },
        ],
      },
      {
        type: 'prose',
        text: 'The framework changes with the problem — React, Angular, Vue, whichever fits. What stays the same is the foundation underneath: standard methodologies, solid principles, clean architecture, and the best practices each tool deserves. An engineer is not loyal to a framework — an engineer is loyal to solving the problem. Applying proven methods where they fit, and inventing the solution where they do not.',
      },
    ],
  },
  {
    id: 'climbing-road',
    index: 3,
    name: 'Climbing Road',
    kicker: 'The long way up',
    title: 'Experience Through Difficult Terrain',
    tagline:
      'Architecture decisions, migrations and scaling stories from products that had to perform under pressure.',
    map: { x: 67.6, y: 38 },
    blocks: [
      {
        type: 'prose',
        lead: true,
        text: 'The interesting work rarely happens on flat ground. It happens on the climb — when the system is under load and the decisions start to cost.',
      },
      {
        type: 'timeline',
        items: [
          {
            period: 'May 2026 – Present',
            title: 'Chamco Digital',
            role: 'Full Stack Developer — Remote',
            text: 'Built the admin panel, optimized SEO and Lighthouse scores, configured CI/CD with GitHub Actions, deployed on Vercel, and set up a PostgreSQL server on Azure with email delivery via Microsoft Graph API and image uploads through Azure Blob Storage.',
          },
          {
            period: 'Jun 2026 – Present',
            title: 'Medikoch',
            role: 'Full Stack Developer (Laravel/PHP + Vue.js) — Remote',
            text: 'Full technical audit of a legacy healthcare platform for patient medical records, hardening exposed API endpoints with rate limiting, fixing a critical bug blocking clinical-record edits, migrating views from Blade to Vue.js, and proposing the roadmap to Vue 3 via Inertia + Vite.',
          },
          {
            period: 'Oct 2025 – Mar 2026',
            title: 'Hacking HR',
            role: 'Full-Stack Developer — Remote (USA)',
            text: 'Contributed to a scalable event platform built with Next.js and a headless CMS, extended Payload CMS structures, led the migration from Brevo to Amazon SES, and supported AWS infrastructure with Terraform and Amplify deployments.',
          },
          {
            period: 'Feb 2025 – Present',
            title: 'Upwork / Development MERN Stack',
            role: 'Full Stack Developer (MERN) — Remote',
            text: 'Active freelance contract using MERN, NestJS, and Next.js: building interfaces with Tailwind CSS, developing APIs and backend modules, and managing deployment and maintenance on Hostinger.',
          },
          {
            period: 'Feb 2025 – Jul 2025',
            title: 'Fibtotech',
            role: 'Frontend Developer — Remote',
            text: 'Frontend support across multiple systems with Next.js and Tailwind CSS, advanced visualizations with Plotly and Chart.js, Google Maps integration, and performance optimization for interfaces handling millions of data records.',
          },
          {
            period: 'Aug 2025 – Oct 2025',
            title: 'Speedy Delivery',
            role: 'Mobile Developer — Hybrid (Venezuela)',
            text: 'Built a food delivery mobile app with React Native and Expo Go, including responsive interfaces with Tailwind CSS and real-time order flows.',
          },
          {
            period: 'Jun 2024 – Jan 2025',
            title: 'OtherWorld Gift',
            role: 'Full-Stack Developer — Remote (Argentina)',
            text: 'Developed automated Excel and PDF reporting, full CRUD modules, a sales authorization module for credit control, and inventory management with timezone-aware cron jobs, plus a cash management system with payment integration.',
          },
          {
            period: 'Apr 2022 – May 2024',
            title: 'PiggyBack Network',
            role: 'Frontend Developer — Remote (USA)',
            text: 'Frontend development with Next.js, React, and TypeScript, Stripe and PayPal integration, performance optimization, and AWS infrastructure for a scalable e-commerce platform.',
          },
          {
            period: 'Aug 2022 – Jan 2024',
            title: 'Little Taller',
            role: 'Frontend Engineer — Remote (USA)',
            text: 'Built a SPA for client EarkMarkz using React and Tailwind CSS following Atomic Design, including a reusable Figma-based component library and pixel-perfect responsive interfaces.',
          },
          {
            period: 'Jun 2021 – Jul 2022',
            title: 'Montrix',
            role: 'Frontend Developer — Remote (USA)',
            text: 'Interactive interfaces with Angular, Angular Material, and Bootstrap, Google Maps and GoJS integrations, and UX/performance optimization for large-scale enterprise applications on AWS.',
          },
          {
            period: 'Oct 2020 – May 2021',
            title: 'Cloudshim',
            role: 'Front-End Developer — Remote (USA)',
            text: 'Software development with Angular, Angular Material, GoJS, and D3.js, gaining deep expertise in diagramming with GoJS, plus responsive design and interactive charts on AWS.',
          },
          {
            period: 'Feb 2018 – Oct 2020',
            title: 'Zippyttech Technology & Innovation',
            role: 'Front-End Developer — Venezuela',
            text: 'Frontend development with Angular, TypeScript, Angular Material, and Bootstrap, Google Maps API integration, and responsive design in an agile Linux-based team.',
          },
          {
            period: 'Oct 2020 – Present',
            title: 'Crazy Imagine Software',
            role: 'Full Stack Developer — Freelance, Venezuela',
            text: 'Freelance software development for multiple international clients through this agency, applying agile methodologies across projects of varying scale and technology.',
          },
          {
            period: 'Feb 2012 – Feb 2013',
            title: 'Escuela Luis Cáceres de Arismendi',
            role: 'Full Stack Developer — Venezuela',
            text: "Built a web application for the school's administrative management, generating student enrollment certificates as PDF reports with PHP, MySQL, and JavaScript.",
          },
          {
            period: 'Feb 2011 – Feb 2012',
            title: 'Comunidad del Barrio San Pedro',
            role: 'Full Stack Developer — Venezuela',
            text: 'Built a community web application for resident registration and management using PHP, MySQL, JavaScript, HTML, and CSS.',
          },
        ],
      },
    ],
  },
  {
    id: 'cave-of-challenges',
    index: 4,
    name: 'Cave of Challenges',
    kicker: 'Into the deep work',
    title: 'Complex Projects, Clear Outcomes',
    tagline:
      'From legacy rescue to greenfield systems — balancing speed, quality and reliability.',
    map: { x: 33.6, y: 36 },
    blocks: [
      {
        type: 'prose',
        lead: true,
        text: 'Hard problems, brought into the light. The cave is where the most demanding work lives — and where the clearest thinking matters most.',
      },
      {
        type: 'projects',
        items: [
          {
            title: 'Fibtotech — GMVYKON Corporate Website',
            text: 'Corporate website delivered while working at Fibtotech, built with Next.js, TypeScript, and Tailwind CSS, with content managed through Strapi CMS. Designed in Figma and deployed on Vercel.',
            tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi', 'Vercel'],
            src: '/photos/projects/gmvykon.webp',
            href: 'https://www.gmvykon.com/',
          },
          {
            title: 'Chamco Digital — Web Platform with Admin Panel',
            text: 'Full admin panel, SEO and Lighthouse optimization, CI/CD with GitHub Actions, deployment on Vercel, PostgreSQL database on Azure, email delivery via Microsoft Graph API, and image storage on Azure Blob Storage.',
            tags: ['Next.js', 'PostgreSQL', 'Azure', 'Vercel'],
            src: '/photos/projects/chamco-digital.webp',
            href: 'https://chamcodigital.com/',
          },
          {
            title: 'Medikoch — Legacy Healthcare Platform Hardening',
            text: 'Full technical audit of a legacy Laravel/PHP healthcare platform used by doctors for patient medical records: identified missing test coverage, outdated dependencies, and unprotected API endpoints, then hardened them with rate limiting. Fixed a critical bug blocking clinical-record edits and migrated views from Blade to Vue.js, with a roadmap toward Vue 3 via Inertia + Vite.',
            tags: ['Laravel', 'PHP', 'Vue.js', 'Inertia', 'Security Audit'],
          },
          {
            title: 'School SaaS — Personal Project',
            text: 'Personal project I am building on my own: a multitenant educational SaaS designed for multiple schools, with an owner admin panel and separate roles for school directors, staff, students, and parents/guardians. Built with Next.js, NestJS, TypeScript, PostgreSQL on Neon, shadcn/ui, and deployed with Railway and Vercel.',
            tags: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Neon', 'shadcn/ui', 'Tailwind CSS', 'Railway', 'Vercel'],
            href: 'https://school-mauve-eight.vercel.app/',
          },
          {
            title: 'Hacking HR — Scalable Event Platform',
            text: 'Scalable event management platform built with Next.js and Payload CMS, with API and frontend performance optimization. Led the email migration from Brevo to Amazon SES and supported AWS infrastructure with Terraform, deployed via AWS Amplify.',
            tags: ['Next.js', 'TypeScript', 'Payload CMS', 'Amazon SES', 'Terraform', 'AWS Amplify'],
            src: '/photos/projects/hacking-hr.webp',
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'PiggyBack Network — E-commerce Platform with Payments',
            text: 'Frontend development for an e-commerce platform with Stripe and PayPal integration, performance optimization, and scalable AWS architecture.',
            tags: ['Next.js', 'React', 'TypeScript', 'Stripe', 'PayPal'],
            src: '/photos/projects/piggyback-network.webp',
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'OtherWorld Gift — Sales & Inventory Management System',
            text: 'Full-stack system for sales authorization and credit control, inventory management, and automated Excel/PDF reporting. Implemented timezone-aware cron jobs, duplicate-product resolution algorithms, advanced Prisma data validations, payment system integration, and a cash management module with revenue tracking.',
            tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Cron Jobs'],
          },
          {
            title: 'Cloudshim — Advanced Diagramming Tool',
            text: 'Frontend platform with Angular and GoJS for complex diagramming, interactive D3.js charts, and responsive design for cloud environments.',
            tags: ['Angular', 'GoJS', 'D3.js', 'TypeScript'],
            src: '/photos/projects/cloudshim.webp',
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'AI Multi-Agent Orchestration System — Personal Project',
            text: 'A multi-agent system that orchestrates specialized sub-agents using Specification-Driven Development: I write and own the specification, and the AI implements against that contract under my direction. Includes decision and escalation logic, per-task model routing, MCP integrations, and persistent memory — AI as a tool to accelerate the work, direction always stays human.',
            tags: ['SDD', 'MCP', 'Claude', 'Automation'],
          },
        ],
      },
    ],
  },
  {
    id: 'dog-park',
    index: 5,
    name: 'Dog Park',
    kicker: 'The reason behind the work',
    title: 'Human Side',
    tagline: 'Code is the craft. People are the point.',
    map: { x: 18.9, y: 62 },
    blocks: [
      {
        type: 'prose',
        lead: true,
        text: 'My wife walks every road with me. She is my life partner, my support, and the greatest source of growth I have ever known.',
      },
      {
        type: 'prose',
        text: 'Laika and Kira keep every sprint honest. They remind me that consistency, joy, and showing up every day are more valuable than any single peak performance.',
      },
      {
        type: 'gallery',
        items: [
          // Add src when photo is ready: src: '/photos/family/family.jpg'
          { label: 'Family photo', caption: 'Arthur & family' },
          // Add src when photo is ready: src: '/photos/family/laika.jpg'
          { label: 'Laika', caption: 'The good dog' },
          // Add src when photo is ready: src: '/photos/family/kira.jpg'
          { label: 'Kira', caption: 'The other good dog' },
        ],
      },
    ],
  },
  {
    id: 'hidden-sanctuary',
    index: 6,
    name: 'Hidden Sanctuary',
    kicker: 'A quiet place off the trail',
    title: 'Place of Purpose',
    tagline: 'The foundation under everything else.',
    map: { x: 78, y: 43 },
    blocks: [
      {
        type: 'scripture',
        verses: [
          {
            who: 'Jesus said,',
            text: 'I am the way and the truth and the life.',
            ref: 'John 14:6',
          },
          {
            text: 'Seek first the kingdom of God and his righteousness, and all these things will be added to you.',
            ref: 'Matthew 6:33',
          },
          {
            text: 'Pray to your Father who sees in secret, and your Father who sees in secret will reward you openly.',
            ref: 'Matthew 6:6',
          },
        ],
      },
      {
        type: 'benediction',
        text: 'All glory be to God.',
      },
    ],
  },
  {
    id: 'summit-viewpoint',
    index: 7,
    name: 'Summit Viewpoint',
    kicker: 'The view from the top',
    title: 'Let Us Build Something Lasting',
    tagline: 'I build with discipline, gratitude, and purpose.',
    map: { x: 51.7, y: 36 },
    blocks: [
      {
        type: 'prose',
        lead: true,
        text: 'If you have read this far, we probably share something — a commitment to doing the work properly, building things that last, and caring about the craft.',
      },
      {
        type: 'manifesto',
        text: 'Guided since before the beginning.',
      },
      {
        type: 'links',
        heading: "Let's talk",
        items: [
          {
            label: 'Upwork',
            handle: 'Hire me',
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            label: 'GitHub',
            handle: '@arthurtorres75',
            href: 'https://github.com/arthurtorres75',
          },
          {
            label: 'LinkedIn',
            handle: 'in/arthur-torres',
            href: 'https://www.linkedin.com/in/arthur-torres-9b41a2184',
          },
          {
            label: 'Email',
            handle: 'arthurtorres75@gmail.com',
            href: 'mailto:arthurtorres75@gmail.com',
          },
        ],
      },
    ],
  },
]

export const stationById = (id: string): Station | undefined =>
  STATIONS.find((s) => s.id === id)

export const STATION_IDS = STATIONS.map((s) => s.id)
