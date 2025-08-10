// lib/cookies/user.ts
import Cookies from "js-cookie";

export type UserSnapshot = {
  id: string;
  role: "SELLER" | "ADMIN" | "CUSTOMER";
  emailVerified: boolean;
};

export function setUserCookie(user: UserSnapshot) {
  Cookies.set("user", JSON.stringify(user), {
    expires: 7,
    path: "/",
    secure: true,
  });
}

export function getUserFromCookie(): UserSnapshot | null {
  const raw = Cookies.get("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearUserCookie() {
  Cookies.remove("user");
}
