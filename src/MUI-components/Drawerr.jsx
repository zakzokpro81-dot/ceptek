import {
    Drawer,
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    
} from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
export function Drawerr({ drawerWidth }) {

    const navigate = useNavigate()
    return (
        <Drawer
            sx={{
                width: `${drawerWidth}px`,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: `${drawerWidth}px`,
                    boxSizing: "border-box",
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{
                        navigate("/")
                    }}>
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Depo" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{
                        navigate("/create")
                    }}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ekle" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
