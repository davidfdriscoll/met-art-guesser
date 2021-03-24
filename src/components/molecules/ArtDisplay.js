import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  mainImage: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  }
}));

export default function ArtDisplay(props) {
  const classes = useStyles();

  return(
    <Box minWidth="0" minHeight="0">
      <img className={classes.mainImage} src={props.imageURL} alt="Met object" />
    </Box>
  );
}