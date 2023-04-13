import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const ResultDisplay = ({ result }) => {
  const [color, setColor] = React.useState('');

  React.useEffect(() => {
    if (result.confidence < 0.5) {
      setColor('red');
    } else if (result.confidence >= 0.5 && result.confidence < 0.8) {
      setColor('orange');
    } else {
      setColor('green');
    }
  }, [result]);

  return (
    <Paper style={{ padding: '1rem' }}>
      <Typography variant="h6" gutterBottom>
        {result.documentType}
      </Typography>
      <Typography variant="body1">
        Confidence: <span style={{ color }}>{result.confidence}</span>
      </Typography>
    </Paper>
  );
};

export default ResultDisplay;
