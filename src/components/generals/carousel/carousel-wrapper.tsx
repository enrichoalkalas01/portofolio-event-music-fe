"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

// Components
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/shadcn/ui/carousel";

import { cn } from "@/lib/utils";

// Interfaces
export interface ICarouselHero {
    readonly classnameCarousel?: string;
    readonly classnameCarouselContent?: string;
    readonly classnameCarouselItem?: string;
    readonly classnameCarouselItemCard?: string;
    readonly classnameCarouselItemCardBG?: string;
    readonly classnameCarouselItemImages?: string;
    readonly classnameButtonNext?: string;
    readonly classnameButtonPrevious?: string;
    readonly imagesObjectFit?: string;
    readonly imagesWidthDefault?: number;
    readonly imagesHeightDefault?: number;
    readonly buttonPrevious?: boolean;
    readonly buttonNext?: boolean;
    readonly position?: "horizontal" | "vertical";
    readonly children?: React.ReactNode;
    readonly itemLength?: number;
    readonly carouselPrevious?: any;
    readonly carouselNext?: any;
}

export default function CarouselWrapper({
    classnameCarousel = "w-full h-full max-w-full",
    classnameCarouselContent = "h-full",
    classnameCarouselItem = "h-full p-0",
    classnameCarouselItemCard = "h-full w-full bg-slate-400 relative",
    classnameCarouselItemCardBG = "w-full h-full bg-black opacity-5 absolute top-0 left-0 z-40",
    classnameCarouselItemImages = "w-full h-full object-cover",
    classnameButtonNext = "right-0",
    classnameButtonPrevious = "left-0",
    buttonPrevious = false,
    buttonNext = false,
    position = "horizontal",
    children,
    itemLength = 3,
    carouselPrevious,
    carouselNext,
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
                {children}
            </CarouselContent>
            <CarouselPrevious
                className={cn(
                    `absolute`,
                    !buttonPrevious && "hidden",
                    classnameButtonPrevious
                )}
                {...carouselPrevious}
            />
            <CarouselNext
                className={cn(
                    `absolute`,
                    !buttonNext && "hidden",
                    classnameButtonNext
                )}
                {...carouselNext}
            />
        </Carousel>
    );
}
