import * as React from 'react';
import { useContext, useEffect, useState, useRef } from 'react';

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
import Tooltip from '@mui/material/Tooltip';

import DLL1 from "../pictures/DLL1.png"
import DLL2 from "../pictures/DLL2.png"
import DLL3 from "../pictures/DLL3.png"
import DLL4 from "../pictures/DLL4.png"

// imported contexts
import { domainContext, dstructuresContext, AlertDialogContext } from "./mainpage";

const _ = require('lodash');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

        // if(int === 2){
        //     return "O(log n)"
        // }else if(int === 1){
        //     return "O(n)"
        // }else if(int === 3){
        //     return "O(1)"
        // }


export default function DoublyLinkedListDialog({dsDetails, doublyLinkedListDialog, setDoublyLinkedListDialog}) {
  const [domain, server] = useContext(domainContext)

  const handleClose = () => {
    console.log(dsDetails)
    setDoublyLinkedListDialog(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/LinkedList.js`; // Adjust the URL as needed
    link.setAttribute('download', 'LinkedList.js'); // Set download attribute to force download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toPascalCase = (str) => {
    if (!str) return '';

    if(str === "CUSTOM LIST"){
      return "Custom List"
    }else if(str === "TRADITIONAL LIST"){
      return "Traditional List"
    } else {
      return "Traditional Array"
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={doublyLinkedListDialog}
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
              {dsDetails.dsname}
            </Typography>

            <Tooltip title="Download the Doubly Linked List class implementation in javascript">
              <Button autoFocus color="inherit" onClick={handleDownload}>
                Download 
              </Button>
            </Tooltip>
           
          </Toolbar>
        </AppBar>

  
        <main className='w-full h-full bg-red-50 overflow-auto'>
            {/* parent div for details and public methods */}
            <section className='h-[50%] min-h-[400px] max-h-[50vh] w-full flex gap-5 p-5'>
                {/* details and properties div */}
                <div className='w-full h-full bg-gray-100 shadow3 rounded box-border flex flex-col'>
                    <div className="flex items-center justify-center w-full min-h-[25%] bg-[#d8e4f2]">
                        <h1 className="text-[1.5rem] font-bold text-gray-800"> Details & Properties </h1>
                    </div>

                    <div className='w-full h-full overflow-auto'>
                        <List>
                            <ListItemButton>
                                <ListItemText primary={"Name"} secondary={dsDetails.dsname} />
                            </ListItemButton>
                            <Divider />

                            <ListItemButton>
                                  <ListItemText primary={"Type"} secondary={toPascalCase(dsDetails.type)} />
                            </ListItemButton>
                            <Divider />

                            <ListItemButton>
                                  <ListItemText primary={"Multi-threading"} secondary={dsDetails.threaded === 0 ? "False" : "True"} />
                            </ListItemButton>
                            <Divider />
                      
                            {/* <Tooltip title="Default is every 100 items added.">
                              <ListItemButton> 
                                    <ListItemText primary={"Frequency"} secondary={"A special property of custom linked lists. Determines how often a pivot pointer is added."} />
                              </ListItemButton>
                            </Tooltip>
                            <Divider /> */}

                            <ListItemButton>
                                  <ListItemText primary={"Made by"} secondary={"Ralph Matthew De Leon"} />
                            </ListItemButton>
                            <Divider />

                            <ListItemButton>
                                  <ListItemText primary={"Date Created"} secondary={new Date(dsDetails.datecreated).toLocaleString()} />
                            </ListItemButton>
                            <Divider />

                            <ListItemButton>
                                  <ListItemText primary={"Last Updated"} secondary={new Date(dsDetails.datecreated).toLocaleString()} />
                            </ListItemButton>
                       
                        </List>
                    </div>
                </div>

                {/* public methods div */}
                <div className='w-full h-full bg-gray-100 shadow3 rounded box-border flex flex-col'>
                    <div className="flex items-center justify-center w-full min-h-[25%] bg-[#d8e4f2]">
                        <h1 className="text-[1.5rem] font-bold text-gray-800"> Public Methods </h1>
                    </div>

                    <div className='w-full h-full overflow-auto'>
                        <List>                    
                            <Tooltip title="Adds an item at the end of the list.">
                              <ListItemButton> 
                                    <ListItemText primary={"add(item)"} secondary={"O(1)"} />
                              </ListItemButton>
                            </Tooltip>
                            <Divider />

                            <Tooltip title="Adds an item after the given index.">
                              <ListItemButton> 
                                    <ListItemText primary={"addAfter(index, item)"} secondary={"O(n)"} />
                              </ListItemButton>
                            </Tooltip>
                            <Divider />

                            <Tooltip title="Retrieves the item from the given index.">
                              <ListItemButton> 
                                    <ListItemText primary={"get(index)"} secondary={"O(n)"} />
                              </ListItemButton>
                            </Tooltip>
                            <Divider />

                            <Tooltip title="Updates the item from the given index.">
                              <ListItemButton> 
                                    <ListItemText primary={"update(index, item)"} secondary={"O(n)"}/>
                              </ListItemButton>
                            </Tooltip>
                            <Divider />

                            <Tooltip title="Removes the item from the given index.">
                              <ListItemButton> 
                                    <ListItemText primary={"delete(index)"} secondary={"O(n)"}/>
                              </ListItemButton>
                            </Tooltip>
                            <Divider />
                        </List>
                    </div>
                </div>
            </section>

            <section className='h-[50%] min-h-[400px] w-full flex gap-5 p-5'>
                <div className='w-full h-full bg-gray-100 shadow3 rounded flex'>
                    <div className="min-w-[65%] w-full h-full flex flex-col overflow-auto ">
                        <div className="flex-[1] min-h-[30%] text-[1.5rem] font-bold text-gray-800 flex items-end justify-center"> What is Doubly Linked List </div>
                        <div className="flex-[2] text-[1rem] font-semibold text-gray-700 text-justify px-[10%] py-[5%] leading-loose"> 
                            The Doubly Linked List serves as an upgrade to the traditional Singly Linked List. It retains the core properties of its predecessor. In a Singly Linked List, each node or item possesses only a pointer pointing to the next node. Consequently, traversal is restricted to moving from the start to the end, or from left to right. However, the Doubly Linked List introduces an additional pointer in each node, pointing to the previous node. This enhancement allows traversal from either direction. As a result, traversal becomes more efficient, permitting traversal to begin from either the start (head) or the end (tail), whichever is closer to the specified index.
                        </div>
                    </div>

                    <div className='w-full h-full flex flex-col gap-5 overflow-auto p-[20px]'>
                        <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
                            <h1 className='text-[1.2rem] font-bold'>Read Operation</h1>
                            
                            <div className='flex flex-col gap-2 text-justify leading-loose'>
                              <li> Read operations or traversal is the Linked List's weakness as it does not have a direct acess to each element unlike arrays.</li>
                              <li> Doubly Linked List traversal starts from either head or tail, whichever is closer to the specified index.</li>
                              <li> Altough the Big O Notation for read operation in Doubly Linked List is O(n), it's worst case is actually only traversing half of the list, when the specified index is exactly at the middle.</li>
                            </div >
                        </div>

                        <Divider />

                        <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
                            <h1 className='text-[1.2rem] font-bold'>Write Operation</h1>
                            
                            <div className='flex flex-col gap-2 text-justify leading-loose'>
                              <li> Write operations is where Doubly Linked List shines. When adding a node/item at the end of the list, it is rated as O(1) as it only have to connect the pointer from its sibling.</li>
                              <li> In adding or deleting somwhere in the middle of the list, Big O notation becomes O(n) as it still has to traverse the list to get to the specified index.</li>
                              <li> All Linked List are dynamic in size or capacity as its object references are stored in the sibling node, unlike array which has to take a space in heap memory in advance.</li>
                            </div >
                        </div>
                    </div>       
                </div>
            </section>

            <section className='gap-5 p-5'>
              <div className='w-full h-full bg-gray-100 shadow3 rounded flex flex-col'>
                  <div className='w-full h-full min-h-[100px] max-h-[150px] text-gray-800 font-bold text-[1.8rem] flex items-center justify-center bg-[#d8e4f2]'>
                      <h1> Adding an item in index 3 (4th Item)</h1>
                  </div>
                  
                  <div className='w-full h-full flex flex-col p-10 gap-5'>
                      <div className='w-full h-auto text-[1.2rem] text-gray-600 font-semibold'>
                        <h3>
                          1. Initial state of the list. With 'A' as Head and 'F' as TAIL.
                        </h3>
                      </div>
                      
                      <div className='relative ml-5 w-[40%] h-auto'>
                        <img src={DLL1} alt='image representation of array in its initial stae.' className='w-auto h-auto' />    
                      </div>
                  </div>

                  <div className='w-full h-full flex flex-col p-10 gap-5'>
                      <div className='w-full h-auto text-[1.2rem] text-gray-600 font-semibold'>
                        <h3>
                          2. Next step is to get to index 2. Traversal starts whichever pointer (HEAD and TAIL) is closer to the specified index.
                        </h3>
                      </div>
                      
                      <div className='relative ml-5 w-[40%] h-auto'>
                        <img src={DLL2} alt='image representation of array in its initial stae.' className='w-auto h-auto' />    
                      </div>
                  </div>

                  <div className='w-full h-full flex flex-col p-10 gap-5'>
                      <div className='w-full h-auto text-[1.2rem] text-gray-600 font-semibold'>
                        <h3>
                          3. Create the node with the given item and point its 'Prev' and 'Next' pointer to 'C' and 'D'
                        </h3>
                      </div>
                      
                      <div className='relative ml-5 w-[40%] h-auto'>
                        <img src={DLL3} alt='image representation of array in its initial stae.' className='w-auto h-auto' />    
                      </div>
                  </div>

                  <div className='w-full h-full flex flex-col p-10 gap-5'>
                      <div className='w-full h-auto text-[1.2rem] text-gray-600 font-semibold'>
                        <h3>
                          4. Point the 'Next' of 'C', and 'Prev' of 'D' to the new node. We have access to node 'C' and 'D' from step 2.
                        </h3>
                      </div>
                      
                      <div className='relative ml-5 w-[40%] h-auto'>
                        <img src={DLL4} alt='image representation of array in its initial stae.' className='w-auto h-auto' />    
                      </div>
                  </div>
              </div>
            </section>
        </main>

      </Dialog>
    </React.Fragment>
  );
}