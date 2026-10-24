/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputAdornment, TextField } from "@mui/material"
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import type {
  FieldError,
  FieldErrorsImpl,
  Merge
} from "react-hook-form";

interface TextProps {
  onChangefunc: () => void;
  onBlurfunc: () => void;
  value: string | number;
  index?: number;
  errorsName: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  sx?: SxProps<Theme>;
  placeholderText?: string;
  icon?: ReactNode;
  type?: string;
}

export function TextComp({ 
  onChangefunc, 
  onBlurfunc, 
  value, 
  placeholderText, 
  index, 
  errorsName, 
  sx, 
  icon, 
  type 
}: TextProps) {
  return (
    <>
    <TextField
      fullWidth
      type={type || "text"}
      id="outlined-basic"
      variant="outlined"
      onChange={onChangefunc}
      onBlur={onBlurfunc}
      value={value ?? ''}
      disabled={index === 0}
      placeholder={placeholderText}
      error={!!errorsName} 
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          width: '100%',
          height: '40px',
          borderRadius: '5px',
          backgroundColor: '#f8fafc',
          '& fieldset': { 
            border: errorsName ? '1px solid #d32f2f' : 'none' 
          },
          '&:hover fieldset': { 
            border: errorsName ? '1px solid #d32f2f' : 'none' 
          },
          '&.Mui-focused fieldset': { 
            border: errorsName ? '2px solid #d32f2f' : 'none' 
          },
        },
        '& .MuiInputLabel-root': { lineHeight: '1.2em' },
        ...sx, // 💡 دمج الخصائص الخارجية مثل height أو borderRadius الجديدة
      }}
                        slotProps={{
    input: {
      startAdornment: (
        <InputAdornment 
          position="start" 
          sx={{ 
            width: '15%', 
            justifyContent: 'center',
            color: '#aaa',
            marginRight: '8px' // يضمن وجود مسافة بين الأيقونة والكتابة
          }}
        >
         {icon}
        </InputAdornment>
      ),
    }
  }}
                />
                
                {errorsName && (
                  <span style={{ 
                    color: '#d32f2f', 
                    fontSize: '0.75rem', 
                    paddingLeft: '1.2rem',
                    textAlign: 'left'
                  }}>
                    { errorsName?.message as string}
                  </span>
                )}
                </>
  
  )
  ;
}