"use client";
import { useState, useRef } from "react";
import { Eye, EyeOff, Loader, MoveUpRight } from "lucide-react";
import SimpleReactValidator from "simple-react-validator";
import { signup } from "@/src/store/actions/auth-action";
import brandLogo from "../../../public/assets/images/app-logo.png"
import { useAppDispatch } from "../../store/hooks";
import { toast } from "sonner";
import { SignupInput } from "@/src/types/auth-type";


type Props = {
    readonly form: SignupInput;
    readonly setForm: (form: SignupInput) => void;
    readonly setStep: (step: number) => void;
};

const SignupStep = ({ setStep, form, setForm }: Props) => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);

    const validatorRef = useRef(
        new SimpleReactValidator({
            className: "text-[13px] sm:text-[14px] font-semibold text-[#F4364C] mt-1",
        }),
    );
    const validator = validatorRef.current;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (validator.allValid()) {
            setLoading(true);
            try {
                const res = await dispatch(signup(form));
                if (res?.success) {
                    toast.success(res?.message);
                    setStep(2)
                } else {
                    toast.error(res?.message);
                }
            } catch (error) {
                console.log(error, "Something went wron")
            } finally {
                setLoading(false);
            }

        } else {
            validator.showMessages();
            setForceUpdate((prev) => prev + 1);
        }


    }




    return (
        <div className="min-h-screen  bg-linear-to-br from-[#F9FBFB] via-[#F9FBFB] to-[#D9F2F4]">
            {/* Header */}
            <header className="flex items-center justify-between w-full h-[80px] sm:h-[100px] p-[16px] sm:p-[24px] sm:pl-[100px] sm:pr-8 mx-auto bg-white/80 border border-white">
                <div className="flex items-center">
                    <img
                        src={brandLogo}
                        alt="Eclipse Bio Logo"
                        className="object-contain w-[140px] h-[28px] sm:w-[250px] sm:h-[48px]"
                    />
                </div>
                <button className="w-auto sm:w-[122px] h-[36px] sm:h-[43px] px-4 sm:px-6 py-2 sm:py-4 rounded-lg bg-[#009CA6] text-white font-semibold hover:opacity-90 transition-opacity text-xs sm:text-sm flex justify-center items-center">
                    Contact Us
                </button>
            </header>
            {/* Main Content */}
            <main className="flex items-center justify-center py-8 sm:pt-20 sm:pb-10 px-4">
                <div className="bg-white flex flex-col sm:flex-row overflow-hidden w-full max-w-[1240px]  rounded-3xl shadow-[0px_4px_50px_0px_rgba(84,110,116,0.08)]">
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
                            <source src="/assets/videos/molecula-.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* Right Side - Signup Form */}
                    <div className="flex flex-col justify-center px-10 py-8  sm:py-12 items-center w-full ">
                        <div className="flex flex-col w-full sm:w-[420px] max-w-full">
                            <div className="mb-6 sm:mb-10">
                                <h2 className="font-semibold mb-2 sm:mb-3 text-[24px] sm:text-[32px] leading-[100%] text-[#166470]">
                                    Join Mike on eCOMPASS
                                </h2>
                                <p className="text-[14px] sm:text-[15px] leading-[140%] text-[#525F69]">
                                    Welcome to eCOMPASS - Let's create your account
                                </p>
                            </div>

                            <form
                                className="flex flex-col gap-6 sm:gap-8"
                                autoComplete="off"
                                onSubmit={handleSignUp}
                            >
                                <div className="relative shadow-[0_4px_50px_0_#546E7414]">
                                    <label
                                        htmlFor="first_name"
                                        className={`block text-[13px] sm:text-[14px] font-semibold leading-5 px-0 sm:px-4 mb-2 text-[#009CA6]`}
                                    >
                                        First name
                                    </label>
                                    <input
                                        value={form.first_name}
                                        onChange={handleChange}
                                        autoComplete="first_name"
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        className="w-full bg-transparent border-b-2 border-[#009ca2] text-[16px] sm:text-[18px] text-[#525F69] focus:ring-0 focus:border-[#009ca2] p-0 pb-2 placeholder:text-[#B0B0B0] outline-none transition-colors px-0 sm:px-4"
                                        placeholder="First name"
                                    />
                                    {validator.message("first_name", form.first_name, "required|min:2|max:50")}

                                </div>
                                <div className="relative shadow-[0_4px_50px_0_#546E7414]">
                                    <label
                                        htmlFor="last_name"
                                        className={`block text-[13px] sm:text-[14px] font-semibold leading-5 px-0 sm:px-4 mb-2 text-[#009CA6]`}
                                    >
                                        Last name
                                    </label>
                                    <input
                                        value={form.last_name}
                                        onChange={handleChange}
                                        autoComplete="last_name"
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        className="w-full bg-transparent border-b-2 border-[#009ca2] text-[16px] sm:text-[18px] text-[#525F69] focus:ring-0 focus:border-[#009ca2] p-0 pb-2 placeholder:text-[#B0B0B0] outline-none transition-colors px-0 sm:px-4"
                                        placeholder="Last name"
                                    />
                                    {validator.message("last_name", form.last_name, "required|min:2|max:50")}

                                </div>
                                {/* Email Field */}
                                <div className="relative shadow-[0_4px_50px_0_#546E7414]">
                                    <label
                                        htmlFor="email"
                                        className={`block text-[13px] sm:text-[14px] font-semibold leading-5 px-0 sm:px-4 mb-2 text-[#009CA6]`}
                                    >
                                        Email
                                    </label>
                                    <input
                                        value={form.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="w-full bg-transparent border-b-2 border-[#009ca2] text-[16px] sm:text-[18px] text-[#525F69] focus:ring-0 focus:border-[#009ca2] p-0 pb-2 placeholder:text-[#B0B0B0] outline-none transition-colors px-0 sm:px-4"
                                        placeholder="Email"
                                    />
                                    {validator.message("email", form.email, "required|email")}

                                </div>
                                <div className="relative shadow-[0_4px_50px_0_#546E7414]">
                                    <label
                                        htmlFor="email"
                                        className={`block text-[13px] sm:text-[14px] font-semibold leading-5 px-0 sm:px-4 mb-2 text-[#009CA6]`}
                                    >
                                        Institution
                                    </label>
                                    <input
                                        value={form.department}
                                        onChange={handleChange}
                                        autoComplete="department"
                                        id="department"
                                        name="department"
                                        type="text"
                                        className="w-full bg-transparent border-b-2 border-[#009ca2] text-[16px] sm:text-[18px] text-[#525F69] focus:ring-0 focus:border-[#009ca2] p-0 pb-2 placeholder:text-[#B0B0B0] outline-none transition-colors px-0 sm:px-4"
                                        placeholder="Institution"
                                    />
                                    {validator.message("department", form.department, "required|min:2|max:50")}

                                </div>

                                {/* Password Field */}
                                <div className="relative shadow-[0_4px_50px_0_#546E7414]">
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className={`block text-[13px] sm:text-[14px] font-semibold leading-5 px-0 sm:px-4 mb-2 text-[#009CA6]`}
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                value={form.password}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                                maxLength={30}
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                className="w-full bg-transparent border-b-2 border-[#009ca2] text-[16px] sm:text-[18px] text-[#525F69] focus:ring-0 focus:border-[#009ca2] p-0 pb-2 placeholder:text-[#B0B0B0] outline-none transition-colors px-0 sm:px-4"
                                                placeholder="Password"
                                            />

                                        </div>
                                        {validator.message("password", form.password, "required|min:6|max:30")}
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute right-0 sm:right-4 top-[32px] sm:top-[34px] flex items-center"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-[#009ca2]" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-[#009ca2]" />
                                        )}

                                    </button>

                                </div>

                                {/* Terms and conditions note */}
                                <div className="text-center mt-1">
                                    <p className="text-[12px] sm:text-[13px] text-[#525F69]">
                                        By signing up, you agree to our Terms of Service and Privacy Policy
                                    </p>
                                </div>

                                {/* Continue Button */}
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full text-white text-[18px] sm:text-[20px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 bg-[#009CA6] py-3 sm:py-3.5 rounded-lg mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue
                                    {loading ? (
                                        <Loader size="sm" className="w-2 h-2" />
                                    ) : (
                                        <MoveUpRight className="w-[20px] sm:w-[24px]" />
                                    )}
                                </button>


                            </form>
                        </div>
                    </div>
                </div>
            </main >
        </div>
    );
};

export default SignupStep;