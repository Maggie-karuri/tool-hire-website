import React from "react";

const phoneNumber = "254727291734"; // no + sign

function ToolCard({ tool }) {
  const message = `Hello, I am interested in hiring the ${tool.name}. Please share details on pricing and availability.`;
  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const callURL = `tel:+${phoneNumber}`;

  return (
    <div style={{
      border: "orange",
      padding: "10px",
      margin: "10px",
      background: "white"
    }}>
        <img
        src={tool.image}
        alt={tool.name}
        style={{ width: "100%", height: "120px", objectFit: "contain" }}
      />

      <h3>{tool.name}</h3>
      <p>{tool.description}</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        
        {/* WhatsApp Button */}
        <button
          onClick={() => window.location.href = whatsappURL}
          style={{
            backgroundColor: "#25D366",
            color: "white",
            border: "none",
            padding: "8px",
            cursor: "pointer",
            flex: 1
          }}
        >
          WhatsApp 💬
        </button>


      </div>
    </div>
  );
}

export default ToolCard;