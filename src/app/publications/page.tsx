import { ContentPanel } from "@/components/layout/content-panel";
import { MainLayout } from "@/components/layout/main-layout";
import { ProfilePanel } from "@/components/sections/profile-panel/profile-panel";
import { NetworkBackground } from "@/components/shared/media/network-background";
import { publications } from "@/data/publications";
import { PublicationExplorer } from "@/components/sections/publication-drawer/publication-explorer";
import Link from "next/link";

export default function PublicationsPage() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NetworkBackground />
      </div>

      <MainLayout profilePanel={<ProfilePanel />}>
        <ContentPanel>
          <div className="mb-8">
            <Link 
              href="/"
              className="font-mono text-[10px] text-muted-foreground hover:text-accent uppercase tracking-widest transition-colors flex items-center gap-2 w-fit"
            >
              <span>←</span> Return to Base
            </Link>
          </div>
          
          <div className="scroll-reveal">
            <PublicationExplorer publications={publications} />
          </div>
        </ContentPanel>
      </MainLayout>
    </>
  );
}
