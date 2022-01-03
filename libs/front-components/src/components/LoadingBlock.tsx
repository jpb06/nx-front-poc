import React from 'react';
import { Grid, LinearProgress } from '@mui/material';
import { useAppColor } from '../utils/useAppColor';

export type LoadingBlockProps = {
  name: string;
  text: string;
};

export const LoadingBlock: React.FC<LoadingBlockProps> = ({ name, text }) => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={1}
  >
    <Grid item sx={{ width: '100%' }}>
      <LinearProgress aria-label={name} />
    </Grid>
    <Grid
      item
      sx={{
        color: useAppColor('darkCyan'),
      }}
    >
      {text}
    </Grid>
  </Grid>
);
