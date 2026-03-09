import { forgetPassword } from '@/store/actions/auth-action';
import { ForgetPasswordProps } from '@/types/auth-type';
import { PUBLIC_PATH } from '@/utils/constant';
import { useRouter } from "next/navigation";
import React, { useRef, useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'sonner';
import Loader from '../ui/loader';
import { MoveUpRight } from 'lucide-react';

const EmailForm = ({ form, setForm, setStep }: Readonly<ForgetPasswordProps>) => {
    const router = useRouter();
    const [forceUpdate, setForceUpdate] = useState(0);
    const [loading, setLoading] = useState(false);

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

    const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validator.allValid()) {
            setLoading(true);

            const res = await forgetPassword({ email: form.email })
            if (res?.success) {
                toast.success(res?.message);
                setStep(2)
            } else {
                toast.error(res?.message);
            }
            setLoading(false);
        } else {
            validator.showMessages();
            setForceUpdate((prev) => prev + 1);
        }
    }

    const handleCancel = () => {
        router.push(PUBLIC_PATH.LOGIN)
    }

    return (
        <div className="flex flex-col justify-center px-6 py-8  sm:py-0 items-center w-full ">
            <div className="flex flex-col w-full sm:w-[420px] max-w-full">
                <div className="mb-6 sm:mb-10">
                    <h2 className="font-semibold mb-2 sm:mb-3 text-[24px] sm:text-[32px] leading-[100%] text-[#166470]">
                        Forgot password
                    </h2>
                    <p className="text-[14px] sm:text-[15px] leading-[140%] text-[#525F69]">
                        Enter the email associated with your account
                    </p>
                </div>

                <form
                    className="flex flex-col gap-6 sm:gap-8"
                    autoComplete="off"
                    onSubmit={handleContinue}
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

                    <div className="flex flex-col sm:flex-row  gap-3 sm:gap-4 mt-3">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full flex-1 sm:w-auto text-white text-[18px] sm:text-[20px] 
                        font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 
                        bg-[#009CA6] py-3 sm:py-3.5 px-6 sm:px-8 rounded-lg disabled:opacity-50 
                        disabled:cursor-not-allowed">
                            Continue
                            {
                                loading ? (<Loader size='sm' />) :
                                    <MoveUpRight className='w-[20px] sm:w-[24px]' />
                            }
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full flex-1 sm:w-auto text-[#009CA6] text-[18px] sm:text-[20px] font-bold hover:bg-[#009CA6]/5 transition-all flex items-center justify-center gap-2 border-2 border-[#009CA6] py-3 sm:py-3.5 px-6 sm:px-8 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EmailForm;
