import HeaderMain from '@/components/header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <HeaderMain />
      <div className="p-4 md:p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
