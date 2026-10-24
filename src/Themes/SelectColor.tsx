import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Circle from "@uiw/react-color-circle";
import { useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const PRIMARY_PRESETS = [
  "#5c6bc0", "#8e24aa", "#1e88e5", "#00acc1",
  "#00897b", "#43a047", "#2e7d32", "#7cb342",
  "#ffb300", "#f4511e", "#e53935", "#d81b60",
  "#c2185b", "#546e7a", "#37474f", "#000000",
];

const SECONDARY_PRESETS = [
  "#f1f5f9", "#e2e8f0", "#f5f5f4", "#ede9fe",
  "#e0f2fe", "#d1fae5", "#fee2e2", "#fef9c3",
  "#fce7f3", "#bfdbfe", "#fef3c7", "#cbd5e1",
  "#334155", "#1e3a5f", "#14532d", "#4c1d95",
];

interface ColorSectionProps {
  label: string;
  presets: string[];
  color: string;
  onChange: (hex: string) => void;
}

function ColorSection({ label, presets, color, onChange }: ColorSectionProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Typography sx={{ fontWeight: 800 }} variant="body2">
        {label}
      </Typography>

      {/* Preset circles */}
      <Circle
        colors={presets}
        color={color}
        pointProps={{
          style: { marginRight: "10px", marginBottom: "10px" },
        }}
        onChange={(c) => onChange(c.hex)}
      />

      {/* Custom color picker */}
      <div className="flex flex-col gap-2 mt-1">
        <Typography 
          variant="caption" 
          className="font-semibold text-muted-foreground uppercase tracking-wide"
        >
          Custom Color
        </Typography>
<div className="flex items-center gap-2">
        {/* Swatch toggle */}
        <div className="relative">
          <div
            onClick={() => setPickerOpen((v) => !v)}
            className="h-10 w-10 rounded-md border-4 border-white cursor-pointer shadow-sm transition-transform hover:scale-105"
            style={{ backgroundColor: color }}
          />
          {pickerOpen && (
            <>
              {/* backdrop to close */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setPickerOpen(false)}
              />
              <div className="absolute left-0 top-12 z-20 rounded-xl border border-border bg-white p-3 shadow-xl">
                <HexColorPicker color={color} onChange={onChange} />
              </div>
            </>
          )}
        </div>

        {/* Hex input */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 w-36 focus-within:bg-background focus-within:border-primary transition-all">
          <span className="text-muted-foreground font-medium text-sm">#</span>
          <HexColorInput
            color={color}
            onChange={onChange}
            className="w-full bg-transparent text-sm text-foreground outline-none font-mono uppercase"
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default function ColorCustomizerSidebar({toggleDrawer, userColors, setUserColors, open}: any) {
  console.log('User Colors in Sidebar:', open);
   const handleResetColors = () => {
    localStorage.getItem('primary') ;
    localStorage.getItem('secondary');
    setUserColors({ primary: localStorage.getItem('primary'), secondary: localStorage.getItem('secondary') });
  }
  return (
    <>
      {/* الـ Sidebar باستخدام MUI Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {toggleDrawer(false)
           handleResetColors()}}
        // تخصيص الـ Styles الخاصة بـ MUI لتطابق كلاسات التايلويند والـ عرض المطلوب
        slotProps={{
          paper: {
            className: "w-[400px] h-full overflow-y-auto p-0 bg-white border-l border-border flex flex-col gap-4 p-0",
          }
        }}
        // className="w-80 overflow-y-auto p-0 sm:max-w-xs bg-background border-l border-border"
    sx={{ 
  '& .MuiDrawer-paper': { 
    width: { xs: 320, sm: 350, md: 400 } 
  } 
}}
      >
        {/* Header */}
        <Box 
        className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-5 py-4"
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: userColors.primary }}
            >
              <IoColorPaletteOutline
                size={18}
                style={{ color: isLightHex(userColors.primary) ? "#111" : "#fff" }}
              />
            </div>
            <Typography variant="h6" className="text-base font-semibold text-foreground">
              Color Theme
            </Typography>
          </div>
          
          <Button
            onClick={handleResetColors}
            variant="text"
            size="small"
            startIcon={<RotateLeftIcon />}
            sx={{ color: userColors.primary }}
            // className={`text-xs transition-colors hover:bg-muted capitalize min-w-0 px-2`}
            title="Reset to defaults"
          >
          Reset
          </Button>
        </Box>

        {/* Body */}
        <div className="h-full flex flex-col gap-5 align-betwween p-5">
          {/* Live preview */}
          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <div className="p-4" style={{ backgroundColor: userColors.primary }}>
              <Typography
                variant="body2"
                className="font-semibold"
                style={{ color: isLightHex(userColors.primary) ? "#111827" : "#F9FAFB" }}
              >
                Primary
              </Typography>
              <Typography
                variant="caption"
                className="font-mono opacity-75 block"
                style={{ color: isLightHex(userColors.primary) ? "#374151" : "#D1D5DB" }}
              >
                {userColors.primary}
              </Typography>
            </div>
            
            <div className="p-4" style={{ backgroundColor: userColors.secondary }}>
              <Typography
                variant="body2"
                className="font-semibold"
                style={{ color: isLightHex(userColors.secondary) ? "#111827" : "#F9FAFB" }}
              >
                Secondary
              </Typography>
              <Typography
                variant="caption"
                className="font-mono opacity-75 block"
                style={{ color: isLightHex(userColors.secondary) ? "#374151" : "#D1D5DB" }}
              >
                {userColors.secondary}
              </Typography>
            </div>
          </div>

          <Divider className="border-border" />

          {/* Primary Section */}
          <ColorSection
            label="Primary Color"
            presets={PRIMARY_PRESETS}
            color={userColors.primary}
            onChange={(color)=> { setUserColors({ ...userColors, primary: color }); }}
          />

          <Divider className="border-border" />

          {/* Secondary Section */}
          <ColorSection
            label="Secondary Color"
            presets={SECONDARY_PRESETS}
            color={userColors.secondary}
            onChange={(color)=> { setUserColors({ ...userColors, secondary: color }); }}
          />
        </div>  
        <Box 
    className="sticky bottom-0 bg-white border-t border-border p-4 flex flex-col"
    sx={{ zIndex: 10 }}
  >
    <Button
      fullWidth // بيفرد الزرار بعرض الـ Sidebar بشكل أشيك
      size="large"
      variant="contained"
      disableElevation
      className="hover:shadow-lg capitalize font-semibold py-2.5 rounded-xl"
      sx={{ 
        backgroundColor: userColors.primary, 
        color: userColors.secondary,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: userColors.primary,
          filter: "blur(0.5px) brightness(0.95)", // تأثير الـ blur الخفيف اللي طلبته
          opacity: 0.9
        }
      }}
      onClick={()=> {
        localStorage.setItem('primary', userColors.primary);
        localStorage.setItem('secondary', userColors.secondary);
        toggleDrawer(false);
      }}
    >
      Apply Theme
    </Button>
  </Box>
        {/* <Button
        className="hover:shadow-xl"
        sx={{ 
    backgroundColor: userColors.primary, 
    color: userColors.secondary,
    transition: "all 0.3s ease", // إضافة تدرج ناعم للأنميشن
  }}
        onClick={()=> {
          localStorage.setItem('primary', userColors.primary);
          localStorage.setItem('secondary', userColors.secondary);
          toggleDrawer(false);
        }}
        >Apply Theme</Button> */}
      </Drawer>
    </>
  );
}

