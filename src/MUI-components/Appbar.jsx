
import { AppBar, Toolbar, Typography, Button, Avatar, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
export function Appbar({ drawerWidth, showDrawer }) {
    return (

        <AppBar

            sx={{ ml: { md: `${drawerWidth}px` }, width: { md: `calc( 100% - ${drawerWidth}px)` } }}
            position="static"
        >

            <Toolbar>
                <IconButton color="inherit" sx={{ mr:"9px", display: { md: "none" } }}
                    onClick={() => {
                        showDrawer()
                    }}  >
                    <MenuIcon />

                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, ":hover": { fontSize: "22px" } }}
                >
                    CepTek
                </Typography>
                <Button sx={{ mr: 1 }} color="inherit">
                    Login
                </Button>
                <Avatar></Avatar>
            </Toolbar>
        </AppBar>
    )
}