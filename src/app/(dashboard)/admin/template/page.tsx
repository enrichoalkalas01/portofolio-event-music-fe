import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import TablePageSystemParamsType from "@/components/pages/system-params-type/table-page";
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
                buttonUrlComponent={
                    <div className="w-auto">
                        <Link href="/admin/system-params-type/create">
                            <Button className="cursor-pointer">Create</Button>
                        </Link>
                    </div>
                }
            >
                <TablePageSystemParamsType />
            </WrapperCard>
        </section>
    );
}
