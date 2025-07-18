
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Scroll main content to top and sidebar to show selected item
  useEffect(() => {
    // Force scroll main content to top immediately
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }

    // Also try scrolling the window to top as backup
    window.scrollTo(0, 0);

    // Use a small delay to ensure DOM is updated before scrolling sidebar
    const timer = setTimeout(() => {
      // Scroll sidebar to show selected navigation item
      if (sidebarScrollRef.current) {
        // Find the active navigation item
        const activeItem = sidebarScrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
        if (activeItem) {
          // Calculate the position to scroll to show the active item
          const sidebarRect = sidebarScrollRef.current.getBoundingClientRect();
          const itemRect = activeItem.getBoundingClientRect();
          const scrollTop = sidebarScrollRef.current.scrollTop;
          
          // Check if item is not fully visible
          if (itemRect.top < sidebarRect.top || itemRect.bottom > sidebarRect.bottom) {
            const targetScrollTop = scrollTop + (itemRect.top - sidebarRect.top) - 20; // 20px padding
            sidebarScrollRef.current.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <AppSidebar sidebarScrollRef={sidebarScrollRef} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main ref={mainContentRef} className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
