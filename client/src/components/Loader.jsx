import { BiLoaderCircle } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
      <div className="flex justify-center items-center space-x-1 text-3xl text-gray-700">
        <BiLoaderCircle className="animate-spin" />

        <div>Loading ...</div>
      </div>
    </div>
  );
};

export default Loader;
