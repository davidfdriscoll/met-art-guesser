import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const useStyles = makeStyles((theme) => ({
  mainImage: {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
    cursor: "pointer",
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center"
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
    <Box minWidth="0" minHeight="0" display="flex" justifyContent="center">
      {isImageViewerOpen && (
        <Lightbox image={props.imageURL} title="Met object" onClose={handleClose} />
        )
      }
      <Paper elevation={15} className={classes.paper}>
        <img className={classes.mainImage} src={props.imageURL} alt="Met object" onClick={handleOpen} />
      </Paper>
    </Box>
  );
}