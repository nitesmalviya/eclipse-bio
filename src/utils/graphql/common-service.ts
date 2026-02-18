"use client";
import { toast } from "sonner";
import { BehaviorSubject } from "rxjs";
import { SORT_ORDER } from "@/src/utils/constant";

// for global loader service
export const isLoading = new BehaviorSubject<boolean>(false);

export const isDialogOpen = new BehaviorSubject<any>({
  open: false,
  data: { message: "Are you Sure?", title: "" },
  cancelText: "Cancel",
  confirmText: "Okay",
  onConfirm: () => { },
});

export const forSuccess = (message: string, id?: string) =>
  toast.success(message, { id: id });

export const forError = (message: string, id?: string) =>
  toast.error(message, { id: id });

export const forWarning = (message: string, id?: string) =>
  toast(message, { id: id, icon: "⚠️" });

// Debounce utility function
export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 1000,
): DebouncedFunction<T> => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: Parameters<T>): void {
    const context = this as unknown;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};

/**
 * Common sorting function for arrays of objects.
 * @param data Array of objects to sort
 * @param key Key to sort by
 * @param sortOrder 'asc' or 'desc'
 * @returns Sorted array
 */
export const handleSort = <T>(
  data: T[],
  key: keyof T | null | undefined,
  sortOrder: "ASC" | "DESC",
): T[] => {
  return [...data].sort((a, b) => {
    const valA = key ? (a as any)[key] : a;
    const valB = key ? (b as any)[key] : b;

    if (valA === valB) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    let comparison = 0;
    if (typeof valA === "string" && typeof valB === "string") {
      comparison = valA.localeCompare(valB);
    } else {
      comparison = valA < valB ? -1 : 1;
    }

    return sortOrder === SORT_ORDER.ASC ? comparison : -comparison;
  });
};


export type DateFormat =
  | "DD/MM/YYYY"
  | "DD MMM YYYY"
  | "YYYY-MM-DD"
  | "DD MMM YYYY, hh:mm A";

//displays date in UTC on ui
export function formatDateUTC(
  date: string | Date | null | undefined,
  format: DateFormat = "DD/MM/YYYY",
): string {
  if (!date) return "--";

  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "--";

  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();

  const monthShort = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    timeZone: "UTC",
  }).format(d);

  const hours24 = d.getUTCHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");
  const ampm = hours24 >= 12 ? "PM" : "AM";

  switch (format) {
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;

    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;

    case "DD MMM YYYY":
      return `${day} ${monthShort} ${year}`;

    case "DD MMM YYYY, hh:mm A":
      return `${day} ${monthShort} ${year}, ${String(hours12).padStart(
        2,
        "0",
      )}:${minutes} ${ampm}`;

    default:
      return `${day}/${month}/${year}`;
  }
}

// send date to server in UTC ISO format
export const formatToUTCISO = (date: Date | null) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

/**
 * Get status badge styling based on status value
 * @param status - The status string (succeeded, failed, pending, etc.)
 * @returns Object with background and text color classes
 */
export const getStatusBadge = (status: string) => {
  const statusLower = (status || "").toLowerCase();

  // Success states - Green
  if (["succeeded", "success", "paid", "completed"].includes(statusLower)) {
    return {
      bgColor: "bg-[#E6F6F4]",
      textColor: "text-[#009CA6]",
      label: status,
    };
  }

  // Failed states - Red
  if (["failed", "failure", "rejected", "cancelled", "canceled"].includes(statusLower)) {
    return {
      bgColor: "bg-[#FFEBEB]",
      textColor: "text-[#EF4444]",
      label: status,
    };
  }

  // Pending states - Orange
  if (["pending", "processing", "in_progress", "awaiting"].includes(statusLower)) {
    return {
      bgColor: "bg-[#FFF8E6]",
      textColor: "text-[#F59E0B]",
      label: status,
    };
  }

  // Default - Gray
  return {
    bgColor: "bg-gray-100",
    textColor: "text-gray-600",
    label: status,
  };
};
