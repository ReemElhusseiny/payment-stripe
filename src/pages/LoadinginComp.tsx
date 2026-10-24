import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@emotion/react';

export default function LoadinginComp() {
    const theme = useTheme();
  return (
    <div
      // تم تغيير h-full لـ h-[70vh] أو min-h-[60vh] ليأخذ ارتفاع كافي في منتصف الشاشة عمودياً
      className="w-full min-h-[70vh] flex flex-col items-center justify-center p-24"
    >
      <LinearProgress className="w-192 sm:w-120 max-w-full rounded-2" sx={{
          backgroundColor: `${theme?.colors.primary}22`, // لون الخلفية الباهت للبار (شفافية 20%)
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme?.colors.primary,    // لون الخط المتحرك الأساسي
          }
        }} />
      <Typography className="text-xl sm:text-2xl mb-16" sx={{color:  theme?.colors.primary, fontWeight: 600}}>
        Loading...
      </Typography>
    </div> 
  );
}
// {/* <Box 
//       sx={{ 
//         width: '100%', 
//         height: '100%',             //  عشان يسنتر عمودياً في نص الشاشة بالكامل
//         display: 'flex', 
//         flexDirection: 'column', 
//         alignItems: 'center',        //  تم تصحيح الكلمة هنا من cenetr إلى center
//         justifyContent: 'center', 
//         gap: 2                       //  بيعمل مسافة حلوة بين البار والكلام
//       }}
//     >
//       <LinearProgress aria-label="Loading…" sx={{ width: '50%', maxWidth: '300px' }} />
//       <h3>Loading....</h3>
//     </Box> */}
//   );
// }