"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { useState, useEffect } from "react";
import {
    CreditCard,
    Truck,
    Shield,
    MapPin,
    User,
    Mail,
    Phone,
    Lock,
    Calendar,
    ShoppingBag,
    Check,
    ChevronLeft,
    Percent,
    X,
    Tag,
    Wallet,
    Smartphone,
    Building2,
    Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { UseFormReturn } from "react-hook-form";
import { FormRegularInput } from "../generals/forms/form-regular-input";
import { FormRegularSelect } from "../generals/forms/form-regular-select";

import { useWatch } from "react-hook-form";
import { useDebounceT } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { ConverterCurrency } from "@/utils/currency";

interface ShippingAddress {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

const shippingMethods = [
    {
        id: "standard",
        name: "Standard Shipping",
        price: 9.99,
        time: "5-7 business days",
    },
    {
        id: "express",
        name: "Express Shipping",
        price: 19.99,
        time: "2-3 business days",
    },
    {
        id: "overnight",
        name: "Overnight Shipping",
        price: 39.99,
        time: "Next business day",
    },
];

export default function TransactionShippingInformmation({
    form,
    accessToken,
    transactionID,
}: {
    form: UseFormReturn<any>;
    accessToken?: string;
    transactionID: string;
}) {
    const [selectedShipping, setSelectedShipping] = useState("");
    const [ratesData, setRatesData] = useState<any>(null);
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [isDisableNextButton, setIsDisableNextButton] =
        useState<boolean>(true);

    const zipCode = useWatch({
        control: form.control,
        name: "zip_code",
    });

    const debouncedZipCode = useDebounceT(zipCode, 500);
    console.log("Debounce : ", debouncedZipCode);

    const { data, isLoading, error } = useQuery<any>({
        enabled: !!debouncedZipCode,
        queryKey: ["search-area", debouncedZipCode],
        queryFn: () =>
            fetcher(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/others/locations/search-area-and-rates/${transactionID}?search=${debouncedZipCode}`,
            ),
        staleTime: 0,
        gcTime: 0,
    });

    useEffect(() => {
        const areaData = data?.data?.area_data?.[0];
        if (data?.data) {
            form.setValue(
                "city",
                areaData?.administrative_division_level_2_name || "",
            );
            form.setValue("area_data", areaData);

            setRatesData(data?.data?.rates_data);
        }
    }, [data, form]);

    const handleNextButton = () => {
        form.setValue("currentStep", 3);
    };

    const handleShipping = (e: any) => {
        form.setValue("shipping_total", e?.data?.price);
        form.setValue("selectedShipment", e?.data);
        setSelectedShipping(e?.shippingId);
    };

    const watchedFields = useWatch({ control: form.control });
    useEffect(() => {
        const {
            firstname,
            lastname,
            email,
            phonenumber,
            address,
            city,
            state,
            zip_code,
        } = watchedFields;
        if (
            firstname &&
            lastname &&
            email &&
            phonenumber &&
            address &&
            city &&
            state &&
            zip_code
        ) {
            setIsDisableNextButton(false);
        }
    }, [watchedFields]);

    // console.log("Debounced:", debouncedZipCode);
    // console.log("Data:", data?.data);
    // console.log(form.watch("zip_code"))

    return (
        <div className="">
            <Card className="flex flex-col gap-6">
                <CardHeader>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Checkout Information
                    </h2>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <FormRegularInput
                                labelName="First Name *"
                                name="firstname"
                                form={form}
                                disable={isDisable}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormRegularInput
                                labelName="Last Name *"
                                name="lastname"
                                form={form}
                                disable={isDisable}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormRegularInput
                                labelName="Email *"
                                name="email"
                                form={form}
                                disable={isDisable}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormRegularInput
                                labelName="Phone Number *"
                                name="phonenumber"
                                form={form}
                                disable={isDisable}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormRegularInput
                            labelName="Address *"
                            name="address"
                            form={form}
                            disable={isDisable}
                        />
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="w-full flex gap-4">
                            <FormRegularSelect
                                labelName="State *"
                                name="state"
                                form={form}
                                disable={isDisable}
                                defaultValue={[
                                    { label: "Indonesia", value: "indonesia" },
                                ]}
                            />

                            <FormRegularInput
                                className="w-full"
                                labelName="City *"
                                name="city"
                                type={"text"}
                                form={form}
                                disable={isDisable}
                            />

                            <FormRegularInput
                                className="w-full"
                                labelName="Zip Code *"
                                name="zip_code"
                                type={"text"}
                                form={form}
                                disable={isDisable}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        disabled={isDisableNextButton}
                        className="ml-auto cursor-pointer"
                        type="button"
                        onClick={handleNextButton}
                    >
                        Continue to Payment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
