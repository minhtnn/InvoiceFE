import { apiRequest } from "@/lib/http";
import { API_SUFFIX } from "./util.api";
import type { BaseResponse } from "@/types/response.type";
import type { TInvoiceRequest } from "@/schema/invoice.schema";

const createInvoice = async (data: TInvoiceRequest) =>
    await apiRequest.passioInvoice.post<BaseResponse<string>>(`${API_SUFFIX.INVOICE}`, data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        });


export const invoiceApi = {
    createInvoice,
};