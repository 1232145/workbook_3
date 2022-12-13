const express = require('express');
const student = express.Router();

const processor = require('../dataProcessor');
student.get('/:api', processor.apiValidator, async (req, res) => {
    const allData = await processor.readAll();
    const {api} = req.params;
    const data = allData.filter(item => {
        return (
            item.apiKey === api
        )
    })[0]
    const track = {username: data.username, access: 'student'};
    await processor.trackAccess(track);
    res.json(data)
});

module.exports = student;