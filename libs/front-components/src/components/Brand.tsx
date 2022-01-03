import { Build } from '@mui/icons-material';
import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { AppColor } from '../theme/appTheme';

export type BrandProps = {
  color: AppColor;
  centered?: boolean;
  withBottomMargin?: boolean;
  big?: boolean;
};

export const Brand: React.FC<BrandProps> = ({
  color: appColor,
  centered = false,
  withBottomMargin = false,
  big = false,
}) => {
  const theme = useTheme();
  const color = theme.appColors[appColor];
  const darkCyan = theme.appColors.darkCyan;

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={centered ? 'center' : 'flex-start'}
        alignItems="flex-start"
        sx={{ mb: withBottomMargin ? 2 : 0 }}
      >
        <Grid item>
          <Build sx={{ color }} />
        </Grid>
        <Grid item>
          <Typography
            variant={big ? 'h6' : 'h4'}
            sx={{
              flexGrow: 1,
              color
            }}
          >
            Sandbox
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid
          item
          sx={{
            fontSize: 12,
            color: darkCyan
          }}
        >
          nextjs / react-hook-form / testing-library
        </Grid>
      </Grid>
    </>
  );
};
