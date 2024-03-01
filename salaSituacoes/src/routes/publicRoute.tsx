import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from '@hooks/useAuth'

interface PublicRoutesProps {
  children: React.ReactNode
}

export const PublicRoute: React.FC<PublicRoutesProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  return <>{isAuthenticated ? <Navigate to="/" /> : children}</>
}
