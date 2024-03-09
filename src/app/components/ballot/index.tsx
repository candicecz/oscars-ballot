"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CategoryWithNominees, User } from "@/types";
import { BallotForm } from "./form";
import { SelectCategory } from "./category/select";
import useInterval from "@/hooks/useInterval";
import { Scoreboard } from "../scoreboard";

// The Oscars are held at this date time.
const OSCARS_DATETIME = new Date(`${process.env.NEXT_PUBLIC_OSCARS_DATETIME}`);
export const year = OSCARS_DATETIME.getFullYear();

export const Ballot = ({
  categories: defaultCategories,
  team,
  ...props
}: {
  ballot?: User["ballot"];
  categories: CategoryWithNominees[];
  team: User[];
  isAdmin: User["isAdmin"];
}) => {
  /***** Handle voting  *****/
  const [isVotingOpen, setIsVotingOpen] = useState(true);

  const checkVotingIsOpen = useCallback(() => {
    // Get the current time in New York or any eastern timezone.
    const now = Date.parse(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    setIsVotingOpen(now < OSCARS_DATETIME.getTime());
  }, []);

  // Stop the interval when voting is closed.
  let stopInterval = useInterval(checkVotingIsOpen, 1000);

  // on mount check if voting is open.
  useEffect(() => checkVotingIsOpen());
  useEffect(() => {
    !isVotingOpen && stopInterval();
  }, [isVotingOpen, stopInterval]);

  /***** Handle categories refetching *****/
  const {
    data: categories,
    error,
    refetch,
  } = useQuery<CategoryWithNominees[], Error>(
    "categories",
    async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
      ).then((res) => res.json());
      return data.categories;
    },
    {
      initialData: defaultCategories || [],
      refetchInterval: 1000 * 5, // Refetch every 5 seconds.,
      refetchIntervalInBackground: true,
      enabled: !isVotingOpen, // enable refetching when voting is closed since this is used to detect category winners.
    }
  );

  return (
    <>
      {!isVotingOpen && <Scoreboard categories={categories} team={team} />}
      <section id="ballot" className="flex flex-col">
        {isVotingOpen && (
          <p className="px-6 font-semibold text-center font-2xl py-10 mb-8 border-y-2 border-slate-200 dark:border-gray-700">
            NOW OPEN
          </p>
        )}
        <div className="text-center my-6 mx-4">
          <h1 className="text-xl font-medium mb-4 text-center sm:text-3xl">
            THE 96TH ACADEMY AWARDS | {year}
          </h1>
          <p className="text-md font-extralight sm:text-lg">
            {isVotingOpen
              ? `Voting closes at ${OSCARS_DATETIME.toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                })}.`
              : "Voting is closed."}
          </p>
        </div>
        {error && (
          <p className="text-center text-red-500">
            An error occurred while fetching categories.
          </p>
        )}
        {/* The ballot form and category selection. */}
        {categories && (
          <div className="bg-white/50 mb-32 rounded-sm w-full px-4 max-w-screen-3xl mx-auto sm:px-6 sm:w-600 dark:bg-transparent">
            <SelectCategory categories={categories} />
            <BallotForm
              categories={categories}
              isVotingOpen={isVotingOpen}
              triggerCategoriesUpdate={refetch}
              team={team}
              {...props}
            />
          </div>
        )}
      </section>
    </>
  );
};
