import { useState } from "react";
import { Editor } from "primereact/editor";
import toast from "react-hot-toast";
import useBlogStore from "../../store/useBlogStore";
import Inputbox from "../../components/Inputbox";
import Selectbox from "../../components/Selectbox";
import allCategories from "../../utils/allCategories";
import Button from "../../components/Button";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [category, setCategory] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { createBlog } = useBlogStore();

  const handlePublich = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", banner);
    formData.append("privacy", privacy);

    let res = await createBlog(formData);
    setIsLoading(false);
    if (!res) {
      setTitle("");
      setCategory("");
      setDescription("");
      setBanner("");
      setPrivacy("public");
      setError({})
    } else {
      setError(res);
    }
  };

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="max-w-full h-full w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create a New Blog
        </h2>

        <div className="space-y-2">
          <label htmlFor="banner" className="overflow-hidden cursor-pointer">
            <div className="w-full h-[50vh] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center my-3">
              {!banner && <p>Upload Banner Image</p>}
              <input
                type="file"
                accept="image/*"
                hidden
                id="banner"
                onChange={(e) => setBanner(e.target.files[0])}
              />
              {banner && (
                <img
                  src={banner ? URL.createObjectURL(banner) : ""}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            {error?.file && <p className={"text-red-500 mt-1"}>{error.file}</p>}
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
            onClick={handlePublich}
            loading={isLoading}
            label={"Publish"}
            loadinglabel={"Loading"}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
