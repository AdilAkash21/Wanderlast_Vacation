import { auth } from "@/lib/auth";

export async function getSession(request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    return session?.user ? session : null;
  } catch {
    return null;
  }
}
