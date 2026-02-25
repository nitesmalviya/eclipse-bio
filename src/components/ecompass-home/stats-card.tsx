import Image from "next/image";
import { useRouter } from "next/navigation";

interface StatsCardProps {
   readonly iconPath: string;
   readonly label?: string;
   readonly description: string;
   readonly buttonText: string;
   readonly buttonLink: string;
   readonly stats: {iconPath: string, label: string, value: string |number, id: number|string}[];
    
}


export default function StatsCard({ iconPath, label, description, buttonText, buttonLink, stats}: StatsCardProps) {
    const router = useRouter();
    return (
      <div className="w-full lg:w-[400px] flex flex-col">
        {/* Logo */}
        <div className="w-full h-[72px] flex items-center justify-center mt-10 mb-6">
          <img
            src={iconPath}
            alt={label || ""}
         
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Description */}
        <p className="font-titillium font-normal text-sm leading-5 text-[#525F69] m-0 mt-15 mb-8">
          {description}
        </p>

        {/* Stats */}
        <div className="flex flex-col gap-5 mb-8">
          {stats?.map((stat ) => (
            <div key={stat.id} className="flex items-center gap-4">
              <div className="w-[60px] h-[60px] rounded-full border border-[#E6EFF5] bg-[#F7F9FB] flex items-center justify-center shrink-0">
                <Image
                  src={stat.iconPath}
                  alt={stat.label}
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex-1 flex justify-between items-center gap-10">
                <span className="font-titillium font-semibold text-2xl leading-none text-center text-[#009ca6]">
                  {stat.label}
                </span>
                <span className="font-titillium font-semibold text-2xl leading-none text-center text-[#202024]">
                  {stat.value ?? "--"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          className="w-full h-[52px] flex items-center justify-center gap-3 py-4 px-6 rounded-lg bg-[#009ca6] border-none cursor-pointer hover:bg-[#008891] transition-colors mt-auto"
          onClick={() => router.push(buttonLink)}
        >
          <span className="font-manrope font-bold text-base leading-5 text-[#ffffff]">
            {buttonText}
          </span>
          <Image
            src="/assets/svgs/send.svg"
            alt="Send"
            width={18}
            height={18}
          />
        </button>
      </div>
    );
}