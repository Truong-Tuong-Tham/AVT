import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Menu, Avatar } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { postLogOutAction } from "../../../../redux/user/userSlice";
import "../../../../page/Component/HeaderPage/Header.css";

const SearchIcon = () => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="pointer-events-none absolute w-5 fill-gray-500 transition"
  >
    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
  </svg>
);

const HeaderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idjob } = useParams();
  const { listTypeJobsDetail } = useSelector((state) => state.jobReducer);
  const { infoUser } = useSelector((state) => state.userReducer);
console.log("infoUserHD",infoUser)
  const [inputValue, setInputValue] = useState("");

  const idjobNumber = Number(idjob);
  const findName = listTypeJobsDetail.find((job) => job.id === idjobNumber);

  useEffect(() => {
    if (findName) {
      setInputValue(findName.tenLoaiCongViec || "");
    }
  }, [findName]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    const foundJob = listTypeJobsDetail.find(
      (job) => job.tenLoaiCongViec === inputValue
    );
    if (foundJob) {
      navigate(`/detail/jobs/${foundJob.id}`);
    } else {
      navigate(`/detail/jobs/${inputValue}`);
    }
  };

  const userMenu = (
    <Menu className="p-4 bg-white shadow-lg rounded-lg">
      <Menu.Item key="1">
        <div className="flex items-center space-x-2">
          <UserOutlined />
          <span>{infoUser?.user?.name || "Guest"}</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <NavLink
          to={`/profile/${infoUser?.user?.id}`}
          className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        >
          Profile
        </NavLink>
      </Menu.Item>
      
      {infoUser?.user?.role === "ADMIN" && (
        <Menu.Item>
          <NavLink
            to=  {`/admin/${infoUser?.user?.id}`}
            className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Admin Page
          </NavLink>
        </Menu.Item>
      )}
  
      <Menu.Item key="2" onClick={() => dispatch(postLogOutAction())}>
        <div className="flex items-center space-x-2">
         
          <span>Log Out</span>
        </div>
      </Menu.Item>
    </Menu>
  );
  
  const fiverrProMenu = (
    <Menu className="p-4 bg-white shadow-lg rounded-lg">
      <Menu.Item>
        <a
          href="https://pro.fiverr.com?source=header_pop_up"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
        >
          <div className="font-semibold">I'm looking to hire</div>
          <div className="text-sm text-gray-600">
            My team needs vetted freelance talent and a premium business
            solution.
          </div>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          href="https://www.fiverr.com/cp/pro-freelancers?source=header_pop_up"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
        >
          <div className="font-semibold">I want to offer Pro services</div>
          <div className="text-sm text-gray-600">
            I’d like to work on business projects as a Pro freelancer or agency.
          </div>
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a
          href="https://www.fiverr.com/pro/categories"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
        >
          <div className="font-semibold">Explore Pro Categories</div>
          <div className="text-sm text-gray-600">
            Browse the categories of Pro services available.
          </div>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          href="https://www.fiverr.com/pro/success-stories"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
        >
          <div className="font-semibold">Success Stories</div>
          <div className="text-sm text-gray-600">
            Read about successful projects on Fiverr Pro.
          </div>
        </a>
      </Menu.Item>
    </Menu>
  );

  const exploreMenu = (
    <Menu className="p-4 bg-white shadow-lg rounded-lg">
      <Menu.Item>
        <a
          href="https://discover.fiverr.com/?source=explore-tab"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
        >
          <div className="font-semibold">Discover</div>
          <div className="text-sm text-gray-600">
            Inspiring projects made on Fiverr.
          </div>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          href="https://www.fiverr.com/guides?source=explore-tab"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
        >
          <div className="font-semibold">Guides</div>
          <div className="text-sm text-gray-600">
            Learn how to succeed on Fiverr.
          </div>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          href="https://www.fiverr.com/blog?source=explore-tab"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
        >
          <div className="font-semibold">Blog</div>
          <div className="text-sm text-gray-600">
            Read the latest stories and tips from the Fiverr community.
          </div>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          href="https://www.fiverr.com/reviews?source=explore-tab"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
        >
          <div className="font-semibold">Reviews</div>
          <div className="text-sm text-gray-600">
            See what clients are saying about Fiverr services.
          </div>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="h-full w-full p-5">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-[350px] relative">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-8 fill-gray-500 transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="flex-1  rounded-tr-lg rounded-br-lg border border-gray-200 px-4 py-2 outline-none w-full "
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search jobs..."
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 flex items-center justify-center px-4 py-2 text-white bg-green-950 rounded-tr-lg rounded-br-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {infoUser ? (
            <>
              <Dropdown overlay={fiverrProMenu} trigger={["hover"]}>
                <a className="custom-dropdown flex items-center space-x-2 cursor-pointer">
                  <span>Fiverr Pro</span>
                  <DownOutlined />
                </a>
              </Dropdown>

              <Dropdown overlay={exploreMenu} trigger={["hover"]}>
                <a className="custom-dropdown flex items-center space-x-2 cursor-pointer">
                  <span>Explore</span>
                  <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown overlay={userMenu} trigger={["hover"]}>
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  className="cursor-pointer"
                  src={infoUser.avatar}
                />
              </Dropdown>
            </>
          ) : (
            <>
              <Dropdown overlay={fiverrProMenu} trigger={["hover"]}>
                <a className="custom-dropdown flex items-center space-x-2 cursor-pointer">
                  <span>Fiverr Pro</span>
                  <DownOutlined />
                </a>
              </Dropdown>

              <Dropdown overlay={exploreMenu} trigger={["hover"]}>
                <a className="custom-dropdown flex items-center space-x-2 cursor-pointer">
                  <span>Explore</span>
                  <DownOutlined />
                </a>
              </Dropdown>

              <NavLink to="/auth/login" className="btn text-gray-900">
                Join
                <div className="animation"></div>
              </NavLink>
              <NavLink to="/auth/register" className="custom-navlink">
                Sign In
                <div className="animation"></div>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderDetail;
