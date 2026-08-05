"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ACHIEVEMENTS, OPEN_TO, PROFILE, PROJECTS, SKILLS, type Project } from "@/lib/data";
import type { GithubStats } from "@/lib/github";
import { Counter, Magnetic, Reveal, RevealWords, SectionHeading, TiltCard, Typewriter } from "./ui";

/* ==================================================================
   Hero
   ================================================================== */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <div className="hero-grid" aria-hidden />

      <div className="shell relative z-10">
        <Reveal>
          <span className="glass text-fg-muted inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs">
            <span className="pulse-dot" />
            Open to roles · internships · freelance · collaboration
          </span>
        </Reveal>

        <h1 className="mt-7 text-[clamp(2.75rem,10vw,7rem)] leading-[0.95] font-bold tracking-[-0.03em]">
          <RevealWords text="Abu Kawser" className="gradient-text" />
        </h1>

        <Reveal delay={0.18}>
          <p className="text-fg-muted mt-5 flex min-h-[1.75rem] items-center gap-2 text-base sm:text-lg">
            <span className="text-[var(--accent)]">&gt;</span>
            <Typewriter phrases={PROFILE.roles} />
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="text-fg-muted mt-7 max-w-2xl text-base leading-relaxed sm:text-lg">
            Final-year Computer Science undergrad at the{" "}
            <strong className="text-fg font-semibold">University of Dhaka</strong>. I build things
            that hold up under constraints — offline-first tools, compression that actually ships,
            and retrieval systems people use.
          </p>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_10px_40px_-10px_var(--accent)]"
              >
                View my work
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={`mailto:${PROFILE.email}`}
                className="glass text-fg inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors hover:border-[var(--accent)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                Hire me
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="text-fg-dim mt-10 flex flex-wrap items-center gap-5 text-sm">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg inline-flex items-center gap-2 transition-colors"
            >
              <GithubIcon /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg inline-flex items-center gap-2 transition-colors"
            >
              <LinkedinIcon /> LinkedIn
            </a>
            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {PROFILE.location}
            </span>
          </div>
        </Reveal>
      </div>

      <motion.a
        href="#stats"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-fg-dim absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-[var(--accent)] to-transparent"
        />
      </motion.a>
    </section>
  );
}

/* ==================================================================
   Live stats strip
   ================================================================== */
export function Stats({ stats }: { stats: GithubStats }) {
  const items = [
    { value: 5.15, decimals: 2, suffix: "×", label: "Bangla SMS compression achieved" },
    { value: stats.bornomalaStars, decimals: 0, suffix: "★", label: "GitHub stars on Bornomala" },
    {
      value: ACHIEVEMENTS.length,
      decimals: 0,
      suffix: "",
      label: "National hackathon & CTF honours",
    },
    { value: stats.publicRepos, decimals: 0, suffix: "", label: "Public repositories shipped" },
  ];

  return (
    <section id="stats" className="relative z-10 py-16 md:py-20">
      <div className="shell">
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="bg-bg/40 h-full p-5 text-center md:p-7">
                <div className="text-3xl font-bold tracking-tight md:text-4xl">
                  <Counter to={item.value} decimals={item.decimals} />
                  <span className="text-[var(--accent)]">{item.suffix}</span>
                </div>
                <p className="text-fg-dim mt-2 text-xs leading-snug md:text-sm">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {stats.live && (
          <p className="text-fg-dim mt-3 text-center font-mono text-[11px]">
            <span className="pulse-dot mr-2 inline-block align-middle" />
            GitHub figures pulled live, refreshed hourly
          </p>
        )}
      </div>
    </section>
  );
}

/* ==================================================================
   About
   ================================================================== */
