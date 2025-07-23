"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar";
import { SidebarTrigger } from "./_components/ui/sidebar";
import { useUserContext } from "./_context/UserProvider";
import Notifications from "./_features/notifications/_subComponents/Notifications";

interface HeaderProps {}

function Header({}: HeaderProps) {
  const { user } = useUserContext();
  return (
    <header>
      <div className="flex w-full items-center justify-between p-5">
        {/* <Button>SideBar</Button> */}
        <SidebarTrigger className="cursor-pointer" />
        <div className="flex items-center gap-4 sm:gap-6">
          <Notifications />
          <div className="flex items-center gap-4 rounded-3xl p-2">
            <p>
              Welcome,{" "}
              <span className="font-semibold">
                {user.firstName + " " + user.lastName}
              </span>
            </p>
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={user.profileImage || "icons8-male-user-40.png"}
                alt={"Mustafa"}
              />
              <AvatarFallback>Mustafa</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
