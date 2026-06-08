import { ContentPanel } from "@/components/layout/content-panel";
import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { ProfilePanel } from "@/components/sections/profile-panel/profile-panel";
import { PlaceholderBlock } from "@/components/shared/placeholder-block";

export default function HomePage() {
  return (
    <MainLayout profilePanel={<ProfilePanel />}>
      <ContentPanel>
        <HeroSection />

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
  );
}
