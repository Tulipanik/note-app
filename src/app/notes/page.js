"use client";

import { Box, Button } from "@mui/material";
import Note from "@/Components/note";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notesContext } from "@/Components/title";
import axios from "axios";

const drawerWidth = 240;

export default function ViewGroupNotes() {
  const [notesLocal, setNotes] = useState([]);
  const router = useRouter();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const group = urlParams.get("group") || undefined;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let response;

        if (group != undefined) {
          response = await axios.get(
            `http://localhost:8080/notes/user/${group}`
          );
        } else {
          response = await axios.get("http://localhost:8080/notes");
        }

        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [group]);

  return (
    <Box
      sx={{
        marginTop: "10vh",
        width: `calc(100% - ${drawerWidth}px - 20px)`,
        ml: `${drawerWidth}px`,
        right: 0,
      }}
    >
      <Button
        sx={{ display: group == undefined ? "none" : "block" }}
        variant="contained"
        onClick={() => router.push(`/add?group=${group}`)}
      >
        Dodaj notatkę +
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {notesLocal.map((note, key) => (
          <Note
            key={key}
            title={note.title}
            content={note.content}
            id={note.id}
          />
        ))}
      </Box>
    </Box>
  );
}
