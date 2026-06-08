import { ProfilePanelShell } from "@/components/layout/profile-panel-shell";
import { ProfilePhotoSlot } from "@/components/shared/media/profile-photo-slot";
import { SectionNav } from "@/components/shared/navigation/section-nav";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { facultyData } from "@/data/facultyData";

export function ProfilePanel() {
  const { professor, lab } = facultyData;

  return (
    <ProfilePanelShell>
      <div className="flex flex-col gap-8">
        <div
          data-transition-id="professor-identity"
          className="flex flex-col gap-4"
        >
          <SectionLabel>{lab}</SectionLabel>

          <div className="flex items-start gap-4 sm:gap-5">
            <ProfilePhotoSlot
              src={professor.profileImage}
              alt={`Portrait of ${professor.fullName}`}
              initials={professor.initials}
            />

            <div className="flex min-w-0 flex-col gap-3 pt-1">
              <h2
                data-transition-source="professor-name"
                className="text-balance text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl"
              >
                {professor.fullName}
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                {professor.role} · {professor.department}
              </p>
            </div>
          </div>
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
