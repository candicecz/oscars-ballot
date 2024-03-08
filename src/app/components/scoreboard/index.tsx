"use client";

import React, { useMemo } from "react";
import { CategoryWithNominees, User } from "@/types";
import { colorScheme, getScoreFromBallot } from "./helpers";
import Image from "next/image";

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

  if (!categories) return <></>;

  return (
    <section
      id="scoreboard"
      className="sticky top-0 z-10 w-full bg-white border-y-2 border-slate-100 dark:border-slate-100/20 dark:bg-gray-800"
    >
      <div className="pl-4 pr-6 py-2 max-w-screen-3xl mx-auto sm:w-600 sm:pl-10 sm:pr-16">
        {scores.slice(0, 3).map((user, idx) => {
          return (
            <div
              key={"" + user._id}
              className="w-full flex items-center relative"
            >
              <div className="w-full">
                <div
                  className={`flex mb-2 text-sm font-medium ${
                    scoringEnabled
                      ? `${colorScheme[idx]?.color} ${colorScheme[idx]?.dark.color}`
                      : "text-gray-400"
                  }`}
                >
                  <Image
                    className="mr-2 rounded-full"
                    src={user.image}
                    width={20}
                    height={20}
                    alt={`${user.name}'s profile picture`}
                  />
                  {user.name.split(" ")[0]}
                </div>

                <div className="relative w-full rounded-full h-2.5 mb-4 -z-1 bg-gray-100 dark:bg-gray-600 select-none">
                  <div
                    className={`absolute h-2.5 z-1 rounded-full ${colorScheme[idx]?.bg} ${colorScheme[idx]?.dark.bg}`}
                    style={{
                      // calculate the width of the score bar based on the user's score and the total number of categories left so that the bar is full when the oscars are over even if the user has not won all categories
                      width:
                        Math.round(
                          (user.score /
                            (remainingCategories + scores[0].score)) *
                            100
                        ) + "%",
                    }}
                  >
                    <div className="text-gray-900	drop-shadow rounded-full text-xs flex justify-center items-center w-6 h-6 bg-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 mt-1 dark:bg-gray-600 dark:text-gray-200">
                      {user.score}
                    </div>
                  </div>
                </div>
              </div>

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
    </section>
  );
};
