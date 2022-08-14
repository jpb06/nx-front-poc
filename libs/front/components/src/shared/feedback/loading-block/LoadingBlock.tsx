import { Grid, LinearProgress } from '@mui/material';

import { appTheme } from '@front/theme';

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
        color: appTheme.appColors.darkCyan,
      }}
    >
      {text}
    </Grid>
  </Grid>
);
