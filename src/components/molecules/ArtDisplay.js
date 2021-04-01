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
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },    
    maxWidth: "100%",
  },
  paper: {
    minHeight: 0,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  },
  loading: {
    margin: theme.spacing(5),
  },
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
      flexGrow="1"
      display="flex" 
      flexDirection="column"
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
        {!props.loading
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