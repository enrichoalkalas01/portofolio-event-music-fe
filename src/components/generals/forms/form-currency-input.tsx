import { UseFormReturn } from "react-hook-form";
import { CircleHelp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

// Fungsi untuk mengkonversi nilai sebelum ditampilkan
const getDisplayValue = (value: string | number): string => {
    if (value === undefined || value === null || value === "") return "";

    // Jika nilai sudah dalam bentuk number, konversi ke string dengan format yang benar
    if (typeof value === "number") {
        // Konversi number ke string dengan format ID (koma sebagai desimal)
        const valueStr = value.toString().replace(".", ",");
        return formatPrice(valueStr);
    }

    // Jika nilai dalam bentuk string, gunakan langsung
    return formatPrice(value);
};

// Fungsi format price seperti yang digunakan di contoh MUI
const formatPrice = (value: string | number): string => {
    if (!value && value !== 0) return "";

    // Convert to string and handle comma separator
    let valueStr = String(value);

    // Split by comma to handle decimal part
    const parts = valueStr.split(",");
    const wholePart = parts[0];

    // Format the whole part with dot separators
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Add back the decimal part if it exists
    if (parts.length > 1) {
        return `${formattedWholePart},${parts[1]}`;
    }

    return formattedWholePart;
};

interface IFormCurrencyInput {
    form: UseFormReturn<any>;
    name: string;
    labelName?: string | null;
    disable?: boolean;
    description?: string | null;
    placeholder?: string | null;
    className?: string | null;
    required?: boolean;
    tooltip?: string;
    tooltipComponent?: React.ReactNode | null;
    valueType?: "string" | "number"; // Masih disimpan untuk backwards compatibility
    propsInput?: { [key: string]: any };
    propsFormItem?: { [key: string]: any };
    propsFormControl?: { [key: string]: any };
    propsFormLabel?: { [key: string]: any };
    propsFormDescription?: { [key: string]: any };
    propsFormMessage?: { [key: string]: any };
}

export const FormCurrencyInput = ({
    form,
    name = "defaultInput",
    labelName,
    disable = false,
    description = null,
    placeholder = "0",
    className = null,
    required = false,
    tooltip = "",
    tooltipComponent = null,
    valueType, // Tidak lagi digunakan sebagai default, akan ditentukan dari propsInput.type
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsInput = {},
    propsFormDescription = {},
    propsFormMessage = {},
}: IFormCurrencyInput) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // State untuk menyimpan nilai yang diformat
    const [formattedValue, setFormattedValue] = useState("");

    // Deteksi tipe input dari propsInput.type (jika ada)
    // Fallback ke valueType prop jika tersedia, atau default ke "text"
    const inputType =
        propsInput.type || (valueType === "number" ? "number" : "text");

    // Tentukan cara menyimpan nilai berdasarkan inputType
    const shouldStoreAsNumber = inputType === "number";

    // Sync dengan form dan inisialisasi
    useEffect(() => {
        const subscription = form.watch((value, { name: fieldName }) => {
            if (fieldName === name || !fieldName) {
                const numericValue = value[name];
                if (numericValue !== undefined && numericValue !== null) {
                    setFormattedValue(getDisplayValue(numericValue));
                }
            }
        });

        // Inisialisasi nilai awal
        const initialValue = form.getValues(name);
        if (initialValue !== undefined && initialValue !== null) {
            setFormattedValue(getDisplayValue(initialValue));
        } else if (shouldStoreAsNumber) {
            form.setValue(name, 0, { shouldValidate: true });
            setFormattedValue(getDisplayValue(0));
        } else {
            form.setValue(name, "", { shouldValidate: true });
            setFormattedValue("");
        }

        return () => subscription.unsubscribe();
    }, [form, name, shouldStoreAsNumber]);

    // Handle special case for empty values based on inputType
    useEffect(() => {
        // Jika nilai awal kosong, set nilai default berdasarkan inputType
        const initialValue = form.getValues(name);
        if (
            initialValue === undefined ||
            initialValue === null ||
            initialValue === ""
        ) {
            if (shouldStoreAsNumber) {
                form.setValue(name, 0, { shouldValidate: true });
                setFormattedValue(getDisplayValue(0));
            } else {
                form.setValue(name, "", { shouldValidate: true });
                setFormattedValue("");
            }
        }
    }, [form, name, shouldStoreAsNumber]);

    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => {
                    return (
                        <>
                            <FormItem {...propsFormItem}>
                                {labelName && (
                                    <FormLabel {...propsFormLabel}>
                                        <div className="flex gap-1 items-center justify-start">
                                            <div className="w-auto">
                                                {labelName}
                                                {required && (
                                                    <span className="text-red-500 ml-1">
                                                        *
                                                    </span>
                                                )}
                                            </div>
                                            {tooltip && (
                                                <TooltipProvider
                                                    delayDuration={0}
                                                >
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <CircleHelp className="w-3 h-3 cursor-pointer" />
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
                                )}
                                <FormControl {...propsFormControl}>
                                    <Input
                                        ref={inputRef}
                                        placeholder={`${placeholder}`}
                                        disabled={disable}
                                        className={`text-left ${
                                            className || ""
                                        }`}
                                        value={formattedValue}
                                        // Jangan menggunakan type="number" karena kita ingin kontrol format
                                        // Prop type hanya digunakan untuk menentukan cara menyimpan nilai
                                        type="text"
                                        onKeyDown={(e) => {
                                            // Handle increment/decrement dengan tombol panah atas/bawah
                                            if (
                                                e.key === "ArrowUp" ||
                                                e.key === "ArrowDown"
                                            ) {
                                                e.preventDefault(); // Hindari default behavior

                                                // Ambil nilai saat ini
                                                const currentValue =
                                                    form.getValues(name);

                                                // Konversi ke number jika masih dalam bentuk string
                                                const currentNumericValue =
                                                    typeof currentValue ===
                                                    "string"
                                                        ? parseFloat(
                                                              currentValue
                                                                  .replace(
                                                                      /\./g,
                                                                      ""
                                                                  )
                                                                  .replace(
                                                                      ",",
                                                                      "."
                                                                  )
                                                          ) || 0
                                                        : currentValue || 0;

                                                // Tetapkan increment = 1 untuk semua nilai, sesuai permintaan pengguna
                                                const increment = 1;

                                                // Hitung nilai baru
                                                let newValue;
                                                if (e.key === "ArrowUp") {
                                                    newValue =
                                                        currentNumericValue +
                                                        increment;
                                                } else {
                                                    // ArrowDown
                                                    newValue = Math.max(
                                                        0,
                                                        currentNumericValue -
                                                            increment
                                                    );
                                                }

                                                // Simpan nilai baru ke form state
                                                if (shouldStoreAsNumber) {
                                                    form.setValue(
                                                        name,
                                                        newValue,
                                                        { shouldValidate: true }
                                                    );
                                                } else {
                                                    // Format to string without separators for storage
                                                    form.setValue(
                                                        name,
                                                        newValue
                                                            .toString()
                                                            .replace(".", ","),
                                                        { shouldValidate: true }
                                                    );
                                                }

                                                // Update tampilan
                                                setFormattedValue(
                                                    getDisplayValue(newValue)
                                                );
                                            }
                                        }}
                                        onChange={(e) => {
                                            let inputValue = e.target.value;

                                            // Hapus semua titik (separator ribuan)
                                            inputValue = inputValue.replace(
                                                /\./g,
                                                ""
                                            );

                                            // Validasi hanya angka dan koma
                                            if (!/^[\d,]*$/.test(inputValue))
                                                return;

                                            // Hitung jumlah koma
                                            const commaCount = (
                                                inputValue.match(/,/g) || []
                                            ).length;

                                            // Hanya izinkan maksimal 1 koma
                                            if (commaCount > 1) return;

                                            // Jika ada koma, batasi angka desimal menjadi 2 digit
                                            if (commaCount === 1) {
                                                const [_, decimalPart] =
                                                    inputValue.split(",");
                                                if (decimalPart?.length > 2)
                                                    return;
                                            }

                                            // Tentukan tipe nilai yang akan disimpan berdasarkan tipe input
                                            if (shouldStoreAsNumber) {
                                                // Konversi ke number sebelum disimpan di form state
                                                // Replace koma dengan titik untuk parsing yang benar
                                                const numericValue =
                                                    parseFloat(
                                                        inputValue.replace(
                                                            ",",
                                                            "."
                                                        )
                                                    ) || 0;
                                                field.onChange(numericValue); // Simpan sebagai number
                                            } else {
                                                // Simpan sebagai string (behavior asli)
                                                field.onChange(inputValue);
                                            }

                                            // Update display value
                                            setFormattedValue(
                                                formatPrice(inputValue)
                                            );
                                        }}
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
