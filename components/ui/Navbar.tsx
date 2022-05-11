import { useContext } from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NightsStayIcon from "@mui/icons-material/NightsStay";

import { UIContext } from "../../context/ui";
import Link from "next/link";

export const Navbar = () => {
  const { openSideMenu, toggleDarkMode } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar
        style={{ justifyContent: "space-between", alignItems: "middle" }}
      >
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Link href="/" passHref>
          <MuiLink underline="none" color="white">
            <Typography variant="h6">NextJira</Typography>
          </MuiLink>
        </Link>
        <IconButton size="large" edge="end" onClick={toggleDarkMode}>
          <NightsStayIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
