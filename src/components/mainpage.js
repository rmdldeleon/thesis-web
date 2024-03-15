import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom';

import "../css/App.css";
import SideBar from "./SideBar";
import Header from "./Header";
import CRUD from "./CRUD";
import Charts from "./Charts"
import Dashboard from "./Dashboard";

export const dstructuresContext = createContext();

function App() {
  const navigate = useNavigate();

  const [dstructures, setdstructures] = useState([{}, {}, {}])

  const [analyticsOpen, setAnalyticsOpen] = useState('block')
  const [chartsOpen, setChartsOpen] = useState('hidden')
  const [dashboardOpen, setDashboardOpen] = useState('hidden')
  const [cpo, scpo] = useState(() => setAnalyticsOpen)

  const [analyticsHighlight, setAnalyticsHighlight] = useState("bg-[#f8f8fa]")
  const [dashboardHighlight, setDashboardHighlight] = useState("transparent hover:bg-[#00000015]") // a.k.a history
  const [chartsHighlight, setChartsHighlight] = useState("transparent hover:bg-[#00000010]")
  const [ch, sch] = useState(() => setAnalyticsHighlight)

  const [headerTitle, setHeaderTitle] = useState("Analytics")

  const [lastSpeedBarData, setLastSpeedBarData] = useState({
    labels: [""],
    datasets: [
        {
            label: "Tree Lista",
            data: [1],
            backgroundColor: "#a8c7ff"
        },
        {
            label: "Doubly Linked Lista",
            data: [2],
            backgroundColor: "#ff9696"
        },
    ]
  })

  const [lastSpeedBarDataOptions, setLastSpeedBarDataOptions] = useState({
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart Title',
        font: {
          size: 15,
        },
        margin: {
            top: 20, // Adjust the top margin to lower or raise the title
        },
      },
    },
    scales: {
        y: {
          title: {
            display: true,
            text: 'Speed in millisecond',
            color: 'black',
            font: {
              size: 10,
            },
          },
        },
    },
  })

  const [lastSizeBarData, setLastSizeBarData] = useState({
    labels: [""],
    datasets: [
        {
            label: "Tree Lista",
            data: [1],
            backgroundColor: "#a8c7ff"
        },
        {
            label: "Doubly Linked Lista",
            data: [2],
            backgroundColor: "#ff9696"
        },
    ]
  })

  const [lastSizeBarDataOptions, setLastSizeBarDataOptions] = useState({
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart Title',
        font: {
          size: 15,
        },
        margin: {
            top: 20, // Adjust the top margin to lower or raise the title
        },
      },
    },
    scales: {
        y: {
          title: {
            display: true,
            text: 'Speed in millisecond',
            color: 'black',
            font: {
              size: 10,
            },
          },
        },
    },
  })

  const [lastSpaceBarData, setLastSpaceBarData] = useState({
    labels: [""],
    datasets: [
        {
            label: "Tree Lista",
            data: [1],
            backgroundColor: "#a8c7ff"
        },
        {
            label: "Doubly Linked Lista",
            data: [2],
            backgroundColor: "#ff9696"
        },
    ]
  })

  const [lastSpaceBarDataOptions, setLastSpaceBarDataOptions] = useState({
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart Title',
        font: {
          size: 15,
        },
        margin: {
            top: 20, // Adjust the top margin to lower or raise the title
        },
      },
    },
    scales: {
        y: {
          title: {
            display: true,
            text: 'Speed in millisecond',
            color: 'black',
            font: {
              size: 10,
            },
          },
        },
    },
  })

  const [lastThreadsBarData, setLastThreadsBarData] = useState({
    labels: [""],
    datasets: [
        {
            label: "Tree Lista",
            data: [1],
            backgroundColor: "#a8c7ff"
        },
        {
            label: "Doubly Linked Lista",
            data: [2],
            backgroundColor: "#ff9696"
        },
    ]
  })

  const [lastThreadsBarDataOptions, setLastThreadsBarDataOptions] = useState({
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart Title',
        font: {
          size: 15,
        },
        margin: {
            top: 20, // Adjust the top margin to lower or raise the title
        },
      },
    },
    scales: {
        y: {
          title: {
            display: true,
            text: 'Speed in millisecond',
            color: 'black',
            font: {
              size: 10,
            },
          },
        },
    },
  })

  useEffect(() => {
    navigate('/analytics');

    // for back button - redirects user to login
    const handleBackButton = () => {
      navigate('/')
    };
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [])

  return (
    <dstructuresContext.Provider value={[dstructures, setdstructures]}>
        <div className="App">
          <div className="flex flex-col h-screen w-screen">
                {/* <Header headerTitle={headerTitle}/> */}

                <div className="bg-[#e7e9ee] flex flex-1 rounded-es-[8px] rounded-ee-[8px]">
                    <SideBar setHeaderTitle={setHeaderTitle} highlight={{ch, sch, analyticsHighlight, setAnalyticsHighlight, dashboardHighlight, setDashboardHighlight, chartsHighlight, setChartsHighlight}} currentPanelOpened={cpo} setCurrentPanelOpened={scpo} setDashboardOpen={setDashboardOpen} setChartsOpen = {setChartsOpen} setAnalyticsOpen = {setAnalyticsOpen}/>

                    <main className="flex-1">
                        <CRUD display = {analyticsOpen} charts={{lastSpeedBarData, setLastSpeedBarData, lastSpeedBarDataOptions, setLastSpeedBarDataOptions, setLastSizeBarData, setLastSizeBarDataOptions, setLastSpaceBarData, setLastSpaceBarDataOptions, setLastThreadsBarData, setLastThreadsBarDataOptions, chartsOpen}}/>
                        <Dashboard display={dashboardOpen}/>
                        <Charts display = {chartsOpen} charts={{lastSpeedBarData, lastSpeedBarDataOptions, lastSizeBarData, lastSizeBarDataOptions, lastSpaceBarData, lastSpaceBarDataOptions, lastThreadsBarData, lastThreadsBarDataOptions}}/>
                    </main>
                </div>
            </div> 
        </div>
    </dstructuresContext.Provider>
  );
}

export default App;

