"use client";
import { useState, useRef } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import SimpleReactValidator from "simple-react-validator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/src/store/actions/auth-action";
import Image from "next/image";
import BrandLogo from "../../../public/assets/images/app-logo.png"
import { useAppDispatch } from "../../store/hooks";
import { PRIVATE_PATH, PUBLIC_PATH } from "@/src/utils/constant";
import { toast } from "sonner";
import { SignInInput } from "@/src/types/auth-type";

const defaultForm = {
    email: "adityagourh+112@bitcot.com",
    password: "Bitcot@123"
}

const Login = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<SignInInput>(defaultForm);

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

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        debugger
        if (validator.allValid()) {
            setLoading(true);
            const res = await dispatch(
                login({ email: form.email, password: form.password }),
            );
            if (res?.success) {
                toast.success(res?.message);
                router.replace(PRIVATE_PATH.ECOMPASS_HOME)
            } else {
                toast.error(res?.message);
            }
            setLoading(false);
        } else {
            validator.showMessages();
            setForceUpdate((prev) => prev + 1);
        }

    }




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

                    {/* Right Side - Login Form */}
                    <div className="flex flex-col justify-center px-6 py-8  sm:py-0 items-center w-full ">
                        <div className="flex flex-col w-full sm:w-[420px] max-w-full">
                            <div className="mb-6 sm:mb-10">
                                <h2 className="font-semibold mb-2 sm:mb-3 text-[24px] sm:text-[32px] leading-[100%] text-[#166470]">
                                    Welcome Back
                                </h2>
                                <p className="text-[14px] sm:text-[15px] leading-[140%] text-[#525F69]">
                                    Enter your email and password to access your account
                                </p>
                            </div>

                            <form
                                className="flex flex-col gap-6 sm:gap-8"
                                autoComplete="off"
                                onSubmit={handleSignIn}
                            >
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
                                                className="w-full bg-transparent border-b-2 border-[#009ca2] text-[16px] sm:text-[18px] text-[#525F69] focus:ring-0 focus:border-[#009ca2] p-0 pb-2 pr-10 placeholder:text-[#B0B0B0] outline-none transition-colors px-0 sm:px-4"
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

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-end mt-1">

                                    <Link
                                        href={PUBLIC_PATH.FORGOT_PASSWORD}
                                        className="font-semibold text-[14px] sm:text-[15px] text-[#009CA6] hover:underline"
                                    >
                                        Forgot Password
                                    </Link>
                                </div>

                                {/* Sign In Button */}
                                <button

                                    type="submit"
                                    className={`w-full text-white text-[18px] sm:text-[20px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 bg-[#009CA6] py-3 sm:py-3.5 rounded-lg mt-3 
                                        ${loading ? "opacity-50 cursor-not-allowed disabled" : ""}`}
                                >
                                    {loading ? (<Loader2 className="h-5 w-5 animate-spin text-white" />) : null}
                                    Sign In

                                </button>

                                {/* Contact Us Link */}
                                <div className="text-center mt-4 sm:mt-6">
                                    <p className="font-medium text-[15px] sm:text-[16px] text-[#166470]">
                                        Don't have an account? {" "}
                                        <Link

                                            href={PUBLIC_PATH.SIGNUP}
                                            className="font-bold underline text-[#009CA6]"
                                        >
                                            Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main >
        </div>
    );
};

export default Login;