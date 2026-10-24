// import { Box, CssBaseline } from '@mui/material';
// import { Outlet } from "react-router-dom";
// import SidebarComponent from './Sidebar';
// import { FixedHeader } from './components/FixedHeader';
// import { useTheme } from '@mui/material/styles';

// const MainLayout = () => {
//   // const theme = useTheme();

//   return (
//     <Box className="w-full h-full" sx={{ padding: '10px 10px 0 0', display : 'flex' , flexDirection: 'column', height: '100vh',
//      background: '#F8FAFC',}}>
//      <CssBaseline />

// <Box className="w-full h-full relative md:flex md:gap-2 h-full w-full overflow-hidden"> 
  
//   <div className="absolute top-0 left-0 h-full z-10 md:relative md:z-0">
//     <SidebarComponent window={undefined} />
//   </div>

//   <div 
//     className="w-full h-full z-0 md:flex-1 transition-all duration-300"
//     style={{ 
//       boxSizing: 'border-box', 
//     }}
//   >
//     <Outlet />
//   </div>

// </Box>
     
//     </Box>
//   );
// };

// export default MainLayout;
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

/**
 * موبايل  : column → الـ AppBar فوق، والـ main تحته ياخد المتبقي
 * ديسكتوب : row    → الـ nav (260px) جنب الـ main
 */
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
        {/* الصفحة بتاخد المساحة كلها: h-full w-full في الـ root بتاعها */}
        <div className="w-full h-full">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default MainLayout;