import { useContext } from "react";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { UIContext } from "../../context/ui";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h6">NextJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
