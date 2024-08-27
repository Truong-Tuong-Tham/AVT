import React from "react";

const BannerLogoMaker = () => {
  return (
    <div className="flex m-auto mt-10 rounded-3xl h-[540px] p-10 md:flex-row bg-[#F1D3CE] text-center p-8 w-[1150px]">
      {/* Text Section */}
      <div className="flex-1 flex flex-col p-4 w-1/2">
        <h2 className="text-4xl font-bold mb-4">
          Make an incredible
          <br />
          logo <em className="font-extrabold">in seconds</em>
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Pre-designed by top talent, our collection of templates is
          meticulously crafted to provide you with a perfect starting point.
          These designs come from some of the most creative minds in the
          industry, ensuring high-quality and innovative layouts that are ready
          to use. With an array of customizable options, you have the freedom to
          add your own unique touch and adapt each design to match your personal
          or brand identity. Whether you're aiming to create a visually stunning
          website, an engaging marketing campaign.
        </p>

        <a 
          href="https://www.fiverr.com/logo-maker?source=LOHP_banner"
          target="_blank"
          rel="noopener noreferrer"
          className="relative ms-20 w-[250px] overflow-hidden rounded-lg h-12 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white font-bold px-8 py-3 transition-transform transform group hover:scale-105 hover:shadow-lg flex items-center justify-center"
        >
          <span>Get Started</span>
        </a>
      </div>
      {/* Image Section */}
      <div className="flex-1 flex items-center p-4 w-1/2">
        <img
          alt="Logo Maker"
          src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_460,dpr_1.0/v1/attachments/generic_asset/asset/55292bd34319d97ef4e9fd48d9f8758d-1704795769965/logo-maker-lohp.png"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default BannerLogoMaker;
