import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';

export default function LoadinginComp() {
    const theme = useTheme();
  return (
    <div
      className="w-full min-h-[70vh] flex flex-col items-center justify-center p-24"
    >
      <LinearProgress className="w-192 sm:w-120 max-w-full rounded-2" sx={{
          backgroundColor: `${theme?.colors.primary}22`,
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme?.colors.primary, 
          }
        }} />
      <Typography className="text-xl sm:text-2xl mb-16" sx={{color:  theme?.colors.primary, fontWeight: 600}}>
        Loading...
      </Typography>
    </div> 
  );
}