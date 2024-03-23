import React, { 
    createContext, useContext, useState, useEffect, useRef, Fragment
} from "react";

import { 
    Stack, InputLabel, MenuItem, FormControl, Select, ToggleButton, ToggleButtonGroup, TextField,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText, ListItemButton, List,
    Divider, AppBar, Toolbar, IconButton, Typography, CloseIcon, Slide, SearchIconWrapper, StyledInputBase,
    InputBase,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { styled, alpha } from '@mui/material/styles';

import axios from 'axios';

import "../css/App.css";
import add from "../pictures/add.svg"
import about from "../pictures/about.svg"
import search from "../pictures/search.svg"

import HistoryTable from "./HistoryTable"

// imported contexts
import { dstructuresContext } from "./mainpage";

const Dashboard = ({display}) => {
    const [ dstructures, setdstructures ] = useContext(dstructuresContext)

    return(
        <section className={`${display} bg-red-50 h-full w-full rounded-ss-[8px] flex flex-col rounded-ee-[8px]`}>
            {/* <div className="bg-[#f8f8fa] h-16 min-h-[4rem] w-full flex rounded-ss-[8px] shadow z-10">
                <SortHeader />
            </div> */}
        
            <main className="h-full w-full flex flex-col p-2 gap-3 ">
                <section className="w-full h-full min-h-[300px] max-h-[50vh] flex-[4] flex gap-3">
                    <div className="w-full h-full bg-gray-100 shadow3 rounded box-border flex flex-col">
                        <div className="flex items-center justify-center w-full min-h-[70px] bg-[#d8e4f2]">
                            <h1 className="text-[1.5rem] font-bold text-gray-800"> Active Batch </h1>
                        </div>

                        <div className="h-full w-full overflow-auto">
                            <List>
                                <ListItemButton>
                                    <ListItemText primary={"Batch"} secondary={dstructures[0].dsbatch} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"Action Number"} secondary={dstructures[0].ActionSet} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"Size"} secondary={dstructures[0].size || 0} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"DStructures Count"} secondary={dstructures.length} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"Date Created"} secondary={new Date(dstructures[0].datecreated).toLocaleString()} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"Last Action Date"} secondary={new Date(dstructures[0].ActionDate).toLocaleString() || "No data"} />
                                </ListItemButton>
                            </List>
                        </div>
                    </div>

                    <div className="w-full h-full bg-gray-100 shadow3 rounded box-border flex flex-col">
                        <div className="flex items-center justify-center min-h-[70px] bg-[#d8e4f2]">
                            <h1 className="text-[1.5rem] font-bold text-gray-800"> Last Action </h1>
                        </div>

                        <div className="h-full w-full bg-re-100 overflow-auto">
                            <List>
                                <ListItemButton>
                                    <ListItemText primary={"Previous Size"} secondary={dstructures[0].JSONResults ? JSON.parse(dstructures[0].JSONResults)[0].prevSize : "No data"} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"Action"} secondary={dstructures[0].actiontype || "No data"} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"Starting Index"} secondary={dstructures[0].actioninput || "No data"} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"Ending Index / Count"} secondary={dstructures[0].actioncount || "No data"} />
                                </ListItemButton>

                                <Divider />

                                <ListItemButton>
                                    <ListItemText primary={"Direction"} secondary={dstructures[0].inputparameters || "No data"} />
                                </ListItemButton>
                            </List>
                        </div>
                    </div>
                </section>

                <section className="w-full h-full flex-[6] min-h-[300px]">
                    <div className="w-full h-full bg-gray-100 shadow rounded box-border">
                        <HistoryTable />
                    </div>
                </section>
            </main>
        </section>
    )
}

const SortHeader = () => {
    const [age, setAge] = React.useState(''); // for dropdowns or filters

    //styles
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        height : '45px',
        backgroundColor: alpha('#e7eef6', 1),
        '&:hover': {
          backgroundColor: alpha('#dfe9f5', 1),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1.5, 1, 0, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));

    const handleChange = (event) => { // dropdowns or filters
        setAge(event.target.value);
    };

    const [alignment, setAlignment] = React.useState('web');

    const handleAlignmentChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    
    return(
        <section className='w-full h-full'>
            <div className="flex w-full h-full">
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} marginX={4} width={"100%"}>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">Sort by</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label="Sort by"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">Group by</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label="Group by"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleAlignmentChange}
                        aria-label="Platform"
                        sx={{height: "65%"}}
                        >
                        <ToggleButton value="web">Ascending</ToggleButton>
                        <ToggleButton value="ios">Descending</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={0} marginX={3} width={"100%"}>
                    <Search size="large">
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Stack>
            </div>
        </section>
    )
}

const ActionSideBar = () => {
    return(
        <section className="bg-[#d9dde5] w-52 h-full flex flex-col p-2 px-3 gap-3"> 
            {/* <ActionSideBarItem title="Add" hoverColor="hover:bg-[#b3c4b8]"/>
            <ActionSideBarItem title="Get" hoverColor="hover:bg-[#87b8ccab]"/>
            <ActionSideBarItem title="Update" hoverColor="hover:bg-[#d2bad6]"/>
            <ActionSideBarItem title="Delete" hoverColor="hover:bg-[#d17992ab]"/>
            <div className="mx-auto w-[75%] h-[1px] m-1 bg-[rgba(0,0,0,.1)]"></div>
            <ActionSideBarItem title="Flatten" hoverColor="hover:bg-[#d17992ab]"/>
            <ActionSideBarItem title="Reset" hoverColor="hover:bg-[#d17992ab]"/> */}
        </section>
    )
}

const ActionSideBarItem = (props) => {
    return(  
        <div className={`flex p-4 gap-2 items-center bg-[#ffffff80] ${props.hoverColor}
        cursor-pointer rounded transition-all duration-200 shadow-sm ring-1 ring-[#f8f8fa] ring-inset`}>
            <img src={add} className='w-[1.6rem]'></img>
            <span className='text-[rgba(0,0,0,.6)] font-bold text-md text-stroke'>{props.title}</span>
        </div>         
    )
}
 
export default Dashboard;