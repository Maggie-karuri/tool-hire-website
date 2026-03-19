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
    fetch("https://elite-hire-backend.onrender.com/tools")
      .then(res => res.json())
      .then(data => {
        setTools(data);
        const cats = ["All", ...new Set(data.map(tool => tool.category))];
        setCategories(cats);
      })
      .catch(err => console.error("Error fetching tools:", err));
  }, []);

  // Filter tools by search & category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || tool.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="App">
      <header>
        <h1>ELITE HIRE</h1>
        <p>Your Trusted Partner for Project Equipment</p>
      </header>

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
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </section>

      <section className="tools-container">
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} />)
        ) : (
          <p className="no-results">No tools found</p>
        )}
      </section>

      <section className="contact">
        <h2>Contact Us to Book</h2>
        <p>0727 291 734</p>
        <p>Kangema</p>
      </section>

      <footer>
        <p>© 2026 Elite Hire Tools</p>
      </footer>
    </div>
  );
}

export default App;