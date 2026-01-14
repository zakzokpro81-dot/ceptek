import { Outlet } from "react-router-dom";

import { Appbar } from "../MUI-components/Appbar";
import { Drawerr } from "../MUI-components/Drawerr";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import { grey, teal } from "@mui/material/colors";
export function Root() {
    const [displayDrawer, setDisplayDrawer] = useState("none")
    const [drawerType, setDrawerType] = useState("permanent")
    const [mode, setMode] = useState(localStorage.getItem("currentMode") === null ? "light"
        : localStorage.getItem("currentMode") === "light" ? "light" : "dark"

    )
    function showDrawer() {
        setDrawerType("temporary")
        setDisplayDrawer("block")

    }

    function hideDrawer() {
        setDrawerType("permanent")
        setDisplayDrawer("none")

    }
    const darkTheme = createTheme({
        palette: {
            // @ts-ignore
            mode,
            ...(mode === "light"
                ? {
                    // palette values for light mode
                    ali: {
                        main: "#64748B",
                    },

                    favColor: {
                        main: grey[300],
                    },
                }
                : {
                    // palette values for dark mode
                    ali: {
                        main: teal[500],
                    },

                    favColor: {
                        main: grey[800],
                    },
                }),
        },
    });



    const drawerWidth = 240;
    return (

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div>
                <Appbar

                    showDrawer={showDrawer}
                    drawerWidth={drawerWidth}

                />

                <Drawerr drawerWidth={drawerWidth}
                    setMode={setMode}
                    hideDrawer={hideDrawer}
                    displayDrawer={displayDrawer}
                    drawerType={drawerType} />
                <Box sx={{ ml: { md: `${drawerWidth}px` }, display: "flex", justifyContent: "center" }}>

                    <Outlet />
                </Box>

            </div>
        </ThemeProvider>



    );
}
