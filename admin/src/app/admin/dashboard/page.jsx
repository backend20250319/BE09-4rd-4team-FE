'use client';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { PackageIcon, ShoppingCartIcon, UsersIcon, TrendingUpIcon } from 'lucide-react';


const getIconByType = (type) => {
  switch (type) {
    case 'sales':
      return <TrendingUpIcon size={24} className="text-green-500" />;
    case 'orders':
      return <ShoppingCartIcon size={24} className="text-blue-500" />;
    case 'products':
      return <PackageIcon size={24} className="text-purple-500" />;
    case 'members':
    case 'customers':
      return <UsersIcon size={24} className="text-orange-500" />;
    default:
      return null;
  }
};




export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const fetchDashboardData = async () => {
      try {
        const [statsRes, ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/admin/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8080/api/admin/dashboard/recent-orders', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8080/api/admin/dashboard/top-products', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log("✅ ordersRes.data:", ordersRes.data);
        console.log("✅ productsRes.data:", productsRes.data);
        // ✅ 통계 처리
        const statsObj = statsRes.data;
        const statsWithIcons = [
          { title: '총 매출', value: `₩ ${statsObj.totalSalesAmount.toLocaleString()}`, change: '+12.5%', type: 'sales', icon: getIconByType('sales') },
          { title: '총 주문', value: statsObj.totalOrderCount.toLocaleString(), change: '+8.2%', type: 'orders', icon: getIconByType('orders') },
          { title: '총 상품', value: statsObj.totalProductCount.toLocaleString(), change: '+3.1%', type: 'products', icon: getIconByType('products') },
          { title: '총 회원', value: statsObj.totalUserCount.toLocaleString(), change: '+5.7%', type: 'members', icon: getIconByType('members') },
        ];
        setStats(statsWithIcons);

        // ✅ 📌 이 부분에 넣으세요!
        if (ordersRes.data.length > 0) {
          const formattedOrders = ordersRes.data.map(order => ({
            id: `OD-${order.orderId}`,
            customer: order.userName,
            date: order.createdAt.slice(0, 10),
            total: `₩ ${order.totalAmount.toLocaleString()}`,
            status: order.status,
          }));
          setRecentOrders(formattedOrders);
        }

        if (productsRes.data.length > 0) {
          const formattedProducts = productsRes.data.map(product => ({
            id: product.productId,
            name: product.productName,
            sales: `${product.totalSales.toLocaleString()}개`,
            amount: `₩ ${product.totalRevenue.toLocaleString()}`,
          }));
          setProducts(formattedProducts);
        }

      } catch (error) {
        console.error('대시보드 데이터 불러오기 실패:', error);
      }
    };



    fetchDashboardData();
  }, []);



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
          {/* 최근 주문 테이블 렌더링 */}
          <table className="w-full">
            <thead>
            <tr className="text-xs text-gray-500 uppercase bg-gray-50">
              <th className="px-4 py-2 text-left">주문번호</th>
              <th className="px-4 py-2 text-left">고객명</th>
              <th className="px-4 py-2 text-left">주문일자</th>
              <th className="px-4 py-2 text-left">금액</th>
              <th className="px-4 py-2 text-left">상태</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {recentOrders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.total}</td>
                  <td className="px-4 py-2 text-sm">
          <span className={`px-2 py-1 text-xs rounded-full ${
              order.status === '배송완료' ? 'bg-green-100 text-green-800' :
                  order.status === '배송중' ? 'bg-blue-100 text-blue-800' :
                      order.status === '결제완료' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
          }`}>
            {order.status}
          </span>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
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
          <table className="w-full">
            <thead>
            <tr className="text-xs text-gray-500 uppercase bg-gray-50">
              <th className="px-4 py-2 text-left">순위</th>
              <th className="px-4 py-2 text-left">상품명</th>
              <th className="px-4 py-2 text-left">판매수</th>
              <th className="px-4 py-2 text-left">총 매출</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {topProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{product.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{product.sales}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{product.amount}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
