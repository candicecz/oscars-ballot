"use client";

import { useCallback, useEffect, useState } from "react";
import { CategoryWithNominees, User } from "@/types";
import { BallotForm } from "./form";
import { SelectCategory } from "./category/select";
import useInterval from "@/hooks/useInterval";

// The Oscars are held at this date time.
const OSCARS_DATETIME = new Date("2024-03-10T19:00:00");

export const Ballot = ({
  categories,
  ballot,
}: {
  categories: CategoryWithNominees[];
  ballot?: User["ballot"];
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

  useEffect(() => {
    !isVotingOpen && stopInterval();
  }, [isVotingOpen, stopInterval]);
  return (
    <div className="flex flex-col">
      {isVotingOpen && (
        <p className="px-6 font-semibold text-center font-2xl py-10 mb-8 border-y-2 border-slate-200 dark:border-gray-700">
          NOW OPEN
        </p>
      )}
      <div className="text-center my-6 mx-4">
        <h1 className="text-xl font-medium mb-4 text-center sm:text-3xl">
          THE 96TH ACADEMY AWARDS | 2024
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
      <div className="bg-white/50 mb-32 rounded-sm w-full px-4 max-w-screen-3xl mx-auto sm:px-6 sm:w-600 md:8">
        <SelectCategory categories={categories} />
        <BallotForm
          categories={categories}
          isVotingOpen={isVotingOpen}
          ballot={ballot}
        />
      </div>
    </div>
  );
};
