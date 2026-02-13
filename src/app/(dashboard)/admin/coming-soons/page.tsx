import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import TablePageComingSoon from "@/components/pages/coming-soon/table-page";
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
                        <Link href="/admin/events/create">
                            <Button className="cursor-pointer">Create</Button>
                        </Link>
                    </div>
                }
            >
                <TablePageComingSoon />
            </WrapperCard>
        </section>
    );
}
