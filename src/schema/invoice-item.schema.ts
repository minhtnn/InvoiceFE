import z from "zod";

export const InvoiceItemSchema = z.object({
    "ordinalNumber": z.number().min(1),
    "code": z.string().max(50).optional(),
    "name": z.string().max(100),
    "quantity": z.number().min(0).optional(),
    "property": z.string().max(100),
    "unit": z.string().max(50).optional(),
    "unitPrice": z.number().min(0).optional(),
    "discountRate": z.number().min(0).optional(),
    "discountAmount": z.number().min(0).optional(),
    "amountWithoutDiscount": z.number().min(0).optional(),
    "amount": z.number().min(0),
    "taxAmount": z.number().min(0).optional(),
    "amountAfterTax": z.number().min(0).optional(),
    "tax": z.string().max(50).optional(),
});
export type TInvoiceItemResponse = z.infer<typeof InvoiceItemSchema>;