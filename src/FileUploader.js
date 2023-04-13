import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

const FileUploader = ({ apiUrl ,  onFileSelect}) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async () => {
    if (!file) {
      setStatus('Please upload a file before submitting');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('File uploaded successfully');
      } else {
        setStatus('Error uploading file');
      }
    } catch (error) {
      setStatus('Error uploading file');
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          width: '300px',
          height: '200px',
          cursor: 'pointer',
          margin: 'auto',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive
          ? 'Drop the file here...'
          : file
          ? file.name
          : 'Drag and drop a file here or click to select'}
      </div>
      <Button onClick={onSubmit} variant="contained" color="primary" style={{ display: 'block', margin: '20px auto', marginTop: '1rem' }}>
        Submit
      </Button>

      
      <p>{status}</p>
    </div>
  );
};

export default FileUploader;
