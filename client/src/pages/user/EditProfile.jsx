import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { FaRegUserCircle } from "react-icons/fa";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [newPicture, setNewPicture] = useState("");
  const [username, setUsername] = useState("");
  const { updateProfile } = useAuthStore();
  const { user } = useAuthStore();

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPicture(user?.picture);
    setUsername(user?.username);
  }, [user]);

  const handleUpdateProfile = () => {
    let formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", username);
    if (newPicture) {
      formData.append("file", newPicture);
    }
    updateProfile(formData);
  };

  return (
    <div className="flex mt-10 items-center justify-center p-4">
      <div className="max-w-[50vw] w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Update Profile
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <label
              htmlFor="picture"
              className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
            >
              {newPicture ? (
                <img
                  src={URL.createObjectURL(newPicture)}
                  alt="New Profile"
                  className="w-28 h-20 object-cover rounded-md"
                />
              ) : (
                <img
                  className="w-28 h-20"
                  src={`${import.meta.env.VITE_API_URL}/uploads/${picture}`}
                  alt={`${name}'s profile picture
                }`}
                />
              )}
              <input
                type="file"
                className="hidden"
                id="picture"
                accept="image/*"
                onChange={(e) => setNewPicture(e.target.files[0])}
              />
              {picture ? picture.name : "Upload Profile Picture"}
            </label>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="input"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              className="input"
              placeholder="Your Username"
              value={username}
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="your@email.com"
              value={email}
              readOnly
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            className="w-full cursor-pointer bg-black hover:bg-black text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
