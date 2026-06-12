import { ContentPanel } from "@/components/layout/content-panel";
import { MainLayout } from "@/components/layout/main-layout";
import { ScrollPhaseTracker } from "@/components/layout/scroll-phase-tracker";
import { BentoSection } from "@/components/sections/bento-grid/bento-section";
import { EditorialHero } from "@/components/sections/hero/editorial-hero";
import { ProfilePanel } from "@/components/sections/profile-panel/profile-panel";
import { PublicationSection } from "@/components/sections/publication-drawer/publication-section";
import { ConferencesSection } from "@/components/sections/conferences/conferences-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { TeachingSection } from "@/components/sections/teaching/teaching-section";
import { ActivitiesSection } from "@/components/sections/activities/activities-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { NetworkBackground } from "@/components/shared/media/network-background";
import { ResearchGraph } from "@/components/sections/research-graph/research-graph";
import { SiteNav } from "@/components/layout/site-nav";

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NetworkBackground />
      </div>
      <ScrollPhaseTracker />
      <SiteNav />
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
            <ConferencesSection />
          </div>

          <div className="scroll-reveal">
            <ExperienceSection />
          </div>

          <div className="scroll-reveal">
            <TeachingSection />
          </div>

          <div className="scroll-reveal">
            <ActivitiesSection />
          </div>
          <div className="scroll-reveal">
            <ContactSection />
          </div>
        </ContentPanel>
      </MainLayout>
    </>
  );
}
