'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  CreditCard,
  User,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentStatusBadge = ({ status }: { status: 'paid' | 'pending' | 'overdue' }) => {
  const styles = {
    paid: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    overdue: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };
  
  const labels = {
    paid: 'تم الدفع',
    pending: 'قيد الانتظار',
    overdue: 'متأخر',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const PaymentRow = ({ kid, parent, amount, date, status, method }: any) => (
  <tr className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors group">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
          <User size={16} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{kid}</p>
          <p className="text-[10px] text-slate-500">{parent}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center gap-2 text-slate-300 text-sm">
        <Calendar size={14} className="text-slate-500" />
        {date}
      </div>
    </td>
    <td className="py-4 px-4">
      <p className="text-sm font-bold text-white">{amount} د.ك</p>
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center gap-2 text-slate-400 text-xs">
        <CreditCard size={14} />
        {method}
      </div>
    </td>
    <td className="py-4 px-4">
      <PaymentStatusBadge status={status} />
    </td>
    <td className="py-4 px-4 text-left">
      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
        <MoreVertical size={16} />
      </button>
    </td>
  </tr>
);

export default function PaymentsTrackingPage() {
  const [filter, setFilter] = useState('all');

  const payments = [
    { kid: 'فهد جاسم', parent: 'جاسم محمد', amount: '150.00', date: '٠٣/٠٣/٢٠٢٦', status: 'paid', method: 'كي-نت' },
    { kid: 'نورة الصباح', parent: 'سارة العلي', amount: '150.00', date: '٠١/٠٣/٢٠٢٦', status: 'overdue', method: 'نقدي' },
    { kid: 'سلمان العتيبي', parent: 'خالد العتيبي', amount: '150.00', date: '٢٧/٠٢/٢٠٢٦', status: 'paid', method: 'تحويل بنكي' },
    { kid: 'دلال المطيري', parent: 'فاطمة المطيري', amount: '150.00', date: '٢٥/٠٢/٢٠٢٦', status: 'pending', method: 'كي-نت' },
    { kid: 'يوسف الكويتي', parent: 'محمد الكويتي', amount: '150.00', date: '٢٠/٠٢/٢٠٢٦', status: 'paid', method: 'نقدي' },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">تتبع الرسوم والمدفوعات</h1>
            <p className="text-slate-400 mt-1">إدارة وتحصيل الرسوم الدراسية لجميع الطلاب</p>
          </div>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
            <Download size={20} />
            تصدير تقرير المدفوعات
          </button>
        </div>

        {/* Summary Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">تم تحصيله</p>
              <h4 className="text-xl font-bold">٣,٤٥٠ د.ك</h4>
            </div>
          </div>
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">قيد الانتظار</p>
              <h4 className="text-xl font-bold">٨٥٠ د.ك</h4>
            </div>
          </div>
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">متأخرات</p>
              <h4 className="text-xl font-bold">٤٢٠ د.ك</h4>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="البحث باسم الطفل أو ولي الأمر..." 
              className="w-full bg-slate-900/50 border-slate-800 rounded-xl pr-12 pl-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 outline-none"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-900 border-slate-800 text-sm rounded-xl px-6 py-3 outline-none focus:ring-2 focus:ring-sky-500/20">
              <option>جميع الحالات</option>
              <option>تم الدفع</option>
              <option>قيد الانتظار</option>
              <option>متأخر</option>
            </select>
            <button className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="glass rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800">
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الطفل / ولي الأمر</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">تاريخ الاستحقاق</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">المبلغ</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">طريقة الدفع</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الحالة</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <PaymentRow key={i} {...p} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
