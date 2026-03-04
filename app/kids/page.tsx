'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { Users, Plus, Search, Filter, MoreVertical, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const KidCard = ({ name, age, class: className, parent, phone, image, status }: { name: string, age: string, class: string, parent: string, phone: string, image: string, status: string }) => (
  <div className="glass p-6 rounded-3xl flex flex-col gap-6 card-hover">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-900 shadow-xl" />
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-xs text-slate-500">{className} • {age}</p>
        </div>
      </div>
      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
        <MoreVertical size={20} />
      </button>
    </div>

    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm text-slate-400">
        <Mail size={16} />
        <span>{parent}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-slate-400">
        <Phone size={16} />
        <span dir="ltr">{phone}</span>
      </div>
    </div>

    <div className="flex gap-3 mt-2">
      <button className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold transition-all">الملف الشخصي</button>
      <button className="flex-1 py-2.5 rounded-xl bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white text-xs font-bold transition-all">تعديل</button>
    </div>
  </div>
);

export default function KidsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">قائمة الأطفال</h1>
            <p className="text-slate-400 mt-1">إدارة بيانات الأطفال المسجلين في الحضانة</p>
          </div>
          <Link href="/kids/add">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
              <Plus size={20} />
              إضافة طفل جديد
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="البحث بالاسم أو رقم الهاتف..." 
              className="w-full bg-slate-900/50 border-slate-800 rounded-xl pr-12 pl-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 outline-none"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-900 border-slate-800 text-sm rounded-xl px-6 py-3 outline-none focus:ring-2 focus:ring-sky-500/20">
              <option>جميع الفصول</option>
              <option>فصل النجوم</option>
              <option>فصل الزهور</option>
              <option>فصل العصافير</option>
            </select>
            <button className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Kids Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KidCard name="فهد جاسم" age="3 سنوات" class="فصل النجوم" parent="جاسم محمد" phone="+965 99887766" image="https://picsum.photos/seed/kid1/200/200" status="نشط" />
          <KidCard name="نورة الصباح" age="4 سنوات" class="فصل الزهور" parent="سارة العلي" phone="+965 66554433" image="https://picsum.photos/seed/kid2/200/200" status="نشط" />
          <KidCard name="سلمان العتيبي" age="2 سنة" class="فصل العصافير" parent="خالد العتيبي" phone="+965 55443322" image="https://picsum.photos/seed/kid3/200/200" status="نشط" />
          <KidCard name="دلال المطيري" age="5 سنوات" class="فصل الفراشات" parent="فاطمة المطيري" phone="+965 44332211" image="https://picsum.photos/seed/kid4/200/200" status="نشط" />
          <KidCard name="يوسف الكويتي" age="3 سنوات" class="فصل النجوم" parent="محمد الكويتي" phone="+965 33221100" image="https://picsum.photos/seed/kid5/200/200" status="نشط" />
          <KidCard name="مريم العنزي" age="4 سنوات" class="فصل الزهور" parent="أمل العنزي" phone="+965 22110099" image="https://picsum.photos/seed/kid6/200/200" status="نشط" />
        </div>
      </div>
    </MainLayout>
  );
}
