export const PROFILE = {
  name: "Abu Kawser",
  handle: "Mayamoho",
  role: "Backend & Systems Engineer",
  roles: [
    "Backend & Systems Engineer",
    "Compression, Retrieval & Grounded AI",
    "Final-year CS @ University of Dhaka",
    "Open to roles, internships & freelance",
  ],
  email: "kawserabu11mini@gmail.com",
  location: "Badda, Dhaka — Bangladesh",
  university: "University of Dhaka",
  degree: "BSc Computer Science & Engineering",
  github: "https://github.com/Mayamoho",
  linkedin: "https://www.linkedin.com/in/abu-kawser-40bb49331/",
  repoUrl: "https://github.com/Mayamoho/Portfolio",
  tagline:
    "I build things that hold up under constraints — offline-first tools, compression that actually ships, and retrieval systems people use.",
  quote: "A mesh reaches the room. A text reaches your mother.",
} as const;

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  kind: string;
  featured: boolean;
  repo: string | null;
  live: string | null;
  extraLinks?: { label: string; href: string }[];
  stack: string[];
  metrics: Metric[];
  accent: string;
  caseStudy?: {
    problem: string;
    approach: string[];
    results: string[];
    learned: string;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "bornomala",
    name: "Bornomala",
    tagline: "Offline Bangla SMS compression — no server, no internet, no account.",
    summary:
      "Bangla costs 2.3× more to text than English: UCS-2 caps an SMS segment at 70 characters. Bornomala runs a PPM model with an arithmetic coder entirely in the browser and fits 361 characters into that same segment.",
    year: "2026",
    kind: "Crisis tech · Open source",
    featured: true,
    repo: "https://github.com/Mayamoho/bornomala",
    live: "https://mayamoho.github.io/bornomala/",
    extraLinks: [{ label: "Pitch deck", href: "https://mayamoho.github.io/bornomala/slides.html" }],
    stack: ["JavaScript", "PWA", "Arithmetic coding", "PPM", "Reed–Solomon", "GSM 03.38"],
    metrics: [
      { value: "5.15×", label: "more Bangla per SMS" },
      { value: "3.106", label: "bits/char (vs 16.000)" },
      { value: "100%", label: "of 5,000 tests in one segment" },
      { value: "92 kB", label: "core + 1.7 MB model" },
    ],
    accent: "#6c5ce7",
    caseStudy: {
      problem:
        "When floods take out broadband in Bangladesh, SMS and voice keep working — but Bangla is punished by the encoding. Latin text gets 160 characters per SMS segment under GSM 03.38; Bangla falls back to UCS-2 and gets 70. A single emergency report costs several messages, on the exact network that is already congested, for the people who can least afford it.",
      approach: [
        "Trained a PPM (Prediction by Partial Matching) model on a Bangla corpus so that common character sequences cost a fraction of a bit.",
        "Paired it with an arithmetic coder to reach the model's entropy rather than rounding every symbol up to whole bits like Huffman would.",
        "Packed the compressed bitstream into the GSM 03.38 7-bit alphabet so it survives transport as an ordinary SMS.",
        "Wrote a custom Reed–Solomon encoder so that when there is no network at all, two phones can hand messages off by QR code.",
        "Shipped it as an installable PWA — the model runs on-device, so no message ever leaves the phone.",
      ],
      results: [
        "3.106 bits per character against 16.000 for raw UCS-2 — a 5.15× improvement.",
        "361 Bangla characters per SMS segment, up from 70.",
        "100% of 5,000 held-out test messages fit inside a single segment.",
        "98.2% model accuracy on those unseen messages.",
        "92 kB core bundle plus a 1.7 MB model — installable over 2G.",
        "5th place nationally in the Crisis Tech track at July Hackathon 2026; 37 stars on GitHub.",
      ],
      learned:
        "My first coder was adaptive-only and re-learned the language from scratch on every message, which meant short messages — the ones that matter in an emergency — compressed worst. Shipping a pre-trained static model with a small adaptive layer on top fixed it. If I rebuilt this I would push the model into a WASM module: the JavaScript arithmetic coder is the bottleneck on low-end phones, and that is precisely the hardware this is meant for.",
    },
  },
  {
    slug: "csedu-knowledge-platform",
    name: "CSEDU Digital Knowledge Platform",
    tagline: "A department-wide library, archive and research repository with a RAG assistant.",
    summary:
      "Library circulation, digital archive, research repository and student project showcase for the CSE department at Dhaka University — with a retrieval-augmented assistant doing hybrid vector and full-text search over the whole corpus.",
    year: "2026",
    kind: "Full-stack · Team of 3",
    featured: true,
    repo: "https://github.com/Mayamoho/CSEDU-Digital-Knowledge-Platform-main",
    live: "https://devops.farefin.com",
    stack: ["Next.js 15", "Go", "FastAPI", "PostgreSQL", "pgvector", "Redis", "MinIO", "Docker"],
    metrics: [
      { value: "4", label: "subsystems unified" },
      { value: "5", label: "archive access tiers" },
      { value: "3", label: "services in the stack" },
      { value: "Live", label: "deployed on Azure" },
    ],
    accent: "#00b894",
    caseStudy: {
      problem:
        "The department's knowledge was scattered: a paper library ledger, theses on someone's drive, student projects lost the moment a batch graduated. Nothing was searchable and nothing survived a handover.",
      approach: [
        "Modelled the whole domain in PostgreSQL — circulation, holds, fines, archive tiers, review workflow — so the systems shared one source of truth instead of four.",
        "Built the transactional API in Go with chi, keeping circulation and payment paths fast and boring.",
        "Split retrieval into a separate Python FastAPI service so the AI work could evolve without destabilising circulation.",
        "Used pgvector for semantic similarity combined with PostgreSQL full-text search — hybrid retrieval, because pure vector search kept missing exact course codes and author names.",
        "Streamed LLM responses with Groq as primary and Gemini 2.5 Flash as fallback; Redis for caching and queues, MinIO for object storage.",
        "Deployed the lot with Docker Compose on an Azure VM.",
      ],
      results: [
        "One platform replacing four disconnected processes, in real use by the department.",
        "Hybrid retrieval measurably beat pure vector search on exact-identifier queries like course codes.",
        "Bulk CSV import let years of existing library records migrate in one pass.",
        "Streamed responses with a performance dashboard over the retrieval service.",
      ],
      learned:
        "Pure semantic search felt impressive in a demo and failed on the queries people actually type — 'CSE-2102', a supervisor's surname. Adding full-text search back alongside the embeddings was the single biggest quality jump. The other lesson was operational: three services in Docker Compose is the point where you need real healthchecks, not optimism.",
    },
  },
  {
    slug: "careerpilot",
    name: "CareerPilot",
    tagline: "AI job matching and CV generation that refuses to lie about you.",
    summary:
      "A CLI that pulls live postings from public ATS APIs, scores them against your profile and writes tailored CVs and cover letters — then runs every generated line through a five-layer groundedness gate before it can reach the output.",
    year: "2026",
    kind: "Applied AI · Grounded generation",
    featured: true,
    repo: "https://github.com/Mayamoho/career-pilot",
    live: null,
    stack: ["Python", "Groq", "Gemini", "BM25", "SQLite", "Pydantic", "pytest", "GitHub Actions"],
    metrics: [
      { value: "5", label: "groundedness layers" },
      { value: "0", label: "fabricated lines allowed" },
      { value: "85%+", label: "truthful-claim acceptance" },
      { value: "4", label: "ATS sources scraped" },
    ],
    accent: "#0984e3",
    caseStudy: {
      problem:
        "Tailoring a CV to each posting is the part of job hunting that eats the most time and produces the least honest documents. Hand a résumé to a language model and it will happily invent a metric, promote 'used Redis at a hackathon' to 'production experience with Redis', and hand you back a document that fails the first interview. The value of an AI tool here is not the prose — it is refusing to write a claim it cannot back.",
      approach: [
        "Built a collector over public ATS APIs — Greenhouse, Lever, Ashby and bdtechjobs — so the pipeline works on real postings rather than a fixture.",
        "Extracted each posting's requirements with an LLM into a typed Pydantic schema, so scoring compares structured fields instead of raw text blobs.",
        "Made matching location-aware before it is model-aware: the candidate's country is read once and postings are filtered by workability — office, remote-scoped, remote-global — so a job you legally cannot take never reaches a prompt.",
        "Wrapped generation in a five-layer groundedness gate, mixing deterministic code checks with model verification, so every line of the produced CV or cover letter is checked against the user's own profile data.",
        "Set hard evaluation thresholds — zero fabricated lines, 85%+ truthful-claim acceptance, 0.0 points for any invented citation — and wired them into CI.",
        "Recorded model responses as cassettes so the test suite replays them instead of calling a live model: the gates are asserted on every push, deterministically and for free.",
      ],
      results: [
        "A groundedness gate that catches hallucinated claims, fake numbers and misattributed skills before output.",
        "Location-blocked postings refused pre-model, cutting wasted inference on jobs the candidate cannot apply to.",
        "Strict eval thresholds enforced in CI with no live model calls in the test path.",
        "Tailored CV and cover letter generation driven by extracted requirements rather than keyword stuffing.",
      ],
      learned:
        "The eval gate mattered more than the prompt. Once fabricated claims scored zero and that gate ran in CI, improving output stopped being a taste judgement and became a number I could drive down. Replaying recorded cassettes instead of calling a live model is what made that loop cheap enough to run on every commit — if I am doing this again, I would build the harness before the generator.",
    },
  },
  {
    slug: "doctor-tracker",
    name: "Doctor Tracker",
    tagline: "Clinic register with an admin portal, a real API and query plans I actually read.",
    summary:
      "Full-stack clinic management: a Next.js admin portal on Vercel over an Express 5 REST API on Render — doctor and patient CRUD, search, filtering, pagination and an aggregated dashboard, with HTTPOnly cookie sessions and MongoDB queries tuned down from 593 index-key scans to 3.",
    year: "2026",
    kind: "Full-stack · Auth & query tuning",
    featured: true,
    repo: "https://github.com/Mayamoho/doctor-tracker-web",
    live: "https://doctor-tracker-web-one.vercel.app",
    extraLinks: [{ label: "API", href: "https://github.com/Mayamoho/doctor-tracker-api" }],
    stack: ["Next.js 16", "React 19", "TanStack Query", "Express 5", "MongoDB Atlas", "zod", "Tailwind CSS"],
    metrics: [
      { value: "593→3", label: "index-key scans" },
      { value: "15m/7d", label: "access / refresh tokens" },
      { value: "1", label: "aggregation pipeline" },
      { value: "Live", label: "Vercel + Render" },
    ],
    accent: "#e84393",
    caseStudy: {
      problem:
        "A clinic register holds other people's medical-adjacent data, so the interesting problems were not the CRUD — they were session handling that survives a browser, search that stays fast as the collection grows, and a dashboard that does not fan out into one query per stat.",
      approach: [
        "Split the system into a Next.js 16 admin portal on Vercel and an Express 5 REST API on Render, with TanStack Query handling cache and refetch on the client.",
        "Put sessions in HTTPOnly cookies rather than localStorage: short-lived JWT access tokens paired with 7-day refresh tokens, path-scoped so only the API origin ever receives them.",
        "Validated every request boundary with zod, and added rate limiting and helmet so the API is not just correct but boring to attack.",
        "Normalized search terms into token arrays and backed them with compound indexes, then read the explain output to confirm the planner was using them.",
        "Collapsed the dashboard into a single aggregation pipeline, and whitelisted sort parameters with an _id tiebreaker so pagination stays stable when values tie.",
      ],
      results: [
        "Prefix search dropped from 593 index-key scans to 3 once the token arrays and compound indexes were in place.",
        "Session strategy: 15-minute access tokens, 7-day refresh, path-scoped HTTPOnly cookies.",
        "Dashboard served from one aggregation pipeline instead of a query per card.",
        "Whitelisted sort parameters with _id tiebreakers removed the duplicate-row drift on paginated lists.",
        "Deployed and live — portal on Vercel, API on Render.",
      ],
      learned:
        "I had been treating index design as something you do later, once a query is slow. Reading the explain plan while building would have saved the rewrite — 593 scans to 3 was not a clever optimisation, it was the difference between indexing the field I searched and the field I filtered on. The other lesson was about auth: moving tokens out of JavaScript reach closed a class of bug I had previously only read about.",
    },
  },
  {
    slug: "pdf-chat",
    name: "PDF Chat",
    tagline: "Grounded question answering over your own documents.",
    summary:
      "Chunking, embedding and semantic retrieval wired to an LLM so answers stay anchored to the source PDF instead of the model's priors.",
    year: "2025",
    kind: "Personal project",
    featured: false,
    repo: "https://github.com/Mayamoho/pdf-chat-app",
    live: null,
    stack: ["Python", "Embeddings", "Vector search", "LLM"],
    metrics: [],
    accent: "#e17055",
  },
  {
    slug: "bartabahok",
    name: "Bartabahok",
    tagline: "A minimal chat application built on raw Java sockets.",
    summary:
      "Sockets, concurrent client handling and a hand-rolled message protocol — written to understand networking from the syscall up rather than from a framework down.",
    year: "2025",
    kind: "Systems fundamentals",
    featured: false,
    repo: "https://github.com/Mayamoho/Bartabahok",
    live: null,
    stack: ["Java", "Sockets", "Concurrency"],
    metrics: [],
    accent: "#0984e3",
  },
  {
    slug: "data-analysis",
    name: "Exploratory Data Analysis",
    tagline: "Cleaning, feature exploration and visual storytelling.",
    summary:
      "End-to-end notebook work — the groundwork that later made the final round of the CUET National Datathon possible.",
    year: "2025",
    kind: "Data foundations",
    featured: false,
    repo: "https://github.com/Mayamoho/Noob-data-analysis",
    live: null,
    stack: ["Jupyter", "pandas", "Visualisation"],
    metrics: [],
    accent: "#fdcb6e",
  },
  {
    slug: "learnloop",
    name: "LearnLoop",
    tagline: "Peer-to-peer skill sharing on Android.",
    summary:
      "Team-built mobile app for exchanging skills: free courses, progress tracking, real-time chat and topic-based communities. I owned the authentication, home, feedback and community screens plus the gamified quiz flow.",
    year: "2026",
    kind: "Mobile · Team project",
    featured: false,
    repo: "https://github.com/Mayamoho/learnloop",
    live: null,
    stack: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Supabase", "Google Sign-In"],
    metrics: [],
    accent: "#00cec9",
  },
  {
    slug: "nutrimind-ai",
    name: "NutriMind AI",
    tagline: "Data-driven nutrition recommendations.",
    summary:
      "AI-oriented application exploring recommendation logic over dietary data, with the emphasis on how the system explains a suggestion rather than just emitting one.",
    year: "2026",
    kind: "Applied AI",
    featured: false,
    repo: "https://github.com/Mayamoho/nutrimind-ai",
    live: null,
    stack: ["Python", "Recommendations", "LLM"],
    metrics: [],
    accent: "#55efc4",
  },
  {
    slug: "railsheba",
    name: "RailSheba",
    tagline: "Railway ticketing system built on OOP and schema design.",
    summary:
      "Coursework project (CSE-2102): a Java ticketing system where the interesting work was modelling trains, seats and bookings as a database schema first and a class hierarchy second.",
    year: "2025",
    kind: "Coursework · Java",
    featured: false,
    repo: "https://github.com/Mayamoho/CSE-2102_RailSehba_Railway_Ticketing_System",
    live: null,
    stack: ["Java", "OOP", "Database design"],
    metrics: [],
    accent: "#fab1a0",
  },
  {
    slug: "gridwise",
    name: "GridWise",
    tagline: "LLM-assisted energy-grid optimisation.",
    summary:
      "Exploratory project pairing generative AI with constraint reasoning and optimisation — can a language model help formulate a grid problem, not just talk about one.",
    year: "2026",
    kind: "Research exploration",
    featured: false,
    repo: null,
    live: null,
    stack: ["LLM", "Constraint reasoning", "Optimisation"],
    metrics: [],
    accent: "#fd79a8",
  },
  {
    slug: "cowork-api",
    name: "CoWork API",
    tagline: "Service architecture built over a hackathon weekend.",
    summary:
      "Backend/API project developed for an ICT Fest hackathon, focused on service boundaries and application workflows under a hard time limit.",
    year: "2026",
    kind: "Hackathon build",
    featured: false,
    repo: null,
    live: null,
    stack: ["REST API", "Service design", "Backend"],
    metrics: [],
    accent: "#a29bfe",
  },
];

