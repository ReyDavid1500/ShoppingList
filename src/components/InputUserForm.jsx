const InputUserForm = ({
  title,
  placeholder,
  id,
  type,
  name,
  value,
  error,
  register,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold leading-6 text-gray-900">
        {title}
      </label>
      <input
        {...register(name)}
        name={name}
        id={id}
        value={value}
        className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-500"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <h2 className="text-red-500 text-xs font-medium">{error}</h2>}
    </div>
  );
};

export default InputUserForm;
