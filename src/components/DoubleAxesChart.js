import * as React from 'react';
import { useContext, useEffect, useState, useRef } from 'react';
import { LastActionDialog, SpeedDialog, SizeDialog } from './CRUD';

import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const colors = ['#8884d8', '#82ca9d', '#ffc658'];

const containerProps1 = {
  width: "100%", // Set width to 100% of the parent element
  height: "100%", // Set height to 100% of the parent element
};

export default function DoubleAxesChart() {
    const [speedDialog, setSpeedDialog, dstructures, openedDSDetails, setOpenedDSDetails] = useContext(SpeedDialog) 

    const chartContainerRef = useRef(null);

    const speedmsDataPoints = () => {
        let arr = []

        let JSONResults = JSON.parse(dstructures[openedDSDetails.dsIndex].JSONResults)

        for(let i = 0; i < JSONResults.length; i++){
 
            let obj = {
                x: JSONResults[i].currentIndex,
                y: JSONResults[i].speedms
            } 

            arr.push(obj)
        }    
        
        return arr
    }

    const spaceDataPoints = () => {
        let arr = []

        let JSONResults = JSON.parse(dstructures[openedDSDetails.dsIndex].JSONResults)

        for(let i = 0; i < JSONResults.length; i++){
 
            let obj = {
                x: JSONResults[i].currentIndex,
                y: JSONResults[i].spaceAdded
            } 

            arr.push(obj)
        }    
        
        return arr
    }

    let JSONResults = []

    const notationDataPoints = () => {
        let arr = []

        JSONResults = JSON.parse(dstructures[openedDSDetails.dsIndex].JSONResults)

        for(let i = 0; i < JSONResults.length; i++){
            const speednotation = openedDSDetails.currentDialog === "Memory" ? JSONResults[i].spacenotation : JSONResults[i].speednotation

            let notationValue = ""

            if(speednotation === "O(log n)"){
                notationValue = 2
            }else if(speednotation === "O(n)"){
                notationValue = 1
            }else if(speednotation === "O(1)"){
                notationValue = 3
            }

            let obj = {
                x: JSONResults[i].currentIndex,
                y: notationValue
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
      
            // labelFormatter: function (e) {
            //     return "index " + e.value
            // }
        },
        axisY: {
            title: "Speed in Milliseconds",
            titleFontColor: "#6D78AD",
            lineColor: "#6D78AD",
            labelFontColor: "#6D78AD",
            tickColor: "#6D78AD"
        },
        axisY2: {
            title: "Notation",
            titleFontColor: "#51CDA0",
            lineColor: "#51CDA0",
            labelFontColor: "#51CDA0",
            tickColor: "#51CDA0",
            labelFormatter: function (e) {
                if(e.value === 1)
                    return "O(n)"
                else if(e.value === 2 )
                    return "O(log n)"
                else if(e.value === 3)
                    return "O(1)"
                else{
                    return ""
                }
            }
        },
        toolTip: {
            shared: true,
            contentFormatter: function (e) {
                let content = "<span style='color: black;'>Index " + e.entries[0].dataPoint.x + "</span><br/>";
                e.entries.forEach(function (entry) {
       
                    content += "<span style='color: " + entry.dataSeries.color + ";'>" + entry.dataSeries.name + ": " + entry.dataPoint.y + "</span><br/>";
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
        data: [{
            type: "line",
            name: "Speed in Milliseconds",
            showInLegend: true,
            dataPoints: [
                { x: 1, y: 0 },
                { x: 2, y: 0.4449 },
                { x: 3, y: 0.00944 },
            ]
        },
        {
            type: "line",
            name: "Notation",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3},
            ]
        }]
    }

    const [data, setData] = useState(options)

    useEffect(() => {
	    if (openedDSDetails && openedDSDetails.dsDetails.JSONResults) {
	        // Create a copy of the options object
	        const updatedOptions = { ...options };
	
	        if (openedDSDetails.currentDialog === "Speed") {
	            updatedOptions.data[0].dataPoints = speedmsDataPoints();
	            updatedOptions.data[0].name = "Speed in Milliseconds";
	
	            updatedOptions.data[1].dataPoints = notationDataPoints();
	
	            updatedOptions.subtitles[0].text = "Speed in Milliseconds and Notation";
	
	            updatedOptions.axisY.title = "Speed in Milliseconds";
	        } else if (openedDSDetails.currentDialog === "Memory") {
	            updatedOptions.data[0].dataPoints = spaceDataPoints();
	            updatedOptions.data[0].name = "Space Added";
	
	            updatedOptions.data[1].dataPoints = notationDataPoints();
	
	            updatedOptions.subtitles[0].text = "Size Added and Notation";
	
	            updatedOptions.axisY.title = "Space Added";
	        }
	
	        updatedOptions.axisX.title = "Index";
	        updatedOptions.axisX.interval = calculateInterval(JSONResults.length);
	
	        // Update the state with the modified options
	        setData(updatedOptions);
	    }
	}, [dstructures]);

    return (
        <div className='w-full h-full' ref={chartContainerRef}>
            <CanvasJSChart 
                options = {data}
                containerProps={{ style: { width: '100%', height: 'auto' } }}
                // containerProps={containerProps1}
            />
        </div>
    );
}