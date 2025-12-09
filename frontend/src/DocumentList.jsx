import React, { useEffect, useState } from "react";
import axios from "axios";

const DocumentList = () => {
  const [docs, setDocs] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5002/documents")
      .then((res) => setDocs(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/documents/${id}`);
      setDocs(docs.filter((doc) => doc._id !== id));

      setSuccessMsg("Document deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const kb = bytes / 1024;
    const mb = bytes / (1024 * 1024);

    if (mb >= 1) {
      return mb % 1 === 0 ? `${mb.toFixed(0)} MB` : `${mb.toFixed(1)} MB`;
    } else {
      return `${Math.round(kb)} KB`;
    }
  };

  return (
    <>
      {successMsg && (
        <div className="alert alert-success text-center" role="alert">
          {successMsg}
        </div>
      )}

      <div className="table-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="no-wrap">Filename</th>
              <th className="no-wrap">Size</th>
              <th className="no-wrap">Uploaded At</th>
              <th className="no-wrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id}>
                <td className="filename-cell">{doc.filename}</td>

                <td className="no-wrap">{formatFileSize(doc.filesize)}</td>

                <td className="no-wrap">
                  {doc.createdAt
                    ? new Date(doc.createdAt).toLocaleString()
                    : "N/A"}
                </td>

                <td className="action-buttons">
                  <a
                    href={`http://localhost:5002/documents/${doc._id}/view`}
                    className="btn btn-outline-primary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>

                  <a
                    href={`http://localhost:5002/documents/${doc._id}/download`}
                    className="btn btn-outline-success btn-sm"
                  >
                    Download
                  </a>

                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocumentList;
