import {AppBar, List, ListItem, Box, IconButton, Toolbar, Typography, SwipeableDrawer} from '@mui/material'
import {FC, useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {User} from './User';
import {ToggleColorMode} from './ToggleColorMode';

export const Header: FC = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <AppBar color='primary' position='static'>
            <Toolbar variant='regular'>
                <IconButton onClick={() => setMenuOpen(true)} edge='start' color="inherit" aria-label="menu"
                            sx={{mr: 2}}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant='h6' fontWeight='600' fontSize='17px' color='inherit' component='div'>
                    Chat App
                </Typography>
                <User/>
                <ToggleColorMode/>
            </Toolbar>

            <SwipeableDrawer
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                onOpen={() => setMenuOpen(true)}
            >
                <Box
                    sx={{width: 250}}
                    onClick={() => setMenuOpen(false)}
                    onKeyDown={() => setMenuOpen(false)}
                >
                    <List>
                        <ListItem>
                        </ListItem>
                    </List>
                </Box>
            </SwipeableDrawer>
        </AppBar>
    )
}