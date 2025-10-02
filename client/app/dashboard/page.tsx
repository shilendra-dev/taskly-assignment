"use client";

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Dashboard } from '@/components/features/dashboard/dashboard';

function DashboardContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Dashboard />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}