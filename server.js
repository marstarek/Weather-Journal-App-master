let projectData = {};
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('website'));

const data = [];
app.post('/add', addInfo);

function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

app.get('/all', getInfo);

function getInfo(req, res) {
  res.send(projectData);
}
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
};
