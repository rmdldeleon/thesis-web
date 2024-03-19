import React, { 
    createContext, useContext, useState, useEffect, useRef, Fragment
} from "react";

import { 
    Stack, InputLabel, MenuItem, FormControl, Select, ToggleButton, ToggleButtonGroup, TextField,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText, ListItemButton, List,
    Divider, AppBar, Toolbar, IconButton, Typography, CloseIcon, Slide, SearchIconWrapper, StyledInputBase,
    InputBase
} from '@mui/material'


export const AlertDialog = ({alertDialog, setAlertDialog, handleConfirm, text}) => { 
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const AccountID = userDetails.AccountID

    const onConfirm = async () => {      
        handleConfirm && handleConfirm()
        handleClose()
    }

    const handleClose = () => {
        setAlertDialog(false);
    }

    return (
        <Fragment>
            <Dialog
                open={alertDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {text.title}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text.content}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                {text.negativeButton && <Button onClick={handleClose}>{text.negativeButton}</Button>}
                <Button onClick={onConfirm} autoFocus>
                    {text.possitiveButton}
                </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}