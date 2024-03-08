"use client";
import { CategoryWithNominees } from "@/types";
import { useEffect, useState } from "react";

export const FormValidation = ({
  success,
  error,
  missingFields,
  form,
}: {
  success: boolean;
  error?: any;
  form: {
    [key: string]: string;
  };
  missingFields: CategoryWithNominees[];
}) => {
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    if (success && form) {
      setShowSaveMessage(true);
      const timeout = setTimeout(() => {
        setShowSaveMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, form]);

  return (
    <>
      {/* Form was successfully submitted and the ballot is fully filled in. */}
      {success && !missingFields.length && (
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
      {success && missingFields.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="text-center text-red-500 px-4 py-2">
            Please vote for all categories:
            <ul>
              {missingFields.slice(0, 3).map((field) => (
                <li key={field._id}>{field.name}</li>
              ))}
              {missingFields.length > 3 && (
                <li>...and {missingFields.length - 3} more.</li>
              )}
            </ul>
          </div>
          {showSaveMessage && (
            <div className="text-sm text-oscars-600">Saved successfully</div>
          )}
        </div>
      )}
      {/* Form submission failed. */}
      {error && <div className="text-red-500 px-4 py-2">{error}</div>}
    </>
  );
};
