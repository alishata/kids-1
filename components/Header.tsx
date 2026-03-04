'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 border-b border-slate-800/50 px-8 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="البحث عن طفل، ولي أمر، أو فاتورة..." 
            className="w-full bg-slate-900/50 border-slate-800 rounded-xl pr-12 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900"></span>
        </button>
        <div className="h-10 w-[1px] bg-slate-800 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold">أحمد الكويتي</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-right">مدير النظام</p>
          </div>
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Admin" 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-800"
          />
        </div>
      </div>
    </header>
  );
}
