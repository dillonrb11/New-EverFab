import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { db, snapshotToArray } from "./firebase";
import FileCard from "./FileCard";
import AddFile from "./AddFile";
import { Document, Page } from "react-pdf";


export default function Files(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(props.user.uid)
      .collection("fileTypes")
      .doc(props.match.params.file_type_id)
      .collection("files")
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
      {files.map((fil) => {
        return (
          <div>
            <FileCard file={fil} user={props.user}/>

          </div>
        );
      })}
      <div>
        {/* <Button
          color="secondary"
          variant="contained"
          style={{ marginTop: 10 }}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Add a File
        </Button> */}
      </div>
      {/* <AddFile
        open={dialogOpen}
        fileTypeId={props.match.params.file_type_id}
        user={props.user}
        onClose={() => {
          setDialogOpen(false);
        }}
      /> */}
    </div>
  );
}
