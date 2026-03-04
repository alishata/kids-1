'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { Users, Plus, Search, Filter, MoreVertical, Mail, Phone, Wallet } from 'lucide-react';
import Link from 'next/link';

const KidCard = ({ kid }: { kid: any }) => (
  <div className="glass p-6 rounded-3xl flex flex-col gap-6 card-hover">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <img 
          src={`https://picsum.photos/seed/${kid.id}/200/200`} 
          alt={kid.name} 
          className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-900 shadow-xl" 
        />
        <div>
          <h3 className="font-bold text-lg">{kid.name}</h3>
          <p className="text-xs text-slate-500">{kid.class} • {kid.subscriptionType}</p>
        </div>
      </div>
      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
        <MoreVertical size={20} />
      </button>
    </div>

    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm text-slate-400">
        <Users size={16} />
        <span>{kid.parentName}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-slate-400">
        <Phone size={16} />
        <span dir="ltr">{kid.phone}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Wallet size={14} />
          <span>المتبقي:</span>
        </div>
        <span className={`text-sm font-bold ${kid.remainingBalance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
          {kid.remainingBalance} د.ك
        </span>
      </div>
    </div>

    <div className="flex gap-3 mt-2">
      <button className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold transition-all">الملف الشخصي</button>
      <button className="flex-1 py-2.5 rounded-xl bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white text-xs font-bold transition-all">تعديل</button>
    </div>
  </div>
);

export default function KidsPage() {
  const [kids, setKids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/kids')
      .then(res => res.json())
      .then(data => {
        setKids(data);
        setLoading(false);
      });
  }, []);

  const filteredKids = kids.filter(kid => 
    kid.name.includes(searchTerm) || kid.phone.includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">قائمة الأطفال</h1>
            <p className="text-slate-400 mt-1">إدارة بيانات الأطفال والاشتراكات المالية</p>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث بالاسم أو رقم الهاتف..." 
              className="w-full bg-slate-900/50 border-slate-800 rounded-xl pr-12 pl-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 outline-none"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-900 border-slate-800 text-sm rounded-xl px-6 py-3 outline-none focus:ring-2 focus:ring-sky-500/20">
              <option>جميع الفصول</option>
            </select>
            <button className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Kids Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKids.length > 0 ? (
              filteredKids.map((kid) => (
                <KidCard key={kid.id} kid={kid} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 glass rounded-3xl">
                <p className="text-slate-500">لا يوجد أطفال مسجلين حالياً</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
