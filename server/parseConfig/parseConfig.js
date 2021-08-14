const path = require("path");
const parseXml = require('../utils/parseXmlHelper');

module.exports = (key) => {
    const filePath = path.resolve(`./data/${key}.xml`)
    const parseData = parseXml(filePath)
    // console.log(data);
    return parseData;
}