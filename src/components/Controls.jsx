const Controls = ({ recording, startRecording, stopRecording }) => {
  return (
    <div>
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 ${
          recording ? "bg-red-500 hover:bg-red-600 border-none" : "bg-blue-500 hover:bg-blue-600 border-none"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default Controls;
