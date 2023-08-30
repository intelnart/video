import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './router'
import { Error } from '../components/Error/Error'
import { useAppSelector } from '../store/hooks/redux'

type Routes = {
    path: string
    element: ReactElement
}

export function AppRouter() {
    const { token } = useAppSelector(state => state.userReducer) || { token: '' }

    return token ? (
        <Routes>
            {privateRoutes.map(route => (
                <Route path={route.path} element={<route.element />} key={route.path} />
            ))}
            <Route path="/*" element={<Error />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(route => (
                <Route path={route.path} element={<route.element />} key={route.path} />
            ))}
            <Route path="/*" element={<Error />} />
        </Routes>
    )
}
