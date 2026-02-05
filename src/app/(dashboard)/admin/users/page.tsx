import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import TablePageUsers from "@/components/pages/users/table-page";
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
                // buttonUrlComponent={
                //     <div className="w-auto">
                //         <Link href="/admin/users/create">
                //             <Button className="cursor-pointer">Create</Button>
                //         </Link>
                //     </div>
                // }
            >
                <TablePageUsers />
            </WrapperCard>
        </section>
    );
}
