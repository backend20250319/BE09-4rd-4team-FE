import React, { useState } from 'react';
import { PlusIcon, SearchIcon, TrashIcon, DownloadIcon } from 'lucide-react';

export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([
    { id: 1, name: '아이오페 UV 쉴드', category: '선케어', stock: 123, price: '₩ 30,000', status: '판매중' },
    { id: 2, name: '이니스프리 그린티 세럼', category: '스킨케어', stock: 89, price: '₩ 30,000', status: '판매중' },
    { id: 3, name: '라네즈 워터 슬리핑 마스크', category: '스킨케어', stock: 64, price: '₩ 30,000', status: '판매중' },
    { id: 4, name: '에뛰드 드로잉 아이브로우', category: '메이크업', stock: 42, price: '₩ 15,000', status: '품절임박' },
    { id: 5, name: '미샤 타임 레볼루션 에센스', category: '스킨케어', stock: 78, price: '₩ 30,000', status: '판매중' },
    { id: 6, name: '토니모리 립톤 겟잇틴트', category: '메이크업', stock: 0, price: '₩ 12,000', status: '품절' },
    { id: 7, name: '스킨푸드 블랙슈가 마스크', category: '스킨케어', stock: 54, price: '₩ 18,000', status: '판매중' },
    { id: 8, name: '홀리카홀리카 하드커버 파운데이션', category: '메이크업', stock: 31, price: '₩ 25,000', status: '판매중' },
    { id: 9, name: '네이처리퍼블릭 알로에 젤', category: '스킨케어', stock: 102, price: '₩ 8,000', status: '판매중' },
    { id: 10, name: '더페이스샵 라이스 클렌징 오일', category: '클렌징', stock: 5, price: '₩ 20,000', status: '품절임박' }
  ]);

 

  function NewProductModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold">신규 상품 등록</h2>
        <form className="space-y-4">
          <input type="text" placeholder="상품명" className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="카테고리" className="w-full p-2 border border-gray-300 rounded" />
          <input type="number" placeholder="재고 수량" className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="가격 (₩)" className="w-full p-2 border border-gray-300 rounded" />
          <select className="w-full p-2 border border-gray-300 rounded"
          value = {statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}>
           <option value="">상태</option>
           <option value="판매중">판매중</option>
           <option value="품절임박">품절임박</option>
           <option value="품절">품절</option>
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded">
              취소
            </button>
            <button type="submit" className="px-4 py-2 bg-[#9BCC47] text-white rounded">
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



  // 필터링된 상품 목록
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

    // 페이지네이션
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
};

 const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    // 만약 삭제 후 페이지가 비면 이전 페이지로 이동:
    const maxPage = Math.ceil((products.length - 1) / itemsPerPage);
    if (currentPage > maxPage) setCurrentPage(maxPage);
  };


  const downloadCSV = () => {
    const headers = ['상품명', '카테고리', '재고', '가격', '상태'];
    const dataRows = products.map(product => [product.name, product.category, product.stock, product.price, product.status]);
    const csvContent = ['\uFEFF' + headers.join(','), ...dataRows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '올리브영_상품목록.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">상품 관리</h1>
        <div className="flex gap-2">
          <button onClick={downloadCSV} className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <DownloadIcon size={16} className="mr-1" />
            엑셀 다운로드
          </button>
          <button className="bg-[#9BCC47] text-white px-4 py-2 rounded-md flex items-center" onClick={() => setShowModal(true)}>
            <PlusIcon size={16} className="mr-1" />
            신규 상품 등록
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BCC47] focus:border-transparent"
                placeholder="상품명 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-md">
                <div className="mr-1" />
                필터
              </button>
              <select className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9BCC47] focus:border-transparent"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}>
                <option value="">카테고리</option>
                <option value="스킨케어">스킨케어</option>
                <option value="메이크업">메이크업</option>
                <option value="선케어">선케어</option>
                <option value="클렌징">클렌징</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9BCC47] focus:border-transparent"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}>
              <option value="">상태</option>
              <option value="판매중">판매중</option>
              <option value="품절임박">품절임박</option>
              <option value="품절">품절</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50">
                <th className="px-6 py-3">상품명</th>
                <th className="px-6 py-3">카테고리</th>
                <th className="px-6 py-3">재고</th>
                <th className="px-6 py-3">가격</th>
                <th className="px-6 py-3">상태</th>
                <th className="px-6 py-3">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedProducts.map(product => (
                <tr key={product.id} className="text-sm">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 text-gray-700">{product.stock}</td>
                  <td className="px-6 py-4 text-gray-700">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.status === '판매중' ? 'bg-green-100 text-green-800' :
                      product.status === '품절임박' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <div />
                      </button>
                      <button className="text-red-600 hover:text-red-800"  onClick={() => handleDelete(product.id)}>
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">{filteredProducts.length}</span>개 상품 중{' '}
            <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>-
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
            </span>{' '}
            표시
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md"
            >
              이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 text-sm rounded-md ${
                  currentPage === i + 1
                    ? 'bg-[#9BCC47] text-white'
                    : 'border border-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md"
            >
              다음
            </button>
          </div>
        </div>
      </div>
      {showModal && <NewProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
