const Selectbox = ({ label, value, setValue, options, error }) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        className={`input border-2 ${
          error ? "border-red-500" : "border-black "
        }`}
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((item, i) => (
          <option
            defaultChecked={item?.checked}
            key={i}
            value={item.value}
            className="first-letter:capitalize"
          >
            {item.label}
          </option>
        ))}
      </select>
      {error &&<p className="text-red-500 mt-1">{error}</p>}
    </>
  );
};

export default Selectbox;
