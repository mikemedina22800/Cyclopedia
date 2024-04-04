import { useEffect } from "react";
import hurdat2 from "../hurdat2";
import { MenuItem, Select } from '@mui/material'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { point } from "leaflet";

const Interface = ({year, setYear, name}) => {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Intensity'
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const storm = hurdat2[2022 - year].find(array => array[0].name === name)

  const dates = storm?.map((point) => {
    if (point.date) {
      const dateArray = point?.date.toString().split('')
      const month = dateArray.slice(4,6).join('')
      const day = dateArray.slice(-2).join('')
      return `${month}/${day}`
    }
  })

  const wind = storm?.map((point) => {
    return point.max_wind_kt
  })

  const pressure = storm?.map((point) => {
    return point.min_pressure_mb
  })

  const radius34kt = storm?.map((point) => {
    return Math.max(point["34kt_wind_radius_nm_ne"], point["34kt_wind_radius_nm_nw"], point["34kt_wind_radius_nm_se"], point["34kt_wind_radius_nm_sw"])
  })

  const radius50kt = storm?.map((point) => {
    return Math.max(point["50kt_wind_radius_nm_ne"], point["50kt_wind_radius_nm_nw"], point["50kt_wind_radius_nm_se"], point["50kt_wind_radius_nm_sw"])
  })

  const radius64kt = storm?.map((point) => {
    return Math.max(point["64kt_wind_radius_nm_ne"], point["64kt_wind_radius_nm_nw"], point["64kt_wind_radius_nm_se"], point["64kt_wind_radius_nm_sw"])
  })

  console.log(wind)

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Maximum Wind (kt)',
        data: wind,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y'
      },
      {
        label: 'Minimum Pressure (mb)',
        data: pressure,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1'
      },
    ]
  }

  const options2 = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Wind Radius Maximum (nm)'
      },
    },
  };

  const data2 = {
    labels: dates,
    datasets: [
      {
        label: '34-49 kt (Low-End TS)',
        data: radius34kt,
        borderColor: 'gold',
        backgroundColor: 'lightyellow'
      },
      {
        label: '50-63 kt (High-End TS)',
        data: radius50kt,
        borderColor: 'orange',
        backgroundColor: 'rgb(255, 213, 128)',
      },
      {
        label: '64+ kt (HU)',
        data: radius64kt,
        borderColor: 'red',
        backgroundColor: 'pink',
      }
    ]
  }
  
  const years = new Array(2022 - 1850).fill(0)

  return (
    <div className='w-[48rem] h-full bg-blue-800 p-5'>
      <Select className="bg-white !rounded-xl w-24 h-12 mb-5" value={year} onChange={(e) => {setYear(e.target.value)}}>
        {years.map((_, index) => {
          const selectedYear = 2022 - index;
          return (<MenuItem key={selectedYear} value={selectedYear}>{selectedYear}</MenuItem>);
        })}
      </Select>
      <div className="bg-white">
        <img className="w-96"/>
        <Line options={options} data={data}/>
        <Line options={options2} data={data2}/>
      </div>
    </div>
  )
}

export default Interface