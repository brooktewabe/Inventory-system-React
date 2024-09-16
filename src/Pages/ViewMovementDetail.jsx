import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const handleReturn = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4">
            <h3 className="text-xl font-bold">Stock Movement - Details</h3>
          </div>

          {/* Live Book Status full-width grid */}
          <div className="bg-white p-6 rounded-lg shadow-md ml-40 max-w-2xl">
            <div className="ml-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Stock Movement</h3>
              <hr className="mb-4" />

                <div className="flex items-center">
                  <strong className="w-40">Author:</strong>
                  <span className="text-[#8f8d8d]">{book.author}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-40">Change Mode:</strong>
                  <span className="text-[#8f8d8d]">{book.author}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-40">Date:</strong>
                  <span className="text-[#8f8d8d]">{book.author}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-40">Reason:</strong>
                  <span className="text-[#8f8d8d]">{book.author}</span>
                </div>
              </div>
              <br />
              <br />
              <br />
              <hr />
              <br />
              <button
                onClick={handleReturn}
                className="bg-[#16033a] ml-40  text-white px-16 py-2 rounded-lg"
              >
                Done
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Dashboard };
export default withAuth(Dashboard);
