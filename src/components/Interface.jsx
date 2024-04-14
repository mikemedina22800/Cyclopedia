import { useState, useEffect } from "react";
import hurdat2 from "../hurdat2";
import { MenuItem, Select, Button } from "@mui/material"
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import retiredImage from "../images/retired.png"

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Interface = ({year, setYear, stormId, setStormId}) => {

  const [storm, setStorm] = useState(null)
  const [stormIds, setStormIds] = useState(null)
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
  const [daysAtStrength, setDaysAtStrength] = useState(null)
  const [costUSD, setCostUSD] = useState(null)
  const [fatalaties, setFatalaties] = useState(null)
  const [ACE, setACE] = useState(null)
  const [totalACE, setTotalACE] = useState(null) 
  const [seasonStats, setSeasonStats] = useState(false)
  const [maxWinds, setMaxWinds] = useState(null)
  const [minPressures, setMinPressures] = useState(null)
  const [stormNames, setStormNames] = useState(null)
  const [tropicalStormNames, setTropicalStormNames] = useState(null)
  const [fatalStormNames, setFatalStormNames] = useState(null)
  const [costlyStormNames, setCostlyStormNames] = useState(null)
  const [stormsAtStrength, setStormNamesAtStrength] = useState(null)
  const [seasonACE, setSeasonACE] = useState(null)
  const [seasonLandfalls, setSeasonLandfalls] = useState(null)
  const [landfallingStormNames, setLandfallingStormNames] = useState(null)
  const [maxWindLandfalls, setMaxWindLandfalls] = useState(null)
  const [minPressureLandfalls, setMinPressureLandfalls] = useState(null)
  const [seasonFatalaties, setSeasonFatalaties] = useState(null)
  const [seasonCostUSD, setSeasonCostUSD] = useState(null)
  const [retiredNames, setRetiredNames] = useState(null)

  const sum = (array) => {
    let sum = 0
    array?.forEach((item) => {
      sum += item
    })
    return sum
  }

  useEffect(() => {
    const id = hurdat2[year - 1851][0][0].id
    setStormId(id)
  }, [year])

  useEffect(() => {
    const name = stormId.split("_")[1]
    setName(name)
    setRetired(false)
    const storm = hurdat2[year - 1851]?.find((storm) => storm[0]?.id === stormId)
    setStorm(storm)
  }, [stormId]);

  useEffect(() => {
    if (storm) {
      const stormTrack = storm.slice(1)
      const dates = stormTrack.map((point) => {
        const dateArray = point?.date.toString().split("")
        const month = dateArray.slice(4,6).join("")
        const day = dateArray.slice(-2).join("")
        return `${month}/${day}`
      })

      setDates(dates)

      const wind = stormTrack.map((point) => {
        return point.max_wind_kt
      })
      setWind(wind)
  
      const maxWind = Math.max(...wind)
      setMaxWind(maxWind)

      const pressure = stormTrack.map((point) => {
        return point.min_pressure_mb
      })
      setPressure(pressure)

      const minPressure = Math.min(...pressure)
      setMinPressure(minPressure)

      const radius34kt = stormTrack.map((point) => {
        return Math.max(point["34kt_wind_radius_nm_ne"], point["34kt_wind_radius_nm_nw"], point["34kt_wind_radius_nm_se"], point["34kt_wind_radius_nm_sw"])
      })
      setRadius34kt(radius34kt)
      
      const radius50kt = stormTrack.map((point) => {
        return Math.max(point["50kt_wind_radius_nm_ne"], point["50kt_wind_radius_nm_nw"], point["50kt_wind_radius_nm_se"], point["50kt_wind_radius_nm_sw"])
      })
      setRadius50kt(radius50kt)

      const radius64kt = stormTrack.map((point) => {
        return Math.max(point["64kt_wind_radius_nm_ne"], point["64kt_wind_radius_nm_nw"], point["64kt_wind_radius_nm_se"], point["64kt_wind_radius_nm_sw"])
      })
      setRadius64kt(radius64kt)

      if (storm[0].retired === "true") {
        setRetired(true)
      } else {
        setRetired(false)
      }

      const startArray = storm[1].date.toString().split('')
      const startYear = startArray.slice(0,4).join('')
      const startMonth = startArray.slice(4,6).join('')
      const startDay = startArray.slice(-2).join('')
      const start = `${startMonth}/${startDay}/${startYear}`
      const endArray = storm.pop().date.toString().split('')
      const endYear = endArray.slice(0,4).join('')
      const endMonth = endArray.slice(4,6).join('')
      const endDay = endArray.slice(-2).join('')
      const end = `${endMonth}/${endDay}/${endYear}`
      const duration = `${start}-${end}`
      setDuration(duration)

      let landfalls=0
      stormTrack.forEach((point) => {
        if (point.record == "L") {
          landfalls += 1
        }
      })
      setLandfalls(landfalls)

      const stormLandfalls = stormTrack.filter(point => point.record === "L")
  
      const windAtLandfall = stormLandfalls.map((point) => {
        return point.max_wind_kt
      })
      const maxWindAtLandfall = Math.max(...windAtLandfall)
      setMaxWindAtLandfall(maxWindAtLandfall)

      const pressureAtLandfall = stormLandfalls.map((point) => {
        return point.min_pressure_mb
      })
      const minPressureAtLandfall = Math.min(...pressureAtLandfall)
      setMinPressureAtLandfall(minPressureAtLandfall)

      let title
      let textColor
      const status = stormTrack.map((point) => {
        return point.status
      })
      if (status.includes("HU")) {
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
      } else {
        if (status.includes("TS")) {
          title = "Tropical Storm"
          textColor = "text-[lime]"
        } else {
          if (status.includes("SS")) {
            title = "Subtropical Storm"
            textColor = "text-[lightgreen]"
          } else {
            if (status.includes("TD")) {
              title = "Tropical Depression"
              textColor = "text-[blue]"
            } else {
              title = "Subtropical Depression"
              textColor = "text-[lightblue]"
            }
          }
        }
        
      }
      setTitle(title)
      setTextColor(textColor)

      const imageUrl = storm[0].imageUrl
      setImageUrl(imageUrl)
      
      let i=1
      let hoursAtTD=0
      let hoursAtTS=0
      let hoursAtH1=0
      let hoursAtH2=0
      let hoursAtH3=0
      let hoursAtH4=0
      let hoursAtH5=0
      const toHours = ((point) => {
        const dateArray = point.date.toString().split('')
        const year = dateArray.slice(0,4).join('')
        const month = dateArray.slice(4,6).join('')
        const day = dateArray.slice(-2).join('')
        const timeArray = point.time_utc.toString().split('')
        const hour = timeArray.slice(0,2).join('')
        const minute = timeArray.slice(-2).join('')
        const date = new Date(`${year}-${month}-${day}:${hour}:${minute}:00`)
        const milliseconds = date.getTime()
        const hours = milliseconds/(3600000)
        return hours
      })
      stormTrack.slice(1).forEach((point) => {
        const prevPoint=stormTrack[i-1]
        if (["TD","SD","TS","SS","HU"].includes(point.status)) {
          if (["TD","SD","TS","SS","HU"].includes(prevPoint.status)) {
            const wind = point.max_wind_kt
            const hours = toHours(point) - toHours(prevPoint)
            if (wind < 34) {
              hoursAtTD += hours
            }
            if (wind >= 34 && wind < 64) {
              hoursAtTD += hours
              hoursAtTS += hours
            } if (wind >= 64  && wind < 83) {
              hoursAtTD += hours
              hoursAtTS += hours
              hoursAtH1 += hours
            } if (wind >= 83  && wind < 100) {
              hoursAtTD += hours
              hoursAtTS += hours
              hoursAtH1 += hours
              hoursAtH2 += hours
            } if (wind >= 100  && wind < 110) {
              hoursAtTS += hours
              hoursAtTD += hours
              hoursAtH1 += hours
              hoursAtH2 += hours
              hoursAtH3 += hours
            } if (wind >= 110  && wind < 135) {
              hoursAtTS += hours
              hoursAtTD += hours
              hoursAtH1 += hours
              hoursAtH2 += hours
              hoursAtH3 += hours
              hoursAtH4 += hours
            } if (wind >= 135) {
              hoursAtTS += hours
              hoursAtTD += hours
              hoursAtH1 += hours
              hoursAtH2 += hours
              hoursAtH3 += hours
              hoursAtH4 += hours
              hoursAtH5 += hours
            }
          }
        }
        i+=1
      })
      const toDays = ((hours) => {
        const days = (hours/24).toFixed(1)
        return days
      })
      const daysAtTD = toDays(hoursAtTD)
      const daysAtTS = toDays(hoursAtTS)
      const daysAtH1 = toDays(hoursAtH1)
      const daysAtH2 = toDays(hoursAtH2)
      const daysAtH3 = toDays(hoursAtH3)
      const daysAtH4 = toDays(hoursAtH4)
      const daysAtH5 = toDays(hoursAtH5)
      const daysAtStrength = [daysAtTD, daysAtTS, daysAtH1, daysAtH2, daysAtH3, daysAtH4, daysAtH5]
      setDaysAtStrength(daysAtStrength)

      const costUSD = (storm[0].cost_usd/1000000000).toFixed(1)
      setCostUSD(costUSD)
  
      const fatalaties = storm[0].fatalaties.toLocaleString()
      setFatalaties(fatalaties)

      let ACEPoint = 0
      let windArray = []
      const ACE = stormTrack.map((point) => {
        const wind = point.max_wind_kt
        const hour = parseInt(point.time_utc)
        if (["TS", "SS", "HU"].includes(point.status)) {
          if (hour % 600 == 0) {
            ACEPoint += Math.pow(wind, 2)/10000
            if (windArray.length > 0) {
              let sum = 0
              windArray.forEach((wind) => {
                sum += wind
              })
              const average = sum/windArray.length
              ACEPoint += Math.pow(average, 2)/10000
              windArray = []
            }
          } else {
            windArray.push(wind)
          }
        }
        return ACEPoint
      })
      setACE(ACE)
      const totalACE = Math.max(...ACE)
      setTotalACE(totalACE)
    }
  
  }, [storm])

  useEffect(() => {
    const season = hurdat2[year - 1851]

    const stormIds = season.map((storm) => {
      return storm[0].id
    })
    setStormIds(stormIds)

    const maxWinds = season.map((storm) => {
      const wind = storm.slice(1).map((point) => {
        return point.max_wind_kt
      })
      const maxWind = Math.max(...wind)
      return maxWind
    })
    setMaxWinds(maxWinds)

    const minPressures = season.map((storm) => {
      const pressure = storm.slice(1).map((point) => {
        return point.min_pressure_mb
      })
      const minPressure = Math.min(...pressure)
      return minPressure
    })
    setMinPressures(minPressures)

    const stormNames = season.map((storm) => {
      return storm[0].id.split('_')[1]
    })
    setStormNames(stormNames)

    const tropicalStorms = season.filter(storm => 
      storm.map((point) => {return point.status}).includes("TS") ||
      storm.map((point) => {return point.status}).includes("SS")
    )
    const tropicalStormNames = tropicalStorms.map((storm) => {
      return storm[0].id.split('_')[1]
    })
    setTropicalStormNames(tropicalStormNames)

    let TD=0
    let TS=0
    let H1=0
    let H2=0
    let H3=0
    let H4=0
    let H5=0
    season.forEach((storm) => {
      const wind = storm.slice(1).map((point) => {
        return point.max_wind_kt
      })
      const maxWind = Math.max(...wind)
      if (maxWind < 34) {
        TD += 1
      }
      if (maxWind >= 34 && maxWind < 64) {
        TD += 1
        TS += 1
      } if (maxWind >= 64  && maxWind < 83)   {
        TD += 1
        TS += 1
        H1 += 1
      } if (maxWind >= 83  && maxWind < 100) {
        TD += 1
        TS += 1
        H1 += 1
        H2 += 1
      } if (maxWind >= 100  && maxWind < 110) {
        TD += 1
        TS += 1
        H1 += 1
        H2 += 1
        H3 += 1
      } if (maxWind >= 110  && maxWind < 135) {
        TD += 1
        TS += 1
        H1 += 1
        H2 += 1
        H3 += 1
        H4 += 1
      } if (maxWind >= 135) {
        TD += 1
        TS += 1
        H1 += 1
        H2 += 1
        H3 += 1
        H4 += 1
        H5 += 1
      }
    })
    const stormsAtStrength = [TD, TS, H1, H2, H3, H4, H5]
    setStormNamesAtStrength(stormsAtStrength)

    const seasonACE = tropicalStorms.map((storm) => {
      let ACE = 0
      let windArray = []
      storm.slice(1).forEach((point) => {
        const wind = point.max_wind_kt
        const hour = point.time_utc
        if (["TS", "SS", "HU"].includes(point.status)) {
          if (hour % 600 == 0) {
            ACE += Math.pow(wind, 2)/10000
            if (windArray.length > 0) {
              let sum = 0
              windArray.forEach((wind) => {
                sum += wind
              })
              const average = sum/windArray.length
              ACE += Math.pow(average, 2)/10000
              windArray = []
            }
          } else {
            windArray.push(wind)
          }
        }
      })
      return ACE
    })
    setSeasonACE(seasonACE)

    console.log(seasonACE)

    const landfallingStorms = season.filter(storm => storm.map((point) => {return point.record}).includes("L"))
    const fatalStorms = season.filter(storm => storm[0].fatalaties > 0)
    const costlyStorms = season.filter(storm => storm[0].cost_usd > 0)

    const landfallingStormNames = landfallingStorms.map((storm) => {
      return storm[0].id.split('_')[1]
    })
    setLandfallingStormNames(landfallingStormNames)

    const fatalStormNames = fatalStorms.map((storm) => {
      return storm[0].id.split('_')[1]
    })
    setFatalStormNames(fatalStormNames)

    const costlyStormNames = costlyStorms.map((storm) => {
      return storm[0].id.split('_')[1]
    })
    setCostlyStormNames(costlyStormNames)

    const seasonLandfalls = landfallingStorms.map((storm) => {
      let landfalls = 0
      storm.forEach((point) => {
        if (point.record === "L") {
          landfalls +=1
        }
      })
      return landfalls
    })
    setSeasonLandfalls(seasonLandfalls)

    const maxWindLandfalls = landfallingStorms.map((storm) => {
      let windAtLandfall = []
      storm.forEach((point) => {
        if (point.record === "L") {
          windAtLandfall.push(point.max_wind_kt)
        }
      })
      return Math.max(...windAtLandfall)
    })
    setMaxWindLandfalls(maxWindLandfalls)

    const minPressureLandfalls = landfallingStorms.map((storm) => {
      let pressureAtLandfall = []
      storm.forEach((point) => {
        if (point.record === "L") {
          pressureAtLandfall.push(point.min_pressure_mb)
        }
      })
      return Math.min(...pressureAtLandfall)
    })
    setMinPressureLandfalls(minPressureLandfalls)

    const seasonCostUSD = costlyStorms.map((storm) => {
      return storm[0].cost_usd/1000000000
    })
    setSeasonCostUSD(seasonCostUSD)

    const seasonFatalaties = fatalStorms.map((storm) => {
      return storm[0].fatalaties
    })
    setSeasonFatalaties(seasonFatalaties)

    const retiredStorms = season.filter(storm => storm[0].retired === "true")
    const retiredNames  = retiredStorms.map((storm) => {
      const name = storm[0].id.split('_')[1]
      return name
    })
    setRetiredNames(retiredNames)
  }, [year])

  const strengthLabels=["TD", "TS", "H1", "H2", "H3", "H4", "H5"]
  const strengthColors=["blue","lime", "yellow", "orange", "red", "hotpink", "pink"]

  const intensityData = {
    labels: dates,
    datasets: [
      {
        label: "Maximum Wind (kt)",
        data: wind,
        borderColor: "red",
        backgroundColor: "pink",
        yAxisID: "y"
      },
      {
        label: "Minimum Pressure (mb)",
        data: pressure,
        borderColor: "blue",
        backgroundColor: "lightblue",
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
        display: false,
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
        text: "Maximum Radius of Wind (nm)"
      },
    },
  };

  const durationData = {
    labels: strengthLabels,
    datasets: [
      {
        data: daysAtStrength,
        borderColor: strengthColors,
        backgroundColor: strengthColors,
      },
    ]
  }

  const durationOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Days at or Above Strength',
      },
    },
  };

  const ACEOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Accumulated Cyclone Energy: ${totalACE?.toFixed(1)}`
      },
    },
  };

  const ACEData = {
    labels: dates,
    datasets: [
      {
        data: ACE?.map((ACE) => {return ACE.toFixed(1)}),
        borderColor: "purple",
        backgroundColor: "pink"
      },
    ]
  }

  const maxWindData = {
    labels: stormNames,
    datasets: [
      {
        data: maxWinds,
        borderColor: "red",
        backgroundColor: "red",
      },
    ]
  }

  const maxWindOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Maximum Wind (kt)',
      },
    },
  };
  
  const minPressureData = {
    labels: stormNames,
    datasets: [
      {
        data: minPressures,
        borderColor: "blue",
        backgroundColor: "blue",
      },
    ]
  }

  const minPressureOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Minimum Pressure (mb)',
      },
    },
    scales: {
      y: {
        min: 860
      }
    }
  };

  const stormsAtStrengthData = {
    labels: strengthLabels,
    datasets: [
      {
        label: "",
        data: stormsAtStrength,
        borderColor: strengthColors,
        backgroundColor: strengthColors,
      },
    ]
  }

  const stormsAtStrengthOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Storms at or Above Strength',
      },
    },
  };

  const seasonACEData = {
    labels: tropicalStormNames,
    datasets: [
      {
        data: seasonACE?.map((ACE) => {return ACE.toFixed(1)}),
        borderColor: "purple",
        backgroundColor: "purple"
      },
    ]
  }

  const seasonACEOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Accumulated Cyclone Energy: ${sum(seasonACE).toFixed(1)}`
      }
    },
  };

  const landfallsData = {
    labels: landfallingStormNames,
    datasets: [
      {
        data: seasonLandfalls,
        borderColor: "#654321",
        backgroundColor: "#654321",
      },
    ]
  }

  const landfallsOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Landfalls: ${sum(seasonLandfalls)}`,
      },
    },
  };

  const maxWindLandfallsData = {
    labels: landfallingStormNames,
    datasets: [
      {
        data: maxWindLandfalls,
        backgroundColor: "red",
      },
    ]
  }

  const maxWindlandfallsOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Maximum Wind at Landfall (kt)"
      },
    },
  };

  const minPressureLandfallsData = {
    labels: landfallingStormNames,
    datasets: [
      {
        data: minPressureLandfalls,
        backgroundColor: "blue",
      },
    ]
  }

  const minPressureLandfallsOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Minimum Pressure at Landfall (mb)",
      },
    },
    scales: {
      y: {
        min: 860
      }
    }
  };

  const costData = {
    labels: costlyStormNames,
    datasets: [
      {
        data: seasonCostUSD?.map((cost) => {return cost.toFixed(1)}),
        borderColor: "green",
        backgroundColor: "green",
      },
    ]
  }

  const costOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Cost Estimate (Billion USD): ${sum(seasonCostUSD).toFixed(1)}`,
      },
    },
  };

  const fatalatiesData = {
    labels: fatalStormNames,
    datasets: [
      {
        data: seasonFatalaties,
        borderColor: "darkred",
        backgroundColor: "darkred",
      },
    ]
  }

  const fatalatiesOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Fatalaties: ${sum(seasonFatalaties)}`,
      },
    },
  };

  const years = new Array(2022 - 1850).fill(0)

  const toggleStats = () => {
    if (seasonStats === false) {
      setSeasonStats(true)
    } else {
      setSeasonStats(false)
    }
  }

  return (
    <div className="w-[48rem] h-screen bg-blue-950 p-10 overflow-auto">
      <div className="flex items-center justify-between mb-10">
        <Select className="bg-white !rounded-xl w-24 h-12" value={year} onChange={(e) => {setYear(e.target.value)}}>
          {years.map((_, index) => {
            const selectedYear = 2022 - index;
            return (<MenuItem key={index} value={selectedYear}>{selectedYear}</MenuItem>);
          })}
        </Select>
        <Button onClick={toggleStats} className="h-12" variant="contained"><h1 className="font-sans font-bold">{seasonStats == true ? ("Storm") : ("Season")} Stats</h1></Button>
      </div>
      {storm && seasonStats === false && <>
        <Select className="bg-white !rounded-xl w-36 h-12 mb-5" value={stormId} onChange={(e) => {setStormId(e.target.value)}}>
          {stormIds.map((id) => {
            const name = id.split("_")[1]
            return (<MenuItem key={id} value={id}>{name}</MenuItem>);
          })}
        </Select>
        <div className="flex justify-between mb-10">
          <a className="w-96 h-[31rem] bg-cover flex items-center justify-center rounded-md" style={{backgroundImage: `url(${imageUrl})`}} href={`https://www.nhc.noaa.gov/data/tcr/${stormId}.pdf`}>
            {retired == true && <img className="w-80 animate__bounceIn" src={retiredImage}/>}
          </a>
          <div className="flex flex-col w-64 font-bold">
            <h1 className={`${textColor} text-2xl mb-1 font-bold`}>{title} {name}</h1>
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
              <h1>Fatalaties: {fatalaties}</h1>
              <h1>Cost Estimate (Billion USD): {costUSD}</h1>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-md">
          <Bar options={durationOptions} data={durationData}/>
          <Line className="my-5" options={intensityOptions} data={intensityData}/>
          <Line options={ACEOptions} data={ACEData}/>
          <Line className="mt-5" options={sizeOptions} data={sizeData}/>
        </div>
      </>}
      {seasonStats && <>
        <h1 className="text-white mb-5 font-bold text-xl">Retired Names: {retiredNames.join(", ")}</h1>
        <div className="bg-white p-5 rounded-md">
          <Bar options={stormsAtStrengthOptions} data={stormsAtStrengthData}/>
          <Bar className="my-5" options={maxWindOptions} data={maxWindData}/>
          <Bar options={minPressureOptions} data={minPressureData}/>
          <Bar className="my-5" options={seasonACEOptions} data={seasonACEData}/>
          <Bar options={landfallsOptions} data={landfallsData}/>
          <Bar className="my-5" options={maxWindlandfallsOptions} data={maxWindLandfallsData}/>
          <Bar options={minPressureLandfallsOptions} data={minPressureLandfallsData}/>
          <Bar className="my-5" options={fatalatiesOptions} data={fatalatiesData}/>
          <Bar options={costOptions} data={costData}/>
        </div>
      </>}
    </div>
  )
}

export default Interface