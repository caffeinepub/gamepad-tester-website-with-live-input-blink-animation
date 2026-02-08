import { Gamepad2 } from 'lucide-react';

interface SiteLayoutProps {
  children: React.ReactNode;
  currentView: 'tester' | 'about';
  onNavigate: (view: 'tester' | 'about') => void;
}

export default function SiteLayout({ children, currentView, onNavigate }: SiteLayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Gamepad2 className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">GamePad Tester</h1>
          </div>
          <nav className="flex gap-1">
            <button
              onClick={() => onNavigate('tester')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                currentView === 'tester'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              }`}
            >
              Tester
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                currentView === 'about'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              }`}
            >
              About
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {currentYear}. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            caffeine.ai
          </a>
          .
        </div>
      </footer>
    </div>
  );
}
