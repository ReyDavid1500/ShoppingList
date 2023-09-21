import React from "react";

const Tooltip = ({ children, title }) => {
  return (
    <div className="group relative ease-in-out">
      {children}
      <span className="absolute top-[115%] left-[50%] translate-x-[-50%] ease-in-out z-10 invisible text-xs font-light bg-black/80 text-white text-center rounded-md p-1 group-hover:visible opacity-0 group-hover:opacity-100 transition delay-500 whitespace-nowrap">
        {title}
      </span>
    </div>
  );
};

export default Tooltip;
