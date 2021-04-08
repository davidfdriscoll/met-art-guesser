import React from "react";

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import ArtCarousel from '../../components/atoms/ArtCarousel';

export default function ArtDisplay(props) {

  return(
    <Box 
      minWidth="0" 
      minHeight="0" 
      flexGrow="1"
      display="flex" 
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
        {props.isLoading
        ? <CircularProgress />
        : <ArtCarousel artObject={props.artObject} />
        }
    </Box>
  );
}