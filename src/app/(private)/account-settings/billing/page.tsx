import Billing from "@/components/billing";
import { DEFAULT_PAGINATION } from "@/types/billing";
import { SORT_ORDER } from "@/utils/constant";
import { getPaymentHistoryAction } from "@/utils/graphql/billing/action";

const BillingPage = async () => {
    const res = await getPaymentHistoryAction({
        page: DEFAULT_PAGINATION.page,
        limit: DEFAULT_PAGINATION.limit,
        search: null,
        sort: SORT_ORDER.DESC,
        sortBy: "date",
    })

    return (
        <Billing paymentHistory={res} />
    )
}
export default BillingPage