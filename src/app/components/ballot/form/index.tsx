"use client";

import { useCallback, useMemo, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { CategoryWithNominees, Nominee, User } from "@/types";
import { CategoryCard } from "../category/card";
import { CategoriesList } from "../category/list";
import { updateBallotForUser } from "@/actions/users";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-btn";
import { NomineeItem } from "../nominee";
import { FormValidation } from "./validation";
import { SelectWinnerBtn } from "../nominee/select-winner-btn";

export const BallotForm = ({
  ballot: defaultBallot,
  categories,
  triggerCategoriesUpdate,
  isAdmin,
  isVotingOpen,
  team,
}: {
  categories: CategoryWithNominees[];
  triggerCategoriesUpdate: () => void;
  isVotingOpen?: boolean;
  ballot?: User["ballot"];
  team?: User[];
  isAdmin: User["isAdmin"];
}) => {
  const isCollapsed = useReadLocalStorage("isCollapsed") as boolean;

  /***** Handle ballot  *****/
  const [state, formAction] = useFormState(updateBallotForUser, {
    form: {},
    success: false,
    error: null,
  });

  const [ballot, setBallot] = useState<User["ballot"]>(
    () => defaultBallot || {}
  );

  const handleFormChange = useCallback(
    (nominee: Nominee) => {
      if (isVotingOpen) {
        const newBallot = { ...ballot, [nominee.categoryId]: nominee._id };
        setBallot(newBallot);
      }
    },
    [ballot, isVotingOpen]
  );

  const missingCategories = useMemo(
    () =>
      state.success
        ? categories.filter((category) => !state.form[category._id])
        : [],
    [categories, state.success, state.form]
  );
  const userVotesByNominee = useCallback(
    ({
      categoryId,
      nomineeId,
    }: {
      categoryId: CategoryWithNominees["_id"];
      nomineeId: Nominee["_id"];
    }) => {
      return team?.filter((user) => {
        if (user.ballot) {
          return user.ballot[categoryId] === nomineeId;
        }
      });
    },
    [team]
  );
  return (
    <form id="ballot-form" action={formAction}>
      <CategoriesList>
        <>
          {categories.map((category) => {
            return (
              <div key={category._id} className="h-auto max-w-full ">
                <CategoryCard
                  name={category.name}
                  isCollapsed={isCollapsed}
                  isVotingOpen={isVotingOpen}
                  selectedNomineeId={ballot?.[category._id]}
                  winningNomineeId={category?.winnerId}
                >
                  {category.nominees.map((nominee, idx) => {
                    return (
                      <li key={nominee._id} className="flex my-1 group">
                        <input
                          checked={ballot?.[category._id] === nominee._id}
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
                          categoryHasWinner={!!category.winnerId}
                          nominee={nominee}
                          isSelected={ballot?.[category._id] === nominee._id}
                          isWinner={
                            !isVotingOpen && nominee._id === category.winnerId
                          }
                          isVotingOpen={isVotingOpen}
                          userVotes={userVotesByNominee({
                            categoryId: category._id,
                            nomineeId: nominee._id,
                          })}
                        />
                        {/* Admins can mark a nominee as a winner */}
                        {isAdmin && !isVotingOpen && (
                          <SelectWinnerBtn
                            categoryId={category._id}
                            isVotingOpen={isVotingOpen}
                            nomineeId={nominee._id}
                            triggerCategoriesUpdate={triggerCategoriesUpdate}
                          />
                        )}
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
          <FormValidation
            form={state.form}
            success={state.success}
            error={state?.error}
            missingFields={missingCategories}
          />
          <SubmitButton label="Save" />
          <p className="text-sm text-oscars-600">
            You may change your votes until the deadline
          </p>
        </div>
      )}
    </form>
  );
};
