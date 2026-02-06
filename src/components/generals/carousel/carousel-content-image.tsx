"use client";

import { motion } from "framer-motion";

// Components
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/ui/button";

export default function CarouselContentImage({
    classnameCarouselItemCardBG,
    plugin,
    title,
    subTitle,
    position = "left",
    buttonStatus = false,
    buttonText = "CTA Button",
    buttonUrl,
    backgroundOpacity = "bg-black/60",
}: {
    readonly classnameCarouselItemCardBG: string;
    readonly position?: "left" | "center" | "right" | string;
    readonly plugin: any;
    readonly title: string;
    readonly subTitle?: string;
    readonly buttonStatus?: boolean;
    readonly buttonText?: string;
    readonly buttonUrl?: string;
    readonly backgroundOpacity?: string;
}) {
    return (
        <div
            className={cn(
                "absolute top-0 left-0 z-20",
                title && backgroundOpacity ? "bg-black/75" : backgroundOpacity,
                backgroundOpacity,
                classnameCarouselItemCardBG
            )}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <div
                className={cn(
                    `max-w-auto md:max-w-6xl mx-auto w-full h-full relative top-0 left-0 z-30 flex flex-col md:flex-row items-center justify-center`,

                    position === "left" && "md:justify-start",
                    position === "center" && "md:justify-center md:flex-col",
                    position === "right" && "md:justify-end"
                )}
            >
                <div
                    className={cn(
                        `w-full md:w-[80%] px-4 md:px-16 md:py-8 flex items-center justify-center`,
                        position === "left" &&
                            "justfiy-start text-left md:flex-col",
                        position === "center" &&
                            "justfiy-center text-center md:flex-col",
                        position === "right" &&
                            "justfiy-end text-right md:flex-col"
                    )}
                >
                    {title && (
                        <div className="w-full animate-fade-in">
                            <motion.h2
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                }}
                                className={cn(
                                    "text-white text-lg text-center md:text-5xl lg:text-6xl font-bold font-chakra text-gradient text-outline tracking-wider uppercase",
                                    position === "left" && "text-left",
                                    position === "center" && "text-center",
                                    position === "right" && "text-right"
                                )}
                            >
                                <div
                                    dangerouslySetInnerHTML={{ __html: title }}
                                ></div>
                            </motion.h2>
                        </div>
                    )}

                    {subTitle && (
                        <div className="w-full mt-6 text-white font-chakra animate-fade-in-delay-1">
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: 0.4,
                                }}
                                className="text-xs md:text-base lg:text-lg"
                            >
                                {subTitle}
                            </motion.p>
                        </div>
                    )}

                    {buttonStatus && (
                        <div
                            className={cn(
                                "w-full mt-6 flex",
                                position === "left" && "md:justify-start",
                                position === "center" && "md:justify-center",
                                position === "right" && "md:justify-end"
                            )}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: 0.8,
                                }}
                                className={cn(
                                    "",
                                    position === "left" &&
                                        "text-left flex justify-start",
                                    position === "center" &&
                                        "text-center flex justify-center",
                                    position === "right" &&
                                        "text-right justify-right"
                                )}
                            >
                                <Button
                                    variant="link"
                                    className="px-0 text-secondary hover:cursor-pointer"
                                    onClick={() =>
                                        (window.location.href = `${
                                            buttonUrl || "/"
                                        }`)
                                    }
                                >
                                    <span className="text-white hover:text-primary">
                                        {buttonText}
                                    </span>
                                </Button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
