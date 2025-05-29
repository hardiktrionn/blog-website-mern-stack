import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Inputbox from "../../components/Inputbox";
import Button from "../../components/Button";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const { changePassword } = useAuthStore();

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    let res = await changePassword({ password, newPassword, confirmPassword });
    setIsLoading(false);
    if (!res) {
      navigate("/profile");
    }
    setError(res);
  };

  return (
    <div className="flex items-center justify-center p-4 mt-20">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Change Password
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
            label={"New Password *"}
            type={"password"}
            placeholder={"••••••••"}
            value={newPassword}
            setValue={setNewPassword}
            error={error?.newPassword}
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

export default ChangePassword;
