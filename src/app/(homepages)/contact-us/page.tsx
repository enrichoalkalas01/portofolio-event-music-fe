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
            {/* Hero Section */}
            <div className="w-full h-[400px] bg-gradient-to-r from-purple-700 to-purple-500 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
                    <p className="text-xl max-w-2xl mx-auto px-4">
                        Kami siap membantu mewujudkan event musik impian Anda.
                        Jangan ragu untuk menghubungi kami!
                    </p>
                </div>
            </div>

            {/* Contact Info & Form Section */}
            <div className="w-full max-w-7xl mx-auto py-18">
                <div className="w-full flex gap-12 py-16">
                    {/* Contact Information */}
                    <div className="w-full grid grid-cols-2 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-auto flex border border-gray-400 rounded-full p-4">
                                <MapPin className="w-10 h-10 text-purple-600" />
                            </div>
                            <div className="w-auto">
                                <h3 className="font-semibold text-lg">Alamat</h3>
                                <span className="text-gray-600">
                                    Jl. Sudirman No. 123, Jakarta Pusat
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-auto flex border border-gray-400 rounded-full p-4">
                                <Mail className="w-10 h-10 text-purple-600" />
                            </div>
                            <div className="w-auto">
                                <h3 className="font-semibold text-lg">Email</h3>
                                <span className="text-gray-600">
                                    info@eventmusic.id
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-auto flex border border-gray-400 rounded-full p-4">
                                <Phone className="w-10 h-10 text-purple-600" />
                            </div>
                            <div className="w-auto">
                                <h3 className="font-semibold text-lg">Telepon</h3>
                                <span className="text-gray-600">
                                    +62 21 1234 5678
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-auto flex border border-gray-400 rounded-full p-4">
                                <Clock className="w-10 h-10 text-purple-600" />
                            </div>
                            <div className="w-auto">
                                <h3 className="font-semibold text-lg">Jam Operasional</h3>
                                <span className="text-gray-600">
                                    Senin - Jumat: 09:00 - 18:00
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full">
                        <WrapperForms
                            form={form}
                            onSubmitFunction={handleSubmit}
                            className="w-full flex flex-col gap-8"
                        >
                            <div className="w-full flex flex-col gap-2">
                                <Label className="text-2xl font-bold">
                                    Kirim Pesan
                                </Label>
                                <p className="text-gray-600">
                                    Isi form di bawah ini dan tim kami akan segera menghubungi Anda.
                                </p>
                            </div>
                            <div className="w-full flex gap-4">
                                <FormRegularInput
                                    form={form}
                                    name="firstname"
                                    labelName={"Nama Depan"}
                                    className={"w-full"}
                                    propsInput={{ className: "w-full" }}
                                    propsFormItem={{ className: "w-full" }}
                                />

                                <FormRegularInput
                                    form={form}
                                    name="lastname"
                                    labelName={"Nama Belakang"}
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
                                    labelName={"Nomor Telepon"}
                                    className={"w-full"}
                                    propsInput={{ className: "w-full" }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                            </div>

                            <div className="w-full flex gap-4">
                                <FormRegularInput
                                    form={form}
                                    name="message"
                                    labelName={"Pesan"}
                                    className={"w-full"}
                                    propsInput={{ className: "w-full" }}
                                    propsFormItem={{ className: "w-full" }}
                                />
                            </div>

                            <div className="w-full flex gap-4">
                                <Button
                                    className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700"
                                    type="submit"
                                >
                                    Kirim Pesan
                                </Button>
                            </div>
                        </WrapperForms>
                    </div>
                </div>
            </div>

            {/* Google Maps Section */}
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
