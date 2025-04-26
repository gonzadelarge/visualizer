import React from 'react'

import { AppSidebar } from './components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"

const Trigger = () => (
    <div style={{ position: 'absolute', top: 10, zIndex: 1 }}>
        <SidebarTrigger />
    </div>
)

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <main className="flex-1 relative">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
