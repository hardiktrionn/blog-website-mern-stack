import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loginUser } = useAuthStore();
  const [cookies, setCookies, removeCookies] = useCookies("token");

  useEffect(() => {
    if (cookies?.token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    let res = await loginUser({ email, password, role: "user" });
    if (res) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h2>

        <div className="space-y-4">
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
          <div className="flex items-center justify-end">
            <a href="#" className="text-sm text-black hover:text-black">
              Forgot password?
            </a>
          </div>

          <button
            onClick={() => handleLogin({ email, password })}
            className="w-full cursor-pointer bg-black hover:bg-black text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to={"/Register"}
            className="text-black hover:text-black font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
