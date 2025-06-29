import React, { useState } from 'react';



export default function NewProductModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name,
      category,
      stock: Number(stock),
      price: `₩ ${price.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold">신규 상품 등록</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="상품명"
            className="w-full p-2 border rounded"
            required
          />
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            type="text"
            placeholder="카테고리"
            className="w-full p-2 border rounded"
            required
          />
          <input
            value={stock}
            onChange={e => setStock(e.target.value)}
            type="number"
            placeholder="재고 수량"
            className="w-full p-2 border rounded"
            required
          />
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="text"
            placeholder="가격 (숫자만 입력)"
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">상태</option>
            <option value="판매중">판매중</option>
            <option value="품절임박">품절임박</option>
            <option value="품절">품절</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#9BCC47] text-white rounded"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
