"use client";

import { addUserToTeam } from "@/actions/users";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../ballot/form/submit-btn";
import { User } from "@/types";

export const InviteUsers = ({ team }: { team: User[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /***** Handle email submission  *****/
  const [state, formAction] = useFormState(addUserToTeam, {
    success: false,
    error: null,
  });

  useEffect(() => {
    setError(state.error);
  }, [state]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <>
      {/* Modal toggle */}
      <button
        data-modal-target="add-team-member-modal"
        data-modal-toggle="add-team-member-modal"
        className="py-2 px-5 mx-2 text-sm font-medium rounded-md text-oscars-600 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-oscars-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-oscars-400 dark:border-oscars-700 dark:hover:text-oscars-300 dark:hover:bg-gray-700"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Invite
      </button>

      {/* Modal box */}
      <div
        id="add-team-member-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          isOpen ? "block" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full md:inset-0 md:left-2/4 md:-translate-x-1/4 md:top-44`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Invite Users
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="add-team-member-modal"
                onClick={() => handleCloseModal()}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form id="add-team-member-form" action={formAction}>
              <div className="p-4 md:p-5 space-y-4">
                <div>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    You can add a member to see your ballot if they have an
                    account.
                  </p>
                  {team.length > 0 && (
                    <div className="text-sm font-medium mt-2">
                      <p className="mb-1 leading-relaxed text-gray-900 dark:text-gray-400">
                        Access granted to:{" "}
                      </p>
                      <ul className="mx-2">
                        {team.map((user) => (
                          <li
                            key={"" + user._id}
                            className="mb-1 font-normal text-gray-500 dark:text-gray-400"
                          >
                            {user.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {`User's email`}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@email.com"
                    required
                  />
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex flex-col p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                {error && (
                  <div className="mb-2 px-2 py-2 rounded-md border border-red-200 bg-red-50 dark:bg-red-700 dark:border-red-600">
                    <p className="text-sm font-normal text-red-500 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                )}
                {state.success && (
                  <div className="mb-2 px-2 py-2 rounded-md border border-green-200 bg-green-50 dark:bg-green-700 dark:border-green-600">
                    <p className="text-sm font-normal text-green-500 dark:text-green-400">
                      Successfully added user to team!
                    </p>
                  </div>
                )}
                <div className="flex items-center">
                  <SubmitButton label="Add new member" />
                  <button
                    data-modal-hide="add-team-member-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={() => handleCloseModal()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
