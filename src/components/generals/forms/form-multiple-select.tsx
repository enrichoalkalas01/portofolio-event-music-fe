import { UseFormReturn } from "react-hook-form";
import { useEffect, useId, useState } from "react";
import lodash from "lodash";

import MultipleSelector, { Option } from "@/components/shadcn/ui/multiselect";
import { CircleHelp } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/ui/select";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { cn } from "@/lib/utils";

interface IFormMultipleSelect {
    readonly form: UseFormReturn<any>;
    readonly name: string;
    readonly defaultValue: Option[];
    readonly labelName?: string | null;
    readonly disable?: boolean;
    readonly description?: string | null;
    readonly placeholder?: string | null;
    readonly tooltip?: string;
    readonly tooltipComponent?: React.ReactNode | null;
    readonly propsFormItem?: { [key: string]: any };
    readonly propsFormControl?: { [key: string]: any };
    readonly propsFormLabel?: { [key: string]: any };
    readonly propsFormDescription?: { [key: string]: any };
    readonly propsFormMessage?: { [key: string]: any };
    readonly propsSelect?: { [key: string]: any };
    readonly propsSelectTrigger?: { [key: string]: any };
    readonly propsSelectValue?: { [key: string]: any };
    readonly propsSelectContent?: { [key: string]: any };
    readonly propsSelectItem?: { [key: string]: any };
    readonly propsMultiSelect?: { [key: string]: any };
    readonly onChangeValue?: (e: any) => void;

    readonly classNameFormItem?: string;
    readonly classNameFormLabel?: string;
    readonly classNameFormControl?: string;
    readonly classNameMultipleSelector?: string;
}

export function FormMultipleSelect({
    form, // For React Hook Form
    name = "defaultInput", // Form Naming Input ( Mandatory )
    defaultValue = [],
    labelName,
    disable = false,
    description = null,
    placeholder = "Search and select data",
    tooltip = "",
    tooltipComponent = null,
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsFormDescription = {},
    propsFormMessage = {},
    propsMultiSelect = {},
    onChangeValue = (e: any) => {},

    classNameFormItem = "",
    classNameFormLabel = "",
    classNameFormControl = "",
    classNameMultipleSelector = "",
}: IFormMultipleSelect) {
    const id = useId();
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        if (!lodash.isEqual(defaultValue, data)) {
            setData(defaultValue);
        }
    }, [defaultValue]);

    // const hanleOnChange = (e: any) => {
    //     form.setValue(`${name || ""}`, e);
    // };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: { field: any }) => {
                return (
                    <FormItem
                        {...propsFormItem}
                        className={cn(classNameFormItem)}
                    >
                        <FormLabel
                            {...propsFormLabel}
                            className={cn(classNameFormLabel)}
                        >
                            <div className="flex gap-1 items-center justify-start">
                                <div className="w-auto">
                                    {labelName ? labelName : ""}
                                </div>
                                {tooltip && (
                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger
                                                asChild
                                                className=""
                                            >
                                                <CircleHelp className="w-[12px] h-[12px] cursor-pointer" />
                                            </TooltipTrigger>
                                            <TooltipContent className="px-4 py-2 text-inherit text-white">
                                                {tooltipComponent || tooltip}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                        </FormLabel>
                        <FormControl
                            {...propsFormControl}
                            className={cn(classNameFormControl)}
                        >
                            <MultipleSelector
                                className={cn(classNameMultipleSelector)}
                                badgeClassName="py-[5px] px-2"
                                value={field.value}
                                disabled={disable}
                                commandProps={{
                                    label:
                                        propsMultiSelect?.command?.label ||
                                        "Search and select data",
                                }}
                                onChange={(e) => {
                                    field.onChange(e);
                                    onChangeValue(e);
                                }}
                                defaultOptions={propsMultiSelect.data || data}
                                options={propsMultiSelect.data || data}
                                placeholder={`${
                                    !disable
                                        ? propsMultiSelect.placeholder ||
                                          placeholder ||
                                          ""
                                        : ""
                                }`}
                                emptyIndicator={
                                    propsMultiSelect.emptyIndicator || (
                                        <p className="text-center text-sm">
                                            No results found
                                        </p>
                                    )
                                }
                                {...propsMultiSelect}
                            />
                        </FormControl>
                        {description && (
                            <FormDescription {...propsFormDescription}>
                                {description}
                            </FormDescription>
                        )}
                        <FormMessage {...propsFormMessage} />
                    </FormItem>
                );
            }}
        />
    );
}
