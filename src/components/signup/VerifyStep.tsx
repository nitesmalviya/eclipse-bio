"use client";

import {
    useState,
    useRef,
    KeyboardEvent,
    ClipboardEvent,
} from "react";
import { Loader, MoveUpRight } from "lucide-react";
import SimpleReactValidator from "simple-react-validator";
import { useRouter } from "next/navigation";
import { PRIVATE_PATH } from "@/utils/constant";
import { resendOtpSignup, verifyEmail } from "@/store/actions/auth-action";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";

type Props = {
    readonly email: string;
    readonly password: string;
};

function EmailVerify({ email, password }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [, forceUpdate] = useState(0);
    const [resendLoading, setResendLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const validatorRef = useRef(
        new SimpleReactValidator({
            className: "text-[13px] sm:text-[14px] font-semibold text-[#F4364C] mt-1",
        }),
    );

    const validator = validatorRef.current;

    const handleChange = (index: number, value: string) => {
        // Only allow single digit
        if (value.length > 1) {
            value = value.slice(-1);
        }

        // Only allow numbers
        if (value && !/^\d$/.test(value)) {
            return;
        }

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);

        if (!/^\d+$/.test(pastedData)) {
            return;
        }

        const newCode = [...code];
        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newCode[i] = pastedData[i];
        }

        setCode(newCode);

        // Focus the next empty input or the last one
        const nextEmptyIndex = newCode.findIndex((digit) => !digit);
        if (nextEmptyIndex === -1) {
            inputRefs.current[5]?.focus();
        } else {
            inputRefs.current[nextEmptyIndex]?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verification_code = code.join("");
        if (validator.allValid()) {
            setLoading(true);
            const res = await dispatch(
                verifyEmail({ email, password, verification_code }),
            );
            if (res?.success) {
                toast.success(res?.message);
                router.replace(PRIVATE_PATH.ECOMPASS_HOME);
            } else {
                toast.error(res?.message);
            }
            setLoading(false);
        } else {
            validator.showMessages();
            forceUpdate((prev) => prev + 1);
        }
    }

    const handleResendCode = async () => {
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        setResendLoading(true);
        const res = await resendOtpSignup(email);
        if (res?.success) {
            toast.success(res?.message);
        } else {
            toast.error(res?.message);
        }
        setResendLoading(false);
    };


    return (
        <div className="min-h-screen flex flex-col  bg-linear-to-br from-[#F9FBFB] via-[#F9FBFB] to-[#D9F2F4]">
            {/* Header */}
            <header className="flex items-center justify-between w-full h-[80px] sm:h-[100px] p-[16px] sm:p-[24px] sm:pl-[100px] sm:pr-8 mx-auto bg-white/80 border border-white">
                <div className="flex items-center">
                    <img
                        src="/assets/images/app-logo.png"
                        alt="Eclipse Bio Logo"
                        className="object-contain w-[140px] h-[28px] sm:w-[250px] sm:h-[48px]"
                    />
                </div>
                <button className="w-auto sm:w-[122px] h-[36px] sm:h-[43px] px-4 sm:px-6 py-2 sm:py-4 rounded-lg bg-[#009CA6] text-white font-semibold hover:opacity-90 transition-opacity text-xs sm:text-sm flex justify-center items-center">
                    Contact Us
                </button>
            </header>

            {/* Main Content */}
            <main className="flex flex-1  justify-center h-full py-8 sm:pt-20 sm:pb-10 px-4">
                <div className="bg-white flex flex-col justify-center  sm:flex-row overflow-hidden w-full max-w-[1240px] rounded-3xl shadow-[0px_4px_50px_0px_rgba(84,110,116,0.08)] h-[450px] ">
                    {/* Left Side - Video with Overlays (Hidden on mobile, shown on desktop) */}
                    <div className="relative w-full hidden sm:block overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover "
                            style={{ mixBlendMode: "luminosity" }}
                        >
                            <source src="/assets/videos/molecula-.mp4" type="video/mp4" />
                        </video>

                        <div className="absolute inset-0 bg-[#FFFFFF80] opacity-90"></div>
                        <div className="absolute inset-0 bg-[#009CA670]  opacity-40"></div>
                    </div>
                    {/* Mobile Video - Shown only on mobile */}
                    <div className="relative w-full h-[220px] sm:hidden overflow-hidden rounded-t-3xl">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="/assets/videos/molecula-.mp4" type="video/mp4" />
                        </video>

                        <div className="absolute inset-0 bg-[#FFFFFF80] opacity-90"></div>
                        <div className="absolute inset-0 bg-[#009CA670]  opacity-40"></div>
                    </div>

                    {/* Right Side - 2FA Form */}
                    <div className="flex flex-col justify-center px-6 py-8 sm:py-12 items-center w-full">
                        <div className="flex flex-col w-full sm:max-w-[420px] max-w-full">
                            <div className="mb-6 sm:mb-10">
                                <h2 className="font-semibold mb-2 sm:mb-3 text-[24px] sm:text-[32px] leading-[100%] text-[#166470]">
                                    Enter verification code
                                </h2>
                                <p className="text-[14px] sm:text-[15px] leading-[140%] text-[#525F69]">
                                    Enter the 6-digit code from your authenticator.
                                </p>
                            </div>

                            <form
                                onSubmit={handleVerify}
                                className="flex flex-col gap-6 sm:gap-8"
                            >
                                {/* 6-Digit Code Input */}
                                <div className="flex gap-2 sm:gap-3 justify-center">
                                    {code.map((digit, index) => (
                                        <input
                                            key={index + 1}
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            className={`w-[45px] h-[45px]   sm:w-[60px] sm:h-[60px]
                                                text-center text-[20px] sm:text-[24px] font-semibold
                                                text-[#166470] rounded-lg transition-all
                                                focus:outline-none focus:ring-2 focus:ring-[#009CA6]
                                                ${digit ? "border-2 border-[#009CA6]" : "border border-[#98B4BC]"}
                                            `}
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>
                                <div className="text-center">
                                    {validator.message(
                                        "code",
                                        code.join(""),
                                        "required|min:6|max:6",
                                        {
                                            messages: {
                                                required: "Please enter the 6-digit verification code.",
                                                min: "Verification code must be 6 digits.",
                                                max: "Verification code must be 6 digits.",
                                            },
                                        },
                                    )}
                                </div>

                                {/* Resend Code Link */}
                                <div className=" flex  sm:flex-row flex-col justify-between items-center gap-3">
                                    {/* Sign Up Button */}
                                    <button
                                        disabled={loading || resendLoading}
                                        type="submit"
                                        className=" text-white text-[18px] sm:text-[20px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 bg-[#009CA6] py-3 sm:py-3.5  px-4 sm:px-6 rounded-lg mt-3 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Sign Up
                                        {loading ? (
                                            <Loader size="sm" className="h-2 w-2" />
                                        ) : (
                                            <MoveUpRight className="w-[20px] sm:w-[24px]" />
                                        )}
                                    </button>
                                    <button
                                        disabled={resendLoading || loading}
                                        type="button"
                                        onClick={handleResendCode}
                                        className="flex items-center font-semibold text-[16px] sm:text-[20px] text-[#009CA6] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span> Resend code</span>{" "}
                                        {resendLoading ? <Loader size="sm" className="ml-2 h-2 h-2" /> : ""}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EmailVerify
