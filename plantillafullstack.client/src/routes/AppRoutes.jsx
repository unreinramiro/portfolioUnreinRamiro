import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Dashboard from '../pages/Dashboard/Dashboard';

const Home = lazy(() => import('../pages/Home/Home'));

export default function AppRoutes() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
  );
}   