import { useContext, useState } from "react";
import { Bars3BottomLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { sortingOptions } from "../data/shoppingList";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { ShoppingContext } from "../Contexts/ShoppingContext";
import Tooltip from "../components/Tooltip";

function SortMenu() {
  const { sortProductList } = useContext(ShoppingContext);
  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [isSelect, setIsSelect] = useState(sortingOptions[1].title);

  const { ref } = useOnClickOutside(() => {
    setOpenDropdown1(false);
  });

  const handleSelectOption = (e) => {
    e.stopPropagation();
    const name = e.target.value;
    const type = e.target.dataset.type;
    setIsSelect(name);
    sortProductList(type);
    setOpenDropdown1(false);
  };

  return (
    <div>
      <div className="group relative inline-block mx-auto">
        <Tooltip title="Ordenar">
          <button
            className="block focus:bg-gray-200 focus:delay-150 focus:duration-300 focus:rounded-full p-2 hover:bg-gray-200 hover:rounded-full transition ease-linear delay-150 hover:scale-125 duration-500"
            type="button"
            onClick={() => {
              setOpenDropdown1(!openDropdown1);
            }}
          >
            <Bars3BottomLeftIcon className="h-6 w-6 text-black dark:text-white" />
          </button>
        </Tooltip>
      </div>
      {openDropdown1 && (
        <div
          ref={ref}
          className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity ease-linear delay-500 duration-[2000ms] opacity-0 ${
            openDropdown1 && "opacity-100"
          }`}
        >
          {sortingOptions.map((option) => (
            <div
              key={option.id}
              className="items-center p-1 hover:bg-gray-300/50"
            >
              <button
                data-type={option.type}
                onClick={handleSelectOption}
                value={option.title}
                className="text-gray-700 px-4 py-2 text-sm hover:font-medium flex gap-4 "
              >
                <div className="h-5 w-5">
                  <CheckIcon
                    className={`${
                      isSelect === option.title
                        ? "h-5 w-5 text-black"
                        : "hidden"
                    }`}
                  />
                </div>
                {option.title}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortMenu;
