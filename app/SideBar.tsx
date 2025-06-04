import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./_components/ui/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { Button } from "./_components/ui/button";

interface SideBarProps {}

function SideBar({}: SideBarProps) {
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href={"/"}
          className="text-center font-bold text-2xl hover:text-primary flex-row justify-center flex items-center gap-2"
        >
          <ShoppingBag />
          Luminae
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant={"outline"}
          className=" cursor-pointer hover:bg-secondary hover:text-white"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBar;
