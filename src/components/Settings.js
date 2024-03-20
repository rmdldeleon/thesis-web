import React, { 
    createContext, useContext, useState, useEffect, useRef, Fragment
} from "react";

import { 
    Stack, InputLabel, MenuItem, FormControl, Select, ToggleButton, ToggleButtonGroup, TextField,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText, ListItemButton, List,
    Divider, AppBar, Toolbar, IconButton, Typography, CloseIcon, Slide, SearchIconWrapper, StyledInputBase,
    InputBase, InputAdornment
} from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';

// imported contexts
import { dstructuresContext } from "./mainpage";

const Settings = ({display}) => {
    const [ dstructures, setdstructures ] = useContext(dstructuresContext)

    // onSubmit={handleSubmit(onSubmit)} for form
    return(
        <section className={`${display} h-full w-full rounded-ss-[8px] rounded-ee-[8px] bg-red-50`}>
            <div className="max-w-[1000px] h-full px-10 py-5 m-auto border-l border-gray-300 bg-slate-50">
                <form className="w-full h-full flex flex-col"> 
                    {/* tab title and logout */}
                    <section className="flex-1 w-full flex items-start pt-4">
                            <div className="flex-1 flex flex-col justify-center gap-1">
                                <h1 className="text-[1.5rem] font-bold text-gray-800">
                                    Account Settings
                                </h1>
                                <h1 className="text-[.9rem]  text-gray-700">
                                    Update your personal details here
                                </h1>
                            </div>

                            <div className="flex-1 flex items-center justify-end relative top-[10px]">
                                <Button variant="outlined" size="large" color="secondary" startIcon={<LogoutIcon />}>
                                    Logout
                                </Button>
                            </div>
                    </section>

                    <Divider />

                    {/* My Profile. How his use profile looks in public */}
                    <section className="flex-1 flex pt-4">
                            <div className="flex-[4] flex flex-col gap-1">
                                <h1 className="text-[1.2rem] font-bold text-gray-800">
                                    User Profile
                                </h1>
                                <h1 className="text-[.9rem]  text-gray-700">
                                    This is how you will be displayed in sections
                                </h1>
                            </div>   

                            <div className="flex-[6]">
                                {/* <TextField id="outlined-basic" label="" variant="outlined" /> */}
                            </div>
                    </section>
                    
                    <Divider />

                    {/* Name Input*/}
                    <section className="flex-1 flex pt-4">
                            <div className="flex-[4] flex flex-col gap-1">
                                <h1 className="text-[1.1rem] font-bold text-gray-800">
                                    Name
                                </h1>
                                {/* <h1 className="text-[.9rem]  text-gray-700">
                                    This is how you will be displayed in sections
                                </h1> */}
                            </div>   

                            <div className="flex-[6] flex gap-5">
                                <TextField id="outlined-basic" label="Firstname" variant="outlined" />
                                <TextField id="outlined-basic" label="Lastname" variant="outlined" />
                            </div>
                    </section>

                    <Divider />

                    {/* Email Input*/}
                    <section className="flex-1 flex pt-4">
                            <div className="flex-[4] flex flex-col gap-1">
                                <h1 className="text-[1.1rem] font-bold text-gray-800">
                                    Email
                                </h1>
                                {/* <h1 className="text-[.9rem]  text-gray-700">
                                    This is how you will be displayed in sections
                                </h1> */}
                            </div>   

                            <div className="flex-[6] flex gap-5">
                                <TextField
                                    id="input-with-icon-textfield"
                                 
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <EmailIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    variant="outlined"
                                />
                            </div>
                    </section>

                    <Divider />

                    {/* Change passowrd */}
                    <section className="flex-1 flex pt-4">
                            <div className="flex-[4] flex flex-col gap-1">
                                <h1 className="text-[1.1rem] font-bold text-gray-800">
                                    Password
                                </h1>
                                <h1 className="text-[.9rem]  text-gray-700">
                                    Fill up to change your current password
                                </h1>
                            </div>   

                            <div className="flex-[6] flex gap-5">
                                <TextField id="curren" label="New Password" variant="outlined" />
                                <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
                            </div>
                    </section>

                    <Divider />

                    {/* Save */}
                    <section className="flex-[1.2] flex pb-4">
                            <div className="flex-1 flex gap-5 items-end justify-end">
                                <Button variant="outlined" size="large">Reset</Button>
                                <Button variant="contained" size="large">Save</Button>
                            </div>
                    </section>
                </form>
            </div>
        </section>
    )
}

export default Settings;