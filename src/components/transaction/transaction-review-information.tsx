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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/ui/select";
import { Form, UseFormReturn, useWatch } from "react-hook-form";
import Link from "next/link";
import axios from "axios";

interface OrderItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
    discount?: number;
}

interface CheckoutSummary {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
}

interface PaymentMethod {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    nameOnCard: string;
}

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

const sampleOrderItems: OrderItem[] = [
    {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        quantity: 2,
        discount: 31,
    },
    {
        id: "2",
        name: "Minimalist Desk Lamp",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1617363020293-62faac14783d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        quantity: 1,
    },
    {
        id: "3",
        name: "Organic Coffee Beans",
        price: 24.99,
        originalPrice: 29.99,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
        quantity: 3,
        discount: 17,
    },
];

export default function TransactionReviewInformmation({
    form,
    accessToken,
    transactionID,
}: {
    form: UseFormReturn<any>;
    accessToken?: string;
    transactionID: string;
}) {
    const watchedValue = useWatch({ control: form.control });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
    const [isDisable, setIsDisable] = useState<boolean>(true);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/transactions/${transactionID}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                data: JSON.stringify({
                    email: watchedValue?.email,
                    firstname: watchedValue?.firstname,
                    lastname: watchedValue?.lastname,
                    phonenumber: watchedValue?.phonenumber,
                    address: watchedValue?.address,

                    state: watchedValue?.state,
                    city: watchedValue?.city,

                    shipping_total: watchedValue?.shipping_total,
                    subtotal: watchedValue?.subtotal,
                    tax_total: watchedValue?.tax_total,
                    total_payment: watchedValue?.total_payment,
                }),
            };

            console.log(config);

            const response = await axios(config);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    };

    return (
        <div>
            <Card className="flex flex-col gap-6">
                <CardHeader>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        Review Your Order
                    </h2>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {/* Address Review */}
                    <div className="flex flex-col gap-2">
                        <h3 className="font-medium">Information</h3>
                        <div className="text-sm text-muted-foreground p-3 bg-accent rounded-ele">
                            <p>
                                User : {watchedValue?.firstname}
                                {watchedValue?.lastName}
                            </p>
                            <p>
                                Address : {watchedValue?.address},{" "}
                                {watchedValue?.state}, {watchedValue?.city}
                            </p>

                            <p>Postal Code : {watchedValue?.zip_code}</p>
                            <p>Email : {watchedValue?.email}</p>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-2 border-t pt-4">
                        <Checkbox
                            id="agreeTerms"
                            checked={agreeToTerms}
                            className="cursor-pointer"
                            onCheckedChange={(checked: any) => {
                                setAgreeToTerms(checked === true);
                                setIsDisable(checked === false);
                            }}
                        />
                        <Label
                            htmlFor="agreeTerms"
                            className="text-sm leading-relaxed cursor-pointer"
                        >
                            I agree to the
                            <Link
                                href={"/terms-and-conditions"}
                                className="p-0 h-auto text-sm text-primary hover:text-primary/50"
                            >
                                Terms of Service
                            </Link>
                            and
                            <Link
                                href={"/privacy-policy"}
                                className="p-0 h-auto text-sm text-primary hover:text-primary/50"
                            >
                                Privacy Policy
                            </Link>
                        </Label>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        disabled={isLoading}
                        variant="outline"
                        onClick={() => form.setValue("currentStep", 1)}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <Button
                        disabled={isDisable || isLoading}
                        onClick={handleCheckout}
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-2 cursor-pointer"
                    >
                        <Lock className="h-4 w-4" />
                        Complete Order
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
