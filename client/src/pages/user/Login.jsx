import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useCookies } from "react-cookie";
import Inputbox from "../../components/Inputbox";
import Button from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loginUser } = useAuthStore();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies("token");

  useEffect(() => {
    if (cookies?.token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    let res = await loginUser({ email, password, role: "user" });
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
          Login
        </h2>

        <div className="space-y-4">
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
          <div className="flex items-center justify-end">
            <Link
              to={"/forget-password"}
              className="text-sm text-black hover:text-black"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            onClick={handleLogin}
            loading={isLoading}
            label={"Login"}
            loadinglabel={"Loading"}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to={"/register"}
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
