import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { useParams } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { useNavigate} from "react-router-dom";

const ViewSaleDetail = () => {
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
            <h3 className="text-xl font-bold">Sales History - Details</h3>
          </div>

          {/* Live Book Status full-width grid */}
          <div className="bg-white p-6 rounded-lg shadow-md ml-40 max-w-2xl">
            <div className="ml-16 mb-6">
              <div className="flex flex-col items-center">
              <FaClock size={25}/>
              <h3 className="text-2xl font-bold mb-4">Sales History Record</h3>
              </div>
              <hr className="mb-4" /><br />
              <h3 className=" font-bold mb-4">Buyer Information</h3>
                <div className="flex items-center">
                  <strong className="w-60 text-[#8f8d8d]">Full Name:</strong>
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-60 text-[#8f8d8d]">Phone Number:</strong>
                  <span >{book.author}</span>
                </div>
               <br /> <hr className="mb-4" />
                <h3 className=" font-bold mb-4">Order Information</h3>
                <div className="flex items-center">
                  <strong className="w-60 text-[#8f8d8d]">Product Title</strong>
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-60 text-[#8f8d8d]">Product ID</strong>
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-60 text-[#8f8d8d]">Price</strong>
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-60 text-[#8f8d8d]">Payment Method</strong>
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center">
                  <strong className="w-60 text-[#8f8d8d]">Credit</strong>
                  <span>{book.author}</span>
                </div>
              </div>
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

export { ViewSaleDetail };
export default withAuth(ViewSaleDetail);
