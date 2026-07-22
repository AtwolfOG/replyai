import Navbar from "@/components/navbar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="relative flex-1">
                {children}
            </div>
        </main>
    )
}