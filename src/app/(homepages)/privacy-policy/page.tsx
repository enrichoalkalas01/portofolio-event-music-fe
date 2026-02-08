import {
    Shield,
    Eye,
    Lock,
    Database,
    Share2,
    UserCheck,
    Bell,
    Mail,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
    const lastUpdated = "1 Februari 2025";

    const sections = [
        {
            icon: Database,
            title: "1. Informasi yang Kami Kumpulkan",
            content: [
                {
                    subtitle: "Informasi yang Anda Berikan",
                    text: "Kami mengumpulkan informasi yang Anda berikan secara langsung, termasuk:",
                    list: [
                        "Nama lengkap dan informasi kontak (email, nomor telepon)",
                        "Informasi akun (username, password terenkripsi)",
                        "Informasi pembayaran (nomor kartu kredit/debit diproses melalui payment gateway yang aman)",
                        "Alamat pengiriman dan penagihan",
                        "Preferensi event dan genre musik",
                    ],
                },
                {
                    subtitle: "Informasi yang Dikumpulkan Secara Otomatis",
                    text: "Saat Anda menggunakan layanan kami, kami secara otomatis mengumpulkan:",
                    list: [
                        "Alamat IP dan informasi perangkat",
                        "Jenis browser dan sistem operasi",
                        "Halaman yang dikunjungi dan waktu kunjungan",
                        "Data lokasi (jika Anda mengizinkan)",
                        "Cookies dan teknologi pelacakan serupa",
                    ],
                },
            ],
        },
        {
            icon: Eye,
            title: "2. Bagaimana Kami Menggunakan Informasi Anda",
            content: [
                {
                    text: "Kami menggunakan informasi yang dikumpulkan untuk:",
                    list: [
                        "Memproses pembelian tiket dan transaksi",
                        "Mengirimkan e-ticket dan konfirmasi pemesanan",
                        "Memberikan layanan pelanggan dan dukungan teknis",
                        "Mengirimkan informasi tentang event, promosi, dan penawaran khusus",
                        "Meningkatkan dan mengembangkan layanan kami",
                        "Mencegah penipuan dan menjaga keamanan platform",
                        "Mematuhi kewajiban hukum yang berlaku",
                    ],
                },
            ],
        },
        {
            icon: Share2,
            title: "3. Berbagi Informasi",
            content: [
                {
                    text: "Kami dapat membagikan informasi Anda dengan:",
                    list: [
                        "Penyelenggara event untuk keperluan check-in dan verifikasi tiket",
                        "Penyedia layanan pembayaran untuk memproses transaksi",
                        "Mitra logistik untuk pengiriman merchandise (jika ada)",
                        "Penyedia layanan analitik untuk meningkatkan layanan",
                        "Otoritas hukum jika diwajibkan oleh undang-undang",
                    ],
                },
                {
                    subtitle: "Kami TIDAK akan:",
                    list: [
                        "Menjual data pribadi Anda kepada pihak ketiga",
                        "Membagikan informasi sensitif tanpa persetujuan Anda",
                        "Menggunakan data Anda untuk tujuan selain yang disebutkan",
                    ],
                },
            ],
        },
        {
            icon: Lock,
            title: "4. Keamanan Data",
            content: [
                {
                    text: "Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda:",
                    list: [
                        "Enkripsi SSL/TLS untuk semua transmisi data",
                        "Penyimpanan password dengan hashing yang aman",
                        "Akses terbatas ke data pribadi hanya untuk karyawan yang berwenang",
                        "Audit keamanan berkala dan pemantauan sistem",
                        "Backup data terenkripsi secara reguler",
                        "Kepatuhan terhadap standar keamanan industri pembayaran (PCI DSS)",
                    ],
                },
            ],
        },
        {
            icon: UserCheck,
            title: "5. Hak-Hak Anda",
            content: [
                {
                    text: "Anda memiliki hak untuk:",
                    list: [
                        "Mengakses data pribadi yang kami simpan tentang Anda",
                        "Memperbarui atau memperbaiki informasi yang tidak akurat",
                        "Meminta penghapusan data pribadi Anda",
                        "Menolak penggunaan data untuk pemasaran langsung",
                        "Menarik persetujuan yang sebelumnya diberikan",
                        "Mengunduh salinan data Anda dalam format yang dapat dibaca",
                    ],
                },
                {
                    text: "Untuk menggunakan hak-hak ini, silakan hubungi kami melalui halaman Kontak atau email ke privacy@eventmusic.id",
                },
            ],
        },
        {
            icon: Bell,
            title: "6. Cookies dan Teknologi Pelacakan",
            content: [
                {
                    text: "Kami menggunakan cookies untuk:",
                    list: [
                        "Menjaga sesi login Anda tetap aktif",
                        "Mengingat preferensi dan pengaturan Anda",
                        "Menganalisis penggunaan website untuk peningkatan layanan",
                        "Menampilkan iklan yang relevan (dengan persetujuan Anda)",
                    ],
                },
                {
                    text: "Anda dapat mengatur preferensi cookies melalui pengaturan browser Anda. Perlu diingat bahwa menonaktifkan cookies tertentu dapat mempengaruhi fungsionalitas website.",
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
                            <Shield className="w-12 h-12" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Kebijakan Privasi
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                        Komitmen kami untuk melindungi privasi dan data Anda
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="w-full max-w-4xl mx-auto py-16 px-4">
                {/* Last Updated */}
                <div className="bg-purple-50 rounded-lg p-4 mb-8">
                    <p className="text-gray-600">
                        <span className="font-semibold">
                            Terakhir diperbarui:
                        </span>{" "}
                        {lastUpdated}
                    </p>
                </div>

                {/* Introduction */}
                <div className="mb-12">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Event Music Indonesia (&quot;kami&quot;,
                        &quot;kita&quot;, atau &quot;milik kami&quot;)
                        berkomitmen untuk melindungi privasi pengguna kami.
                        Kebijakan Privasi ini menjelaskan bagaimana kami
                        mengumpulkan, menggunakan, menyimpan, dan melindungi
                        informasi pribadi Anda saat menggunakan website dan
                        layanan kami.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-200 pb-8"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <section.icon className="w-6 h-6 text-purple-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="space-y-6 pl-16">
                                {section.content.map((item: any, itemIndex) => (
                                    <div key={itemIndex}>
                                        {item?.subtitle && (
                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                                {item?.subtitle}
                                            </h3>
                                        )}
                                        {item?.text && (
                                            <p className="text-gray-600 mb-3">
                                                {item?.text}
                                            </p>
                                        )}
                                        {item?.list && (
                                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                                {item?.list.map(
                                                    (
                                                        listItem: any,
                                                        listIndex: any,
                                                    ) => (
                                                        <li key={listIndex}>
                                                            {listItem}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Data Retention */}
                <div className="mt-12 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        7. Penyimpanan Data
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Kami menyimpan data pribadi Anda selama diperlukan untuk
                        menyediakan layanan yang Anda minta, atau selama
                        diwajibkan oleh hukum. Data transaksi disimpan selama 5
                        tahun untuk keperluan akuntansi dan perpajakan. Setelah
                        periode tersebut, data akan dihapus atau dianonimkan
                        secara aman.
                    </p>
                </div>

                {/* Children Privacy */}
                <div className="mt-12 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        8. Privasi Anak-Anak
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Layanan kami tidak ditujukan untuk anak-anak di bawah 13
                        tahun. Kami tidak secara sengaja mengumpulkan informasi
                        pribadi dari anak-anak di bawah 13 tahun. Jika Anda
                        mengetahui bahwa anak Anda telah memberikan informasi
                        pribadi kepada kami, silakan hubungi kami agar kami
                        dapat mengambil tindakan yang diperlukan.
                    </p>
                </div>

                {/* Policy Changes */}
                <div className="mt-12 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        9. Perubahan Kebijakan
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Kami dapat memperbarui Kebijakan Privasi ini dari waktu
                        ke waktu. Perubahan signifikan akan diberitahukan
                        melalui email atau pemberitahuan di website kami. Kami
                        menyarankan Anda untuk meninjau kebijakan ini secara
                        berkala.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-purple-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        10. Hubungi Kami
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Jika Anda memiliki pertanyaan tentang Kebijakan Privasi
                        ini atau ingin menggunakan hak-hak Anda terkait data
                        pribadi, silakan hubungi kami:
                    </p>
                    <div className="space-y-2 text-gray-600 mb-6">
                        <p>
                            <strong>Email:</strong> privacy@eventmusic.id
                        </p>
                        <p>
                            <strong>Alamat:</strong> Jl. Sudirman No. 123,
                            Jakarta Pusat
                        </p>
                        <p>
                            <strong>Telepon:</strong> +62 21 1234 5678
                        </p>
                    </div>
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
