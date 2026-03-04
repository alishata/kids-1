'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { Wallet, ArrowUpRight, ArrowDownLeft, Filter, Download, Plus, CreditCard, TrendingUp, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TransactionItem = ({ name, date, amount, type }: { name: string, date: string, amount: string, type: 'in' | 'out' }) => (
  <div className="flex items-center justify-between p-4 border-b border-slate-800/50 last:border-0 hover:bg-slate-900/30 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl ${type === 'in' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
        {type === 'in' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
      </div>
      <div>
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
    </div>
    <div className="text-left">
      <p className={`font-bold ${type === 'in' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {type === 'in' ? '+' : '-'}{amount} د.ك
      </p>
    </div>
  </div>
);

export default function FinancePage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">الإدارة المالية</h1>
            <p className="text-slate-400 mt-1">تتبع الإيرادات والمصروفات والاشتراكات الشهرية</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-slate-800 transition-all">
              <Download size={20} />
              تصدير كشف
            </button>
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
              <Plus size={20} />
              إضافة عملية
            </button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-sky-500 to-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-sky-500/20">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-white/20 rounded-xl">
                <Wallet size={24} />
              </div>
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">الرصيد الكلي</span>
            </div>
            <p className="text-sm opacity-80">إجمالي المتوفر في الحساب</p>
            <h2 className="text-3xl font-black mt-1">12,450.00 <span className="text-lg">د.ك</span></h2>
          </div>

          <div className="glass p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                <ArrowDownLeft size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-500">إيرادات الشهر</span>
            </div>
            <p className="text-sm text-slate-400">إجمالي المدفوعات المستلمة</p>
            <h2 className="text-3xl font-black mt-1 text-white">4,250.00 <span className="text-lg">د.ك</span></h2>
          </div>

          <div className="glass p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
                <ArrowUpRight size={24} />
              </div>
              <span className="text-xs font-bold text-rose-500">مصروفات الشهر</span>
            </div>
            <p className="text-sm text-slate-400">إجمالي الرواتب والمشتريات</p>
            <h2 className="text-3xl font-black mt-1 text-white">1,120.00 <span className="text-lg">د.ك</span></h2>
          </div>
        </div>

        {/* Navigation Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/finance/payments">
            <div className="glass p-8 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-sky-500/50 transition-all">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-sky-500/10 text-sky-500 rounded-2xl group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <CreditCard size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">تتبع الرسوم والمدفوعات</h3>
                  <p className="text-slate-400 text-sm mt-1">إدارة تحصيل الرسوم الدراسية لكل طفل</p>
                </div>
              </div>
              <ChevronLeft size={24} className="text-slate-700 group-hover:text-sky-500 transition-colors" />
            </div>
          </Link>

          <Link href="/finance/statements">
            <div className="glass p-8 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">التقارير والقوائم المالية</h3>
                  <p className="text-slate-400 text-sm mt-1">تحليل الأداء المالي والتدفق النقدي</p>
                </div>
              </div>
              <ChevronLeft size={24} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
            </div>
          </Link>
        </div>

        {/* Transactions Table */}
        <div className="glass rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
            <h3 className="text-lg font-bold">آخر العمليات المالية</h3>
            <button className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Filter size={18} />
            </button>
          </div>
          <div className="flex flex-col">
            <TransactionItem name="رسوم اشتراك - فهد جاسم" date="٣ مارس ٢٠٢٦" amount="150.00" type="in" />
            <TransactionItem name="فاتورة كهرباء ومياه" date="٢ مارس ٢٠٢٦" amount="85.00" type="out" />
            <TransactionItem name="رسوم اشتراك - نورة الصباح" date="١ مارس ٢٠٢٦" amount="150.00" type="in" />
            <TransactionItem name="شراء مستلزمات قرطاسية" date="٢٨ فبراير ٢٠٢٦" amount="42.00" type="out" />
            <TransactionItem name="رسوم اشتراك - سلمان العتيبي" date="٢٧ فبراير ٢٠٢٦" amount="150.00" type="in" />
            <TransactionItem name="رواتب الموظفين - فبراير" date="٢٥ فبراير ٢٠٢٦" amount="850.00" type="out" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
