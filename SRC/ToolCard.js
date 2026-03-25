// src/ToolCard.js
import React from "react";

const phoneNumber = "254727291734"; // Business WhatsApp number

function ToolCard({ tool }) {
  const handleClick = () => {
    const message = `Hello, I am interested in hiring the ${tool.name}. Please send pricing and availability.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="card" onClick={handleClick}>
      <img
        className="tool-image"
        src={`/images/${tool.image}`}
        alt={tool.name}/>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <button className="inquire-btn">  💬 Hire / Get Price</button>
    </div>
  );
}

export default ToolCard;