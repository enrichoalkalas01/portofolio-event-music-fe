"use client";

import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/ui/select";

interface ISelectSimple {
    placeholder?: string;
    defaultValue?: string;
    value?: string | number | null | undefined;
    defaultValueArray?: { label: string; value: string }[];
    onChangeValue?: (value: any) => void;
    onChangeSelected?: (value: string) => void;
}

export default function SelectSimple({
    defaultValue,
    defaultValueArray = [],
    value,
    placeholder = "Select data",
    onChangeValue = (value: any) => {},
    onChangeSelected = (value: string) => {},
}: ISelectSimple) {
    const [Value, setValue] = React.useState<string>("");

    React.useEffect(() => {}, [Value]);

    React.useEffect(() => {
        if (value) {
            setValue(String(Number(value)));
        }
    }, [value]);

    return (
        <>
            <Select
                defaultValue={defaultValue}
                value={Value}
                onValueChange={(e) => {
                    setValue(e);
                    onChangeSelected(e);
                }}
                onOpenChange={(e) => {
                    onChangeValue(e);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue
                        placeholder={placeholder}
                        className="text-sm"
                    />
                </SelectTrigger>
                <SelectContent className="w-full">
                    <SelectGroup>
                        {defaultValueArray.map((item, index) => (
                            <SelectItem key={index} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
}
