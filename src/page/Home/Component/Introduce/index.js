import React from "react";
import './intro.css'
const Introduce = () => {
  return (
    <div className="mt-10 px-4">
  <div className="text-center mb-8">
    <h2 className="font-semibold text-4xl md:text-5xl lg:text-6xl mb-4">
      A whole world of freelance{" "}
      <span className="block">talent at your fingertips</span>
    </h2>
  </div>
  <div className="flex flex-wrap gap-6 justify-center">
    <ul className="flex flex-wrap w-full max-w-7xl mx-auto">
      <li className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
        <div className="icon-container">
          <img
            alt="Over 700 categories"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/categories.72379ee.svg"
            className="w-10 h-10"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">Over 700 categories</h3>
        <p className="text-gray-600 text-center">
          Get results from skilled freelancers from all over the world, for
          every task, at any price point.
        </p>
      </li>
      <li className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
        <div className="icon-container">
          <img
            alt="Clear, transparent pricing"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/handshake.287b5d3.svg"
            className="w-10 h-10"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">Clear, transparent pricing</h3>
        <p className="text-gray-600 text-center">
          Pay per project or by the hour (Pro). Payments only get released
          when you approve.
        </p>
      </li>
      <li className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
        <div className="icon-container">
          <img
            alt="Quality work done faster"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lightning.2cded3f.svg"
            className="w-10 h-10"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">Quality work done faster</h3>
        <p className="text-gray-600 text-center">
          Filter to find the right freelancers quickly and get great work
          delivered in no time, every time.
        </p>
      </li>
      <li className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
        <div className="icon-container">
          <img
            alt="24/7 award-winning support"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/support.660ad7f.svg"
            className="w-10 h-10"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">24/7 award-winning support</h3>
        <p className="text-gray-600 text-center">
          Chat with our team to get your questions answered or resolve any
          issues with your orders.
        </p>
      </li>
    </ul>
  </div>
</div>

  );
};

export default Introduce;
