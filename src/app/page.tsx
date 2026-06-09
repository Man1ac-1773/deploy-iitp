import { ContentPanel } from "@/components/layout/content-panel";
import { MainLayout } from "@/components/layout/main-layout";
import { ScrollPhaseTracker } from "@/components/layout/scroll-phase-tracker";
import { BentoSection } from "@/components/sections/bento-grid/bento-section";
import { EditorialHero } from "@/components/sections/hero/editorial-hero";
import { ProfilePanel } from "@/components/sections/profile-panel/profile-panel";
import { PublicationSection } from "@/components/sections/publication-drawer/publication-section";
import { ResearchGraph } from "@/components/sections/research-graph/research-graph";
import { TimelineSection } from "@/components/sections/timeline/timeline-section";
import { StudentsSection } from "@/components/sections/students/students-section";
import { ContactSection } from "@/components/sections/contact/contact-section";

export default function HomePage() {
  return (
    <>
      <ScrollPhaseTracker />
      <EditorialHero />

      <MainLayout profilePanel={<ProfilePanel />}>
        <ContentPanel>
          <div className="scroll-reveal">
            <BentoSection />
          </div>

          <div className="scroll-reveal">
            <ResearchGraph />
          </div>

          <div className="scroll-reveal">
            <PublicationSection />
          </div>

          <div className="scroll-reveal">
            <TimelineSection />
          </div>

          <div className="scroll-reveal">
            <StudentsSection />
          </div>

          <div className="scroll-reveal">
            <ContactSection />
          </div>
        </ContentPanel>
      </MainLayout>
    </>
  );
}
