"use client";

import { useCallback, useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import useInterval from "@/hooks/useInterval";
import { CategoryWithNominees, Nominee } from "@/types";
import { CategoryCard } from "./category/card";
import { CategoriesList } from "./category/list";
import { SelectCategory } from "./category/select";

// The Oscars are held at this date time.
const OSCARS_DATETIME = new Date("2024-03-10T19:00:00");

export const Ballot = ({
  categories,
}: {
  categories: CategoryWithNominees[];
}) => {
  const isCollapsed = useReadLocalStorage("isCollapsed") as boolean;

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
      <div className="w-full px-4 max-w-screen-3xl mx-auto sm:px-6 sm:w-600 md:8">
        <SelectCategory categories={categories} />
        <form onSubmit={handleFormSubmit}>
          {/* Categories */}
          <CategoriesList>
            <>
              {categories.map((category) => {
                return (
                  <div key={category._id} className="h-auto max-w-full ">
                    <CategoryCard
                      isCollapsed={isCollapsed}
                      updateForm={(nomineeId) => {
                        isVotingOpen &&
                          setForm({ ...form, [category._id]: nomineeId });
                      }}
                      isSelected={!!(isVotingOpen && form[category._id])}
                      isVotingOpen={isVotingOpen}
                      {...category}
                    />
                  </div>
                );
              })}
            </>
          </CategoriesList>
          <div className="flex flex-col items-center py-6">
            {formIsSubmitted && missingCategories.length > 0 && isVotingOpen ? (
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
                className="my-2 text-white bg-oscars-500 hover:bg-oscars-600 focus:ring-4 focus:ring-oscars-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-oscars-600 dark:hover:bg-oscars-700 focus:outline-none dark:focus:ring-oscars-800"
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
