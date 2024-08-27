import React from "react";
import { useParams } from "react-router-dom";
import PFDetail from "./component/ProFileDetail";
import InFJob from "./component/InfJob";
import HeaderDetail from "../DetailJob/Component/Header";
import ListTypeJobsDetail from "../DetailJob/Component/ListType";

const ProFilePage = () => {
  const { iduser } = useParams();

  console.log("User ID:", iduser);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <HeaderDetail />
      {/* ListTypeJobsDetail Section */}
      <ListTypeJobsDetail />
      {/* Main Content Section */}
      <div className="w-full flex flex-grow">
        {/* Profile Detail Section */}
        <div className="flex-none w-1/4 p-4">
          <div className="h-full">
            <PFDetail iduser={iduser} />
          </div>
        </div>

        {/* Job Info Section */}
        <div className="flex-grow w-3/4 p-4">
          <div className="h-full">
            <InFJob />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProFilePage;
