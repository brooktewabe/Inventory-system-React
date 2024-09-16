// import { useState, useEffect } from "react";
// import axios from "../axiosInterceptor";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { toast, ToastContainer } from "react-toastify";
// import withAuth from "../withAuth";

// const EditBook = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);
//   const [bookName, setBookName] = useState("");
//   const [author, setAuthor] = useState("");
//   const [category, setCategory] = useState("");
//   const [NoOfCopies, setNoOfCopies] = useState(0);
//   const [rentPrice, setRentPrice] = useState("");
//   const [cover, setCover] = useState(null);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/books/${id}`);
//         setBook(response.data);
//         setBookName(response.data.bookName);
//         setAuthor(response.data.author);
//         setCategory(response.data.category);
//         setNoOfCopies(response.data.NoOfCopies);
//         setRentPrice(response.data.rentPrice);
//       } catch (error) {
//         console.error("Error fetching book:", error);
//       }
//     };

//     fetchBook();
//   }, [id]);

//   const handleFileChange = (e, setFile) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("bookName", bookName);
//     formData.append("author", author);
//     formData.append("category", category);
//     formData.append("NoOfCopies", NoOfCopies);
//     formData.append("rentPrice", rentPrice);
//     if (cover) formData.append("files", cover);
//     if (book) formData.append("files", book);

//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/books/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response.data);

//       Swal.fire({
//         title: "Success!",
//         text: "Book updated successfully.",
//         icon: "success",
//         confirmButtonColor: "#3085d6",
//         confirmButtonText: "OK",
//       }).then(() => {
//         navigate("/");
//         toast.success("Book Updated Successfully");
//       });
//     } catch (error) {
//       console.error("Error updating book:", error);
//       toast.error("Error updating book. Try again later." + error);
//     }
//   };

//   if (!book) return <div>Loading...</div>;

//   return (
//     <div className="flex justify-center min-h-screen bg-white">
//       <div className="bg-white p-6 rounded-lg w-full max-w-lg">
//         <br />
//         <br />
//         <br />
//         <h2 className="text-xl mb-4 text-gray-400 text-center">Edit Book</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               value={bookName}
//               onChange={(e) => setBookName(e.target.value)}
//               className="w-full px-3 py-2 border rounded bg-slate-100"
//               required
//               placeholder="Book Name"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               className="w-full px-3 py-2 border rounded bg-slate-100"
//               required
//               placeholder="Author"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700"></label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-3 py-2 border rounded bg-slate-100"
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Fiction">Fiction</option>
//               <option value="Self Help">Self Help</option>
//               <option value="Business">Business</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <input
//               type="number"
//               value={NoOfCopies}
//               onChange={(e) => setNoOfCopies(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//               placeholder="Book Quantity"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="number"
//               value={rentPrice}
//               onChange={(e) => setRentPrice(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//               placeholder="Rent Price"
//             />
//           </div>
//           <div className="flex space-x-4">
//             <div className="mb-4 w-1/2">
//               <input
//                 type="file"
//                 id="cover"
//                 name="cover"
//                 onChange={(e) => handleFileChange(e, setCover)}
//                 className="hidden"
//                 accept="image/*"
//               />
//               <div className="flex justify-center items-center">
//                 <label
//                   htmlFor="cover"
//                   className="text-[#1198f1] mx-2 cursor-pointer"
//                 >
//                   Upload New Cover (Optional)
//                 </label>
//               </div>
//             </div>
//             <div className="mb-4 w-1/2">
//               <input
//                 type="file"
//                 id="book"
//                 name="book"
//                 onChange={(e) => handleFileChange(e, setBook)}
//                 className="hidden"
//                 accept=".pdf, .docs, .doc"
//               />
//               <div className="flex items-center">
//                 <label
//                   htmlFor="book"
//                   className="text-[#1198f1] mx-2 cursor-pointer"
//                 >
//                   Upload New Book File (Optional)
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-[#1198f1] text-white px-20 py-2 rounded-md"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };


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

