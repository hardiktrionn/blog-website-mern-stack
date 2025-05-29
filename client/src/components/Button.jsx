const Button = ({ onClick, loading, label, loadinglabel }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full cursor-pointer disabled:cursor-not-allowed bg-black hover:bg-black text-white font-medium py-2.5 rounded-lg transition-colors disabled:bg-black/40"
    >
      {!loading ? (
        label
      ) : (
        <div className="flex items-center justify-center ">
          <p className="animate-pulse">{loadinglabel}...</p>
        </div>
      )}
    </button>
  );
};

export default Button;
