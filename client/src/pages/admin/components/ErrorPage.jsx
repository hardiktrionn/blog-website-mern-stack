import { Link } from "react-router-dom";

const ErrorPage = ({ to, message, label }) => {
  return (
    <section className="flex items-center h-[80vh] ">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <p className="text-2xl md:text-3xl dark:text-gray-300">{message}</p>
          <Link
            to={to}
            className="px-8 py-4 text-xl font-semibold rounded bg-black text-gray-50 hover:text-gray-200"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
