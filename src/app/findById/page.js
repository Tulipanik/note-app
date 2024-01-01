"use client";

import React from "react";
import Note from "@/Components/note";
import { Box, FormGroup, Input, FormLabel } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

export default function FindByID() {
  const [note, setNote] = useState({});
  const [noteId, setNoteId] = useState("");

  const findNote = async (e) => {
    e.preventDefault();
    try {
      console.log(`http://localhost:8080/notes/${noteId}`);
      const response = await fetch(`http://localhost:8080/notes/${noteId}`);
      const responseData = await response.json();
      console.log(responseData);
      setNote(responseData);
    } catch (error) {
      console.error("Error finding note:", error.response);
    }
  };

  React.useEffect(() => {
    console.log(note);
  }, [note]);

  return (
    <Box
      sx={{
        marginTop: "10vh",
        width: `calc(100% - ${drawerWidth}px - 20px)`,
        ml: `${drawerWidth + 10}px`,
      }}
    >
      <form onSubmit={findNote} sx={{ display: "flex", flexDirection: "row" }}>
        <FormLabel>Title</FormLabel>
        <Input
          sx={{ marginBottom: "20px", width: "100%" }}
          placeholder="Write here the note title"
          onChange={(e) => setNoteId(e.target.value)}
        />
        <Input
          type="Submit"
          sx={{ textAlign: "center", alignItems: "center", width: "100px" }}
        />
      </form>
      <Box>
        <Note
          title={note.title}
          content={note.content}
          id={note.id}
          userId={note.userId}
        />
      </Box>
    </Box>
  );
}
