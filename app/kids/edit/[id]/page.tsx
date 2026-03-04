'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { Camera, Save, X, Wallet, CreditCard, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EditKidPage() {
  const router = useRouter();
  const params = useParams();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
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
    status: 'نشط'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesRes, kidRes] = await Promise.all([
          fetch('/api/classes'),
          fetch(`/api/kids/${params.id}`)
        ]);
        
        const classesData = await classesRes.json();
        const kidData = await kidRes.json();
        
        setClasses(classesData);
        setFormData(kidData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [params.id]);

  const remainingBalance = formData.totalFee - formData.paidAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/kids/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          remainingBalance: remainingBalance
        }),
      });

      if (!res.ok) throw new Error('Failed to update kid');
      router.push('/kids');
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء تحديث البيانات');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('هل أنت متأكد من حذف هذا الطفل؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    
    try {
      const res = await fetch(`/api/kids/${params.id}`, { method: 'DELETE' });
      if (res.ok) router.push('/kids');
    } catch (error) {
      alert('حدث خطأ أثناء الحذف');
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">تعديل بيانات الطفل</h1>
            <p className="text-slate-400 mt-1">تحديث المعلومات الشخصية والمالية لـ {formData.name}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleDelete}
              className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
              title="حذف الطفل"
            >
              <Trash2 size={24} />
            </button>
            <Link href="/kids">
              <button className="p-2.5 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-3xl flex flex-col items-center text-center gap-4">
              <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center border-2 border-dashed border-slate-700 text-slate-500 relative group cursor-pointer overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${params.id}/200/200`} 
                  alt="Kid" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold">صورة الطفل</h3>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold mt-2 inline-block ${
                  formData.status === 'نشط' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                }`}>
                  {formData.status}
                </span>
              </div>
            </div>
            
            <div className="glass p-6 rounded-3xl mt-6 space-y-4">
              <h4 className="font-bold text-sm border-b border-slate-800 pb-2 flex items-center gap-2">
                <Wallet size={16} className="text-sky-500" />
                الوضعية المالية
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
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold border-b border-slate-800 pb-4 pt-4 flex items-center gap-2">
                <CreditCard size={20} className="text-sky-500" />
                تحديث البيانات المالية
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
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">المبلغ المدفوع (د.ك)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({...formData, paidAmount: Number(e.target.value)})}
                    className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Link href="/kids">
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
                      تحديث البيانات
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
