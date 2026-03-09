"use client";
import { useState } from "react";
import Image from "next/image";
import BrandLogo from "../../../public/assets/images/app-logo.png"
import { ForgetPasswordForm } from "@/types/auth-type";
import EmailForm from "./email-form";
import EmailVerify from "./email-verify";
import NewPassword from "./new-password";
import PasswordSuccessPage from "./password-reset-success";

const defaultForm: ForgetPasswordForm = {
    email: "",
    new_password: "",
    confirm_password: "",
    reset_token: "",
};

const ForgotPassword = () => {
    const [form, setForm] = useState<ForgetPasswordForm>(defaultForm);
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen   bg-linear-to-br from-[#F9FBFB] via-[#F9FBFB] to-[#D9F2F4]">
            {/* Header */}
            <header className="flex items-center justify-between w-full h-[80px] sm:h-[100px] p-[16px] sm:p-[24px] sm:pl-[100px] sm:pr-8 mx-auto bg-white/80 border border-white">
                <div className="flex items-center">
                    <Image
                        src={BrandLogo}
                        alt="Eclipse Bio Logo"
                        className="object-contain w-[140px] h-[28px] sm:w-[250px] sm:h-[48px]"
                    />
                </div>
                <button className="w-auto sm:w-[122px] h-[36px] sm:h-[43px] px-4 sm:px-6 py-2 sm:py-4 rounded-lg bg-[#009CA6] text-white font-semibold hover:opacity-90 transition-opacity text-xs sm:text-sm flex justify-center items-center">
                    Contact Us
                </button>
            </header>
            {/* Main Content */}
            <main className="flex items-center justify-center py-8 sm:pt-20 sm:pb-10 px-4" >
                <div className="bg-white flex flex-col sm:flex-row overflow-hidden w-full max-w-[1240px]  rounded-3xl shadow-[0px_4px_50px_0px_rgba(84,110,116,0.08)] ">
                    {/* Left Side - Video (Hidden on mobile, shown on desktop) */}
                    <div className="relative w-full sm:max-w-[620px] h-[200px] sm:h-[600px] hidden sm:block">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-2xl rounded-r-none opacity-50"
                        >
                            <source src="/assets/videos/molecula-.mp4" type="video/mp4" />
                        </video>
                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(255, 255, 255, 0) 11.46%, rgba(255, 255, 255, 0.75) 76.07%, rgba(255, 255, 255, 0) 102.83%)",
                                backgroundColor: "#009CA670",
                                mixBlendMode: "screen",
                            }}
                        />
                    </div>

                    {/* Mobile Video/Image - Shown only on mobile */}
                    <div className="relative w-full h-[220px] sm:hidden overflow-hidden rounded-t-3xl">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-50"
                        >
                            <source src="assets/videos/signin-video.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {step === 1 && (
                        <EmailForm form={form} setForm={setForm} setStep={setStep} />
                    )}
                    {step === 2 && (
                        <EmailVerify form={form} setForm={setForm} setStep={setStep} />
                    )}
                    {step === 3 && (
                        <NewPassword form={form} setForm={setForm} setStep={setStep} />
                    )}
                    {step === 4 && (
                        <PasswordSuccessPage />
                    )}


                </div>
            </main>
        </div>
    );
};

export default ForgotPassword;