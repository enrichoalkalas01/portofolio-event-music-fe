"use client";

import { FormRegularInput } from "@/components/generals/forms/form-regular-input";
import { FormRegularSelect } from "@/components/generals/forms/form-regular-select";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { WrapperForms } from "@/components/generals/wrapper/wrapper-forms";
import { Button } from "@/components/shadcn/ui/button";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FormMultipleSelect } from "@/components/generals/forms/form-multiple-select";
import EventSponsor from "@/components/pages/events/event-sponsor";
import EventCategories from "@/components/pages/events/event-categories";
import EventVendor from "@/components/pages/events/event-vendor";
import EventStatus from "@/components/pages/events/event-status";
import ShowMultiProductImages from "@/components/generals/show-multi-product-images";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/shadcn/ui/badge";
import { ConverterCurrency } from "@/utils/currency";
import { Card } from "@/components/shadcn/ui/card";
import QRCode from "qrcode";

export default function Page() {
    const router = useRouter();
    const session: any = useSession();
    const params = useParams();
    const accessToken = session?.data?.user?.token?.access_token;

    const canvasRef = useRef(null);

    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-transactions-detail"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/transactions/${params?.id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json(),
    });

    useEffect(() => {
        if (data?.data) {
            const qrisData = `${data?.data?._id}-${data?.data?.event_id}-${data?.data?.user?.id}-${data?.data?.settlement?.order_id}`;
            QRCode.toCanvas(canvasRef.current, qrisData, {
                width: 300,
                margin: 2,
            });
        }
    }, [data]);

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Data Transactions"
                headerSubTitle=""
                className="p-0 gap-0"
                buttonUrlComponent={
                    <div>
                        <Badge className="text-sm">
                            {data?.data?.status_transaction}
                        </Badge>
                    </div>
                }
            >
                <div className="w-full flex flex-col gap-8">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full">
                            <h2 className="font-bold text-primary">
                                Transaction ID : {data?.data?._id}
                            </h2>
                        </div>
                        <div className="w-full">
                            <span>Event ID : {data?.data?.event_id}</span>
                        </div>
                    </div>

                    {data?.data && (
                        <Card className="p-4">
                            <div className="w-full flex flex-col gap-2 text-sm">
                                <div className="w-full">
                                    <span className="font-bold text-primary">
                                        Transaction Request
                                    </span>
                                </div>
                                {Object.entries(data?.data?.request)?.map(
                                    ([key, value]) => {
                                        return (
                                            <div
                                                key={key}
                                                className="w-full flex gap-4"
                                            >
                                                <span>{key}</span>
                                                <span>:</span>
                                                <span>
                                                    {key === "subtotal" ||
                                                    key === "tax_total" ||
                                                    key === "total_payment"
                                                        ? ConverterCurrency({
                                                              amount: value as any,
                                                          })
                                                        : (value as any)}
                                                </span>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </Card>
                    )}

                    <Card className="p-4 w-auto">
                        <div className="w-full">
                            <span className="font-bold text-primary">
                                QR Code Ticket
                            </span>
                        </div>
                        {data?.data && (
                            <div className="w-auto">
                                <canvas ref={canvasRef}></canvas>
                            </div>
                        )}
                    </Card>
                </div>
            </WrapperCard>
        </section>
    );
}
