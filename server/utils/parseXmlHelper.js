
const fs = require("fs");
const convert = require("xml-js");

const parseXml = filePath =>{
    console.log(filePath);
    const xmlText = fs.readFileSync(filePath,'utf-8');
    const jsonData = convert.xml2json(xmlText, {compact: true, spaces: 4});
    //console.log(jsonData);
    return JSON.parse(jsonData);
}

module.exports = parseXml