import React from 'react'

import { Routes, Route } from 'react-router-dom'

import { PublicRoute } from './publicRoute'
import { PrivateRoute } from './privateRoute'
import { Authentication } from '@pages/Authentication'
import { AuthenticationLayout } from '@layouts/AuthenticationLayout'
import { MainLayout } from '@layouts/MainLayout'
import { MyDevices } from '@pages/MyDevices'
import { useAuth } from '@hooks/useAuth'
import { NotFound } from '@pages/404'

export const Router: React.FC = () => {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path="/" element={<AuthenticationLayout />}>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Authentication.SignIn />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/esqueceu-senha"
                    element={
                        <PublicRoute>
                            <Authentication.PasswordRecovery />
                        </PublicRoute>
                    }
                />

                {/* <Route
                    path="/recuperacao-senha/:token"
                    element={
                        <PublicRoute >
                            <Authentication.RegisterNewPassword />
                        </PublicRoute>
                    }
                /> */}
            </Route>
            {!user && <Route path="/404" element={<NotFound />} />}

            <Route path="/" element={<MainLayout />}>
                <Route
                    path="/meus-dispositivos"
                    element={
                        <PrivateRoute to='/'>
                            <MyDevices />
                        </PrivateRoute>
                    }
                />
            </Route>
            {/* ************************************************* */}


            {/* <Route
            path="/management-platform/store-selection"
            element={
              <PrivateRoute to="/">
                
              </PrivateRoute>
            }
          /> */}
        </Routes>
    )
}
