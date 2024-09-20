import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { GoImage } from "react-icons/go";
import { toast, ToastContainer } from "react-toastify";

const RecordSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [Product_id, setProduct_id] = useState(id);
  const [Full_name, setFull_name] = useState("");
  const [Contact, setContact] = useState("");
  const [Amount, setAmount] = useState("");
  const [Payment_method, setPayment_method] = useState("");
  const [Total_amount, setTotal_amount] = useState("");
  const [Credit, setCredit] = useState("");
  const [Credit_due, setCredit_due] = useState("");
  const [Transaction_id, setTransaction_id] = useState("");
  const [Receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stock/${id}`);
        setSale(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchStock();
  }, [id]);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Product_id", Product_id);
    formData.append("Full_name", Full_name);
    formData.append("Contact", Contact);
    formData.append("Amount", Amount);
    formData.append("Payment_method", Payment_method);
    formData.append("Total_amount", Total_amount);
    formData.append("Credit_due", Credit_due);
    formData.append("Credit", Credit);
    formData.append("Transaction_id", Transaction_id);
    if (Receipt) formData.append("files", Receipt);

    try {
      const response = await axios.post(
        `http://localhost:5000/sales`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Recorded successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
        toast.success("Recorded Successfully");
      });
    } catch (error) {
      console.error("Error Recorded:", error);
      toast.error("Error Recorded. Try again later." + error);
    }
  };

  if (!sale) return <div>Loading...</div>;

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto ">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4  ">
            <h3 className="text-xl font-bold">Record Sale</h3>
          </div>

          {/* Create Product Section */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-[70%] ml-20">
            <h3 className="text-xl font-bold mb-4">Record Sales</h3>
            <hr />
            <h3 className="text-md font-bold mb-4">Buyer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Right Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={Full_name}
                    onChange={(e) => setFull_name(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
              {/* Left Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
            </div>
            <br /> <hr />
            <br />
            <h3 className="text-md font-bold mb-4">Order Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Right Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={Amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Credit Given
                  </label>
                  <input
                    type="number"
                    value={Credit}
                    onChange={(e) => setCredit(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={Transaction_id}
                    onChange={(e) => setTransaction_id(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
              {/* 2nd Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    value={Payment_method}
                    onChange={(e) => setPayment_method(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Credit due
                  </label>
                  <input
                    type="text"
                    value={Credit_due}
                    onChange={(e) => setCredit_due(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
              {/* 3rd Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Total Payment
                  </label>
                  <input
                    type="number"
                    value={Total_amount}
                    onChange={(e) => setTotal_amount(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-bold text-gray-700">
                    Receipt
                  </label>
                  <input
                    type="file"
                    id="Receipt"
                    name="Receipt"
                    onChange={(e) => handleFileChange(e, setReceipt)}
                    className="hidden"
                    required
                    accept=".pdf, .docs, .doc"
                  />
                  <div className="flex items-center">
                    <div className="bg-[#]">
                      <GoImage size={30} />
                    </div>
                    <label
                      htmlFor="Receipt"
                      className="text-white bg-[#16033a] py-2 px-6  mx-2 cursor-pointer border rounded-2xl"
                    >
                      Upload Image <br />
                      {/* <span className="text-[#98b4c7]">(Required)</span> */}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-around space-x-4 mt-6">
              <button
                onClick={handleCancel}
                className="border border-gray-400 text-gray-700 px-16 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#16033a]  text-white px-16 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { RecordSale };
export default withAuth(RecordSale);
