import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { Link, Route } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { db, storage } from "./firebase";
import { usePdf } from "@mikecousins/react-pdf";
import DescriptionIcon from "@material-ui/icons/Description";
import uuid from "node-uuid";

export default function FileCard(props) {
  const [dialog_open, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("");

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleAddFileToFavorites = () => {
    console.log("pressed the favorites button");

    db.collection("users")
      .doc(props.user.uid)
      .collection("favorites")
      .add({ title: props.file.title, image: props.file.image });
  };

  const handleRemoveFileFromFavorites = () => {
    console.log("pressed the favorites button");

    db.collection("users")
      .doc(props.user.uid)
      .collection("favorites")
      .doc(props.file.id)
      .delete();
  };

  return (
    <Card style={{ maxWidth: 500, marginRight: 10, marginTop: 10 }}>
      <CardActionArea>
        <CardContent>
          <Route
            path="/app/filetype/:file_type_id/"
            render={(routeProps) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <CardActions>
                    <Button
                      size="small"
                      onClick={handleAddFileToFavorites}
                      variant="contained"
                    >
                      Add {props.file.title} to Favorites
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DescriptionIcon />}
                      href={props.file.image}
                    >
                      Download {props.file.title}
                    </Button>
                  </CardActions>
                </div>
              );
            }}
          />

          <Route
            path="/app/favorites/"
            render={(routeProps) => {
              return (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <CardActions>
                    <Button
                      size="small"
                      onClick={handleRemoveFileFromFavorites}
                      variant="contained"
                    >
                      Remove {props.fileTitle} from Favorites
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DescriptionIcon />}
                      href={props.file.image}
                    >
                      Download {props.fileTitle}
                    </Button>
                  </CardActions>
                </div>
              );
            }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
