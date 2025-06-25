import React from 'react';
import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon
} from 'lucide-react';

export function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: <LayoutDashboardIcon size={20} />
    },
    {
      id: 'products',
      label: '상품 관리',
      icon: <PackageIcon size={20} />
    },
    {
      id: 'orders',
      label: '주문 관리',
      icon: <ShoppingCartIcon size={20} />
    },
    {
      id: 'users',
      label: '회원 관리',
      icon: <UsersIcon size={20} />
    },
    {
      id: 'analytics',
      label: '매출 분석',
      icon: <div size={20} /> // 여기는 나중에 아이콘으로 교체하세요
    },
    {
      id: 'settings',
      label: '환경 설정',
      icon: <SettingsIcon size={20} />
    }
  ];

  return (
    <div className="w-64 bg-[#9BCC47] text-white hidden md:flex flex-col">
      <div className="p-4 border-b border-[#8ab93f]">
        <h1 className="text-xl font-bold">올리브영 어드민</h1>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`flex items-center w-full px-4 py-3 text-left ${
                  currentPage === item.id
                    ? 'bg-[#8ab93f] font-medium'
                    : 'hover:bg-[#8ab93f]'
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-[#8ab93f]">
        <button className="flex items-center w-full px-4 py-2 text-left hover:bg-[#8ab93f] rounded">
          <LogOutIcon size={20} className="mr-3" />
          로그아웃
        </button>
      </div>
    </div>
  );
}
