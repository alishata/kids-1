'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { Settings, Bell, Shield, Globe, Palette, Save, User } from 'lucide-react';
import Link from 'next/link';

const SettingSection = ({ icon: Icon, title, description, children }: { icon: any, title: string, description: string, children: React.ReactNode }) => (
  <div className="glass p-8 rounded-3xl space-y-6">
    <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
      <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const Toggle = ({ label, enabled }: { label: string, enabled?: boolean }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm font-medium text-slate-300">{label}</span>
    <button className={`w-12 h-6 rounded-full transition-all relative ${enabled ? 'bg-sky-500' : 'bg-slate-800'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'left-1' : 'left-7'}`} />
    </button>
  </div>
);

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">إعدادات النظام</h1>
            <p className="text-slate-400 mt-1">إدارة الحساب، التنبيهات، وخصوصية التطبيق</p>
          </div>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
            <Save size={20} />
            حفظ التغييرات
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <SettingSection icon={User} title="الملف الشخصي" description="تعديل بيانات مدير النظام والحضانة">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">اسم الحضانة</label>
                <input type="text" className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" defaultValue="حضانة كويت كيدز النموذجية" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">البريد الإلكتروني</label>
                <input type="email" className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" defaultValue="admin@kuwaitkids.com" />
              </div>
            </div>
          </SettingSection>

          <SettingSection icon={Shield} title="الأمان والخصوصية" description="إدارة كلمة المرور وقفل التطبيق">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-sm font-medium text-slate-300">قفل التطبيق برقم سري (PIN)</span>
                  <p className="text-xs text-slate-500">تفعيل شاشة القفل عند فتح التطبيق</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-sky-500 relative">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
              <div className="space-y-2 max-w-xs">
                <label className="text-sm font-medium text-slate-400">تغيير الرقم السري</label>
                <input type="password" className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" placeholder="****" />
              </div>
            </div>
          </SettingSection>

          <SettingSection icon={Globe} title="إدارة الفصول" description="إضافة وتعديل بيانات الفصول الدراسية">
            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-sm font-medium text-slate-300">تعديل الفصول والمعلمين</span>
                <p className="text-xs text-slate-500">إدارة السعة الاستيعابية وتوزيع المعلمين</p>
              </div>
              <Link href="/settings/classes">
                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold transition-all">
                  إدارة الفصول
                </button>
              </Link>
            </div>
          </SettingSection>

          <SettingSection icon={Bell} title="التنبيهات" description="التحكم في كيفية وصول الإشعارات إليك">
            <Toggle label="تنبيهات الحضور والغياب" enabled />
            <Toggle label="تنبيهات المدفوعات المتأخرة" enabled />
            <Toggle label="تنبيهات أعياد الميلاد" enabled />
            <Toggle label="رسائل أولياء الأمور" />
          </SettingSection>

          <SettingSection icon={Palette} title="المظهر" description="تخصيص ألوان وشكل الواجهة">
            <div className="flex gap-4">
              <div className="flex-1 p-4 rounded-2xl border-2 border-sky-500 bg-slate-900 flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-full h-12 bg-slate-950 rounded-lg border border-slate-800" />
                <span className="text-xs font-bold">الوضع الليلي</span>
              </div>
              <div className="flex-1 p-4 rounded-2xl border-2 border-transparent bg-slate-100 flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-full h-12 bg-white rounded-lg border border-slate-200" />
                <span className="text-xs font-bold text-slate-900">الوضع الفاتح</span>
              </div>
            </div>
          </SettingSection>
        </div>
      </div>
    </MainLayout>
  );
}
