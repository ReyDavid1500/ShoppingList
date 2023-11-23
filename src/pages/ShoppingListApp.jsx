import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingListContent from "../components/ShoppingListContent";
import SideMenu from "../components/SideMenu";
import {
  Bars3Icon,
  BuildingStorefrontIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Tooltip from "../components/Tooltip";
import axios from "axios";
import { ShoppingContext } from "../Contexts/ShoppingContext";
import { UserContext } from "../Contexts/UserContext";
import { SnackbarContext } from "../Contexts/SnackbarContext";
import { LoaderContext } from "../Contexts/LoaderContext";
import DarkModeSwitch from "../components/DarkModeSwitch";

const ShoppingListApp = () => {
  const [isSideMenu, setIsSideMenu] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { setServerData, setSelectedListData } = useContext(ShoppingContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const { setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    localStorage.setItem("theme", theme);
  });

  const themeHandler = () => {
    const newTheme = setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
    return localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      if (loggedIn) {
        const getData = async () => {
          const { data } = await axios.get(
            "https://shoppinglist-api-ctyk.onrender.com/shoppingLists",
            {
              headers: { Authorization: `Bearer ${loggedIn?.token}` },
            }
          );
          setServerData(data);
          setSelectedListData(data[0]);
          setIsLoading(false);
        };
        getData();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [loggedIn]);

  const navigate = useNavigate();

  const handleSideMenuToggle = () => {
    setIsSideMenu(!isSideMenu);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("USER_TOKEN");

    if (!savedToken) {
      navigate("/signin");
      setIsLoading(false);
    }
    try {
      if (!loggedIn && savedToken) {
        const fetchUserData = async () => {
          const { data } = await axios.get(
            "https://shoppinglist-api-ctyk.onrender.com/user",
            {
              headers: { Authorization: "Bearer " + savedToken },
            }
          );
          setLoggedIn(data);
          localStorage.setItem("USER_TOKEN", data.token);
        };
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
      navigate("/signin");
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    navigate("/signin");
    localStorage.clear();
    setLoggedIn(null);
    showSnackbar("Has cerrado tu sesión...");
  };

  return (
    <div className="h-[100vh] dark:bg-gradient-to-b from-[#404040] to-[#181818]">
      <header className="sm:flex sm:justify-between bg-gray-100 w-full sm:h-10 shadow-lg sm:place-items-center sm:flex-row sm:mt-0 flex flex-col-reverse gap-2 justify-center items-center p-5 dark:bg-black dark:text-white">
        <div className="flex gap-4">
          <div className="side-menu">
            <button
              className="transition ease-linear delay-150 hover:scale-125 duration-500"
              onClick={handleSideMenuToggle}
            >
              <Bars3Icon className="h-6 w-6 text-black cursor-pointer hover:opacity-30 dark:text-white" />
            </button>
          </div>
          <div className="logo">
            <BuildingStorefrontIcon className="h-6 w-6 text-black dark:text-white" />
          </div>
          <div className="titulo">
            <p className="text-gray-500 text-xl font-medium dark:text-white">
              Lista de compra
            </p>
          </div>
        </div>
        <p></p>
        <div className="flex justify-center mr-6">
          <p className="mr-2 text-sm mt-1 font-medium text-orange-600 dark:text-yellow-400">
            {loggedIn?.user?.email}
          </p>
          <Tooltip title="Logout">
            <button
              className=" focus:bg-gray-200 focus:delay-150 focus:duration-300 focus:rounded-full hover:bg-gray-200 hover:rounded-full dark:hover:bg-gray-500 transition ease-linear delay-150 hover:scale-125 duration-500"
              onClick={handleLogout}
              type="button"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-black cursor-pointer dark:text-white" />
            </button>
          </Tooltip>
          <span className="transition ease-linear delay-150 hover:scale-125 duration-500">
            <DarkModeSwitch isDarkModeOn={themeHandler} />
          </span>
        </div>
      </header>
      <div className="sm:flex sm:gap-10 p-[2rem] mt-2 sm:w-full sm:flex-row flex flex-col gap-4">
        <SideMenu isSideMenu={isSideMenu} />
        <ShoppingListContent />
      </div>
    </div>
  );
};

export default ShoppingListApp;
