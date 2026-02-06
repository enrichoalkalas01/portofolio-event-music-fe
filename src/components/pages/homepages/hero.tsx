"use client";

import CarouselHero from "@/components/generals/carousel/carousel-hero";
import { useQuery } from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function HeroHomepages() {
    const carouselImages = [
        {
            image_url: "/music-event-banner-1.jpg",
            image_alt: "Product",
            content: {
                position: "left",
                status: false,
                // title: "Test",
                // subTitle: "Test",
                buttonStatus: false,
                buttonText: "See Products",
                buttonUrl: "/shop",
            },
        },
        {
            image_url: "/bg-event-music.jpg",
            image_alt: "Product",
            content: {
                position: "left",
                status: false,
                // title: "Test",
                // subTitle: "Test",
                buttonStatus: false,
                buttonText: "See Products",
                buttonUrl: "/shop",
            },
        },
        {
            image_url: "/music-event-banner-2.jpg",
            image_alt: "Product",
            content: {
                position: "left",
                status: false,
                // title: "Test",
                // subTitle: "Test",
                buttonStatus: false,
                buttonText: "See Products",
                buttonUrl: "/shop",
            },
        },
    ];

    return (
        <section className="w-full h-screen lg:h-[700px] bg-black/90">
            <div className="w-full h-full">
                <CarouselHero
                    images={carouselImages || []}
                    classnameCarouselItem="h-screen lg:h-[700px]"
                    classnameCarouselItemImages="w-full h-full object-fit object-center"
                />
            </div>
        </section>
    );
}
