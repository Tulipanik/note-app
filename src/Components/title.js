"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Drawer, FormGroup, Input } from "@mui/material";
import { Divider } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, createContext } from "react";

const drawerWidth = 240;
export const notesContext = createContext();

export function Title() {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  let [newGroup, setNewGroup] = useState("");

  const getNotes = () => {
    try {
      axios.get("http://localhost:8080/notes").then((res) => {
        if (res.data.length == 0) {
          setGroups([]);
        } else {
          let beginning = res.data;
          let userIds = beginning.map((group) => group.userId);
          setGroups([...new Set(userIds)]);
        }
        setNotes(res.data);
      });
    } catch (error) {
      console.log("error.status:", error);
    }
  };

  React.useEffect(() => {
    getNotes();
  }, []);

  return (
    <notesContext.Provider value={notes}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Notes app
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Divider />
          <List>
            <ListItem key={1} disablePadding>
              <ListItemButton name="DisplayAll" onClick={() => router.push("/notes")}  className={'t3sel-all-note-button'}>
                <ListItemText primary={"Wyświetl wszystkie"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={2} disablePadding>
              <ListItemButton onClick={() => router.push("/findById")} className={'t3sel-note-search-button'}>
                <ListItemText primary={"Wyszukaj po id"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            {[...groups].map((text, index) => {
              return (
                <ListItem key={index + 3} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      router.push(`/notes?group=${text}`);
                    }}
                    className="t3sel-main-page-set-group-button"
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <ListItem key={groups.length + 3} disablePadding>
              <form
                onSubmit={() => {
                  setGroups([...groups, newGroup]);
                  router.push(`/notes?group=${newGroup}`)
                }}
              >
                <Input
                  onChange={(value) => {
                    setNewGroup(value.target.value);
                  }}
                  placeholder="Add group"
                  className="t3sel-main-page-add-group-button"
                />
                <Input sx={{ display: "none" }} type="submit" />
              </form>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </notesContext.Provider>
  );
}
