import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { postLoginAction } from "../../redux/user/userSlice";
import { message } from "antd";
import { userService } from "../../services/userService";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Image carousel data
  const images = [
    "https://th.bing.com/th/id/OIG3.PrGJEKj1AlUsr4AqR8m0?w=1024&h=1024&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIG2.idX4QS4APwLBnd9k4c3d?pid=ImgGn",
    "https://th.bing.com/th/id/OIG2.v.aIQxZZbCRTcZ0dxFQS?pid=ImgGn",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  // Formik setup for login form
  const formik = useFormik({
    initialValues: {
     
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      password: yup.string().required("Mật khẩu không được để trống"),
    }),
    onSubmit: (values) => {
      userService.postLogin(values)
        .then((res) => {
          console.log(res);
          navigate("/");
          message.success("Đăng nhập thành công");
          dispatch(postLoginAction(res.data.content));
        })
        .catch((err) => {
          message.error("Đăng nhập thất bại");
          console.error(err);
        });
    },
  });

  return (
    <div className="h-screen w-screen flex font-body">
      <div className="relative w-1/2 h-screen overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đăng nhập
          </button>
          <div className="mt-4 text-center">
            <NavLink to="/auth/register" className="text-blue-500 hover:underline">
              Chưa có tài khoản? Đăng ký
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
