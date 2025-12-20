import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatCurrency } from '@/lib/utils'
import { type TInvoiceRequest } from '@/schema/invoice.schema'
import { Building, FileText, User } from 'lucide-react'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  invoiceData: TInvoiceRequest
  storeName: string
  storeAddress: string
  onConfirm: () => void
  disabledButton: boolean
}

export const InvoicePreviewDialog = (props: Props) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="w-[90%] md:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-watermelon-100">
            Xem trước hóa đơn
          </DialogTitle>
          <DialogDescription>
            Vui lòng kiểm tra kỹ thông tin trước khi xuất hóa đơn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Thông tin cửa hàng */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-watermelon-100" />
              Thông tin người bán
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Cửa hàng:</strong> {props.storeName}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {props.storeAddress}
              </p>
            </div>
          </div>

          {/* Thông tin doanh nghiệp */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-watermelon-100" />
              Thông tin doanh nghiệp
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Mã số thuế:</p>
                <p className="font-medium break-words">
                  {props.invoiceData.invoiceDetail.buyerTaxCode ||
                    'Không có MST'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Tên đơn vị:</p>
                <p className="font-medium break-words">
                  {props.invoiceData.invoiceDetail.buyerFullName || 'N/A'}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">Địa chỉ:</p>
                <p className="font-medium break-words">
                  {props.invoiceData.invoiceDetail.buyerAddress || 'N/A'}
                </p>
              </div>
              {props.invoiceData.invoiceDetail.buyerBudgetRelationUnitCode && (
                <div>
                  <p className="text-muted-foreground">Mã ĐVQHNS:</p>
                  <p className="font-medium break-words">
                    {
                      props.invoiceData.invoiceDetail
                        .buyerBudgetRelationUnitCode
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Thông tin người mua */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-watermelon-100" />
              Thông tin người mua
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Tên người mua:</p>
                <p className="font-medium break-words">
                  {props.invoiceData.invoiceDetail.buyerName || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Email:</p>
                <p className="font-medium break-words">
                  {props.invoiceData.invoiceDetail.buyerEmail || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Số điện thoại:</p>
                <p className="font-medium break-words">
                  {props.invoiceData.invoiceDetail.buyerPhoneNumber || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Số hộ chiếu:</p>
                <p className="font-medium break-words">
                  {props.invoiceData.invoiceDetail.buyerPassportNumber || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin hóa đơn */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-watermelon-100" />
              Thông tin hóa đơn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Phương thức thanh toán:</p>
                <p className="font-medium">
                  {props.invoiceData.paymentMethod || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Chi tiết sản phẩm</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-10 dark:bg-neutral-800">
                  <tr>
                    <th className="p-2 text-left whitespace-nowrap">STT</th>
                    <th className="p-2 text-left min-w-[120px]">Tên SP</th>
                    <th className="p-2 text-center whitespace-nowrap">SL</th>
                    <th className="p-2 text-center whitespace-nowrap">ĐVT</th>
                    <th className="p-2 text-right whitespace-nowrap">Đơn giá</th>
                    <th className="p-2 text-right whitespace-nowrap">Thành tiền</th>
                    <th className="p-2 text-center whitespace-nowrap">Thuế</th>
                  </tr>
                </thead>
                <tbody>
                  {props.invoiceData.items.map((item) => (
                    <tr key={item.ordinalNumber} className="border-b">
                      <td className="p-2 whitespace-nowrap">{item.ordinalNumber}</td>
                      <td className="p-2">
                        <div className="max-w-[200px] truncate" title={item.name}>
                          {item.name}
                        </div>
                      </td>
                      <td className="p-2 text-center whitespace-nowrap">{item.quantity || 0}</td>
                      <td className="p-2 text-center whitespace-nowrap">{item.unit || 'N/A'}</td>
                      <td className="p-2 text-right whitespace-nowrap">
                        {formatCurrency(item.unitPrice || 0)}
                      </td>
                      <td className="p-2 text-right font-medium whitespace-nowrap">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="p-2 text-center whitespace-nowrap">{item.tax || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tổng kết */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Tổng kết</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span>Tổng tiền hàng (chưa VAT):</span>
                <span className="font-medium whitespace-nowrap">
                  {formatCurrency(props.invoiceData.totalAmountWithoutDiscount)}
                </span>
              </div>
              {props.invoiceData.totalDiscountAmount > 0 && (
                <div className="flex justify-between gap-4 text-red-600">
                  <span>Giảm giá:</span>
                  <span className="font-medium whitespace-nowrap">
                    -{formatCurrency(props.invoiceData.totalDiscountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <span>Tiền sau giảm giá:</span>
                <span className="font-medium whitespace-nowrap">
                  {formatCurrency(props.invoiceData.totalAmountWithoutDiscount - props.invoiceData.totalDiscountAmount)}
                </span>
              </div>
              {props.invoiceData.taxTypes.map((tax, index) => (
                <div key={index} className="flex justify-between gap-4">
                  <span>Thuế {tax.tax}:</span>
                  <span className="font-medium whitespace-nowrap">
                    {formatCurrency(tax.taxAmount)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between gap-4 pt-2 border-t-2 text-base font-bold text-watermelon-100">
                <span>Tổng thanh toán:</span>
                <span className="whitespace-nowrap">{formatCurrency(props.invoiceData.totalAmountAfterTax)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => props.onOpenChange(false)}
            disabled={props.disabledButton}
          >
            Quay lại chỉnh sửa
          </Button>
          <Button
            className="bg-watermelon-100 hover:bg-watermelon-100/90 text-white"
            onClick={props.onConfirm}
            disabled={props.disabledButton}
          >
            Xác nhận xuất hóa đơn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}