
"use server";

import { fetchGraphQLQuery } from "../../index";
import { GET_PAYMENT_HISTORY_QUERY } from "./query";
import { GetTransactionsInput, GetPaymentHistoryResponse } from "@/types/billing/index";

export const getPaymentHistoryAction = async (input: GetTransactionsInput) => {
    try {
        const response = await fetchGraphQLQuery<{ getPaymentHistory: GetPaymentHistoryResponse }, { input: GetTransactionsInput }>(
            GET_PAYMENT_HISTORY_QUERY,
            { input }
        );
        return response.getPaymentHistory;
    } catch (error) {
        console.error("Error fetching payment history:", error);
        throw error;
    }
};