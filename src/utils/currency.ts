interface IConvertToRupiah {
    amount: number;
    locale?: string;
    currency?: string;
    style?: "currency" | "decimal" | "percent" | "unit";
}

export function ConverterCurrency({
    amount = 0,
    locale = "id-ID",
    currency = "IDR",
    style = "currency",
}: IConvertToRupiah): string {
    return amount.toLocaleString(locale, {
        style: style,
        currency: currency,
    });
}
