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
      <DialogContent className="max-w-xl md:max-w-4xl  max-h-[90vh] overflow-y-auto">
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
          <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-900">
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
                <p className="font-medium">
                  {props.invoiceData.invoiceDetail.buyerTaxCode ||
                    'Không có MST'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Tên đơn vị:</p>
                <p className="font-medium">
                  {props.invoiceData.invoiceDetail.buyerFullName || 'N/A'}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">Địa chỉ:</p>
                <p className="font-medium">
                  {props.invoiceData.invoiceDetail.buyerAddress || 'N/A'}
                </p>
              </div>
              {props.invoiceData.invoiceDetail.buyerBudgetRelationUnitCode && (
                <div>
                  <p className="text-muted-foreground">Mã ĐVQHNS:</p>
                  <p className="font-medium">
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
                <p className="font-medium">
                  {props.invoiceData.invoiceDetail.buyerName || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Email:</p>
                <p className="font-medium">
                  {props.invoiceData.invoiceDetail.buyerEmail || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Số điện thoại:</p>
                <p className="font-medium">
                  {props.invoiceData.invoiceDetail.buyerPhoneNumber || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Số hộ chiếu:</p>
                <p className="font-medium">
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
              {/* <div>
                <p className="text-muted-foreground">Mã hóa đơn:</p>
                <p className="font-medium">
                  {props.invoiceData.invoiceDetail.receiptCode}
                </p>
              </div> */}
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
                <thead className="bg-neutral-100 dark:bg-neutral-800">
                  <tr>
                    <th className="p-2 text-left">STT</th>
                    <th className="p-2 text-left">Tên sản phẩm</th>
                    <th className="p-2 text-center">SL</th>
                    <th className="p-2 text-center">ĐVT</th>
                    <th className="p-2 text-right">Đơn giá</th>
                    <th className="p-2 text-right">Thành tiền</th>
                    <th className="p-2 text-center">Thuế</th>
                  </tr>
                </thead>
                <tbody>
                  {props.invoiceData.items.map((item) => (
                    <tr key={item.ordinalNumber} className="border-b">
                      <td className="p-2">{item.ordinalNumber}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 text-center">{item.quantity || 0}</td>
                      <td className="p-2 text-center">{item.unit || 'N/A'}</td>
                      <td className="p-2 text-right">
                        {formatCurrency(item.price || 0)}
                      </td>
                      <td className="p-2 text-right font-medium">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="p-2 text-center">{item.tax || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tổng kết */}
          <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-900">
            <h3 className="font-semibold text-lg mb-3">Tổng kết</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tổng tiền hàng (chưa VAT):</span>
                <span className="font-medium">
                  {formatCurrency(props.invoiceData.totalSaleAmount)}
                </span>
              </div>
              {props.invoiceData.totalDiscountAmount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Giảm giá:</span>
                  <span className="font-medium">
                    -{formatCurrency(props.invoiceData.totalDiscountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tiền sau giảm giá:</span>
                <span className="font-medium">
                  {formatCurrency(props.invoiceData.totalAmountWithoutTax)}
                </span>
              </div>
              {props.invoiceData.taxTypes.map((tax, index) => (
                <div key={index} className="flex justify-between">
                  <span>Thuế {tax.tax}:</span>
                  <span className="font-medium">
                    {formatCurrency(tax.taxAmount)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t-2 text-base font-bold text-watermelon-100">
                <span>Tổng thanh toán:</span>
                <span>{formatCurrency(props.invoiceData.totalAmount)}</span>
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
            className="bg-watermelon-100 hover:bg-watermelon-100/90"
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
