import React from 'react'
// import { FcGoogle } from 'react-icons/fc'
// import { AiFillFacebook } from 'react-icons/ai'
import { Formik, Form } from 'formik'
import loginImg from '../assets/login.jpg'
import * as Yup from 'yup'
import TextField from '../components/Forms/TextField'
import { Grid } from '@mui/material'
export default function Login({handleLogin}) {

    const INITIAL_FORM_STATE = {
        username: "",
        password: ""
    }

    const FORM_VALIDATION = Yup.object().shape({
        username: Yup.string().email("Invalid Email").required("Please enter username"),
        password: Yup.string().required("Please enter password"),
    })
    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute w-full h-full object-cover mix-blend-overlay' src={loginImg} alt="/" />


            <div className='flex justify-center items-center h-full'>
                <Formik
                    initialValues={INITIAL_FORM_STATE}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={values => {
                        handleLogin(values)
                    }}
                >
                    <Form className='max-w-[400px] w-full mx-auto bg-white p-8'>
                        <h2 className='text-4xl font-bold text-center py-4'>Sempione</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="username"
                                    label="Username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                        <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' type='submit'>Sign In</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}