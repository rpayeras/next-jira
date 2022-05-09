import { useContext } from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { UIContext } from "../../context/ui";
import Link from "next/link";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Link href="/" passHref>
          <MuiLink underline="none" color="white">
            <Typography variant="h6">NextJira</Typography>
          </MuiLink>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
