import Footers from "@/components/pages/headers/footer";
import Headers from "@/components/pages/headers/headers";

export default function LayoutHomepages({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Headers />
            {children}
            <Footers />
        </>
    );
}
