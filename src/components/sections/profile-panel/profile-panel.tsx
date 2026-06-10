import { ProfilePanelShell } from "@/components/layout/profile-panel-shell";
import { ProfilePhotoSlot } from "@/components/shared/media/profile-photo-slot";
import { SectionNav } from "@/components/shared/navigation/section-nav";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { siteConfig } from "@/config/site";

export function ProfilePanel() {
  const { professor, lab } = siteConfig;

  return (
    <ProfilePanelShell>
      <div className="flex flex-col gap-12">
        <div
          data-transition-id="professor-identity"
          className="flex flex-col gap-6"
        >
          <SectionLabel className="text-accent font-semibold">// {lab}</SectionLabel>

          <div className="flex flex-col gap-5 sm:gap-6">
            <ProfilePhotoSlot
              src={professor.profileImage}
              alt={`Portrait of ${professor.fullName}`}
              initials={professor.initials}
              className="border border-border/80 p-1 bg-surface"
            />

            <div className="flex min-w-0 flex-col gap-2 pt-1">
              <p
                data-transition-source="professor-name"
                className="text-balance text-3xl font-bold tracking-[-0.04em] text-foreground uppercase sm:text-4xl lg:text-3xl xl:text-4xl"
              >
                {professor.fullName}
              </p>
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                {professor.role} // CSE DEPT
              </p>
            </div>
          </div>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-foreground/85 sm:text-base font-normal">
          {professor.bio}
        </p>

        <SectionNav />
      </div>

      <div className="flex flex-col gap-6 border-t border-muted-foreground/15 pt-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Contact</h3>
          <a
            href={`mailto:${professor.email}`}
            className="text-sm text-foreground hover:text-accent transition-colors"
          >
            {professor.email}
          </a>
          <p className="text-sm text-muted-foreground">{professor.location}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Profiles</h3>
          <div className="flex flex-col gap-2">
            <a href="https://scholar.google.com/citations?user=Iv8gjG8AAAAJ&hl=en&oi=sra" target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-2">
              <span className="font-mono text-[9px] text-accent/50">[ GS ]</span> Google Scholar
            </a>
            <a href="https://www.researchgate.net/profile/Rahul-Mishra-22" target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-2">
              <span className="font-mono text-[9px] text-accent/50">[ RG ]</span> ResearchGate
            </a>
            <a href="https://www.linkedin.com/in/rahul-mishra-052205146/" target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-2">
              <span className="font-mono text-[9px] text-accent/50">[ IN ]</span> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </ProfilePanelShell>
  );
}
