'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { UserPlus, Camera, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function AddKidPage() {
  const [classes, setClasses] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/classes')
      .then(res => res.json())
      .then(data => setClasses(data));
  }, []);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">إضافة طفل جديد</h1>
            <p className="text-slate-400 mt-1">قم بتعبئة البيانات الأساسية لتسجيل طفل جديد في الحضانة</p>
          </div>
          <Link href="/kids">
            <button className="p-2.5 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <p className="text-xs text-slate-500 mt-1">يفضل أن تكون الصورة واضحة وبخلفية فاتحة</p>
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
                  <input type="text" className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" placeholder="أدخل الاسم الثلاثي" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">تاريخ الميلاد</label>
                  <input type="date" className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">الجنس</label>
                  <select className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20">
                    <option>ذكر</option>
                    <option>أنثى</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">الفصل الدراسي</label>
                  <select className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20">
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
                  <input type="text" className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" placeholder="اسم الأب أو الأم" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">رقم الهاتف</label>
                  <input type="tel" className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" placeholder="965XXXXXXXX" />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Link href="/kids">
                  <button className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-900 transition-all">إلغاء</button>
                </Link>
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
                  <Save size={20} />
                  حفظ البيانات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
