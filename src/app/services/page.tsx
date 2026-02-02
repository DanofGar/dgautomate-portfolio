import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Back link */}
        <div className="mb-12">
          <Link
            href="/"
            className={cn(
              'inline-flex items-center gap-2',
              'text-foreground/60 hover:text-foreground',
              'transition-colors duration-200',
              'text-sm font-medium'
            )}
          >
            ← Back to journey
          </Link>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">Services</h1>

          <p className="text-2xl text-foreground/60 font-medium">Coming soon</p>

          <div className="pt-8 border-t border-foreground/10 max-w-md mx-auto">
            <p className="text-foreground/70 mb-6">
              For business inquiries, reach out directly:
            </p>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:Dnlg2400@gmail.com"
                className={cn(
                  'block p-4 rounded-soft',
                  'bg-foreground/5 hover:bg-foreground/10',
                  'border border-foreground/10',
                  'transition-colors duration-200',
                  'text-foreground hover:text-foreground',
                  'font-medium'
                )}
              >
                <div className="text-sm text-foreground/60 mb-1">Email</div>
                <div>Dnlg2400@gmail.com</div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-sm text-foreground/40 pt-12">
          Prefer a more casual approach? There&apos;s a hidden path in the main journey...
        </p>
      </div>
    </main>
  );
}
