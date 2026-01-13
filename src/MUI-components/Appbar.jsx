
import { AppBar,Toolbar,Typography,Button,Avatar } from "@mui/material"
export function Appbar({drawerWidth}){
    return(

          <AppBar
                   
                        sx={{ ml: `${drawerWidth}px`, width: `calc( 100% - ${drawerWidth}px)` }}
                        position="static"
                    >
                        <Toolbar>
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