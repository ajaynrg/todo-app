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
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";
  

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
        title: "Upcoming",
        url: "#"
    },
    {
        title: "Completed",
        url: "#"
    }
]

export function AppSidebar({children}: {children: React.ReactNode}) {
    const navigate = useNavigate()

    const onMenuItemClick = (title:string) => {
        navigate(title);
    }
    
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
                                <SidebarMenuButton 
                                    className="cursor-pointer hover:bg-gray-200"
                                    onClick={()=> onMenuItemClick(item.title.toLowerCase())}
                                >
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