import { apiRequest } from "@/lib/http";
import { API_SUFFIX } from "./util.api";
import type { BaseResponse } from "@/types/response.type";
import type { TInvoiceRequest } from "@/schema/invoice.schema";
import type { TTaxCodeInfoResponse } from "@/schema/tax-code-info.schema";

const getTaxCodeInfo = async (taxCode: string) => {

    return await apiRequest.passioInvoice.get<BaseResponse<TTaxCodeInfoResponse>>(`${API_SUFFIX.INVOICE}/tax-code/${taxCode}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const createInvoice = async (data: TInvoiceRequest) =>
    await apiRequest.passioInvoice.post<BaseResponse<string>>(`${API_SUFFIX.INVOICE}`, data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        });


export const invoiceApi = {
    getTaxCodeInfo,
    createInvoice,
};