'use client'
import { createContext, useContext, useEffect, useState } from 'react';

type SidebarContextType = {
    collapsed: boolean;
    toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('sidebarCollapsed');
        if (stored) setCollapsed(stored === 'true');
    }, []);

    const toggle = () => {
        setCollapsed(prev => {
            const next = !prev;
            localStorage.setItem('sidebarCollapsed', next.toString());
            return next;
        });
    };

    return (
        <SidebarContext.Provider value={{ collapsed, toggle }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error('useSidebar must be used inside SidebarProvider');
    return ctx;
}
