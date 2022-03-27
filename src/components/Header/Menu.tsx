import { FC } from 'react'
import { Box, Divider, List, ListItem, ListItemText, ListItemIcon, SwipeableDrawer } from '@mui/material';
import { Chat, ExitToApp, Settings } from '@mui/icons-material';
import { IMenu } from '../../types/types';
import { Link } from 'react-router-dom'
import { useAuth } from '../../providers/useAuth';
import { signOut } from 'firebase/auth';
import { CHAT_ROUTE, SETTINGS_ROUTE } from '../../utils/conts';

export const Menu: FC<IMenu> = ({menuOpen, setMenuOpen}) => {

    const {ga} = useAuth()

    return (
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
                    <ListItem button component={Link} to={CHAT_ROUTE}>
                        <ListItemIcon>
                            <Chat />
                        </ListItemIcon>
                        <ListItemText>Chat</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to={SETTINGS_ROUTE}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={() => signOut(ga)}>
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            </Box>
        </SwipeableDrawer>
    )
}
