"use client";

import { useAuth } from '@/provider/AuthProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'User'}!
        </p>
        <div className="mt-8 space-y-2">
          <p className="text-sm text-muted-foreground">
            Email: {user?.email}
          </p>
          <p className="text-sm text-muted-foreground">
            User ID: {user?.id}
          </p>
        </div>
      </div>
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