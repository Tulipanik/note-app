"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Drawer } from "@mui/material";
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

  const getNotes = () => {
    //TODO
    // Tutaj musisz pobrać wszystkie notatki z bazy oraz
    // wydobyć z tego grupy i ustawić je funkcją setGroups
    //Ustaw jeszcze notatki funckją set Notes

    //Połączenie do API (po CORS)
    // axios.get("http://localhost:8080/notes").then((res) => {
    //   console.log(res);
    //   setGroups(res.data);
    // });
    try {
      axios.get("http://localhost:8080/notes").then((res) => {
      console.log(res);
      setGroups(res.data.groups);
      setNotes(res.data.notes);
    });
    } catch (error) {
      console.log("error.status:", error);
    }
    

    //setNotes([{ title: "Siema", content: "elo" }]);
    //setGroups(["a", "b", "c"]);
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
              <ListItemButton onClick={() => router.push("/notes")}>
                <ListItemText primary={"Wyświetl wszystkie"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={2} disablePadding>
              <ListItemButton onClick={() => router.push("/findById")}>
                <ListItemText primary={"Wyszukaj po id"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            {[...groups].map((text, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => router.push(`/notes?group=${text}`)}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      </Box>
    </notesContext.Provider>
  );
}
