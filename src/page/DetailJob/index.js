import React, { useEffect } from "react";
import { jobService } from "../../services/jobService";
import { postListTypeJobsDetailAction } from "../../redux/user/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import BannerDetailJobs from "./Component/Banner";
import ListJobs from "./Component/ListJobs";

const DetailJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchListTypeJobsDetail = async () => {
    try {
      const res = await jobService.getTypeJob();
      dispatch(postListTypeJobsDetailAction(res.data.content));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchListTypeJobsDetail();
  }, []);

  return (
    <div className="w-full max-w-[80%] mx-auto overflow-hidden">
      <BannerDetailJobs />
      <ListJobs/>
    </div>
  );
};

export default DetailJob;
