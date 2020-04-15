import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import { auth, db, snapshotToArray } from "./firebase";
import Files from "./Files";
import AddFileType from "./AddFileType";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Favorites from "./Favorites";

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileTypes, setFileTypes] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return unsubscribe;
  }, [props.history]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("fileTypes")
        .onSnapshot((snapshot) => {
          const updatedFileTypes = snapshotToArray(snapshot);
          setFileTypes(updatedFileTypes);
        });
    }
  }, [user]); //adding user to the array here makes it so that it will get exported and checked, and whenever it changes again the array will update

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}
          >
            EverFab Mobile App
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem
            button
            to={"/app/favorites/"}
            component={Link}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="Favorites" />
          </ListItem>
          {fileTypes.map((ftps) => {
            return (
              <ListItem
                button
                to={"/app/fileType/" + ftps.id + "/"}
                component={Link}
                onClick={() => {
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={ftps.name} />
              </ListItem>
            );
          })}
          {/* <ListItem
            button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <ListItemText primary="Create new File Type" />
          </ListItem> */}
        </List>
      </Drawer>

      <Route
        path="/app/favorites/"
        render={(routeProps) => {
          return <Favorites user={user} {...routeProps} />;
        }}
      />

      <Route
        path="/app/fileType/:file_type_id"
        render={(routeProps) => {
          return <Files user={user} {...routeProps} />;
        }}
      />
      {/* <AddFileType
        open={dialogOpen}
        user={user}
        onClose={() => {
          setDialogOpen(false);
        }}
      /> */}
    </div>
  );
}
