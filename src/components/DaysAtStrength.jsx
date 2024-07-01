import { useState, useEffect, useContext } from 'react'
import { Context } from '../App'
import BarChart from './BarChart'

const DaysAtStrength = () => {
  const {storm} = useContext(Context)

  const [daysAtStrength, setDaysAtStrength] = useState(null)

  useEffect(() => {
    const data = storm.data
    const toDays = ((point) => {
      const dateArray = point.date.toString().split('')
      const year = dateArray.slice(0,4).join('')
      const month = dateArray.slice(4,6).join('')
      const day = dateArray.slice(-2).join('')
      const timeArray = point.time_utc.toString().split('')
      const hour = timeArray.slice(0,2).join('')
      const minute = timeArray.slice(-2).join('')
      const date = new Date(`${year}-${month}-${day}:${hour}:${minute}:00`)
      const milliseconds = date.getTime()
      const hours = milliseconds/3600000
      const days = (hours/24)
      return days
    })
    let daysAtTD=0
    let daysAtTS=0
    let daysAtH1=0
    let daysAtH2=0
    let daysAtH3=0
    let daysAtH4=0
    let daysAtH5=0
    data.forEach((point, i) => {
      const nextPoint=data[i+1]
      if (nextPoint) {
        if (["TD","SD","TS","SS","HU"].includes(point.status)) {
          if (["TD","SD","TS","SS","HU"].includes(nextPoint.status)) {
            const wind = point.max_wind_kt
            const days = toDays(nextPoint) - toDays(point)
            if (wind < 34) {
              daysAtTD += days
            }
            if (wind >= 34 && wind < 64) {
              daysAtTD += days
              daysAtTS += days
            } if (wind >= 64  && wind < 83) {
              daysAtTD += days
              daysAtTS += days
              daysAtH1 += days
            } if (wind >= 83  && wind < 100) {
              daysAtTD += days
              daysAtTS += days
              daysAtH1 += days
              daysAtH2 += days
            } if (wind >= 100  && wind < 110) {
              daysAtTS += days
              daysAtTD += days
              daysAtH1 += days
              daysAtH2 += days
              daysAtH3 += days
            } if (wind >= 110  && wind < 135) {
              daysAtTS += days
              daysAtTD += days
              daysAtH1 += days
              daysAtH2 += days
              daysAtH3 += days
              daysAtH4 += days
            } if (wind >= 135) {
              daysAtTS += days
              daysAtTD += days
              daysAtH1 += days
              daysAtH2 += days
              daysAtH3 += days
              daysAtH4 += days
              daysAtH5 += days
            }
          }
        }
      }
    })
    const daysAtStrength = [daysAtTD.toFixed(1), daysAtTS.toFixed(1), daysAtH1.toFixed(1), daysAtH2.toFixed(1), daysAtH3.toFixed(1), daysAtH4.toFixed(1), daysAtH5.toFixed(1)]
    setDaysAtStrength(daysAtStrength)
  }, [storm])

  const strengthLabels=["TD", "TS", "H1", "H2", "H3", "H4", "H5"]
  const strengthColors=["blue","lime", "yellow", "orange", "red", "hotpink", "pink"]

  const data = {
    labels: strengthLabels,
    datasets: [
      {
        data: daysAtStrength,
        borderColor: strengthColors,
        backgroundColor: strengthColors,
      },
    ]
  }

  const options = {
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

  return <BarChart options={options} data={data}/>
}

export default DaysAtStrength