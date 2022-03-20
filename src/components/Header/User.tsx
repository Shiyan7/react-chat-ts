import React, { FC, useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material'
import { Settings, Logout } from '@mui/icons-material'

export const User: FC = () => {
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);
  const open = Boolean(menuOpen);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setMenuOpen(e.currentTarget);
  };
  const handleClose = () => {
    setMenuOpen(null);
  };
  
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginLeft: 'auto' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{width: 30, height: 30}} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={menuOpen}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}