"use client";
import React, { useState } from 'react';
import { XIcon, UserIcon, MailIcon, PhoneIcon, CalendarIcon, CheckIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewUserModal({ onAdd, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', joinDate: '', status: '' });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          className="grid gap-4 p-6 bg-white shadow-xl rounded-2xl w-80"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserIcon size={24} className="text-[#9BCC47]" />
              <h3 className="text-xl font-bold text-gray-800">신규 회원 등록</h3>
            </div>
            <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <XIcon size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-1 mx-1 bg-gray-200 rounded">
                <motion.div
                  className="h-full rounded bg-[#9BCC47]"
                  initial={false}
                  animate={{ width: step >= i ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="space-y-3">
              <label className="flex items-center">
                <UserIcon size={18} className="mr-2 text-gray-500" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="회원명"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </label>
              <label className="flex items-center">
                <MailIcon size={18} className="mr-2 text-gray-500" />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="이메일"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <label className="flex items-center">
                <PhoneIcon size={18} className="mr-2 text-gray-500" />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="전화번호"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label className="flex items-center">
                <CalendarIcon size={18} className="mr-2 text-gray-500" />
                <input
                  name="joinDate"
                  value={form.joinDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <span>상태:</span>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-0"
                  required
                >
                  <option value="">선택</option>
                  <option value="활성">활성</option>
                  <option value="비활성">비활성</option>
                </select>
              </label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            {step > 1 ? (
              <button type="button" onClick={handleBack} className="px-4 py-2 border rounded-md">
                뒤로
              </button>
            ) : <div />}

            {step < 3 ? (
              <button type="button" onClick={handleNext} className="px-4 py-2 bg-[#9BCC47] text-white rounded-md">
                다음
              </button>
            ) : (
              <button type="submit" className="flex items-center px-4 py-2 bg-[#9BCC47] text-white rounded-md">
                <CheckIcon size={16} className="mr-1" /> 등록
              </button>
            )}
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}
