'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Download, 
  FileText, 
  PieChart as PieChartIcon,
  BarChart3,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from 'recharts';

const classDistribution = [
  { name: 'فصل النجوم', value: 35, color: '#0ea5e9' },
  { name: 'فصل الزهور', value: 30, color: '#6366f1' },
  { name: 'فصل العصافير', value: 25, color: '#f59e0b' },
  { name: 'فصل الفراشات', value: 34, color: '#ec4899' },
];

const growthData = [
  { month: 'يناير', kids: 105 },
  { month: 'فبراير', kids: 112 },
  { month: 'مارس', kids: 124 },
  { month: 'أبريل', kids: 130 },
  { month: 'مايو', kids: 145 },
];

const ReportCard = ({ title, icon: Icon, color }: { title: string, icon: any, color: string }) => (
  <div className="glass p-6 rounded-3xl group hover:border-sky-500/50 transition-all cursor-pointer">
    <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 text-${color}-500 flex items-center justify-center mb-4 group-hover:bg-${color}-500 group-hover:text-white transition-all`}>
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-xs text-slate-500">توليد تقرير شامل ومفصل بصيغة PDF</p>
    <button className="mt-6 flex items-center gap-2 text-sky-500 text-xs font-bold">
      <Download size={14} />
      تحميل التقرير
    </button>
  </div>
);

export default function ReportsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">التقارير والإحصائيات</h1>
            <p className="text-slate-400 mt-1">تحليل شامل لأداء الحضانة ونمو عدد الأطفال</p>
          </div>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
            <Download size={20} />
            تصدير جميع البيانات
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Growth Chart */}
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">نمو عدد الأطفال المسجلين</h3>
              <div className="p-2 bg-sky-500/10 text-sky-500 rounded-lg">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Line type="monotone" dataKey="kids" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 6, fill: '#0ea5e9', strokeWidth: 2, stroke: '#0f172a' }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">توزيع الأطفال حسب الفصول</h3>
              <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                <PieChartIcon size={18} />
              </div>
            </div>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={classDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {classDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {classDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] text-slate-400 font-bold">{item.name}: {item.value} طفل</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReportCard title="تقرير الحضور الشهري" icon={Calendar} color="sky" />
          <ReportCard title="تقرير الأداء الأكاديمي" icon={FileText} color="indigo" />
          <ReportCard title="تقرير الصحة والتغذية" icon={Activity} color="emerald" />
          <ReportCard title="تقرير سلوك الأطفال" icon={BarChart3} color="amber" />
        </div>
      </div>
    </MainLayout>
  );
}
