"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";

import { useDebounceFunction } from "@/hooks/use-debounce";

interface IRegularInput {
    onChange?: (e: string) => void;
}

export default function RegularInput({
    onChange = (e: string) => {},
}: IRegularInput) {
    const [value, setValue] = useState<string>("");
    const debouncedHandleChange = useDebounceFunction(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        },
        500
    );

    const handleSubmit = () => {
        onChange(value);
    };

    useEffect(() => {
        if (value) {
            onChange(value);
        }
    }, [value]);

    return (
        <div className="w-full flex gap-x-4">
            <Input
                onChange={debouncedHandleChange}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        // console.log("Key pressed:", e.key);
                        handleSubmit();
                    }
                }}
            />
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
}
