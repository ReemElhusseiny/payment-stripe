import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarContent from './SidebarContent';

export const DRAWER_WIDTH = 260;


export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeDrawer = () => setMobileOpen(false);

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          display: { xs: 'block', sm: 'none' },
          flexShrink: 0,
          backgroundColor: '#fff',
          color: 'black',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">
              📊
            </div>
            <span className="font-bold text-gray-900 text-sm">LedgerFlow</span>
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ===== Drawers ===== */}
      <Box
        component="nav"
        aria-label="main navigation"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={closeDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          <SidebarContent onNavigate={closeDrawer} />
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid #f1f5f9',
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      </Box>
    </>
  );
}