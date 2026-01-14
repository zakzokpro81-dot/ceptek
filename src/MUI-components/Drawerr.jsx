import {
    Drawer,

    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    IconButton,

} from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from "react-router-dom";
import { Brightness7, Brightness4 } from "@mui/icons-material";
export function Drawerr({ drawerWidth, hideDrawer, setMode, displayDrawer,
    drawerType }) {
    const currentPath = useLocation()
    const theme = useTheme()
    const navigate = useNavigate()

    const drawerList = [
        { text: "Depo", icone: <StoreIcon />, path: "/" },
        { text: "Ekle", icone: <AddIcon />, path: "/create" },
    ]

    return (
        <Drawer
            sx={{
                display: { xs: displayDrawer, sm: displayDrawer, md: "block" },
                width: `${drawerWidth}px`,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: `${drawerWidth}px`,
                    boxSizing: "border-box",
                },
            }}
            variant={drawerType}
            open={true}
            anchor="left"
            onClose={() => {
                hideDrawer()
            }}
        >


            <List>
                <ListItem disablePadding
                    sx={{ display: "flex", justifyContent: "center", mb: "14px" }}>
                    <IconButton variant="contained" color="primary"
                        onClick={() => {

                            setMode(theme.palette.mode === "light" ? "dark" : "light")
                            localStorage.setItem("currentMode", theme.palette.mode === "light" ? "dark" : "light")
                        }}>
                        {theme.palette.mode === "light" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>


                </ListItem>
                <Divider />

                {drawerList.map((item) => {

                    return (
                        <ListItem disablePadding
                            sx={{ bgcolor: currentPath.pathname === item.path ? theme.palette.favColor.main : null }}>
                            <ListItemButton onClick={() => {
                                navigate(item.path)
                            }}>
                                <ListItemIcon>
                                    {item.icone}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}

               

            </List>
        </Drawer>
    );
}
