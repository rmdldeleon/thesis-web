import React, { 
    createContext, useContext, useState, useEffect, useRef, Fragment
} from "react";


import { useParams, Link, useNavigate} from "react-router-dom";

import { 
    Stack, InputLabel, MenuItem, FormControl, Select, ToggleButton, ToggleButtonGroup, TextField,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText, ListItemButton, List,
    Divider, AppBar, Toolbar, IconButton, Typography, CloseIcon, Slide, SearchIconWrapper, StyledInputBase,
    InputBase, InputAdornment
} from '@mui/material'

import UsersTable from "./UsersTable"

const Admin = ({display}) => {
    const navigate = useNavigate();

    // get the user details from login page
    const [userDetails, setUserDetails] = useState(JSON.parse(sessionStorage.getItem('userDetails')));

    return(
        <div className={`${display} h-full w-full rounded-ss-[8px] rounded-ee-[8px] bg-red-50`}>
            <main className="w-full h-full flex flex-col p-4">
                <section className="h-[50%] bg-slate-100 shadow-sm">
                    <UsersTable />
                </section>
            </main>
        </div>
    )
}

export default Admin;