import { ContentPanel } from "@/components/layout/content-panel";
import { MainLayout } from "@/components/layout/main-layout";
import { ScrollPhaseTracker } from "@/components/layout/scroll-phase-tracker";
import { BentoSection } from "@/components/sections/bento-grid/bento-section";
import { EditorialHero } from "@/components/sections/hero/editorial-hero";
import { ProfilePanel } from "@/components/sections/profile-panel/profile-panel";
import { PublicationExplorer } from "@/components/sections/publication-drawer/publication-explorer";
import { PlaceholderBlock } from "@/components/shared/placeholder-block";
import { facultyData } from "@/data/facultyData";

export default function HomePage() {
  return (
    <>
      <ScrollPhaseTracker />
      <EditorialHero />

      <MainLayout profilePanel={<ProfilePanel />}>
        <ContentPanel>
          <BentoSection />

          <PublicationExplorer publications={facultyData.publications} />

          <PlaceholderBlock
            id="timeline"
            label="Timeline"
            title="Lab timeline"
          />

          <PlaceholderBlock
            id="students"
            label="Students"
            title="Current students"
          />

          <PlaceholderBlock
            id="contact"
            label="Contact"
            title="Get in touch"
          />
        </ContentPanel>
      </MainLayout>
    </>
  );
}
