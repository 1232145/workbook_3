const express = require('express');
const teacher = express.Router();

const processor = require('../dataProcessor');
teacher.get('/:api', processor.apiValidator, async (req, res) => {
    const allData = await processor.readAll();
    const {api} = req.params;
    const data = allData.filter(item => {
        return (
            item.apiKey === api
        )
    })[0]
    const track = {username: data.username, access: 'teacher'};
    await processor.trackAccess(track);
    res.json(data)
});

module.exports = teacher;