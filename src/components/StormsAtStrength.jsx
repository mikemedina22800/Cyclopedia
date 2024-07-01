import { useState, useEffect, useContext } from 'react'
import { Context } from '../App'
import BarChart from './BarChart';

const StormsAtStrength = () => {
  const {season} = useContext(Context)

  const [stormsAtStrength, setStormNamesAtStrength] = useState(null)
  
  useEffect(() => {
    let TD=0
    let TS=0
    let H1=0
    let H2=0
    let H3=0
    let H4=0
    let H5=0
    season.forEach((storm) => {
      const wind = storm.data.map((point) => {
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

  }, [season])

  const strengthLabels=["TD", "TS", "H1", "H2", "H3", "H4", "H5"]
  const strengthColors=["blue","lime", "yellow", "orange", "red", "hotpink", "pink"]

  const data = {
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

  const options = {
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
  return <BarChart options={options} data={data}/>
}

export default StormsAtStrength