"use client";

import { Box, Button } from "@mui/material";
import Note from "@/Components/note";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const drawerWidth = 240;

export default function ViewGroupsNotes() {
  const [notesLocal, setNotes] = useState([]);
  const router = useRouter();
  const urlParams = useSearchParams();
  const groups = urlParams.get("group") || undefined;

  useEffect(() => {
    console.log(groups);
    const fetchNotes = async () => {
      try {
        let response;

        if (groups != undefined) {
          response = await axios.get(
            `http://localhost:8080/notes/user/${groups}`
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
  }, [groups]);

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
        sx={{ display: groups === undefined ? "none" : "block" }}
        variant="contained"
        onClick={() => router.push(`/add?group=${groups}`)}
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
