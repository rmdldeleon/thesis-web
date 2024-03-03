import React, { useState, useEffect, useRef } from "react";

import "../css/App.css";

import add from "../pictures/add.svg"
import about from "../pictures/about.svg"
import search from "../pictures/search.svg"
import next from "../pictures/next.svg"
import download from "../pictures/download.svg"

import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import html2canvas from "html2canvas";

const Charts = ({display, charts}) => {
    const lastResultCharts = useRef(null);

    return(
        <section className={`${display} bg-[#f8f8fa] h-full w-full rounded-ss-[20px] flex flex-col rounded-ee-[8px] box-content`}>
            <SortHeader lastResultCharts={lastResultCharts}/>

            <div ref={lastResultCharts} className='flex-1 '>
                <div className='w-full h-full flex-1 box-border p-4 grid grid-cols-2 grid-rows-2 gap-[1rem] justify-center items-center'>
                        <BarChart data={charts.lastSpeedBarData} options={charts.lastSpeedBarDataOptions}/>
                        <BarChart data={charts.lastSizeBarData} options={charts.lastSizeBarDataOptions}/>
                        <BarChart data={charts.lastSpaceBarData} options={charts.lastSpaceBarDataOptions}/>
                        <BarChart data={charts.lastThreadsBarData} options={charts.lastThreadsBarDataOptions}/>
                </div>
            </div>
        </section>
    )
}

const BarChart = ({data, options}) => {
    const barChart = useRef(null);

    const saveImage = () => {
        const elementToCapture = barChart.current

        // Use HTML2Canvas to capture the element
        html2canvas(elementToCapture).then(canvas => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create a link element
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;

        // Set the file name for the downloaded image
        downloadLink.download = 'capturedImage.png';

        // Trigger a click on the link to start the download
        downloadLink.click();
        });
    }

    return(
        <section ref={barChart} className="relative bg-slate-100 w-full h-full box-border p-3 rounded shadow1 flex justify-center items-center">
            <div className="absolute top-2 right-3  flex gap-2">
                <img src={about} className='w-[1.6rem] cursor-pointer'></img>
                <img src={download} onClick={saveImage} className='w-[1.7rem] cursor-pointer'></img>
                <img src={next} className='w-[1.7rem] cursor-pointer'></img>
            </div>
            <Bar data={data} options={options}/>
        </section>
    )
}

const SortHeader = ({lastResultCharts}) => {
    const saveImage = () => {
        const elementToCapture = lastResultCharts.current

        // Use HTML2Canvas to capture the element
        html2canvas(elementToCapture).then(canvas => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create a link element
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;

        // Set the file name for the downloaded image
        downloadLink.download = 'capturedImage.png';

        // Trigger a click on the link to start the download
        downloadLink.click();
        });
    }

    return(
        <section className='bg-[#f8f8fa] h-16 w-full flex rounded-ss-[10px] shadow z-10'>
            <div className="flex w-full">
                <div className="flex-1 flex justify-start items-center px-4 gap-5">
                   
                </div>

                <div className="flex-1 flex justify-end items-center px-4 ">
                    <button onClick={saveImage} className="rounded-md w-[120px] h-[40px] bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow
                        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Save
                    </button>
                </div>
            </div>
        </section>
    )
}

const Search = () =>{
    return(
        //focus:shadow-[0px_0px_0px_1px_rgba(200,200,200,.5)] 
            <div className="relative flex items-center justify-center w-[300px] h-[70%]">
                <input
                type="search"
                className="shadow rounded-s-[10px] w-full h-full flex-[9] border-y border-l border-[rgba(0,0,0,.2)] bg-slate-100  px-3
                text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out 
               focus:text-neutral-600 
                dark:border-[rgba(0,0,0,.2)] dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon1" />
                
                <button className="shadow flex items-center justify-center flex-[2] bg-slate-100  h-full rounded-e-[10px] border-y border-r border-[rgba(0,0,0,.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" stroke-width="0" stroke="rgba(0,0,0,.5)" fill="rgba(0,0,0, .4)" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                    </svg>
                </button>
                
            </div>
    )
}

const DropDown = () => {
    const [open, setOpen] = useState(false)

    let menuRef = useRef()

    useEffect(() => {
        let handler = (e) => {
            if(!menuRef.current.contains(e.target)){
                setOpen(false)
            }
        }

        document.addEventListener("click", handler)
    })

    return(
        <div className="min-w-[14rem] h-[70%] relative" onClick={() => {setOpen(!open)}} ref={menuRef}>
            <div className="w-full h-full relative flex justify-center items-center">
                <button type="button" className="w-full h-full rounded-md bg-slate-100 font-semibold text-gray-600 
                shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-200" id="menu-button">
                    Sort By
                </button>
                <svg className="absolute right-3 w-5 text-gray-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
            </div>

            <div className={`${open ? 'block' : 'hidden'} left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1
             ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div className="" role="none">
                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Lorem Ipsum Dolor</a>
                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-1">Lorem Ipsum Dolor</a>
                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-2">Lorem Ipsum Dolor</a>
                </div>
            </div>
        </div>
    ) 
}

const ActionSideBar = () => {
    return(
        <section className="bg-[#d9dde5] w-52 h-full flex flex-col p-2 gap-3"> 
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
        cursor-pointer rounded transition-all duration-200 shadow-sm ring-1 ring-[#faf8f8] ring-inset`}>
            <img src={add} className='w-[1.6rem]'></img>
            <span className='text-[rgba(0,0,0,.6)] font-bold text-md text-stroke'>{props.title}</span>
        </div>         
    )
}
 
export default Charts;