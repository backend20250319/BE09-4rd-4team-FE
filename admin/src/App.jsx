import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ProductsTable } from './components/ProductsTable';
import { OrdersTable } from './components/OrdersTable';
import { UsersTable } from './components/UsersTable';
import { Header } from './components/Header';

export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'products':
        return <ProductsTable setCurrentPage={setCurrentPage} />;
      case 'orders':
        return <OrdersTable setCurrentPage={setCurrentPage} />;
      case 'users':
        return <UsersTable setCurrentPage={setCurrentPage} />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
