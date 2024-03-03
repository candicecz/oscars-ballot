"use client";
import { SelectCategory } from "./category/select";
import { CategoryCard } from "./category/card";
import { CategoryWithNominees } from "@/types";
import { useCallback, useEffect, useState } from "react";
import useInterval from "@/hooks/useInterval";
import { Grid } from "./category/grid";

// The Oscars are held at this date time.
const OSCARS_DATETIME = new Date("2024-03-10T19:00:00Z");

export const Ballot = ({
  categories,
}: {
  categories: CategoryWithNominees[];
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
        <p className="font-semibold text-center font-2xl py-10 mb-8 border-y-2 border-slate-200 dark:border-gray-700">
          NOW OPEN
        </p>
      )}
      <div className="text-center my-6">
        <h1 className="text-3xl font-medium mb-4 text-center">
          THE 96TH ACADEMY AWARDS | 2024
        </h1>
        <p className="text-lg font-extralight">
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
      <div className="px-6">
        <SelectCategory categories={categories} />
        <Grid>
          {categories.map((category) => {
            return (
              <div key={category._id} className="h-auto max-w-full ">
                <CategoryCard {...category} />
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
