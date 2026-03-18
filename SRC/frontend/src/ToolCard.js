// src/ToolCard.js
import React from "react";

const phoneNumber = "254727291734"; // Business WhatsApp number

function ToolCard({ tool }) {
  const handleClick = () => {
    const message = `Hello, I am interested in hiring the ${tool.name}. Please provide more details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="card" onClick={handleClick}>
      <img className="tool-image" src={tool.image} alt={tool.name} />
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <span className="price">{tool.price}</span>
    </div>
  );
}

export default ToolCard;