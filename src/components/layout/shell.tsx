import { Navbar } from '@/components/stitch/Navbar';
import { Footer } from '@/components/stitch/Footer';

export function Shell({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background min-h-screen text-foreground flex flex-col font-display transition-colors duration-300">
            <Navbar />
            <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                {children}
            </main>
            <Footer />
        </div>
    );
}
