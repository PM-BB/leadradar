import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-sm font-black text-white shadow-soft">
            LR
          </span>
          LeadRadar
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <Link href="/results?query=32%20ft%20truck%20Kolkata&freshness=7d" className="hover:text-slate-900">Results</Link>
          <Link href="/saved" className="hover:text-slate-900">Saved Leads</Link>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
        </nav>

        <Link href="/results?query=32%20ft%20container%20truck%20required&freshness=7d" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
          View Demo
        </Link>
      </div>
    </header>
  );
}
