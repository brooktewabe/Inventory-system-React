import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";

const IncomeSection = ({ userId }) => {
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [previousMonthIncome, setPreviousMonthIncome] = useState(0);
  const currentDate = new Date(); // Get current date

  // Format the current date for display
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // State for active toggle button
  const [activePeriod, setActivePeriod] = useState("monthly");

  // Function to handle toggle button click
  const handleToggle = (period) => {
    setActivePeriod(period);
    // Fetch income based on the selected period if needed
    fetchIncome(period);
  };

  // Function to fetch income data based on the selected period
  const fetchIncome = async (period) => {
    try {
      const response = await axios.get(`http://localhost:5000/earning/${period}`);
      const data = response.data;

      // Assuming the response data contains earnings for the selected period
      setCurrentMonthIncome(data.currentMonth || 0);
      setPreviousMonthIncome(data.previousMonth || 0);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  // Fetch initial income data
  useEffect(() => {
    fetchIncome(activePeriod);
  }, [activePeriod]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Total Inventory value</h3>
        <div className="flex">
          {["yearly", "monthly", "daily"].map((period) => (
            <button
              key={period}
              onClick={() => handleToggle(period)}
              className={`py-1 px-4 rounded-lg ${
                activePeriod === period ? "bg-black text-white" : "bg-[#e0e9ec] text-black"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-extrabold">{currentMonthIncome.toFixed(0)}</p>
      </div>
      <p className="mb-6 text-sm font-bold">Total Value</p>
      <p className="mb-6 text-sm">{formattedDate}</p>
    </div>
  );
};

export default IncomeSection;