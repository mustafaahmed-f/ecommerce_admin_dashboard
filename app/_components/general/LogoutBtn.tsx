"use client";

import { showErrorToast } from "@/app/_utils/toasts";
import { useTransition } from "react";
import { Button } from "../ui/button";

const mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

function LogoutBtn() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      const res = await fetch(`${mainURL}/logout`, {
        method: "POST",
      });
      const data = await res.json();

      console.log(data);

      if (data?.success) {
        window.location.href = "/login";
      } else {
        showErrorToast(data?.message || "Error logging out");
      }
    });
  }
  return (
    <Button
      variant={"outline"}
      onClick={handleLogout}
      className={`${isPending && "pointer-events-none opacity-60"} bg-secondary w-full cursor-pointer text-white`}
      type="submit"
      disabled={isPending}
    >
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}

export default LogoutBtn;
