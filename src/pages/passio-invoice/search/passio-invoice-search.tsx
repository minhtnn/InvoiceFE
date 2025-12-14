import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PATH_PASSIO_INVOICE } from '@/routes/path'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PassioInvoiceSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`${PATH_PASSIO_INVOICE.root}/edit/${searchQuery.trim()}`)
    }
  }
  return (
    <div className={`transition-colors flex flex-col`}>
      {/* Hero Section */}
      <div className="flex-1">
        <div className="relative overflow-hidden">
          {/* Hero Content */}
          <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-32 text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <h1 className={`md:text-5xl text-3xl font-medium`}>
                Xuất Hóa Đơn Điện Tử
              </h1>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit}>
              <div className="max-w-3xl mx-auto mb-12 space-y-6">
                <div
                  className={`relative rounded-md overflow-hidden dark:bg-slate-700/50 backdrop-blur-sm shadow-2xl`}
                >
                  <Search
                    className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6`}
                  />
                  <Input
                    className={`w-full pl-16 pr-8 py-8 md:text-xl rounded-md focus:ring-0 border-0 focus:border-0 placeholder:opacity-50`}
                    type="text"
                    placeholder="Vui lòng nhập mã hóa đơn trên bill"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    className="w-full md:w-1/2 rounded-md pl-16 pr-16 py-6 
                            overflow-hidden bg-chartreuse-100 text-neutral-100 
                            backdrop-blur-sm md:text-xl hover:bg-chartreuse-90"
                    onSubmit={handleSearchSubmit}
                  >
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full py-4">
        <p className="text-sm text-neutral-60 text-center">
          Powered by
        </p>
        <div className="justify-center flex">
          <img src="/uni_group_logo.png" alt="Logo" className="h-8" />
        </div>
      </div>
    </div>
  )
}

export default PassioInvoiceSearchPage
