import {
  alpha,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

import { LangSelector } from '../../../molecules';
import { Brand } from '../../data-display/brand/Brand';

export const FullpageBox = ({ children }: PropsWithChildren<unknown>) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{
      minHeight: '100vh',
      backgroundSize: 'cover',
      padding: 2,
    }}
  >
    <Card
      sx={{
        width: '100%',
        paddingBottom: 2,
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.88),
        borderRadius: 4,
        maxWidth: 700,
      }}
    >
      <CardMedia
        sx={{
          height: 150,
        }}
        image="/img/banner.jpg"
      />
      <CardContent>
        <Grid container justifyContent="center" direction="row">
          <Brand color="amber" centered big />
          <Grid
            container
            item
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ marginTop: 3, marginLeft: 3, marginRight: 3 }}
          >
            <LangSelector />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          paddingTop: 0,
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Grid>
      </CardActions>
    </Card>
  </Grid>
);
