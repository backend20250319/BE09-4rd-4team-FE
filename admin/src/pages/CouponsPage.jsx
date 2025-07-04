import React, { useState } from 'react';
import NewCouponModal from '../components/NewCouponModal';
import { PlusIcon, TrashIcon } from 'lucide-react';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: 1, name: 'WELCOME10', discount: 10, validUntil: '2025-12-31' },
    { id: 2, name: 'SPRING20', discount: 20, validUntil: '2025-06-30' },
    { id: 3, name: 'SUMMER15', discount: 15, validUntil: '2025-08-31' },
     
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = coupon => {
    const nextId = coupons.length ? Math.max(...coupons.map(c => c.id)) + 1 : 1;
    setCoupons(prev => [...prev, { id: nextId, ...coupon }]);
    setShowModal(false);
  };
  const handleDelete = id => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">쿠폰 관리</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#9BCC47] text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon size={16} className="mr-1" />쿠폰 등록
        </button>
      </div>
      <div className="bg-white border rounded shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 uppercase bg-gray-50">
              <th className="px-4 py-2">쿠폰명</th>
              <th className="px-4 py-2">할인율(%)</th>
              <th className="px-4 py-2">유효기간</th>
              <th className="px-4 py-2">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {coupons.map(c => (
              <tr key={c.id}>
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.discount}</td>
                <td className="px-4 py-2">{c.validUntil}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800">
                    <TrashIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <NewCouponModal onAdd={handleAdd} onClose={() => setShowModal(false)} />}
    </div>
);
}

