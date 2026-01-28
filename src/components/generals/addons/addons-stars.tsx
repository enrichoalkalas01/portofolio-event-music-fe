"use client";

// Icons
import { StarIcon } from "@heroicons/react/20/solid";

interface IAddonsStars {
    rating: number;
    classname?: string;
    sizeRating?: number;
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function AddonsStars({
    rating,
    classname = "w-full ",
    sizeRating = 5,
}: IAddonsStars) {
    return (
        <>
            <div className={classNames("flex", classname)}>
                {[0, 1, 2, 3, 4].map((value) => (
                    <StarIcon
                        key={value}
                        aria-hidden="true"
                        className={classNames(
                            rating > value
                                ? "text-orange-400"
                                : "text-gray-200",
                            `size-${sizeRating} shrink-0`
                        )}
                    />
                ))}
            </div>
        </>
    );
}
