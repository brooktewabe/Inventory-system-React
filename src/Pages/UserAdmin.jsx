/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { FaSearch, FaTrash } from "react-icons/fa";
import * as Yup from "yup";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UnauthorizedAccess from "../Components/UnauthorizedAccess";

const UserAdmin = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("book_owner");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const currentRole = localStorage.getItem("role");

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await fetch("/api/profile/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });
      toast.success("Registration successful");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already in use");
      } else {
        toast.error("Failed to sign up. Please try again later.");
      }
      console.error(error);
    }
  };
  const validateForm = () => {
    const schema = Yup.object().shape({
      lname: Yup.string().required("Last name is required"),
      fname: Yup.string().required("First name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([password], "Passwords must match")
        .required("Confirm Password is required"),
    });

    try {
      schema.validateSync(
        { email, password, confirmPassword },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
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
  }, [searchTerm, books]);

  const onDeleteBook = async (bookId) => {
    Swal.fire({
      text: "Are you sure you want to delete this user?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      customClass: {
        cancelButton: "border border-gray-700 px-6 py-2 w-32 rounded-3xl ",
        confirmButton: "bg-red-500 text-white px-6 py-2 w-32 rounded-3xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`api/books/${bookId}`);
          setBooks(books.filter((book) => book.id !== bookId));
          toast.success("Deleted Successfully");
        } catch (error) {
          toast.error("Error deleting book. Try again later.");
        }
      }
    });
  };

  return (
    <section className="bg-[#edf0f0b9] h-screen">
            {currentRole === "admin" ? (
      <div className="container m-auto ">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-4  ">
            <h3 className="text-xl font-bold">User Administration</h3>
          </div>
          <div className="gap-6">
            <div>
              <div className="bg-white p-2 w-[60%] rounded-lg ml-40 shadow-md cursor-pointer">
                <div className="items-center mb-4 flex flex-col">
                  <p className="mt-4 text-2xl">Add User</p>
                  <form onSubmit={handleSubmit} autoComplete="false" className=" mx-auto mt-4">
                    <div className="mb-4">
                      <label
                        htmlFor="fname"
                        className="text-gray-400 block text-sm mb-2"
                      >
                        First name
                      </label>
                      <div className="flex flex-col">
                        <input
                          id="fname"
                          name="fname"
                          type="text"
                          placeholder="Enter first name"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                            errors.fname ? "border-red-500" : ""
                          }`}
                        />
                        {errors.fname && (
                          <div className="text-red-500 text-sm">
                            {errors.fname}
                          </div>
                        )}
                      </div>

                      <label
                        htmlFor="lname"
                        className="text-gray-400 block text-sm mb-2"
                      >
                        Last name
                      </label>
                      <div className="flex flex-col">
                        <input
                          id="lname"
                          name="lname"
                          type="text"
                          placeholder="Enter last name"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`shadow appearance-none  rounded w-full py-2 px-3   leading-tight focus:outline-none focus:shadow-outline ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                        {errors.lname && (
                          <div className="text-red-500 text-sm">
                            {errors.lname}
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="email"
                        className="text-gray-400 block text-sm mb-2"
                      >
                        Email
                      </label>
                      <div className="flex flex-col">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          placeholder="Enter username/email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                        {errors.email && (
                          <div className="text-red-500 text-sm">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <label
                        htmlFor="email"
                        className="text-gray-400 block text-sm mb-2"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />

                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex  items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <BiHide /> : <BiShow />}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="text-red-500 text-sm">
                          {errors.password}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="mt-4 bg-[#16033a] w-full text-white font-bold py-2 px-4 rounded"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Live Book Status full-width grid */}
          <div className="bg-white p-6 rounded-lg shadow-md ml-20 mr-40 ">
            <div className="flex justify-between items-center mb-6">
              <h3 className=" text-lg font-bold">Users List</h3>
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
                placeholder="Search Product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
            )}

            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    No.
                  </td>

                  <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                    Email
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
                    <td className="py-2 px-4 border-b">{book.author}</td>

                    <td className="py-3 px-4 border-b space-x-2">
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
            ) : (
              <UnauthorizedAccess />
      
            )}
    </section>
  );
};

export { UserAdmin };
export default withAuth(UserAdmin);
