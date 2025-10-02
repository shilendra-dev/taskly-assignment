"use client";
import { Profile } from "./profile";
export const Header = () => {
  return (
    <header className="flex justify-between items-center border mx-2 shadow-lg rounded-b-lg sm:w-3xl sm:mx-auto sm:px-4 sm:py-3 p-3 ">
      <h1 className="font-semibold tracking-wider text-md sm:text-md">
        Taskly
      </h1>
      <div className="flex items-center gap-2">
        <Profile />
      </div>
    </header>
  );
};
