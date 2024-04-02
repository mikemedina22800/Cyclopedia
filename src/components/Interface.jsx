import { MenuItem, Select } from '@mui/material'

const Interface = ({year}) => {
  const years = new Array(2022 - 1850).fill(0)

  return (
    <div className='w-96 h-full bg-blue-800 p-5'>
      <Select className="bg-white !rounded-xl w-24 h-12" value={year} onChange={(e) => {setYear(e.target.value)}}>
        {years.map((_, index) => {
          const selectedYear = 2022 - index;
          return (<MenuItem key={selectedYear} value={selectedYear}>{selectedYear}</MenuItem>);
        })}
      </Select>
    </div>
  )
}

export default Interface