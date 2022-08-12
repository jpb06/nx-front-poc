import { Build } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import { AppColor } from '@front/theme';

import { withThemeColor } from './Brand.styles';

export type BrandProps = {
  color: AppColor;
  centered?: boolean;
  withBottomMargin?: boolean;
  big?: boolean;
};

export const Brand = ({
  color,
  centered = false,
  withBottomMargin = false,
  big = false,
}: BrandProps) => {
  const withMainColor = withThemeColor(color);

  const justifyContent = centered ? 'center' : 'flex-start';

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={justifyContent}
        alignItems="flex-start"
        sx={{ mb: withBottomMargin ? 2 : 0 }}
      >
        <Grid item>
          <Build sx={withMainColor} />
        </Grid>
        <Grid item>
          <Typography
            variant={big ? 'h4' : 'h6'}
            sx={{
              flexGrow: 1,
              ...withMainColor,
            }}
          >
            Sandbox
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={justifyContent}>
        <Grid
          item
          sx={{
            fontSize: 12,
            ...withThemeColor('darkCyan'),
          }}
        >
          nextjs / react-hook-form / testing-library
        </Grid>
      </Grid>
    </>
  );
};
