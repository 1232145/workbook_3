const file = './dataUser.json';
const fs = require('fs');

const statistic = './dataStatistic.json';

const trackAccess = async ({username, access}) => {
    const fetchData = await fs.promises.readFile(statistic, 'utf8');
    const allData = JSON.parse(fetchData);
    const data = allData.map(item => {
        if (item.username === username) {
            item[access]++
        }
        return item;
    })
    await fs.promises.writeFile(statistic, JSON.stringify(data));
    return 1;
}

const readAll = async () => {
    try {
        const data = await fs.promises.readFile(file, 'utf8');
        return JSON.parse(data)
    } catch (err) {
        console.log(err);
        return [];
    }
}

const saveDataArray = async (data) => {
    try {
        await fs.promises.writeFile(file, JSON.stringify(data));
        return 1;
    } catch (err) {
        throw err;
    }
}

const createNewRecord = async (data) => {
    const dataConvert = {
        ...data,
    }
    const allData = await readAll();
    allData.push(dataConvert);
    await saveDataArray(allData);
    return dataConvert;
}

const createUser = async (req, res) => {
    const payload = req.body;
    const result = await createNewRecord(payload);
    res.json({
        data: result
    })
}

const apiValidator = async (req, res, next) => {
    const { api } = req.params;
    const allData = await readAll();
    const data = allData.find(item => {
        return (
            item.apiKey === api
        )
    });
    if (data) {
        next();
    } else {
        res.status(400).send("No permission!")
    }
}

module.exports = {
    readAll, saveDataArray, createNewRecord, createUser, apiValidator, trackAccess
}