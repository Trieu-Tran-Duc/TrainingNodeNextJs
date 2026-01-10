'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ITEMS } from '@/helper';
import { useSidebar } from './SidebarContext';

export default function Sidebar() {
    const pathname = usePathname();
    const { collapsed } = useSidebar();

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">Prime</div>
            <ul className="sidebar-menu">
                {MENU_ITEMS.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={pathname === item.href ? 'active' : ''}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="sidebar-footer">
                {/* <img src="/images/logo.png" alt="KONOIKE MEDICAL SUPPLIES" /> */}
            </div>
        </aside>
    );
}
