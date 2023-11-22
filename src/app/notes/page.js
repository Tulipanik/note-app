"use client";

import { Box } from "@mui/material";
import Note from "@/Components/note";
import { useEffect, useState } from "react";

const drawerWidth = 240;

export default function ViewGroupNotes() {
  const [notes, setNotes] = useState([
    { title: "Siema", content: "elo" },
    { title: "Siema", content: "elo" },
    { title: "Siema", content: "elo" },
    { title: "Siema", content: "elo" },
    { title: "Siema", content: "elo" },
    { title: "Siema", content: "elo" },
  ]);

  useEffect(() => {
    setNotes([
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
      { title: "Siema", content: "elo" },
    ]);
  }, []);

  return (
    <Box
      sx={{
        marginTop: "10vh",
        width: `calc(100% - ${drawerWidth}px - 20px)`,
        ml: `${drawerWidth + 10}px`,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {notes.map((note, key) => (
        <Note key={key} title={note.title} content={note.content} />
      ))}
    </Box>
  );
}
