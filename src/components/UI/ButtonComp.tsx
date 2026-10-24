import { Button } from "@mui/material";
import type { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

interface ButtonProps {
  fnc: () => void;
    className?: string;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
  icon?: ReactNode;
  name: string;
  disabledProp? : boolean;
}

export function ButtonComp({ fnc, sx, className, icon, name,disabledProp }: ButtonProps) {
  const theme = useTheme();

  return (
    <Button
      onClick={fnc}
      disabled={disabledProp}
      startIcon={icon}
      // style={{ background: theme.colors?.primary, ...style }}
       sx={{
    textTransform: 'none',
    minWidth: 'unset',
    borderRadius: '12px',
    px: 3,
    py: 1.25,
    color: '#fff',
    height: '40px',
    // backgroundColor: theme.colors?.primary,
  transition: "0.3s",
        "&:hover": {
          boxShadow: `0 4px 12px ${theme.colors?.secondary}40`,
          transform: "translateY(-2px)",
        },
    ...sx,
  }}
  className={className}
    >
      {name}
    </Button>
  );
}