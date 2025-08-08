import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar"
  

const items = [
    {
        title: "Tasks",
        url: "#",
    },
    {
        title: "Pending",
        url: "#"
    },
    {
        title: "Completed",
        url: "#"
    }
]
export function AppSidebar({children}: {children: React.ReactNode}) {
    return (
        <SidebarProvider>
            <Sidebar>
            <SidebarHeader>
                <div>
                    <p className="text-xl">Todo App</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupContent>
                    <SidebarMenu className="p-5">
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton className="cursor-pointer hover:bg-gray-200">
                                    {item.title}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )) }
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
            </Sidebar>
            <main>
                <SidebarTrigger className="cursor-pointer" />
            </main>
            <div className="mt-10 -ml-5">
                {children}
            </div>
        </SidebarProvider>
    )
}