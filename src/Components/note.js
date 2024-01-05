import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ZoomedNote from "@/Components/zoomedNote.js";

export default function Note(params) {
  const [zoom, setZoom] = useState(false);

  const zoomSetter = () => {
    setZoom((zoom) => !zoom);
  };

  return (
    <>
      {zoom && (
        <ZoomedNote
          title={params.title}
          content={params.content}
          id={params.id}
          userId={params.userId}
          setZoom={setZoom}
        />
      )}
      <Box
        name={params.title}
        onClick={zoomSetter}
        sx={{
          backgroundColor: "yellow",
          width: "21vw",
          margin: "10px",
          display: "flex-box",
          textAlign: "center",
        }}
      >
        <h3 sx={{ display: "block" }} className={"t3sel-note-title"}>{params.title}</h3>
        <p sx={{ display: "block" }} className={"t3sel-note-content"}>{params.content}</p>
      </Box>
    </>
  );
}
