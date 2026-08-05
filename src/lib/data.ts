export const PROFILE = {
  name: "Abu Kawser",
  handle: "Mayamoho",
  role: "Backend & Systems Engineer",
  roles: [
    "Backend & Systems Engineer",
    "Compression & Retrieval",
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
        "5th place nationally in the Crisis Tech track at July Hackathon 2026; 36 stars on GitHub.",
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
    title: "5th place — July Hackathon 2026",
    org: "Crisis Tech track · associated with University of Dhaka",
    date: "August 2026",
    sortDate: "2026-08",
    description:
      "Placed 5th nationally with Bornomala, the offline Bangla SMS compressor, judged across the Crisis Tech track on technical merit and engagement.",
  },
  {
    rank: "Top 15",
    title: "Finalist — DUET AI Hackathon 2026",
    org: "DUET CSE Carnival, Gazipur · team data_not_enough",
    date: "June 2026",
    sortDate: "2026-06",
    description:
      "Top-15 finalist after a two-day intensive AI hackathon against teams from across the country.",
  },
  {
    rank: "Finalist",
    title: "Finalist — National Datathon, CUET CSE Fest",
    org: "Chittagong University of Engineering & Technology",
    date: "December 2025",
    sortDate: "2025-12",
    description:
      "Final round participant in the national datathon — modelling and analysis under competition time limits.",
  },
  {
    rank: "10th",
    title: "10th — UAP Cyber Siege 2025",
    org: "Onsite round · issued by UAP Cyber Security Club",
    date: "May 2025",
    sortDate: "2025-05",
    description:
      "Placed 10th in the onsite round of one of Bangladesh's larger inter-university cyber security competitions.",
  },
  {
    rank: "4th",
    title: "4th — DUCTF 2024",
    org: "Issued by CSEDU Informatics Club",
    date: "December 2024",
    sortDate: "2024-12",
    description:
      "Fourth place in the Dhaka University capture-the-flag — web exploitation, reversing and forensics.",
  },
];

export const SKILLS: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Go", "Python", "TypeScript", "JavaScript", "Java", "C++", "Dart", "SQL"],
  },
  {
    title: "Backend & data",
    items: ["FastAPI", "chi", "Node · Express", "PostgreSQL", "pgvector", "Redis", "MinIO / S3"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "PWA", "Flutter"],
  },
  {
    title: "AI & retrieval",
    items: ["RAG pipelines", "Hybrid search", "Embeddings", "Gemini", "Groq", "pandas", "NumPy"],
  },
  {
    title: "Systems & theory",
    items: [
      "Data compression",
      "Arithmetic coding",
      "PPM models",
      "Reed–Solomon",
      "Data structures",
      "Algorithms",
    ],
  },
  {
    title: "Infra & security",
    items: ["Docker Compose", "Azure", "Linux", "Git", "CTF · web exploitation", "Forensics"],
  },
];

export const OPEN_TO = [
  "Graduate SWE roles",
  "Internships",
  "Freelance projects",
  "Open-source collaboration",
];
