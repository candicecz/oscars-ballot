"use client";

import { useCallback, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { CategoryWithNominees, Nominee, User } from "@/types";
import { CategoryCard } from "./category/card";
import { CategoriesList } from "./category/list";
import { updateBallotForUser } from "@/actions/users";
import { useFormState } from "react-dom";
import { SubmitButton } from "../submit-btn";
import { NomineeItem } from "./nominee";

export const BallotForm = ({
  categories,
  isVotingOpen,
  ballot: defaultBallot,
}: {
  categories: CategoryWithNominees[];
  isVotingOpen?: boolean;
  ballot?: User["ballot"];
}) => {
  const isCollapsed = useReadLocalStorage("isCollapsed") as boolean;

  const [ballot, setBallot] = useState<User["ballot"]>(
    () => defaultBallot || {}
  );

  const [state, formAction] = useFormState(updateBallotForUser, {
    form: {},
    success: false,
    error: null,
  });

  const missingCategories = state.success
    ? categories.filter((category) => !state.form[category._id])
    : [];

  const handleFormChange = useCallback(
    (nominee: Nominee) => {
      if (isVotingOpen) {
        const newBallot = { ...ballot, [nominee.categoryId]: nominee._id };
        setBallot(newBallot);
      }
    },
    [ballot, isVotingOpen]
  );

  return (
    <form action={formAction}>
      <CategoriesList>
        <>
          {categories.map((category) => {
            return (
              <div key={category._id} className="h-auto max-w-full ">
                <CategoryCard
                  isCollapsed={isCollapsed}
                  isVotingOpen={isVotingOpen}
                  hasValueSelected={!!ballot[category._id]}
                  {...category}
                >
                  {category.nominees.map((nominee) => {
                    return (
                      <li key={nominee._id} className="my-1 dark:bg-gray-900">
                        <input
                          checked={ballot[category._id] === nominee._id}
                          className="hidden peer"
                          id={`category-${nominee._id}`}
                          name={"" + category._id}
                          onChange={() => {
                            handleFormChange(nominee);
                          }}
                          type="radio"
                          value={"" + nominee._id}
                        />
                        <NomineeItem
                          nominee={nominee}
                          isVotingOpen={isVotingOpen}
                          // isWinner={nominee.film === "Barbie"}
                          // isSelected={user.choice===nominee._id}
                          // categoryHasWinner={!!category.winner}
                        />
                      </li>
                    );
                  })}
                </CategoryCard>
              </div>
            );
          })}
        </>
      </CategoriesList>
      {isVotingOpen && (
        <div className="flex flex-col items-center py-4 mt-8 mb-20">
          {/* Form was successfully submitted and the ballot is fully filled in. */}
          {state.success && !missingCategories.length && (
            <div className="flex items-center font-medium text-oscars-600 px-4 py-2">
              <svg
                className="w-6 h-6 mx-2 fill-oscars-600 stroke-white dark:text-oscars.200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
                />
              </svg>
              Voting Completed!
            </div>
          )}
          {/* Form was successfully submitted but the ballot is not fully filled in. */}
          {state.success && missingCategories.length > 0 && (
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
          )}
          {/* Form submission failed. */}
          {state.error && (
            <div className="text-red-500 px-4 py-2">{state.error}</div>
          )}
          <SubmitButton label="Submit button" />
        </div>
      )}
    </form>
  );
};
