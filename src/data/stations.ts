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
            title: 'Architecture decisions',
            text: 'Designing boundaries that aged well — defining what goes in the domain, what stays at the edge, and what never gets mixed.',
          },
          {
            title: 'Migrations',
            text: 'Moving legacy code and data to modern foundations without stopping the business. Strangler fig over big bang, always.',
          },
          {
            title: 'Scaling under pressure',
            text: 'Keeping products fast and reliable when load spiked unexpectedly — caching strategies, query optimization, and infrastructure decisions that held.',
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
            title: 'Gmvykon — Corporate Website',
            text: 'Corporate website built with Next.js, TypeScript, and Tailwind CSS, with content managed through Strapi CMS. Designed in Figma, deployed on Vercel, and developed with an AI-assisted workflow.',
            tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi', 'Vercel'],
            href: 'https://www.gmvykon.com/',
          },
          {
            title: 'Chamco Digital — Web Platform with Admin Panel',
            text: 'Full admin panel, SEO and Lighthouse optimization, CI/CD with GitHub Actions, deployment on Vercel, PostgreSQL database on Azure, email delivery via Microsoft Graph API, and image storage on Azure Blob Storage.',
            tags: ['Next.js', 'PostgreSQL', 'Azure', 'Vercel'],
            href: 'https://chamcodigital.com/',
          },
          {
            title: 'School SaaS — Personal Project',
            text: 'Personal project I am building on my own: an educational SaaS for school management, focused on modern UX, administrative workflows, and continuous deployment on Vercel.',
            tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
            href: 'https://school-mauve-eight.vercel.app/',
          },
          {
            title: 'Hacking HR — Scalable Event Platform',
            text: 'Event management platform built with Next.js and a headless CMS, with API optimization, improved frontend performance, and deployment on AWS Amplify.',
            tags: ['Next.js', 'TypeScript', 'Payload CMS', 'AWS Amplify'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'OtherWorld Gift — Inventory & Sales System',
            text: 'Full-stack system with automated Excel/PDF reports, sales authorization, inventory management, cron jobs, and a cash module with bank transfers.',
            tags: ['Next.js', 'NestJS', 'Prisma', 'MySQL'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'Speedy Delivery — Food Delivery Mobile App',
            text: 'Food delivery mobile app developed with React Native and Expo, featuring a responsive UI and real-time order flow.',
            tags: ['React Native', 'Expo', 'Tailwind CSS', 'TypeScript'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'PiggyBack Network — E-commerce Platform with Payments',
            text: 'Frontend development for an e-commerce platform with Stripe and PayPal integration, performance optimization, and scalable AWS architecture.',
            tags: ['Next.js', 'React', 'Stripe', 'PayPal'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'Little Taller — Client Frontend Suite',
            text: 'Collection of frontend interfaces using React, TypeScript, Firebase, and Material UI, deployed on Vercel for customer-facing web products.',
            tags: ['React', 'TypeScript', 'Firebase', 'Material UI'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'Montrix — Operational Dashboard with Maps',
            text: 'Enterprise application using Angular, Angular Material, and Google Maps API for operational visualization, improved UX, and high performance.',
            tags: ['Angular', 'Angular Material', 'Google Maps API', 'AWS'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'Cloudshim — Advanced Diagramming Tool',
            text: 'Frontend platform with Angular and GoJS for complex diagramming, interactive D3.js charts, and responsive design for cloud environments.',
            tags: ['Angular', 'GoJS', 'D3.js', 'TypeScript'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'Zippyttech — Operations Web Portal',
            text: 'Frontend portal built with Angular and TypeScript, integrating Google Maps and responsive components for business operational workflows.',
            tags: ['Angular', 'TypeScript', 'Google Maps API', 'SCSS'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
          },
          {
            title: 'Escuela Luis Cáceres — Administrative System',
            text: 'Web application for school administrative management and PDF certificate issuance, developed with PHP, MySQL, and JavaScript.',
            tags: ['PHP', 'MySQL', 'JavaScript', 'XAMPP'],
            href: 'https://www.upwork.com/freelancers/~0110023d7209510ffb?mp_source=share',
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
