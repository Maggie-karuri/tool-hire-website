// src/ToolCard.js
import React from "react";

const phoneNumber = "254727291734"; // Business WhatsApp number

function ToolCard({ tool }) {
  const handleClick = () => {
    const message = `Hello, I am interested in hiring the ${tool.name}. Please shaare details on pricing and availability.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

 return (
    <div style={{
      border: "2px solid red",
      padding: "10px",
      margin: "10px",
      background: "white"
    }}>
      <img
        src={`/images/${tool.image}`}
        alt={tool.name}
        style={{ width: "100%", height: "120px", objectFit: "contain" }}
      />

      <h3>{tool.name}</h3>
      <p>{tool.description}</p>

      <button onClick={handleClick}>
        TEST BUTTON 💬
      </button>
      </div>
);
}

export default ToolCard;