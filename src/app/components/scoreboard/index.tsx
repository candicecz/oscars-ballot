"use client";

import React, { useMemo, useState } from "react";
import { CategoryWithNominees, User } from "@/types";
import { colorScheme, defaultTheme, getScoreFromBallot } from "./helpers";
import Image from "next/image";
import { ScoreTimeline } from "./score-timeline";

interface ScoreboardProps {
  team: User[];
  categories?: CategoryWithNominees[];
}
export const Scoreboard = ({ team, categories }: ScoreboardProps) => {
  const scores = useMemo(
    () =>
      team
        .map((user) => {
          return {
            ...user,
            score:
              (categories && getScoreFromBallot(categories, user.ballot)) || 0,
          };
        })
        .sort((a, b) => {
          // Compare by score first
          if (a.score !== b.score) {
            return b.score - a.score;
          }

          // If scores are equal, sort alphabetically by name
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }

          // Names are equal
          return 0;
        }),
    [team, categories]
  );

  const scoringEnabled = useMemo(
    () => scores?.some((score) => score.score > 0),
    [scores]
  );

  const remainingCategories = useMemo(
    () => categories?.filter((category) => !category.winnerId).length || 0,
    [categories]
  );
  // Show full list of team member scores.
  const [showMore, setShowMore] = useState(false);
  const [hideScoreBoard, setHideScoreBoard] = useState(false);
  if (!categories) return <></>;
  return (
    <section
      id="scoreboard"
      className="sticky top-0 z-10 w-full py-2 bg-white border-y-2 border-slate-100 dark:border-slate-100/20 dark:bg-gray-800"
    >
      <div className="flex justify-end px-2 sm:px-6">
        <button
          type="button"
          onClick={() => setHideScoreBoard(!hideScoreBoard)}
          className="flex items-center w-9 h-9 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M10.335 6.514 6.91 1.464a1.122 1.122 0 0 0-1.818 0l-3.426 5.05a.988.988 0 0 0 .91 1.511h6.851a.988.988 0 0 0 .91-1.511Zm-8.67 6.972 3.426 5.05a1.121 1.121 0 0 0 1.818 0l3.426-5.05a.988.988 0 0 0-.909-1.511H2.574a.987.987 0 0 0-.909 1.511Z"
            ></path>
          </svg>
        </button>
      </div>
      {!hideScoreBoard && (
        <div>
          <div className="pl-6 pr-8 py-2 pt-4 max-w-screen-3xl max-h-96 overflow-y-auto	mx-auto sm:w-600 sm:pl-10 sm:pr-16 sm:py-4">
            {scores.slice(0, showMore ? scores.length : 3).map((user, idx) => {
              return (
                <div
                  key={"" + user._id}
                  className="w-full flex items-center relative mb-2"
                >
                  <ScoreTimeline
                    isEnabled={scoringEnabled}
                    theme={idx > 2 ? defaultTheme : colorScheme[idx]}
                    user={user}
                    percentWidth={
                      Math.round(
                        (user.score / (remainingCategories + scores[0].score)) *
                          100
                      ) + "%"
                    }
                  />

                  {idx === 0 && (
                    <div
                      className={`hidden -z-10 sm:flex absolute w-12 h-12 top-0 right-2 translate-x-full justify-center items-end  ${
                        remainingCategories > 0 ? "opacity-70" : "opacity-100"
                      }`}
                    >
                      <Image
                        className="w-auto h-full"
                        width={98}
                        height={215}
                        src={"/assets/oscars-with-gradient.png"}
                        alt="Oscar statue"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Toggle full user list display */}
          <div className="flex justify-center max-w-screen-3xl mx-auto p-2 sm:w-600 sm:pl-10 sm:pr-16">
            <button
              type="button"
              className="px-3 py-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => setShowMore(!showMore)}
            >
              Show {showMore ? "less" : "full list"}
            </button>{" "}
          </div>
        </div>
      )}
    </section>
  );
};
