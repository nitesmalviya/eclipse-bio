import { PAGINATION_LIMIT } from "@/src/utils/constant"

export interface BillingItem {
    id: string;
    number: string;
    date: string;
    amount: number;
    currency: string;
    status: string;
    description: string;
    type: string;
    pdfUrl: string | null;
    hostedUrl: string | null;
}

export interface GetTransactionsInput {
    limit: number;
    page: number;
    search: string | null;
    sortBy: string;
    sort: string;
}

export interface GetPaymentHistoryResponse {
    success: boolean;
    message: string;
    payments: BillingItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface paginationType {
    page: number;
    limit: number;
    search: string;
}

export const DEFAULT_PAGINATION: paginationType = {
    page: PAGINATION_LIMIT.PAGE,
    limit: PAGINATION_LIMIT.LIMIT,
    search: "",
};
