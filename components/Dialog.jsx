import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export default function SimpleDialog(props) {
  const { title, open, onClose, fullWidth, maxWidth, children } = props;
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}
