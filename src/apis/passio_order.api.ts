import { apiRequest } from "@/lib/http";
import type { TPassioOrderResponse } from "@/schema/passio-order.schema";
import { API_SUFFIX } from "./util.api";
import type { BaseResponse } from "@/types/response.type";
const getPassioOrderByCode = async (code: string) => 
    await apiRequest.passioInvoice.get<BaseResponse<TPassioOrderResponse>>(`${API_SUFFIX.PASSIO_ORDER}/${code}`);

export const passioOrderApi = {
    getPassioOrderByCode
};