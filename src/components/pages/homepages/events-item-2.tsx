import { Star, Ticket } from "lucide-react";

export default function EventsItem2() {
    return (
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
    );
}
