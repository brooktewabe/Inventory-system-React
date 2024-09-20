import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { GoImage } from "react-icons/go";
import { toast, ToastContainer } from "react-toastify";

const EditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);
  const [Name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [Curent_stock, setCurent_stock] = useState("");
  const [Reorder_level, setReorder_level] = useState("");
  const [Product_image, setProduct_image] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stock/${id}`);
        setStock(response.data);
        setName(response.data.Name);
        setLocation(response.data.Location);
        setCategory(response.data.Category);
        setCurent_stock(response.data.Curent_stock);
        setReorder_level(response.data.Reorder_level);
        setProduct_image(response.data.Product_image);
      } catch (error) {
        console.error("Error fetching stock:", error);
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
    formData.append("Name", Name);
    formData.append("Location", location);
    formData.append("Category", category);
    formData.append("Curent_stock", Curent_stock);
    formData.append("Reorder_level", Reorder_level);
    if (Product_image) formData.append("files", Product_image);

    try {
      const response = await axios.patch(
        `http://localhost:5000/stock/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      Swal.fire({
        title: "Success!",
        text: "Updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
        toast.success("Updated Successfully");
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Error updating stock. Try again later." + error);
    }
  };

  if (!stock) return <div>Loading...</div>;

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <section className="bg-[#edf0f0b9] h-screen">
      <div className="container m-auto ">
        <div className="grid grid-cols-1 gap-6">
          {/* First small full-width grid */}
          <div className="bg-white p-4  ">
            <h3 className="text-xl font-bold">Edit Product</h3>
          </div>

          {/* Create Product Section */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-[70%] ml-20">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Right Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={Curent_stock}
                    onChange={(e) => setCurent_stock(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    id="Product_image"
                    name="Product_image"
                    onChange={(e) => handleFileChange(e, setProduct_image)}
                    className="hidden"
                    // required
                    accept=".pdf, .docs, .doc, .jpg, .jpeg, .png"
                  />
                  <div className="flex items-center">
                    <div className="bg-[#]">
                      <GoImage size={30} />
                    </div>
                    <label
                      htmlFor="Product_image"
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
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export { EditProduct };
export default withAuth(EditProduct);
