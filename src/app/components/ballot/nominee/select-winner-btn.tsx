import { updateCategoryWinner } from "@/actions/categories";
import { Category, Nominee } from "@/types";

interface SelectWinnerBtnProps {
  categoryId: Category["_id"];
  isVotingOpen?: boolean;
  nomineeId: Nominee["_id"];
  triggerCategoriesUpdate: () => void;
}

export const SelectWinnerBtn = ({
  categoryId,
  nomineeId,
  triggerCategoriesUpdate,
}: SelectWinnerBtnProps) => {
  return (
    <button
      type="button"
      className="hidden group-hover:block px-3 py-2 ml-4 my-2 text-white bg-oscars-500 hover:bg-oscars-600 focus:ring-1 focus:ring-oscars-300 font-medium rounded-sm text-sm  mb-2 dark:bg-oscars-600 dark:hover:bg-oscars-700 focus:outline-none dark:focus:ring-oscars-800"
      onClick={async () => {
        await updateCategoryWinner({
          categoryId,
          winnerId: nomineeId,
        }).then(() => triggerCategoriesUpdate());
      }}
    >
      Winner
    </button>
  );
};
