// src/routes/RoleProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && allowedRoles.includes(user.role.name.toLowerCase()) ? (
    <Outlet />
  ) : (
    <Navigate to="/access-denied" />
  );
};

export default RoleProtectedRoute;
