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

const ShoppingListApp = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { setServerData, setSelectedListData } = useContext(ShoppingContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const { setIsLoading } = useContext(LoaderContext);

  const [isSideMenu, setIsSideMenu] = useState(true);

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
    <div>
      <header className="sm:flex sm:justify-between sm:bg-gray-100 w-full sm:h-10 sm:shadow-lg sm:place-items-center sm:flex-row sm:mt-0 flex flex-col-reverse gap-2 justify-center items-center mt-5">
        <div className="flex gap-4">
          <div className="side-menu">
            <button onClick={handleSideMenuToggle}>
              <Bars3Icon className="h-6 w-6 text-black cursor-pointer hover:opacity-30" />
            </button>
          </div>
          <div className="logo">
            <BuildingStorefrontIcon className="h-6 w-6 text-black" />
          </div>
          <div className="titulo">
            <p className="text-gray-500 text-xl font-medium">Lista de compra</p>
          </div>
        </div>
        <p></p>
        <div className="flex justify-center mr-6">
          <p className="mr-2 text-sm mt-1 font-medium text-orange-600">
            {loggedIn?.user?.email}
          </p>
          <Tooltip title="Logout">
            <button
              className=" focus:bg-gray-200 focus:delay-150 focus:duration-300 focus:rounded-full hover:bg-gray-200 hover:rounded-full "
              onClick={handleLogout}
              type="button"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </Tooltip>
        </div>
      </header>
      <div className="sm:flex sm:gap-10 p-4 sm:w-full sm:flex-row flex flex-col gap-4">
        <SideMenu isSideMenu={isSideMenu} />
        <ShoppingListContent />
      </div>
    </div>
  );
};

export default ShoppingListApp;
