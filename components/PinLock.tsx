'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Delete, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PinLock({ children }: { children: React.ReactNode }) {
  const [pin, setPin] = useState('');
  const [isLocked, setIsLocked] = useState(true);
  const [error, setError] = useState(false);
  
  const CORRECT_PIN = '1234'; // Default PIN

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setIsLocked(false);
        } else {
          setError(true);
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  if (!isLocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 font-arabic" dir="rtl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xs w-full flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mb-8 text-sky-500">
          <Lock size={40} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">أهلاً بك في كويت كيدز</h1>
        <p className="text-slate-400 mb-8 text-center">الرجاء إدخال الرقم السري للوصول إلى النظام</p>

        {/* PIN Indicators */}
        <div className="flex gap-4 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                pin.length > i 
                  ? 'bg-sky-500 border-sky-500 scale-110' 
                  : error ? 'border-rose-500 bg-rose-500/20' : 'border-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-6 w-full">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="w-full aspect-square rounded-full bg-slate-900 hover:bg-slate-800 text-2xl font-bold flex items-center justify-center transition-all active:scale-90 border border-slate-800"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleNumberClick('0')}
            className="w-full aspect-square rounded-full bg-slate-900 hover:bg-slate-800 text-2xl font-bold flex items-center justify-center transition-all active:scale-90 border border-slate-800"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-full aspect-square rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"
          >
            <Delete size={28} />
          </button>
        </div>

        <p className="mt-12 text-xs text-slate-500">الرقم السري الافتراضي هو 1234</p>
      </motion.div>
    </div>
  );
}