export type Achievement = {
  rank: string;
  title: string;
  org: string;
  date: string;
  sortDate: string;
  description: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    rank: "5th",
    title: "5th place (National) — July Hackathon 2026",
    org: "Crisis Tech track · Bornomala",
    date: "2026",
    sortDate: "2026-08",
    description:
      "Placed 5th nationally with Bornomala, the offline Bangla SMS compressor, judged across the Crisis Tech track on technical merit and engagement.",
  },
  {
    rank: "9th",
    title: "9th place — BUP CTF 2026",
    org: "Bangladesh University of Professional Studies",
    date: "2026",
    sortDate: "2026-09",
    description:
      "Ninth in BUP's capture-the-flag — web exploitation, cryptography, reversing and forensics under a team clock.",
  },
  {
    rank: "20th",
    title: "20th place — International BCS ICT Fest CTF 2026",
    org: "Bangladesh Computer Council · international field",
    date: "2026",
    sortDate: "2026-07",
    description:
      "Placed 20th against an international field at the BCS ICT Fest CTF, the country's largest national IT festival competition.",
  },
  {
    rank: "Top 10",
    title: "Top-10 finalist — HerwillXUAP Datathon 2026",
    org: "Xavier University At Barishal",
    date: "2026",
    sortDate: "2026-05",
    description:
      "Reached the top ten in a datathon — feature engineering and modelling judged on both pipeline quality and presentation.",
  },
  {
    rank: "Finalist",
    title: "Finalist — NSU Cybernauts CTF 2026",
    org: "North South University",
    date: "2026",
    sortDate: "2026-04",
    description:
      "Qualified for the final round of NSU's cyber security competition.",
  },
  {
    rank: "Finalist",
    title: "Finalist — BUP Hackathon 2026",
    org: "Bangladesh University of Professional Studies",
    date: "2026",
    sortDate: "2026-03",
    description:
      "Built and defended a working prototype through to the final round.",
  },
  {
    rank: "Top 15",
    title: "Top-15 finalist — DUET AI Hackathon 2026",
    org: "DUET CSE Carnival, Gazipur · team data_not_enough",
    date: "2026",
    sortDate: "2026-06",
    description:
      "Top-15 finalist after a two-day intensive AI hackathon against teams from across the country.",
  },
  {
    rank: "Finalist",
    title: "Finalist — National Datathon, CUET CSE Fest",
    org: "Chittagong University of Engineering & Technology",
    date: "2025",
    sortDate: "2025-12",
    description:
      "Final round participant in the national datathon — modelling and analysis under competition time limits.",
  },
  {
    rank: "Top 15",
    title: "Top-15 finalist — BUP CTF 2025",
    org: "Bangladesh University of Professional Studies",
    date: "2025",
    sortDate: "2025-10",
    description:
      "Top fifteen in the inaugural BUP capture-the-flag run.",
  },
  {
    rank: "Finalist",
    title: "Finalist — BUP Circuit Flash CTF 2025",
    org: "Bangladesh University of Professional Studies",
    date: "2025",
    sortDate: "2025-08",
    description:
      "Reached the finals of a fast-turnaround circuit and electronics flash CTF.",
  },
  {
    rank: "10th",
    title: "10th place — UAP Cyber Siege 2025",
    org: "Onsite round · issued by UAP Cyber Security Club",
    date: "2025",
    sortDate: "2025-05",
    description:
      "Placed 10th in the onsite round of one of Bangladesh's larger inter-university cyber security competitions.",
  },
  {
    rank: "4th",
    title: "4th place — DUCTF 2024",
    org: "Issued by CSEDU Informatics Club",
    date: "2024",
    sortDate: "2024-12",
    description:
      "Fourth place in the Dhaka University capture-the-flag — web exploitation, reversing and forensics.",
  },
];

