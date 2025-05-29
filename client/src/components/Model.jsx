import { GoTrash } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import useDeletemodelStore from "../store/useDeletemodelStore";

const Model = ({ onDelete }) => {
  const { closeDeleteModal } = useDeletemodelStore();
  return (
    <div id="modal">
      <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] overflow-auto bg-gray-600/50">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
          <IoClose
            size={25}
            onClick={closeDeleteModal}
            className="absolute right-5 top-5 cursor-pointer"
          />

          <div className="my-6 text-center">
            <div className="flex items-center justify-center">
              <GoTrash size={80} className="text-red-500" />
            </div>
            <h4 className="text-slate-900 text-base font-medium mt-4">
              Are you sure you want to delete it?
            </h4>

            <div className="text-center space-x-4 mt-10">
              <button
                onClick={closeDeleteModal}
                className="px-5 py-2.5 rounded-lg text-slate-900 text-sm font-medium cursor-pointer bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              >
                No, Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-5 py-2.5 rounded-lg text-white text-sm font-medium cursor-pointer bg-red-600 hover:bg-red-700 active:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
