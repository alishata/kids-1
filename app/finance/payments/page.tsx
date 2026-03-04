'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { 
  Wallet, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Plus
} from 'lucide-react';
import Link from 'next/link';

const PaymentRow = ({ payment }: { payment: any }) => (
  <div className="glass p-4 rounded-2xl flex items-center justify-between group hover:border-sky-500/30 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-sky-500">
        <Wallet size={20} />
      </div>
      <div>
        <h4 className="font-bold text-sm">{payment.kidName}</h4>
        <p className="text-[10px] text-slate-500">{payment.parentName} • {payment.type}</p>
      </div>
    </div>

    <div className="flex items-center gap-8">
      <div className="text-left hidden md:block min-w-[100px]">
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">التاريخ</p>
        <p className="text-xs font-bold text-slate-300">{new Date(payment.date).toLocaleDateString('ar-KW')}</p>
      </div>
      
      <div className="text-left min-w-[80px]">
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">المبلغ</p>
        <p className="text-sm font-black text-sky-500">{payment.amount} د.ك</p>
      </div>

      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
        payment.status === 'مدفوع' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
      }`}>
        {payment.status}
      </div>
    </div>
  </div>
);

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/payments')
      .then(res => res.json())
      .then(data => {
        setPayments(data);
        setLoading(false);
      });
  }, []);

  const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">تتبع الرسوم والمدفوعات</h1>
            <p className="text-slate-400 mt-1">إدارة وتحصيل الرسوم الدراسية للأطفال</p>
          </div>
          <div className="flex gap-3">
            <Link href="/finance/payments/add">
              <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
                <Plus size={20} />
                إضافة عملية مالية
              </button>
            </Link>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95">
              <Download size={20} />
              تصدير تقرير
            </button>
          </div>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-3xl border-r-4 border-emerald-500">
            <p className="text-xs text-slate-500 font-bold mb-1">إجمالي المحصل</p>
            <h4 className="text-2xl font-black text-emerald-500">{totalPaid} د.ك</h4>
          </div>
          <div className="glass p-6 rounded-3xl border-r-4 border-amber-500">
            <p className="text-xs text-slate-500 font-bold mb-1">دفعات معلقة</p>
            <h4 className="text-2xl font-black text-amber-500">٤٥٠ د.ك</h4>
          </div>
          <div className="glass p-6 rounded-3xl border-r-4 border-rose-500">
            <p className="text-xs text-slate-500 font-bold mb-1">متأخرات</p>
            <h4 className="text-2xl font-black text-rose-500">١٢٠ د.ك</h4>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن دفعة باسم الطفل..." 
              className="w-full bg-slate-900/50 border-slate-800 rounded-xl pr-12 pl-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 outline-none"
            />
          </div>
          <button className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-colors">
            <Filter size={20} />
          </button>
        </div>

        {/* Payments List */}
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
            </div>
          ) : (
            payments.length > 0 ? (
              payments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} />
              ))
            ) : (
              <div className="text-center py-20 glass rounded-3xl">
                <p className="text-slate-500">لا توجد عمليات مالية مسجلة حالياً</p>
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}
