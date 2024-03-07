import { CategoryWithNominees, User } from "@/types";

export const colorScheme = [
  {
    bg: "bg-oscars-300 bg-gradient-to-r from-oscars-600 to-oscars-200/50",
    color: "text-oscars-500",

    dark: {
      bg: "dark:bg-gradient-to-r dark:from-oscars-600 dark:to-oscars-200/50",
      color: "dark:text-oscars-400",
    },
  },
  {
    bg: "bg-slate-300 bg-gradient-to-r from-slate-400 to-slate-200/50",
    color: "text-slate-400",
    dark: {
      bg: "dark:bg-slate-300 dark:bg-gradient-to-r dark:from-slate-400 dark:to-slate-200/50",
      color: "dark:text-slate-300",
    },
  },
  {
    bg: "bg-brandy-600 bg-gradient-to-r from-brandy-600 to-brandy-400/80",
    color: "text-brandy-500",
    dark: {
      bg: "dark:bg-brandy-600 dark:bg-gradient-to-r dark:from-brandy-600 dark:to-brandy-400/80",
      color: "dark:text-brandy-400",
    },
  },
];

export const getScoreFromBallot = (
  categories: CategoryWithNominees[],
  ballot: User["ballot"]
) => {
  if (!ballot) return 0;
  return Object.keys(ballot).reduce((score, categoryId) => {
    if (
      ballot[categoryId] ===
      categories.find((category) => category._id === categoryId)?.winnerId
    ) {
      score += 1;
    }
    return score;
  }, 0);
};
