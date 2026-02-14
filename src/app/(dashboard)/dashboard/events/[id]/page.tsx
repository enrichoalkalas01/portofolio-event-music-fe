"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, MapPin, Download, ArrowLeft } from "lucide-react";
import { parseEventDate } from "@/lib/parsed-date";
import { ConverterCurrency } from "@/utils/currency";
import { useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";

const BaseUrlImage =
    "https://minio-api.enrichoalkalas.my.id/portofolio-event-music/";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const session: any = useSession();
    const accessToken = session?.data?.user?.token?.access_token;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { data, error, isLoading } = useQuery({
        queryKey: ["dashboard-user-event-detail", params?.id],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/transactions/${params?.id}?limit=1000`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                )
            ).json(),
        enabled: !!accessToken && !!params?.id,
    });

    const transaction = data?.data;
    const event = transaction?.event;
    const parsedDate = event?.eventDate
        ? parseEventDate(event?.eventDate, { lang: "id" })
        : null;
    const thumbnail = event?.thumbnail?.[0]?.name
        ? BaseUrlImage + event?.thumbnail?.[0]?.name
        : "/no-image-available.jpg";

    useEffect(() => {
        if (transaction && canvasRef.current) {
            const qrData = `${transaction?._id}-${transaction?.event_id}-${transaction?.user?.id}-${transaction?.settlement?.order_id}`;
            QRCode.toCanvas(canvasRef.current, qrData, {
                width: 200,
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

        drawDetail(
            "Nama",
            transaction?.request?.firstname
                ? `${transaction.request.firstname} ${transaction.request.lastname || ""}`
                : transaction?.user?.username || "-",
        );
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
        drawDetail(
            "Status",
            transaction?.status_transaction?.toUpperCase() || "-",
        );

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
            ctx.drawImage(qrImage, (width - qrSize) / 2, y, qrSize, qrSize);

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

    if (isLoading) {
        return (
            <section className="w-full">
                <WrapperCard
                    headerStatus={true}
                    headerTitle="Detail Tiket"
                    headerSubTitle=""
                    className="p-0 gap-0"
                >
                    <div className="p-8 text-center text-gray-500">
                        Memuat data...
                    </div>
                </WrapperCard>
            </section>
        );
    }

    if (error || !transaction) {
        return (
            <section className="w-full">
                <WrapperCard
                    headerStatus={true}
                    headerTitle="Detail Tiket"
                    headerSubTitle=""
                    className="p-0 gap-0"
                >
                    <div className="p-8 text-center text-red-500">
                        Tiket tidak ditemukan
                    </div>
                </WrapperCard>
            </section>
        );
    }

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Detail Tiket"
                headerSubTitle=""
                className="p-0 gap-0"
                buttonUrlComponent={
                    <Badge
                        className={getStatusColor(
                            transaction?.status_transaction,
                        )}
                    >
                        {transaction?.status_transaction}
                    </Badge>
                }
            >
                <div className="w-full p-4">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Event Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="overflow-hidden">
                                {event?.thumbnail?.[0]?.name && (
                                    <div
                                        className="h-48 bg-gray-200 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url('${thumbnail}')`,
                                        }}
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {event?.title ||
                                            transaction?.payment
                                                ?.item_details?.[0]?.name ||
                                            "Event"}
                                    </h2>
                                    <div className="space-y-3 text-gray-600">
                                        {(parsedDate || event?.eventDate) && (
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-5 h-5 text-purple-600" />
                                                <span>
                                                    {parsedDate?.start?.day
                                                        ? `${parsedDate.start.day}, ${parsedDate.start.full}`
                                                        : "-"}
                                                </span>
                                            </div>
                                        )}
                                        {event?.location && (
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-5 h-5 text-purple-600" />
                                                <span>{event.location}</span>
                                            </div>
                                        )}
                                        {!event && (
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <span>
                                                    Event ID:{" "}
                                                    {transaction?.event_id}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {event?.description && (
                                        <div className="mt-4 pt-4 border-t">
                                            <h3 className="font-semibold mb-2">
                                                Deskripsi
                                            </h3>
                                            <p className="text-gray-600">
                                                {event.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Transaction Details */}
                            <Card className="p-6">
                                <h3 className="font-bold text-lg mb-4">
                                    Detail Transaksi
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            ID Transaksi
                                        </span>
                                        <span className="font-mono">
                                            {transaction?._id}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Nama
                                        </span>
                                        <span>
                                            {transaction?.request?.firstname}{" "}
                                            {transaction?.request?.lastname}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Email
                                        </span>
                                        <span>
                                            {transaction?.request?.email}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Telepon
                                        </span>
                                        <span>
                                            {transaction?.request?.phonenumber}
                                        </span>
                                    </div>
                                    <div className="border-t pt-3 mt-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Subtotal
                                            </span>
                                            <span>
                                                {ConverterCurrency({
                                                    amount:
                                                        transaction?.request
                                                            ?.subtotal || 0,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Pajak
                                            </span>
                                            <span>
                                                {ConverterCurrency({
                                                    amount:
                                                        transaction?.request
                                                            ?.tax_total || 0,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg mt-2">
                                            <span>Total</span>
                                            <span className="text-purple-600">
                                                {ConverterCurrency({
                                                    amount:
                                                        transaction?.request
                                                            ?.total_payment ||
                                                        0,
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* QR Code & Actions */}
                        <div className="space-y-6">
                            <Card className="p-6 text-center">
                                <h3 className="font-bold text-lg mb-4">
                                    E-Ticket QR Code
                                </h3>
                                <div className="flex justify-center mb-4">
                                    <canvas ref={canvasRef}></canvas>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">
                                    Tunjukkan QR code ini saat check-in di
                                    lokasi event
                                </p>
                                {transaction?.status_transaction ===
                                    "success" && (
                                    <Button
                                        className="w-full"
                                        onClick={handleDownloadETicket}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download E-Ticket
                                    </Button>
                                )}
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-bold text-lg mb-4">
                                    Informasi Penting
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>
                                        Bawa identitas yang sesuai dengan nama
                                        di tiket
                                    </li>
                                    <li>
                                        Datang 30 menit sebelum acara dimulai
                                    </li>
                                    <li>
                                        QR code hanya dapat digunakan satu kali
                                    </li>
                                    <li>Tiket tidak dapat dipindahtangankan</li>
                                </ul>
                            </Card>

                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali
                            </Button>
                        </div>
                    </div>
                </div>
            </WrapperCard>
        </section>
    );
}
