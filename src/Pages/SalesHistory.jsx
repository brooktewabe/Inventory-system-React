import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { FaSearch, FaFilter,  } from "react-icons/fa";

const SalesHistory = () => {
  const navigate = useNavigate();

  const [sales, setSales] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("api/sales");
        setSales(response.data.data);
        setFilteredSales(response.data.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    let updatedSales = sales;

    if (searchTerm) {
      updatedSales = updatedSales.filter((sale) =>
        sale.Full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      updatedSales = updatedSales.filter(
        (sale) => sale.status === filterStatus
      );
    }

    setFilteredSales(updatedSales);
  }, [searchTerm, filterStatus, sales]);

  const onEdit = (id) => {
    navigate(`/sales-detail/${id}`);
  };

  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto ">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4  ">
            <h3 className="text-xl font-bold">Sales History</h3>
          </div>

          {/* full-width grid */}
          <div className="bg-white p-6 rounded-lg shadow-md ml-6 ">
            <div className="flex justify-between items-center mb-6">
              <h3 className=" text-lg font-bold">Sales</h3>
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
                placeholder="Search Product"
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
                    Client
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Amount
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Payment
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Credit
                  </td>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Contact
                  </td>
                    <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                      Action
                    </td>

                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale,index) => (
                  <tr key={sale.id}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">
                    {sale.Product_id}
                    </td>
                    <td className="py-2 px-4 border-b">
                    {sale.Full_name}
                    </td>
                    <td className="py-2 px-4 border-b">
                    {sale.Amount}
                    </td>
                    
                    <td className="py-2 px-4 border-b">
                    {sale.Payment_method} 

                    </td>
                    <td className="py-2 px-4 border-b">
                      {sale.Credit} 
                    </td>
                    <td className="py-2 px-4 border-b">
                      {sale.Contact} 
                    </td>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export { SalesHistory };
export default withAuth(SalesHistory);
