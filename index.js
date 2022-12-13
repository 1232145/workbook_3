const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const router = require('./router/index')

app.use('/', router)

const file = './dataStatistic.json';
app.get('/system/statistic', async (req, res) => {
    const readData = await fs.promises.readFile(file, 'utf8');
    const data = JSON.parse(readData)
    res.json(data)
})

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
