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

const Admin = ({display}) => {
    const navigate = useNavigate();

    // get the user details from login page
    const [userDetails, setUserDetails] = useState(JSON.parse(sessionStorage.getItem('userDetails')));

    return(
        <section className={`${display} h-full w-full rounded-ss-[8px] rounded-ee-[8px] bg-red-50`}>
            Admin
        </section>
    )
}

export default Admin;