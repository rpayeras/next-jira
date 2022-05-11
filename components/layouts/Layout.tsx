import { FC, useContext } from "react";
import { Box } from "@mui/material";
import Head from "next/head";

import { Navbar, Sidebar } from "../ui";

interface Props {
  title?: string;
  children: JSX.Element;
}

import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../../themes";
import { UIContext } from "../../context/ui";

export const Layout: FC<Props> = ({ title = "Next Jira", children }) => {
  const { darkMode } = useContext(UIContext);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <Box sx={{ flexFlow: 1 }}>
          <Head>
            <title>{title}</title>
          </Head>

          <Navbar />
          <Sidebar />

          <Box sx={{ padding: "10px 20px" }}>{children}</Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};
