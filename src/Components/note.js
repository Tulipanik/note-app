import { Box } from "@mui/material";

export default function Note(params) {
  return (
    <Box
      sx={{
        backgroundColor: "yellow",
        width: "21vw",
        margin: "10px",
        display: "flex-box",
        textAlign: "center",
      }}
    >
      <h3 sx={{ display: "block" }}>{params.title}</h3>
      <p sx={{ display: "block" }}>{params.content}</p>
    </Box>
  );
}
