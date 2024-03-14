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
        if(openedDSDetails && openedDSDetails.dsDetails.JSONResults){

            if(openedDSDetails.currentDialog === "Size"){ // if speed is 
                if(dsname === "Dynamic Array"){
                    options.axisY.title = "Capacity Added"
                    options.data[0].name = "Capacity Added"
                    options.subtitles[0].text = "Index and Capacity Added"
                }else{
                    options.axisY.title = "Pointers Added"
                    options.data[0].name = "Pointers Added"
                    options.subtitles[0].text = "Index and Pointers Added"
                }
          
                options.data[0].dataPoints = sizeDataPoints()
            
                options.axisX.interval = calculateInterval(JSONResults.length)
                options.axisX.title = "Index"
            }else if(openedDSDetails.currentDialog === "Threads"){
                options.axisY.title = "Threads Used"
                options.data[0].name = "Threads Used"
                options.subtitles[0].text = "Index and Threads Used"

                options.data[0].dataPoints = threadsDataPoints()

                options.axisX.interval = calculateInterval(JSONResults.length)
                options.axisX.title = "Index"
            }

            setData(options)
        }
    }, [dstructures])

    return (
        <div className='w-full h-full' ref={chartContainerRef}>
            <CanvasJSChart 
                options = {data}
                containerProps={containerProps1}
            /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    );
}