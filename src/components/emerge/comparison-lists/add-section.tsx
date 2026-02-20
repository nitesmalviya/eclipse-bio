import Image from "next/image";

interface AddNewSectionProps {
  readonly setIsModalOpen: (value: boolean) => void;
}

export default function AddNewSection({ setIsModalOpen }: AddNewSectionProps) {
  return (
    <button
      className="h-12 bg-[#009ca6] text-white rounded-lg px-6 border-none flex items-center justify-center sm:justify-start gap-2 font-manrope font-bold text-base cursor-pointer hover:bg-[#007d85] transition-colors w-full sm:w-auto"
      onClick={() => setIsModalOpen(true)}
    >
      <Image src="/assets/svgs/add-circle.svg" alt="+" width={16} height={16} />
      New comparison
    </button>
  );
}
