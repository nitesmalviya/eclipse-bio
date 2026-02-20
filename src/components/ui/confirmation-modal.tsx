"use client";

import React, { useEffect } from "react";
import { X, AlertTriangle, Info, CheckCircle, HelpCircle } from "lucide-react";

interface ConfirmationModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly title: string;
  readonly description: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly variant?: "danger" | "warning" | "info" | "success" | "question";
  readonly loading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
  loading = false,
}: ConfirmationModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const iconMap: Record<string, React.ReactNode> = {
    danger: <AlertTriangle className="w-8 h-8 text-[#EB5757]" />,
    warning: <AlertTriangle className="w-8 h-8 text-[#EB5757]" />,
    success: <CheckCircle className="w-8 h-8 text-[#27AE60]" />,
    question: <HelpCircle className="w-8 h-8 text-[#009CA6]" />,
    info: <Info className="w-8 h-8 text-[#009CA6]" />,
  };

  const buttonStyleMap: Record<string, string> = {
    danger: "bg-[#EB5757] hover:bg-[#D44040]",
    warning: "bg-[#009CA6] hover:opacity-90",
    success: "bg-[#009CA6] hover:opacity-90",
    question: "bg-[#009CA6] hover:opacity-90",
    info: "bg-[#009CA6] hover:opacity-90",
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-100">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-[#166470]/20 backdrop-brightness-50 w-full h-full cursor-default"
        onClick={loading ? undefined : onClose}
        onKeyDown={(e) => {
          if (!loading && (e.key === "Enter" || e.key === " ")) onClose();
        }}
        aria-label="Close backdrop"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[700px] bg-white rounded-3xl shadow-[0px_4px_50px_0_rgba(84,110,116,0.15)] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors border-2 border-[#95A3AB]/30 disabled:opacity-50"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-[#95A3AB]" />
        </button>

        {/* Content */}
        <div className="px-6 py-10 sm:px-10 flex flex-col items-center text-center">
          {/* Icon Circle */}
          <div className="mb-6 p-4 rounded-full bg-gray-50 flex items-center justify-center">
            {iconMap[variant]}
          </div>

          <h2 className="text-[24px] sm:text-[28px] font-semibold text-[#166470] mb-3 leading-tight">
            {title}
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#525F69] leading-relaxed mb-8">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row w-full gap-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3.5 border-2 border-[#009CA6] text-[#009CA6] rounded-xl text-[16px] sm:text-[18px] font-bold hover:bg-[#F0FAFB] transition-all disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 px-6 py-3.5 text-white rounded-xl text-[16px] sm:text-[18px] font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${buttonStyleMap[variant]}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
