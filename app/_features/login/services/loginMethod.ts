const mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function loginFn(email: string, password: string) {
  const res = await fetch(`${mainURL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const jsonResponse = await res.json();

  if (!res.ok)
    throw new Error(
      jsonResponse.message || `Failed creating record : ${res.statusText} `,
    );

  if (!jsonResponse.success) {
    throw new Error(
      jsonResponse.error || jsonResponse.message || "Unknown error from API",
    );
  }

  return {
    success: jsonResponse.success,
    message: jsonResponse.message ?? "",
    result: jsonResponse.result,
  };
}
