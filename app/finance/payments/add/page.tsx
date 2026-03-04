'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { Save, X, Wallet, User, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddPaymentPage() {
  const router = useRouter();
  const [kids, setKids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    kidId: '',
    amount: 0,
    type: 'رسوم اشتراك',
    method: 'نقدي',
    status: 'مدفوع'
  });

  useEffect(() => {
    fetch('/api/kids')
      .then(res => res.json())
      .then(data => {
        setKids(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, kidId: data[0].id }));
        }
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const selectedKid = kids.find(k => k.id === formData.kidId);

    try {
      // 1. Save Payment
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          kidName: selectedKid?.name,
          parentName: selectedKid?.parentName,
        }),
      });

      if (!res.ok) throw new Error('Failed to save payment');

      // 2. Update Kid's paidAmount and remainingBalance
      if (selectedKid) {
        const newPaidAmount = (selectedKid.paidAmount || 0) + formData.amount;
        const newRemainingBalance = (selectedKid.totalFee || 0) - newPaidAmount;
        
        await fetch(`/api/kids/${selectedKid.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...selectedKid,
            paidAmount: newPaidAmount,
            remainingBalance: newRemainingBalance
          }),
        });
      }

      router.push('/finance/payments');
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء حفظ العملية');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">إضافة عملية مالية</h1>
            <p className="text-slate-400 mt-1">تسجيل دفعة جديدة أو رسوم إضافية</p>
          </div>
          <Link href="/finance/payments">
            <button className="p-2.5 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <User size={16} />
                اختيار الطفل
              </label>
              <select 
                required
                value={formData.kidId}
                onChange={(e) => setFormData({...formData, kidId: e.target.value})}
                className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                {kids.map(kid => (
                  <option key={kid.id} value={kid.id}>{kid.name} (المتبقي: {kid.remainingBalance} د.ك)</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Wallet size={16} />
                  المبلغ (د.ك)
                </label>
                <input 
                  required
                  type="number" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                  placeholder="0" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <CreditCard size={16} />
                  طريقة الدفع
                </label>
                <select 
                  value={formData.method}
                  onChange={(e) => setFormData({...formData, method: e.target.value})}
                  className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="نقدي">نقدي</option>
                  <option value="K-Net">K-Net</option>
                  <option value="تحويل بنكي">تحويل بنكي</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">نوع العملية</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                <option value="رسوم اشتراك">رسوم اشتراك</option>
                <option value="رسوم باص">رسوم باص</option>
                <option value="رسوم أنشطة">رسوم أنشطة</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Link href="/finance/payments">
              <button type="button" className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-900 transition-all">إلغاء</button>
            </Link>
            <button 
              disabled={saving}
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {saving ? 'جاري الحفظ...' : (
                <>
                  <Save size={20} />
                  تأكيد العملية
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
