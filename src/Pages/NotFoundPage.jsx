import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-screen">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-5xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">The page you requested does not exist</p>
      <Link
        to="/"
        className="text-white bg-black rounded-md px-3 py-2 mt-4"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
