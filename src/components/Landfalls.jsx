import { useState, useEffect, useContext } from 'react'
import { Context } from '../App'
import BarChart from './BarChart'
import { sum } from '../libs/sum'


const Landfalls = () => {
  const {landfallingStorms} = useContext(Context)

  const [names, setNames] = useState([]);
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const names = landfallingStorms.map((storm) => {
      return storm.id.split('_')[1]
    })
    setNames(names)

    const counts = landfallingStorms.map((storm) => {
      const landfalls = storm.data.filter((point) => {
        return point.record === "L"
      })
      return landfalls.length
    })
    setCounts(counts)
  }, [landfallingStorms])

  const data = {
    labels: names,
    datasets: [
      {
        data: counts,
        borderColor: "#654321",
        backgroundColor: "#654321",
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
        text: `Landfalls: ${sum(counts)}`,
      },
    },
  };

  return <BarChart options={options} data={data}/>  
}

export default Landfalls