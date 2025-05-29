import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";
import { useCookies } from "react-cookie";
import Inputbox from "../../components/Inputbox";
import Button from "../../components/Button";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies("token");
  const [error, setError] = useState({});

  useEffect(() => {
    if (cookies?.token) {
      navigate("/");
    }
  }, []);

  const handleRegister = async () => {
    setIsLoading(true);
    let formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmpassword", confirmPassword);
    formData.append("file", picture);
    formData.append("role", "user");

    let res = await registerUser(formData);
    setIsLoading(false);
    if (!res) {
      navigate("/");
    }
    setError(res);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Register
        </h2>

        <div className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <label
              htmlFor="picture"
              className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
            >
              {picture ? (
                <img
                  className="w-24 h-24 object-cover rounded-full"
                  src={URL.createObjectURL(picture)}
                />
              ) : (
                <FaRegUserCircle
                  htmlFor="picture"
                  className="text-6xl text-gray-400 mx-auto mb-4"
                />
              )}
              <input
                type="file"
                className="hidden"
                id="picture"
                accept="image/*"
                onChange={(e) => setPicture(e.target.files[0])}
              />
              {picture ? (
                picture.name
              ) : (
                <p
                  className={`${
                    error?.file ? "text-red-500" : "text-gray-700"
                  } mt-1`}
                >
                  {error.file || "Upload Profile Picture"}
                </p>
              )}
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
            setValue={setUsername}
            error={error?.username}
          />
          <Inputbox
            label={"Email *"}
            type={"email"}
            placeholder={"Your@gmail.com"}
            value={email}
            setValue={setEmail}
            error={error?.email}
          />
          <Inputbox
            label={"Password *"}
            type={"password"}
            placeholder={"••••••••"}
            value={password}
            setValue={setPassword}
            error={error?.password}
          />
          <Inputbox
            label={"Confirm Password *"}
            type={"password"}
            placeholder={"••••••••"}
            value={confirmPassword}
            setValue={setConfirmPassword}
            error={error?.confirmpassword}
          />

          <Button
            onClick={handleRegister}
            loading={isLoading}
            label={"Register"}
            loadinglabel={"Loading"}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account.{" "}
          <Link
            to={"/login"}
            className="text-black hover:text-black font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
