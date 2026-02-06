"use client";

import { FormRegularInput } from "@/components/generals/forms/form-regular-input";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { Button } from "@/components/shadcn/ui/button";
import { Label } from "@/components/shadcn/ui/label";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Page() {
    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            message: "",
        },
    });

    const handleSubmit = (data: any) => {
        console.log("Form data : ", data);
    };

    return (
        <section className="w-full h-auto">
            <div className="w-full h-[400px] bg-purple-600"></div>
            <div className="w-full max-w-7xl mx-auto py-18">
                <div className="w-full flex gap-12 py-16">
                    <div className="w-full grid grid-cols-2 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-auto flex border border-gray-400 rounded-full p-4">
                                <MapPin className="w-10 h-10" />
                            </div>
                            <div className="w-auto">
                                <span>Loremp Ipsum Sit Dolor Amet</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-auto flex border border-gray-400 rounded-full p-4">
                                <Mail className="w-10 h-10" />
                            </div>
                            <div className="w-auto">
                                <span>Loremp Ipsum Sit Dolor Amet</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-auto flex border border-gray-400 rounded-full p-4">
                                <Phone className="w-10 h-10" />
                            </div>
                            <div className="w-auto">
                                <span>Loremp Ipsum Sit Dolor Amet</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-auto flex border border-gray-400 rounded-full p-4">
                                <Clock className="w-10 h-10" />
                            </div>
                            <div className="w-auto">
                                <span>Loremp Ipsum Sit Dolor Amet</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <WrapperForms
                            form={form}
                            onSubmitFunction={handleSubmit}
                            className="w-full flex flex-col gap-8"
                        >
                            <div className="w-full flex gap-4">
                                <Label className="text-xl uppercase">
                                    Contact Us
                                </Label>
                            </div>
                            <div className="w-full flex gap-4">
                                <FormRegularInput
                                    form={form}
                                    name="firstname"
                                    labelName={"Firstname"}
                                    className={"w-full"}
                                    propsInput={{ className: "w-full" }}
                                    propsFormItem={{ className: "w-full" }}
                                />

                                <FormRegularInput
                                    form={form}
                                    name="lastname"
                                    labelName={"Lastname"}
                                    className={"w-full"}
                                    propsInput={{ className: "w-full" }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                            </div>

                            <div className="w-full flex gap-4">
                                <FormRegularInput
                                    form={form}
                                    name="email"
                                    labelName={"Email"}
                                    className={"w-full"}
                                    propsInput={{ className: "w-full" }}
                                    propsFormItem={{ className: "w-full" }}
                                />

                                <FormRegularInput
                                    form={form}
                                    name="phonenumber"
                                    labelName={"Phonenumber"}
                                    className={"w-full"}
                                    propsInput={{ className: "w-full" }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                            </div>

                            <div className="w-full flex gap-4">
                                <FormRegularInput
                                    form={form}
                                    name="message"
                                    labelName={"Message"}
                                    className={"w-full"}
                                    propsInput={{ className: "w-full" }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                            </div>

                            <div className="w-full flex gap-4">
                                <Button
                                    className="w-full cursor-pointer"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </WrapperForms>
                    </div>
                </div>
            </div>
            <div className="w-full h-[500px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666307543373!2d106.82458402498996!3d-6.1754083438119896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1770365209180!5m2!1sid!2sid"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
}
