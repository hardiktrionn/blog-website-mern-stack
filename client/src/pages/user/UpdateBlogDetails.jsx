import { useState } from "react";
import useBlogStore from "../../store/useBlogStore";
import { Editor } from "primereact/editor";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../../components/BackButton";
import ErrorPage from "../admin/components/ErrorPage";
import allCategories from "../../utils/allCategories";
import Selectbox from "../../components/Selectbox";
import Inputbox from "../../components/Inputbox";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const updateBlogDetails = ({ to }) => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [category, setCategory] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [data, setData] = useState(false);
  const { updateBlog, fetchSingleBlog, loading } = useBlogStore();
  const [newBanner, setNewBanner] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const [error, setError] = useState({});

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    let res = await fetchSingleBlog(id);
    setIsFetching(false);
    if (res) {
      setData(true);
      setTitle(res.title);
      setDescription(res.description);
      setCategory(res.category);
      setBanner(res.banner);
      setPrivacy(res.privacy);
    }
  };

  const handleUpdate = async () => {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", banner);
    formData.append("privacy", privacy);

    if (newBanner) {
      formData.append("file", newBanner);
    }

    let res = await updateBlog(id, formData);

    if (res) {
      setError(res);
    } else {
      setError({});
    }
  };

  return (
    <>
      {data ? (
        <div className="  flex items-center justify-center p-4">
          <div className="max-w-full h-full w-full bg-white rounded-xl shadow-lg p-8">
            <BackButton to={to} />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Edit a Blog
            </h2>

            <div className="space-y-2">
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
              <Inputbox
                label={"Title *"}
                type={"text"}
                placeholder={"Blog title"}
                value={title}
                setValue={setTitle}
                error={error?.title}
              />

              <Selectbox
                label={"Category"}
                value={category}
                setValue={setCategory}
                options={allCategories}
                error={error?.category}
              />

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
                  className={`border-2 rounded-xl overflow-hidden ${
                    error?.description ? " border-red-500" : " border-black"
                  }`}
                />
                {<p className="text-red-500 mt-1">{error?.description}</p>}
              </div>

              <Selectbox
                label={"Privacy"}
                value={privacy}
                setValue={setPrivacy}
                options={[
                  { label: "Public", checked: true, value: "public" },
                  { label: "Private", checked: false, value: "private" },
                ]}
                error={error?.privacy}
              />
              <Button
                onClick={handleUpdate}
                loading={loading}
                label={"Update"}
                loadinglabel={"Updating"}
              />
            </div>
          </div>
        </div>
      ) : isFetching ? (
        <Loader />
      ) : (
        <ErrorPage message={"Blog Not Found"} to={to} label={"Back"} />
      )}
    </>
  );
};

export default updateBlogDetails;
