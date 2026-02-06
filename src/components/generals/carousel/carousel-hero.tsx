"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

// Components
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/shadcn/ui/carousel";

import { cn } from "@/lib/utils";

import CarouselContentImage from "./carousel-content-image";

// Interfaces
export interface ICarouselHero {
    readonly classnameCarousel?: string;
    readonly classnameCarouselContent?: string;
    readonly classnameCarouselItem?: string;
    readonly classnameCarouselItemCard?: string;
    readonly classnameCarouselItemCardBG?: string;
    readonly classnameCarouselItemImages?: string;
    readonly imagesObjectFit?: string;
    readonly imagesWidthDefault?: number;
    readonly imagesHeightDefault?: number;
    readonly buttonPrevious?: boolean;
    readonly buttonNext?: boolean;
    readonly position?: "horizontal" | "vertical";
    readonly backgroundOpacity?: string;
    readonly images: {
        readonly image_url: string;
        readonly image_alt: string;
        readonly image_width?: number;
        readonly image_height?: number;
        readonly className?: string;
        readonly image_objectFit?: string;
        readonly content?: {
            readonly position?: "left" | "center" | "right" | string;
            readonly status?: boolean;
            readonly title?: string;
            readonly subTitle?: string;
            readonly buttonStatus?: boolean;
            readonly buttonText?: string;
            readonly buttonUrl?: string;
        };
    }[];
}

export default function CarouselHero({
    classnameCarousel = "w-full h-full max-w-full relative",
    classnameCarouselContent = "h-full",
    classnameCarouselItem = "h-full p-0",
    classnameCarouselItemCard = "h-full w-full bg-slate-400 relative",
    classnameCarouselItemCardBG = "w-full h-full",
    classnameCarouselItemImages = "w-full h-full object-cover",
    imagesObjectFit = "contain",
    imagesWidthDefault = 1200,
    imagesHeightDefault = 720,
    buttonPrevious = false,
    buttonNext = false,
    position = "horizontal",
    images = [],
    backgroundOpacity = "",
}: ICarouselHero) {
    const plugin = React.useRef(
        Autoplay({ delay: 7500, stopOnInteraction: false })
    );

    return (
        <Carousel
            orientation={position}
            className={classnameCarousel}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className={classnameCarouselContent}>
                {images.map((image, index) => {
                    return (
                        <CarouselItem
                            key={image.image_url}
                            className={classnameCarouselItem}
                        >
                            <div className={classnameCarouselItemCard}>
                                {/* <Image
                                    width={
                                        image.image_width || imagesWidthDefault
                                    }
                                    height={
                                        image.image_height ||
                                        imagesHeightDefault
                                    }
                                    objectFit={imagesObjectFit}
                                    src={image.image_url}
                                    alt={image.image_alt}
                                    className={cn(
                                        classnameCarouselItemImages,
                                        image.className
                                    )}
                                    unoptimized={true}
                                    crossOrigin="anonymous"
                                    priority={true}
                                /> */}
                                <Image
                                    width={
                                        image.image_width || imagesWidthDefault
                                    }
                                    height={
                                        image.image_height ||
                                        imagesHeightDefault
                                    }
                                    src={image.image_url}
                                    alt={image.image_alt}
                                    className={cn(
                                        classnameCarouselItemImages,
                                        image.className
                                    )}
                                    objectFit={imagesObjectFit}
                                    unoptimized={true}
                                    crossOrigin="anonymous"
                                    loader={({ src }) => src} // Custom loader for unoptimized images
                                    // Still remove crossOrigin="anonymous"
                                />
                                {image?.content && (
                                    <CarouselContentImage
                                        position={
                                            image?.content?.position || "left"
                                        }
                                        classnameCarouselItemCardBG={
                                            classnameCarouselItemCardBG
                                        }
                                        plugin={plugin}
                                        title={`${image?.content?.title || ""}`}
                                        subTitle={`${
                                            image?.content?.subTitle || ""
                                        }`}
                                        buttonStatus={
                                            image?.content?.buttonStatus
                                        }
                                        buttonText={image?.content?.buttonText}
                                        buttonUrl={image?.content?.buttonUrl}
                                        backgroundOpacity={backgroundOpacity}
                                    />
                                )}
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious
                className={`left-0 absolute ${!buttonPrevious && "hidden"}`}
            />
            <CarouselNext
                className={`right-0 absolute ${!buttonNext && "hidden"}`}
            />
        </Carousel>
    );
}
