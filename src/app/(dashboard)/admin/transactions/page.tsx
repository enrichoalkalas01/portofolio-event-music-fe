import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import TablePageTransactions from "@/components/pages/transactions/table-page";
import { Button } from "@/components/shadcn/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="List Data"
                headerSubTitle=""
                className="p-0 gap-0"
            >
                <TablePageTransactions />
            </WrapperCard>
        </section>
    );
}
