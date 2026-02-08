"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { HelpCircle, Mail } from "lucide-react";
import Link from "next/link";

export default function Page() {
    const faqCategories = [
        {
            category: "Pembelian Tiket",
            questions: [
                {
                    question: "Bagaimana cara membeli tiket event?",
                    answer: "Untuk membeli tiket, pilih event yang Anda inginkan, klik tombol 'Beli Tiket', pilih jenis tiket dan jumlah yang diinginkan, lalu lanjutkan ke proses pembayaran. Anda akan menerima e-ticket melalui email setelah pembayaran berhasil.",
                },
                {
                    question: "Metode pembayaran apa saja yang tersedia?",
                    answer: "Kami menerima berbagai metode pembayaran termasuk transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, DANA, ShopeePay), kartu kredit/debit, dan virtual account.",
                },
                {
                    question: "Apakah saya bisa membeli tiket untuk orang lain?",
                    answer: "Ya, Anda bisa membeli tiket untuk orang lain. Pastikan untuk memasukkan nama penerima tiket dengan benar saat proses checkout karena nama tersebut akan tertera di e-ticket.",
                },
                {
                    question: "Berapa lama batas waktu pembayaran?",
                    answer: "Batas waktu pembayaran adalah 1 jam setelah pemesanan dibuat. Jika pembayaran tidak dilakukan dalam waktu tersebut, pesanan akan otomatis dibatalkan.",
                },
            ],
        },
        {
            category: "E-Ticket & Check-in",
            questions: [
                {
                    question: "Bagaimana cara mendapatkan e-ticket?",
                    answer: "E-ticket akan dikirimkan ke email yang Anda daftarkan setelah pembayaran berhasil. Anda juga dapat mengunduh e-ticket melalui halaman 'Tiket Saya' di akun Anda.",
                },
                {
                    question: "Apakah saya perlu mencetak e-ticket?",
                    answer: "Tidak perlu. Anda cukup menunjukkan e-ticket dalam bentuk digital (dari smartphone) saat check-in di lokasi event. Pastikan QR code terlihat jelas.",
                },
                {
                    question: "Bagaimana proses check-in di lokasi event?",
                    answer: "Tunjukkan e-ticket Anda (QR code) kepada petugas di pintu masuk. Petugas akan memindai QR code untuk verifikasi. Pastikan Anda membawa identitas yang sesuai dengan nama di tiket.",
                },
            ],
        },
        {
            category: "Pembatalan & Refund",
            questions: [
                {
                    question: "Apakah tiket bisa dibatalkan?",
                    answer: "Kebijakan pembatalan tergantung pada masing-masing event. Beberapa event mengizinkan pembatalan dengan potongan biaya administrasi, sementara yang lain tidak dapat dibatalkan. Silakan cek kebijakan pada halaman detail event.",
                },
                {
                    question: "Bagaimana proses refund jika event dibatalkan?",
                    answer: "Jika event dibatalkan oleh penyelenggara, Anda akan mendapatkan refund penuh. Dana akan dikembalikan ke metode pembayaran asal dalam waktu 7-14 hari kerja.",
                },
                {
                    question: "Apakah tiket bisa dipindahtangankan?",
                    answer: "Kebijakan pemindahan tiket berbeda untuk setiap event. Untuk event yang mengizinkan, Anda dapat mengubah nama pemilik tiket melalui menu 'Tiket Saya' sebelum hari H event.",
                },
            ],
        },
        {
            category: "Akun & Keamanan",
            questions: [
                {
                    question: "Bagaimana cara membuat akun?",
                    answer: "Klik tombol 'Daftar' di pojok kanan atas, isi formulir pendaftaran dengan data yang valid, lalu verifikasi email Anda. Anda juga bisa mendaftar menggunakan akun Google.",
                },
                {
                    question: "Saya lupa password, bagaimana cara mengatasinya?",
                    answer: "Klik 'Lupa Password' di halaman login, masukkan email terdaftar Anda, dan kami akan mengirimkan link untuk reset password ke email tersebut.",
                },
                {
                    question: "Apakah data saya aman?",
                    answer: "Ya, kami menggunakan enkripsi SSL dan mengikuti standar keamanan industri untuk melindungi data pribadi dan informasi pembayaran Anda. Baca Kebijakan Privasi kami untuk informasi lebih lanjut.",
                },
            ],
        },
        {
            category: "Event & Venue",
            questions: [
                {
                    question: "Bagaimana cara mengetahui event terbaru?",
                    answer: "Anda bisa mengecek halaman 'Events' untuk melihat semua event yang tersedia, atau berlangganan newsletter kami untuk mendapatkan informasi event terbaru langsung ke email Anda.",
                },
                {
                    question: "Apakah ada batasan usia untuk menghadiri event?",
                    answer: "Batasan usia berbeda untuk setiap event. Informasi ini tercantum di halaman detail event. Beberapa event mungkin memerlukan pendamping orang tua untuk pengunjung di bawah usia tertentu.",
                },
                {
                    question: "Bagaimana jika event ditunda (reschedule)?",
                    answer: "Jika event ditunda, tiket Anda tetap berlaku untuk tanggal baru. Kami akan mengirimkan pemberitahuan melalui email dan SMS. Jika Anda tidak bisa hadir di tanggal baru, silakan hubungi customer service untuk opsi refund.",
                },
            ],
        },
    ];

    return (
        <section className="w-full h-auto">
            {/* Hero Section */}
            <div className="w-full h-[350px] bg-gradient-to-r from-purple-700 to-purple-500 flex items-center justify-center">
                <div className="text-center text-white px-4">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/20 rounded-full">
                            <HelpCircle className="w-12 h-12" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                        Temukan jawaban untuk pertanyaan yang sering diajukan
                    </p>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="w-full max-w-4xl mx-auto py-16 px-4">
                <div className="space-y-8">
                    {faqCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-purple-200">
                                {category.category}
                            </h2>
                            <Accordion type="single" collapsible className="space-y-2">
                                {category.questions.map((faq, faqIndex) => (
                                    <AccordionItem
                                        key={faqIndex}
                                        value={`${categoryIndex}-${faqIndex}`}
                                        className="border border-gray-200 rounded-lg px-4"
                                    >
                                        <AccordionTrigger className="text-left font-medium hover:text-purple-600">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-16 bg-purple-50 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Masih punya pertanyaan?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Tim customer service kami siap membantu Anda
                    </p>
                    <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        Hubungi Kami
                    </Link>
                </div>
            </div>
        </section>
    );
}
