export const shoppingList = [
    {
        id: 1,
        name: "Compra Lider",
        list: [
            { id: 1, name: "Queso", isChecked: true },
            { id: 2, name: "Yogur", isChecked: false },
            { id: 3, name: "Leche", isChecked: true }
        ],

    },
    {
        id: 2,
        name: "Compra Agrosuper",
        list: [
            { id: 1, name: "Kiwi", isChecked: true },
            { id: 2, name: "Platano", isChecked: false },
            { id: 3, name: "Frutilla", isChecked: true },
            { id: 4, name: "Banana", isChecked: false }
        ],

    },
];

export const sortingOptions = [
    {
        id: 1,
        title: "Alfabético",
        type: "name"

    },
    {
        id: 2,
        title: "Pedido",
        type: "id"

    },
    {
        id: 3,
        title: "Completado",
        type: "isChecked"

    },
];

export const settingListItems = [
    {
        id: 1,
        title: "Cambiar nombre de la lista",
        type: "changeName"
    },
    {
        id: 2,
        title: "Eliminar lista",
        type: "deleteList"
    },
    {
        id: 3,
        title: "Eliminar todo lo marcado",
        type: "deleteAllProducts"
    },
    {
        id: 4,
        title: "Marcar todo",
        type: "selectAll"
    },
    {
        id: 5,
        title: "Desmarcar todo",
        type: "unselectAll"
    },
];