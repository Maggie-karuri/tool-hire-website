import React, { useState } from "react";
import tools from "./Data";
import ToolCard from "./ToolCard";
import "./App.css";

function App() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(tools.map(tool => tool.category))];

  const filteredTools = tools.filter(tool => {

    const matchesSearch = tool.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || tool.category === category;

    return matchesSearch && matchesCategory;

  });

  return (
    <div>

      <header>
        <h1>ELITE HIRE</h1>
        <p>Your Trusted Partner for Project Equipment</p>
      </header>

      {/* Search + Filter */}
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
            <option key={index}>{cat}</option>
          ))}
        </select>

      </section>

      {/* Tool Grid */}
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