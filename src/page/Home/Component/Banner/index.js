import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const { listTypeJobs } = useSelector((state) => state.jobReducer);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    const foundJob = listTypeJobs.find(
      (job) => job.tenLoaiCongViec.toLowerCase() === searchText.toLowerCase()
    );

    if (foundJob) {
      navigate(`/detail/jobs/${foundJob.id}`);
    } else {
      navigate(`/detail/jobs/${searchText}`);
    }
  };
  

  return (
    <div className="relative">
      <div className="absolute top-0 left-28 right-50 bottom-0 flex items-center justify-center">
        <div className="rounded-lg p-5">
          <div className="flex">
            <div className="flex w-16 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
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
              className="bg-white pl-4 text-lg font-semibold outline-0 h-14"
              placeholder=""
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <input
              type="button"
              value="Search"
              className="bg-green-950 h-14 p-4 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-green-800 transition-colors text-lg"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="m-5">
        <img className="object-cover rounded-3xl" alt="" src="./banner.png" />
      </div>
    </div>
  );
};

export default Banner;
