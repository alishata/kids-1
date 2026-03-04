'use client';

import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  Wallet, 
  TrendingUp, 
  Plus, 
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';

// Mock Data
const attendanceData = [
  { name: 'الأحد', present: 45, absent: 5 },
  { name: 'الاثنين', present: 48, absent: 2 },
  { name: 'الثلاثاء', present: 42, absent: 8 },
  { name: 'الأربعاء', present: 46, absent: 4 },
  { name: 'الخميس', present: 40, absent: 10 },
];

const revenueData = [
  { month: 'يناير', amount: 4500 },
  { month: 'فبراير', amount: 5200 },
  { month: 'مارس', amount: 4800 },
  { month: 'أبريل', amount: 6100 },
  { month: 'مايو', amount: 5900 },
];

const StatCard = ({ label, value, subValue, icon: Icon, color }: { label: string, value: string, subValue: string, icon: any, color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass p-5 rounded-2xl flex flex-col gap-4 card-hover"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500`}>
        <Icon size={24} />
      </div>
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
      <p className={`text-xs mt-1 ${subValue.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
        {subValue} <span className="text-slate-500">منذ الأسبوع الماضي</span>
      </p>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">مرحباً بك مجدداً 👋</h2>
            <p className="text-slate-400 mt-1 font-medium">إليك ما يحدث في حضانتك اليوم، الثلاثاء ٣ مارس ٢٠٢٦</p>
          </div>
          <Link href="/kids/add">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
              <Plus size={20} />
              إضافة طفل جديد
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="إجمالي الأطفال" value="124" subValue="+12%" icon={Users} color="sky" />
          <StatCard label="الحضور اليوم" value="112" subValue="+5%" icon={CheckCircle2} color="emerald" />
          <StatCard label="الغياب اليوم" value="12" subValue="-2%" icon={XCircle} color="rose" />
          <StatCard label="الإيرادات المتوقعة" value="4,250 د.ك" subValue="+8%" icon={Wallet} color="amber" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">إحصائيات الحضور الأسبوعية</h3>
            </div>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Bar dataKey="present" name="حاضر" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" name="غائب" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">نمو الإيرادات</h3>
            </div>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
