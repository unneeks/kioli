import React, { useState } from 'react';
import { classifyDocument } from '../api/classifyDocument';

export function ClassifyDocument() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [doctype, setDoctype] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = () => {
    setStatus('submitting');
    classifyDocument(file)
      .then((response) => {
        setJobId(response.id);
        setStatus('processing');
        getJobStatus(response.id);
      })
      .catch(() => setStatus('failed'));
  };

  const getJobStatus = async (jobId) => {
    const response = await getJobStatus(jobId);
    if (response.status === 'success') {
      getJobResult(jobId);
    } else if (response.status === 'pending') {
      setTimeout(() => getJobStatus(jobId), 5000);
    } else {
      setStatus('failed');
    }
  };

  const getJobResult = async (jobId) => {
    const response = await getJobResult(jobId);
    setDoctype(response.doctype);
    setConfidence(response.confidence);
    setStatus('completed');
  };

  return (
    <div className="classify-document">
      <h3>Classify Document</h3>
      <p>Upload a document to classify:</p>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleSubmit}>Submit</button>
      {status === 'submitting' && <p>Submitting...</p>}
      {status === 'processing' && <p>Processing...</p>}
      {status === 'failed' && <p>Classification failed.</p>}
      {status === 'completed' && (
        <p>
          Document classified as {doctype} with {confidence} confidence.
        </p>
      )}
    </div>
  );
}
