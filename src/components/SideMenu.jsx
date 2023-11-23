import { useContext, useState } from "react";
import { ShoppingContext } from "../Contexts/ShoppingContext";
import Modal from "../Modal";
import {
  PlusIcon,
  InformationCircleIcon,
} from "../../node_modules/@heroicons/react/24/outline";
import { SnackbarContext } from "../Contexts/SnackbarContext";
import { UserContext } from "../Contexts/UserContext";

<InformationCircleIcon className="h-6 w-6 text-gray-500" />;

const SideMenu = ({ isSideMenu }) => {
  const {
    backendData,
    handleShowShoppingList,
    selectedList,
    addNewShoppingList,
    modalCounter,
    setModalCounter,
  } = useContext(ShoppingContext);

  const { showSnackbar } = useContext(SnackbarContext);

  const { loggedIn } = useContext(UserContext);

  const [showModalList1, setShowModalList1] = useState(false);
  const [newShoppingList, setNewShoppingList] = useState("");

  const handleSelectList = (e) => {
    const id = e.currentTarget.dataset._id;
    handleShowShoppingList(id);
  };

  const handleNewShoppingList = (e) => {
    setNewShoppingList(e.target.value);
    setModalCounter(newShoppingList.length);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await addNewShoppingListBackend(newShoppingList);
      addNewShoppingList(data);
      setShowModalList1(false);
      setNewShoppingList("");
      setModalCounter(0);
      showSnackbar("Lista creada...");
    } catch (error) {
      showSnackbar("Error del servidor...");
    }
  };

  const onKeyPressNewList = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      onSubmit(e);
    }
  };

  const addNewShoppingListBackend = async (name) => {
    const res = await fetch(
      "https://shoppinglist-api-ctyk.onrender.com/shoppingList/new",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedIn?.token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  };

  return (
    <>
      <Modal
        addState={newShoppingList}
        isOpen={showModalList1}
        onClose={(e) => {
          setShowModalList1(false);
          setModalCounter(0);
        }}
        onHandleAccept={onSubmit}
        title="Nueva lista"
      >
        <input
          className="bg-[#f1f3f4] focus:outline-none focus:border-b-blue-600 focus:border-b-2 border-b-[1px] border-black hover:bg-gray-100 p-2"
          type="text"
          placeholder="Nombre de la lista"
          maxLength={201}
          onChange={handleNewShoppingList}
          onKeyUp={onKeyPressNewList}
        />
        <div className="flex place-content-end text-xs font-light">
          <span>{modalCounter} / 200</span>
        </div>
      </Modal>
      {isSideMenu && (
        <aside className="flex flex-col justify-center sm:w-[40vw]">
          <button
            onClick={() => setShowModalList1(true)}
            className="bg-[#fff] flex gap-4 border-2 rounded-full p-3 place-items-center h-10 shadow-xl hover:bg-blue-100 max-[640px]:w-[60vw] max-[640px]:mx-auto transition ease-linear delay-150 hover:scale-110 duration-500"
          >
            <PlusIcon className="h-6 w-6 text-red-500" />
            <p className="text-xs font-bold hover:text-black text-orange-600">
              Nueva Lista
            </p>
          </button>
          <div className="flex flex-col mt-3 mb-3 text-sm">
            <div className="flex flex-col border-none rounded-full p-3 place-content-start">
              <div className="flex flex-col font-light gap-4">
                {backendData?.map((item) => (
                  <span
                    className={`hover:bg-gray-300 p-1 rounded-lg focus:bg-gray-500 cursor-pointer ${
                      selectedList?._id === item._id &&
                      "bg-gray-600 dark:bg-white text-white font-bold transition-all"
                    }`}
                    data-_id={item._id}
                    onClick={handleSelectList}
                    key={item._id}
                  >
                    <p>{item.name}</p>
                    <p>{item.list?.length} artículos</p>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <hr />
        </aside>
      )}
    </>
  );
};

export default SideMenu;
