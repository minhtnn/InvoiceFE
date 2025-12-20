import z from "zod";
import { InvoiceDetailSchema } from "./invoice-detail.schema";
import { InvoiceItemSchema } from "./invoice-item.schema";
import { InvoiceTaxTypeSchema } from "./invoice-tax-type.schema";

export const InvoiceSchema = z.object({
    "orderId": z.number().nullable(),
    "invoiceCode": z.string().max(50).optional(),
    "lookupCode": z.string().max(50).optional(),
    "type": z.string().max(50),
    "status": z.string().max(50).optional(),
    "paymentMethod": z.string().max(50).optional(),
    "currencyUnit": z.string().max(3).optional(),     
    "currencyExchangeRate": z.number().optional(),
    "totalAmountWithoutDiscount": z.number().min(0),
    "totalDiscountAmount": z.number().min(0),
    "totalAmount": z.number().min(0),
    "totalTaxAmount": z.number().min(0),
    "totalAmountAfterTax": z.number().min(0),
    "billCode": z.string().max(50).optional(),
    "templateCode": z.string().optional(),
    "partnerCode": z.string(),
    "storeCode": z.string().max(50),
    "invoiceDetail": InvoiceDetailSchema,
    "items": z.array(InvoiceItemSchema),
    "taxTypes": z.array(InvoiceTaxTypeSchema),
});

export type TInvoiceRequest = z.infer<typeof InvoiceSchema>;
