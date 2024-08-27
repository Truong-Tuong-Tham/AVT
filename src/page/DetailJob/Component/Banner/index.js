import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BannerDetailJobs = () => {
  const { idjob } = useParams();
  const { menuJobs } = useSelector((state) => state.jobReducer);
  const idjobNumber = Number(idjob);

  // List of banner image URLs
  const bannerImages = [
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/67119574fcb6178f7b270ef6e50d2ff5-1689143601915/Programming%20_%20Tech-%20desktop.png",
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/6de5a002b40043ab739b6382daf94e37-1688626851418/W_T-%20Desktop%20banner.png",
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/509f310d48d17eafe768a87f78d10af8-1688626459703/G_D-%20Desktop%20banner.png",
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/0426b6ab656cedb4697336a530541d50-1688626333573/Digital%20Marketing-%20Desktop%20banner.png",
  ];

  // Function to select a random image from the list
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * bannerImages.length);
    return bannerImages[randomIndex];
  };

  // Select a random image
  const randomBannerImage = getRandomImage();

  // Find the job type by idjob
  const currentJob = menuJobs.find((job) => job.id === idjobNumber);

  return (
    <div className="w-[90%] m-auto h-full ">
      <div className="relative  p-8  ">
        <img
          className=" rounded-3xl object-cover"
          src={randomBannerImage}
          alt="Banner"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-white text-4xl font-bold">
            {currentJob ? currentJob.tenLoaiCongViec : "Job Type Not Found"}
          </h1>
          <h2 className="text-white text-2xl">
            {currentJob
              ? `Explore the best opportunities in ${currentJob.tenLoaiCongViec}`
              : "Discover a world of possibilities"}
          </h2>
          <button className="mt-4 px-6 py-3 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            Learn More
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default BannerDetailJobs;
