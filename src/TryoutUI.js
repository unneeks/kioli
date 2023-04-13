import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DragDrop from './DragDropUpload';
import FileInput from './FileInput';
import FileUploader from './FileUploader';
import JobStatus from './JobStatus';
import ProgressBar from './ProgressBar';
import ClassifyDocument from './components/classifyDocument';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'blue',
    fontSize: '24px',
  },
});

const TryoutUI = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [jobResult, setJobResult] = useState(null);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileUpload = (file) => {
    setFile(file);
    setJobId(null);
    setJobStatus(null);
    setJobResult(null);
  };

  const handleJobStatus = (status) => {
    setJobStatus(status);
  };

  const handleJobResult = (result) => {
    setJobResult(result);
  };

  const handleJobId = (id) => {
    setJobId(id);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Classify Document" />
        <Tab label="Extract Entities" />
      </Tabs>
      {value === 0 && (
        <div>
          <h2>Classify Document</h2>
          <p>Drag and drop a file or click to upload.</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <FileUploader apiUrl="" style={{ marginLeft: '80px' }} />

          </div>
          {file && jobId === null && (
            <ClassifyDocument file={file} handleJobId={handleJobId} />
          )}
          {file && jobId !== null && (
            <JobStatus jobId={jobId} handleJobStatus={handleJobStatus} />
          )}
          {file && jobId !== null && jobStatus === 'success' && (
            <ProgressBar jobId={jobId} handleJobResult={handleJobResult} />
          )}
          {file && jobId !== null && jobResult !== null && (
            <div>
              <p>
                The document is classified as {jobResult.documentType} with{' '}
                {jobResult.confidence}% confidence.
              </p>
              <div className="confidence-bar">
                <div
                  className="confidence-level"
                  style={{ width: `${jobResult.confidence}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {value === 1 && (
        <div>
          <h2>Extract Entities</h2>
          <p>Coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default TryoutUI;
