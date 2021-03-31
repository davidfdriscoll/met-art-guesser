import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default function AboutDialog(props) {
  return (
    <Dialog 
      maxWidth="md" 
      fullWidth={true}
      onClose={props.handleAboutDialogClose} 
      open={props.open}
    >
      <DialogTitle>Acknowledgements</DialogTitle>
      <DialogContent dividers>
        <Typography align="center" gutterBottom>
          This app was made by David F. Driscoll.
        </Typography>
        <Typography align="center" gutterBottom>
          All images and metadata were obtained through the generous open data policy of the Metropolitan Museum of Art in New York.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}