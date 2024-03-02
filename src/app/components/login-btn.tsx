"use client";
import { useSession, signIn } from "next-auth/react";

export const LoginButton = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (session) {
    return <></>;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
};