export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  link?: { label: string; href: string };
  points: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Contributor",
    org: "Eventify BD",
    period: "2026 — present",
    link: { label: "eventifybd.com", href: "https://eventifybd.com" },
    points: [
      "Contributing to a platform centralising technology events, hackathons, CTFs, datathons and programming contests across Bangladesh.",
      "Supporting development and organisation of event information, helping users discover competitive programming, cybersecurity, AI and technology opportunities.",
    ],
  },
  {
    role: "Academic Team Member",
    org: "Bangladesh Mathematical Olympiad",
    period: "Dec 2022 — Jul 2024",
    points: [
      "Served on the academic team supporting mathematical problem-solving activities, contest preparation and academic content for olympiad participants.",
      "Contributed to problem-solving discussions and mathematical training activities aimed at developing analytical and algorithmic thinking among students.",
    ],
  },
  {
    role: "Volunteer",
    org: "Code Samurai 2024",
    period: "2024",
    points: [
      "Volunteered in organizing and supporting a technology-focused event.",
      "Assisted participants and organizers with event operations, coordination and technical activities.",
    ],
  },
];

export const SKILLS: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Go", "Python", "TypeScript", "JavaScript", "Java", "C++", "Dart", "SQL"],
  },
  {
    title: "Backend",
    items: [
      "Go · chi",
      "FastAPI",
      "Express 5",
      "Node.js",
      "REST APIs",
      "SSE",
      "Authentication",
      "Rate limiting",
    ],
  },
  {
    title: "LLM & retrieval",
    items: [
      "RAG",
      "Hybrid retrieval",
      "pgvector",
      "Embeddings",
      "BM25",
      "PostgreSQL full-text",
      "Gemini",
      "Groq",
      "Prompt engineering",
      "Groundedness checks",
    ],
  },
  {
    title: "AI / ML",
    items: ["Machine learning", "Deep learning", "Neural networks", "scikit-learn", "pandas", "NumPy"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "pgvector", "MongoDB", "Mongoose", "Redis", "SQLite", "MinIO / S3", "Supabase"],
  },
  {
    title: "Frontend & mobile",
    items: ["Next.js", "React 19", "TanStack Query", "Tailwind CSS", "shadcn/ui", "PWA", "Flutter", "Recharts"],
  },
  {
    title: "Systems & theory",
    items: [
      "Data compression",
      "Arithmetic coding",
      "PPM models",
      "Reed–Solomon",
      "DSA",
      "GSM 03.38",
    ],
  },
  {
    title: "Validation & testing",
    items: ["zod", "Pydantic", "pytest", "mypy", "ruff", "CI/CD", "GitHub Actions"],
  },
  {
    title: "DevOps & cloud",
    items: ["Docker", "Docker Compose", "Azure", "Render", "Vercel", "Linux", "Git / GitHub"],
  },
  {
    title: "Cybersecurity",
    items: ["Web security", "Forensics", "Helmet", "CORS", "Brute-force protection", "CTF problem solving"],
  },
];

export const OPEN_TO = [
  "Graduate SWE roles",
  "Internships",
  "Freelance projects",
  "Open-source collaboration",
];
