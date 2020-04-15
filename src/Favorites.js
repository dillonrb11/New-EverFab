import React, { useState, useEffect } from "react";
import { Button, Dialog, TextField, Typography } from "@material-ui/core";
import { db, storage, snapshotToArray } from "./firebase";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import uuid from "node-uuid";
import FileCard from "./FileCard";

export default function Favorites(props) {
  const [dialog_open, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(props.user.uid)
      .collection("favorites")
      .onSnapshot((snapshot) => {
        const updatedFiles = snapshotToArray(snapshot);
        setFiles(updatedFiles);
      });

    return unsubscribe;
  }, [props]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingTop: 10,
      }}
    >
      {files.map((ftps) => {
        return (
          <FileCard
            file={ftps}
            user={props.user}
            fileTypeId={props.match.params.file_type_id}
            fileTitle={ftps.title}
            fileId={ftps.id}
            close_box={() => {
              setDialogOpen(false);
            }}
          />
        );
      })}
    </div>
  );
}
