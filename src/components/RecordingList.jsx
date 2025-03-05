import { useState } from "react";
import { deleteRecording } from "../utils/storage";
import { FaDownload, FaTrash, FaMusic, FaShareAlt } from "react-icons/fa";

const RecordingList = ({ recordings, setRecordings, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("recent");

  const handleDelete = (index) => {
    deleteRecording(index);
    setRecordings((prev) => prev.filter((_, i) => i !== index));
  };

  const downloadRecording = (url, name) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = (url) => {
    navigator.clipboard.writeText(url);
    alert("Recording link copied to clipboard!");
  };

  // Filter & Sort
  const filteredRecordings = recordings
    .filter((rec) => rec.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortType === "az") return a.name.localeCompare(b.name);
      if (sortType === "za") return b.name.localeCompare(a.name);
      if (sortType === "dateAsc") return new Date(a.timestamp) - new Date(b.timestamp);
      if (sortType === "dateDesc") return new Date(b.timestamp) - new Date(a.timestamp);
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  return (
    <div className={`mt-6 w-full max-w-4xl mx-auto p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h2 className="text-xl font-semibold mb-3 text-center">Saved Recordings</h2>

      {/* Search & Sorting */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search recordings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="recent">Recent</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="dateDesc">Date (Newest First)</option>
          <option value="dateAsc">Date (Oldest First)</option>
        </select>
      </div>

      {/* Grid Layout for Audio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-96 p-2">
        {filteredRecordings.length > 0 ? (
          filteredRecordings.map((rec, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'} text-white flex flex-col gap-2`}
            >
              {/* Name, Timestamp & Buttons */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <FaMusic className="text-yellow-400 text-xl" />
                  <div>
                    <p className="font-medium">{rec.name}</p>
                    <span className="text-gray-200 text-xs">{rec.timestamp}</span>
                  </div>
                </div>

                {/* Buttons (same background as container) */}
                <div className="flex gap-2 p-1 rounded-lg">
                  <button
                    onClick={() => downloadRecording(rec.url, rec.name)}
                    className="p-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:opacity-80"
                  >
                    <FaDownload className="text-white" />
                  </button>
                  <button
                    onClick={() => handleShare(rec.url)}
                    className="p-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:opacity-80"
                  >
                    <FaShareAlt className="text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:opacity-80"
                  >
                    <FaTrash className="text-white" />
                  </button>
                </div>
              </div>

              {/* Audio Player */}
              <audio controls src={rec.url} className="w-full rounded-lg"></audio>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">No recordings found</p>
        )}
      </div>
    </div>
  );
};

export default RecordingList;
