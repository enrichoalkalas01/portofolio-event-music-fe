"use client";

import * as React from "react";
import Link from "next/link";
import {
    CardHeader,
    CardFooter,
    Card,
    CardContent,
} from "@/components/shadcn/ui/card";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

interface PropsWrapperCard {
    children: React.ReactNode;
    headerStatus?: boolean;
    headerComponent?: React.ReactNode;
    headerTitle?: string;
    headerSubTitle?: string;
    footerStatus?: boolean;
    footerText?: string;
    footerComponent?: React.ReactNode;
    className?: string;
    classNameContent?: string;
    classNameFooter?: string;
    classNameHeader?: string;
    backStatus?: boolean;
    backUrl?: string;
    backText?: string;
    buttonUrl?: string;
    buttonUrlComponent?: React.ReactNode;
    buttonTopStatus?: boolean;
    buttonOnClick?: () => void;
}

export const WrapperCard = ({
    children,
    headerStatus = false,
    headerComponent,
    headerTitle = "Title here",
    headerSubTitle = "Sub title here",
    footerStatus = false,
    footerText,
    footerComponent,
    className,
    classNameContent,
    classNameFooter,
    classNameHeader,
    backStatus = false,
    backUrl,
    backText = "Back",
    buttonUrl,
    buttonUrlComponent,
    buttonTopStatus = false,
    buttonOnClick,
}: PropsWrapperCard) => {
    return (
        <Card className={className}>
            <div className="flex w-full items-center">
                {backStatus && (
                    <a
                        className="pt-4 pl-4 flex items-center"
                        href={backUrl ?? "/"}
                    >
                        <FaChevronCircleLeft className="mr-2" />
                        {backText}
                    </a>
                )}

                {/* Set Activeable Component For Header */}
                {headerStatus && (
                    <CardHeader
                        className={cn(`w-full p-0 pt-4 px-4`, classNameHeader)}
                    >
                        {/* If header component is null, change into text mode */}
                        {!headerComponent && (
                            <div className="flex items-center justify-between space-y-2">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        <span>{headerTitle}</span>
                                    </h2>
                                    <p className="text-muted-foreground">
                                        <span>{headerSubTitle}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* If header component is not null, change all text mode into component mode */}
                        {headerComponent}
                    </CardHeader>
                )}

                {buttonTopStatus && !buttonUrlComponent && (
                    <>
                        <div
                            className={cn("pt-4 px-4 w-full flex justify-end")}
                        >
                            <Link href={`${buttonUrl || ""}`}>
                                <Button>Create</Button>
                            </Link>
                        </div>
                    </>
                )}

                {buttonUrlComponent && (
                    <div className={cn("pt-4 px-4 w-full flex justify-end")}>
                        {buttonUrlComponent}
                    </div>
                )}
            </div>

            {/* Content Based On Component Children */}
            <CardContent className={cn(`py-4 px-4`, classNameContent)}>
                {children}
            </CardContent>

            {/* Set Activeable Component For Footer */}
            {footerStatus && (
                <CardFooter className={cn(`p-0 pb-4 px-4`, classNameFooter)}>
                    {/* If footer component is null, change into text mode */}
                    {!footerComponent && <span>{footerText}</span>}
                    {/* If footer component exist, change text mode into component mode */}
                    {footerComponent}
                </CardFooter>
            )}
        </Card>
    );
};
