import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/frame";
import { useAtelier } from "@/lib/atelier";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const { profile } = useAtelier();
  return (
    <Page kicker="About" title={profile.name} lede={profile.line}>
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,18rem)_1fr]">
        <img
          src="https://cdn.phototourl.com/anon/2026-11-22-bbbf1fb0-6a16-43d5-9443-6aee322e38a6.png"
          alt="Portrait of Minhazul Arefin"
          className="w-full max-w-xs object-cover object-top md:max-w-none"
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_14rem]">
        <div className="max-w-2xl space-y-5 text-muted">
          <p>
            Based in Dhaka. Studying Multimedia and Creative Technology at Daffodil International University, 2022–2026.
          </p>
          <p>
            The work sits between interface design, interactive simulation, photography, and film. Projects start from the people using a system and the experience that system has to make legible.
          </p>
          <p>
            Tools in active use include design and prototyping software, Unity, Blender, and editorial video tools. Depth varies by project. The site does not flatten that into a senior-engineer or award-filmmaker biography.
          </p>
          <p>
            <Link to="/work" className="text-fg underline">
              Work
            </Link>
            {" · "}
            <Link to="/research" className="text-fg underline">
              Research
            </Link>
            {" · "}
            <Link to="/contact" className="text-fg underline">
              Contact
            </Link>
          </p>
        </div>
        <aside className="space-y-4 border border-line p-5 text-sm">
          <p>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Location</span>
            {profile.location}
          </p>
          <p>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">CV</span>
            {profile.cvUrl ? (
              <a className="text-accent underline" href={profile.cvUrl}>
                Open CV
              </a>
            ) : (
              <span className="text-muted">Link not added</span>
            )}
          </p>
          <p>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Email</span>
            {profile.email || <span className="text-muted">Not added</span>}
          </p>
        </aside>
        </div>
      </div>
    </Page>
  );
}
