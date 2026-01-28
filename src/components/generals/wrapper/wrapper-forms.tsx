"use client";

// Library
import { UseFormReturn } from "react-hook-form";

// Components
import { Form } from "@/components/shadcn/ui/form";

// Interfaces
interface IWrapperForms {
    children?: React.ReactNode;
    className?: string;
    form: UseFormReturn<any>;
    onSubmitFunction?: (data: any) => void;
}

export const WrapperForms = ({
    children,
    className,
    form,
    onSubmitFunction = () => {},
}: IWrapperForms) => {
    const { handleSubmit } = form;

    return (
        <>
            <Form {...form}>
                <form
                    className={`${className}`}
                    onSubmit={handleSubmit(onSubmitFunction)}
                >
                    {children}
                </form>
            </Form>
        </>
    );
};
