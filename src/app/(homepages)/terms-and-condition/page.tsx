import { FileText, AlertTriangle, CreditCard, Ticket, XCircle, Scale, Mail } from "lucide-react";
import Link from "next/link";

export default function Page() {
    const lastUpdated = "1 Februari 2025";

    return (
        <section className="w-full h-auto">
            {/* Hero Section */}
            <div className="w-full h-[350px] bg-gradient-to-r from-purple-700 to-purple-500 flex items-center justify-center">
                <div className="text-center text-white px-4">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/20 rounded-full">
                            <FileText className="w-12 h-12" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Syarat dan Ketentuan
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                        Ketentuan penggunaan layanan Event Music Indonesia
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="w-full max-w-4xl mx-auto py-16 px-4">
                {/* Last Updated */}
                <div className="bg-purple-50 rounded-lg p-4 mb-8">
                    <p className="text-gray-600">
                        <span className="font-semibold">Terakhir diperbarui:</span>{" "}
                        {lastUpdated}
                    </p>
                </div>

                {/* Introduction */}
                <div className="mb-12">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Selamat datang di Event Music Indonesia. Dengan mengakses dan
                        menggunakan website serta layanan kami, Anda menyetujui untuk
                        terikat dengan Syarat dan Ketentuan berikut. Mohon baca dengan
                        seksama sebelum menggunakan layanan kami.
                    </p>
                </div>

                {/* Section 1: Definisi */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        1. Definisi
                    </h2>
                    <ul className="space-y-3 text-gray-600">
                        <li>
                            <strong>&quot;Platform&quot;</strong> mengacu pada website dan aplikasi
                            Event Music Indonesia.
                        </li>
                        <li>
                            <strong>&quot;Pengguna&quot;</strong> adalah setiap individu yang mengakses
                            atau menggunakan Platform.
                        </li>
                        <li>
                            <strong>&quot;Event&quot;</strong> adalah konser, festival, atau acara musik
                            yang dijual melalui Platform.
                        </li>
                        <li>
                            <strong>&quot;Tiket&quot;</strong> adalah bukti pembelian yang memberikan hak
                            akses ke Event tertentu.
                        </li>
                        <li>
                            <strong>&quot;Penyelenggara&quot;</strong> adalah pihak yang menyelenggarakan
                            Event.
                        </li>
                    </ul>
                </div>

                {/* Section 2: Ketentuan Umum */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        2. Ketentuan Umum
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            2.1. Dengan menggunakan Platform, Anda menyatakan bahwa Anda
                            berusia minimal 17 tahun atau memiliki persetujuan orang tua/wali.
                        </p>
                        <p>
                            2.2. Anda bertanggung jawab untuk menjaga kerahasiaan akun dan
                            password Anda.
                        </p>
                        <p>
                            2.3. Anda setuju untuk memberikan informasi yang akurat, terkini,
                            dan lengkap saat pendaftaran.
                        </p>
                        <p>
                            2.4. Kami berhak menolak layanan, menutup akun, atau membatalkan
                            pesanan jika terjadi pelanggaran ketentuan.
                        </p>
                    </div>
                </div>

                {/* Section 3: Pembelian Tiket */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Ticket className="w-8 h-8 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            3. Pembelian Tiket
                        </h2>
                    </div>
                    <div className="space-y-4 text-gray-600 pl-12">
                        <p>
                            3.1. Semua harga tiket yang tercantum dalam mata uang Rupiah (IDR)
                            dan sudah termasuk pajak yang berlaku.
                        </p>
                        <p>
                            3.2. Tiket yang sudah dibeli tidak dapat ditukar dengan event lain.
                        </p>
                        <p>
                            3.3. Setiap Pengguna memiliki batas maksimal pembelian tiket sesuai
                            ketentuan masing-masing Event.
                        </p>
                        <p>
                            3.4. Pembelian tiket dianggap selesai setelah pembayaran berhasil
                            diverifikasi.
                        </p>
                        <p>
                            3.5. E-ticket akan dikirimkan ke email terdaftar dalam waktu maksimal
                            15 menit setelah pembayaran berhasil.
                        </p>
                        <p>
                            3.6. Pengguna wajib memverifikasi kebenaran data tiket yang diterima.
                        </p>
                    </div>
                </div>

                {/* Section 4: Pembayaran */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <CreditCard className="w-8 h-8 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            4. Pembayaran
                        </h2>
                    </div>
                    <div className="space-y-4 text-gray-600 pl-12">
                        <p>
                            4.1. Pembayaran harus dilakukan dalam batas waktu yang ditentukan
                            (1 jam sejak pemesanan).
                        </p>
                        <p>
                            4.2. Pesanan yang tidak dibayar dalam batas waktu akan otomatis
                            dibatalkan.
                        </p>
                        <p>
                            4.3. Kami menerima pembayaran melalui transfer bank, kartu
                            kredit/debit, e-wallet, dan virtual account.
                        </p>
                        <p>
                            4.4. Biaya administrasi dapat dikenakan tergantung metode pembayaran
                            yang dipilih.
                        </p>
                        <p>
                            4.5. Pengguna bertanggung jawab atas kebenaran informasi pembayaran
                            yang diberikan.
                        </p>
                    </div>
                </div>

                {/* Section 5: Pembatalan dan Refund */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <XCircle className="w-8 h-8 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            5. Pembatalan dan Pengembalian Dana
                        </h2>
                    </div>
                    <div className="space-y-4 text-gray-600 pl-12">
                        <p>
                            5.1. <strong>Pembatalan oleh Pengguna:</strong> Kebijakan pembatalan
                            berbeda untuk setiap Event. Silakan cek halaman detail Event untuk
                            informasi spesifik.
                        </p>
                        <p>
                            5.2. <strong>Pembatalan oleh Penyelenggara:</strong> Jika Event
                            dibatalkan oleh Penyelenggara, Pengguna berhak atas pengembalian
                            dana penuh.
                        </p>
                        <p>
                            5.3. <strong>Penundaan Event (Reschedule):</strong> Tiket tetap
                            berlaku untuk jadwal baru. Pengguna yang tidak dapat hadir dapat
                            mengajukan refund sesuai kebijakan yang berlaku.
                        </p>
                        <p>
                            5.4. Proses pengembalian dana membutuhkan waktu 7-14 hari kerja
                            ke rekening atau metode pembayaran asal.
                        </p>
                        <p>
                            5.5. Biaya administrasi tidak dapat dikembalikan kecuali pembatalan
                            dilakukan oleh Penyelenggara.
                        </p>
                    </div>
                </div>

                {/* Section 6: Penggunaan Tiket */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        6. Penggunaan Tiket
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            6.1. Tiket hanya berlaku untuk Event, tanggal, dan waktu yang
                            tertera.
                        </p>
                        <p>
                            6.2. Tiket yang sudah di-scan tidak dapat digunakan kembali.
                        </p>
                        <p>
                            6.3. Penggandaan atau pemalsuan tiket adalah tindakan ilegal dan
                            akan ditindak sesuai hukum yang berlaku.
                        </p>
                        <p>
                            6.4. Pengguna wajib membawa identitas yang sesuai dengan nama di
                            tiket saat check-in.
                        </p>
                        <p>
                            6.5. Kami tidak bertanggung jawab atas tiket yang hilang, dicuri,
                            atau rusak karena kelalaian Pengguna.
                        </p>
                    </div>
                </div>

                {/* Section 7: Larangan */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            7. Larangan
                        </h2>
                    </div>
                    <div className="space-y-4 text-gray-600 pl-12">
                        <p>Pengguna dilarang untuk:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Menjual kembali tiket dengan harga di atas harga resmi</li>
                            <li>Menggunakan bot atau alat otomatis untuk pembelian tiket</li>
                            <li>Membuat akun palsu atau menggunakan identitas orang lain</li>
                            <li>Melakukan penipuan atau aktivitas ilegal lainnya</li>
                            <li>Mengganggu sistem keamanan Platform</li>
                            <li>Menyebarkan konten yang melanggar hukum atau merugikan pihak lain</li>
                        </ul>
                    </div>
                </div>

                {/* Section 8: Batasan Tanggung Jawab */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Scale className="w-8 h-8 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            8. Batasan Tanggung Jawab
                        </h2>
                    </div>
                    <div className="space-y-4 text-gray-600 pl-12">
                        <p>
                            8.1. Kami tidak bertanggung jawab atas kualitas, keamanan, atau
                            pelaksanaan Event yang diselenggarakan oleh pihak ketiga.
                        </p>
                        <p>
                            8.2. Kami tidak bertanggung jawab atas kerugian tidak langsung,
                            insidental, atau konsekuensial.
                        </p>
                        <p>
                            8.3. Kami tidak menjamin ketersediaan Platform secara terus-menerus
                            tanpa gangguan.
                        </p>
                        <p>
                            8.4. Tanggung jawab maksimal kami terbatas pada nilai tiket yang
                            dibeli.
                        </p>
                    </div>
                </div>

                {/* Section 9: Hak Kekayaan Intelektual */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        9. Hak Kekayaan Intelektual
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            9.1. Seluruh konten di Platform termasuk logo, desain, teks,
                            grafis, dan perangkat lunak adalah milik Event Music Indonesia
                            atau pemberi lisensi kami.
                        </p>
                        <p>
                            9.2. Pengguna tidak diizinkan untuk menyalin, memodifikasi,
                            mendistribusikan, atau menggunakan konten tanpa izin tertulis.
                        </p>
                    </div>
                </div>

                {/* Section 10: Perubahan Ketentuan */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        10. Perubahan Syarat dan Ketentuan
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            10.1. Kami berhak mengubah Syarat dan Ketentuan ini kapan saja.
                        </p>
                        <p>
                            10.2. Perubahan akan berlaku sejak dipublikasikan di Platform.
                        </p>
                        <p>
                            10.3. Penggunaan berkelanjutan setelah perubahan dianggap sebagai
                            persetujuan terhadap ketentuan baru.
                        </p>
                    </div>
                </div>

                {/* Section 11: Hukum yang Berlaku */}
                <div className="mb-10 border-b border-gray-200 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        11. Hukum yang Berlaku
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            11.1. Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai
                            dengan hukum Republik Indonesia.
                        </p>
                        <p>
                            11.2. Segala sengketa yang timbul akan diselesaikan melalui
                            musyawarah. Jika tidak tercapai kesepakatan, sengketa akan
                            diselesaikan di Pengadilan Negeri Jakarta Pusat.
                        </p>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-purple-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        12. Hubungi Kami
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini,
                        silakan hubungi kami:
                    </p>
                    <div className="space-y-2 text-gray-600 mb-6">
                        <p><strong>Email:</strong> legal@eventmusic.id</p>
                        <p><strong>Alamat:</strong> Jl. Sudirman No. 123, Jakarta Pusat</p>
                        <p><strong>Telepon:</strong> +62 21 1234 5678</p>
                    </div>
                    <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        Hubungi Kami
                    </Link>
                </div>

                {/* Agreement Notice */}
                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                    <p className="text-gray-600 text-sm text-center">
                        Dengan menggunakan layanan Event Music Indonesia, Anda menyatakan
                        telah membaca, memahami, dan menyetujui Syarat dan Ketentuan ini.
                    </p>
                </div>
            </div>
        </section>
    );
}
