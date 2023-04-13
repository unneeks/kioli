import React from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dropzone: {
    border: '2px dashed #aaa',
    borderRadius: '4px',
    padding: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
}));

const FileInput = ({ onFileSelect }) => {
  const classes = useStyles();

  const handleDrop = React.useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  return (
    <div {...getRootProps()} className={classes.dropzone}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>Drop the file here...</Typography>
      ) : (
        <Typography>Drag and drop file here or click to select file</Typography>
      )}
      <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
        Select file
      </Button>
    </div>
  );
};

export default FileInput;
