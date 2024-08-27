// ListTypeJobs.js
import React, { useEffect, useState } from "react";
import Card from "./component/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postListTypeJobsAction } from "../../../../redux/user/jobSlice";
import { jobService } from "../../../../services/jobService";
import { Carousel } from "antd"; // Import Carousel from Ant Design
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Import icons from Ant Design

// Custom Arrow Components
const CustomLeftArrow = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className="absolute left-0 transform -translate-y-1/2 top-1/2 z-10 bg-white text-gray-600 rounded-full p-2 shadow-lg hover:bg-gray-200 focus:outline-none"
  >
    <LeftOutlined className="text-lg" />
  </button>
);

const CustomRightArrow = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className="absolute right-0 transform -translate-y-1/2 top-1/2 z-10 bg-white text-gray-600 rounded-full p-2 shadow-lg hover:bg-gray-200 focus:outline-none"
  >
    <RightOutlined className="text-lg" />
  </button>
);

const ListTypeJobs = () => {
  const [listTypeJobs, setListTypeJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchListTypeJobs = async () => {
    try {
      const res = await jobService.getTypeJob();
      setListTypeJobs(res.data.content);
      dispatch(postListTypeJobsAction(res.data.content));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchListTypeJobs();
  }, []);

  const icons = [
    // existing icons
    <svg height="38px" width="38px" viewBox="0 0 471.701 471.701" xmlSpace="preserve">
      <g>
        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z"></path>
      </g>
    </svg>,
    <svg height="38px" width="38px" viewBox="0 0 1024 1024" fill="#000000">
      <g>
        <path d="M923.6 701.2C945.3 678 960 648.8 960 615c0-50.7-32.9-94-78.3-109.8 3.5-12.8 5.3-26.3 5.3-40.2 0-88.2-71.8-160-160-160H512V160c0-53-43-96-96-96h-64c-53 0-96 43-96 96v256H96c-53 0-96 43-96 96v64c0 53 43 96 96 96h160v64H160c-53 0-96 43-96 96v64c0 53 43 96 96 96h704c53 0 96-43 96-96v-64c0-53-43-96-96-96H768v-64h160c19.6 0 38.2-4.9 54.6-13.6z"></path>
      </g>
    </svg>,
    <svg height="38px" width="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fillRule="evenodd" clipRule="evenodd" d="M6 19H4V7H2V5h3.6L7 4h10l1.4 1H22v2h-2v12h-2V7H6v12zm4-4h4v2h-4v-2z"></path>
      </g>
    </svg>,
    <svg height="38px" width="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.9 5.9L21 9.3l-4.6 4.5 1.1 6.4-5.5-2.9-5.5 2.9 1.1-6.4L3 9.3l6.1-1.4L12 2z" fill="#FFD700"/>
    </svg>,
    <svg height="38px" width="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF6347"/>
    </svg>,
    <svg height="38px" width="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16v2H4zm0 4h16v12H4zm2 2v8h12v-8H6z" fill="#4682B4"/>
    </svg>,
    <svg height="38px" width="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2v2h16V2h2v4H2V2h2zm16 18H4v-14h16v14zm2-16h-20v-2h2v2h16v-2h2v2z" fill="#32CD32"/>
    </svg>,
  ];
  
  return (
    <div className="ms-14 px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold mb-4 custom-heading">
          Explore Job Types
        </h2>
      </div>

      <Carousel
        arrows
        slidesToShow={4} // Show 4 cards at once
        dots={false} // Disable the dots
        prevArrow={<CustomLeftArrow />}
        nextArrow={<CustomRightArrow />}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2, // Show 2 cards at once on smaller screens
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1, // Show 1 card at once on even smaller screens
            },
          },
        ]}
      >
        {listTypeJobs?.map((jobType, index) => (
          <Card
            key={jobType.id}
            title={jobType.tenLoaiCongViec}
            description={"Select the job you want to search for."}
            icon={icons[index % icons.length]}
            onClick={() => navigate(`/detail/jobs/${jobType.id}`)} // Navigate to the job detail page
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ListTypeJobs;