export function About() {
  const facts = [
    { k: "Education", v: `${PROFILE.degree} — ${PROFILE.university}` },
    { k: "Focus", v: "Backend · Systems · Applied ML infrastructure" },
    { k: "Based in", v: "Badda, Dhaka — open to remote, hybrid & relocation" },
    { k: "Currently", v: "Final-year undergrad · open to work" },
  ];

  return (
    <section id="about" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading kicker="01 — About" title="Engineer first, student second." />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="border-l-2 border-[var(--accent)] pl-5 text-lg font-medium italic sm:text-xl">
                &ldquo;{PROFILE.quote}&rdquo;
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-fg-muted mt-7 space-y-5 leading-relaxed">
                <p>
                  That line is from the deck I pitched at{" "}
                  <strong className="text-fg">July Hackathon 2026</strong>, and it is roughly how I
                  pick problems. When the network dies in a flood, nobody needs a new protocol —
                  they need the one that already works to carry more. So I wrote a PPM arithmetic
                  coder that fits{" "}
                  <strong className="text-fg">361 Bangla characters into one SMS segment</strong>{" "}
                  instead of 70, and shipped it as an offline PWA with no server and no accounts.
                </p>
                <p>
                  I work mostly on the backend and close to the metal: compression, retrieval, and
                  the plumbing that keeps a system honest. On the CSEDU Digital Knowledge Platform I
                  worked across <strong className="text-fg">Go</strong>,{" "}
                  <strong className="text-fg">FastAPI</strong> and{" "}
                  <strong className="text-fg">PostgreSQL + pgvector</strong> to put a RAG assistant
                  on top of a real library and archive — deployed, not demoed.
                </p>
                <p>
                  Outside coursework I compete: CTFs, datathons and AI hackathons. It keeps me fast
                  and it keeps me humble.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="mt-9 grid gap-px overflow-hidden rounded-xl sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.k} className="glass p-4">
                    <dt className="text-fg-dim font-mono text-[10px] tracking-[0.18em] uppercase">
                      {f.k}
                    </dt>
                    <dd className="text-fg mt-1.5 text-sm leading-snug">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="glass overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="text-fg-dim ml-2 font-mono text-[11px]">kawser@dhaka:~</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                <code>
                  <Cmd>whoami</Cmd>
                  <Out>abu-kawser</Out>
                  {"\n"}
                  <Cmd>cat focus.txt</Cmd>
                  <Out>backend · systems · compression · RAG</Out>
                  {"\n"}
                  <Cmd>ls languages/</Cmd>
                  <Out>go python typescript java c++ dart</Out>
                  {"\n"}
                  <Cmd>./bench bornomala</Cmd>
                  <Out>3.106 bits/char (vs 16.000 UCS-2)</Out>
                  {"\n"}
                  <Cmd>status --hiring</Cmd>
                  <span className="text-[var(--accent-2)]">available</span>{" "}
                  <span className="text-fg-dim">{"// roles · internships · freelance"}</span>
                  {"\n\n"}
                  <span className="text-[var(--accent)]">$</span> <span className="blink">▊</span>
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Cmd({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="text-[var(--accent)]">$</span> <span className="text-fg">{children}</span>
      {"\n"}
    </>
  );
}

function Out({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="text-fg-muted">{children}</span>
      {"\n"}
    </>
  );
}

/* ==================================================================
   Work
   ================================================================== */
export function Work() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="work" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading kicker="02 — Selected work" title="Things I built that actually run." />

        <div className="space-y-8">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <TiltCard className="glass card-hover h-full rounded-2xl p-6" tilt={4}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} source on GitHub`}
                      className="text-fg-dim hover:text-fg shrink-0 transition-colors"
                    >
                      <GithubIcon />
                    </a>
                  )}
                </div>
                <p className="text-fg-dim mt-1 font-mono text-[11px]">{p.kind}</p>
                <p className="text-fg-muted mt-3 text-sm leading-relaxed">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <Magnetic>
              <a
                href={`${PROFILE.github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass text-fg group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors hover:border-[var(--accent)]"
              >
                All repositories on GitHub
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.1}>
      <TiltCard className="glass card-hover rounded-3xl p-6 sm:p-9" tilt={3}>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase"
                style={{ background: `${project.accent}22`, color: project.accent }}
              >
                Featured
              </span>
              <span className="text-fg-dim font-mono text-[11px]">
                {project.kind} · {project.year}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h3>
            <p className="text-fg mt-2 text-base font-medium sm:text-lg">{project.tagline}</p>
            <p className="text-fg-muted mt-4 leading-relaxed">{project.summary}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {project.caseStudy && (
                <Link
                  href={`/work/${project.slug}`}
                  className="group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white"
                >
                  Read the case study
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass text-fg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)]"
                >
                  Live
                  <ExternalIcon />
                </a>
              )}
              {project.extraLinks?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass text-fg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)]"
                >
                  {l.label}
                  <ExternalIcon />
                </a>
              ))}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass text-fg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)]"
                >
                  <GithubIcon /> Source
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl">
            {project.metrics.map((m) => (
              <div key={m.label} className="glass p-4 text-center sm:p-5">
                <div
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                  style={{ color: project.accent }}
                >
                  {m.value}
                </div>
                <div className="text-fg-dim mt-1 text-[11px] leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/* ==================================================================
   Achievements
   ================================================================== */
export function Achievements() {
  return (
    <section id="achievements" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading kicker="03 — Achievements" title="Competing keeps me sharp." />

        <ol className="relative space-y-5 border-l border-[var(--border)] pl-6 sm:pl-9">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <li className="relative">
                <span
                  className="glass absolute -left-[calc(1.5rem+1px)] top-5 grid size-11 -translate-x-1/2 place-items-center rounded-full font-mono text-[10px] font-bold text-[var(--accent)] sm:-left-[calc(2.25rem+1px)]"
                  aria-hidden
                >
                  {a.rank}
                </span>
                <div className="glass card-hover rounded-2xl p-5 sm:p-6">
                  <div className="text-fg-dim font-mono text-[11px]">{a.date}</div>
                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{a.title}</h3>
                  <p className="mt-1 text-sm text-[var(--accent-2)]">{a.org}</p>
                  <p className="text-fg-muted mt-3 text-sm leading-relaxed">{a.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "GitHub Starstruck", sub: "Earned from 36★ on Bornomala" },
            {
              title: `${ACHIEVEMENTS.length} national honours`,
              sub: "Hackathons, datathons & CTFs since 2024",
            },
            { title: PROFILE.university, sub: PROFILE.degree },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="glass card-hover flex h-full items-start gap-3 rounded-2xl p-5">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0"
                >
                  <path d="m12 2 2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6L7.9 13.8 2 9.4h7.6z" />
                </svg>
                <div>
                  <div className="text-sm font-semibold">{b.title}</div>
                  <div className="text-fg-dim mt-0.5 text-xs leading-snug">{b.sub}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================================================================
   Skills
   ================================================================== */
export function Skills({ stats }: { stats: GithubStats }) {
  return (
    <section id="skills" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading kicker="04 — Toolkit" title="What I reach for." />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.07}>
              <TiltCard className="glass card-hover h-full rounded-2xl p-6" tilt={4}>
                <h3 className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
                  <span className="text-fg-dim font-mono text-[11px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {stats.topLanguages.length > 0 && (
          <Reveal delay={0.1}>
            <div className="marquee mt-10 overflow-hidden rounded-xl py-4">
              <div className="marquee-track gap-8">
                {[...stats.topLanguages, ...stats.topLanguages, ...stats.topLanguages].map(
                  (lang, i) => (
                    <span
                      key={`${lang}-${i}`}
                      className="text-fg-dim shrink-0 font-mono text-xl tracking-tight sm:text-2xl"
                    >
                      {lang}
                      <span className="text-[var(--accent)]"> /</span>
                    </span>
                  ),
                )}
              </div>
            </div>
            <p className="text-fg-dim mt-1 text-center font-mono text-[11px]">
              most-used languages across {stats.publicRepos} public repositories
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ==================================================================
   Contact
   ================================================================== */
export function Contact() {
  return (
    <section id="contact" className="relative z-10 py-20 md:py-32">
      <div className="shell">
        <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-30 blur-[90px]"
            aria-hidden
          />

          <Reveal>
            <span className="text-fg-dim font-mono text-xs tracking-[0.2em] uppercase">
              05 — Contact
            </span>
          </Reveal>

          <h2 className="relative mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            <RevealWords text="Let's build something solid." />
          </h2>

          <Reveal delay={0.14}>
            <p className="text-fg-muted mx-auto mt-5 max-w-xl leading-relaxed">
              I&rsquo;m in my final year and available for graduate software engineering roles,
              internships, freelance projects and open-source collaboration. If you have a hard
              problem — especially one with tight constraints — I&rsquo;d like to hear about it.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {OPEN_TO.map((o) => (
                <span key={o} className="chip">
                  {o}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${PROFILE.email}?subject=Opportunity%20for%20Abu%20Kawser`}
                  className="group inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-[var(--accent)] px-6 py-4 text-white transition-shadow hover:shadow-[0_16px_50px_-12px_var(--accent)] sm:px-8"
                >
                  <span className="font-mono text-sm break-all sm:text-base">{PROFILE.email}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="text-fg-dim mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg inline-flex items-center gap-2 transition-colors"
              >
                <GithubIcon /> github.com/Mayamoho
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg inline-flex items-center gap-2 transition-colors"
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ==================================================================
   Footer
   ================================================================== */
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] py-8">
      <div className="shell text-fg-dim flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
        <span>© {new Date().getFullYear()} Abu Kawser · Dhaka, Bangladesh</span>
        <span>
          Built with Next.js — no trackers.{" "}
          <a
            href={PROFILE.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-fg transition-colors"
          >
            Source
          </a>
        </span>
      </div>
    </footer>
  );
}

/* ==================================================================
   Icons
   ================================================================== */
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1a3.7 3.7 0 013.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 112.1-2.1 2.1 2.1 0 01-2.1 2.1zm1.8 13H3.5V9h3.6v11.4zM22.2 0H1.8A1.8 1.8 0 000 1.8v20.4A1.8 1.8 0 001.8 24h20.4a1.8 1.8 0 001.8-1.8V1.8A1.8 1.8 0 0022.2 0z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6M10 14L21 3" />
    </svg>
  );
}
