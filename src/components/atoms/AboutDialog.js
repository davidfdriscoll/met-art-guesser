import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function AboutDialog(props) {
  return (
    <Dialog 
      maxWidth="md" 
      fullWidth={true}
      onClose={props.handleAboutDialogClose} 
      open={props.open}
    >
      <DialogTitle>
        <Typography align="center" variant="h5">
          Met Chronoguesser
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography align="center" gutterBottom>
          Created by <Link href="https://github.com/davidfdriscoll">David F. Driscoll</Link>.
        </Typography>
        <Typography align="center" gutterBottom>
          The game uses the Met's generous open access data available through its <Link href="https://metmuseum.github.io">API</Link>.
        </Typography>
        <Typography align="center" gutterBottom>
          Built with <Link href="https://github.com/facebook/create-react-app">React</Link>, <Link href="https://material-ui.com">Material UI</Link>, and <Link href="https://github.com/express-labs/pure-react-carousel">Pure React Carousel</Link>.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}