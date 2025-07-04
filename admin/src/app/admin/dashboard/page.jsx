'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { PackageIcon, ShoppingCartIcon, UsersIcon, TrendingUpIcon } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

const stats = [
    { title: '총 매출', value: '₩ 24,389,000', change: '+12.5%', icon: <TrendingUpIcon size={24} className="text-green-500" /> },
    { title: '총 주문', value: '1,284', change: '+8.2%', icon: <ShoppingCartIcon size={24} className="text-blue-500" /> },
    { title: '총 상품', value: '3,467', change: '+3.1%', icon: <PackageIcon size={24} className="text-purple-500" /> },
    { title: '총 회원', value: '12,456', change: '+5.7%', icon: <UsersIcon size={24} className="text-orange-500" /> }
  ];

  const recentOrders = [
    { id: 'OD-7892', customer: '김지민', date: '2023-05-12', amount: '₩ 56,000', status: '배송완료' },
    { id: 'OD-7891', customer: '이하준', date: '2023-05-12', amount: '₩ 128,000', status: '배송중' },
    { id: 'OD-7890', customer: '박서연', date: '2023-05-11', amount: '₩ 32,500', status: '결제완료' },
    { id: 'OD-7889', customer: '최준호', date: '2023-05-11', amount: '₩ 77,000', status: '주문접수' },
    { id: 'OD-7888', customer: '정민지', date: '2023-05-10', amount: '₩ 45,000', status: '배송완료' }
  ];

  const topProducts = [
    { id: 1, name: '아이오페 UV 쉴드', sales: '1,234개', amount: '₩ 3,702,000' },
    { id: 2, name: '이니스프리 그린티 세럼', sales: '987개', amount: '₩ 2,961,000' },
    { id: 3, name: '라네즈 워터 슬리핑 마스크', sales: '876개', amount: '₩ 2,628,000' },
    { id: 4, name: '에뛰드 드로잉 아이브로우', sales: '765개', amount: '₩ 1,147,500' },
    { id: 5, name: '미샤 타임 레볼루션 에센스', sales: '654개', amount: '₩ 1,962,000' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">대시보드</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-green-600">
                  {stat.change} 지난달 대비
                </p>
              </div>
              <div className="p-3 rounded-full bg-gray-50">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 최근 주문 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">최근 주문</h2>
            <button
              className="text-sm text-[#9BCC47] hover:underline"
              onClick={() => router.push('/admin/orders')}
            >
              모든 주문 보기
            </button>
          </div>
          {/* 테이블 렌더링 */}
        </div>

        {/* 인기 상품 */}
        <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">인기 상품</h2>
            <button
              className="text-sm text-[#9BCC47] hover:underline"
              onClick={() => router.push('/admin/products')}
            >
              모든 상품 보기
            </button>
          </div>
          {/* 테이블 렌더링 */}
        </div>
      </div>
    </div>
  );
}
