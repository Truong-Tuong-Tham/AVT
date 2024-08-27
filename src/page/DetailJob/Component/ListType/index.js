import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMenujobsAction } from "../../../../redux/user/jobSlice";
import { jobService } from "../../../../services/jobService";
import { Dropdown, Button, Menu } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ListTypeJobsDetail = () => {
  const { idjob } = useParams();
  console.log("idjob", idjob);
  const dispatch = useDispatch();
  const { menuJobs } = useSelector((state) => state.jobReducer);
  console.log(menuJobs);
  const navigate = useNavigate();

  const fetchMenuJobs = async () => {
    try {
      const res = await jobService.getMenuJob();
      dispatch(postMenujobsAction(res.data.content));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const renderMenu = (dsNhomChiTietLoai, itemId) => (
    <Menu>
      {dsNhomChiTietLoai.map((nhom) => (
        <React.Fragment key={`group-${nhom.id}`}>
          <Menu.Item>
            <span
              onClick={() =>
                navigate(`/detail/jobs/${itemId}/listjobs/${nhom.id}`)
              }
              className="font-semibold"
            >
              {nhom.tenNhom}
            </span>
          </Menu.Item>
          {nhom.dsChiTietLoai.map((chiTiet) => (
            <Menu.Item key={chiTiet.id}>
              <span
                onClick={() =>
                  navigate(`/detail/jobs/${itemId}/listjobs/${chiTiet.id}`)
                }
                className="pl-4 font-light"
              >
                {chiTiet.tenChiTiet}
              </span>
            </Menu.Item>
          ))}
          <Menu.Divider />
        </React.Fragment>
      ))}
    </Menu>
  );

  const renderMenuJobs = () => {
    if (menuJobs) {
      return menuJobs.map((item) => (
        <li
          key={item.id}
          className="rounded-lg shadow-lg bg-white p-4 m-2 flex items-center justify-center duration-300"
        >
          <Dropdown
            overlay={renderMenu(item.dsNhomChiTietLoai, item.id)}
            placement="bottomCenter"
          >
            <Button className="w-full text-black border-none hover:bg-gray-800">
              <NavLink to={`/detail/jobs/${item.id}`} className="text-white">
                {item.tenLoaiCongViec}
              </NavLink>
            </Button>
          </Dropdown>
        </li>
      ));
    }
    return null;
  };

  useEffect(() => {
    fetchMenuJobs();
  }, []);

  return (
    <div className="flex justify-center py-10 bg-white">
      <ul
        className="flex flex-nowrap overflow-x-auto w-full max-w-7xl mx-auto space-x-4"
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
      >
        {renderMenuJobs()}
      </ul>
      {/* Hide scrollbar for WebKit browsers */}
      <style jsx>{`
        ul::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ListTypeJobsDetail;
