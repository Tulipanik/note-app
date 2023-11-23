"use client";

import { Box, Button } from "@mui/material";
import Note from "@/Components/note";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

export default function ViewGroupNotes() {
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  const group = window.location.search.split("=")[1];

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
        ml: `${drawerWidth}px`,
        right: 0,
      }}
    >
      <Button
        variant="contained"
        onClick={() => router.push(`/add?group=${group}`)}
      >
        Dodaj notatkę +
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {notes.map((note, key) => (
          <Note key={key} title={note.title} content={note.content} />
        ))}
      </Box>
    </Box>
  );
}
