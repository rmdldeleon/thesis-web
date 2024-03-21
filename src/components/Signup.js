import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { z } from 'zod'

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';

import Swal from 'sweetalert2'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../css/index.css';

const schema = z.object({
    firstname: z.string()
})

const Signup = () => {
    const navigate = useNavigate();

    //forms
    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting}} = useForm();

    //useEffects
    useEffect(() => {
        
    }, []);

    // functions
    const onSubmit = async (data) => {
        try {
            data.Origin = "Website"
            data.Role = "User"
            data.AccountStatus = "Operational"

            // for when email is already taken
            let response = await axios.post('http://localhost:3001/signup', {data});

            if (response.data[0]) {
                setError("root", { message: "Email is already taken." });
            } else if(data.Password !== data.ConfirmPassword){
                setError("root", { message: "Password does not match" });
            } else {
                response = await axios.post('http://localhost:3001/signup/createAccount', {data});
                
                reset();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Account successfully created!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                });
            }

        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    const handleGoogleLogin = async (credentialResponse) => {
        try{
            const credentials = jwtDecode(credentialResponse.credential)
          
            const data = {
                email : credentials.email,
                password: null,
                expiration : credentials.exp,
                firstname : credentials.given_name,
                lastname : credentials.family_name,
                origin : "Google",
                role : "User",
                AccountStatus : "Operational"
            }

            // checks wheter email is already registered 
            let response = await axios.post('http://localhost:3001/signup', {data});
            
            if (!response.data[0]) { // no account yet, register the credentials
                let createdAccountResult = await axios.post('http://localhost:3001/signup/createAccount', {data});
                data.accountID = createdAccountResult.data.insertId;                
            } 

            // pass the user account details in json format
            const userDetails = JSON.stringify(data)
            sessionStorage.setItem('userDetails', userDetails);
            navigate('/analytics');
        }catch (error) {
          console.error('Error from handleGoogleLogin() function', error);
        }
    }

    // params
    const params = useParams()

    return (
        <main className="flex justify-center items-center h-screen bg-red-100">
            <div className=" flex flex-col bg-slate-100 min-w-[400px] min-h-[675px] shadow-md rounded-md">
                <section className="flex flex-col flex-[1.5] justify-center items-center gap-3">  
                    <h1 className="text-[1.5rem] font-bold">Create your account</h1>
                    <h3 className="text-sm">Already have an account? <Link to="/" className="text-blue-500">Login here!</Link></h3>
                </section>
                    
                <form className="relative flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <TextField type="email" label="Email" variant="outlined" sx={{ width: 3/4}} size="small" {...register('Email', { required: true })}/>
                    <TextField type="password" inputProps={{ minLength: 8 }} label="Password" variant="outlined" sx={{ width: 3/4}} size="small"  {...register('Password', { required: true})}/>
                    <TextField type="password" inputProps={{ minLength: 8 }} label="Confirm Password" variant="outlined" sx={{ width: 3/4}} size="small"  {...register('ConfirmPassword', { required: true})}/>
                    <TextField type="input" label="Firstname" variant="outlined" sx={{ width: 3/4}} size="small" {...register('Firstname', { required: true })} inputProps={{ pattern: "[A-Za-z\\s]+", title: "Only letters and spaces are allowed", required: true }}/>
                    <TextField type="input" label="Lastname" variant="outlined" sx={{ width: 3/4}} size="small" {...register('Lastname', { required: true })} inputProps={{ pattern: "[A-Za-z\\s]+", title: "Only letters and spaces are allowed", required: true }}/>

                    <Button disabled={isSubmitting} type="submit" variant="contained" sx={{width: 3/4, height:"40px"}}>{isSubmitting ? "Loading" : "Signup"}</Button>
                    <h3 className={`${errors.root ? 'block' : 'hidden'} text-red-500 font-bold h-2`}>{errors.root && errors.root.message}</h3>
                </form>

                <div className="h-[100px] flex justify-center items-center gap-5">
                    <div className=" bg-gray-400 h-[1px] w-[30%]"></div>
                    <h2 className="font-bold text-gray-500 text-md"> OR </h2>
                    <div className=" bg-gray-400 h-[1px] w-[30%]"> </div>
                </div>

                <section className="flex justify-center items-start flex-1">
                    <GoogleLogin 
                        onSuccess={handleGoogleLogin}

                        onError={() => {
                            console.log("Login Failed")
                        }}

                        width="300"  style={{ height: '100px' }}
                    />
                </section>
            </div>
        </main>
    );
}
 
export default Signup;
