import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import Inputbox from "../../components/Inputbox";
import Button from "../../components/Button";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [newPicture, setNewPicture] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile } = useAuthStore();
  const { user } = useAuthStore();

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPicture(user?.picture);
    setUsername(user?.username);
  }, [user]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    let formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", username);
    if (newPicture) {
      formData.append("file", newPicture);
    }
    let res = await updateProfile(formData);
    setIsLoading(false);
    if (res) {
      setError(res);
    } else {
      setError({});
    }
  };

  return (
    <div className="flex mt-10 items-center justify-center p-4">
      <div className="max-w-[50vw] w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Update Profile
        </h2>

        <div className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <label
              htmlFor="picture"
              className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
            >
              {newPicture ? (
                <img
                  src={URL.createObjectURL(newPicture)}
                  alt="New Profile"
                  className="w-24 h-24 object-cover rounded-full"
                />
              ) : (
                <img
                  className="w-24 h-24 object-cover rounded-full"
                  src={
                    picture
                      ? `${import.meta.env.VITE_API_URL}/uploads/${picture}`
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
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
            </label>
          </div>
          <Inputbox
            label={"Name *"}
            type={"text"}
            placeholder={"Your Name"}
            value={name}
            setValue={setName}
            error={error?.name}
          />
          <Inputbox
            label={"Username *"}
            type={"text"}
            placeholder={"Your Username"}
            value={username}
            readOnly={true}
            setValue={setUsername}
            error={error?.username}
          />
          <Inputbox
            label={"Email *"}
            type={"email"}
            placeholder={"Your@gmail.com"}
            value={email}
            readOnly={true}
            setValue={setEmail}
            error={error?.email}
          />

          <Button
            onClick={handleUpdateProfile}
            loading={isLoading}
            label={"Update Profile"}
            loadinglabel={"Loading"}
          />
         
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
