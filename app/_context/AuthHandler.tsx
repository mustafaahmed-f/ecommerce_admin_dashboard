import { cookies } from "next/headers";
import Providers from "../Providers";
import UserProvider from "./UserProvider";
import { verifyToken } from "../_utils/helperMethods/tokenMethods";

interface AuthHandlerProps {
  cookieStore: any;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

async function AuthHandler({
  defaultOpen,
  cookieStore,
  children,
}: AuthHandlerProps) {
  let user = {};
  try {
    const cookieHeader = {
      Cookie: cookieStore.toString(),
    };
    const cookie = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!);

    if (!cookie) throw new Error("No cookie found", { cause: 401 });

    const decoded = await verifyToken({
      token: cookie?.value,
      signature: process.env.SIGNATURE,
    });
    if (!decoded) throw new Error("Invalid token", { cause: 401 });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${decoded.id}`,
      {
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...cookieHeader,
        },
      },
    );
    const jsonResponse = await res.json(); // even if !res.ok, still need this

    if (!res.ok)
      throw new Error(
        jsonResponse.message || `Failed getting user : ${res.statusText} `,
      );

    if (!jsonResponse.success) {
      throw new Error(
        jsonResponse.error || jsonResponse.message || "Unknown error from API",
      );
    }

    user = jsonResponse.result;
  } catch (error: any) {
    console.log(error);
  }
  return (
    <UserProvider user={user}>
      <Providers defaultOpen={defaultOpen}>{children}</Providers>
    </UserProvider>
  );
}

export default AuthHandler;
