import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import TablePageSystemParamsType from "@/components/pages/system-params-type/table-page";

export default function Page() {
    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="List Data"
                headerSubTitle=""
                className="p-0 gap-0"
            >
                <TablePageSystemParamsType />
            </WrapperCard>
        </section>
    );
}
