import React, { useRef, useState } from "react";
import "./CarouselVideo.css";
import { Carousel as AntCarousel } from "antd";
import { useSelector } from "react-redux";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const videoData = [
  {
    src: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg",
    videoSrc:
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi",
    title: "Brighid Gannon (DNP, PMHNP-BC), Co-Founder",
    quote:
      "We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world. The level of service and professionalism we received exceeded our expectations. Fiverr's platform allowed us to connect with talented freelancers who understood our vision and executed it flawlessly. We couldn’t have achieved our goals without their support.",
  },
  {
    src: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg",
    videoSrc:
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw",
    title: "Sarah Michaels, Project Manager",
    quote:
      "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working. This global reach allows us to operate round-the-clock and stay ahead of the competition. The quality of work and the diversity of skills available are unparalleled, making it a go-to platform for all our project needs.",
  },
  {
    src: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg",
    videoSrc:
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun",
    title: "Duke De Laet, Founder & CEO",
    quote:
      "Fiverr provided us with exceptional support and top-notch services to enhance our business growth. The ability to find specialized skills on demand was a game-changer for us. From creative design to technical expertise, the freelancers we worked with delivered high-quality results that significantly impacted our brand's success. The flexibility and efficiency of Fiverr’s platform have become integral to our operations.",
  },
  {
    src: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg",
    videoSrc:
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl",
    title: "Caitlin Tormey, Chief Commercial Officer",
    quote:
      "Fiverr has been instrumental in our growth. Their diverse talent pool has allowed us to scale quickly and efficiently, without compromising on quality. The platform has been a vital resource for our marketing campaigns, providing us with creative professionals who bring fresh ideas and innovative strategies. Thanks to Fiverr, we’ve been able to execute our projects with precision and achieve remarkable results.",
  },
];

const CarouselVideo = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);


  const handlePlayClick = (videoSrc) => {
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="w-full mt-10 carousel-container">
      <h1 class="text-3xl font-bold text-center text-gray-800 my-4">
        What they're saying about Fiverr
      </h1>

      <AntCarousel>
        {videoData.map((video, index) => (
          <div key={index}>
            <div className="relative w-full flex">
              <div className="w-2/5 relative flex items-center justify-center">
                <img
                  src={video.src}
                  alt={`Hình ảnh teaser video ${index + 1}`}
                  className={`w-full h-auto object-cover rounded-lg ${
                    isModalOpen && currentVideo === video.videoSrc
                      ? "opacity-50"
                      : ""
                  }`}
                />
                {!isModalOpen && (
                  <button
                    onClick={() => handlePlayClick(video.videoSrc)}
                    className="play-button"
                  >
                    <img
                      src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/desktop-play-button.bab1740.png"
                      alt="Play Button"
                    />
                  </button>
                )}
              </div>

              {/* Title and Content */}
              <div className="w-3/5 flex items-center p-4">
                <div className="text-content">
                  <h5 className="text-xl text-gray-600 text-start font-semibold mb-2">
                    {video.title}
                    <span className="testimonial-logo ml-2">
                      <img
                        alt="Company logo"
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lavender-logo-x2.3fff9e7.png"
                        loading="lazy"
                        className="inline-block h-6"
                      />
                    </span>
                  </h5>
                  <blockquote className="title-content text-green-900">
                    "{video.quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        ))}
      </AntCarousel>

      {/* Modal for Video */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative w-full max-w-4xl p-4 bg-white rounded-lg">
            <video
              ref={videoRef}
              className="w-full h-auto rounded-lg shadow-lg"
              controls
              autoPlay
              src={currentVideo}
              type="video/mp4"
            >
              Your browser does not support the video tag.
            </video>
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 bg-white p-2 rounded-full"
            >
              <svg
                className="w-8 h-8 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselVideo;
