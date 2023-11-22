import { FormLabel, Input, FormGroup, Box } from "@mui/material";

const drawerWidth = 240;

export default function AddForm() {
  return (
    <Box
      sx={{
        marginTop: "10vh",
        width: `calc(100% - ${drawerWidth}px - 20px)`,
        ml: `${drawerWidth + 10}px`,
      }}
    >
      <FormGroup>
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
