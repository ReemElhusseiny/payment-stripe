import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        height: '100vh',
        background: '#F8FAFC',
      }}
    >
      <CssBaseline />

      <Sidebar/>

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          overflow: 'auto',
          boxSizing: 'border-box',
          p: 2.5,
        }}
      >
        <div className="w-full h-full">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default MainLayout;