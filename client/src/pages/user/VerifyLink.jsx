import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../instance/axiosInstance";
import { useEffect } from "react";

const VerifyLink = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const tokenParam = new URLSearchParams(search).get("token");

  useEffect(() => {
    verifyLink();
  }, []);

  const verifyLink = async () => {
    try {
      let res = await axiosInstance.get(
        `/auth/verify-link?token=${tokenParam}`
      );

      if (res?.data?.success) {
        navigate(`/new-password?token=${res.data.token}`);
        toast.success("Verify");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.responce.data.message);
    }
  };

  return <div className="text-black">{tokenParam}</div>;
};

export default VerifyLink;
