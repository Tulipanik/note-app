import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const drawerWidth = 240;

export default function ZoomedNote(params) {
  const updateNote = async () => {
    try {
      const updatedNote = {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
      };

      await axios.put(`http://localhost:8080/notes/${params.id}`, updatedNote);

      params.setZoom(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
    //TODO
    //Musisz wziąć dane z formularza i wysłać je do update'u
    //grupę bierzesz z url, jak z wyświetl wszystkie to będzie dodana grupa na notatce (na razie brak)
  };

  const deleteNote = async () => {
    try {
      await axios.delete(`http://localhost:8080/notes/${params.id}`);
      params.setZoom(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    //TODO
    //Musisz napisać usuwanie notatki w bazie, i jak sukces ustawienie zmiennej zoom na false
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
          height: "40vh",
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
        />
        <TextField
          multiline
          rows={12}
          label="Content"
          variant="standard"
          defaultValue={params.content}
          sx={{ marginTop: "20px" }}
        />
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
