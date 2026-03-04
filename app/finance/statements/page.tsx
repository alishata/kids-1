'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  FileText,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const expenseData = [
  { name: 'رواتب', value: 4500, color: '#0ea5e9' },
  { name: 'إيجار', value: 1200, color: '#6366f1' },
  { name: 'مرافق', value: 350, color: '#f59e0b' },
  { name: 'مشتريات', value: 800, color: '#ec4899' },
  { name: 'صيانة', value: 250, color: '#10b981' },
];

const cashFlowData = [
  { month: 'يناير', income: 6500, expense: 5200 },
  { month: 'فبراير', income: 7200, expense: 5400 },
  { month: 'مارس', income: 6800, expense: 5100 },
  { month: 'أبريل', income: 8100, expense: 5800 },
  { month: 'مايو', income: 7900, expense: 5600 },
  { month: 'يونيو', income: 9200, expense: 6100 },
];

const ReportCard = ({ title, value, trend, type }: any) => (
  <div className="glass p-6 rounded-3xl flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <div className={`p-2 rounded-lg ${type === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
        {type === 'up' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
      </div>
    </div>
    <h3 className="text-2xl font-black">{value} <span className="text-sm font-normal opacity-60">د.ك</span></h3>
    <div className="flex items-center gap-2 text-xs">
      <span className={type === 'up' ? 'text-emerald-500' : 'text-rose-500'}>{trend}</span>
      <span className="text-slate-500">مقارنة بالشهر السابق</span>
    </div>
  </div>
);

export default function FinancialStatementsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">التقارير والقوائم المالية</h1>
            <p className="text-slate-400 mt-1">تحليل شامل للأداء المالي والتدفقات النقدية</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-slate-800 transition-all">
              <Calendar size={20} />
              الربع الثاني ٢٠٢٦
            </button>
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
              <Download size={20} />
              تحميل التقرير السنوي
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReportCard title="صافي الربح" value="٣,١٠٠" trend="+١٥٪" type="up" />
          <ReportCard title="إجمالي الإيرادات" value="٩,٢٠٠" trend="+٨٪" type="up" />
          <ReportCard title="إجمالي المصروفات" value="٦,١٠٠" trend="+٢٪" type="down" />
          <ReportCard title="متوسط الدخل لكل طفل" value="٧٤.٢" trend="+٥٪" type="up" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cash Flow Chart */}
          <div className="lg:col-span-2 glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">التدفق النقدي (إيرادات vs مصروفات)</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                  <span className="text-xs text-slate-400">الإيرادات</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="text-xs text-slate-400">المصروفات</span>
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area type="monotone" dataKey="income" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                    <Area type="monotone" dataKey="expense" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Expense Distribution */}
          <div className="glass p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-8">توزيع المصروفات</h3>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="mt-6 space-y-4">
              {expenseData.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold">{item.value} د.ك</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Statements List */}
        <div className="glass rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
            <h3 className="text-lg font-bold">القوائم المالية الجاهزة</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {[
              { title: 'قائمة الدخل - الربع الأول ٢٠٢٦', date: 'تم التوليد في ٢ أبريل ٢٠٢٦' },
              { title: 'كشف التدفقات النقدية - مارس ٢٠٢٦', date: 'تم التوليد في ١ أبريل ٢٠٢٦' },
              { title: 'تقرير المصروفات التشغيلية - ٢٠٢٥', date: 'تم التوليد في ٥ يناير ٢٠٢٦' },
              { title: 'ميزانية الحضانة العمومية - ٢٠٢٥', date: 'تم التوليد في ١ يناير ٢٠٢٦' },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-sky-500/50 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{report.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">{report.date}</p>
                  </div>
                </div>
                <Download size={18} className="text-slate-500 group-hover:text-sky-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
