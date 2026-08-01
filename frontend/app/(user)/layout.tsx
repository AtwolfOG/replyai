import { BottomNavBar, TopNavbar } from "@/components/navbar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <main className="flex flex-col min-h-screen">
            <TopNavbar />
            <div className="relative flex-1 px-(--space-8) py-(--space-4) max-sm:pb-(--space-20)">
                {children}
            </div>
            <BottomNavBar />
        </main>
    )
}