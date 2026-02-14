"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Button } from "@/components/shadcn/ui/button";
import { useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/shadcn/ui/badge";
import { ConverterCurrency } from "@/utils/currency";
import { Card } from "@/components/shadcn/ui/card";
import QRCode from "qrcode";
import {
    Calendar,
    MapPin,
    User,
    Download,
    Ticket,
    Clock,
} from "lucide-react";

export default function Page() {
    const router = useRouter();
    const session: any = useSession();
    const params = useParams();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-transactions-detail", params?.id],
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

    const transaction = data?.data;
    const event = transaction?.event;

    useEffect(() => {
        if (transaction) {
            const qrisData = `${transaction?._id}-${transaction?.event_id}-${transaction?.user?.id}-${transaction?.settlement?.order_id}`;
            QRCode.toCanvas(canvasRef.current, qrisData, {
                width: 300,
                margin: 2,
            });
        }
    }, [transaction]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "failed":
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "checkout":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleDownloadETicket = useCallback(async () => {
        if (!transaction) return;

        const ticketCanvas = document.createElement("canvas");
        const ctx = ticketCanvas.getContext("2d");
        if (!ctx) return;

        const width = 800;
        const height = 1000;
        ticketCanvas.width = width;
        ticketCanvas.height = height;

        // Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // Header bar
        ctx.fillStyle = "#7c3aed";
        ctx.fillRect(0, 0, width, 120);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        ctx.fillText("E-TICKET", width / 2, 50);
        ctx.font = "16px Arial";
        ctx.fillText(event?.title || "Event", width / 2, 80);
        ctx.font = "14px Arial";
        ctx.fillText(
            `ID: ${transaction?._id?.slice(0, 16)}...`,
            width / 2,
            105,
        );

        // Dashed separator
        ctx.setLineDash([8, 4]);
        ctx.strokeStyle = "#d1d5db";
        ctx.beginPath();
        ctx.moveTo(40, 140);
        ctx.lineTo(width - 40, 140);
        ctx.stroke();
        ctx.setLineDash([]);

        // Event details section
        ctx.textAlign = "left";
        ctx.fillStyle = "#7c3aed";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Detail Event", 50, 180);

        ctx.fillStyle = "#374151";
        ctx.font = "16px Arial";
        let y = 215;

        const drawDetail = (label: string, value: string) => {
            ctx.fillStyle = "#6b7280";
            ctx.font = "14px Arial";
            ctx.fillText(label, 50, y);
            ctx.fillStyle = "#111827";
            ctx.font = "16px Arial";
            ctx.fillText(value || "-", 200, y);
            y += 35;
        };

        drawDetail("Event", event?.title || "-");
        drawDetail(
            "Tanggal",
            event?.eventDate?.start
                ? new Date(event.eventDate.start).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                  })
                : "-",
        );
        drawDetail("Lokasi", event?.location || "-");
        drawDetail("Vendor", event?.vendor || "-");

        // Separator
        ctx.setLineDash([8, 4]);
        ctx.strokeStyle = "#d1d5db";
        ctx.beginPath();
        ctx.moveTo(40, y + 5);
        ctx.lineTo(width - 40, y + 5);
        ctx.stroke();
        ctx.setLineDash([]);
        y += 30;

        // Attendee details
        ctx.fillStyle = "#7c3aed";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Detail Peserta", 50, y);
        y += 35;

        drawDetail("Nama", transaction?.request?.firstname
            ? `${transaction.request.firstname} ${transaction.request.lastname || ""}`
            : transaction?.user?.username || "-");
        drawDetail("Email", transaction?.request?.email || "-");
        drawDetail("Telepon", transaction?.request?.phonenumber || "-");

        // Separator
        ctx.setLineDash([8, 4]);
        ctx.strokeStyle = "#d1d5db";
        ctx.beginPath();
        ctx.moveTo(40, y + 5);
        ctx.lineTo(width - 40, y + 5);
        ctx.stroke();
        ctx.setLineDash([]);
        y += 30;

        // Payment details
        ctx.fillStyle = "#7c3aed";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Detail Pembayaran", 50, y);
        y += 35;

        drawDetail(
            "Total",
            ConverterCurrency({
                amount: transaction?.request?.total_payment || 0,
            }),
        );
        drawDetail("Status", transaction?.status_transaction?.toUpperCase() || "-");

        // Separator
        ctx.setLineDash([8, 4]);
        ctx.strokeStyle = "#d1d5db";
        ctx.beginPath();
        ctx.moveTo(40, y + 5);
        ctx.lineTo(width - 40, y + 5);
        ctx.stroke();
        ctx.setLineDash([]);
        y += 30;

        // QR Code
        ctx.fillStyle = "#7c3aed";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Scan QR Code", width / 2, y);
        y += 15;

        const qrSize = 200;
        const qrisData = `${transaction?._id}-${transaction?.event_id}-${transaction?.user?.id}-${transaction?.settlement?.order_id}`;
        const qrDataUrl = await QRCode.toDataURL(qrisData, {
            width: qrSize,
            margin: 1,
        });

        const qrImage = new Image();
        qrImage.onload = () => {
            ctx.drawImage(
                qrImage,
                (width - qrSize) / 2,
                y,
                qrSize,
                qrSize,
            );

            // Footer
            ctx.fillStyle = "#9ca3af";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(
                "Tunjukkan e-ticket ini saat memasuki venue",
                width / 2,
                y + qrSize + 30,
            );

            // Download
            const link = document.createElement("a");
            link.download = `e-ticket-${transaction?._id}.png`;
            link.href = ticketCanvas.toDataURL("image/png");
            link.click();
        };
        qrImage.src = qrDataUrl;
    }, [transaction, event]);

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Detail Transaksi"
                headerSubTitle=""
                className="p-0 gap-0"
                buttonUrlComponent={
                    <div className="flex items-center gap-2">
                        <Badge
                            className={`text-sm ${getStatusColor(transaction?.status_transaction)}`}
                        >
                            {transaction?.status_transaction}
                        </Badge>
                    </div>
                }
            >
                <div className="w-full flex flex-col gap-6">
                    {/* Transaction Info */}
                    <div className="w-full flex flex-col gap-1">
                        <h2 className="font-bold text-primary">
                            Transaction ID : {transaction?._id}
                        </h2>
                        <span className="text-sm text-muted-foreground">
                            {transaction?.createdAt &&
                                new Date(
                                    transaction.createdAt,
                                ).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                        </span>
                    </div>

                    {/* Event Detail Card */}
                    {event && (
                        <Card className="p-4">
                            <div className="w-full flex flex-col gap-3">
                                <span className="font-bold text-primary">
                                    Detail Event
                                </span>
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Ticket className="w-4 h-4 text-purple-500" />
                                        <span className="font-semibold">
                                            {event?.title}
                                        </span>
                                    </div>
                                    {event?.eventDate?.start && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-purple-500" />
                                            <span>
                                                {new Date(
                                                    event.eventDate.start,
                                                ).toLocaleDateString("id-ID", {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                                {event?.eventDate?.end && (
                                                    <>
                                                        {" - "}
                                                        {new Date(
                                                            event.eventDate.end,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                weekday: "long",
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            },
                                                        )}
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    {event?.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-purple-500" />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                    {event?.vendor && (
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-purple-500" />
                                            <span>{event.vendor}</span>
                                        </div>
                                    )}
                                    {event?.price !== undefined && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-purple-500" />
                                            <span>
                                                Harga Tiket:{" "}
                                                {ConverterCurrency({
                                                    amount: event.price,
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Transaction Request */}
                    {transaction?.request && (
                        <Card className="p-4">
                            <div className="w-full flex flex-col gap-2 text-sm">
                                <span className="font-bold text-primary">
                                    Detail Pembayaran
                                </span>
                                {Object.entries(transaction.request).map(
                                    ([key, value]) => (
                                        <div
                                            key={key}
                                            className="w-full flex gap-4"
                                        >
                                            <span className="text-muted-foreground min-w-[120px]">
                                                {key}
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {key === "subtotal" ||
                                                key === "tax_total" ||
                                                key === "total_payment"
                                                    ? ConverterCurrency({
                                                          amount: value as number,
                                                      })
                                                    : (value as string)}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </Card>
                    )}

                    {/* QR Code & Download */}
                    <Card className="p-4 w-auto">
                        <div className="w-full flex flex-col gap-3">
                            <span className="font-bold text-primary">
                                QR Code Ticket
                            </span>
                            {transaction && (
                                <div className="flex flex-col items-start gap-4">
                                    <canvas ref={canvasRef}></canvas>
                                    {transaction?.status_transaction ===
                                        "success" && (
                                        <Button
                                            onClick={handleDownloadETicket}
                                            className="gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download E-Ticket
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </WrapperCard>
        </section>
    );
}
