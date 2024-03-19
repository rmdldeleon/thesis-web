import React, { 
    createContext, useContext, useState, useEffect, useRef, Fragment
} from "react";

import { 
    Stack, InputLabel, MenuItem, FormControl, Select, ToggleButton, ToggleButtonGroup, TextField,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText, ListItemButton, List,
    Divider, AppBar, Toolbar, IconButton, Typography, CloseIcon, Slide, SearchIconWrapper, StyledInputBase,
    InputBase
} from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout';

// imported contexts
import { dstructuresContext } from "./mainpage";

const Settings = ({display}) => {
    const [ dstructures, setdstructures ] = useContext(dstructuresContext)

    // onSubmit={handleSubmit(onSubmit)} for form
    return(
        <section className={`${display} bg-[#f8f8fa] h-full w-full rounded-ss-[8px] rounded-ee-[8px] bg-red-50`}>
            <div className="max-w-[1000px] h-full px-10 py-5 m-auto border-l border-gray-300 bg-slate-50">
                <form className="w-full h-full flex flex-col"> 
                    {/* tab title and logout */}
                    <section className="flex-1 w-full min-h-[75px] max-h-[100px] flex">
                            <div className="flex-1 flex flex-col justify-center gap-1">
                                <h1 className="text-[1.5rem] font-bold text-gray-800">
                                    Account Settings
                                </h1>
                                <h1 className="text-[.9rem]  text-gray-700">
                                    Update your personal details here
                                </h1>
                            </div>

                            <div className="flex-1 flex items-center justify-end">
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
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            </div>
                    </section>
                    
                    <Divider />

                    {/* Name Input*/}
                    <section className="flex-1">
                        Name
                    </section>

                    <Divider />

                    {/* Email Input*/}
                    <section className="flex-1">
                        Email
                    </section>

                    <Divider />

                    {/* Change passowrd */}
                    <section className="flex-1">
                        Password
                    </section>

                    <Divider />

                    {/* Save */}
                    <section className="flex-1">
                        Save
                    </section>
                </form>
            </div>
        </section>
    )
}

export default Settings;