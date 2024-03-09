"use client";
import { useFormState } from "react-dom";
import { SeedButton, SeedStatus } from "./status";

export const SeedDatabase = ({
  label,
  seedFn,
  ...props
}: {
  count?: number;
  label: string;
  description: string;
  seedFn: () => Promise<{
    success: boolean;
    error?: any;
  }>;
}) => {
  const [state, formAction] = useFormState(seedFn, { success: false });

  return (
    <form action={formAction}>
      <div className="max-w-sm p-6 m-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <SeedStatus label={label} state={state} {...props} />
        <SeedButton label={label} />
      </div>
    </form>
  );
};
