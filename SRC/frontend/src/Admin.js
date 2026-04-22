import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

function Admin() {
  const { getToken } = useAuth();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    image: null
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // submit tool to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // get Clerk token
      const token = await getToken();

      const data = new FormData();
      data.append("name", form.name);
      data.append("category", form.category);
      data.append("description", form.description);
      data.append("image", form.image);

      const res = await fetch(
        "https://elite-hire-backend.onrender.com/api/tools",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: data
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const result = await res.json();
      console.log("Uploaded:", result);

      alert("✅ Tool uploaded successfully!");

      // reset form
      setForm({
        name: "",
        category: "",
        description: "",
        image: null
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed or unauthorized");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>Admin Panel</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tool Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <br /><br />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: "200px", marginBottom: "10px" }}
          />
        )}

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Tool"}
        </button>
      </form>
    </div>
  );
}

export default Admin;