import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import {FC} from 'react'
import MenuIcon from '@mui/icons-material/Menu';

export const Header: FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 3 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' fontWeight='600' fontSize='20px' textTransform='uppercase' color='inherit' component='div'>
          Chat
        </Typography>
      </Toolbar>
    </AppBar>
  )
}