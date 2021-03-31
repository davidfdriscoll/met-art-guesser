import React from "react";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function HighlightsCheckbox(props) {
  const handleChange = (event) => {
    props.setShowHighlights(event.target.checked);
    props.setIsLoading(true);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={props.showHighlights} onChange={handleChange} name="Highlights" />}
        label="Highlights"
      />
    </FormGroup>
  );
}