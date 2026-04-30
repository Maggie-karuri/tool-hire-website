import React from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

const phoneNumber = "254140983749";

function ToolCard({ tool, refreshTools }) {
  const { user } = useUser();
  const { getToken } = useAuth();

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === "admin";

  // WhatsApp message
  const message = `Hello, I am interested in hiring the ${tool.name}. Please share details on pricing and availability.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // DELETE TOOL (ADMIN ONLY)
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tool?");
    if (!confirmDelete) return;

    try {
      const token = await getToken();

      const res = await fetch(
        `https://elite-hire-backend.onrender.com/api/tools/${tool.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete tool");
      }

      alert("Tool deleted successfully");
      refreshTools(); // reload updated list
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div
      style={{
        border: "2px solid orange",
        padding: "10px",
        margin: "10px",
        background: "white",
        borderRadius: "8px"
      }}
    >
      {/* IMAGE */}
      <img
        src={tool.image}
        alt={tool.name}
        style={{
          width: "100%",
          height: "120px",
          objectFit: "contain"
        }}
      />

      {/* CONTENT */}
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>

      {/* BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px"
        }}
      >
        {/* WHATSAPP BUTTON */}
        <button
          onClick={() => (window.location.href = whatsappURL)}
          style={{
            backgroundColor: "#25D366",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            flex: 1
          }}
        >
          Book Now
        </button>

        {/* ADMIN DELETE BUTTON */}
        {isAdmin && (
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer"
            }}
          >
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ToolCard;