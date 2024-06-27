import * as React from "react";
import {
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

export default function Delete({ handleDelete, handleClose }) {
  return (
    <ModalDialog variant="outlined" role="alertdialog">
      <DialogTitle>
        <WarningRoundedIcon />
        Confirmation
      </DialogTitle>
      <Divider />
      <DialogContent>
        Are you sure you want to discard all of your notes?
      </DialogContent>
      <DialogActions>
        <Button variant="solid" color="danger" onClick={handleDelete}>
          Discard notes
        </Button>
        <Button variant="plain" color="neutral" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </ModalDialog>
  );
}
