import { Outlet } from "react-router-dom";

import { Appbar } from "../MUI-components/Appbar";
import { Drawerr } from "../MUI-components/Drawerr";
import { Box } from "@mui/material";

export function Root() {
    const drawerWidth = 240;
    return (
        <div>
            <Appbar drawerWidth={drawerWidth} />

            <Drawerr drawerWidth={drawerWidth} />
            <Box sx={{ml:`${drawerWidth}px` ,display:"flex",justifyContent:"center"}}>

            <Outlet />
            </Box>
         
        </div>
    );
}
