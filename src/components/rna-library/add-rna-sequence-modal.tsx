"use client";

import { X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import SelfAmplifyingRNAUploadStep from "./self-amplifying-rna-upload-step";
import CircularRNAUploadStep from "./circular-rna-upload-step";
import LinearMRNAQuestionStep from "./linear-mrna-question-step";

interface AddRNASequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    rnaName: string;
    rnaType: string;
    sequence?: string;
    file?: File;
  }) => void;
}

export default function AddRNASequenceModal({
  isOpen,
  onClose,
  onSubmit,
}: AddRNASequenceModalProps) {

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/10  backdrop-brightness-60"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[850px] bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-8 sm:right-6  p-[0.5px] hover:bg-gray-100 rounded-full transition-colors border-2 border-[#95A3AB] rounded-full"
          aria-label="Close modal"
        >
          <X className="w-[14px] h-[14px] text-[#95A3AB] " />
        </button>
        {/* Step 1: RNA Name and Type */}
        <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#166470] mb-6">
          Add RNA sequence
        </h2>

        {/* Section 1: RNA Name */}
        <div className="mb-8">
          <h3 className="text-[16px] sm:text-[20px] font-normal text-[#166470] mb-4">
            Enter a unique name for this RNA sequence
          </h3>

          <div className="relative">
            <label
              htmlFor="rna-name"
              className="block text-[14px] font-semibold text-[#009CA6] mb-2"
            >
              RNA Name <span className="text-[#009CA6]">*</span>
            </label>
            <input
              id="rna-name"
              type="text"

              placeholder=""
              className="w-full px-0 py-2 text-[16px] text-[#525F69] border-0 border-b-2 border-[#009CA6] focus:outline-none focus:border-[#009CA6] bg-transparent"
            />
          </div>
        </div>

        {/* Section 2: RNA Type */}
        <div className="mb-8">
          <h3 className="text-[16px] sm:text-[20px] font-normal text-[#166470] mb-4">
            What type of RNA are you adding?
          </h3>

          <div className="space-y-3">

            <button className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all  `}>

              <div className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center transition-all `}>
                <div className="w-3 h-3 rounded-full bg-[#009CA6]" />
              </div>
              <span
                className={`text-[20px]  `}
              >
                sdf
              </span>
            </button>

          </div>
        </div>

        {/* Continue Button */}
        <button
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-[18px] font-semibold transition-all">
          Continue
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
