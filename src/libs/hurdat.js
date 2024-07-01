const options = {
  method: 'GET',
  headers: {
    'Content-Type' : 'application/json'
  }
}

export const getHurdat = async (year) => {
  const response = await fetch(`https://hurdat2-api.onrender.com/${year}`, options)
  const data = await response.json();
  return data;
}