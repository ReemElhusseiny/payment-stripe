import { IoColorPaletteOutline } from "react-icons/io5";
import ColorCustomizerSidebar from '../Themes/SelectColor';
import { useContext, useState } from 'react';
import { ColorContext } from '../context/ColorContext';

// type Anchor = 'top' | 'left' | 'bottom' | 'right';

// export default function AnchorTemporaryDrawer({userColors, setUserColors}) {
//   const [state, setState] = React.useState({
//     right: false,
//   });

//   const toggleDrawer =
//     (anchor: Anchor, open: boolean) =>
//     (event: React.KeyboardEvent | React.MouseEvent) => {
//       if (
//         event.type === 'keydown' &&
//         ((event as React.KeyboardEvent).key === 'Tab' ||
//           (event as React.KeyboardEvent).key === 'Shift')
//       ) {
//         return;
//       }

//       setState({ ...state, [anchor]: open });
//     };

//   const list = (anchor: Anchor) => (
//     <SelectColor userColors={userColors} setUserColors={setUserColors} />
//     // <Box
//     // //   sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//     //   role="presentation"
//     //   onClick={toggleDrawer(anchor, false)}
//     //   onKeyDown={toggleDrawer(anchor, false)}
//     // >
//     //   <List>
//     //     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//     //       <ListItem key={text} disablePadding>
//     //         <ListItemButton>
//     //           <ListItemIcon>
//     //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//     //           </ListItemIcon>
//     //           <ListItemText primary={text} />
//     //         </ListItemButton>
//     //       </ListItem>
//     //     ))}
//     //   </List>
//     //   <Divider />
//     //   <List>
//     //     {['All mail', 'Trash', 'Spam'].map((text, index) => (
//     //       <ListItem key={text} disablePadding>
//     //         <ListItemButton>
//     //           <ListItemIcon>
//     //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//     //           </ListItemIcon>
//     //           <ListItemText primary={text} />
//     //         </ListItemButton>
//     //       </ListItem>
//     //     ))}
//     //   </List>
//     // </Box>
//   );

//   return (
//     <div>
//         <React.Fragment>
//             <div onClick={toggleDrawer('right', true)} style={{ color: '#425c5a',display: 'flex', alignItems: 'center', gap: '10px'}}>
//             <p>Theme Colors</p>
//             <IoColorPaletteOutline size={30} className="cursor-pointer" />
//             </div>
//           {/* <Button onClick={toggleDrawer('right', true)}>Right</Button> */}
//           <Drawer
//             anchor="right"
//             open={state.right}
//             onClose={toggleDrawer('right', false)}
//           >
//             {list('right')}
//           </Drawer>
//         </React.Fragment>
//     </div>
//   );
// }

export default function Color() {
      const colorContext = useContext(ColorContext);
  //// This line is important because when we define the context as:
  // export const ColorContext = createContext<ColorContextType | null>(null);
  // the context value can be null before it is provided by ColorProvider. Therefore, TypeScript requires us to handle the null case when consuming the context with useContext.
      if (!colorContext) {
    throw new Error("ColorContext is not available");
  }
    const {userColors, setUserColors} = colorContext;
   const [open, setOpen] = useState(false);

const handleToggle = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
  <>
        <button
        aria-label="Open color customizer"
        onClick={() => handleToggle(true)}
        className="text-black fixed right-0 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center justify-center gap-1 rounded-l-xl border border-r-0 border-border bg-white px-2 py-4 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-x-0.5 hover:-translate-y-1/2"
      >
        <IoColorPaletteOutline size={22} className="text-primary" />
        <span
          className="text-[10px] font-semibold tracking-wide text-muted-foreground"
          style={{ writingMode: "vertical-rl" }}
        >
          THEME
        </span>
      </button>
        <ColorCustomizerSidebar userColors={userColors} setUserColors={setUserColors} toggleDrawer={handleToggle} open={open} />
 </>
  );
}

// function useContext(ColorContext: any) {
//   throw new Error('Function not implemented.');
// }
