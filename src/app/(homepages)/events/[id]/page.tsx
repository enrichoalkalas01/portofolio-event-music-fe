import { Button } from "@/components/shadcn/ui/button";
import { Calendar, MapPin, Share2, Star, Ticket } from "lucide-react";

export default function Page() {
    return (
        <section className="w-full min-h-[80vh]">
            <div className="w-full h-[500px] bg-purple-800"></div>
            <div className="w-full lg:max-w-7xl py-8 px-4 mx-auto">
                <div className="w-full py-8">
                    <div className="w-full justify-between flex gap-4">
                        <div className="w-full">
                            <h1 className="text-3xl font-bold uppercase">
                                TY TRACK - REMASTERED -
                            </h1>
                        </div>
                        <div className="w-auto flex items-center gap-4">
                            <div className="flex gap-4">
                                <div className="flex">
                                    <Star className="w-7 h-7 cursor-pointer hover:text-gray-600" />
                                    {/* <StarOff className="w-7 h-7 cursor-pointer hover:text-gray-600" /> */}
                                </div>
                                <Share2 className="w-7 h-7 cursor-pointer hover:text-gray-600" />
                            </div>
                            <div className="w-auto">
                                <Button className="cursor-pointer">
                                    Buy Ticket
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-4 border-y py-8">
                    <div className="w-full">
                        <h3 className="text-xl font-bold uppercase">
                            Ticket Information
                        </h3>
                        <div className="w-full md:max-w-1/2 text-wrap flex items-start gap-4">
                            <Calendar className="w-10 h-10" />
                            <span>
                                Saturday, February 07, 2026 To Be Announced
                                (TBA)
                            </span>
                        </div>
                        <div className="w-full md:max-w-1/2 text-wrap flex items-start gap-4">
                            <MapPin className="w-10 h-10" />
                            <span>
                                Tennis Indoor Senayan Jl. Pintu Satu Senayan,
                                Gelora, Kecamatan Tanah Abang, Kota Jakarta
                                Pusat, DKI Jakarta 10270, Indonesia
                            </span>
                        </div>
                    </div>

                    <div className="w-full">
                        <h3 className="text-xl font-bold uppercase">
                            Hosted By
                        </h3>
                    </div>
                </div>

                <div className="w-full border-y py-8">
                    <h3 className="text-xl font-bold uppercase">Description</h3>
                    <p className="mt-4">
                        Ty Track Remastered merupakan sebuah konser istimewa
                        yang dirancang untuk menghadirkan kembali karya-karya
                        terbaik Ty Track dalam format pertunjukan yang lebih
                        modern dan eksklusif. Konser ini mengusung konsep
                        remastered, yaitu pengemasan ulang lagu-lagu pilihan
                        dengan aransemen baru, kualitas audio yang ditingkatkan,
                        serta sentuhan musikal yang lebih matang tanpa
                        menghilangkan karakter dan identitas asli Ty Track.
                        <br></br>
                        <br></br>
                        Konser ini tidak hanya berfokus pada penampilan musik,
                        tetapi juga pada pengalaman menyeluruh bagi penonton.
                        Setiap lagu disajikan dengan tata suara profesional yang
                        jernih dan seimbang, didukung oleh pencahayaan artistik
                        serta visual panggung yang dirancang khusus untuk
                        memperkuat suasana dan emosi dari setiap penampilan.
                        Perpaduan antara musik, visual, dan atmosfer panggung
                        menciptakan pengalaman konser yang imersif dan berkesan.
                        <br></br>
                        <br></br>
                        Ty Track Remastered juga menjadi ruang nostalgia bagi
                        para penggemar lama sekaligus jembatan bagi pendengar
                        baru untuk mengenal karya-karya Ty Track dalam versi
                        yang lebih relevan dengan perkembangan musik saat ini.
                        Interaksi antara musisi dan penonton menjadi salah satu
                        elemen penting dalam konser ini, sehingga tercipta
                        kedekatan emosional dan energi positif sepanjang
                        pertunjukan.
                        <br></br>
                        <br></br>
                        Melalui Ty Track Remastered, penonton diajak untuk
                        menikmati perjalanan musikal Ty Track dari masa ke masa,
                        disajikan dalam sebuah pertunjukan yang elegan,
                        profesional, dan penuh makna. Konser ini diharapkan
                        dapat memberikan pengalaman hiburan yang berkualitas
                        sekaligus meninggalkan kesan mendalam bagi setiap
                        penonton yang hadir.
                    </p>
                </div>

                <div className="w-full border-y py-8">
                    <h3 className="text-xl font-bold uppercase">
                        Other Events you may like
                    </h3>
                    {/* Container Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
                        {/* Single Card */}
                        <div className="w-full bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                            {/* Image Section */}
                            <div className="relative w-full aspect-[4/5]">
                                <img
                                    src="/path-to-image.jpg"
                                    alt="ATEEZ WORLD TOUR IN YOUR FANTASY"
                                    className="w-full h-full object-cover"
                                />
                                {/* Wishlist Button */}
                                <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                                {/* Date Section */}
                                <div className="flex flex-col items-center justify-start min-w-[40px] sm:min-w-[50px]">
                                    <span className="text-pink-500 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                                        JAN
                                    </span>
                                    <span className="text-white font-bold text-2xl sm:text-3xl leading-none">
                                        31
                                    </span>
                                </div>

                                {/* Info Section */}
                                <div className="flex flex-col gap-0.5 sm:gap-1 flex-1 min-w-0">
                                    <h2 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2">
                                        ATEEZ WORLD TOUR IN YOUR FANTASY
                                    </h2>
                                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                                        ICE BSD City, Hall 5-6
                                    </p>
                                    <p className="text-gray-500 text-[10px] sm:text-xs">
                                        Saturday, January 31, 2026
                                    </p>

                                    {/* Price & Interested */}
                                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs flex-wrap">
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            IDR 1,85K
                                        </span>
                                        <span className="text-gray-600">•</span>
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            150 interested
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Single Card */}
                        <div className="w-full bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                            {/* Image Section */}
                            <div className="relative w-full aspect-[4/5]">
                                <img
                                    src="/path-to-image.jpg"
                                    alt="ATEEZ WORLD TOUR IN YOUR FANTASY"
                                    className="w-full h-full object-cover"
                                />
                                {/* Wishlist Button */}
                                <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                                {/* Date Section */}
                                <div className="flex flex-col items-center justify-start min-w-[40px] sm:min-w-[50px]">
                                    <span className="text-pink-500 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                                        JAN
                                    </span>
                                    <span className="text-white font-bold text-2xl sm:text-3xl leading-none">
                                        31
                                    </span>
                                </div>

                                {/* Info Section */}
                                <div className="flex flex-col gap-0.5 sm:gap-1 flex-1 min-w-0">
                                    <h2 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2">
                                        ATEEZ WORLD TOUR IN YOUR FANTASY
                                    </h2>
                                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                                        ICE BSD City, Hall 5-6
                                    </p>
                                    <p className="text-gray-500 text-[10px] sm:text-xs">
                                        Saturday, January 31, 2026
                                    </p>

                                    {/* Price & Interested */}
                                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs flex-wrap">
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            IDR 1,85K
                                        </span>
                                        <span className="text-gray-600">•</span>
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            150 interested
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Single Card */}
                        <div className="w-full bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                            {/* Image Section */}
                            <div className="relative w-full aspect-[4/5]">
                                <img
                                    src="/path-to-image.jpg"
                                    alt="ATEEZ WORLD TOUR IN YOUR FANTASY"
                                    className="w-full h-full object-cover"
                                />
                                {/* Wishlist Button */}
                                <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                                {/* Date Section */}
                                <div className="flex flex-col items-center justify-start min-w-[40px] sm:min-w-[50px]">
                                    <span className="text-pink-500 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                                        JAN
                                    </span>
                                    <span className="text-white font-bold text-2xl sm:text-3xl leading-none">
                                        31
                                    </span>
                                </div>

                                {/* Info Section */}
                                <div className="flex flex-col gap-0.5 sm:gap-1 flex-1 min-w-0">
                                    <h2 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2">
                                        ATEEZ WORLD TOUR IN YOUR FANTASY
                                    </h2>
                                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                                        ICE BSD City, Hall 5-6
                                    </p>
                                    <p className="text-gray-500 text-[10px] sm:text-xs">
                                        Saturday, January 31, 2026
                                    </p>

                                    {/* Price & Interested */}
                                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs flex-wrap">
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            IDR 1,85K
                                        </span>
                                        <span className="text-gray-600">•</span>
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            150 interested
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Single Card */}
                        <div className="w-full bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                            {/* Image Section */}
                            <div className="relative w-full aspect-[4/5]">
                                <img
                                    src="/path-to-image.jpg"
                                    alt="ATEEZ WORLD TOUR IN YOUR FANTASY"
                                    className="w-full h-full object-cover"
                                />
                                {/* Wishlist Button */}
                                <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                                {/* Date Section */}
                                <div className="flex flex-col items-center justify-start min-w-[40px] sm:min-w-[50px]">
                                    <span className="text-pink-500 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                                        JAN
                                    </span>
                                    <span className="text-white font-bold text-2xl sm:text-3xl leading-none">
                                        31
                                    </span>
                                </div>

                                {/* Info Section */}
                                <div className="flex flex-col gap-0.5 sm:gap-1 flex-1 min-w-0">
                                    <h2 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2">
                                        ATEEZ WORLD TOUR IN YOUR FANTASY
                                    </h2>
                                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                                        ICE BSD City, Hall 5-6
                                    </p>
                                    <p className="text-gray-500 text-[10px] sm:text-xs">
                                        Saturday, January 31, 2026
                                    </p>

                                    {/* Price & Interested */}
                                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs flex-wrap">
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            IDR 1,85K
                                        </span>
                                        <span className="text-gray-600">•</span>
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            150 interested
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Duplicate cards untuk contoh grid... */}
                    </div>
                </div>
            </div>
        </section>
    );
}
