import React, { useState, useEffect } from "react";
import { Button, Dialog, TextField, Typography } from "@material-ui/core";
import { db, storage } from "./firebase";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import uuid from "node-uuid";

export default function AddFile(props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log(file);
  };
  const handleSaveFile = () => {
    setSaving(true);
    storage
      .ref("files/" + uuid())
      .put(file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection("users")
            .doc(props.user.uid)
            .collection("fileTypes")
            .doc(props.fileTypeId)
            .collection("files")
            .add({ title: title, image: downloadURL })
            .then(() => {
              setTitle("");
              setFile(null);
              setSaving(false);
              props.onClose();
            });
        });
      });
  }; // location where image will be stored

  return (
    <div>
      <Dialog open={props.open} maxWidth="sm" fullWidth onClose={props.onClose}>
        <DialogTitle>Add a File</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(p) => {
              setTitle(p.target.value);
            }}
          ></TextField>
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            {file && (
              <Typography style={{ marginRight: 20 }}>{file.name}</Typography>
            )}
            <Button variant="contained" component="label">
              Choose a File
              <input
                type="file"
                onChange={handleFile}
                style={{ display: "none" }}
              />
            </Button>
          </div>
        </DialogContent>

        <DialogActions>
          <div style={{ display: "flex", position: "relative" }}>
            <Button color="primary" onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSaveFile}
            >
              Save
            </Button>
            {saving && (
              <CircularProgress
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12,
                }}
                color="secondary"
                size={24}
              />
            )}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
