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
    const res = await fetch("http://localhost:3001/shoppingList/new", {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedIn?.token}`,
      },
    });
    const data = await res.json();
    return data;
  };

  return (
    <div>
      {isSideMenu && (
        <div>
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
          <aside className="w-36">
            <button
              onClick={() => setShowModalList1(true)}
              className="bg-[#fff] flex gap-4 border-2 rounded-full p-3 place-items-center transition ease-in-out h-10 shadow-xl hover:opacity-50 hover:bg-blue-100 hover:translate-y-1 hover:scale-105"
            >
              <PlusIcon className="h-6 w-6 text-red-500" />
              <p className="text-xs font-bold hover:text-black text-orange-600">
                Nueva Lista
              </p>
            </button>
            <div className="flex flex-col mt-3 mb-3 mx-auto text-sm">
              <div className="flex flex-col border-none rounded-fullp-3 w-40 place-content-start">
                <div className="flex flex-col font-light gap-4 peer">
                  {backendData?.map((item) => (
                    <span
                      className={`hover:bg-gray-300 p-1 rounded-lg focus:bg-gray-500 cursor-pointer ${
                        selectedList?._id === item._id &&
                        "bg-gray-600 text-white font-bold transition-all"
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
        </div>
      )}
    </div>
  );
};

export default SideMenu;
