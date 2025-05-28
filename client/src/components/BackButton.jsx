import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const BackButton = ({ to }) => {
  return (
    <Link
      to={to}
      className="bg-black w-fit text-white flex rounded-md items-center px-5 py-2 space-x-2 cursor-pointer"
    >
      <IoMdArrowRoundBack />
      <span>Back</span>
    </Link>
  );
};

export default BackButton;
