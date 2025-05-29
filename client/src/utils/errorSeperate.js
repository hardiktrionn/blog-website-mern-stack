import toast from "react-hot-toast";

const errorSeperate = (error) => {
  let validationError = {};
  error?.response?.data?.message?.forEach((err) => {
    if (err.path == "server") {
      toast.error(err.msg);
    } else {
      if (!validationError[err.path]) {
        validationError[err.path] = err.msg;
      }
    }
  });
  return validationError;
};

export default errorSeperate;
