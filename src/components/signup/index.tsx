"use client";
import { useState } from "react";
import { SignupInput } from "@/src/types/auth-type";
import EmailVerify from "./VerifyStep";
import SignupStep from "./SignupStep";

const defaultForm = {
    first_name: "",
    last_name: "",
    email: "",
    department: "",
    password: "",
};

const Signup = () => {

    const [form, setForm] = useState<SignupInput>(defaultForm);
    const [step, setStep] = useState(1);

    return (
        <>
            {step == 1 && <SignupStep setStep={setStep} form={form} setForm={setForm} />}
            {step == 2 && <EmailVerify email={form.email} password={form.password} />}
        </>
    );
};

export default Signup;