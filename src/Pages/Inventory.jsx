import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { FaEdit, FaTrash, FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { AiOutlineHourglass } from "react-icons/ai";
import Chart from "../Components/Chart";
import AreaChart from "../Components/AreaChart";
import IncomeSection from "../Components/Income";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [time, setTime] = useState(new Date());

  const [books, setBooks] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour12: true,
    };
    return (
      date.toLocaleDateString("en-US", options) +
      ", " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

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

  useEffect(() => {
    let updatedBooks = books;

    if (searchTerm) {
      updatedBooks = updatedBooks.filter((book) =>
        book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      updatedBooks = updatedBooks.filter(
        (book) => book.status === filterStatus
      );
    }

    setFilteredBooks(updatedBooks);
  }, [searchTerm, filterStatus, books]);

  const onDeleteBook = async (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`api/books/${bookId}`);
          setBooks(books.filter((book) => book.id !== bookId));
          toast.success("Book Deleted Successfully");
        } catch (error) {
          toast.error("Error deleting book. Try again later.");
        }
      }
    });
  };

  const onEditBook = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };
  const handleAddNavigation = () => {
    navigate("/add-product");
  };
  const handleMovementNavigation = () => {
    navigate("/stock-movement");
  };

  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto ">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4  ">
            <h3 className="text-xl font-bold">Stock System</h3>
          </div>

          {/* Two equally sized grids */}
          <div className="grid grid-cols-2 gap-6">
            <div className="px-10">
              <div
                className="bg-[#eceaeaec] p-6 max-w-sm rounded-lg ml-20 shadow-md cursor-pointer"
                onClick={handleAddNavigation}
              >
                <div className="items-center mb-4 flex flex-col">
                  <FaPlus size={40} />
                  <p>Create Product</p>
                </div>
              </div>
            </div>
            <div className="px-10">
              <div 
                className="bg-[#eceaeaec] p-6 max-w-sm rounded-lg mr-20 shadow-md cursor-pointer"
                onClick={handleMovementNavigation}
                >
                <div className=" items-center mb-4  flex flex-col">
                  <AiOutlineHourglass size={40} />
                  <p>Stock Movement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Book Status full-width grid */}
          <div className="bg-white p-6 rounded-lg shadow-md ml-6 ">
            <div className="flex justify-between items-center mb-6">
              <h3 className=" text-lg font-bold">Stock List</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSearchVisible(!searchVisible)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaSearch size={20} />
                </button>
                <button
                  onClick={() => setFilterVisible(!filterVisible)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaFilter size={20} />
                </button>
              </div>
            </div>
            {searchVisible && (
              <input
                type="text"
                placeholder="Search by book name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
            )}
            {filterVisible && (
              <div className="mb-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select status</option>
                  <option value="Active">Free</option>
                  <option value="unavailable">Rented</option>
                </select>
              </div>
            )}
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    No.
                  </td>

                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Product ID
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Category
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Current Stock Level
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Reorder Level
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Location
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
                      <div className="flex items-center">
                        {book.status === "Active" ? "Free" : "Rented"}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {book.rentPrice} Birr
                    </td>

                      <td className="py-3 px-4 border-b space-x-2">
                        <button
                          onClick={() => onEditBook(book.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => onDeleteBook(book.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
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

export { Dashboard };
export default withAuth(Dashboard);
