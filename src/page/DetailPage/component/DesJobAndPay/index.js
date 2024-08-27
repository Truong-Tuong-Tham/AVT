import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import star icon for ratings
import { Collapse } from "antd";
import { jobService } from "../../../../services/jobService";
import Comment from "./component/Comment";

const { Panel } = Collapse;

const DesJobAndPay = () => {
  const [ListHireJob,setListHireJob]=useState();
  console.log("ListHireJob",ListHireJob);
  const { listJobs } = useSelector((state) => state.jobReducer);
  console.log("listJobs", listJobs);
  const { idtype, idjob } = useParams();
  console.log("idtype, idjob", idtype, idjob);
  const { infoUser } = useSelector((state) => state.userReducer);
  console.log("infoUser", infoUser);
  const navigate = useNavigate();
  const fetchListHireJobs = async () => {
    try {
      const res = await jobService.getListHireJobs(idtype);
      setListHireJob(res.data.content);
      console.log( "jobs",res.data.content);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchListHireJobs();
  },[])
const handleHireClick = async () => {
  if (!infoUser) {
    navigate("/auth/login");
    return;
  }

  if (!ListHireJob || ListHireJob.length === 0) {
    console.error("ListHireJob is empty or undefined");
    return;
  }

  const jobAlreadyHired = ListHireJob.some(
    (job) => job.congViec.id === jobType.id
  );

  if (jobAlreadyHired) {
    alert("This job has already been hired.");
    return;
  }

  const currentDate = new Date().toISOString(); // Getting the current date in ISO format
  const hireJobData = {
    maCongViec: jobType.id,
    maNguoiThue: infoUser.user.id,
    ngayThue: currentDate,
    hoanThanh: false,
  };

  try {
    const response = await jobService.postHireJob(hireJobData);
    console.log("Hire action successful:", response);
    // Optionally, you might want to update the list or show a success message to the user
    fetchListHireJobs();
  } catch (error) {
    console.error("Hire action failed:", error);
  }
};

  // Find the job type by idtype
  const jobType = listJobs.find((job) => job.id === parseInt(idtype, 10));

  if (!jobType) return <div className="p-4 text-red-500">Job not found</div>;
  console.log("jobtype", jobType);
  const { congViec, tenNguoiTao, avatar } = jobType;
  const {
    saoCongViec,
    danhGia,
    hinhAnh,
    moTa,
    tenCongViec,
    moTaNgan,
    giaTien,
  } = congViec;
 
  // Split the short description at line breaks and add a bullet point at the start of each line
  const formattedMoTaNgan = moTaNgan
    .split("\r\n")
    .filter((line) => line.trim() !== "") // Filter out any empty lines
    .map((line, index) => {
      const truncatedLine = line.length > 30 ? `${line.slice(0, 30)}...` : line; // Truncate if necessary
      return (
        <p key={index} className="flex items-center text-gray-700">
          <span className="mr-2">•</span>
          {truncatedLine}
        </p>
      );
    });
 


  return (
    <div className="w-full flex justify-center p-6">
      <div className="bg-white w-full md:w-3/5 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="p-6 flex-1 flex flex-col bg-gray-50 rounded-lg shadow-lg">
          <img
            src={hinhAnh}
            alt={tenCongViec}
            className="w-full h-64 object-cover md:w-1/2 md:h-auto"
          />
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            {tenCongViec}
          </h2>
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={avatar}
              alt={tenNguoiTao}
              className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg"
            />
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {tenNguoiTao}
              </h3>
              <div className="flex items-center mb-2">
                {[...Array(saoCongViec)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400 text-xl" />
                ))}
                {[...Array(5 - saoCongViec)].map((_, index) => (
                  <FaStar
                    key={index + saoCongViec}
                    className="text-gray-300 text-xl"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{danhGia} reviews</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              Description
            </h4>
            <p className="text-gray-700 leading-relaxed">{moTa}</p>
          </div>
        </div>
        <div className="flex items-center mx-auto my-8 p-4 w-80 h-32 bg-white rounded-lg shadow-xl">
          <section className="flex justify-center items-center w-16 h-16 rounded-full bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] transform hover:scale-105 transition-transform duration-300">
            <img
              src={avatar}
              alt={tenNguoiTao}
              className="w-14 h-14 rounded-full border-2 border-gray-300"
            />
          </section>

          <section className="flex-1 flex flex-col justify-center border-l border-gray-300 pl-4">
            <h3 className="text-gray-700 font-semibold text-base mb-1">
              {tenNguoiTao}
            </h3>
            <h4 className="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold mb-2">
              Web Developer
            </h4>
            <div className="flex gap-3">
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-blue-500 hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-red-500 hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-green-500 hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-purple-500 hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
              </svg>
            </div>
          </section>
        </div>

        <div className="container mx-auto p-4 max-w-2xl">
          <h1 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions (FAQ)
          </h1>
          <Collapse defaultActiveKey={["1"]} className="space-y-3">
            <Panel header="Question 1: How do I create an account?" key="1">
              <p className="text-gray-600">
                To create an account, click the "Sign Up" button and fill in the
                required information.
              </p>
            </Panel>
            <Panel header="Question 2: Can I change my password?" key="2">
              <p className="text-gray-600">
                Yes, you can change your password from the account settings
                page.
              </p>
            </Panel>
            <Panel
              header="Question 3: How do I contact customer support?"
              key="3"
            >
              <p className="text-gray-600">
                You can contact customer support through the "Contact Us" page
                or email us at support@example.com.
              </p>
            </Panel>
            <Panel header="Question 4: Can I delete my account?" key="4">
              <p className="text-gray-600">
                Yes, you can delete your account from the account settings page.
                Please make sure to back up any important data before deleting
                your account.
              </p>
            </Panel>
          </Collapse>
        </div>
        <Comment idtype={idtype}/>
      </div>
      <div className="w-full md:w-2/5 p-6  bg-white rounded-xl shadow-lg">
        <div className="w-full h-auto bg-gray-100 rounded-xl p-8 flex flex-col items-center text-center sticky top-0 z-10">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
            <i className="fas fa-file-alt text-yellow-600"></i> Summary
          </h3>
          <h2 className="text-2xl font-medium text-gray-700 mb-2">
            <i className="fas fa-graduation-cap text-yellow-500"></i> Cum Laude{" "}
            <span className="text-yellow-600">${giaTien}</span>
          </h2>
          <div className="text-gray-600 mb-8">
            <p className="text-lg leading-relaxed">
              <i className="fas fa-search text-gray-800"></i>{" "}
              <span className="font-semibold text-gray-800">Discover:</span>{" "}
              {formattedMoTaNgan}
            </p>
            <ul className="mt-4 text-sm text-gray-500 italic list-none space-y-2">
              <li>
                <i className="fas fa-circle text-yellow-500"></i> 40+
                Personalized Growth Strategies
              </li>
              <li>
                <i className="fas fa-circle text-yellow-500"></i> Hashtag &
                Optimization Guide
              </li>
              <li>
                <i className="fas fa-circle text-yellow-500"></i> News List,
                Tools & Resources
              </li>
            </ul>
          </div>
          <button
            onClick={handleHireClick}
            className="w-full bg-yellow-500 text-white font-bold py-3 rounded-xl hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-300"
          >
            <i className="fas fa-arrow-right"></i> Continue (${giaTien})
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesJobAndPay;
