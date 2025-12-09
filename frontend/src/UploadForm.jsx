import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || file.type !== 'application/pdf') {
      setMsg('❌ Please select a valid PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5002/documents/upload', formData);
      setMsg('✅ Upload successful');
      setFile(null);
      setTimeout(() => window.location.reload(), 800);
    } catch {
      setMsg('❌ Upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload} className="d-flex align-items-center gap-3 flex-wrap">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="form-control"
        style={{ maxWidth: "280px" }}
      />

      <button type="submit" className="btn btn-primary px-4">
        Upload
      </button>

      {msg && <div className="text-muted fw-semibold">{msg}</div>}
    </form>
  );
};

export default UploadForm;
