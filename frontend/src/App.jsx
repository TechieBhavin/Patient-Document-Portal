import React from 'react';
import UploadForm from './UploadForm';
import DocumentList from './DocumentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFileMedical } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="page-wrapper">
  <div className="main-card shadow-lg p-4">

        <div className="text-center mb-4">
          <h2 className="fw-bold portal-title">
            <FaFileMedical className="me-2 icon-medical" />
            Patient Portal
          </h2>
          <p className="text-muted subtitle">
            Manage your medical documents securely.
          </p>
        </div>

        <div className="card custom-card shadow-sm mb-4">
          <div className="card-body">
            <UploadForm />
          </div>
        </div>

        <div className="card custom-card shadow-sm">
          <div className="card-body">
            <DocumentList />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
