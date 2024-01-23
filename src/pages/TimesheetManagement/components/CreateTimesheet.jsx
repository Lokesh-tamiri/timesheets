import React, { useCallback, useState } from 'react'
import { styles } from '../../../styles'
import { Box, Modal } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
const CreateTimesheet = () => {
  const [open,setOpen] = useState(false)
  const handleClose = useCallback(()=>{
    setOpen(false)
  },[])
  const handleOpen = useCallback(()=>{
    setOpen(true)
  },[])
  const INITIAL_VALUES = {
    "project_id": "",
    "module_worked": "",
    "hours_spent": "",
    "task_completed": "",
    "task_pending": "",
    "date": ""
  }

  const VALIDATION_SCHEMA = Yup.object().shape({
    project_id:Yup.number("Please enter only numbers").required("Project Id is required"),
    module_worked:Yup.string().required("Module is required"),
    hours_spent:Yup.number("Please enter only numbers").required("Hours Spent Id is required"),
    task_completed:Yup.string().required("Task Completed is required"),
    task_pending:Yup.string().required("Task pending is required"),
    date:Yup.date().required("Please select date")

  })
  return (
    <div>
      <button className={styles.primaryBtn} onClick={handleOpen}>Create Timesheet</button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalStyle}>
          <Formik>
            <Form></Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateTimesheet
