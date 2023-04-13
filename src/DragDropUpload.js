import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DragDropUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = (acceptedFiles) => {
    onUpload(acceptedFiles[0]);
    setIsDragging(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragging ? 'dragging' : ''}`}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <input {...getInputProps()} />
      <p>Drag and drop a file, or click to select a file.</p>
    </div>
  );
}
