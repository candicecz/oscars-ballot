import { Nominee, User } from "@/types";
import Image from "next/image";
import "./nominee.css";

interface NomineeItemProps {
  nominee: Nominee;
  isWinner?: boolean;
  categoryHasWinner?: boolean;
  isVotingOpen?: boolean;
  userVotes?: User[];
}

export const NomineeItem = ({
  nominee,
  isWinner,
  categoryHasWinner,
  isVotingOpen,
  userVotes,
  ...props
}: NomineeItemProps) => {
  const hoverClasses = isVotingOpen
    ? "hover:border-oscars-400 hover:text-oscars-600 hover:bg-oscars-100 dark:hover:bg-gray-800"
    : "";
  const peerCheckedClasses = isVotingOpen
    ? "peer-checked:border-oscars-600 peer-checked:text-oscars-600 dark:peer-checked:text-oscars-500"
    : "";
  return (
    <>
      <label
        htmlFor={`category-${nominee._id}`}
        className={`rounded-lg nominee ${hoverClasses} ${peerCheckedClasses}`}
        {...props}
      >
        <div className="flex flex-1 justify-between gap-2 flex-wrap">
          <div
            className={`block ${
              !categoryHasWinner || (categoryHasWinner && isWinner)
                ? "opacity-100"
                : "opacity-60"
            }`}
          >
            <p className="font-medium">{nominee.name}</p>
            <p>{nominee.credits}</p>
          </div>
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
        </div>

        {/* {isSelected && <>usericon</>} */}
        {/* {isWinner && (
          <Image
            src="/assets/oscar.png"
            width={25}
            height={31}
            alt="Picture of an oscar statue attributed to winning nominee"
          />
        )} */}
      </label>
    </>
  );
};
