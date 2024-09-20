import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import UnauthorizedAccess from "../Components/UnauthorizedAccess";
import { FaSearch} from "react-icons/fa";

const Notification = () => {

  const [notifications, setNotifications] = useState([]);
  const [filterednotifications, setFilterednotifications] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const currentRole = localStorage.getItem('role');
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("api/notification");
        setNotifications(response.data);
        setFilterednotifications(response.data);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchNotifications();
  }, []);
  useEffect(() => {
    let updatedNotifications = notifications;

    if (searchTerm) {
      updatedNotifications = updatedNotifications.filter((notification) =>
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterednotifications(updatedNotifications);
  }, [searchTerm, notifications]);
  return (
    <section className="bg-[#edf0f0b9] h-screen">
    {currentRole === "admin" ? (
      <div className="container m-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4">
            <h3 className="text-xl font-bold">Notification</h3>
          </div>
  
          {/* full-width grid */}
          <div className="bg-white p-6 rounded-lg shadow-md ml-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex justify-end items-center space-x-4 w-full">
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
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
            )}
  
            <table className="min-w-full bg-white">
              <tbody>
                {filterednotifications.map((notification, index) => (
                  <tr key={notification.id}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{notification.message}</td>
                    <td className="py-2 px-4 border-b">
                      {notification.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <UnauthorizedAccess />
    )}
  </section>
  
  );
};

export { Notification };
export default withAuth(Notification);
