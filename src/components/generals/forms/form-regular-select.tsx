import { UseFormReturn } from "react-hook-form";
import { useEffect, useId, useState } from "react";

import lodash from "lodash";
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

interface IFormRegularSelect {
    readonly form: UseFormReturn<any>;
    readonly name: string;
    readonly defaultValue: IDataSelect[] | { [key: string]: any }[] | [];
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
}

interface IDataSelect {
    id?: string;
    label: string;
    value: string;
}

export function FormRegularSelect({
    form, // For React Hook Form
    name = "defaultInput", // Form Naming Input ( Mandatory )
    defaultValue = [],
    labelName,
    disable = false,
    description = null,
    placeholder = "Select data",
    tooltip = "",
    tooltipComponent = null,
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsSelect = {},
    propsFormDescription = {},
    propsFormMessage = {},
    propsSelectTrigger = {},
    propsSelectValue = {},
    propsSelectContent = {},
    propsSelectItem = {},
}: IFormRegularSelect) {
    const id = useId();
    const [data, setData] = useState<any>(defaultValue);
    const [selectedData, setSelectedData] = useState<any>(undefined);

    useEffect(() => {
        if (!lodash.isEqual(defaultValue, data)) {
            setData(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => {}, [selectedData]);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: { field: any }) => {
                return (
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
                                                {tooltipComponent || tooltip}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                        </FormLabel>

                        <FormControl {...propsFormControl}>
                            <div className="*:not-first:mt-2">
                                <Select
                                    // {...field}
                                    // disabled={disable}
                                    // {...propsSelect}
                                    // onValueChange={(e: any) => {
                                    //     setSelectedData(e);
                                    //     field.onChange(e);
                                    // }}
                                    name={field.name}
                                    value={
                                        typeof field.value === "string"
                                            ? field.value
                                            : ""
                                    }
                                    disabled={disable}
                                    {...propsSelect}
                                    onValueChange={(e: any) => {
                                        setSelectedData(e);
                                        field.onChange(e);
                                    }}
                                >
                                    <SelectTrigger
                                        id={id}
                                        {...propsSelectTrigger}
                                    >
                                        <SelectValue
                                            placeholder={
                                                placeholder ||
                                                propsSelectValue.placeholder
                                            }
                                            {...field}
                                            {...propsSelectValue}
                                        />
                                    </SelectTrigger>
                                    <SelectContent
                                        {...propsSelectContent}
                                        className={cn(
                                            "[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2",
                                            propsSelectContent?.className
                                        )}
                                    >
                                        {data?.length > 0 &&
                                            data?.map((e: IDataSelect) => {
                                                return (
                                                    <SelectItem
                                                        key={e.value}
                                                        value={e.value}
                                                        {...propsSelectItem}
                                                    >
                                                        {e.label}
                                                    </SelectItem>
                                                );
                                            })}

                                        {data?.length === 0 && (
                                            <>
                                                <div className="p-4 w-full flex items-center justify-center">
                                                    No Data found.
                                                </div>
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
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
