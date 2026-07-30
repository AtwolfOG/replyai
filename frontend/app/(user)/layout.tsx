import { BottomNavBar, TopNavbar } from "@/components/navbar";
import Transition from "@/components/pageTransition"

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <main className="flex flex-col min-h-screen">
            <TopNavbar />
            <div className="relative flex-1">
                <Transition>
                    {children}
                </Transition>
            </div>
            <BottomNavBar />
        </main>
    )
}