import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { userService } from "../../services/userService";
import { message } from "antd";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const formRegister = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      birthday: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Tên không được để trống"),
      phone: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ"),
      email: yup
        .string()
        .required("Tài khoản không được để trống")
        .email("Tài khoản phải là email"),
      password: yup.string().required("Mật khẩu không được để trống"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu phải khớp")
        .required("Xác nhận mật khẩu không được để trống"),
      birthday: yup.date().required("Ngày sinh không được để trống"),
    }),
    onSubmit: (values) => {
      userService
        .postRegister(values)
        .then(() => {
          navigate("/auth/login");
          message.success("Đăng ký thành công");
        })
        .catch((err) => {
          message.error("Đăng ký thất bại");
          console.error("Registration error: ", err);
        });
    },
  });

  return (
    <div className="h-screen w-screen flex overflow-hidden font-body">
      {/* Left side with image */}
      <div className="relative w-1/2 h-full overflow-hidden">
        <img
          src="https://th.bing.com/th/id/OIG3.dwWboRSQX5Rxv9IPh35p?pid=ImgGn"
          alt="Register Page"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side with registration form */}
      <div className="flex flex-col justify-center items-center w-1/2 h-full bg-gradient-to-br from-yellow-200 via-green-200 to-green-400">
        <form
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4 sm:mx-8 border border-gray-200"
          onSubmit={formRegister.handleSubmit}
        >
          <div className="flex justify-center mb-6">
            <img
              src="https://th.bing.com/th/id/OIG3.UPRrZRmg69BkGs4yhKtj?w=1024&h=1024&rs=1&pid=ImgDetMain"
              alt="Logo"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Đăng Ký Tài Khoản
          </h2>
          {["name", "phone", "email", "password", "confirmPassword", "birthday"].map((field, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={field === "birthday" ? "date" : field === "email" ? "email" : "text"}
                name={field}
                id={field}
                placeholder={`Nhập ${field}`}
                onChange={formRegister.handleChange}
                onBlur={formRegister.handleBlur}
                value={formRegister.values[field]}
              />
              {formRegister.touched[field] && formRegister.errors[field] && (
                <div className="text-red-500 text-xs mt-1">
                  {formRegister.errors[field]}
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col items-center space-y-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Đăng Ký
            </button>
            <NavLink
              to="/auth/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Đã có tài khoản
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
