import { passioOrderApi } from '@/apis/passio_order.api'
import { useSuspenseQuery } from '@tanstack/react-query'

export const usePassioOrder = () => {
  const getPassioOrderByCode = (code: string) => {
    return useSuspenseQuery({
      queryKey: ['passio-order', code],
      queryFn: () => passioOrderApi.getPassioOrderByCode(code),
    })
  }

  return { getPassioOrderByCode }
}

