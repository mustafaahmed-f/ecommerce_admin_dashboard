import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar";
import { Button } from "./_components/ui/button";
import { SidebarTrigger } from "./_components/ui/sidebar";

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <header>
      <div className="flex w-full items-center justify-between p-5">
        {/* <Button>SideBar</Button> */}
        <SidebarTrigger className="cursor-pointer" />
        <div className="flex items-center gap-4 rounded-3xl p-2">
          <p>
            Welcome, <span className="font-semibold">Mustafa</span>
          </p>
          <Avatar className="h-6 w-6">
            <AvatarImage src={"icons8-male-user-40.png"} alt={"Mustafa"} />
            <AvatarFallback>Mustafa</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default Header;
