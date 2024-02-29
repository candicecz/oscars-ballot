"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button> */}
      </>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
};
