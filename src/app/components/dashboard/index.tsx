"use client";
import ThemeToggle from "../theme-toggle";
import { useSession, signOut } from "next-auth/react";

export const Dashboard = () => {
  const { data: session } = useSession();
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session?.user?.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  return (
    <div className="flex color-white p-8 text-slate-900 dark:text-white bg-white dark:bg-gray-800">
      <h1>
        <strong>Welcome</strong> {session?.user?.name?.split(" ")[0] || ""}!
      </h1>
      <ThemeToggle />
    </div>
  );
};
