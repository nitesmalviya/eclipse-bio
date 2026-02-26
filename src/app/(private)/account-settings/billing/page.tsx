import Billing from "@/src/components/billing";
import { DEFAULT_PAGINATION } from "@/src/types/billing";
import { SORT_ORDER } from "@/src/utils/constant";
import { getPaymentHistoryAction } from "@/src/utils/graphql/billing/action";

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