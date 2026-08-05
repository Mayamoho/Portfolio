import { PROFILE } from "./data";

export type GithubStats = {
  totalStars: number;
  publicRepos: number;
  followers: number;
  topLanguages: string[];
  bornomalaStars: number;
  live: boolean;
};

/** Values used when the GitHub API is unreachable or rate-limited. */
const FALLBACK: GithubStats = {
  totalStars: 42,
  publicRepos: 15,
  followers: 11,
  topLanguages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  bornomalaStars: 36,
  live: false,
};

type ApiUser = { public_repos?: number; followers?: number };
type ApiRepo = {
  name?: string;
  stargazers_count?: number;
  language?: string | null;
  fork?: boolean;
};

const HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "abu-kawser-portfolio",
};

/**
 * Live GitHub profile numbers, revalidated hourly by the Next.js data cache.
 * Never throws — a failed fetch degrades to FALLBACK so a rate limit or an
 * offline build can't take the page down.
 */
export async function getGithubStats(): Promise<GithubStats> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${PROFILE.handle}`, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${PROFILE.handle}/repos?per_page=100&sort=updated`, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return FALLBACK;

    const user = (await userRes.json()) as ApiUser;
    const repos = (await reposRes.json()) as ApiRepo[];
    if (!Array.isArray(repos)) return FALLBACK;

    const owned = repos.filter((r) => !r.fork);

    const totalStars = owned.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

    const langCount = new Map<string, number>();
    for (const r of owned) {
      if (!r.language) continue;
      langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
    }
    const topLanguages = [...langCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang]) => lang);

    const bornomalaStars =
      owned.find((r) => r.name?.toLowerCase() === "bornomala")?.stargazers_count ??
      FALLBACK.bornomalaStars;

    return {
      totalStars: totalStars || FALLBACK.totalStars,
      publicRepos: user.public_repos ?? owned.length,
      followers: user.followers ?? FALLBACK.followers,
      topLanguages: topLanguages.length ? topLanguages : FALLBACK.topLanguages,
      bornomalaStars,
      live: true,
    };
  } catch {
    return FALLBACK;
  }
}
