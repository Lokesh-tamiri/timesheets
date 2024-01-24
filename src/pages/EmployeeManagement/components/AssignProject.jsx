import React, { useCallback, useState } from "react";
import { styles } from "../../../styles";
import { Box, Modal } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";
const AssignProject = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <button
        className="w-full border-2 border-blue-700 text-blue-700 font-semibold text-md hover:bg-blue-100 w-full rounded-full h-9 flex items-center justify-center mt-1"
        onClick={handleOpen}
      >
        Assign Projects
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalStyle}>
          <Multiselect
            displayValue="name"
            onRemove={(e) => console.log(e)}
            onSelect={(e) => console.log(e)}
            // selectedValues={}
            options={[{name: 'Option 1', id: 1},{name: 'Option 2️', id: 2}]}
          />
        </Box>
      </Modal>
    </>
  );
};

export default AssignProject;
