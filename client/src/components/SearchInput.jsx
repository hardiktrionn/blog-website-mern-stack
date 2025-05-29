import { IoSearchSharp } from "react-icons/io5";

const SearchInput = ({value,setValue}) => {
  return (
    <div className="flex items-center px-4 py-3 rounded-md border-2 border-black overflow-hidden w-full mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Search Something..."
        className="w-full outline-none bg-transparent text-gray-600 text-sm"
      />
     <IoSearchSharp />
    </div>
  );
};

export default SearchInput;
