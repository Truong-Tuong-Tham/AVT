import React from "react";
import HeaderPage from "../Component/HeaderPage";
import Banner from "./Component/Banner";
import ListTypeJobs from "./Component/ListTypeJobs";
import Introduce from "./Component/Introduce";
import Video from "./Component/Video";
import BannerFiverrPro from "./Component/BannerFiverrPro";
import CarouselVideo from "./Component/CarouselVideo";
import BannerLogoMaker from "./Component/BannerLogoMaker";
import ProductGallery from "./Component/ProductGallery";

const HomePage = () => {
  return (
    <div className="w-full" >
      <Banner />
      <ListTypeJobs  />
      <Introduce/>
      <Video/>
      <BannerFiverrPro/>
      <CarouselVideo/>
      <BannerLogoMaker/>
      <ProductGallery/>
    </div>
  );
};

export default HomePage;
