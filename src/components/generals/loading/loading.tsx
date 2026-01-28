import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

interface ILoadingComponent {
    type: "full" | "text" | "icon";
    propsIcon?: any;
}

export function LoadingComponent({ type, propsIcon }: ILoadingComponent) {
    return (
        <>
            {type === "full" && (
                <div className="w-auto flex gap-2 justify-center items-center">
                    <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                        {...propsIcon}
                    />
                    <span>Loading...</span>
                </div>
            )}

            {type !== "full" && (
                <div className="w-auto flex gap-2 justify-center items-center">
                    {type === "icon" && (
                        <LoaderCircleIcon
                            {...propsIcon}
                            className={cn(
                                "-ms-1 animate-spin",
                                propsIcon?.className
                            )}
                            size={16}
                            aria-hidden="true"
                        />
                    )}
                    {type === "text" && <span>Loading...</span>}
                </div>
            )}
        </>
    );
}
