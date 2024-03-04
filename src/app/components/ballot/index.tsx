"use client";
import { SelectCategory } from "./category/select";
import { CategoryCard } from "./category/card";
import { CategoryWithNominees, Nominee } from "@/types";
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

  /***** Handle form submission *****/
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [form, setForm] = useState<{
    [key: CategoryWithNominees["_id"]]: Nominee["_id"];
  }>({});

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isVotingOpen) {
      console.log("submit form", form);
      setFormIsSubmitted(true);
    }
  };

  const missingCategories = formIsSubmitted
    ? categories.filter((category) => !form[category._id])
    : [];

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
        <form onSubmit={handleFormSubmit}>
          <Grid>
            {categories.map((category, idx) => {
              return (
                <div key={category._id} className="h-auto max-w-full ">
                  <CategoryCard
                    updateForm={(nomineeId) => {
                      setForm({ ...form, [category._id]: nomineeId });
                    }}
                    {...category}
                  />
                </div>
              );
            })}
          </Grid>
          <div className="flex flex-col items-center py-6">
            {formIsSubmitted && missingCategories && isVotingOpen ? (
              <div className="text-center text-red-500 px-4 py-2">
                Please vote for all categories:
                <ul>
                  {missingCategories.slice(0, 3).map((category) => (
                    <li key={category._id}>{category.name}</li>
                  ))}
                  {missingCategories.length > 3 && (
                    <li>...and {missingCategories.length - 3} more.</li>
                  )}
                </ul>
              </div>
            ) : (
              <></>
              // <>Voting is Completed</>
            )}
            {isVotingOpen && (
              <button
                type="submit"
                className="my-2 text-white bg-oscars-700 hover:bg-oscars-800 focus:ring-4 focus:ring-oscars-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-oscars-600 dark:hover:bg-oscars-700 focus:outline-none dark:focus:ring-oscars-800"
              >
                Submit votes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
