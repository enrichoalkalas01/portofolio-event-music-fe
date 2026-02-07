import { parseEventDate } from "@/lib/parsed-date";
import { ConverterCurrency } from "@/utils/currency";
import { Star, Ticket } from "lucide-react";
import Link from "next/link";

const BaseUrlImage =
    process.env.NEXT_PUBLIC_URL_IMAGE ||
    "https://files.swarnatactical.com/tester-minio/";

export default function EventsItem2({ data }: { data: any }) {
    const parsedDate = parseEventDate(data?.eventDate, { lang: "en" });

    const thumbnail = !data?.thumbnail?.[0]
        ? "/no-image-available.jpg"
        : BaseUrlImage + data?.thumbnail?.[0]?.name;

    return (
        <div className="w-full bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            {/* Image Section */}
            <div className="relative w-full aspect-[4/5]">
                <img
                    src={thumbnail}
                    alt={data?.title}
                    className="w-full h-full object-cover"
                />
                {/* Wishlist Button */}
                {/* <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button> */}
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                {/* Date Section */}
                <div className="flex flex-col items-center justify-start min-w-[40px] sm:min-w-[50px]">
                    <span className="text-pink-500 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                        {parsedDate?.start?.dayShort}
                    </span>
                    <span className="text-white font-bold text-2xl sm:text-3xl leading-none">
                        {parsedDate?.start?.date}
                    </span>
                </div>

                {/* Info Section */}
                <div className="flex flex-col gap-0.5 sm:gap-1 flex-1 min-w-0">
                    <h2 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2 hover:text-primary">
                        <Link href={`/events/${data?._id}`}>{data?.title}</Link>
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                        {data?.location}
                    </p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">
                        {parsedDate?.start?.day}, {parsedDate?.start?.dateMonth}
                        , {parsedDate?.start?.year}
                    </p>

                    {/* Price & Interested */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs flex-wrap">
                        <span className="flex items-center gap-1 text-gray-400">
                            <Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {ConverterCurrency({ amount: data?.price || 0 })}
                        </span>
                        {/* <span className="text-gray-600">•</span>
                        <span className="flex items-center gap-1 text-gray-400">
                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            150 interested
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
