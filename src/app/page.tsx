import { ContentPanel } from "@/components/layout/content-panel";
import { MainLayout } from "@/components/layout/main-layout";
import { PortfolioShell } from "@/components/layout/portfolio-shell";
import { EditorialHero } from "@/components/sections/hero/editorial-hero";
import { ProfilePanel } from "@/components/sections/profile-panel/profile-panel";
import { PlaceholderBlock } from "@/components/shared/placeholder-block";

export default function HomePage() {
  return (
    <PortfolioShell>
      <EditorialHero />

      <MainLayout profilePanel={<ProfilePanel />}>
        <ContentPanel>
          <PlaceholderBlock
            id="research"
            label="Research"
            title="Research graph"
          />

          <PlaceholderBlock
            id="publications"
            label="Publications"
            title="Selected publications"
          />

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
    </PortfolioShell>
  );
}
