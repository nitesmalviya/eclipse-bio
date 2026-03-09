"use client";

import { Eye, EyeOff, MoveUpRight } from "lucide-react";
import Loader from "../ui/loader";
import { FormEvent, useRef, useState } from "react";
import { ForgetPasswordProps } from "@/types/auth-type";
import SimpleReactValidator from "simple-react-validator";
import { ResetPassword } from "@/store/actions/auth-action";
import { toast } from "sonner";

const NewPassword = ({ form, setForm, setStep }: Readonly<ForgetPasswordProps>) => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [forceUpdate, setForceUpdate] = useState(0)

    const validatorRef = useRef(
        new SimpleReactValidator({
            className: "text-[13px] sm:text-[14px] font-semibold text-[#F4364C] mt-1",
        }),
    )

    const validator = validatorRef.current;

    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validator.allValid()) {
            setLoading(true)

            let res = await ResetPassword(form);
            debugger
            if (res?.success) {
                toast.success(res?.message);
                setStep(4);
            } else {
                toast.error(res?.message);
                setStep(1);
            }
            setLoading(false);
        } else {
            validator.showMessages()
            setForceUpdate((prev) => prev + 1);
        }
    }

    return (
        <div className="flex flex-col justify-center px-6 py-8 sm:py-12 items-center w-full">
            <div className="flex flex-col w-full sm:w-[420px] max-w-full">
                <div className="mb-6 sm:mb-10">
                    <h2 className="font-semibold mb-2 sm:mb-3 text-[24px] sm:text-[32px] leading-[100%] text-[#166470]">
                        Create new password
                    </h2>
                    <p className="text-[14px] sm:text-[15px] leading-[140%] text-[#525F69]">
                        Enter your new password below to complete the reset process
                    </p>
                </div>

                <form
                    onSubmit={handleResetPassword}
                    className="flex flex-col gap-6 sm:gap-8"
                >
                    {/* New Password Field */}
                    <div className="relative shadow-[0_4px_50px_0_#546E7414]">
                        <div>
                            <label
                                htmlFor="new_password"
                                className="block text-[13px] sm:text-[14px] font-semibold leading-5 px-0 sm:px-4 mb-2 text-[#009CA6]"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="new_password"
                                    name="new_password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={form.new_password}
                                    onChange={(e) => {
                                        setForm({ ...form, new_password: e.target.value });
                                        validator.showMessageFor("new_password");
                                    }}
                                    onBlur={() => validator.showMessageFor("new_password")}
                                    className="w-full bg-transparent border-b-2 border-[#009ca2] text-[16px] sm:text-[18px] text-[#525F69] focus:ring-0 focus:border-[#009ca2] p-0 pb-2 pr-10 placeholder:text-[#B0B0B0] outline-none transition-colors px-0 sm:px-4"
                                    placeholder="New Password"
                                />
                                {validator.message(
                                    "new_password",
                                    form.new_password,
                                    "required|min:8",
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="absolute right-0 sm:right-4 bottom-2 flex items-center"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? (
                                <EyeOff className="h-5 w-5 text-[#009ca2]" />
                            ) : (
                                <Eye className="h-5 w-5 text-[#009ca2]" />
                            )}
                        </button>
                    </div>


                    {/* Confirm Password Field */}
                    <div className="relative shadow-[0_4px_50px_0_#546E7414]">
                        <div>
                            <label
                                htmlFor="confirm_password"
                                className="block text-[13px] sm:text-[14px] font-semibold leading-5 px-0 sm:px-4 mb-2 text-[#009CA6]"
                            >
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={form.confirm_password}
                                    onChange={(e) => {
                                        setForm({ ...form, confirm_password: e.target.value });
                                        validator.showMessageFor("confirm_password");
                                    }}
                                    onBlur={() => validator.showMessageFor("confirm_password")}
                                    className="w-full bg-transparent border-b-2 border-[#009ca2] text-[16px] sm:text-[18px] text-[#525F69] focus:ring-0 focus:border-[#009ca2] p-0 pb-2 pr-10 placeholder:text-[#B0B0B0] outline-none transition-colors px-0 sm:px-4"
                                    placeholder="Confirm Password"
                                />
                                {validator.message(
                                    "confirm_password",
                                    form.confirm_password,
                                    `required|in:${form.new_password}`,
                                    {
                                        messages: {
                                            in: "Passwords must match.",
                                        },
                                    },
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="absolute right-0 sm:right-4 bottom-2 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5 text-[#009ca2]" />
                            ) : (
                                <Eye className="h-5 w-5 text-[#009ca2]" />
                            )}
                        </button>
                    </div>

                    {/* Reset Password Button */}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-white text-[18px] sm:text-[20px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 bg-[#009CA6] py-3 sm:py-3.5 rounded-lg mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Reset password
                        {loading ? <Loader size="sm" /> : <MoveUpRight className="w-[20px] sm:w-[24px]" />}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewPassword;
