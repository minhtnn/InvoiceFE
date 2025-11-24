import z from "zod";

export const InvoiceDetailSchema = z.object({
    "receiptCode": z.string().max(50).optional(),
    "buyerCustomerCode": z.string().max(50).optional(),
    "buyerTaxCode": z.string().max(50).optional(),
    "buyerName": z.string().max(100).optional(), // Tên người mua
    "buyerAddress": z.string().max(200).optional(),
    "buyerFullName": z.string().max(100).optional(), // Tên đơn vị
    "buyerPhoneNumber": z.string().regex(/^[+]?[\d\s()-]{7,20}$/).optional(),
    "buyerEmail": z.string().email().max(100).optional(),
    "buyerIdNumber": z.string().max(20).optional(),
    "buyerPassportNumber": z.string().max(20).optional(),
    "buyerBudgetRelationUnitCode": z.string().max(50).optional(),
    "buyerBankName": z.string().max(100).optional(),
    "buyerBankAccountNumber": z.string().max(50).optional(),
    "discount": z.boolean().optional(),
    "invoiceNote": z.string().max(200).optional(),
    "internalNote": z.string().max(200).optional(),
    "sellerStoreName": z.string().max(100).optional(),
    "sellerStoreCode": z.string().max(50).optional(),
    "totalAmountWithoutDiscount": z.number().min(0).optional(),
    "totalDiscountAmount": z.number().min(0).optional(),
    "totalAmount": z.number().min(0).optional(),
    "totalTaxAmount": z.number().min(0).optional(),
    "totalFeeAmount": z.number().min(0).optional(),
    "totalAmountAfterTax": z.number().min(0).optional(),
    "totalPaymentInWords": z.string().max(500).optional(),
    "branchCode": z.string().max(50).optional(),
    "isPetrolInvoice": z.boolean().optional(),
    "warehouseAddress": z.string().max(200).optional(),
    "isSendMail": z.boolean().optional(),
    "financialLeasingInvoice": z.boolean().optional(),
    "createdBy": z.string().max(50).optional(),
});

export type TInvoiceDetailResponse = z.infer<typeof InvoiceDetailSchema>;