import { useState, useEffect } from "react";
import hurdat2 from "../hurdat2";
import { MenuItem, Select } from "@mui/material"
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import retiredImage from "../images/retired.png"

const Interface = ({year, setYear, id}) => {

  const [storm, setStorm] = useState(null)
  const [name, setName] = useState(null)
  const [dates, setDates] = useState(null)
  const [wind, setWind] = useState(null)
  const [pressure, setPressure] = useState(null)
  const [radius34kt, setRadius34kt] = useState(null)
  const [radius50kt, setRadius50kt] = useState(null)
  const [radius64kt, setRadius64kt] = useState(null)
  const [retired, setRetired] = useState(false)
  const [landfalls, setLandfalls] = useState(null)
  const [duration, setDuration] = useState(null)
  const [maxWind, setMaxWind] = useState(null)
  const [minPressure, setMinPressure] = useState(null)
  const [maxWindAtLandfall, setMaxWindAtLandfall] = useState(null)
  const [minPressureAtLandfall, setMinPressureAtLandfall] = useState(null)
  const [title, setTitle] = useState(null)
  const [textColor, setTextColor] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)


  useEffect(() => {
    const name = id.split("_")[1]
    setName(name)
    setRetired(false)
    const storm = hurdat2[2022 - year]?.find((storm) => storm[0]?.id === id)
    setStorm(storm)
  }, [id]);

  useEffect(() => {
    if (storm) {
      const stormTrack = storm?.slice(1)

      const dates = stormTrack?.map((point) => {
        if (point.date) {
          const dateArray = point?.date.toString().split("")
          const month = dateArray.slice(4,6).join("")
          const day = dateArray.slice(-2).join("")
          return `${month}/${day}`
        }
      })
      setDates(dates)

      const wind = stormTrack?.map((point) => {
        return point.max_wind_kt
      })
      setWind(wind)

      const pressure = stormTrack?.map((point) => {
        return point.min_pressure_mb
      })
      setPressure(pressure)

      const radius34kt = stormTrack?.map((point) => {
        return Math.max(point["34kt_wind_radius_nm_ne"], point["34kt_wind_radius_nm_nw"], point["34kt_wind_radius_nm_se"], point["34kt_wind_radius_nm_sw"])
      })
      setRadius34kt(radius34kt)
      
      const radius50kt = stormTrack?.map((point) => {
        return Math.max(point["50kt_wind_radius_nm_ne"], point["50kt_wind_radius_nm_nw"], point["50kt_wind_radius_nm_se"], point["50kt_wind_radius_nm_sw"])
      })
      setRadius50kt(radius50kt)

      const radius64kt = stormTrack?.map((point) => {
        return Math.max(point["64kt_wind_radius_nm_ne"], point["64kt_wind_radius_nm_nw"], point["64kt_wind_radius_nm_se"], point["64kt_wind_radius_nm_sw"])
      })
      setRadius64kt(radius64kt)

      if (storm[0].retired === "true") {
        setRetired(true)
      } else {
        setRetired(false)
      }

      const storm = hurdat2[2022 - year].find(array => array[0].id === id) 
      const startArray = storm[1].date.toString().split('')
      const startYear = startArray.slice(0,4).join('')
      const startMonth = startArray.slice(4,6).join('')
      const startDay = startArray.slice(-2).join('')
      const start = `${startMonth}/${startDay}/${startYear}`
      const lastIndex = storm.pop()
      const endArray = lastIndex.date.toString().split('')
      const endYear = endArray.slice(0,4).join('')
      const endMonth = endArray.slice(4,6).join('')
      const endDay = endArray.slice(-2).join('')
      const end = `${endMonth}/${endDay}/${endYear}`
      const duration = `${start}-${end}`
      setDuration(duration)

      let landfalls = 0
      storm.forEach((point) => {
        if (point.record == "L") {
          landfalls += 1
        }
      })
      setLandfalls(landfalls)

      const windAsTC = stormTrack?.map((point) => {
        if (point.status.includes("D") || point.status.includes("S") || point.status === "HU") {
          return point.max_wind_kt
        } else {
          return 0
        }
      })
      const maxWind = Math.max(...windAsTC)
      setMaxWind(maxWind)

      const pressureAsTC = stormTrack?.map((point) => {
        if (point.status.includes("D") || point.status.includes("S") || point.status === "HU") {
          return point.min_pressure_mb
        } else {
          return 9999
        }
      })
      const minPressure = Math.min(...pressureAsTC)
      setMinPressure(minPressure)
  
      const windAtLandfall = stormTrack?.map((point) => {
        if (point.record == "L") {
          return point.max_wind_kt
        } else {
          return 0
        }
      })
      const maxWindAtLandfall = Math.max(...windAtLandfall)
      setMaxWindAtLandfall(maxWindAtLandfall)

      const pressureAtLandfall = stormTrack?.map((point) => {
        if (point.record == "L") {
          return point.min_pressure_mb
        } else {
          return 9999
        }
      })
      const minPressureAtLandfall = Math.min(...pressureAtLandfall)
      setMinPressureAtLandfall(minPressureAtLandfall)

      let title
      let textColor
      const status = stormTrack?.map((point) => {
        return point.status
      })
      if (maxWind < 34) {
        if (!status?.includes("SD")) {
          title = "Tropical Depression"
          textColor = "text-[blue]"
        } 
        if (!status?.includes("TD")) {
          title = "Subtropical Depression"
          textColor = "text-[lightblue]"
        } 
      } 
      if (maxWind >= 34 && maxWind < 64) {
        if (!status?.includes("SS")) {
          title = "Tropical Storm"
          textColor = "text-[lime]"
        } 
        if (!status?.includes("TS")) {
          title = "Subtropical Storm"
          textColor = "text-[lightgreen]"
        } 
      } 
      if (maxWind >= 64) {
        title = "Hurricane"
        if (maxWind <= 82) {
          textColor = "text-[yellow]"
        }
        if (maxWind > 82 && maxWind <= 95) {
          textColor = "text-[orange]"
        }
        if (maxWind > 95 && maxWind <= 110) {
          textColor = "text-[red]"
        }
        if (maxWind > 110 && maxWind <= 135) {
          textColor = "text-[hotpink]"
        }
        if (maxWind > 135) {
          textColor = "text-[pink]"
        }
      }
      setTitle(title)
      setTextColor(textColor)

      const imageUrl = storm[0].imageUrl
      setImageUrl(imageUrl)
    }
  }, [storm])

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const intensityData = {
    labels: dates,
    datasets: [
      {
        label: "Maximum Wind (kt)",
        data: wind,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y"
      },
      {
        label: "Minimum Pressure (mb)",
        data: pressure,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1"
      },
    ]
  }

  const intensityOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Intensity"
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const sizeData = {
    labels: dates,
    datasets: [
      {
        label: "34-49 kt",
        data: radius34kt,
        borderColor: "gold",
        backgroundColor: "lightyellow"
      },
      {
        label: "50-63 kt",
        data: radius50kt,
        borderColor: "orange",
        backgroundColor: "rgb(255, 213, 128)",
      },
      {
        label: "64+ kt",
        data: radius64kt,
        borderColor: "red",
        backgroundColor: "pink",
      }
    ]
  }

  
  const sizeOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Wind Radius Maximum (nm)"
      },
    },
  };

  const years = new Array(2022 - 1850).fill(0)

  return (
    <div className="w-[48rem] h-screen bg-blue-950 p-10 overflow-auto">
      <Select className="bg-white !rounded-xl w-24 h-12" value={year} onChange={(e) => {setYear(e.target.value)}}>
        {years.map((_, index) => {
          const selectedYear = 2022 - index;
          return (<MenuItem key={selectedYear} value={selectedYear}>{selectedYear}</MenuItem>);
        })}
      </Select>
      {storm && <>
        <div className="flex justify-between my-10">
          <a className="w-96 h-[31rem] bg-cover flex items-center justify-center rounded-md" style={{backgroundImage: `url(${imageUrl})`}} href={`https://www.nhc.noaa.gov/data/tcr/${id}.pdf`}>
            {retired == true && <img className="w-80 animate__bounceIn" src={retiredImage}/>}
          </a>
          <div className="flex flex-col w-64 font-bold">
            <h1 className={`${textColor} text-2xl font-bold`}>{title} {name}</h1>
            <h1 className="text-lg text-white font-bold mb-5">{duration}</h1>
            <div className="text-sm text-white flex flex-col gap-1">
              <h1>Maximum Wind: {maxWind} kt</h1>
              <h1>Minimum Pressure: {minPressure} mb</h1>
              <h1>Landfalls: {landfalls}</h1>
              {landfalls > 0 && 
              <>
                <h1>Maximum Wind at Landfall: {maxWindAtLandfall} kt</h1>
                <h1>Minimum Pressure at Landfall: {minPressureAtLandfall} mb</h1>
              </>
              }
              <h1>Deaths: </h1>
              <h1>Cost Estimate (USD): </h1>
              {maxWind >= 34 && <h1>Days as <span className="text-[lime]">Tropical Storm</span>{maxWind >= 64 && <span> or Higher</span>}:</h1>}
              {maxWind >= 64 && <h1>Days as <span className="text-[yellow]">Category 1</span>{maxWind >= 83 && <span> or Higher</span>}:</h1>}
              {maxWind >= 83 && <h1>Days as <span className="text-[orange]">Category 2</span>{maxWind >= 100 && <span> or Higher</span>}:</h1>}
              {maxWind >= 100 && <h1>Days as <span className="text-[red]">Category 3 </span>{maxWind >= 110 && <span> or Higher</span>}:</h1>}
              {maxWind >= 110 &&<h1>Days as <span className="text-[hotpink]">Category 4 </span>{maxWind >= 135 && <span> or Higher</span>}:</h1>}
              {maxWind >= 135 &&<h1>Days as <span className="text-[pink]">Category 5:</span></h1>}
              {maxWind >= 34 && <h1>Accumulated Cyclone Energy: </h1>}
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-sm">
          <Line className="mb-5" options={intensityOptions} data={intensityData}/>
          <Line options={sizeOptions} data={sizeData}/>
        </div>
      </>}
    </div>
  )
}

export default Interface