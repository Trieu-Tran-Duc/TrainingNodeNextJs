'use client'
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { SidebarProvider, useSidebar } from './SidebarContext';

interface LayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <TopBar />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}
