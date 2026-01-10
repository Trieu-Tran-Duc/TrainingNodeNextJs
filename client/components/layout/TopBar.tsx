'use client'
import Link from 'next/link';
import { useSidebar } from './SidebarContext';
import { ROUTES_MENU } from '@/helper';

export default function TopBar() {
  const { toggle, collapsed } = useSidebar();

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <button className="menu-toggle" onClick={toggle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="top-bar-title">Prime</div>
      </div>
      <div className="top-bar-actions">
        <Link href={ROUTES_MENU.LOGOUT.path} className="top-bar-btn">{ROUTES_MENU.LOGOUT.name}</Link>
        <Link href={ROUTES_MENU.ADMIN.path} className="top-bar-btn">{ROUTES_MENU.ADMIN.name}</Link>
      </div>
    </div>
  );
}
