import ComingSoonHomepages from "@/components/pages/homepages/coming-soon";
import EventsHomepages from "@/components/pages/homepages/events-home";
import HeroHomepages from "@/components/pages/homepages/hero";

export default function Home() {
    return (
        <section className="w-full">
            <HeroHomepages />
            <ComingSoonHomepages />

            <section
                className="w-full h-[350px] bg-gray-200 p-4 flex items-center justify-center"
                style={{
                    backgroundImage: `url('/Middle-Banner-Promo-Events.png')`,
                    backgroundPosition: "center",
                    backgroundSize: "object-fit",
                    backgroundRepeat: "no-repeat",
                }}
            ></section>

            <EventsHomepages />
        </section>
    );
}
