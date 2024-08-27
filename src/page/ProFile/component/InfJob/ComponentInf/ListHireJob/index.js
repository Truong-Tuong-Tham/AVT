import React, { useState, useEffect } from "react";
import { jobService } from "../../../../../../services/jobService";
import { Rate } from "antd";

const ListHireJobs = () => {
  const [listHire, setListHire] = useState([]);

  const fetchListHire = async () => {
    try {
      const res = await jobService.getListHireJobs();
      setListHire(res.data.content);
    } catch (error) {
      console.error("Error fetching list of hire jobs:", error);
    }
  };

  useEffect(() => {
    fetchListHire();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 border-b-4 border-blue-500 pb-2">
        List of Currently Hired Jobs
      </h1>
      {listHire.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listHire.map((job) => (
            <div
              key={job.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-3 hover:shadow-2xl"
              style={{
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
              }}
            >
              <div className="relative">
                <img
                  alt={job.congViec.tenCongViec}
                  src={job.congViec.hinhAnh}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {job.congViec.tenCongViec}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {job.congViec.moTaNgan}
                </p>
                <div className="flex items-center justify-between">
                  <Rate
                    disabled
                    defaultValue={job.congViec.saoCongViec}
                    className="text-yellow-400 text-sm"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg py-2 text-sm transition duration-200 ease-in-out">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No jobs available for hire.</p>
      )}
    </div>
  );
};

export default ListHireJobs;
