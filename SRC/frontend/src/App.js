// src/App.js
import React, { useState, useEffect } from "react";
import ToolCard from "./ToolCard";
import "./App.css";

function App() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  // Fetch tools from backend
  useEffect(() => {
    fetch("https://elite-hire-backend.onrender.com/api/tools")
      .then(res => res.json())
      .then(data => {
        setTools(data);

        // Handle categories (supports array or string)
        const cats = [
          "All",
          ...new Set(
            data.flatMap(tool =>
              Array.isArray(tool.category)
                ? tool.category
                : [tool.category]
            )
          )
        ];

        setCategories(cats);
      })
      .catch(err => console.error("Error fetching tools:", err));
  }, []);

  // Filter tools
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      (Array.isArray(tool.category)
        ? tool.category.includes(category)
        : tool.category === category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="App">

      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          
          <img
            src="/images/logo.png"
            alt="Elite Hire"
            className="logo"
          />

          <div className="header-text">
            <h1>ELITE HIRE</h1>
            <h2>TOOLS & EQUIPMENT</h2>
            <p>Your Trusted Partner for Project Equipment</p>
          </div>

        </div>
      </header>

      {/* SEARCH + FILTER */}
      <section className="controls">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </section>

      {/* TOOLS */}
      <section className="tools-container">
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <p className="no-results">No tools found</p>
        )}
      </section>
        <section className="contact">
  <div className="contact-left">
    📞 Contact Us to Book<br />
    0727 291 734
  </div>

  <div className="contact-center">
    📍 Kangema
  </div>

  <div className="contact-right">
    ELITE HIRENOW
  </div>
</section>


      {/* FOOTER */}
      <footer>
        <p>© 2026 Elite Hire Tools</p>
      </footer>

    </div>
  );
}

export default App;