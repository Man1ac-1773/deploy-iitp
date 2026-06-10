import { ProfilePanelShell } from "@/components/layout/profile-panel-shell";
import { ProfilePhotoSlot } from "@/components/shared/media/profile-photo-slot";
import { SectionNav } from "@/components/shared/navigation/section-nav";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { siteConfig } from "@/config/site";
import { GraduationCap, BookOpen } from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
            <a href="https://scholar.google.com/citations?user=Iv8gjG8AAAAJ&hl=en&oi=sra" target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-3">
              <GraduationCap className="w-4 h-4 text-accent/70" /> Google Scholar
            </a>
            <a href="https://www.researchgate.net/profile/Rahul-Mishra-22" target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-accent/70" /> ResearchGate
            </a>
            <a href="https://www.linkedin.com/in/rahul-mishra-052205146/" target="_blank" rel="noreferrer" className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-3">
              <LinkedinIcon className="w-4 h-4 text-accent/70" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </ProfilePanelShell>
  );
}
