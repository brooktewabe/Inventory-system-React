import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { FaEdit, FaEye} from "react-icons/fa";

const StockMovement = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("api/books");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);




  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto ">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4  ">
            <h3 className="text-xl font-bold">Stock Movement</h3>
          </div>

          {/* Live Book Status full-width grid */}
          <div className="bg-white p-6 rounded-lg shadow-md ml-6 ">
          <div className="flex justify-between items-center mb-6">
          <h3 className=" text-lg font-bold">Stock Movement</h3>
          </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                    <td></td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    ID
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Type
                  </td>

                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Date
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                  Stock Adjustment
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Product ID
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    User
                  </td>
                    <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                      Action
                    </td>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="py-2 px-4 border-b">{book.bookId}</td>
                    <td className="py-2 px-4 border-b">
                      {book.author}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {book.author}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {book.author}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {book.author}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center">
                        {book.status === "Active" ? "Free" : "Rented"}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {book.rentPrice} Birr
                    </td>
                      <td className="py-3 px-4 border-b space-x-2">
                        {/* <button
                          onClick={() => onEditBook(book.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button> */}
                        <button
                            onClick={() => navigate(`/movement-detail/${book.id}`)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaEye />
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export { StockMovement };
export default withAuth(StockMovement);
