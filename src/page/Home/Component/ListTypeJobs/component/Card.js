import React from "react";
import "./card.css"; // Import the CSS file for styling

const Card = ({ title, description, icon ,onClick}) => {
  return (
    <div  onClick={onClick} className="  w-full">
      <div className="card">
        <div className="icon">{icon}</div>
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
