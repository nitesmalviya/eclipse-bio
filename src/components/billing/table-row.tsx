import { formatDateUTC } from "@/utils/graphql/common-service";
import StatusBadge from "../ui/status-badge";
import { BillingItem } from "@/types/billing";

interface TableRowProps {
    paymentItem: BillingItem;
}

export default function TableRow({
    paymentItem
}: TableRowProps) {
    return (
        <tr
            className="group border-b border-[#E5E5E5] last:border-b-0 hover:bg-[#F9FBFB] transition-colors"
        >
            <td className="px-2 py-5 text-[15px] sm:text-[16px] text-[#202024] font-normal">
                {paymentItem.description}
            </td>
            <td className="px-2 py-5 text-[15px] sm:text-[16px] text-[#202024]">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: paymentItem.currency || 'USD' }).format(paymentItem.amount)}
            </td>
            <td className="px-2 py-5 text-[15px] sm:text-[16px] text-[#202024]">
                <StatusBadge status={paymentItem.status} />
            </td>
            <td className="px-2 py-5 text-[15px] sm:text-[16px] text-[#202024]">
                {formatDateUTC(paymentItem.date)}
            </td>
            <td className="px-2 py-5">
                {
                    paymentItem.pdfUrl && (
                        <a href={paymentItem.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <img
                                src="/assets/images/download.png"
                                alt="download"
                                className="w-[22px] h-[22px]"
                            />
                        </a>

                    )
                }

            </td>
        </tr>
    );
}
