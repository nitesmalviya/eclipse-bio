"use client";
import React from "react";
import SectionHeader from "./section-header";
import TableSwitcher from "./table-switcher";
import { useRouter } from "next/navigation";

interface TableSectionProps {
    title: string;
    buttonText: string;
    buttonPath: string;
    tabs: string[];
    activeTab: number;
    setActiveTab: (idx: number) => void;
    children: React.ReactNode;
}

const TableSection = ({
    title,
    buttonText,
    buttonPath,
    tabs,
    activeTab,
    setActiveTab,
    children,
}: TableSectionProps) => {
    const router = useRouter();

    return (
        <div className="w-full mb-12 md:mb-16">
            {(title || buttonText) && (
                <SectionHeader
                    title={title}
                    buttonText={buttonText}
                    onButtonClick={() => router.push(buttonPath)}
                />
            )}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <TableSwitcher
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {children}
            </div>
        </div>
    );
};

export default TableSection;
