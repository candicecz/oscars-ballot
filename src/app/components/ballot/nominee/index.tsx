import { Nominee, User } from "@/types";
import Image from "next/image";
import "./nominee.css";

interface NomineeItemProps {
  nominee: Nominee;
  isWinner?: boolean;
  categoryHasWinner?: boolean;
  isVotingOpen?: boolean;
  isSelected: boolean;
  userVotes?: User[];
}

export const NomineeItem = ({
  nominee,
  isWinner,
  categoryHasWinner,
  isVotingOpen,
  isSelected,
  userVotes,
  ...props
}: NomineeItemProps) => {
  return (
    <>
      <label
        htmlFor={`category-${nominee._id}`}
        className={`flex-1 rounded-lg gap-2 nominee border-gray-700 text-gray-400 dark:bg-transparent dark:border-gray-700 dark:text-gray-400 ${
          isVotingOpen && isSelected ? "selected" : ""
        } ${isVotingOpen ? "voting-open" : ""} ${
          !isVotingOpen && isWinner ? "winner" : ""
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
          <div
            className={`block ${
              !categoryHasWinner || (categoryHasWinner && isWinner)
                ? "opacity-100"
                : "opacity-60"
            }`}
          >
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
    </>
  );
};
