"use client";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "../theme-toggle";

export const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="flex color-white p-8 text-slate-900 dark:text-white bg-white dark:bg-gray-800">
      <h1>
        <strong>Welcome</strong> {session?.user?.name?.split(" ")[0] || ""}!
      </h1>
      <ThemeToggle />
    </div>
  );
};
