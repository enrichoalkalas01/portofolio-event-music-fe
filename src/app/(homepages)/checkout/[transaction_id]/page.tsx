"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreditCard, Truck, Check } from "lucide-react";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

// Components
import TransactionShippingInformmation from "@/components/transaction/transaction-shipping-information";
import TransactionReviewInformmation from "@/components/transaction/transaction-review-information";
import TransactionPaymentInformmation from "@/components/transaction/transaction-payment-information";
import TransactionOrderSummary from "@/components/transaction/transaction-order-summmary";
import TransactionCrumb from "@/components/transaction/transaction-crumb";
import TransactionHeader from "@/components/transaction/transaction-header";
import TransactionSkeletonCheckout from "@/components/transaction/transaction-skeleton-checkout";

// Others
import { fetcher } from "@/lib/fetcher";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";

const checkoutFormSchema = z.object({
    // States
    currentStep: z.number(),
    area_data: z.any().optional(),

    // Datas
    fulldata: z.any().optional(),
    selectedShipment: z.any().optional(),

    // Invoices
    subtotal: z.number().optional(),
    shipping_total: z.number().optional(),
    tax_total: z.number().optional(),
    total_payment: z.number().optional(),

    // User Informations
    firstname: z
        .string()
        .min(1, { message: "Nama depan wajib diisi" })
        .min(3, { message: "Nama depan minimal 3 karakter" }),

    lastname: z.string().optional(),

    email: z
        .string()
        .min(1, { message: "Email wajib diisi" })
        .email({ message: "Format email tidak valid" }),

    phonenumber: z
        .string()
        .min(1, { message: "Nomor telepon wajib diisi" })
        .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, {
            message: "Format nomor telepon tidak valid",
        }),

    address: z
        .string()
        .min(1, { message: "Alamat wajib diisi" })
        .min(10, { message: "Alamat minimal 10 karakter" }),

    city: z.string().min(1, { message: "Kota wajib diisi" }),
    state: z.string().min(1, { message: "Provinsi/Negara wajib diisi" }),
    zip_code: z
        .string()
        .min(1, { message: "Kode pos wajib diisi" })
        .regex(/^\d{5}$/, { message: "Kode pos harus 5 digit angka" }),
});

export default function Page() {
    const params = useParams();
    const session: any = useSession();
    const accessToken: any = session?.data?.user?.token?.access_token;

    const [crumb, setCrumb] = useState([
        { step: 1, label: "Shipping", icon: Truck },
        // { step: 2, label: "Payment", icon: CreditCard },
        { step: 3, label: "Review", icon: Check },
    ]);

    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

    const form = useForm({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            // States
            currentStep: 1,
            area_data: null,

            // Datas
            fulldata: null,
            selectedShipment: null,

            // Invoices
            subtotal: 0,
            shipping_total: 0,
            tax_total: 0,
            total_payment: 0,

            // User Informations
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            address: "",
            city: "",
            state: "indonesia",
            zip_code: "",
        },
    });

    const { data, isLoading, error } = useQuery<any>({
        enabled: !!accessToken && !!params?.transaction_id,
        queryKey: ["transaction-data"],
        queryFn: () =>
            fetcher<any>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${params?.transaction_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                        "X-GROUP-ID": "SWARNA_TACTICAL",
                    },
                },
            ),
    });

    useEffect(() => {
        if (data) {
            console.log("Full data:", data?.data);

            const totalPrice = data?.data?.total_price || 0;
            const shipmentPrice = data?.data?.shipments?.shipment_price || 0;
            const taxRate = data?.data?.calculated_price?.tax || 11;
            const taxTotal = Math.round((totalPrice * taxRate) / 100);
            const totalPayment = totalPrice + shipmentPrice + taxTotal;

            form.setValue("subtotal", totalPrice);
            form.setValue("shipping_total", shipmentPrice);
            form.setValue("tax_total", taxTotal);
            form.setValue("total_payment", totalPayment);
            form.setValue("fulldata", data?.data);
        }
    }, [data, form]);

    useEffect(() => {
        if (!isLoading) {
            setIsLoadingSkeleton(false);
        }
    }, [isLoading]);

    const currentStep = form.watch("currentStep");

    if (isLoadingSkeleton) {
        return (
            <div className="w-full mx-auto p-6 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <TransactionSkeletonCheckout />
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-6 flex flex-col gap-6">
            {/* Header */}
            <TransactionHeader />

            {/* Progress Steps */}
            <div className="flex items-center justify-start gap-4 sm:gap-6 py-4">
                {crumb.map(({ step, label, icon: Icon }, index) => (
                    <TransactionCrumb
                        key={step}
                        label={label}
                        Icon={Icon}
                        index={index}
                        currentStep={currentStep}
                        step={step}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <WrapperForms form={form}>
                        {/* Step 1: Shipping Information */}
                        {currentStep === 1 && (
                            <TransactionShippingInformmation
                                form={form}
                                accessToken={accessToken}
                                transactionID={params?.transaction_id as string}
                            />
                        )}

                        {/* Step 2: Payment Information */}
                        {currentStep === 2 && (
                            <TransactionPaymentInformmation
                                form={form}
                                accessToken={accessToken}
                                transactionID={params?.transaction_id as string}
                            />
                        )}

                        {/* Step 3: Review Order */}
                        {currentStep === 3 && (
                            <TransactionReviewInformmation
                                form={form}
                                accessToken={accessToken}
                                transactionID={params?.transaction_id as string}
                            />
                        )}
                    </WrapperForms>
                </div>

                {/* Order Summary Sidebar */}
                <div className="flex flex-col gap-4">
                    <TransactionOrderSummary data={data?.data} form={form} />
                </div>
            </div>
        </div>
    );
}
