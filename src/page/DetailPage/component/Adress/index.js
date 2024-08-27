import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Importing Font Awesome home icon

const Address = () => {
  const { listJobs } = useSelector((state) => state.jobReducer);
  const { idtype } = useParams();

  // Find the job type by idtype
  const jobType = listJobs.find((job) => job.id === parseInt(idtype, 10));

  if (!jobType)
    return <div className="p-4 text-red-500 text-sm">Job type not found</div>;

  // Breadcrumb items
  const breadcrumbItems = [
    {
      name: jobType.tenLoaiCongViec,
      link: "/jobs",
    },
    {
      name: jobType.tenNhomChiTietLoai,
      link: `/jobs/${idtype}`,
    },
    {
      name: jobType.tenChiTietLoai,
      link: `/jobs/${idtype}/details`,
    },
  ];

  return (
    <div className=" bg-white rounded-lg text-sm">
      <nav className="flex items-center space-x-2">
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <FaHome className="text-xl" />
        </Link>
        <span className="text-gray-500">/</span>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <Link
              to={item.link}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {item.name}
            </Link>
            {index < breadcrumbItems.length - 1 && (
              <span className="text-gray-500">/</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Address;
