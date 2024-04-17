import * as React from 'react';
import { useContext, useEffect, useState, useRef } from 'react';
import { LastActionDialog, SpeedDialog, SizeDialog, ThreadsDialog } from './CRUD';

import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const colors = ['#8884d8', '#82ca9d', '#ffc658'];

const containerProps1 = {
  width: "100%", // Set width to 100% of the parent element
  height: "100%", // Set height to 100% of the parent element
};

export default function DoubleAxesChart() {
    const [ speedDialog, setSpeedDialog, dstructures, openedDSDetails, setOpenedDSDetails] = useContext(SpeedDialog) 
    const [ threadsDialog, setThreadsDialog] = useContext(ThreadsDialog)

    let dsname = openedDSDetails.dsDetails.dsname

    const chartContainerRef = useRef(null);

    let JSONResults = []

    const sizeDataPoints = () => {
        let arr = []

        JSONResults = JSON.parse(dstructures[openedDSDetails.dsIndex].JSONResults)

        for(let i = 0; i < JSONResults.length; i++){
            let obj = {
                x: JSONResults[i].currentIndex,
                y: JSONResults[i].sizeAdded === 1 ?  JSONResults[i].pointersAdded : JSONResults[i].sizeAdded
            } 

            arr.push(obj)
        }    
        
        return arr
    }
    
    const threadsDataPoints = () => {
        let arr = []

        JSONResults = JSON.parse(dstructures[openedDSDetails.dsIndex].JSONResults)

        for(let i = 0; i < JSONResults.length; i++){
            let obj = {
                x: JSONResults[i].currentIndex,
                y: JSONResults[i].threads
            } 

            arr.push(obj)
        }    
        
        return arr
    }

    const calculateInterval = (count) => {
        // Calculate the available width of the chart container
        const containerWidth = chartContainerRef.current.offsetWidth;
    
        // Adjust the interval dynamically based on the number of items and container width
        const idealInterval = Math.ceil(count / (containerWidth / 50));
        return Math.max(1, idealInterval); // Ensure the interval is at least 1
    };

    const options = {
        backgroundColor: "rgb(249,250,251)",

        animationEnabled: true,
        exportEnabled: true,
        responsive: true,
        maintainAspectRatio: false,
        title:{
            text: openedDSDetails.dsDetails.dsname
        },
        subtitles: [{
            text: "Speed in Milliseconds VS Notation"
        }],
        axisX: {
            title: "States",
            interval: 1,
            //valueFormatString: "asd"
        },
        axisY: {
            title: "Speed in Milliseconds",
            titleFontColor: "#6D78AD",
            lineColor: "#6D78AD",
            labelFontColor: "#6D78AD",
            tickColor: "#6D78AD"
        },
        toolTip: {
            shared: true,
            contentFormatter: function (e) {
                let content = "<span style='color: black;'>Index " + e.entries[0].dataPoint.x + "</span><br/>";
            
                e.entries.forEach(function (entry) {
          
                    content += "<span style='color: #C0504E'>" + entry.dataSeries.name + ": " + entry.dataPoint.y + "</span><br/>";
                });
                return content;
            }
        },
        legend: {
            cursor: "pointer",
            itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
        },

        data: [
            {
                type: "area",
                name: "Speed in Milliseconds",
                showInLegend: false,
                dataPoints: [
                    { x: 1, y: 0 },
                    { x: 2, y: 0.4449 },
                    { x: 3, y: 0.00944 },
                ]
            },
        ]
    }

    const [data, setData] = useState(options)

    useEffect(() => {
	    if (openedDSDetails && openedDSDetails.dsDetails.JSONResults) {
	        // Create a copy of the options object
	        const updatedOptions = { ...options };
	
	        if (openedDSDetails.currentDialog === "Size") {
	            if (dsname === "Dynamic Array") {
	                updatedOptions.axisY.title = "Capacity Added";
	                updatedOptions.data[0].name = "Capacity Added";
	                updatedOptions.subtitles[0].text = "Index and Capacity Added";
	            } else {
	                updatedOptions.axisY.title = "Pointers Added";
	                updatedOptions.data[0].name = "Pointers Added";
	                updatedOptions.subtitles[0].text = "Index and Pointers Added";
	            }
	            
	            updatedOptions.data[0].dataPoints = sizeDataPoints();
	        } else if (openedDSDetails.currentDialog === "Threads") {
	            updatedOptions.axisY.title = "Threads Used";
	            updatedOptions.data[0].name = "Threads Used";
	            updatedOptions.subtitles[0].text = "Index and Threads Used";
	
	            updatedOptions.data[0].dataPoints = threadsDataPoints();
	        }
	
	        updatedOptions.axisX.interval = calculateInterval(JSONResults.length);
	        updatedOptions.axisX.title = "Index";
	
	        // Update the state with the modified options
	        setData(updatedOptions);
	    }
	}, [dstructures]);

    return (
        <div className='w-full h-full' ref={chartContainerRef}>
            <CanvasJSChart 
                options = {data}
                containerProps={{ style: { width: '100%', height: 'auto' } }}
            />
        </div>
    );
}