import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function HeaderBar() {
  return (
    <AppBar position="static" sx={{ width: "auto" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WP Music
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
