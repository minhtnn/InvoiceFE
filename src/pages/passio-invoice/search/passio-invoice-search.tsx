import InvoiceIcon from '@/assets/icons/invoice-icon'
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
    <div className={`min-h-screen transition-colors`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Database Icons */}
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              <rect
                x="180"
                y="120"
                width="80"
                height="15"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="180"
                y="140"
                width="80"
                height="15"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="180"
                y="160"
                width="80"
                height="15"
                rx="2"
                fill="currentColor"
              />
              <line
                x1="220"
                y1="180"
                x2="220"
                y2="210"
                stroke="currentColor"
                strokeWidth="2"
              />
            </g>

            {/* Circles */}
            <circle
              cx="380"
              cy="140"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="400" cy="140" r="15" fill="currentColor" />

            {/* Diamond */}
            <g className="animate-pulse" style={{ animationDuration: '4s' }}>
              <path
                d="M880 180 L920 220 L880 260 L840 220 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </g>

            {/* More Database */}
            <rect
              x="1080"
              y="130"
              width="80"
              height="15"
              rx="2"
              fill="currentColor"
            />
            <rect
              x="1080"
              y="150"
              width="80"
              height="15"
              rx="2"
              fill="currentColor"
            />
            <rect
              x="1080"
              y="170"
              width="80"
              height="15"
              rx="2"
              fill="currentColor"
            />

            {/* Clock */}
            <circle
              cx="1270"
              cy="190"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="1270"
              y1="190"
              x2="1270"
              y2="160"
              stroke="currentColor"
              strokeWidth="3"
            />
            <line
              x1="1270"
              y1="190"
              x2="1290"
              y2="190"
              stroke="currentColor"
              strokeWidth="3"
            />

            {/* Squares and shapes */}
            <rect
              x="80"
              y="290"
              width="70"
              height="70"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="250"
              cy="300"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            {/* Wave pattern */}
            <path
              d="M480 500 Q520 460 560 500 T640 500 T720 500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M480 540 Q520 500 560 540 T640 540 T720 540"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            {/* Server blocks */}
            <rect
              x="900"
              y="480"
              width="120"
              height="40"
              rx="4"
              fill="currentColor"
            />
            <circle cx="920" cy="500" r="8" fill="currentColor" />

            {/* Arrow */}
            <g className="animate-pulse" style={{ animationDuration: '2.5s' }}>
              <line
                x1="70"
                y1="420"
                x2="120"
                y2="470"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="120"
                y1="470"
                x2="90"
                y2="465"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="120"
                y1="470"
                x2="115"
                y2="440"
                stroke="currentColor"
                strokeWidth="2"
              />
            </g>

            {/* Chart bars */}
            <rect
              x="200"
              y="450"
              width="15"
              height="40"
              rx="2"
              fill="currentColor"
            />
            <rect
              x="220"
              y="430"
              width="15"
              height="60"
              rx="2"
              fill="currentColor"
            />
            <rect
              x="240"
              y="410"
              width="15"
              height="80"
              rx="2"
              fill="currentColor"
            />
            <rect
              x="260"
              y="420"
              width="15"
              height="70"
              rx="2"
              fill="currentColor"
            />

            {/* Triangle */}
            <path
              d="M1200 520 L1250 480 L1250 560 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-32 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-watermelon-100 rounded-md">
              <InvoiceIcon
                className="w-12 h-12 md:w-16 md:h-16"
                fill="var(--neutral-0)"
              />
            </div>
            <h1 className={`md:text-5xl text-3xl font-medium`}>
              Passio Invoice
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit}>
            <div className="max-w-3xl mx-auto mb-12">
              <div
                className={`relative rounded-full overflow-hidden dark:bg-slate-700/50 backdrop-blur-sm shadow-2xl`}
              >
                <Search
                  className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6`}
                />
                <Input
                  className={`w-full pl-16 pr-8 py-8 md:text-xl rounded-full focus:ring-0 border-0 focus:border-0 placeholder:opacity-50`}
                  type="text"
                  placeholder="Mã Passio Invoice..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PassioInvoiceSearchPage
