import type { Station } from '@/types/stations'

export const STATIONS: Station[] = [
  {
    id: 'base-town',
    index: 1,
    name: 'Base Town',
    kicker: 'Where the journey begins',
    title: 'Arthur Torres',
    role: 'Full Stack Engineer',
    tagline:
      'Building resilient systems with thoughtful product execution and long-term maintainability.',
    map: { x: 51.7, y: 66 },
    blocks: [
      {
        type: 'prose',
        lead: true,
        text: 'I design and ship software that is meant to last. Not just for the next sprint, but for the engineer who comes after me, and the product that has to scale after that.',
      },
      {
        type: 'pillars',
        items: [
          { label: 'Resilient', note: 'systems that hold under load' },
          { label: 'Maintainable', note: 'built for the next engineer' },
          { label: 'Thoughtful', note: 'product over feature count' },
        ],
      },
      {
        type: 'prose',
        text: 'Base Town is home base — the place every road on this map starts from. Simple, grounded, and built on solid foundations.',
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
            items: ['React', 'Angular', 'Vue 3', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MUI', 'shadcn/ui', 'Three.js', 'GSAP'],
          },
          {
            label: 'Backend',
            items: ['NestJS', 'Node.js', 'Express.js', 'Laravel'],
          },
          {
            label: 'Data',
            items: ['MongoDB', 'PostgreSQL'],
          },
          {
            label: 'Payments & Auth',
            items: ['Stripe', 'PayPal', 'NextAuth.js', 'OAuth 2.0', 'JWT'],
          },
          {
            label: 'Cloud & Infra',
            items: ['AWS', 'Azure', 'Vercel', 'GitHub Actions', 'Terraform'],
          },
          {
            label: 'Foundation',
            items: ['Clean Architecture', 'Hexagonal Architecture', 'Atomic Design', 'TDD'],
          },
        ],
      },
      {
        type: 'prose',
        text: 'Tools change. The craft does not. Architecture, testability, and maintainability are the constants.',
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
            title: 'Legacy Rescue',
            text: 'Stabilised an inherited codebase with no tests, no documentation, and growing technical debt. Introduced boundaries, coverage, and a path forward without a full rewrite.',
            tags: ['Refactor', 'Stability', 'TypeScript'],
            // Add src when screenshot is ready: src: '/photos/projects/legacy-rescue.jpg'
          },
          {
            title: 'Greenfield System',
            text: 'Designed a new product from a blank canvas — architecture first, then implementation. Clean separation of concerns from day one.',
            tags: ['Next.js', 'NestJS', 'PostgreSQL'],
            // Add src when screenshot is ready: src: '/photos/projects/greenfield.jpg'
          },
          {
            title: 'Reliability at Scale',
            text: 'Hardened a system that had to perform when it mattered most. Observability, caching, and graceful degradation built in from the start.',
            tags: ['AWS', 'Observability', 'Caching'],
            // Add src when screenshot is ready: src: '/photos/projects/reliability.jpg'
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
          { label: 'Upwork', handle: 'Hire me', href: '#' },
          { label: 'GitHub', handle: '@arthurtorres', href: '#' },
          {
            label: 'LinkedIn',
            handle: 'in/arthur-torres',
            href: 'https://www.linkedin.com/in/arthur-torres-dev/',
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
