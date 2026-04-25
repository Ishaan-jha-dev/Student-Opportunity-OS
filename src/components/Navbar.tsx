'use client';

import Link from 'next/link';
import { Compass, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FFEB3B]/90 backdrop-blur-xl border-b-[3px] border-[#111111] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#111111] rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Compass className="text-[#FFEB3B]" size={24} strokeWidth={3} />
            </div>
            <span className="text-2xl font-black text-[#111111] tracking-tight uppercase">
              Opportunity OS
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
