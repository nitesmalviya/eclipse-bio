"use client";

import { createContactUsAction } from "@/utils/graphql/contact/action";
import { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "sonner";
import Loader from "../ui/loader";

interface ContactForm {
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    message: string;
}

const defaultFormData = {
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
}

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ContactForm>(defaultFormData);
    const [_, forceUpdate] = useState(0); // Forcing re-render for validator    

    const validatorRef = useRef(
        new SimpleReactValidator({
            className: "text-red-500 text-sm mt-1",
        })
    );
    const validator = validatorRef.current;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validator.allValid()) {
            try {
                setLoading(true);
                const res = await createContactUsAction({
                    variables: {
                        input: formData,
                    }
                });
                if (res?.contactUs?.success) {
                    toast.success(res.contactUs.message || "Message sent successfully!");
                    setFormData(defaultFormData);
                    validator.hideMessages();
                    forceUpdate(prev => prev + 1);
                } else {
                    toast.error("Failed to send message. Please try again later.");
                }
            } catch (error) {
                toast.error("An error occurred while sending your message. Please try again later.");
            } finally {
                setLoading(false);
            }

        } else {
            validator.showMessages();
            forceUpdate((prev) => prev + 1);
            toast.error("Please fix the errors in the form before submitting.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F9FBFB] via-[#F9FBFB] to-[#D9F2F4] px-4 sm:px-6 md:px-10 lg:px-20  flex items-center justify-center">
            <div className="w-full  mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="flex flex-col gap-6 text-center lg:text-left">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#009CA6] leading-tight mb-4">Contact Us</h1>
                        <p className="text-base sm:text-lg text-[#525F69] leading-relaxed max-w-xl mx-auto lg:mx-0">Not sure what you need? The team at Eclipsebio will be happy to listen to you and suggest solutions you hadn't considered.</p>
                    </div>
                    <div className="flex flex-col gap-4 mt-4 items-center lg:items-start">
                        <div className="flex items-center gap-3 text-[#525F69]">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail w-5 h-5 text-[#009CA6]" aria-hidden="true">
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                </svg>
                            </div>
                            <span className="text-base sm:text-lg break-all">info@eclipsebio.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#525F69]">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-phone w-5 h-5 text-[#009CA6]" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                                </svg>
                            </div>
                            <span className="text-base sm:text-lg">Support: +1 (503) 488-2206</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#166470] mb-2">We'd love to hear from you!</h2>
                        <p className="text-sm sm:text-base text-[#525F69]">Our team is here to help.</p>
                    </div>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                        autoComplete="off">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-semibold text-[#009CA6] mb-2">First Name</label>
                            <input
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                onBlur={() => validator.showMessageFor("first_name")}
                                className="w-full border-b-2 border-[#009ca2] text-base sm:text-lg text-[#525F69] pb-2 outline-none"
                                placeholder="First Name"
                            />
                            {validator.message("first_name", formData.first_name, "required|min:2")}
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-semibold text-[#009CA6] mb-2">Last Name</label>
                            <input
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                onBlur={() => validator.showMessageFor("last_name")}
                                className="w-full border-b-2 border-[#009ca2] text-base sm:text-lg text-[#525F69] pb-2 outline-none"
                                placeholder="Last Name"
                            />
                            {validator.message("last_name", formData.last_name, "required|alpha")}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-[#009CA6] mb-2">Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={() => validator.showMessageFor("email")}
                                className="w-full border-b-2 border-[#009ca2] text-base sm:text-lg text-[#525F69] pb-2 outline-none"
                                placeholder="Email"
                                type="email"
                            />
                            {validator.message("email", formData.email, "required|email")}
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-semibold text-[#009CA6] mb-2">Subject</label>
                            <input
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                onBlur={() => validator.showMessageFor("subject")}
                                className="w-full border-b-2 border-[#009ca2] text-base sm:text-lg text-[#525F69] pb-2 outline-none"
                                placeholder="Subject"
                            />
                            {validator.message("subject", formData.subject, "required")}
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-[#009CA6] mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={() => validator.showMessageFor("message")}
                                rows={4}
                                className="w-full border-b-2 border-[#009ca2] text-base sm:text-lg text-[#525F69] pb-2 outline-none resize-none"
                                placeholder="Type your message here"

                            ></textarea>
                            {validator.message("message", formData.message, "required")}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto min-w-[180px] bg-[#009CA6] text-white text-base sm:text-lg font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                            {
                                loading ? (<Loader size="sm" />) : "Send Message"
                            }

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-up-right w-5" aria-hidden="true">
                                <path d="M13 5H19V11"></path><path d="M19 5L5 19"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;