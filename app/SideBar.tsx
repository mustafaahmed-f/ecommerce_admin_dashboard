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
import { mainConfig } from "./_utils/mainConfig";

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

  const config = mainConfig;
  const sideBarItems = config.sideBar;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href={"/"}
          className="text-center font-bold text-2xl hover:text-primary flex-row justify-center flex items-center gap-2"
        >
          <ShoppingBag />
          {config.title}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {sideBarItems.mainItems.map((item) => (
          <SidebarGroup key={item.name}>
            <SidebarGroupLabel>{item.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.name}>
                    <SidebarMenuButton asChild>
                      <Link href={subItem.href}>
                        <subItem.icon />
                        <span>{subItem.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant={"outline"}
          className=" cursor-pointer bg-secondary text-white"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBar;
