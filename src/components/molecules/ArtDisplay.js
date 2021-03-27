import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const useStyles = makeStyles((theme) => ({
  mainImage: {
    objectFit: 'contain',
    cursor: "pointer",
    padding: theme.spacing(3),
    maxWidth: "100%",
    maxHeight: "100%",
  },
  paper: {
    // this is a really ugly attempt to do padding within flexbox
    maxWidth: `calc(100% - ${theme.spacing(6)}px)`,
    maxHeight: `calc(100% - ${theme.spacing(6)}px)`,
    display: "flex",
    justifyContent: "center",
  },
  loading: {
    margin: theme.spacing(5),
  }
}));

export default function ArtDisplay(props) {
  const classes = useStyles();
  const [isImageViewerOpen, setImageViewerOpen] = React.useState(false);

  const handleOpen = () => {
    setImageViewerOpen(true);
  }

  const handleClose = () => {
    setImageViewerOpen(false);
  }

  return(
    <Box 
      minWidth="0" 
      minHeight="0" 
      flexGrow={1} 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      {isImageViewerOpen && 
        <Lightbox 
          image={props.artObject.primaryImage} 
          title="Guess the object" 
          onClose={handleClose} 
        />
      }
      <Paper elevation={15} className={classes.paper}>
        {props.artObject
        ? <img 
            className={classes.mainImage} 
            src={props.artObject.primaryImage} 
            alt="Guess the object" 
            onClick={handleOpen} 
          />
        : <CircularProgress 
            className={classes.loading} 
          />
        }
      </Paper>
    </Box>
  );
}