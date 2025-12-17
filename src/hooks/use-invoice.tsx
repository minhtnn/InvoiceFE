import { invoiceApi } from '@/apis/invoice.api'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

export const useInvoice = () => {
  const queryClient = useQueryClient()
  const createInvoice = useMutation({
    mutationFn: invoiceApi.createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
    },
  })
  const getTaxCodeInfo = useMutation({
    mutationFn: (code: string) => invoiceApi.getTaxCodeInfo(code),
  })
  return { createInvoice, getTaxCodeInfo }
}
