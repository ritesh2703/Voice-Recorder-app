const Controls = ({ recording, startRecording, stopRecording }) => {
  return (
    <div>
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 shadow-lg border-2
          ${
            recording
              ? "bg-white text-red-500 border-red-500"
              : "bg-white text-green-500 border-green-500"
          }`}
      >
        {recording ? "⏹️ Stop Recording" : "▶️ Start Recording"}
      </button>
    </div>
  );
};

export default Controls;