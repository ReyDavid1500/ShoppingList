import { createPortal } from "react-dom";

const Modal = ({
  children,
  isOpen,
  title,
  onClose,
  addState = true,
  onHandleAccept,
  acceptButtonTitle = "Crear",
}) => {
  return createPortal(
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="bg-black/60 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-[1]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fff] rounded-lg h-40 w-96 p-5 border border-gray-500 shadow-lg mx-auto flex flex-col justify-center"
          >
            <h2 className="text-xs font-medium mb-5 dark:text-black">
              {title}
            </h2>
            {children}
            <div className="flex flex-row gap-5 justify-end text-xs p-2">
              <button
                type="button"
                onClick={onClose}
                className="text-blue-500 font-bold hover:bg-gray-300 rounded-full"
              >
                Cancelar
              </button>
              <button
                className={` ${addState ? "text-black" : "text-gray-300"} `}
                onClick={onHandleAccept}
                type="button"
                disabled={!addState}
              >
                {acceptButtonTitle}
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