function isLightHex(hex: string): boolean {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return false;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
}
// import Circle from '@uiw/react-color-circle';
// import { useState } from 'react';// نستخدم مربع الإدخال الذكي من المكتبة السابقة
// import { HexColorInput, HexColorPicker } from "react-colorful";
// import { IoColorPaletteOutline } from 'react-icons/io5';

// export default function SelectColor({ userColors, setUserColors }) {
  
//   const presetColors = [
//     "#5c6bc0", "#8e24aa", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#2e7d32", "#7cb342",
//     "#ffb300", "#f4511e", "#e53935", "#d81b60", "#c2185b", "#546e7a", "#37474f", "#000000"
//   ];
//  const [colorOpen, setColorOpen] = useState(false);
//   const handleColorChange = (hexColor) => {
//     setUserColors({ ...userColors, primary: hexColor });
//   };

//   return (
//     <div className="p-4 max-w-md flex flex-col gap-4">
//       <div className="flex items-center gap-2">
// <div className={`w-10 h-10 rounded-[5px] text-white flex items-center justify-center border border-gray-300 bg-[${userColors.primary}]`}>
//  <IoColorPaletteOutline size={30} className="cursor-pointer" />
// </div>
// <p className="text-gray-800 font-bold">Color Theme</p>
//       </div>
//       <p className="text-gray-800 font-bold">Primary Color</p>
      
//       {/* 1. الدوائر الجاهزة */}
//       <Circle
//         colors={presetColors}
//         color={userColors.primary}
//         pointProps={{
//           style: {
//             marginRight: '12px',
//             marginBottom: '12px',
//           }
//         }}
//         onChange={(color) => handleColorChange(color.hex)}
//       />

//       {/* 2. حقل إدخال كود الـ Hex (Custom Color) */}
//       <div className="flex flex-col gap-1.5 mt-2">
//         <label className="text-xs font-semibold text-gray-500">Custom Hex Code</label>
//            <div onClick={()=> setColorOpen(!colorOpen)} style={{ height: '100px', width: '100px', background: userColors.primary }} />
//          {colorOpen && <HexColorPicker
//             color={userColors.primary}
//             onChange={handleColorChange}
//             className="absolute z-10 mt-2"
//           />}
//         <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-32 bg-gray-50 focus-within:bg-white focus-within:border-blue-500 transition-all">
//           <span className="text-gray-400 font-medium">#</span>
//           <HexColorInput
//             color={userColors.primary}
//             onChange={handleColorChange}
//             className="w-full bg-transparent text-sm text-gray-800 outline-none font-mono uppercase"
//           />
//         </div>
//       </div>

//     </div>
//   );
// }