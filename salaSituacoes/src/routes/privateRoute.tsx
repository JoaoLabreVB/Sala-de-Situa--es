import { useAuth } from '@hooks/useAuth'
import React from 'react'

import { Navigate } from 'react-router-dom'

// import { useAuth } from '@hooks/useAuth'

interface PrivateRouteProps {
  children: React.ReactNode
  to: string
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, to }) => {
  const { isAuthenticated } = useAuth()

  return <>{isAuthenticated ? children : <Navigate to={to} replace />}</>
}
