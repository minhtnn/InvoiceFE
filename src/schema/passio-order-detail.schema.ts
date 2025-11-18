import { z } from "zod"

export const PassioOrderDetailSchema = z.object({
    "id": z.string().uuid(),
    "productCode": z.string(),
    "productName": z.string(),
    "unitPrice": z.number().min(0),
    "quantity": z.number().min(0),
    "orderDate": z.string().datetime(),
    // "orderId": z.string().uuid(),
});

export type TPassioOrderDetailResponse = z.infer<typeof PassioOrderDetailSchema>;