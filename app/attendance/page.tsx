'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Users,
  Save
} from 'lucide-react';
import { motion } from 'framer-motion';

const AttendanceRow = ({ name, class: className, status, time, image }: any) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  return (
    <div className="glass p-4 rounded-2xl flex items-center justify-between group hover:border-sky-500/30 transition-all">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800" />
        <div>
          <h4 className="font-bold text-sm">{name}</h4>
          <p className="text-[10px] text-slate-500">{className}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => setCurrentStatus('present')}
          className={`p-2 rounded-xl transition-all ${currentStatus === 'present' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-500 hover:text-emerald-500'}`}
        >
          <CheckCircle2 size={20} />
        </button>
        <button 
          onClick={() => setCurrentStatus('absent')}
          className={`p-2 rounded-xl transition-all ${currentStatus === 'absent' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-900 text-slate-500 hover:text-rose-500'}`}
        >
          <XCircle size={20} />
        </button>
        <button 
          onClick={() => setCurrentStatus('late')}
          className={`p-2 rounded-xl transition-all ${currentStatus === 'late' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-500 hover:text-amber-500'}`}
        >
          <Clock size={20} />
        </button>
      </div>

      <div className="hidden md:block text-left min-w-[80px]">
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">وقت الوصول</p>
        <p className="text-xs font-bold text-slate-300">{time || '--:--'}</p>
      </div>
    </div>
  );
};

export default function AttendancePage() {
  const kids = [
    { name: 'فهد جاسم', class: 'فصل النجوم', status: 'present', time: '٠٧:٤٥ ص', image: 'https://picsum.photos/seed/kid1/100/100' },
    { name: 'نورة الصباح', class: 'فصل الزهور', status: 'absent', time: '', image: 'https://picsum.photos/seed/kid2/100/100' },
    { name: 'سلمان العتيبي', class: 'فصل العصافير', status: 'late', time: '٠٨:١٥ ص', image: 'https://picsum.photos/seed/kid3/100/100' },
    { name: 'دلال المطيري', class: 'فصل الفراشات', status: 'present', time: '٠٧:٣٠ ص', image: 'https://picsum.photos/seed/kid4/100/100' },
    { name: 'يوسف الكويتي', class: 'فصل النجوم', status: 'present', time: '٠٧:٥٠ ص', image: 'https://picsum.photos/seed/kid5/100/100' },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">الحضور والغياب</h1>
            <p className="text-slate-400 mt-1">تسجيل ومتابعة حضور الأطفال اليومي</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <CalendarIcon size={18} className="text-sky-500" />
              <span className="text-sm font-bold">الثلاثاء، ٣ مارس ٢٠٢٦</span>
            </div>
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
              <Save size={20} />
              حفظ الكشف النهائي
            </button>
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass p-4 rounded-2xl border-r-4 border-sky-500">
            <p className="text-xs text-slate-500 font-bold mb-1">الإجمالي</p>
            <h4 className="text-2xl font-bold">١٢٤ طفل</h4>
          </div>
          <div className="glass p-4 rounded-2xl border-r-4 border-emerald-500">
            <p className="text-xs text-emerald-500 font-bold mb-1">حاضر</p>
            <h4 className="text-2xl font-bold text-emerald-500">١١٢</h4>
          </div>
          <div className="glass p-4 rounded-2xl border-r-4 border-rose-500">
            <p className="text-xs text-rose-500 font-bold mb-1">غائب</p>
            <h4 className="text-2xl font-bold text-rose-500">٨</h4>
          </div>
          <div className="glass p-4 rounded-2xl border-r-4 border-amber-500">
            <p className="text-xs text-amber-500 font-bold mb-1">متأخر</p>
            <h4 className="text-2xl font-bold text-amber-500">٤</h4>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن طفل بالاسم..." 
              className="w-full bg-slate-900/50 border-slate-800 rounded-xl pr-12 pl-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 outline-none"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-900 border-slate-800 text-sm rounded-xl px-6 py-3 outline-none focus:ring-2 focus:ring-sky-500/20">
              <option>جميع الفصول</option>
              <option>فصل النجوم</option>
              <option>فصل الزهور</option>
            </select>
            <button className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Attendance List */}
        <div className="flex flex-col gap-3">
          {kids.map((kid, i) => (
            <AttendanceRow key={i} {...kid} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
