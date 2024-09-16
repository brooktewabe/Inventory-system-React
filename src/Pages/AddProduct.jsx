import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { GoImage } from "react-icons/go";

const Dashboard = () => {
  const [productTitle, setProductTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [stockAmount, setStockAmount] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  const handleCancel = () => {
    // Handle cancel logic here
  };
  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto ">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4  ">
            <h3 className="text-xl font-bold">Create Product</h3>
          </div>

          {/* Create Product Section */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-[70%] ml-20">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Right Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
              {/* Left Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Amount
                  </label>
                  <input
                    type="number"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-4 w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => handleFileChange(e, setImage)}
                    className="hidden"
                    required
                    accept=".pdf, .docs, .doc"
                  />
                  <div className="flex items-center">
                    <div className="bg-[#]">
                    <GoImage size={30}/>
                    </div>
                    <label
                      htmlFor="Image"
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

export { Dashboard };
export default withAuth(Dashboard);
