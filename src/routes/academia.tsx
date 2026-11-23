import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/frame";

export const Route = createFileRoute("/academia")({ component: AcademiaPage });

function AcademiaPage() {
  return (
    <Page
      kicker="Academia"
      title="Study, not a publication list."
      lede="Department of Multimedia and Creative Technology, Daffodil International University, 2022–2026. Coursework and independent experiments are kept separate from claimed papers."
    >
      <ul className="max-w-2xl space-y-4 text-muted">
        <li>Program: Multimedia and Creative Technology.</li>
        <li>Interests: human-computer interaction, simulation-based learning, photography as an interactive system.</li>
        <li>
          Ongoing inquiry lives under{" "}
          <Link to="/research" className="text-fg underline">
            Research
          </Link>
          .
        </li>
      </ul>
    </Page>
  );
}
