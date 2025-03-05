const STORAGE_KEY = "voice_recordings";

export const saveRecording = (newRecording) => {
  const recordings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  recordings.push(newRecording);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recordings));
};

export const getRecordings = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const deleteRecording = (index) => {
  const recordings = getRecordings();
  recordings.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recordings));
};
