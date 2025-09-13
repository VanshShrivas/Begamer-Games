import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger icons

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed md:static top-0 left-0 h-full w-64 bg-black text-white p-6 flex flex-col border-r border-red-600 transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-red-600 italic tracking-wide">
          Admin
        </h1>
        {/* Close button on mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden text-white"
        >
          <X size={28} />
        </button>
      </div>
      <nav className="flex flex-col gap-5 text-lg">
        <Link
          to="/"
          className="hover:text-red-500 transition"
          onClick={() => setIsOpen(false)}
        >
          🏠 Dashboard
        </Link>
        <Link
          to="/add-game"
          className="hover:text-red-500 transition"
          onClick={() => setIsOpen(false)}
        >
          ➕ Add Game
        </Link>
        <Link
          to="/manage-games"
          className="hover:text-red-500 transition"
          onClick={() => setIsOpen(false)}
        >
          🗂 Manage Games
        </Link>
      </nav>
    </div>
  );
}

function PageWrapper({ title, children }) {
  return (
    <div className="p-6 md:p-10 text-white flex flex-col gap-6 w-full">
      <h2 className="text-3xl md:text-4xl font-extrabold italic text-red-600 drop-shadow-md">
        {title}
      </h2>
      <div className="bg-black border border-red-600 p-6 md:p-8 rounded-2xl shadow-md shadow-red-600/30">
        {children}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <PageWrapper title="Dashboard">
      <p className="text-gray-300">Welcome to the Admin Panel 🎮</p>
      <p className="text-gray-400">
        Use the sidebar to <span className="text-red-500">add</span> or{" "}
        <span className="text-red-500">manage</span> games.
      </p>
    </PageWrapper>
  );
}

function AddGame({base_url}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    link: null,
  });

  const [loading, setLoading] = useState(false);

  // text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // downloadable file input → just store file object
  const handleFileChange = (e) => {
    setFormData({ ...formData, link: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("image", formData.image);
    payload.append("link", formData.link);

    try {
      const res = await fetch(`${base_url}/receive`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const text = await res.text(); // error plain text ho sakta hai
        throw new Error(`Request failed: ${text}`);
      }

      const data = await res.json();
      alert(data.message || "Game uploaded successfully!");
      console.log("Server response:", data);

    } catch (err) {
      setLoading(false);
      console.error("❌ Error:", err.message);
    } finally {
      setLoading(false);
    }

  };


  return (
    <PageWrapper title="Add Game">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          type="text"
          placeholder="Game Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="p-3 rounded-lg bg-black text-white border border-red-600 focus:outline-none focus:border-red-500"
        />
        <textarea
          name="description"
          placeholder="Game Description"
          required
          value={formData.description}
          onChange={handleChange}
          className="p-3 rounded-lg bg-black text-white border border-red-600 focus:outline-none focus:border-red-500"
        />
        <label>Game Image</label>
        <input
          name="image"
          type="file"
          required
          accept="image/*"
          onChange={handleImageChange}
          className="p-3 rounded-lg bg-black text-white border border-red-600 focus:outline-none focus:border-red-500"
        />
        <label>Game Downloadable File (Max:10 MB)</label>
        <input
          name="link"
          type="file"
          required
          onChange={handleFileChange}
          className="p-3 rounded-lg bg-black text-white border border-red-600 focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition shadow-md shadow-red-600/40"
        >
          Add Game
        </button>
      </form>
      {loading && <div className="flex  flex-col items-center gap-7 mt-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <div>It may take longer if the file size is large...🥲</div>
      </div>}

    </PageWrapper>
  );
}



function ManageGames({base_url}) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${base_url}/get_games`);
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("❌ Error fetching games:", err);
      }
    };
    fetchGames();
  }, []);

  const handleDelete = async (_id) => {
    const will=confirm("Are you sure you want to delete?\n(After clicking YES please refresh the page!!) ");
  if(will){
  try {
    const res = await fetch(`${base_url}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id :_id}), // send as JSON
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${text}`);
    }

    const data = await res.json();
    alert(data.message || "Game Deleted Successfully ✅");
    console.log("Server response:", data);

    // UI se remove bhi kar de (state update)
    setGames((prev) => prev.filter((game) => game._id !== _id));

  } catch (err) {
    console.error("❌ Error:", err.message);
  }}
  
};

  return (
    <PageWrapper title="Manage Games">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((ele, idx) => (
          <div
            key={idx}
            className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-600/30 transition-shadow flex flex-col"
          >
            {/* Image */}
            {ele.image && (
              <img
                src={ele.image}
                alt={ele.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-red-500">{ele.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{ele.description}</p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleDelete(ele._id)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>



  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const base_url=import.meta.env.VITE_BASE_URL;

  return (
    <Router>
      <div className="flex bg-black min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main content */}
        <div className="flex-1">
          {/* Top bar (for mobile) */}
          <div className="md:hidden flex items-center justify-between bg-black text-white p-4 border-b border-red-600">
            <h1 className="text-xl font-bold italic text-red-600">Admin</h1>
            <button onClick={() => setIsOpen(true)}>
              <Menu size={28} />
            </button>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-game" element={<AddGame base_url={base_url}/>} />
            <Route path="/manage-games" element={<ManageGames base_url={base_url}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
