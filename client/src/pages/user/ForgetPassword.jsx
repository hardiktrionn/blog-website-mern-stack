import { useState } from "react";
import Inputbox from "../../components/Inputbox";
import { toast } from "react-hot-toast";
import axiosInstance from "../../instance/axiosInstance";
import errorSeperate from "../../utils/errorSeperate";
import Button from "../../components/Button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleForgetPassword = async () => {
    try {
      setIsLoading(true);
      let res = await axiosInstance.post("/auth/forget-password", { email });
      setIsLoading(false);
      if (res.data.success) {
        toast.success("Email Send");
        setError({});
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error?.response) {
        let err = errorSeperate(error);
 setIsLoading(false);
        setError(err);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Forget Password
        </h2>

        <div className="space-y-2">
          <Inputbox
            label={"Email *"}
            type={"email"}
            placeholder={"your@gmail.com"}
            value={email}
            setValue={setEmail}
            error={error?.email}
          />

          <Button
            onClick={handleForgetPassword}
            loading={isLoading}
            label={"Forget Password"}
            loadinglabel={"Loading"}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
