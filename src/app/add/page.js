"use client";

import { FormLabel, Input, FormGroup, Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const drawerWidth = 240;

export default function AddForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const group = urlParams.get("group") || "";
  const router = useRouter();

  const add = async (e) => {
    e.preventDefault();

    try {
      if (title === "" || group === "") {
        setErrorMsg("Title and group are required.");
        console.error("Title and group are required.");
        return;
      }
      console.log(group);
      const addedObject = {
        title: title,
        content: content,
        userId: group,
      };

      await axios.post("http://localhost:8080/notes", addedObject);

      router.push(group ? `/notes?group=${group}` : "/notes");
    } catch (error) {
      setErrorMsg("Error adding note:"+ error);
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
      <p name="ErrorMessage">
        {errorMsg}
      </p>
      <form onSubmit={add} sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel>Title</FormLabel>
        <Input
          name="Title"
          sx={{ marginBottom: "20px", width: "100%" }}
          placeholder="Write here the note title"
          onChange={(e) => setTitle(e.target.value)}
          className="t3sel-add-note-title-input"
        />
        <FormLabel>Note</FormLabel>
        <Input
          name="Discription"
          multiline
          rows={4}
          sx={{ marginTop: "20px", width: "100%", height: "50px" }}
          placeholder="Write here your note"
          onChange={(e) => setContent(e.target.value)}
          className="t3sel-add-note-content-input"
        />
        <div>
          <Input
            name="Submit"
            type="Submit"
            sx={{ textAlign: "center", alignItems: "center" }}
            className="t3sel-add-note-submit"
          />
        </div>
      </form>
    </Box>
  );
}
