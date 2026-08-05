import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFILE, PROJECTS } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/ui";

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${PROFILE.name}`,
      description: project.tagline,
      url: `/work/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${PROFILE.name}`,
      description: project.tagline,
    },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project?.caseStudy) notFound();

  const { problem, approach, results, learned } = project.caseStudy;

  return (
    <article className="relative z-10 pt-32 pb-24">
      <div className="shell max-w-3xl">
        <Reveal>
          <Link
            href="/#work"
            className="text-fg-dim hover:text-fg group inline-flex items-center gap-2 font-mono text-xs transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            back to work
          </Link>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase"
            style={{ background: `${project.accent}22`, color: project.accent }}
          >
            Case study
          </span>
          <span className="text-fg-dim font-mono text-[11px]">
            {project.kind} · {project.year}
          </span>
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          <RevealWords text={project.name} />
        </h1>

        <Reveal delay={0.12}>
          <p className="text-fg-muted mt-4 text-lg leading-relaxed">{project.tagline}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white"
              >
                Open live
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
              </a>
            ))}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="glass text-fg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)]"
              >
                Source
              </a>
            )}
          </div>
        </Reveal>

        {project.metrics.length > 0 && (
          <Reveal delay={0.22}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="glass p-4 text-center">
                  <div
                    className="text-xl font-bold tracking-tight"
                    style={{ color: project.accent }}
                  >
                    {m.value}
                  </div>
                  <div className="text-fg-dim mt-1 text-[11px] leading-snug">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Section title="The problem">
          <p>{problem}</p>
        </Section>

        <Section title="What I built">
          <ol className="space-y-4">
            {approach.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="text-fg-dim shrink-0 font-mono text-xs leading-relaxed">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Results">
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent-2)]" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="What I got wrong, and what I'd change">
          <p>{learned}</p>
        </Section>

        <Reveal>
          <div className="glass mt-16 rounded-2xl p-7 text-center">
            <p className="text-fg-muted text-sm">
              Want the deeper version, or have a problem shaped like this one?
            </p>
            <a
              href={`mailto:${PROFILE.email}?subject=About%20${encodeURIComponent(project.name)}`}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white"
            >
              {PROFILE.email}
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <Reveal>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="text-fg-muted mt-5 leading-relaxed">{children}</div>
      </Reveal>
    </section>
  );
}
