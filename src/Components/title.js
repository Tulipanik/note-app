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
import { useState } from "react";

const drawerWidth = 240;

export function Title() {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  const getNotes = () => {
    setGroups(["a", "b", "c"]);
    //TODO
    //Połączenie do API (po CORS)
    // axios.get("http://localhost:8080/notes").then((res) => {
    //   console.log(res);
    //   setGroups(res.data);
    // });
  };

  React.useEffect(() => {
    getNotes();
  }, []);

  const showAll = () => {};
  return (
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
            <ListItemButton onClick={getNotes}>
              <ListItemText primary={"Wyświetl wszystkie"} />
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
  );
}
