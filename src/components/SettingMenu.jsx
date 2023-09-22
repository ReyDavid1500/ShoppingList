import React, { useContext, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { settingListItems } from "../data/shoppingList";
import { ShoppingContext } from "../Contexts/ShoppingContext";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Modal from "../Modal";
import Tooltip from "../components/Tooltip";
import { SnackbarContext } from "../Contexts/SnackbarContext";

function SettingMenu() {
  const {
    newSelectedListName,
    modalCounter,
    setModalCounter,
    deleteShoppingList,
    selectedList,
    deleteSelectedProducts,
    checkedAllProduct,
  } = useContext(ShoppingContext);

  const { showSnackbar } = useContext(SnackbarContext);

  const [openDropdown2, setOpenDropdown2] = useState(false);
  const [showModalList3, setShowModalList3] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalDeleteSelect, setShowModalDeleteSelect] = useState(false);
  const [nameList, setNameList] = useState("");

  const { ref } = useOnClickOutside(() => {
    setOpenDropdown2(false);
  });

  const handleMoreButtonOptions = async (e) => {
    const type = e.target.dataset.type;

    switch (type) {
      case "changeName":
        setModalCounter(selectedList?.name?.length);
        setShowModalList3(true);
        setOpenDropdown2(false);
        break;
      case "deleteList":
        setShowDeleteModal(true);
        setOpenDropdown2(false);
        break;
      case "deleteAllProducts":
        setShowModalDeleteSelect(true);
        setOpenDropdown2(false);
        break;
      case "selectAll":
        const filteredIds = selectedList.list.filter(
          (list) => list.isChecked === false
        );
        const ids = filteredIds.map((list) => list._id);
        const data = await checkedAllProductBackend(
          selectedList._id,
          ids,
          true
        );
        checkedAllProduct(data);
        setOpenDropdown2(false);
        showSnackbar("Todos los elementos marcados...");
        break;
      case "unselectAll":
        const filteredIds2 = selectedList.list.filter(
          (list) => list.isChecked === true
        );
        const ids2 = filteredIds2.map((list) => list._id);
        const data2 = await checkedAllProductBackend(
          selectedList._id,
          ids2,
          false
        );
        checkedAllProduct(data2);
        setOpenDropdown2(false);
        showSnackbar("Todos los elementos desmarcados...");
    }
  };

  const checkedAllProductBackend = async (id, ids, isChecked) => {
    const res = await fetch(
      `https://shoppinglist-api-ctyk.onrender.com/shoppingList/${id}/list`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, isChecked }),
      }
    );
    return await res.json();
  };

  const handleModalDelete = async () => {
    const data = await deleteShoppingListBackend(selectedList._id);
    console.log(data);
    deleteShoppingList(data);
    setShowDeleteModal(false);
    showSnackbar("Lista eliminada...");
  };

  const deleteShoppingListBackend = async (_id) => {
    const res = await fetch(
      `https://shoppinglist-api-ctyk.onrender.com/shoppingList/${_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    return await res.json();
  };

  const handleDeleteSelectedProducts = async () => {
    const filteredIds = selectedList.list.filter(
      (list) => list.isChecked === true
    );
    const ids = filteredIds.map((list) => list._id);
    const data = await deleteSelectedProductsBackend(selectedList._id, ids);
    deleteSelectedProducts(data);
    setShowModalDeleteSelect(false);
    showSnackbar("Elementos marcados eliminados...");
  };

  const deleteSelectedProductsBackend = async (id, ids) => {
    const res = await fetch(
      `https://shoppinglist-api-ctyk.onrender.com/shoppingList/${id}/list`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      }
    );
    return await res.json();
  };

  const handleChangeListName = (e) => {
    setNameList(e.target.value);
    setModalCounter(nameList.length);
  };

  const onSubmitNewName = async (e) => {
    try {
      e.preventDefault();
      const data = await newSelectedListNameBackend(selectedList._id, nameList);
      newSelectedListName(data);
      setShowModalList3(false);
      showSnackbar("Nombre de la lista cambiado...");
    } catch (error) {
      console.log(error);
    }
  };

  const onKeyPressNewList = (e) => {
    if (e.key === "Enter") {
      onSubmitNewName(e);
      showSnackbar("Nombre de la lista cambiado...");
    }
  };

  const newSelectedListNameBackend = async (_id, name) => {
    const res = await fetch(
      `https://shoppinglist-api-ctyk.onrender.com/shoppingList/${_id}/name`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return await res.json();
  };

  return (
    <div>
      {/* Eliminar elementos marcados */}
      <Modal
        isOpen={showModalDeleteSelect}
        onClose={() => setShowModalDeleteSelect(false)}
        title="¿Eliminar todos los elementos marcadaos?"
        acceptButtonTitle="Eliminar"
        onHandleAccept={handleDeleteSelectedProducts}
      >
        <p className="text-sm font-medium mb-5 text-center text-gray-500">
          Estos elementos se eliminarán definitivamente
        </p>
      </Modal>
      {/* Eliminar lista */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onHandleAccept={handleModalDelete}
        title="¿Eliminar la lista?"
        acceptButtonTitle="Eliminar"
      >
        <p className="text-sm font-medium mb-5 text-center text-gray-500">
          {selectedList?.name} se eliminará definitivamente
        </p>
      </Modal>
      {/* Cambiar nombre de la lista */}
      <Modal
        isOpen={showModalList3}
        onClose={() => {
          setShowModalList3(false);
          setModalCounter(0);
        }}
        addState={nameList}
        onHandleAccept={onSubmitNewName}
        title="Cambiar nombre de la lista"
        acceptButtonTitle="Guardar"
      >
        {/* Hacer un componente Input */}
        <input
          className="bg-[#f1f3f4] focus:outline-none focus:border-b-blue-600 focus:border-b-2 border-b-[1px] border-black hover:bg-gray-100 p-2"
          type="text"
          defaultValue={selectedList.name}
          placeholder="Nombre de la lista"
          maxLength={201}
          onChange={handleChangeListName}
          onKeyUp={onKeyPressNewList}
        />
        <div className="flex place-content-end text-xs font-light">
          <span>{modalCounter} / 200</span>
        </div>
      </Modal>
      <div className="flex flex-col">
        <Tooltip title="Más">
          <button
            className="block focus:bg-gray-200 focus:delay-150 focus:duration-300 focus:rounded-full p-2 hover:bg-gray-200 hover:rounded-full"
            type="button"
            onClick={() => {
              setOpenDropdown2(!openDropdown2);
            }}
          >
            <EllipsisVerticalIcon className="h-6 w-6 text-black" />
          </button>
        </Tooltip>
      </div>
      {openDropdown2 && (
        <div
          ref={ref}
          className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {settingListItems.map((listItem) => (
            <div className="p-1 hover:bg-gray-300/50" key={listItem.id}>
              <button
                data-type={listItem.type}
                onClick={handleMoreButtonOptions}
                className="text-gray-700 block px-4 py-2 text-sm hover:font-medium disabled:text-gray-200"
              >
                {listItem.title}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SettingMenu;
