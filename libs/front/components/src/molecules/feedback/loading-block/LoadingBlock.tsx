import { Grid, LinearProgress } from '@mui/material';
import React from 'react';

import { getAppColorFor } from '@theme';

export type LoadingBlockProps = {
  name: string;
  text: string;
};

export const LoadingBlock = ({ name, text }: LoadingBlockProps) => (
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
        color: getAppColorFor('darkCyan'),
      }}
    >
      {text}
    </Grid>
  </Grid>
);
