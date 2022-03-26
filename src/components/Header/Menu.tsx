import { FC } from 'react'
import { Box, List, ListItem, SwipeableDrawer } from '@mui/material';
import { IMenu } from '../../types/types';

export const Menu: FC<IMenu> = ({menuOpen, setMenuOpen}) => {

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
                    <ListItem>
                    </ListItem>
                </List>
            </Box>
        </SwipeableDrawer>
    )
}
