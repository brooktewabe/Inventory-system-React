import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { FaSearch, FaFilter } from "react-icons/fa";

const SalesHistory = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchSales = async (page) => {
      try {
        const response = await axios.get(`api/sales?page=${page}&limit=${itemsPerPage}`);
        setSales(response.data.data);
        setFilteredSales(response.data.data);
        
        // Ensure the API returns totalCount for calculating total pages
        const totalCount = response.data.total; 
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales(currentPage);
  }, [currentPage]);

  useEffect(() => {
    let updatedSales = sales;

    if (searchTerm) {
      updatedSales = updatedSales.filter((sale) =>
        sale.Product_id && sale.Product_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    }

    if (filterStatus) {
      updatedSales = updatedSales.filter(
        (sale) => sale.status === filterStatus
      );
    }

    setFilteredSales(updatedSales);
  }, [searchTerm, filterStatus, sales]);
  const formatProductId = (id) => {
    if (id.length <= 10) return id; // Return the id if it's less than or equal to 10 characters
    return `${id.slice(0, 5)}...${id.slice(-5)}`; // Format as 'xxxxx...xxxxx'
  };
  const onEdit = (id) => {
    navigate(`/sales-detail/${id}`);
  };

  // Pagination handler
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-4">
            <h3 className="text-xl font-bold">Sales History</h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md ml-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Sales</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSearchVisible(!searchVisible)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaSearch size={20} />
                </button>

              </div>
            </div>
            {searchVisible && (
              <input
                type="text"
                placeholder="Search History on this page"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
            )}

            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  {["No.", "Product ID", "Client", "Amount", "Payment", "Credit", "Contact", "Action"]?.map((header) => (
                    <td key={header} className="py-2 text-[#9aa3a7] text-sm px-4 border-b">{header}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSales?.map((sale, index) => (
                  <tr key={sale.id}>
                    <td className="py-2 px-4 border-b">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="py-2 px-4 border-b">{formatProductId(sale.Product_id)}</td>
                    <td className="py-2 px-4 border-b">{sale.Full_name}</td>
                    <td className="py-2 px-4 border-b">{sale.Amount}</td>
                    <td className="py-2 px-4 border-b">{sale.Payment_method}</td>
                    <td className="py-2 px-4 border-b">{sale.Credit}</td>
                    <td className="py-2 px-4 border-b">{sale.Contact}</td>
                    <td className="py-3 px-4 border-b space-x-2">
                      <button
                        onClick={() => onEdit(sale.id)}
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div className="mt-4 flex justify-center items-center space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {/* Display total pages correctly */}
              <span>Page {currentPage} of {totalPages > 0 ? totalPages : 1}</span> 
              {/* Prevent NaN display */}
              <button
                className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SalesHistory };
export default withAuth(SalesHistory);