import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container max-w-[500px] mx-auto mt-16 py-6 border-2 border-gray-700 flex flex-col gap-6 items-center rounded-xl">
      <div className="text-xl font-bold">404 Not Found</div>

      <Link
        to="/"
        className="border border-gray-300 px-4 py-2 rounded-lg font-semibold bg-gray-50 hover:bg-gray-200"
      >
        Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
