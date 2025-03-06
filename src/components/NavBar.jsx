import React from "react";
import { Mic } from "lucide-react"; // Import Mic icon

const NavBar = ({ darkMode, toggleTheme }) => {
  return (
<nav className="w-full flex justify-between items-center p-4 bg-orange-500 text-white">  
      <div className="flex items-center gap-2">
        <Mic size={28} /> {/* Voice Icon */}
        <h1 className="text-lg font-bold">Voice Recorder</h1>
      </div>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-md font-bold shadow-md transition-all duration-300
          ${darkMode ? "bg-yellow-300 text-yellow-300 border border-yellow-400" : "bg-gray-900 text-yellow-300 border border-gray-700"}`}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
};

export default NavBar;