import * as React from 'react';
import { Modal, Divider, Box } from '@mui/material';
import { cloneElement, isValidElement } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type ModalCompProps = {
  label: string;
  children?: React.ReactNode;
  sx?: object;
  renderTitle?: (props: { handleOpen: () => void }) => React.ReactNode;
};

type ModalChildProps = {
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export default function ModalComp({ label, children, sx, renderTitle }: ModalCompProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const mergedSx = { ...style, ...sx };

  return (
    <div>
      {typeof renderTitle === 'function'
        ? renderTitle({ handleOpen })
        : null}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={mergedSx}>
          <div className="flex items-center justify-between">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h1"
              className="text-[20px] font-medium font-[Tajawal]"
            >
              {label}
            </Typography>

            <IoIosCloseCircleOutline size="24px" onClick={handleClose} className="cursor-pointer" />
          </div>
          <Divider className="my-[10px]" />
          {isValidElement<ModalChildProps>(children)
            ? cloneElement(children, { handleClose, setOpen, open })
            : children}
        </Box>
      </Modal>
    </div>
  );
}
