import { useState, useEffect, useContext } from 'react'
import { Context } from '../App'
import LineChart from './LineChart'

const Size = () => {
  const {storm, dates} = useContext(Context)

  const [radius34kt, setRadius34kt] = useState(null)
  const [radius50kt, setRadius50kt] = useState(null)
  const [radius64kt, setRadius64kt] = useState(null)

  useEffect(() => {
    const data = storm.data
    const windRadii = data.filter(point => point["34kt_wind_radius_nm_ne"] != -999)
    const radius34kt = windRadii.map((point) => {
      return Math.max(point["34kt_wind_radius_nm_ne"], point["34kt_wind_radius_nm_nw"], point["34kt_wind_radius_nm_se"], point["34kt_wind_radius_nm_sw"])
    })
    setRadius34kt(radius34kt)
    const radius50kt = windRadii.map((point) => {
      return Math.max(point["50kt_wind_radius_nm_ne"], point["50kt_wind_radius_nm_nw"], point["50kt_wind_radius_nm_se"], point["50kt_wind_radius_nm_sw"])
    })
    setRadius50kt(radius50kt)
    const radius64kt = windRadii.map((point) => {
      return Math.max(point["64kt_wind_radius_nm_ne"], point["64kt_wind_radius_nm_nw"], point["64kt_wind_radius_nm_se"], point["64kt_wind_radius_nm_sw"])
    })
    setRadius64kt(radius64kt)
  }, [storm])

  const data = {
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

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Maximum Radius of Wind (nm)"
      },
    },
  };

  return <LineChart options={options} data={data}/>
}

export default Size