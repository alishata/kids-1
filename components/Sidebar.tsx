'use client';

import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  Wallet, 
  TrendingUp, 
  LayoutDashboard,
  Settings,
  LogOut,
  Cake
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarItem = ({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active: boolean }) => (
  <Link href={href}>
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-l border-slate-800/50 p-6 flex flex-col gap-8 hidden lg:flex h-screen sticky top-0">
      <Link href="/">
        <div className="flex items-center gap-3 px-2 cursor-pointer">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <Users size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">كويت كيدز</h1>
        </div>
      </Link>

      <nav className="flex flex-col gap-2">
        <SidebarItem icon={LayoutDashboard} label="لوحة التحكم" href="/" active={pathname === '/'} />
        <SidebarItem icon={Users} label="قائمة الأطفال" href="/kids" active={pathname.startsWith('/kids')} />
        <SidebarItem icon={CalendarCheck} label="الحضور والغياب" href="/attendance" active={pathname === '/attendance'} />
        <SidebarItem icon={Wallet} label="المالية" href="/finance" active={pathname === '/finance'} />
        <SidebarItem icon={TrendingUp} label="التقارير" href="/reports" active={pathname === '/reports'} />
        <SidebarItem icon={Settings} label="الإعدادات" href="/settings" active={pathname === '/settings'} />
      </nav>

      <div className="mt-auto">
        <div className="glass p-4 rounded-2xl mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
              <Cake size={16} className="text-pink-500" />
            </div>
            <p className="text-xs font-bold">أعياد ميلاد اليوم</p>
          </div>
          <p className="text-xs text-slate-400">يوجد طفل واحد يحتفل بعيد ميلاده اليوم!</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all">
          <LogOut size={20} />
          <span className="font-medium">تسجيل الخروج</span>
        </div>
      </div>
    </aside>
  );
}
