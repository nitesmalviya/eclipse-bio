import { forgetPassword } from "@/store/actions/auth-action";
import { ForgetPasswordProps } from "@/types/auth-type";
import { MoveUpRight } from "lucide-react";
import { ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "sonner";
import Loader from "../ui/loader";

const EmailVerify = ({ form, setForm, setStep }: Readonly<ForgetPasswordProps>) => {
    const [, forceUpdate] = useState(0);
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [resendLoading, setResendLoading] = useState(false);

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

    const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = code.join("");
        if (validator.allValid()) {
            setForm({ ...form, reset_token: verificationCode });
            setStep(3);
        } else {
            validator.showMessages();
            forceUpdate((prev) => prev + 1);
        }
    };

    const handleResendCode = async () => {
        // Reset code
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        setResendLoading(true);

        const res = await forgetPassword({ email: form.email });
        if (res?.success) {

            toast.success(res?.message);
            setStep(2);
        } else {
            toast.error(res?.message);
        }
        setResendLoading(false);
    };
    return (
        (
            <div className="flex flex-col justify-center px-6 py-8 sm:py-12 items-center w-full">
                <div className="flex flex-col w-full sm:max-w-[420px] max-w-full">
                    <div className="mb-6 sm:mb-10">
                        <h2 className="font-semibold mb-2 sm:mb-3 text-[24px] sm:text-[32px] leading-[100%] text-[#166470]">
                            Enter verification code
                        </h2>
                        <p className="text-[14px] sm:text-[15px] leading-[140%] text-[#525F69] whitespace-normal md:whitespace-nowrap md:overflow-visible overflow-hidden md:text-ellipsis ">
                            A 6-digit code has been sent to {form?.email || "your email."}
                        </p>
                    </div>

                    <form onSubmit={handleSignUp} className="flex flex-col gap-6 sm:gap-8">
                        {/* 6-Digit Code Input */}
                        <div className="flex  sm:gap-3  gap-2 justify-center">
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
                            {validator.message("code", code.join(""), "required|min:6|max:6", {
                                messages: {
                                    required: "Please enter the 6-digit verification code.",
                                    min: "Verification code must be 6 digits.",
                                    max: "Verification code must be 6 digits.",
                                },
                            })}
                        </div>

                        {/* Resend Code Link */}
                        <div className=" flex  sm:flex-row flex-col justify-between items-center gap-3">
                            {/* Sign Up Button */}
                            <button
                                disabled={resendLoading}
                                type="submit"
                                className=" text-white text-[18px] sm:text-[20px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 bg-[#009CA6] py-3 sm:py-3.5  px-4 sm:px-6 rounded-lg mt-3 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Verify
                                <MoveUpRight className="w-[20px] sm:w-[24px]" />
                            </button>
                            <button
                                disabled={resendLoading}
                                type="button"
                                onClick={handleResendCode}
                                className="flex items-center font-semibold text-[16px] sm:text-[20px] text-[#009CA6] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span> Resend code</span>{" "}
                                {resendLoading ? <Loader size="sm" className="ml-2" /> : ""}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default EmailVerify;