import Link from "next/link";
import { Page } from "@/components/frame";

export default function AcademiaPage() {
  return (
    <Page
      kicker="Academia"
      title="Study, not a publication list."
      lede="Department of Multimedia and Creative Technology, Daffodil International University, 2022–2026. Coursework and independent experiments are kept separate from claimed papers."
    >
      <div className="max-w-2xl space-y-6 text-muted leading-relaxed">
        <ul className="space-y-4">
          <li className="border-l-2 border-line pl-4">
            <span className="font-semibold text-fg block">Academic Program</span>
            Multimedia and Creative Technology (B.Sc.), Daffodil International University.
          </li>
          <li className="border-l-2 border-line pl-4">
            <span className="font-semibold text-fg block">Core Inquiries</span>
            Human-computer interaction, simulation-based learning environments, camera mechanics as
            computational systems.
          </li>
          <li className="border-l-2 border-line pl-4">
            <span className="font-semibold text-fg block">Active Exploration</span>
            Ongoing research prototypes and notes are cataloged under{" "}
            <Link href="/research" className="text-fg font-medium underline hover:text-accent">
              Research
            </Link>
            .
          </li>
        </ul>
      </div>
    </Page>
  );
}
