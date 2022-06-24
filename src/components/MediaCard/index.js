import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';



const theme = createTheme({
  palette: {
    primary: {
      light: '#fafafa',
      main: '#ffb300',
      dark: '#fafafa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default function MediaCard(props) {
  return (
    <div className="margin-between-card">
    <ThemeProvider theme={theme}>
    <Card sx={4}>
       <CardMedia className="container-child"
        component="img"
        height="200"
        image={props.imageSource}
        alt="image is passed through props"
      /> 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

    </Card>
    </ThemeProvider>
    </div>
  );
}