const SnackBar = ({ isOpen, children }) => {
  return (
    <div
      className={`${
        isOpen
          ? "visible ease-in-out duration-300 animate-pulse w-[300px] h-4 ml-[-125px] bg-black/80 text-white text-center rounded-md p-5 fixed z-10 left-[25%] bottom-8 flex justify-center items-center"
          : "invisible"
      }`}
    >
      {children}
    </div>
  );
};

export default SnackBar;
