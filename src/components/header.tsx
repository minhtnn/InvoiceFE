import { ChevronLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

const HeaderMain = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()

  const shouldShowBack = () => {
    const segments = pathname.split('/').filter(Boolean)
    return segments.length >= 2
  }
  return (
    <nav className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 bg-sidebar/98 z-10">
      <div className="flex items-center gap-2 px-4 justify-between w-full">
        <div className="absolute left-0 flex items-center gap-2 px-4">
          {shouldShowBack() && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate(
                          '/' +
                            pathname
                              .replace(/^\//, '')
                              .split('/')
                              .slice(
                                0,
                                pathname.split('/').filter(Boolean).length - 1,
                              )
                              .join('/'),
                        )
                      }}
                      className="gap-1 px-2"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Quay lại trang trước</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
        <div className="mx-auto">
          <img src="/passio_logo.png" alt="Logo" className="h-6" />
        </div>
      </div>
    </nav>
  )
}
export default HeaderMain
