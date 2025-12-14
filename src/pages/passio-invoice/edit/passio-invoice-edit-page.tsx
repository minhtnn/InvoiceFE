import InvoiceIcon from '@/assets/icons/invoice-icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePassioOrder } from '@/hooks/use-passio-order'
import { handleApiError } from '@/lib/error'
import { formatCurrency } from '@/lib/utils'
import {
  handleSetNeedToFillCompanyInfo,
  handleSetPassioInvoicePreviewDialogState,
} from '@/redux/modal/modal-slice'
import type { RootState } from '@/redux/store'
import {
  InvoiceItemSchema,
  type TInvoiceItemResponse,
} from '@/schema/invoice-item.schema'
import { InvoiceSchema, type TInvoiceRequest } from '@/schema/invoice.schema'
import type { TPassioOrderDetailResponse } from '@/schema/passio-order-detail.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Banknote,
  Building,
  FileTextIcon,
  LocateIcon,
  StoreIcon,
  User,
} from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { InvoicePreviewDialog } from './components/invoice-preview-dialog'
import { useInvoice } from '@/hooks/use-invoice'
import { toast } from 'sonner'

const PassioInvoiceEditPage = () => {
  //#region Params
  const { code } = useParams<{ code: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //#endregion

  //#region  Hooks
  const { getPassioOrderByCode } = usePassioOrder()
  const { createInvoice, getTaxCodeInfo } = useInvoice()
  //#endregion

  //#region Redux
  const { passioInvoicePreviewDialogOpen, needToFillCompanyInfo } = useSelector(
    (state: RootState) => state.modal,
  )
  //#endregion

  //#region Prepare data from api
  const {
    data: passioOrderData,
    error: passioOrderError,
    // isLoading,
    isError,
  } = getPassioOrderByCode(code as string)

  if (isError && passioOrderError) {
    handleApiError(passioOrderError)
  }
  if (!passioOrderData || !passioOrderData.data || !passioOrderData.data.data) {
    return (
      <div className="flex items-center justify-center h-full">
        {passioOrderData.data.message || 'Không tìm thấy đơn hàng.'}
      </div>
    )
  }

  var orderData = passioOrderData?.data.data
  var invoiceFinalAmount = orderData?.finalAmount || 0
  var invoiceTotalSaleAmount = orderData?.totalAmount / 1.08 || 0
  var invoiceTotalDiscountAmount =
    (orderData?.discount + orderData?.discountOrderDetail) / 1.08 || 0
  var invoiceTotalAmountWithoutTax =
    invoiceTotalSaleAmount - invoiceTotalDiscountAmount || 0
  var invoiceTaxAmount = invoiceTotalAmountWithoutTax * 0.08 || 0
  const groupMap = new Map<string, TPassioOrderDetailResponse[]>()
  orderData.passioOrderDetailResponses.forEach(
    (od: TPassioOrderDetailResponse) => {
      if (!groupMap.has(od.productCode)) {
        groupMap.set(od.productCode, [])
      }
      groupMap.get(od.productCode)!.push(od)
    },
  )
  var invoiceItems: TInvoiceItemResponse[] = Array.from(groupMap.entries()).map(
    ([code, group], index) => {
      const quantitySum = group.reduce((sum, od) => sum + od.quantity, 0)
      return InvoiceItemSchema.parse({
        ordinalNumber: index + 1,
        code: code,
        name: group[0].productName,
        unit: 'Ly',
        unitPrice: group[0].unitPrice / 1.08,
        amount: (group[0].unitPrice / 1.08) * quantitySum,
        quantity: quantitySum,
        property: '1',
        tax: '8%',
      })
    },
  )

  const form = useForm<TInvoiceRequest>({
    resolver: zodResolver(InvoiceSchema) as any,
    defaultValues: {
      orderId: orderData.rentId,
      type: '1',
      paymentMethod: 'TM/CK',
      totalSaleAmount: invoiceTotalSaleAmount,
      totalDiscountAmount: invoiceTotalDiscountAmount,
      totalAmountWithoutTax: invoiceTotalAmountWithoutTax,
      totalAmount: invoiceFinalAmount,
      totalAmountAfterTax: 0,
      totalTaxAmount: invoiceTotalAmountWithoutTax * 0.08,
      currencyExchangeRate: 1,
      partnerCode: 'VNP',
      storeCode: orderData?.storeCode || '',
      invoiceDetail: {
        buyerTaxCode: '',
        buyerFullName: '',
        buyerAddress: '',
        buyerBudgetRelationUnitCode: '',
        buyerName: '',
        buyerEmail: '',
        buyerPhoneNumber: '',
        buyerPassportNumber: '',
        discount: invoiceTotalDiscountAmount > 0,
      },
      items: invoiceItems || [],
      taxTypes: [
        {
          tax: '8%',
          amountWithoutTax: invoiceTotalAmountWithoutTax,
          taxAmount: invoiceTaxAmount,
        },
      ],
    },
  })
  //#endregion

  //#region Handlers
  const onPreview: SubmitHandler<TInvoiceRequest> = async (data) => {
    if (!needToFillCompanyInfo) {
      let hasError = false

      if (!data.invoiceDetail.buyerTaxCode?.trim()) {
        form.setError('invoiceDetail.buyerTaxCode', {
          type: 'manual',
          message: 'Mã số thuế là bắt buộc',
        })
        hasError = true
      }

      if (!data.invoiceDetail.buyerFullName?.trim()) {
        form.setError('invoiceDetail.buyerFullName', {
          type: 'manual',
          message: 'Tên đơn vị là bắt buộc',
        })
        hasError = true
      }

      if (!data.invoiceDetail.buyerAddress?.trim()) {
        form.setError('invoiceDetail.buyerAddress', {
          type: 'manual',
          message: 'Địa chỉ là bắt buộc',
        })
        hasError = true
      }

      if (hasError) {
        return // Dừng submit nếu có lỗi
      }
    }

    dispatch(handleSetPassioInvoicePreviewDialogState(true))
  }
  const handleCheckChange = (checked: boolean) => {
    dispatch(handleSetNeedToFillCompanyInfo(checked))

    if (checked) {
      form.setValue('invoiceDetail.buyerTaxCode', '')
      form.setValue('invoiceDetail.buyerFullName', '')
      form.setValue('invoiceDetail.buyerAddress', '')
      form.setValue('invoiceDetail.buyerBudgetRelationUnitCode', '')

      form.clearErrors('invoiceDetail.buyerTaxCode')
      form.clearErrors('invoiceDetail.buyerFullName')
      form.clearErrors('invoiceDetail.buyerAddress')
      form.clearErrors('invoiceDetail.buyerBudgetRelationUnitCode')
    }
  }
  const onSubmit: SubmitHandler<TInvoiceRequest> = async (
    data: TInvoiceRequest,
  ) => {
    if (!needToFillCompanyInfo) {
      let hasError = false

      if (!data.invoiceDetail.buyerTaxCode?.trim()) {
        form.setError('invoiceDetail.buyerTaxCode', {
          type: 'manual',
          message: 'Mã số thuế là bắt buộc',
        })
        hasError = true
      }

      if (!data.invoiceDetail.buyerFullName?.trim()) {
        form.setError('invoiceDetail.buyerFullName', {
          type: 'manual',
          message: 'Tên đơn vị là bắt buộc',
        })
        hasError = true
      }

      if (!data.invoiceDetail.buyerAddress?.trim()) {
        form.setError('invoiceDetail.buyerAddress', {
          type: 'manual',
          message: 'Địa chỉ là bắt buộc',
        })
        hasError = true
      }

      if (hasError) {
        return
      }
    }
    // console.log(data);
    try {
      const result = await createInvoice.mutateAsync(data)
      if (result.data.status >= 200 && result.data.status < 300) {
        form.reset()
        dispatch(handleSetNeedToFillCompanyInfo(false))
        dispatch(handleSetPassioInvoicePreviewDialogState(false))
        toast.success('Tạo hóa đơn thành công')
        navigate('/passio-invoice')
      } else {
        handleApiError(`${result.data.status}: ${result.data.message}`)
      }
    } catch (error) {
      handleApiError(error)
    }
  }

  const onSubmitTaxCode = async () => {
    const taxCode = form.getValues().invoiceDetail.buyerTaxCode

    if (!taxCode) {
      toast.error('Vui lòng nhập mã số thuế để kiểm tra')
      return
    }

    try {
      const result = await getTaxCodeInfo.mutateAsync(taxCode)

      if (result.data.status >= 200 && result.data.status < 300) {
        const taxData = result.data.data
        form.setValue('invoiceDetail.buyerFullName', taxData.fullName)
        form.setValue('invoiceDetail.buyerAddress', taxData.addressLine)
        toast.success('Lấy thông tin thành công')
      } else {
        toast.error('Mã số thuế không hợp lệ. Vui lòng kiểm tra lại.')
      }
    } catch (error) {
      handleApiError(error)
    }
  }
  //#endregion

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <InvoicePreviewDialog
        disabledButton={createInvoice.isPending}
        isOpen={passioInvoicePreviewDialogOpen}
        onOpenChange={(open) =>
          dispatch(handleSetPassioInvoicePreviewDialogState(open))
        }
        invoiceData={form.getValues()}
        storeName={orderData?.storeName || ''}
        storeAddress={orderData?.addressLine || ''}
        onConfirm={() => {
          form.handleSubmit(onSubmit)()
        }}
      />
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-watermelon-100 rounded-md">
            <InvoiceIcon className="w-6 h-6" fill="var(--neutral-0)" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold text-watermelon-100">
              Thông tin hóa đơn
            </h1>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground text-center">
            Vui lòng nhập đủ thông tin bên dưới để xuất hóa đơn.
          </p>
        </div>
      </div>
      <Card className="">
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StoreIcon className="w-4 h-4 text-watermelon-100 inline-block mr-2" />
            <div className="tracking-wide leading-relaxed text-sm break-words break-all flex-1 min-w-0 text-base font-medium">
              {orderData?.storeName || ''}
            </div>
          </div>
          <div className="flex items-center gap-2 space-x-2">
            <LocateIcon className="w-4 h-4 text-watermelon-100 inline-block mr-2" />
            <div className="tracking-wide leading-relaxed text-sm break-words break-all inline-block text-base">
              {orderData?.addressLine || ''}
            </div>
          </div>
          <div className="flex items-center gap-2 space-x-2">
            <FileTextIcon className="w-4 h-4 text-watermelon-100" />
            <div className="text-base">Số bill:</div>
            <div className="tracking-wide leading-relaxed">
              {orderData?.invoicePassioId || ''}
            </div>
          </div>
          <div className="flex items-center gap-2 space-x-2">
            <Banknote className="w-4 h-4 text-watermelon-100" />
            <div className="text-base">Tổng thanh toán:</div>
            <div className="tracking-wide leading-relaxed">
              {formatCurrency(orderData?.finalAmount || 0)}
            </div>
          </div>
        </CardContent>
      </Card>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onPreview, (errors) =>
              console.log(errors),
            )}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-watermelon-100" />
                  <div className="text-lg font-bold text-watermelon-100">
                    Thông tin doanh nghiệp
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 mb-4 light:bg-neutral-20 dark:bg-neutral-100 p-4 rounded-md">
                    <Checkbox
                      onCheckedChange={handleCheckChange}
                      checked={needToFillCompanyInfo}
                      className="data-[state=checked]:bg-chartreuse-100 
                                 data-[state=checked]:border-chartreuse-100"
                    />
                    <Label className="tracking-widest leading-relaxed font-normal md:font-light">
                      Đơn vị không có Mã số thuế (Công ty nước ngoài/Đơn vị nhà
                      nước/Khách lẻ)
                    </Label>
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="invoiceDetail.buyerTaxCode"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium"
                              tooltip="Mã số thuế doanh nghiệp gồm 10-13 chữ số do cơ quan thuế cấp"
                            >
                              Mã số thuế
                            </FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input
                                  placeholder=""
                                  {...field}
                                  disabled={needToFillCompanyInfo}
                                />
                              </FormControl>
                              <Button
                                className="md:w-auto md:max-w-md bg-watermelon-100"
                                type="button"
                                onClick={onSubmitTaxCode}
                                disabled={needToFillCompanyInfo}
                              >
                                Kiểm tra
                              </Button>
                            </div>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="invoiceDetail.buyerFullName"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium"
                              tooltip="Tên đơn vị mua hàng"
                            >
                              Tên đơn vị
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder=""
                                {...field}
                                disabled={needToFillCompanyInfo}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="invoiceDetail.buyerAddress"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium"
                              tooltip="Nhập địa chỉ đầy đủ của đơn vị, bao gồm số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố."
                            >
                              Địa chỉ
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder=""
                                {...field}
                                disabled={needToFillCompanyInfo}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="invoiceDetail.buyerBudgetRelationUnitCode"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium"
                              tooltip="Mã đơn vị quan hệ ngân sách nhà nước"
                            >
                              Mã ĐVQHNS
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder=""
                                {...field}
                                disabled={needToFillCompanyInfo}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-watermelon-100" />
                  <div className="text-lg font-bold text-watermelon-100">
                    Thông tin người mua
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="invoiceDetail.buyerName"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium"
                              tooltip="Họ và  tên người mua hàng"
                            >
                              Tên người mua
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="invoiceDetail.buyerEmail"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium"
                              tooltip="Địa chỉ email người mua hàng"
                            >
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="invoiceDetail.buyerPhoneNumber"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium"
                              tooltip="Số điện thoại người mua hàng"
                            >
                              Số điện thoại
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="invoiceDetail.buyerPassportNumber"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium"
                              tooltip="Số hộ chiếu người mua hàng"
                            >
                              Số hộ chiếu
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear sticky bottom-0 bg-transparent z-10">
              <Button
                className="w-full md:w-auto md:max-w-md text-base font-medium bg-watermelon-100"
                type="submit"
              >
                Xem trước
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default PassioInvoiceEditPage
