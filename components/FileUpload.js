// components/FileUpload.js
import { useState } from 'react';

export default function FileUpload({ label, onFileRead }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      onFileRead(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}:</label>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Uploaded: {fileName}</p>}
    </div>
  );
}
