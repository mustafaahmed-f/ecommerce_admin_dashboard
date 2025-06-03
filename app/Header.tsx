import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar";
import { Button } from "./_components/ui/button";

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <div className="w-full p-5 flex items-center justify-between">
      <Button>SideBar</Button>
      <div className="p-2 rounded-3xl flex items-center gap-4">
        <p>
          Welcome, <span className="font-semibold">Mustafa</span>
        </p>
        <Avatar className="h-6 w-6">
          <AvatarImage src={"icons8-male-user-40.png"} alt={"Mustafa"} />
          <AvatarFallback>Mustafa</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
