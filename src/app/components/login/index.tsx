"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const Login = () => {
  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen px-6  bg-white  dark:bg-gray-800 dark:border-gray-700 dark:bg-transparent">
      <div className="relative w-full min-h-screen max-w-md mx-auto flex flex-col justify-center p-6 sm:w-1/2 ">
        <Image
          src="/assets/oscars-banner.png"
          width={670}
          height={196}
          alt="Picture of an oscar statue with a purple-orange gradient behind it."
        />
        <div className="flex flex-col items-center">
          <Image
            className="mb-6"
            src="/assets/oscars-with-gradient.png"
            width={200}
            height={31}
            alt="Picture of an oscar statue with a purple-orange gradient behind it."
          />

          <button
            onClick={() => signIn("google")}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
