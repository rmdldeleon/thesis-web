import * as React from 'react';
import { useContext } from 'react';
import { LastActionDialog } from './CRUD';
import BarsDataset from './BarsDataSet';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import {Box, Paper} from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function LastActionResult() {
    const [lastActionDialog, setLastActionDialog] = useContext(LastActionDialog) 

  const handleClose = () => {
    console.log("close last action dialog")
    setLastActionDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={lastActionDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#5b7ea8' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <div className='w-full h-[45vh] min-h-[300px] flex gap-5 p-10 box-border'>
          {/* charts div */}
          <div className='flex flex-col bg-[#f0f2f5] h-full flex-[8] shadow2 box-border'>
              <div className='flex relative items-center justify-center h-full'>
                  {/* y axis */}
                  <div className='flex items-center justify-center whitespace-nowrap w-[30px]'>
                      <h3 className='transform -rotate-90'>Speed in milliseconds</h3>
                  </div>

                  {/* chart */}
                  <div className='h-full w-full'>
                      <BarsDataset />
                  </div>
              </div>

              {/* x axis */}
              <div className='flex items-center justify-center relative bottom-[15px]'>
                  <h3 className=''>Data structures</h3>
              </div>
          </div>
          
          <div className='flex-[2] h-full bg-[#f0f2f5] shadow2 py-3 px-7 box-border'>
            <h2>asdsad </h2>
            <h2>asdsad </h2>
            <h2>asdsad </h2>
            <h2>asdsad </h2>
            <h2>asdsad </h2>
          </div>
        </div>
    

        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List>
      </Dialog>
    </React.Fragment>
  );
}