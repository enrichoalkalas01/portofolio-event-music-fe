import { Music, Users, Award, Target, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Page() {
    const stats = [
        { number: "500+", label: "Event Sukses" },
        { number: "50+", label: "Artis Partner" },
        { number: "10+", label: "Tahun Pengalaman" },
        { number: "100K+", label: "Penonton Bahagia" },
    ];

    const values = [
        {
            icon: Heart,
            title: "Passion",
            description:
                "Kami mencintai musik dan berkomitmen untuk menghadirkan pengalaman terbaik di setiap event.",
        },
        {
            icon: Award,
            title: "Kualitas",
            description:
                "Standar tinggi dalam setiap aspek, dari perencanaan hingga eksekusi event.",
        },
        {
            icon: Users,
            title: "Kolaborasi",
            description:
                "Bekerja sama dengan artis, vendor, dan klien untuk menciptakan momen tak terlupakan.",
        },
        {
            icon: Sparkles,
            title: "Inovasi",
            description:
                "Selalu menghadirkan konsep kreatif dan teknologi terbaru dalam setiap pertunjukan.",
        },
    ];

    const team = [
        {
            name: "Ahmad Rizki",
            role: "Founder & CEO",
            image: "/images/team/team-1.jpg",
        },
        {
            name: "Sarah Putri",
            role: "Creative Director",
            image: "/images/team/team-2.jpg",
        },
        {
            name: "Budi Santoso",
            role: "Event Manager",
            image: "/images/team/team-3.jpg",
        },
        {
            name: "Maya Dewi",
            role: "Marketing Lead",
            image: "/images/team/team-4.jpg",
        },
    ];

    return (
        <section className="w-full h-auto">
            {/* Hero Section */}
            <div className="w-full h-[500px] bg-gradient-to-r from-purple-700 to-purple-500 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30" />
                <div className="text-center text-white relative z-10 px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Tentang Kami
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Menghadirkan pengalaman musik tak terlupakan sejak 2014
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <div className="w-full max-w-7xl mx-auto py-20 px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-gray-800">
                            Cerita Kami
                        </h2>
                        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                            Event Music Indonesia didirikan pada tahun 2014 dengan
                            satu visi sederhana: menghubungkan pecinta musik dengan
                            artis favorit mereka melalui event-event berkualitas
                            tinggi.
                        </p>
                        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                            Berawal dari sebuah tim kecil yang passionate terhadap
                            musik, kami telah berkembang menjadi salah satu
                            penyelenggara event musik terpercaya di Indonesia.
                            Dengan pengalaman lebih dari satu dekade, kami telah
                            sukses menyelenggarakan ratusan konser, festival, dan
                            acara musik privat.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Kami percaya bahwa musik memiliki kekuatan untuk
                            menyatukan orang-orang dan menciptakan kenangan yang
                            akan bertahan selamanya. Itulah mengapa kami selalu
                            berusaha memberikan yang terbaik di setiap event yang
                            kami selenggarakan.
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden bg-purple-100 flex items-center justify-center">
                        <Music className="w-32 h-32 text-purple-300" />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="w-full bg-purple-600 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center text-white">
                                <div className="text-4xl md:text-5xl font-bold mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-lg opacity-90">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="w-full max-w-7xl mx-auto py-20 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">
                        Visi & Misi
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-purple-600 rounded-full">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                Visi
                            </h3>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Menjadi penyelenggara event musik terdepan di Indonesia
                            yang dikenal karena kualitas, inovasi, dan kemampuan
                            menciptakan pengalaman musik yang tak terlupakan bagi
                            semua kalangan.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-purple-600 rounded-full">
                                <Music className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                Misi
                            </h3>
                        </div>
                        <ul className="text-gray-600 text-lg space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                Menyelenggarakan event musik berkualitas tinggi
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                Mendukung perkembangan industri musik Indonesia
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                Memberikan platform bagi artis lokal dan internasional
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                Menciptakan pengalaman berkesan bagi setiap penonton
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="w-full bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">
                            Nilai-Nilai Kami
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Prinsip yang menjadi landasan kami dalam setiap event
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-3 bg-purple-100 rounded-full w-fit mb-4">
                                    <value.icon className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="w-full max-w-7xl mx-auto py-20 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">
                        Tim Kami
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Orang-orang berbakat di balik setiap event sukses
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="text-center group"
                        >
                            <div className="relative h-[300px] rounded-2xl overflow-hidden mb-4 bg-purple-100 flex items-center justify-center">
                                <Users className="w-20 h-20 text-purple-300 group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">
                                {member.name}
                            </h3>
                            <p className="text-purple-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full bg-gradient-to-r from-purple-700 to-purple-500 py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-6 text-white">
                        Siap Membuat Event Musik Impian Anda?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Hubungi kami sekarang dan mari wujudkan bersama!
                    </p>
                    <a
                        href="/contact-us"
                        className="inline-block bg-white text-purple-600 font-semibold px-8 py-4 rounded-full hover:bg-purple-50 transition-colors"
                    >
                        Hubungi Kami
                    </a>
                </div>
            </div>
        </section>
    );
}
