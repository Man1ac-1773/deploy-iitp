import { ProfilePanelShell } from "@/components/layout/profile-panel-shell";
import { ProfilePhotoSlot } from "@/components/shared/media/profile-photo-slot";
import { SectionNav } from "@/components/shared/navigation/section-nav";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { facultyData } from "@/data/facultyData";

export function ProfilePanel() {
  const { professor, lab } = facultyData;

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
              <h2
                data-transition-source="professor-name"
                className="text-balance text-3xl font-bold tracking-[-0.04em] text-foreground uppercase sm:text-4xl lg:text-3xl xl:text-4xl"
              >
                {professor.fullName}
              </h2>
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                {professor.role} // CSE DEPT
              </p>
            </div>
          </div>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base font-light">
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
