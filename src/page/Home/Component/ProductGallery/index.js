import React from "react";
import { Image } from "antd"; // Import Image component from Ant Design
import "antd/dist/reset.css"; // Import Ant Design CSS

const images = [
  {
    url: "https://images.pexels.com/photos/2086361/pexels-photo-2086361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Mountain View",
    description: "A stunning view of the mountains during sunset.",
  },
  {
    url: "https://images.pexels.com/photos/587958/pexels-photo-587958.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Forest Path",
    description: "A serene path through a lush green forest.",
  },
  {
    url: "https://images.pexels.com/photos/19780199/pexels-photo-19780199/free-photo-of-phong-c-nh-cay-nui-s-phat-tri-n.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    title: "Sunny Landscape",
    description: "A beautiful landscape with vibrant greenery.",
  },
  {
    url: "https://images.pexels.com/photos/19780143/pexels-photo-19780143/free-photo-of-thien-nhien-r-ng-s-ng-mu-th-ng-xanh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    title: "Green Meadows",
    description: "A peaceful meadow with lush green grass.",
  },
  {
    url: "https://images.pexels.com/photos/2981629/pexels-photo-2981629.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Beach Sunset",
    description: "A stunning sunset over a tranquil beach.",
  },
  {
    url: "https://images.pexels.com/photos/3664396/pexels-photo-3664396.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Snowy Peaks",
    description: "Snow-capped mountains under a clear blue sky.",
  },
  {
    url: "https://images.pexels.com/photos/5908250/pexels-photo-5908250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "City Lights",
    description: "A vibrant cityscape at night with dazzling lights.",
  },
  {
    url: "https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Calm Lake",
    description: "A serene lake surrounded by lush greenery.",
  },
  {
    url: "https://images.pexels.com/photos/1293260/pexels-photo-1293260.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Desert Dunes",
    description: "Golden dunes stretching across a vast desert.",
  },
  {
    url: "https://images.pexels.com/photos/4065897/pexels-photo-4065897.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Foggy Forest",
    description: "A misty forest with trees shrouded in fog.",
  },
  {
    url: "https://images.pexels.com/photos/4559530/pexels-photo-4559530.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Autumn Leaves",
    description: "Colorful autumn leaves covering the ground.",
  },
  {
    url: "https://images.pexels.com/photos/6476595/pexels-photo-6476595.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "River Rapids",
    description: "Raging rapids flowing through a lush green landscape.",
  },
];

const ProductGallery = () => {
  return (
    <div className="p-8 mt-14">
      <h2 className="text-5xl font-extrabold text-center mb-8 text-gray-900 leading-tight">
        Featured Products
      </h2>
      <p className="text-2xl text-gray-600 text-center mb-16 leading-relaxed">
        Made on Fiverr
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden h-[300px] rounded-lg shadow-lg bg-gray-900 text-white"
          >
            {/* Image */}
            <Image
              src={image.url}
              alt={`Product ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              preview={false}
              placeholder={<div className="w-full h-full bg-gray-300"></div>}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-10">
                <span className="text-2xl font-bold">{image.title}</span>
                <p className="mt-2">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
