import React, { 
    createContext, useContext, useState, useEffect, useRef, Fragment
} from "react";


import { useParams, Link, useNavigate} from "react-router-dom";

import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

import { 
    Stack, InputLabel, MenuItem, FormControl, Select, ToggleButton, ToggleButtonGroup, TextField,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText, ListItemButton, List,
    Divider, AppBar, Toolbar, IconButton, Typography, CloseIcon, Slide, SearchIconWrapper, StyledInputBase,
    InputBase, InputAdornment
} from '@mui/material'

const About = ({display}) => {
    const navigate = useNavigate();

    // get the user details from login page
    const [userDetails, setUserDetails] = useState(JSON.parse(sessionStorage.getItem('userDetails')));

    const [selectedValue, setSelectedValue] = useState('');

    const formRef = useRef(null);

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const ContactEmail = e.target.elements.email.value;
        const Type = selectedValue
        const Message = e.target.elements.message.value;
        const AccountID = userDetails.AccountID
        const UserEmail = userDetails.Email
        const FullName = userDetails.Firstname + " " + userDetails.Lastname
        const Role = userDetails.Role
        
        const formData = {
            AccountID,
            UserEmail,
            FullName,
            Role,
            ContactEmail,
            Type,
            Message
        };
      
        emailjs.send('service_wrzvoe3', 'template_f9thhv8', formData, 'hC3yXmiRWMq_cihQI')
            .then((result) => {
                formRef.current.reset();
                setSelectedValue('')

                Swal.fire({
                    icon: 'success',
                    title: 'Feedback successfully sent!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                })  

                console.log('Email sent successfully:', result.text);
            })
            .catch((error) => {
              console.error('Error sending email:', error.text);
            }
        );   
    }

    return(
        <div className={`${display} h-full w-full rounded-ss-[8px] rounded-ee-[8px] bg-red-50`}>
            <main className="w-full h-full flex items-center justify-center px-[6%] gap-5">
                <section className="w-full h-full max-h-[75%]">
                    <div className="w-full h-full bg-gray-100 shadow3 rounded box-border flex flex-col">
                        <div className="flex items-center justify-center w-full min-h-[70px] bg-[#d8e4f2]">
                            <h1 className="text-[1.5rem] font-bold text-gray-800"> About</h1>
                        </div>

                        <div className="h-full w-full overflow-auto p-10 flex flex-col gap-10">
                            <div className="flex flex-col gap-5">
                                <h1 className='text-[1.3rem] font-bold'>About the system</h1>
                                
                                <div className='flex flex-col gap-2 text-justify leading-loose'>
                                    <li> This system/application is created in partial fulfillment of the course and thesis writing requirements in Computer Science A.Y 2023-2024. </li>
                                    <li> The thesis is entitled as "Investigating the Tradeoffs Between Read-Write Operations and Time-Space Complexity from Improving the Traversal Time of Index Based LinkedList by Adding Pivot Pointers"</li>
                                    <li> The goal of this thesis is to at the very least make a linear data structure that is more balance in terms of read-write complexity, or better yet, make a datastructure without much tradeoff.
                                    To achieve this, an algorithm is applied called 'Indexing' or applying pivot pointers to a linkedlist to have more starting point (whichever is closer to index). This enhances the read operations but has tradeoffs with read.


                                    </li>
                                    
                                    <li> This idea is brought by <a href="facebook.com" className="text-blue-700">Ralph Matthew De Leon</a>.</li>
                                </div >
                            </div>

                            <div className="flex flex-col gap-5">
                                <h1 className='text-[1.3rem] font-bold'>Developers</h1>
                                
                                <div className='flex flex-col gap-2 text-justify'>
                                <li> Ralph Matthew De Leon ( 
                                    <a href="facebook.com" className="text-blue-700"> GitHub </a>, 
                                    <a href="facebook.com" className="text-blue-700"> LinkedIn </a>,
                                    <a href="facebook.com" className="text-blue-700"> rmdldeleon@gmail.com </a>) 
                                </li>
                                <li> Sebastian Miguel San Pedro ( 
                                    <a href="facebook.com" className="text-blue-700"> GitHub </a>, 
                                    <a href="facebook.com" className="text-blue-700"> LinkedIn </a>,
                                    <a href="facebook.com" className="text-blue-700"> rmdldeleon@gmail.com </a>) 
                                </li>
                                <li> Kurt Devin Dionisio ( 
                                    <a href="facebook.com" className="text-blue-700"> GitHub </a>, 
                                    <a href="facebook.com" className="text-blue-700"> LinkedIn </a>,
                                    <a href="facebook.com" className="text-blue-700"> rmdldeleon@gmail.com </a>) 
                                </li>
                                </div >
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full h-full max-h-[75%]">
                    <div className="w-full h-full max-w-[775px] bg-gray-100 shadow3 rounded box-border flex flex-col">
                        <div className="flex items-center justify-center w-full min-h-[70px] bg-[#d8e4f2]">
                            <h1 className="text-[1.5rem] font-bold text-gray-800"> Feedback Form </h1>
                        </div>

                        <div className="h-full w-full overflow-auto">
                            <form ref={formRef} onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center justify-center">
                                
                                <div className="w-[75%] h-[20%] flex items-center justify-center text-center">
                                    <h1 className="text-[1.1rem]"> Alternatively, you can email us at <a href="facebook.com" className="text-blue-700">thesislist_admin@gmail.com</a> </h1>
                                </div>

                                <div className="w-[75%] h-full flex flex-col items-center justify-start gap-1">
                                    <TextField
                                        label="Email (We will use this to contact you)"
                                        name="email"
                                        variant="outlined"
                                        margin="normal"
                                        sx={{width:"70%", minWidth: "325px", maxWidth: "400px"}}
                                        required
                                        InputProps={{
                                            type: 'email'
                                        }}
                                    />

                                    <FormControl variant="outlined" margin="normal" required sx={{width:"70%", minWidth: "325px", maxWidth: "400px"}}>
                                        <InputLabel id="type-label">Subject/Type</InputLabel>
                                        <Select
                                        labelId="type-label"
                                        id="type"
                                        label="Subject/Type"
                                        defaultValue= ""
                                        value={selectedValue}
                                        onChange={handleSelectChange}
                                        >
                                        
                                        <MenuItem value={"Suggestion"}>Suggestion</MenuItem>
                                        <MenuItem value={"Bug/Error"}>Bug/Error</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        label="Message"
                                        name="message"
                                        variant="outlined"
                                        margin="normal"
                                        sx={{width:"70%", minWidth: "325px", maxWidth: "400px"}}
                                        rows={6}
                                        multiline
                                        required
                                    />
                                    <Button type="submit" variant="contained" color="primary" size="large" className="w-[50%]" sx={{marginTop:"20px", height:"50px"}}>
                                        Send 
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default About;