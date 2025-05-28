import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";
import { useCookies } from "react-cookie";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registerUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies("token");

  useEffect(() => {
    if (cookies?.token) {
      navigate("/");
    }
  }, []);

  const handleRegister = async () => {
    let formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmpassword", confirmPassword);
    formData.append("file", picture);
    formData.append("role", "user");

    let res = await registerUser(formData);

    if (res) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Register
        </h2>

        <div className="space-y-4">
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
              User Name
            </label>
            <input
              id="name"
              type="text"
              className="input"
              placeholder="Your UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full cursor-pointer bg-black hover:bg-black text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Register
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account.{" "}
          <Link
            to={"/Login"}
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
