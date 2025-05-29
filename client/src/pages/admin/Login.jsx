import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false)
  const [cookies, setCookies, removeCookies] = useCookies("token");

  useEffect(() => {
    if (cookies?.token) {
      navigate("/admin");
    }
  }, []);

  const handleAdminLogin = async () => {
    setIsLoading(true)
    let res = await loginUser({ email, password, role: "admin" });
    setIsLoading(false)
    if (!res) {
      navigate("/admin");
    }

    setError(res)
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Admin Login
        </h2>

        <div className="space-y-2">
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
        

  <Button
            onClick={handleAdminLogin}
            loading={isLoading}
            label={"Login"}
            loadinglabel={"Loading"}
          />
          
        </div>
      </div>
    </div>
  );
};

export default Login;
