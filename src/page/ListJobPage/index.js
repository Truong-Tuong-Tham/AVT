import React from "react";
import BannerDetailJobs from "../DetailJob/Component/Banner";
import ListCardJobs from "./component/ListCardJobs";

const ListJobsPage = () => {
  return (
    <div className="w-full max-w-[80%] mx-auto overflow-hidden">
      <BannerDetailJobs />
      <ListCardJobs />
    </div>
  );
};

export default ListJobsPage;
