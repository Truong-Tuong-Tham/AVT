import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu, Avatar } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  postLogOutAction,

} from "../../../redux/user/userSlice";
import "./Header.css";


const HeaderPage = () => {
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.userReducer);
  console.log("infoUser", infoUser);
  // Menu items for "Fiverr Pro" dropdown


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

  // Menu items for "Explore" dropdown
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

  // Menu for avatar dropdown when user is logged in
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
          to={`/profile/${infoUser?.user?.id || ''}`}
          className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        >
          Profile
        </NavLink>
      </Menu.Item>
  
      {infoUser?.user?.role === "ADMIN" && (
        <Menu.Item>
          <NavLink
            to={`/admin/${infoUser?.user?.id || ''}`}
            className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Admin Page
          </NavLink>
        </Menu.Item>
      )}
  
      <Menu.Item key="2" onClick={() => dispatch(postLogOutAction())}>
        <div className="flex items-center space-x-2">
          <LogoutOutlined />
          <span>Log Out</span>
        </div>
      </Menu.Item>
    </Menu>
  );
  
  return (
    <header className="bg-white text-gray-900 py-4 px-8 w-full flex items-center justify-between shadow-md font-poppins border-b border-gray-300 overflow-x-hidden">
      <div className="flex items-center">
        <NavLink
          to="/"
          className="text-gray-900 text-4xl font-extrabold flex items-center space-x-3 hover:text-gray-600 transition duration-300 ease-in-out"
        >
          <img
            src="https://th.bing.com/th/id/OIG3.UPRrZRmg69BkGs4yhKtj?w=1024&h=1024&rs=1&pid=ImgDetMain"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
          <span className="text-3xl">Fiverr</span>
        </NavLink>
      </div>

      <div className="flex items-center space-x-8">
        {infoUser ? (
          <div className="flex items-center space-x-4 sm:space-x-6">
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
                src={infoUser?.user?.avatar || "https://th.bing.com/th/id/OIG3.UPRrZRmg69BkGs4yhKtj?w=1024&h=1024&rs=1&pid=ImgDetMain"}
              />
            </Dropdown>
          </div>
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
            <NavLink to="/auth/register" className="custom-navlink  ">
              Sign In
              <div className="animation"></div>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderPage;
