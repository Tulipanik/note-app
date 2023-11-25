import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const drawerWidth = 240;

export default function ZoomedNote(params) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const group = urlParams.get("group") || "";
  const [newTitle, setNewTitle] = useState(params.title);
  const [newContent, setNewContent] = useState(params.content);

  const updateNote = async () => {
    try {
      console.log(newContent);
      const updatedNote = {
        id: params.id,
        title: newTitle,
        content: newContent,
        userId: group,
      };

      await axios.put(`http://localhost:8080/notes/${params.id}`, updatedNote);

      params.setZoom(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async () => {
    try {
      await axios.delete(`http://localhost:8080/notes/${params.id}`);
      params.setZoom(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: `calc(100% - ${drawerWidth}px)`,
        height: "100vh",
        top: 0,
        ml: `${drawerWidth}px`,
        right: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 60,
          right: 10,
          cursor: "pointer",
          zIndex: 4,
          color: "white",
          fontSize: "2rem",
        }}
        onClick={() => params.setZoom(false)}
      >
        <img src="/x-mark.png" style={{ width: "20px" }} />
      </Box>
      <Box
        sx={{
          backgroundColor: "yellow",
          width: "40vw",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <TextField
          label="Title"
          variant="standard"
          defaultValue={params.title}
          InputProps={{ style: { fontWeight: "bold" } }}
          sx={{ marginTop: "10px" }}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          multiline
          rows={10}
          label="Content"
          variant="standard"
          defaultValue={params.content}
          sx={{ marginTop: "20px" }}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <Box>id: {params.id}</Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          onClick={updateNote}
          sx={{ margin: "20px" }}
          variant="contained"
        >
          Update note
        </Button>
        <Button onClick={deleteNote} sx={{ margin: "20px" }} variant="outlined">
          Delete note
        </Button>
      </Box>
    </Box>
  );
}
