import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import HighlightsCheckbox from "../../components/atoms/HighlightsCheckbox";
import DepartmentSelect from "../../components/atoms/DepartmentSelect";

export default function SettingsDialog(props) {
  return (
    <Dialog 
      maxWidth="md" 
      onClose={props.handleSettingsDialogClose} 
      open={props.open}
    >
      <DialogContent>
        <HighlightsCheckbox 
          showHighlights={props.showHighlights} 
          setShowHighlights={props.setShowHighlights} 
          setIsLoading={props.setIsLoading}
        />
        <DepartmentSelect
          department={props.department}
          setDepartment={props.setDepartment} 
          setIsLoading={props.setIsLoading}
        />
      </DialogContent>
    </Dialog>
  );
}