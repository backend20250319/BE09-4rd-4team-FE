import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductsTable } from "./pages/ProductsTable";
import { UsersTable } from './pages/UsersTable';
import { OrdersTable } from './pages/OrdersTable';
import { Dashboard } from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductsTable />} />
              <Route path="/orders" element={<OrdersTable />} />
              <Route path="/users" element={<UsersTable />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
