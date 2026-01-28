import { UseFormReturn } from "react-hook-form";
import { CircleHelp } from "lucide-react";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

interface IFormRegularInput {
    form: UseFormReturn<any>;
    name: string;
    labelName?: string | null;
    disable?: boolean;
    type?: string | null;
    description?: string | null;
    placeholder?: string | null;
    className?: string | null;
    classNameInput?: string | null;
    classNameLabel?: string | null;
    classNameMsg?: string | null;
    autoComplete?: "on" | "off";
    tooltip?: string;
    tooltipComponent?: React.ReactNode | null;
    propsInput?: { [key: string]: any };
    propsFormItem?: { [key: string]: any };
    propsFormControl?: { [key: string]: any };
    propsFormLabel?: { [key: string]: any };
    propsFormDescription?: { [key: string]: any };
    propsFormMessage?: { [key: string]: any };
}

export const FormRegularInput = ({
    form, // For React Hook Form
    name = "defaultInput", // Form Naming Input ( Mandatory )
    labelName,
    disable = false,
    type = "text",
    description = null,
    placeholder = "input here..",
    autoComplete = "off",
    tooltip = "",
    tooltipComponent = null,
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsInput = {},
    propsFormDescription = {},
    propsFormMessage = {},
}: IFormRegularInput) => {
    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }: { field: any }) => {
                    return (
                        <>
                            <FormItem {...propsFormItem}>
                                <FormLabel {...propsFormLabel}>
                                    <div className="flex gap-1 items-center justify-start">
                                        <div className="w-auto">
                                            {labelName ? labelName : ""}
                                        </div>
                                        {tooltip && (
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <CircleHelp className="w-[12px] h-[12px] cursor-pointer" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="px-4 py-2 text-inherit text-white">
                                                        {tooltipComponent ||
                                                            tooltip}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </FormLabel>
                                <FormControl {...propsFormControl}>
                                    <Input
                                        autoComplete={autoComplete}
                                        placeholder={placeholder}
                                        disabled={disable}
                                        type={type}
                                        {...field}
                                        {...propsInput}
                                    />
                                </FormControl>
                                {description && (
                                    <FormDescription {...propsFormDescription}>
                                        {description}
                                    </FormDescription>
                                )}
                                <FormMessage {...propsFormMessage} />
                            </FormItem>
                        </>
                    );
                }}
            />
        </>
    );
};
