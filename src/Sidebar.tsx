// import React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import { dashboardRoutes } from './MenuItems';
// import { NavLink } from 'react-router-dom';
// import useUserStore from './Store/AuthStore';

// const drawerWidth = 260;

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function ResponsiveDrawer(props: { window: any; }) {
//   const {user} = useUserStore()
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [isClosing, setIsClosing] = React.useState(false);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <div className="w-full flex flex-col h-full justify-between bg-white border-r border-gray-100 p-4">
//       <div>
//         <div className="flex items-center gap-3 px-2 py-4">
//           <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
//             📊
//           </div>
//           <div>
//             <Typography variant="subtitle1" className="font-bold text-gray-900 leading-tight">
//               LedgerFlow
//             </Typography>
//             <Typography variant="caption" className="text-gray-400">
//               Accounting workspace
//             </Typography>
//           </div>
//         </div>

//         <Divider className="my-2" />
//  <List className="space-y-1">
//   {dashboardRoutes
//     ?.filter((item) => item.showInSidebar)
//     .map((item) => {
//       return (
//       <ListItem key={item.title} disablePadding className="mb-1">
//   <ListItemButton
//     component={NavLink}
//     to={item.path}
//     sx={{
//   borderRadius: '12px',
//   py: 1.2,
//   color: '#4b5563',
//   '& .nav-icon': { color: '#6b7280' },
//   '&:hover': { backgroundColor: '#f9fafb' },

//   '&.active': {
//     backgroundColor: '#4f46e5',
//     color: '#fff',
//     boxShadow: '0 10px 15px -3px rgb(199 210 254)',
//     '& .nav-icon': { color: '#fff' },
//   },
//   '&.active:hover': { backgroundColor: '#4338ca' },
// }}

//   >
//     <ListItemIcon className="nav-icon" sx={{ minWidth: '40px', color: 'inherit' }}>
//       {item.icon || <FolderOutlinedIcon />}
//     </ListItemIcon>
//     <ListItemText
//       primary={<span className="font-medium text-sm">{item.title}</span>}
//     />
//   </ListItemButton>
// </ListItem>
//       );
//     })}
// </List>

//       </div>

//       {/* User Profile at Bottom */}
//       <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
//               alt="Maya Ibrahim"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <Typography variant="body2" className="font-bold text-gray-800 text-xs">
//             {user?.firstName && user?.lastName 
//     ? `${user.firstName} ${user.lastName}` 
//     : "Your Name"}
//             </Typography>
//             <Typography variant="caption" className="text-gray-400 text-[10px]">
//               Finance lead
//             </Typography>
//           </div>
//         </div>
//         <IconButton size="small" className="text-gray-500">
//           <SettingsOutlinedIcon fontSize="small" />
//         </IconButton>
//       </div>
//     </div>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ width: '100%', display: 'flex', backgroundColor: '#f8fafc', height: '100vh' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//           backgroundColor: '#ffffff',
//           borderBottom: '1px solid #f1f5f9',
//           color: 'black',
//         }}
//       >
//         <Toolbar className="w-full flex justify-between">
//           <div className="w-full flex justify-between gap-3">
//             <div className="flex items-center gap-2 sm:hidden">
//               <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
//                 📊
//               </div>
//               <span className="font-bold text-gray-900 text-sm">LedgerFlow</span>
//             </div>
//                <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: 'none' } }}
//             >
//               <MenuIcon />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           slotProps={{
//             root: {
//               keepMounted: true,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #f1f5f9' },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
     
//     </Box>
//   );
// }

// ResponsiveDrawer.propTypes = {
//   window: PropTypes.func,
// };

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarContent from './SidebarContent';

export const DRAWER_WIDTH = 260;

/**
 * بيرجّع عنصرين (Fragment) عشان يبقوا flex items مباشرة جوه MainLayout:
 *  1) AppBar  → موبايل فقط، static (بياخد مكانه في الـ flow، فمفيش حاجة تتغطى)
 *  2) nav     → ديسكتوب فقط بيحجز 260px، وعلى الموبايل فيه الـ Drawer المؤقت (overlay)
 */
export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeDrawer = () => setMobileOpen(false);

  return (
    <>
      {/* ===== Mobile top bar ===== */}
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