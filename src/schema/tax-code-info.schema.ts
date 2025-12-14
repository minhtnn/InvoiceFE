import z from "zod";

export const TaxCodeInfoSchema = z.object({
    "taxCode": z.string().max(50),
    "fullName": z.string().max(200).optional(),
    "status": z.string().max(50).optional(),
    "addressLine": z.string().max(200).optional(),
    "cityCode": z.string().max(50).optional(),
    "districtCode": z.string().max(50).optional(),
    "wardsCode": z.string().max(50).optional(),
    "reason": z.string().max(200).optional(),
})
export type TTaxCodeInfoResponse = z.infer<typeof TaxCodeInfoSchema>;