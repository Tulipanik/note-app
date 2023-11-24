import { FormLabel, Input, FormGroup, Box } from "@mui/material";

const drawerWidth = 240;

export default function AddForm() {
  const add = () => {
    //TODO
    //Tutaj dodanie notatki
    //jeżeli brak grupy w url (jeśli jest bierz z url)
    //nie ma możliwości dodawania bez wyboru grupy
    //usunę przycisk dodawania z wyświetl wszystkie po dodaniu api
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
