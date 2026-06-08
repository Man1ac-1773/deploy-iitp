import { ProfilePanelShell } from "@/components/layout/profile-panel-shell";
import { SectionNav } from "@/components/shared/navigation/section-nav";
import { SectionLabel } from "@/components/shared/typography/section-label";

export function ProfilePanel() {
  return (
    <ProfilePanelShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <SectionLabel>Spatial Lab</SectionLabel>
          <h1 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl">
            Dr. Placeholder Name
          </h1>
          <p className="max-w-sm text-base text-muted-foreground">
            Professor of Computational Spatial Systems · IIT Patna
          </p>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Research at the intersection of geometry, urban systems, and
          human–computer interaction. Building precise tools for spatial
          reasoning and scientific visualization.
        </p>

        <SectionNav />
      </div>

      <div className="flex flex-col gap-2 border-t border-muted-foreground/15 pt-8">
        <SectionLabel>Contact</SectionLabel>
        <a
          href="mailto:placeholder@iitp.ac.in"
          className="text-sm text-foreground hover:text-accent"
        >
          placeholder@iitp.ac.in
        </a>
        <p className="text-sm text-muted-foreground">Patna, India</p>
      </div>
    </ProfilePanelShell>
  );
}
