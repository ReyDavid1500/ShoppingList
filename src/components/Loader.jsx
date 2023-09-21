const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="absolute top-0 bg-white w-full flex flex-col justify-center place-items-center h-screen z-10">
        <div className="border-black h-20 w-20 animate-spin rounded-full border-8 border-t-gray-300"></div>
        <p className="text-3xl font-medium text-orange-500">Loading...</p>
      </div>
    )
  );
};

export default Loader;
