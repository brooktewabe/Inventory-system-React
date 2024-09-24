import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineUser,AiFillSecurityScan } from "react-icons/ai";

const ValidatedLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:5000/login", {
  //       email,
  //       password,
  //     });

  //     Cookies.set("jwt", response.data.jwt, { expires: 1 });
  //     // Cookies.set("userId", response.data.profileId, { expires: 1 });
  //     localStorage.setItem("role", response.data.role);
  //     localStorage.setItem("uid", response.data.id);

  //     setEmail("");
  //     setPassword("");
  //     navigate("/");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast.error("Invalid email or password");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
      Cookies.set("jwt", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OTA1YzgyLTdlY2MtNDVjZS1hNTMyLTJlYTNlN2YzYzY0NCIsImlhdCI6MTcyNzA4OTAzNSwiZXhwIjoxNzI3MTEwNjM1fQ.jEBzXW8iz1p9X_QIXR04csL2e3elkUn4NPBbNjOA9zs');
      localStorage.setItem("role",'admin');
      navigate("/");
      window.location.reload();

  };
  const validateForm = () => {
    const schema = Yup.object().shape({
      email: Yup.string(),
        // .email("Invalid email address")
        // .required("Email is required"),
      password: Yup.string()
        // .required("Password is required")
        // .min(8, "Password must be at least 8 characters"),
    });

    try {
      schema.validateSync({ email, password }, { abortEarly: false });
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

  return (
    <div className="flex items-center h-screen bg-black ">
      <div className="w-1/2  px-8 mb-4 ml-6 text-white">
        <div className="max-w-sm mx-auto mt-4">
          <p className=" font-bold  text-2xl">Login</p>
          <p className="text-stone-500">Hello - Login to your panel</p>
        </div>
        {errors.login && (
          <div className="text-red-500 text-sm text-center">{errors.login}</div>
        )}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-4">
          <div className="mb-4 ">
            <label htmlFor="email" className="block text-white text-sm mb-2">
              Username
            </label>
            <div className="flex items-center bg-[#a19f9f]">
              <AiOutlineUser size={25} className="mr-4 ml-2" />
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`shadow appearance-none  rounded w-full py-2 px-3 bg-[#494747]  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <label
              htmlFor="password"
              className="block text-white  text-sm mt-6 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="flex items-center bg-[#a19f9f]">
                <AiFillSecurityScan size={25} className="mr-4 ml-2" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={` rounded py-2 px-3 w-full bg-[#494747]  ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-[#131756] hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        {/* <div className="text-center justify-between">
          <span className="text-sm">
            Don&apos;t have an account?
            <Link to="/signup" className="text-blue-400">
              Sign Up
            </Link>
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default ValidatedLoginForm;
