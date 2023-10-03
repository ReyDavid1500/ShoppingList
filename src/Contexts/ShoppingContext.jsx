import { useState, createContext } from "react";

const ShoppingContext = createContext();

const ShoppingProvider = ({ children }) => {
  const [backendData, setBackendData] = useState([]);
  const [selectedList, setSelectedList] = useState();
  const [modalCounter, setModalCounter] = useState(0);

  const setServerData = (data) => {
    setBackendData(data);
  };

  const setSelectedListData = (data) => {
    setSelectedList(data);
  };

  const checkedProductList = (shoppingList) => {
    const findListIndex = backendData.findIndex(
      (list) => list._id === shoppingList._id
    );

    const firstList = backendData.slice(0, findListIndex);
    const secondList = backendData.slice(findListIndex + 1);

    setBackendData([...firstList, shoppingList, ...secondList]);
    setSelectedList(shoppingList);
  };

  const checkedAllProduct = (shoppingList) => {
    const findListIndex = backendData.findIndex(
      (list) => list._id === selectedList._id
    );
    const firstList = backendData.slice(0, findListIndex);
    const secondList = backendData.slice(findListIndex + 1);

    setBackendData([...firstList, shoppingList, ...secondList]);
    setSelectedList(shoppingList);
  };

  const handleShowShoppingList = (id) => {
    const shoppingListFound = backendData.find((item) => item._id === id);
    setSelectedList(shoppingListFound);
  };

  const addNewShoppingList = (shoppingList) => {
    const newShopList = [shoppingList, ...backendData];
    setBackendData(newShopList);
    setSelectedList(shoppingList);
  };

  const createNewProduct = (shoppingList) => {
    const findListIndex = backendData.findIndex(
      (list) => list._id === selectedList._id
    );
    const firstList = backendData.slice(0, findListIndex);
    const secondList = backendData.slice(findListIndex + 1);
    const newProductList = [...firstList, shoppingList, ...secondList];
    setBackendData(newProductList);
    setSelectedList(shoppingList);
  };

  const sortProductList = (type) => {
    const sortedList = [...selectedList.list].sort((a, b) =>
      b[type] < a[type] ? 1 : -1
    );
    const findListIndex = backendData.findIndex(
      (list) => list._id === selectedList._id
    );
    const firstList = backendData.slice(0, findListIndex);
    const secondList = backendData.slice(findListIndex + 1);
    const newSortedList = { ...selectedList, list: sortedList };
    const newSortedProductList = [...firstList, newSortedList, ...secondList];
    setSelectedList(newSortedList);
    setBackendData(newSortedProductList);
  };

  const newSelectedListName = (shoppingList) => {
    const findListIndex = backendData.findIndex(
      (list) => list._id === selectedList._id
    );
    const firstList = backendData.slice(0, findListIndex);
    const secondList = backendData.slice(findListIndex + 1);
    const newProductList = [...firstList, shoppingList, ...secondList];
    setBackendData(newProductList);
    setSelectedList(shoppingList);
  };

  const deleteShoppingList = (data) => {
    const findListIndex = backendData.findIndex(
      (list) => list._id === data._id
    );
    backendData.splice(findListIndex, 1);
    setBackendData(backendData);
    if (backendData.length > 0) {
      setSelectedList(backendData[findListIndex - 1]);
    } else {
      setSelectedList(null);
    }
  };

  const deleteSelectedProducts = (shoppingList) => {
    const findListIndex = backendData.findIndex(
      (list) => list._id === shoppingList._id
    );
    const firstList = backendData.slice(0, findListIndex);
    const secondList = backendData.slice(findListIndex + 1);
    const newProductList = [...firstList, shoppingList, ...secondList];
    setBackendData(newProductList);
    setSelectedList(shoppingList);
  };

  return (
    <ShoppingContext.Provider
      value={{
        addNewShoppingList,
        backendData,
        setBackendData,
        selectedList,
        handleShowShoppingList,
        createNewProduct,
        checkedProductList,
        sortProductList,
        newSelectedListName,
        modalCounter,
        setModalCounter,
        deleteShoppingList,
        deleteSelectedProducts,
        checkedAllProduct,
        setServerData,
        setSelectedListData,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export { ShoppingContext, ShoppingProvider };
