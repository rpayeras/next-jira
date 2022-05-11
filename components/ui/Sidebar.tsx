import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useContext } from "react";
import { UIContext } from "../../context/ui";
import Link from "next/link";

const menuItems = [
  {
    label: "Home",
    path: "/",
    icon: "home",
  },
];

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>
        <List>
          {menuItems.map(({ label, path }, index) => (
            <Link href={path} key={label}>
              <ListItem button>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
