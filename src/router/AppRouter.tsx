import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AlertPage, EmptyPage, MainPage, RemittancesPage } from '@/pages'
import { AppLayout } from '@/layouts/AppLayout'
import { Sidenav } from '@/components'
import { useAppDispatch } from '@/hooks'
import { startLoadRemittances } from '@/store/remittances'

export const AppRouter = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startLoadRemittances())
    }, [])

    return (
        <>
            <Sidenav />
            <AppLayout>
                <Routes>
                    <Route path="/" element={<RemittancesPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/cards" element={<EmptyPage title="Tarjetas" />} />
                    <Route path="/invoices" element={<EmptyPage title="Facturas" />} />
                    <Route path="/share" element={<EmptyPage title="Compartir" />} />
                    <Route path="/files" element={<EmptyPage title="Archivos" />} />

                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </AppLayout>
            <AlertPage />
        </>
    )
}