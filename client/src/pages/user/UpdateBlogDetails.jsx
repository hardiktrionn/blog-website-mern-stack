import { useState } from "react";
import useBlogStore from "../../store/useBlogStore";
import { Editor } from "primereact/editor";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../../components/BackButton";
import ErrorPage from "../admin/components/ErrorPage";

const updateBlogDetails = ({ to }) => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [category, setCategory] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const { updateBlog, fetchSingleBlog } = useBlogStore();
  const [newBanner, setNewBanner] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const allCategories = [
    "Technology",
    "Lifestyle",
    "Health & Wellness",
    "Personal Development",
    "Finance",
    "Fashion & Beauty",
    "Food & Recipes",
    "Travel",
    "Business & Entrepreneurship",
  ];

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setIsLoading(true);
    let res = await fetchSingleBlog(id);
    setIsLoading(false);
    if (res) {
      setTitle(res.title);
      setDescription(res.description);
      setCategory(res.category);
      setBanner(res.banner);
      setPrivacy(res.privacy);
    }
  };

  const handleUpdate = async () => {
    if (!title || !category || !banner || !description) {
      toast.error("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", banner);
    formData.append("privacy", privacy);

    if (newBanner) {
      formData.append("file", newBanner);
    }

    await updateBlog(id, formData);
  };

  return (
    <>
      {/* {title && isLoading ? ( */}
        <div className="  flex items-center justify-center p-4">
          <div className="max-w-full h-full w-full bg-white rounded-xl shadow-lg p-8">
            <BackButton to={to} />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Edit a Blog
            </h2>

            <div className="space-y-4">
              <label
                htmlFor="banner"
                className="overflow-hidden cursor-pointer"
              >
                <div className="w-full h-[50vh] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center my-5">
                  {!banner && <p>Upload Banner Image</p>}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="banner"
                    onChange={(e) => setNewBanner(e.target.files[0])}
                  />
                  {newBanner ? (
                    <img
                      src={URL.createObjectURL(newBanner)}
                      alt="banner"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${banner}`}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
              </label>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="title"
                  className="input"
                  placeholder="Blog Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Privacy
                </label>
                <select
                  className="input"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <Editor
                  value={description}
                  onTextChange={(e) => setDescription(e.htmlValue)}
                  style={{ height: "320px" }}
                />
              </div>
              <div>
                <label
                  htmlFor="privacy"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Privacy
                </label>
                <select
                  className="input"
                  id="privacy"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <option defaultChecked value={"public"}>
                    Public
                  </option>
                  <option value={"private"}>Private</option>
                </select>
              </div>
              <button
                onClick={handleUpdate}
                className="w-full cursor-pointer bg-black hover:bg-black text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
   
    </>
  );
};

export default updateBlogDetails;
