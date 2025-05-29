import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Inputbox from "../../components/Inputbox";
import Button from "../../components/Button";

const NewPassword = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const tokenParam = new URLSearchParams(search).get("token");

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const { newPassword } = useAuthStore();

  const handleUpdatePassword = async () => {
    setIsLoading(true)
    let res = await newPassword({
      password,
      confirmPassword,
      token: tokenParam,
    });
    setIsLoading(false)
    if (!res) {
      navigate("/login");
    }
    setError(res);
  };

  return (
    <div className="flex items-center h-screen justify-center p-4 ">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          New Password
        </h2>

        <div className="space-y-2">
          <Inputbox
            label={"Password *"}
            type={"password"}
            placeholder={"••••••••"}
            value={password}
            setValue={setPassword}
            error={error?.password}
          />
          <Inputbox
            label={"Confirm New Password *"}
            type={"password"}
            placeholder={"••••••••"}
            value={confirmPassword}
            setValue={setConfirmPassword}
            error={error?.confirmPassword}
          />
            <Button
            onClick={handleUpdatePassword}
            loading={isLoading}
            label={"Change Password"}
            loadinglabel={"Loading"}
          />
         
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
