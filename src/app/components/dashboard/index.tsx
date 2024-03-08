"use client";
import ThemeToggle from "../theme-toggle";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { InviteUsers } from "./invite";
import { User } from "@/types";

export const Dashboard = ({ team }: { team: User[] }) => {
  const { data: session } = useSession();

  return (
    <section
      id="dashboard"
      className="flex items-center relative color-white text-slate-900 dark:text-white bg-white dark:bg-gray-800 sm:p-6"
    >
      <div className="flex flex-1 items-center justify-between flex-col-reverse sm:flex-row">
        <h1 className="py-4 flex-1 whitespace-nowrap sm:py-0">
          <strong>Welcome &nbsp;</strong>
          {session?.user?.name?.split(" ")[0] || ""}!
        </h1>
        <div className="flex flex-1 justify-center">
          <Image
            src="/assets/logo.png"
            width={40}
            height={50}
            alt="Picture of an oscar statue"
          />
        </div>
        <div className="flex flex-1 w-full justify-between p-2 sm:justify-end sm:p-0">
          <ThemeToggle />
          <InviteUsers team={team} />
          <button
            type="button"
            onClick={() => signOut()}
            className="mx-2 px-3 py-2 text-sm whitespace-nowrap font-medium text-center text-white bg-oscars-500 rounded-md hover:bg-oscars-600 focus:ring-4 focus:outline-none focus:ring-oscars-300 dark:bg-oscars-600 dark:hover:bg-oscars-700 dark:focus:ring-oscars-800"
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
};
