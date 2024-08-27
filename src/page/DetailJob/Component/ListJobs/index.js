import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const NotFound = () => (
  <div className="not-found text-center mt-10">
    <h2 className="text-3xl font-bold">404 Not Found</h2>
    <p className="text-gray-600">The job you are looking for does not exist.</p>
  </div>
);

const ListJobs = () => {
  const { idjob } = useParams();
  const { menuJobs } = useSelector((state) => state.jobReducer);
  const idjobNumber = Number(idjob);
  const items = menuJobs.find((item) => item.id === idjobNumber);
  const navigate = useNavigate();
  const renderMenuJobs = () => {
    if (!items || !items.dsNhomChiTietLoai) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.dsNhomChiTietLoai.map((group) => (
          <div
            key={group.id}
            className="group-container bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              className="mb-2 rounded-md w-full"
              src={group.hinhAnh}
              alt={group.tenNhom}
            />
            <h2 className="text-lg font-semibold mb-2">{group.tenNhom}</h2>
            <ul className="list-disc pl-5">
              {group.dsChiTietLoai.map((detail) => (
                <li
                  onClick={() => navigate(`/detail/jobs/${items.id}/listjobs/${detail.id}`)}
                  key={detail.id}
                  className="text-gray-700"
                >
                  {detail.tenChiTiet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  if (!items) {
    return <NotFound />;
  }

  return (
    <div className="list-jobs-container p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">{items.tenLoaiCongViec}</h1>
        {renderMenuJobs()}
      </div>
    </div>
  );
};

export default ListJobs;
