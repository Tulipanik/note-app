"use client";

import { Box, Button } from "@mui/material";
import Note from "@/Components/note";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notesContext } from "@/Components/title";

const drawerWidth = 240;

export default function ViewGroupNotes() {
  const notes = useContext(notesContext);
  const [notesLocal, setNotes] = useState([{ title: "Siema", content: "elo" }]);
  const router = useRouter();
  const group = window.location.search.split("=")[1];

  useEffect(() => {
    //TODO
    //Tutaj musisz zmapować (funkcja map) wszystkie
    // notatki na te zgodne z grupą, musisz też sprawdzić,
    // czy grupa istnieje, jeśli nie to wyświetlasz wszystkie
    // jeśli nie ma grupy w url to bierz z notatki (pokazywanie id jeszcze dorobię po api)
    setNotes([{ title: "Siema", content: "elo" }]);
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
        {notesLocal.map((note, key) => (
          <Note key={key} title={note.title} content={note.content} />
        ))}
      </Box>
    </Box>
  );
}
