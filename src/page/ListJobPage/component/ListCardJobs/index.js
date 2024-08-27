import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";
import CardJobs from "./component/card";
import { useDispatch } from "react-redux";
import { postListJobs } from "../../../../redux/user/jobSlice";

const ListCardJobs = () => {
  const { idtype } = useParams();
  const [jobs, setJobs] = useState([]);
const dispatch = useDispatch();
  const fetchListJobs = async () => {
    try {
      const res = await jobService.getJobWithID(idtype);
      setJobs(res.data.content);
      dispatch(postListJobs(res.data.content));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchListJobs();
  }, [idtype]);
  console.log("s", jobs);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {jobs.map((job) => (
        <CardJobs
          key={job.id}
          id={job.congViec.id}
          idtype={idtype} // Pass idtype here
          avatar={job.avatar}
          jobImage={job.congViec.hinhAnh}
          tenCongViec={job.congViec.tenCongViec}
          tenNguoiTao={job.tenNguoiTao}
          moTaNgan={job.congViec.moTaNgan}
        />
      ))}
    </div>
  );
};

export default ListCardJobs;
