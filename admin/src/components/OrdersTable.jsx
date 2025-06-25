import React, { useState } from 'react';
import { SearchIcon, EyeIcon, DownloadIcon } from 'lucide-react';

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    { id: 'OD-7892', customer: '김지민', date: '2023-05-12', total: '₩ 56,000', payment: '카드결제', status: '배송완료' },
    { id: 'OD-7891', customer: '이하준', date: '2023-05-12', total: '₩ 128,000', payment: '카드결제', status: '배송중' },
    { id: 'OD-7890', customer: '박서연', date: '2023-05-11', total: '₩ 32,500', payment: '무통장입금', status: '결제완료' },
    { id: 'OD-7889', customer: '최준호', date: '2023-05-11', total: '₩ 77,000', payment: '카카오페이', status: '주문접수' },
    { id: 'OD-7888', customer: '정민지', date: '2023-05-10', total: '₩ 45,000', payment: '카드결제', status: '배송완료' },
    { id: 'OD-7887', customer: '송지원', date: '2023-05-10', total: '₩ 62,000', payment: '네이버페이', status: '배송중' },
    { id: 'OD-7886', customer: '윤도현', date: '2023-05-09', total: '₩ 24,000', payment: '카드결제', status: '배송완료' },
    { id: 'OD-7885', customer: '장서영', date: '2023-05-09', total: '₩ 88,000', payment: '카드결제', status: '취소요청' },
    { id: 'OD-7884', customer: '이민준', date: '2023-05-08', total: '₩ 35,500', payment: '카드결제', status: '배송완료' },
    { id: 'OD-7883', customer: '한소희', date: '2023-05-08', total: '₩ 146,000', payment: '무통장입금', status: '결제대기' }
  ];

  const downloadCSV = () => {
    const headers = ['주문번호', '고객명', '주문일자', '주문금액', '결제방법', '주문상태'];
    const dataRows = orders.map(order => [order.id, order.customer, order.date, order.total, order.payment, order.status]);
    const csvContent = ['\uFEFF' + headers.join(','), ...dataRows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '올리브영_주문목록.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">주문 관리</h1>
        <button onClick={downloadCSV} className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          <DownloadIcon size={16} className="mr-1" />
          엑셀 다운로드
        </button>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9BCC47] focus:border-transparent"
                placeholder="주문번호 또는 고객명 검색..."
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
              <select className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9BCC47] focus:border-transparent">
                <option>결제방법</option>
                <option>카드결제</option>
                <option>무통장입금</option>
                <option>카카오페이</option>
                <option>네이버페이</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9BCC47] focus:border-transparent">
                <option>주문상태</option>
                <option>결제대기</option>
                <option>결제완료</option>
                <option>주문접수</option>
                <option>배송중</option>
                <option>배송완료</option>
                <option>취소요청</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50">
                <th className="px-6 py-3">주문번호</th>
                <th className="px-6 py-3">고객명</th>
                <th className="px-6 py-3">주문일자</th>
                <th className="px-6 py-3">주문금액</th>
                <th className="px-6 py-3">결제방법</th>
                <th className="px-6 py-3">주문상태</th>
                <th className="px-6 py-3">상세보기</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id} className="text-sm">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-700">{order.date}</td>
                  <td className="px-6 py-4 text-gray-700">{order.total}</td>
                  <td className="px-6 py-4 text-gray-700">{order.payment}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === '배송완료' ? 'bg-green-100 text-green-800' :
                      order.status === '배송중' ? 'bg-blue-100 text-blue-800' :
                      ['결제완료', '주문접수'].includes(order.status) ? 'bg-yellow-100 text-yellow-800' :
                      order.status === '취소요청' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#9BCC47] hover:text-[#8ab93f]">
                      <EyeIcon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">235</span>개 주문 중 <span className="font-medium">1</span>-<span className="font-medium">10</span> 표시
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md">이전</button>
            <button className="px-3 py-1 bg-[#9BCC47] text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md">2</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md">3</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md">다음</button>
          </div>
        </div>
      </div>
    </div>
  );
}
