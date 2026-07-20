import Image from "next/image";

export function Nav() {
    return (
        <header className="flex justify-between items-center px-6 py-4 h-20 border-b border-(--border)">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h3 >Reply AI</h3>
          </div>
        </header>
    );
}