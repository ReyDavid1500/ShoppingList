import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Tooltip from "../components/Tooltip";

const DarkModeSwitch = ({ isDarkModeOn }) => {
  return (
    <div>
      <Tooltip title="DarkMode">
        <button
          className="flex flex-row ml-3 gap-3 mt-[2px]"
          onClick={isDarkModeOn}
        >
          <MoonIcon className="h-6 w-6 text-gray-500 dark:hidden z-10 absolute" />

          <SunIcon className="h-6 w-6 text-gray-500 invisible dark:visible relative" />
        </button>
      </Tooltip>
    </div>
  );
};

export default DarkModeSwitch;
