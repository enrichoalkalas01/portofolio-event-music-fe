"use client";

// Icons
import { Shield, ShoppingBag, Percent, X } from "lucide-react";

// Components
import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { Badge } from "../shadcn/ui/badge";
import { Button } from "../shadcn/ui/button";
import { ConverterCurrency } from "@/utils/currency";
import { UseFormReturn, useWatch } from "react-hook-form";
import { useEffect } from "react";

const BaseImageUrl = "https://files.swarnatactical.com/tester-upload/";

export default function TransactionOrderSummary({
    data,
    form,
}: {
    readonly data: any;
    readonly form: UseFormReturn<any>;
}) {
    const subtotal = useWatch({ control: form.control, name: "subtotal" });
    const taxTotal = useWatch({ control: form.control, name: "tax_total" });
    const totalPayment = useWatch({
        control: form.control,
        name: "total_payment",
    });

    useEffect(() => {
        if (subtotal) {
            const tax = 11;
            const taxCalculated = (tax * subtotal) / 100;
            form.setValue("tax_total", taxCalculated);
            form.setValue("total_payment", taxCalculated + subtotal);
        }
    }, [subtotal]);

    const OrderSummaryCard = ({
        data,
        summary,
        orderItems,
        appliedPromo,
    }: {
        data: any;
        summary?: any;
        orderItems?: any;
        appliedPromo?: any;
    }) => {
        return (
            <Card className="flex flex-col gap-5">
                <CardHeader>
                    <h3 className="font-semibold flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Order Summary
                    </h3>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {/* Order Items */}
                    <div className="flex flex-col gap-4">
                        {orderItems?.map((item: any, i: number) => {
                            const sku_product = item?.sku_product;
                            const title = item?.product?.title || "Unknown";
                            const imageUrl =
                                BaseImageUrl +
                                    item?.product?.images?.thumbnail ||
                                "/no-image-available.jpg";
                            const qty = item?.total_product || 0;
                            const originalPrice =
                                item?.type_data_cart === "default"
                                    ? Number(item?.product?.prices?.price) || 0
                                    : Number(
                                          item?.product?.additional_informations?.variants?.filter(
                                              (e: any) =>
                                                  e?.sku_product ===
                                                  sku_product,
                                          )?.[0]?.prices || 0,
                                      );

                            return (
                                <div key={i} className="flex gap-3">
                                    <div className="relative w-12 h-12 flex-shrink-0">
                                        <img
                                            src={imageUrl}
                                            alt={title}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <Badge className="absolute -top-1 -right-1 text-xs min-w-5 h-5 flex items-center justify-center">
                                            {qty}
                                        </Badge>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {title}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold">
                                                {ConverterCurrency({
                                                    amount: originalPrice,
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold">
                                        {ConverterCurrency({
                                            amount: originalPrice * qty,
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="flex flex-col gap-2 border-t pt-4">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>
                                {ConverterCurrency({
                                    amount: subtotal,
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tax</span>
                            <span>
                                {ConverterCurrency({
                                    amount: taxTotal,
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                            <span>Total</span>
                            <span>
                                {ConverterCurrency({
                                    amount: totalPayment,
                                })}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <OrderSummaryCard data={data} orderItems={data?.products || []} />

            {/* Security Badge */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-3 text-sm">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div>
                            <div className="font-medium">
                                Secure & Encrypted
                            </div>
                            <div className="text-muted-foreground">
                                Your data is protected with SSL encryption
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
