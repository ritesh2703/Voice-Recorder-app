import { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { saveRecording, getRecordings } from "../utils/storage";
import RecordingList from "./RecordingList";
import Controls from "./Controls";
import NavBar from "./NavBar";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [recordingName, setRecordingName] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    const savedRecordings = getRecordings();
    setRecordings(savedRecordings);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        const timestamp = new Date().toLocaleString();
        
        const defaultName = `Recording #${recordings.length + 1}`;
        const newRecording = { name: recordingName.trim() || defaultName, url, timestamp };
        const updatedRecordings = [...recordings, newRecording];

        setRecordings(updatedRecordings);
        saveRecording(newRecording);
        setAudioURL(url);
        setRecordingName("");
        audioChunks.current = [];
      };

      mediaRecorder.start();
      setRecording(true);
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Failed to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center 
        ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
            : "bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 text-black"
        }`}
    >
      <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />

      <div className="mt-12 relative flex justify-center items-center">
        {recording && (
          <>
            <div className="absolute w-24 h-24 bg-red-300 rounded-full opacity-50 animate-ping"></div>
            <div className="absolute w-32 h-32 bg-red-300 rounded-full opacity-30 animate-ping"></div>
          </>
        )}
        <FaMicrophone className={`text-6xl ${recording ? "text-red-500" : darkMode ? "text-white" : "text-black"}`} />
      </div>

      <input
        type="text"
        placeholder="Enter recording name (optional)"
        value={recordingName}
        onChange={(e) => setRecordingName(e.target.value)}
        className="mt-6 px-3 py-2 border rounded-lg w-72 bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="w-full flex justify-center p-4">
        <Controls
          recording={recording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </div>

      {audioURL && (
        <div className="mt-4 flex flex-col items-center">
          <div className="bg-gray-800 p-3 rounded-lg shadow-md flex items-center gap-4">
            <audio controls src={audioURL} className="w-72 h-10 rounded-md">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}

      <RecordingList recordings={recordings} setRecordings={setRecordings} darkMode={darkMode} />
    </div>
  );
};

export default Recorder;
