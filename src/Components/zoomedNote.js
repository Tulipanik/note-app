import { Box, Button } from "@mui/material";

const drawerWidth = 240;

export default function ZoomedNote(params) {
  console.log("Siema");
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 60,
          right: 10,
          width: "10px",
          cursor: "pointer",
          zIndex: 4,
          color: "white",
          fontSize: "2rem",
        }}
      >
        <img src="/x-mark.png" />
      </Box>
      <Box
        sx={{
          backgroundColor: "yellow",
          height: "40vh",
          width: "40vw",
          textAlign: "center",
        }}
      >
        <h3>{params.title}</h3>
        <p>{params.content}</p>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button sx={{ margin: "20px" }} variant="contained">
          Update note
        </Button>
        <Button sx={{ margin: "20px" }} variant="outlined">
          Delete note
        </Button>
      </Box>
    </Box>
  );
}
