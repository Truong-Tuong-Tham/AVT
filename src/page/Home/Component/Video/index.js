import React from "react";

const Video = () => {
  return (
    <div className="relative mt-10 w-[984px] h-[550px] mx-auto rounded-lg overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9?mute=1"
        title="How Fiverr Works"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
