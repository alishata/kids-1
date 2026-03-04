'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { UserPlus, Camera, Save, X, Wallet, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddKidPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: 'ذكر',
    class: '',
    parentName: '',
    phone: '',
    subscriptionType: 'شهري',
    totalFee: 0,
    paidAmount: 0,
  });

  useEffect(() => {
    fetch('/api/classes')
      .then(res => res.json())
      .then(data => {
        setClasses(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, class: data[0].name }));
        }
      });
  }, []);

  const remainingBalance = formData.totalFee - formData.paidAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save Kid
      const kidRes = await fetch('/api/kids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          dob: formData.dob,
          gender: formData.gender,
          class: formData.class,
          parentName: formData.parentName,
          phone: formData.phone,
          subscriptionType: formData.subscriptionType,
          totalFee: formData.totalFee,
          paidAmount: formData.paidAmount,
          remainingBalance: remainingBalance,
          status: 'نشط'
        }),
      });

      if (!kidRes.ok) throw new Error('Failed to save kid');
      const kidData = await kidRes.json();

      // 2. Save Initial Payment if paidAmount > 0
      if (formData.paidAmount > 0) {
        await fetch('/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kidId: kidData.id,
            kidName: formData.name,
            parentName: formData.parentName,
            amount: formData.paidAmount,
            type: 'رسوم اشتراك',
            method: 'نقدي',
            status: 'مدفوع'
          }),
        });
      }

      router.push('/kids');
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">إضافة طفل جديد</h1>
            <p className="text-slate-400 mt-1">قم بتعبئة البيانات الأساسية والمالية لتسجيل طفل جديد</p>
          </div>
          <Link href="/kids">
            <button className="p-2.5 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo Upload */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-3xl flex flex-col items-center text-center gap-4">
              <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center border-2 border-dashed border-slate-700 text-slate-500 relative group cursor-pointer overflow-hidden">
                <Camera size={32} className="group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">تغيير الصورة</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold">صورة الطفل</h3>
                <p className="text-xs text-slate-500 mt-1">يفضل أن تكون الصورة واضحة</p>
              </div>
            </div>
            
            {/* Financial Summary Preview */}
            <div className="glass p-6 rounded-3xl mt-6 space-y-4">
              <h4 className="font-bold text-sm border-b border-slate-800 pb-2 flex items-center gap-2">
                <Wallet size={16} className="text-sky-500" />
                ملخص مالي سريع
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">إجمالي الرسوم:</span>
                <span className="font-bold">{formData.totalFee} د.ك</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">المبلغ المدفوع:</span>
                <span className="font-bold text-emerald-500">{formData.paidAmount} د.ك</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-800">
                <span className="text-slate-400">المبلغ المتبقي:</span>
                <span className={`font-bold ${remainingBalance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {remainingBalance} د.ك
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold border-b border-slate-800 pb-4">المعلومات الشخصية</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">اسم الطفل بالكامل</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                    placeholder="أدخل الاسم الثلاثي" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">تاريخ الميلاد</label>
                  <input 
                    required
                    type="date" 
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">الجنس</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">الفصل الدراسي</label>
                  <select 
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <h3 className="text-lg font-bold border-b border-slate-800 pb-4 pt-4">معلومات التواصل</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">اسم ولي الأمر</label>
                  <input 
                    required
                    type="text" 
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                    placeholder="اسم الأب أو الأم" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">رقم الهاتف</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                    placeholder="965XXXXXXXX" 
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold border-b border-slate-800 pb-4 pt-4 flex items-center gap-2">
                <CreditCard size={20} className="text-sky-500" />
                الاشتراك والبيانات المالية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">نوع الاشتراك</label>
                  <select 
                    value={formData.subscriptionType}
                    onChange={(e) => setFormData({...formData, subscriptionType: e.target.value})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="شهري">شهري</option>
                    <option value="فصلي">فصلي (3 شهور)</option>
                    <option value="سنوي">سنوي</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">إجمالي الرسوم (د.ك)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.totalFee}
                    onChange={(e) => setFormData({...formData, totalFee: Number(e.target.value)})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                    placeholder="0" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">المبلغ المدفوع حالياً (د.ك)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({...formData, paidAmount: Number(e.target.value)})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                    placeholder="0" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Link href="/kids">
                  <button type="button" className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-900 transition-all">إلغاء</button>
                </Link>
                <button 
                  disabled={loading}
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'جاري الحفظ...' : (
                    <>
                      <Save size={20} />
                      حفظ البيانات والاشتراك
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
