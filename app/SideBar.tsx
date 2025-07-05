import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import LogoutBtn from "./_components/general/LogoutBtn";
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
import { mainConfig } from "./_utils/mainConfig";

function SideBar() {
  const config = mainConfig;
  const sideBarItems = config.sideBar;

  return (
    <Sidebar className="z-50">
      <SidebarHeader>
        <Link
          href={"/"}
          className="hover:text-primary flex flex-row items-center justify-center gap-2 text-center text-2xl font-bold"
        >
          <span className="text-primary">
            <ShoppingBag />
          </span>
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
        <LogoutBtn />
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBar;
