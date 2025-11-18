import z from "zod";

export const InvoiceTaxTypeSchema = z.object({
    "tax": z.string().max(50),
    "amountWithoutTax": z.number().min(0),
    "taxAmount": z.number().min(0),
});

export type TInvoiceTaxType = z.infer<typeof InvoiceTaxTypeSchema>;