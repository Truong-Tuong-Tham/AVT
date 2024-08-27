import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardJobs = ({ id, idtype, avatar, jobImage, tenCongViec, tenNguoiTao, moTaNgan }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/jobs/detailjob/${idtype}/${id}`);
  };

  return (
    <div
      className="p-5 w-[300px] min-h-[370px] rounded-2xl bg-gray-200 shadow-lg hover:translate-y-[-10px] transition-all duration-400 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={jobImage}
        alt={tenCongViec}
        className="min-h-[170px] bg-gray-300 rounded-xl shadow-inner object-cover"
      />
      <p className="text-lg font-semibold text-blue-700 mt-4 ml-2">{tenCongViec}</p>
      <p className="text-sm text-gray-800 mt-3 ml-2">{moTaNgan}</p>
      <div className="flex items-center mt-7 ml-2">
        <img
          src={avatar}
          alt={tenNguoiTao}
          className="w-8 h-8 rounded-full"
        />
        <p className="text-xs text-gray-500 ml-2">
          Người tạo: <span className="font-bold">{tenNguoiTao}</span>
        </p>
      </div>
    </div>
  );
};

export default CardJobs;
