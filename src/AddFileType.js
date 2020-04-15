import React, { useState } from "react";
import { Button, Dialog, TextField } from "@material-ui/core";
import { db } from "./firebase";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddFileType(props) {
  const [name, setName] = useState("");

  const handleSaveFileType = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("fileTypes")
      .add({ name: name });
  };

  return (
    <div>
      <Dialog open={props.open} maxWidth="sm" fullWidth onClose={props.onClose}>
        <DialogTitle>Add a File Type</DialogTitle>
        <DialogContent>
          <TextField
            label="File Type or Category"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveFileType}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
