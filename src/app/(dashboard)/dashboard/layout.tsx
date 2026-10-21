import DashboardBreadcrumb from "@/components/shadcn/dashboard-breadcrumb";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { Separator } from "@/components/shadcn/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/shadcn/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/90 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <DashboardBreadcrumb />
                    </div>
                </header>
                <div className="w-full p-4 md:p-6 flex flex-col gap-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
