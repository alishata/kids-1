'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  Save, 
  X,
  School
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClassesManagementPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', capacity: '', teacher: '' });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/classes');
      const data = await res.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingClass ? `/api/classes/${editingClass.id}` : '/api/classes';
    const method = editingClass ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchClasses();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving class:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الفصل؟')) return;
    try {
      const res = await fetch(`/api/classes/${id}`, { method: 'DELETE' });
      if (res.ok) fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const openModal = (cls: any = null) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({ name: cls.name, capacity: cls.capacity, teacher: cls.teacher });
    } else {
      setEditingClass(null);
      setFormData({ name: '', capacity: '', teacher: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClass(null);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">إدارة الفصول الدراسية</h1>
            <p className="text-slate-400 mt-1">إضافة وتعديل بيانات الفصول والمعلمين</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95"
          >
            <Plus size={20} />
            إضافة فصل جديد
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <motion.div 
                key={cls.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-6 rounded-3xl flex flex-col gap-6 card-hover"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl">
                    <School size={24} />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openModal(cls)}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cls.id)}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold">{cls.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
                    <Users size={14} />
                    <span>السعة: {cls.capacity} طفل</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <span className="font-bold text-sky-500/80">المعلم:</span>
                    <span>{cls.teacher}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass max-w-md w-full p-8 rounded-3xl shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{editingClass ? 'تعديل الفصل' : 'إضافة فصل جديد'}</h3>
                  <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">اسم الفصل</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                      placeholder="مثال: فصل النجوم"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">اسم المعلم</label>
                    <input 
                      required
                      type="text" 
                      value={formData.teacher}
                      onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                      className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                      placeholder="اسم المعلم المسؤول"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">السعة الاستيعابية</label>
                    <input 
                      required
                      type="number" 
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20" 
                      placeholder="عدد الأطفال الأقصى"
                    />
                  </div>

                  <button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
                    <Save size={20} />
                    {editingClass ? 'تحديث البيانات' : 'حفظ الفصل'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
