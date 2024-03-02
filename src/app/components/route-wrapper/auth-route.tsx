"use client";
import { useSession } from "next-auth/react";

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated") {
    return <></>;
  }

  return <>{children}</>;
};
