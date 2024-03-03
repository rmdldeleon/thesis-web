import React from 'react';

import "../css/App.css";


const Header = ({headerTitle}) => {
    const closeWindow = () => {
        //ipcRenderer.send('close-window');
    }

    const makeWindowFullScreen = () => {
        //ipcRenderer.send('toggle-fullscreen');
    };

    const minimizeWindow = () => {
        //ipcRenderer.send('minimize-window');
    };

    return(
        <section className='bg-slate-200 flex h-10 drag rounded-ss-[8px] rounded-se-[8px]'>
            <div className='flex-1 flex justify-start items-center '>
                <button onClick={closeWindow} className='bg-red-500 w-5 h-5 rounded-full mx-1 ml-4 text-center flex justify-center items-center border-solid border-[1px] border-gray-500 nodrag'></button>
                <button onClick={makeWindowFullScreen} className='bg-yellow-500 w-5 h-5 rounded-full mx-1 border-solid border-[1px] border-gray-500 nodrag'></button>
                <button onClick={minimizeWindow} className='bg-green-500 w-5 h-5 rounded-full mx-1 border-solid border-[1px] border-gray-500 nodrag'></button>
            </div>
            <div className='flex-1 justify-center items-center flex font-bold text-[rgba(0,0,0,.7)]'>
                {headerTitle}
            </div>
            <div className='flex-1 flex justify-end items-center mr-4 text-[rgba(0,0,0,.6)]'>
                Tester v1.0
            </div>
        </section>
    )
}
 
export default Header;