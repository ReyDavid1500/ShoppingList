import { useContext, useState } from "react";
import Modal from "../Modal";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ShoppingContext } from "../Contexts/ShoppingContext";
import SettingMenu from "./SettingMenu";
import SortMenu from "./SortMenu";
import { SnackbarContext } from "../Contexts/SnackbarContext";

const ShoppingListContent = () => {
  const {
    selectedList,
    createNewProduct,
    checkedProductList,
    modalCounter,
    setModalCounter,
    backendData,
  } = useContext(ShoppingContext);

  const { showSnackbar } = useContext(SnackbarContext);

  const [inputData, setInputData] = useState("");
  const [showModalList2, setShowModalList2] = useState(false);
  const [newProduct, setNewProduct] = useState("");

  const handleNewListItem = (e) => {
    setInputData(e.target.value);
  };

  const handleNewProduct = (e) => {
    setNewProduct(e.target.value);
    setModalCounter(newProduct.length);
  };

  const onSubmitProduct = async (e) => {
    try {
      e.preventDefault();
      const data = await createNewProductBackend(selectedList._id, newProduct);
      createNewProduct(data);
      setShowModalList2(false);
      setNewProduct("");
      setModalCounter(0);
      showSnackbar("Elemento añadido...");
    } catch (error) {
      showSnackbar("Ha ocurrido un error...");
    }
  };

  const onKeyPressNewProduct = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      onSubmitProduct(e);
      setModalCounter(0);
      showSnackbar("Elemento añadido...");
    }
  };

  const handleNewListedItem = async (e) => {
    try {
      e.preventDefault();
      if (e.key === "Enter" && e.target.value.length > 0) {
        const data = await createNewProductBackend(selectedList._id, inputData);
        createNewProduct(data);
        setInputData("");
        showSnackbar("Elemento añadido...");
      }
    } catch (error) {
      showSnackbar("Ha ocurrido un error...");
    }
  };

  const createNewProductBackend = async (_id, name) => {
    const res = await fetch(
      `https://shoppinglist-api-ctyk.onrender.com/shoppingList/${_id}/list`,
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  };

  const handleCheckedProductList = async (e) => {
    try {
      const id = selectedList._id;
      const itemId = e.target.dataset._id;
      const isChecked = e.target.dataset.ischecked === "true";
      const data = await checkedProductListBackend(id, itemId, !isChecked);
      checkedProductList(data, itemId);
    } catch (error) {
      showSnackbar("Ha ocurrido un error...");
      console.log(error);
    }
  };

  const checkedProductListBackend = async (id, itemId, isChecked) => {
    const res = await fetch(
      `https://shoppinglist-api-ctyk.onrender.com/shoppingList/${id}/list/${itemId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isChecked: isChecked,
        }),
      }
    );
    const data = await res.json();
    return data;
  };

  return (
    <>
      {selectedList && (
        <main className="w-full">
          <div>
            <Modal
              addState={newProduct}
              isOpen={showModalList2}
              onClose={() => {
                setShowModalList2(false);
                setModalCounter(0);
              }}
              onHandleAccept={onSubmitProduct}
              title="Añadir elemento"
            >
              <input
                className="bg-[#f1f3f4] focus:outline-none focus:border-b-blue-600 focus:border-b-2 border-b-[1px] border-black hover:bg-gray-100 p-2"
                type="text"
                placeholder="Nombre del elemento"
                maxLength={201}
                onChange={handleNewProduct}
                onKeyUp={onKeyPressNewProduct}
              />
              <div className="flex place-content-end text-xs font-light">
                <span>{modalCounter} / 200</span>
              </div>
            </Modal>
          </div>
          <div>
            <div className="flex justify-between w-full">
              <div>
                <h1 className="font-medium text-4xl">{selectedList?.name}</h1>
                <h3>{selectedList?.list?.length} artículos</h3>
              </div>
              <div className="flex gap-3 items-center">
                <div className="relative text-left">
                  <SortMenu />
                </div>
                <div className="relative text-left">
                  <SettingMenu />
                </div>
              </div>
            </div>
          </div>
          <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
            <label className="flex flex-row gap-3 mb-3">
              <PlusIcon className="h-6 w-6 text-black inline-block" />
              <input
                className="w-full pb-2 border-solid border-b-[rgb(95,99,104)] border-b-[1px] z-[1] content-none focus:outline-none focus:border-b-[rgb(25,103,210)] focus:border-b-2 focus:transition focus:ease-linear focus:delay-150"
                type="text"
                placeholder="Añadir elemento"
                autoComplete="off"
                value={inputData}
                onChange={handleNewListItem}
                onKeyUp={handleNewListedItem}
              />
            </label>
          </form>
          <ul className="flex flex-col gap-4 divide-y-2">
            {selectedList?.list?.map((item) => {
              return (
                <li key={item._id} className="flex flex-row gap-3 items-center">
                  <input
                    checked={item.isChecked}
                    data-_id={item._id}
                    data-ischecked={item.isChecked}
                    onChange={handleCheckedProductList}
                    type="checkbox"
                    name="isChecked"
                    className="w-3 h-3 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 peer"
                  />
                  <label
                    className="text-base font-light peer-checked:line-through"
                    htmlFor="default-checkbox"
                  >
                    {item.name}
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="block z-[1] bottom-4 right-4 fixed">
            <button onClick={() => setShowModalList2(true)}>
              <PlusIcon className="h-12 w-12 text-red-500 rounded-full shadow-lg border border-collapse p-3 transition-opacity hover:opacity-40 hover:bg-slate-500" />
            </button>
          </div>
        </main>
      )}{" "}
      {backendData?.length === 0 && (
        <div className="flex flex-col gap-3 mt-20 mx-auto">
          <img
            className="rounded-xl"
            src="https://images.unsplash.com/photo-1623265300797-4a3541e29a60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            width="200px"
            height="200px"
          />
          <p className="text-sm font-medium mb-5 text-center text-gray-500">
            Todavía no tienes ninguna lista
          </p>
        </div>
      )}
      {selectedList?.list?.length === 0 && (
        <div className="fixed left-[50%] top-[25%] flex flex-col gap-3 mt-20 mx-auto">
          <img
            className="rounded-xl"
            src="https://images.unsplash.com/photo-1623265300797-4a3541e29a60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            width="200px"
            height="200px"
          />
          <p className="text-sm font-medium mb-5 text-center text-gray-500">
            Agrega productos a tu lista...
          </p>
        </div>
      )}
    </>
  );
};

export default ShoppingListContent;
