/* Global Variables */
const form = document.querySelector('.app_form');
const icons = document.querySelectorAll('.entry_icon');

// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5beb43e13dc3fa8be428191e6e50a00c';

let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  e.preventDefault();
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      updateUI()
    })
  form.reset();
}

const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    icons.forEach(icon => icon.style.opacity = '1');
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};
