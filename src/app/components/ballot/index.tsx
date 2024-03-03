"use client";
import { SelectCategory } from "./category/select";
import { CategoryCard } from "./category/card";
import { Category } from "@/types";
import { useCallback, useEffect, useState } from "react";
import useInterval from "@/hooks/useInterval";

// The Oscars are held at this date time.
const OSCARS_DATETIME = new Date("2024-03-10T19:00:00Z");

export const Ballot = ({ categories }: { categories: Category[] }) => {
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
    <div className="px-4 py-2">
      <h1 className="text-3xl font-bold mb-4">Ballot</h1>
      <p className="mb-4">
        {isVotingOpen
          ? "Voting is open! Make your selections below."
          : "Voting is closed."}
      </p>
      <SelectCategory categories={categories} />
      <div id="accordion-open" data-accordion="open">
        {categories.map((category) => {
          return <CategoryCard key={category.name} {...category} />;
        })}
      </div>
    </div>
  );
};
