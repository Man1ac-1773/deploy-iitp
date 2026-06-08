import { ProfilePanelShell } from "@/components/layout/profile-panel-shell";
import { SectionNav } from "@/components/shared/navigation/section-nav";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { siteConfig } from "@/config/site";

export function ProfilePanel() {
  const { professor } = siteConfig;

  return (
    <ProfilePanelShell>
      <div className="flex flex-col gap-8">
        <div
          data-transition-id="professor-identity"
          className="flex flex-col gap-4"
        >
          <SectionLabel>{siteConfig.lab}</SectionLabel>
          <h2
            data-transition-source="professor-name"
            className="text-balance text-3xl font-medium tracking-tight sm:text-4xl"
          >
            {professor.fullName}
          </h2>
          <p className="max-w-sm text-base text-muted-foreground">
            {professor.role} · {professor.department}
          </p>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {professor.bio}
        </p>

        <SectionNav />
      </div>

      <div className="flex flex-col gap-2 border-t border-muted-foreground/15 pt-8">
        <SectionLabel>Contact</SectionLabel>
        <a
          href={`mailto:${professor.email}`}
          className="text-sm text-foreground hover:text-accent"
        >
          {professor.email}
        </a>
        <p className="text-sm text-muted-foreground">{professor.location}</p>
      </div>
    </ProfilePanelShell>
  );
}
