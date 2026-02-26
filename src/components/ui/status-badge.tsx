import { getStatusBadge } from "@/utils/common-service";

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const badge = getStatusBadge(status);

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block ${badge.bgColor} ${badge.textColor}`}
        >
            {badge.label}
        </span>
    );
}
