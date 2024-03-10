"use client";

import React from "react";
import { User } from "@/types";
import Image from "next/image";

interface UserWithScore extends User {
  score: number;
}
interface ScoreTimelineProps {
  isEnabled: boolean;
  percentWidth: string;
  theme: {
    bg: string;
    color: string;
    dark: {
      bg: string;
      color: string;
    };
  };
  user: UserWithScore;
}
export const ScoreTimeline = ({
  isEnabled,
  theme,
  user,
  percentWidth,
}: ScoreTimelineProps) => {
  return (
    <div className="w-full">
      <div
        className={`flex mb-4 text-sm font-medium ${
          isEnabled ? `${theme.color} ${theme.dark.color}` : "text-gray-400"
        } sm:-translate-x-3`}
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
          className={`absolute h-2.5 z-1 rounded-full ${theme?.bg} ${theme?.dark.bg}`}
          style={{
            // calculate the width of the score bar based on the user's score and the total number of categories left so that the bar is full when the oscars are over even if the user has not won all categories
            width: percentWidth,
          }}
        >
          <div className="text-gray-900	drop-shadow rounded-full text-xs flex justify-center items-center w-6 h-6 bg-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 mt-1 dark:bg-gray-600 dark:text-gray-200">
            {user.score}
          </div>
        </div>
      </div>
    </div>
  );
};
