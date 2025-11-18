import { ErrorFallback } from '@/components/error-fallback'
import LoadingScreen from '@/components/loading-screen'
import AppLayout from '@/layouts/app-layout'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type ElementType, lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Navigate, useRoutes } from 'react-router-dom'
import { PATH_PASSIO_INVOICE } from './path'

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

const PassioInvoiceEditPage = Loadable(
  lazy(() => import('@/pages/passio-invoice/edit')),
)
const PassioInvoiceSearchPage = Loadable(
  lazy(() => import('@/pages/passio-invoice/search/passio-invoice-search')),
)

const Page404 = Loadable(lazy(() => import('@/pages/page-404')))

export const AppRoutes = () =>
  useRoutes([
    {
      path: PATH_PASSIO_INVOICE.root,
      element: <AppLayout />,
      children: [
        {
          element: <PassioInvoiceSearchPage replace />,
          index: true,
        },
        {
          path: 'search',
          element: <PassioInvoiceSearchPage />,
        },
        {
          path: 'edit/:code',
          element: <PassioInvoiceEditPage />,
        },
      ],
    },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          element: <Navigate to={PATH_PASSIO_INVOICE.root} replace />,
          index: true,
        },
      ],
    },
    // Add the 404 route
    {
      path: '/404',
      element: <Page404 />,
    },
    // Catch all unmatched routes
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
