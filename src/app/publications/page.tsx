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

      {/* Force professor identity visibility on this static page */}
      <style suppressHydrationWarning>{`
        @media (min-width: 1024px) {
          aside [data-transition-id="professor-identity"] {
            opacity: 1 !important;
            transform: translateY(0px) !important;
            filter: none !important;
          }
        }
      `}</style>

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
          
          <div className="animate-in fade-in duration-1000 ease-out fill-mode-forwards">
            <PublicationExplorer publications={publications} />
          </div>
        </ContentPanel>
      </MainLayout>
    </>
  );
}
