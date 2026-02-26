import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    className,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

   

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 3; i++) pages.push(i);
                pages.push("ellipsis");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("ellipsis");
                for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push("ellipsis");
                pages.push(currentPage);
                pages.push("ellipsis");
                pages.push(totalPages);
            }
        }

        return pages.map((page, index) => {
            if (page === "ellipsis") {
                return (
                    <span
                        key={`ellipsis-${index}`}
                        className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </span>
                );
            }

            return (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className={cn(
                        "h-9 w-9",
                        currentPage === page
                            ? "bg-[#009CA6] hover:bg-[#008a93] text-white disabled:opacity-100"
                            : "text-[#525F69] border-gray-200"
                    )}
                    onClick={() => onPageChange(page as number)}
                    disabled={currentPage === page}
                >
                    {page}
                </Button>
            );
        });
    };

    return (
        <div className={cn("flex items-center justify-end space-x-2 py-4", className)}>
            <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-gray-200 text-[#525F69]"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
            </Button>

            {renderPageNumbers()}

            <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-gray-200 text-[#525F69]"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
            </Button>
        </div>
    );
}
