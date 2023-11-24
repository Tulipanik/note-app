"use client"

import { FormLabel, Input, FormGroup, Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const drawerWidth = 240;

export default function AddForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [group, setGroup] = useState("");
  const router = useRouter();

  const add = async () => {
    //TODO
    //Tutaj dodanie notatki
    //jeżeli brak grupy w url (jeśli jest bierz z url)
    //nie ma możliwości dodawania bez wyboru grupy
    //usunę przycisk dodawania z wyświetl wszystkie po dodaniu api

    try {
      if (title.trim() === "" || group.trim() === "") {
        console.error("Title and group are required.");
        return;
      }

      await axios.post("http://localhost:8080/notes", {
        title: title,
        content: content,
        group: group,
      });

      router.push(group ? `/notes?group=${group}` : "/notes");
    } catch (error) {
      console.error("Error adding note:", error);
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
      <FormGroup onSubmit={add}>
        <FormLabel>Title</FormLabel>
        <Input
          sx={{ marginBottom: "20px" }}
          placeholder="Write here the note title"
        />
        <FormLabel>Note</FormLabel>
        <Input
          multiline
          rows={4}
          sx={{ marginTop: "20px", width: "100", height: "50px" }}
          placeholder="Write here your note"
        />
        <div>
          <Input
            type="Submit"
            sx={{ textAlign: "center", alignItems: "center" }}
          />
        </div>
      </FormGroup>
    </Box>
  );
}
