import { Alert } from '@mui/material';
import React from 'react';

type ErrorBlockProps = {
  text: string;
};

export const ErrorBlock: React.FC<ErrorBlockProps> = ({ text }) => (
  <Alert severity="error" aria-label={text}>
    {text}
  </Alert>
);
