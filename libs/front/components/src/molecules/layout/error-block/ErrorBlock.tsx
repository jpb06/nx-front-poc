import { Alert } from '@mui/material';
import React from 'react';

export type ErrorBlockProps = {
  text: string;
};

export const ErrorBlock = ({ text }: ErrorBlockProps) => (
  <Alert severity="error" aria-label={text}>
    {text}
  </Alert>
);
