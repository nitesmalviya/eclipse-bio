"use client";
import { PRIVATE_PATH } from "@/src/utils/constant";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import ProfileSection from "./profile-section";

const AccountSettings = () => {
    const [confirmationModal, setConfirmationModal] = useState(false);

    const Setting_Page_Items = [

        {
            icon: "assets/svgs/setting-2.png",
            label: "Subscription Management",
            alt: "Subscription",
            href: PRIVATE_PATH.ACCOUNT_SETTINGS_SUBSCRIPTION_MANAGEMENT,
        },
        {
            icon: "assets/svgs/coin.png",
            label: "Purchase Credits",
            alt: "Credits",
            href: PRIVATE_PATH.ACCOUNT_SETTINGS_PURCHASE_CREDITS,
        },
        {
            icon: "assets/svgs/receipt-item.png",
            label: "Billing",
            alt: "Billing",
            href: PRIVATE_PATH.ACCOUNT_SETTINGS_BILLING,
        },
        {
            icon: "assets/svgs/message-question.png",
            label: "Get Help",
            alt: "Help",
            href: "#",
        },
        {
            icon: "assets/svgs/logout.png",
            label: "Log Out",
            alt: "Logout",
            // href: PUBLIC_PATH.LOGIN
            // ,
            onClick: () => setConfirmationModal(true),
        },
    ];

    return (
        <div className="min-h-screen  bg-linear-to-br from-[#F9FBFB] via-[#F9FBFB] to-[#D9F2F4] py-8 px-4 sm:px-6 lg:px-8 w-full">
            {/* Main Container */}
            <div className="mx-auto lg:px-20">
                {/* Page Title */}
                <h1 className="text-[32px] sm:text-[40px] font-semibold text-[#009CA6] mb-6 sm:mb-8">
                    Account Settings
                </h1>

                <ProfileSection />

                {/* Actions Card */}
                <div className="bg-white rounded-2xl shadow-[0px_4px_50px_0px_rgba(84,110,116,0.08)] p-6 sm:p-8">
                    <h3 className="text-[24px] sm:text-[30px] font-semibold text-[#009CA6] mb-6">
                        Actions
                    </h3>
                    <div className="space-y-1">
                        {Setting_Page_Items.map((action, index, array) => (
                            <Link
                                onClick={action?.onClick}
                                href={action?.href || "#"}
                                key={action.label}
                                className={`w-full flex items-center justify-between p-4 hover:bg-[#F9FBFB] transition-colors group cursor-pointer ${index === array.length - 1
                                    ? ""
                                    : "border-b-[0.5px] border-[#69A5AF]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={action.icon}
                                        alt={action.alt}
                                        className="w-[24px] h-[24px] sm:w-[24px] sm:h-[24px]"
                                    />
                                    <span className="text-[16px] sm:text-[24px] text-[#525F69] font-normal">
                                        {action.label}
                                    </span>
                                </div>
                                <ChevronRight className="w-[24px] h-[24px] text-[#98B4BC] group-hover:text-[#166470] transition-colors" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}


export default AccountSettings;