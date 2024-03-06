import { Nominee, User } from "@/types";
import Image from "next/image";
import "./nominee.css";

interface NomineeItemProps {
  categoryHasWinner?: boolean;
  isAdmin?: User["isAdmin"];
  isSelected: boolean;
  isVotingOpen?: boolean;
  isWinner?: boolean;
  nominee: Nominee;
  userVotes?: User[];
}

export const NomineeItem = ({
  categoryHasWinner,
  isAdmin,
  isVotingOpen,
  isWinner,
  isSelected,
  nominee,
  userVotes,
  ...props
}: NomineeItemProps) => {
  return (
    <>
      <label
        htmlFor={`category-${nominee._id}`}
        className={`flex-1 rounded-lg gap-2 nominee border-gray-700 text-gray-400  dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 ${
          isVotingOpen && isSelected ? "selected" : ""
        } ${isVotingOpen ? "voting-open" : ""} ${
          !isVotingOpen && categoryHasWinner
            ? isWinner
              ? "winner"
              : "opacity-70"
            : ""
        }`}
        {...props}
      >
        <div className="flex items-center">
          {isWinner && (
            <Image
              className="mr-4"
              src="/assets/oscar.png"
              width={25}
              height={31}
              alt="Picture of an oscar statue attributed to winning nominee"
            />
          )}
          <div className="block">
            <p className="name font-medium">{nominee.name}</p>
            <p>{nominee.credits}</p>
          </div>
        </div>

        {/* User profile pictures on nominees they voted for. */}
        {!isVotingOpen && userVotes && userVotes?.length > 0 && (
          <div className="flex items-end flex-wrap gap-1">
            {userVotes?.map(({ image, _id, name }) => (
              <Image
                key={_id + ""}
                src={image}
                width={20}
                height={20}
                alt={`${name}'s profile picture. ${name} voted for ${nominee.name}`}
              />
            ))}
          </div>
        )}
      </label>
      {isAdmin && !categoryHasWinner && !isVotingOpen && (
        <button
          type="button"
          className="px-3 py-2 ml-4 my-2 text-white bg-oscars-500 hover:bg-oscars-600 focus:ring-1 focus:ring-oscars-300 font-medium rounded-lg text-sm  mb-2 dark:bg-oscars-600 dark:hover:bg-oscars-700 focus:outline-none dark:focus:ring-oscars-800"
        >
          Winner
        </button>
      )}
    </>
  );
};
