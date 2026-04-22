import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import ToolCard from "./ToolCard";
import Admin from "./Admin";
import "./App.css";


function App() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  const fetchTools = () => {
    fetch("https://elite-hire-backend.onrender.com/api/tools")
      .then(res => res.json())
      .then(data => {
        setTools(data);

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
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTools();
  }, []);

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
        <div className="logo-card">
          <img src="/images/logo.jpeg" alt="Elite Hire" className="logo" />
        </div>

        <div className="header-text">
          <h1>ELITE HIRE</h1>
          <h2>TOOLS & EQUIPMENT</h2>
          <p>"Your Trusted Partner for All Project Equipment"</p>
        </div>
      </header>

      {/* 🔘 ADMIN BUTTON */}
      <div style={{ textAlign: "right", padding: "10px" }}>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="admin-btn">Admin Login</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Admin />
        </SignedIn>
      </div>

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

      {/* CONTACT */}
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

      <footer>
        <p>© 2026 Elite Hire Tools</p>
      </footer>

    </div>
  );
}

export default App;