"use client";

import Note from "@/Components/note";
import { Box, FormGroup, Input, FormLabel } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

export default function FindByID() {
  const [found, setFound] = useState(true);
  const [note, setNote] = useState({});
  const [noteId, setNoteId] = useState("");

  const findNote = async () => {
    try {
      console.log("siema");
      const response = await axios.get(`http://localhost:8080/notes/${noteId}`);
      console.log(response);
      const foundNote = response.data;
      console.log(response);

      if (foundNote.length != 0) {
        setNote(foundNote);
        // setFound(true);
      } else {
        // setFound(false);
      }
    } catch (error) {
      console.error("Error finding note:", error);
    }
  };
  return (
    <Box
      sx={{
        marginTop: "10vh",
        width: `calc(100% - ${drawerWidth}px - 20px)`,
        ml: `${drawerWidth + 10}px`,
      }}
    >
      <form onSubmit={findNote}>
        <FormLabel>Title</FormLabel>
        <Input
          sx={{ marginBottom: "20px" }}
          placeholder="Write here the note title"
        />
        <Input
          type="Submit"
          sx={{ textAlign: "center", alignItems: "center", width: "100px" }}
          onChange={(e) => setNoteId(e.target.value)}
        />
      </form>
      {found ? (
        <Note title={note.title} content={note.content} />
      ) : (
        <div>Nie znaleziono notatki o zadanym id</div>
      )}
    </Box>
  );
}
