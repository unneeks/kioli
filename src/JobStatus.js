import React from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

const JobStatus = ({ jobId, onComplete }) => {
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`/api/jobs/${jobId}/status`)
        .then((response) => {
          setStatus(response.data.status);
          if (response.data.status === 'SUCCESS') {
            clearInterval(intervalId);
            onComplete();
          }
        });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {status === 'IN_PROGRESS' && <CircularProgress />}
      {status === 'SUCCESS' && <p>Job completed successfully!</p>}
      {status === 'FAILURE' && <p>Job failed to complete. Please try again later.</p>}
    </div>
  );
};

export default JobStatus;
