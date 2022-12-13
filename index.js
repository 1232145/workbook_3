const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const router = require('./router/index')

app.use('/', router)

app.get('/system/statistic', async (req, res) => {
    
})

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})