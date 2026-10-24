/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import useUserStore from '../Store/AuthStore';

export default function BasicMenu() {
  const theme = useTheme();
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const { logout } = useUserStore();
    const logoutHandler = async () => {
      await logout();
      handleClose();
    };

  return (
    <div>
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        className="flex justify-center items-center"
      >
<Avatar
  sx={{
    backgroundColor: theme.colors.primary,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    lineHeight: 1,
  }}
>
  R
</Avatar>
</Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
