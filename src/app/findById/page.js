"use client";

import Note from "@/Components/note";
import { Box, FormGroup, Input, FormLabel } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

export default function FindByID() {
  const [found, setFound] = useState(false);
  const [note, setNote] = useState({});
  const findNote = () => {
    //TODO
    //trzeba pobrać notatkę o zadanym id, jak nie znajdzie ustawić found na false, innaczej na true
    //trzeba też ustawić notatkę na znalezioną jeśli jest
  };
  return (
    <Box
      sx={{
        marginTop: "10vh",
        width: `calc(100% - ${drawerWidth}px - 20px)`,
        ml: `${drawerWidth + 10}px`,
      }}
    >
      <FormGroup onSubmit={findNote}>
        <FormLabel>Title</FormLabel>
        <Input
          sx={{ marginBottom: "20px" }}
          placeholder="Write here the note title"
        />
        <Input
          type="Submit"
          sx={{ textAlign: "center", alignItems: "center", width: "100px" }}
        />
      </FormGroup>
      {found ? (
        <Note title={note.title} content={note.content} />
      ) : (
        <div>Nie znaleziono notatki o zadanym id</div>
      )}
    </Box>
  );
}
