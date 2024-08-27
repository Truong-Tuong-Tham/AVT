import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";

const AdminTemPlate = () => {
  const { infoUser } = useSelector((state) => state.userReducer);
  const {iduser}=useParams();
  const navigate = useNavigate();
  console.log("iduser",iduser);
  useEffect(() => {
    // userInfo (redux) có dữ liệu => true => đã đăng nhập
    if (infoUser===null)  {
      console.log('userInfo: ', infoUser );

      navigate('/');
    }
  }, []);
  return (
    <div className="flex min-h-screen">
      {/* Dashboard Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="UserManagement"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-white hover:text-yellow-300"
              }
            >
              Quản lý người dùng
            </NavLink>
          </li>
          <li>
            <NavLink
              to="JobManagement"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-white hover:text-yellow-300"
              }
            >
              Quản lý công việc
            </NavLink>
          </li>
          <li>
            <NavLink
              to="JobTypeManagement"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-white hover:text-yellow-300"
              }
            >
              Quản lý loại công việc
            </NavLink>
          </li>
          <li>
            <NavLink
              to="ServiceManagement"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-white hover:text-yellow-300"
              }
            >
              Quản lý dịch vụ
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-4/5 bg-white p-8">
        <Outlet  />
      </div>
    </div>
  );
};

export default AdminTemPlate;
