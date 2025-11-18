import { SyncStatusSchema } from "@/types/enums/sync-status.enum";
import { z } from "zod";
import { PassioOrderDetailSchema } from "./passio-order-detail.schema";

export const PassioOrderSchema = z.object({
    "id": z.string().uuid(),
    "rentId": z.number().nullable(),
    "invoicePassioId": z.string().uuid().nullable(),
    "finalAmount": z.number().min(0),
    "totalAmount": z.number().min(0),
    "discountOrderDetail": z.number().min(0),
    "discount": z.number().min(0),
    "checkOutDate": z.string().datetime(),
    "storeCode": z.string(),
    "createdDate": z.string().datetime(),
    "invoiceGuid": z.string().uuid(),
    "storeName": z.string().max(100),
    "addressLine": z.string().max(200),
    "syncStatus": SyncStatusSchema,
    "passioOrderDetailResponses": z.array(PassioOrderDetailSchema)
});

export type TPassioOrderResponse = z.infer<typeof PassioOrderSchema>;