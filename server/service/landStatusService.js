// 关联查询服务
const dbHelper = require('../utils/postgres.js');
const regReplace = require('../utils/regexHelper')
const getColors = require('../utils/colorHelper')
const parseConfig = require('../parseConfig/parseConfig')

const fs = require('fs');
const readFile = function (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}


const configMap = {};
const gainConfigData = configName => {
    if (configMap.hasOwnProperty(configName)) return configMap[configName]

    const configData = parseConfig(configName);
    configMap[configName] = configData;
    return configData;
}


const gainDataGroup = configName => {
    const {root} = gainConfigData(configName);
    return root.datagroup;
}

// 暂时设定，后面会把字典值从前端通过条件传入
/*const mapObj = {
    yearfilter: "2019",
    xzqhfilter: "110000",
    jb: "sj" //qg,sj,dsj,xj,xzj,cj
}*/

const gainMapper = p => {
    return {
        xzqh: p.regionName,
        yearfilter: p.curYear,
        xzqhfilter: p.regionCode,
        jb: p.regionLevel //qg,sj,dsj,xj,xzj,cj
    }
}

const queryFun = async ({themeGroup, themeItem, chartKey, queryParams}) => {
    const dataGroup = gainDataGroup(themeGroup);
    if (!dataGroup) return {}
    const chartTheme = dataGroup.theme.find(item => item._attributes.name === themeItem)
    if (!chartTheme) return {}
    const queryChart = chartTheme.chart.find(item => item._attributes.name === chartKey)
    if (!queryChart) return {}
    const dataRef = chartTheme.datatable.find(item => item._attributes.name === queryChart._attributes.dataref)

    const mapObj = {...queryParams}; //gainMapper(queryParams);
    console.log('queryParams....', queryParams);
    const querySql = dataRef._text;
    const parseSql = regReplace(querySql, mapObj);
    console.log('querySql....', parseSql);
    const attribute = queryChart._attributes;
    const xAxis = attribute['field-x'].split(',');
    const x = xAxis[0];
    const colorCategroy = attribute.colorcategory;
    const colors = colorCategroy && getColors(colorCategroy);
    const xColors = colors && colors.map(c => {
        const retObj = {keys: {}, color: c.color}
        retObj.keys[x] = c.name
        return retObj
    });
    const tableData = await dbHelper.query(parseSql);

    return {
        key: attribute.name,
        name: regReplace(attribute.title, mapObj),
        xAxis,
        yAxis: attribute['field-y'].split(','),
        colors: attribute['colors'] && attribute['colors'].split(';'),
        xColors,
        data: tableData.rows
    }
}

const queryFunFromLocal = async ({themeGroup, themeItem, chartKey, queryParams}) => {
    const dataGroup = gainDataGroup(themeGroup);
    if (!dataGroup) return {}
    const chartTheme = dataGroup.theme.find(item => item._attributes.name === themeItem)
    if (!chartTheme) return {}
    const queryChart = chartTheme.chart.find(item => item._attributes.name === chartKey)
    if (!queryChart) return {}
    const dataRef = chartTheme.datatable.find(item => item._attributes.name === queryChart._attributes.dataref)

    const mapObj = {...queryParams};//const mapObj = gainMapper(queryParams);
    const querySql = dataRef._text;
    const parseSql = regReplace(querySql, mapObj);
    const attribute = queryChart._attributes;
    const xAxis = attribute['field-x'].split(',');
    const x = xAxis[0];
    const colorCategroy = attribute.colorcategory;
    const colors = colorCategroy && getColors(colorCategroy);
    const xColors = colors && colors.map(c => {
        const retObj = {keys: {}, color: c.color}
        retObj.keys[x] = c.name
        return retObj
    });
    const jsonData = await readFile(`./public/jbnt/${chartKey}.json`)
    const tableData = JSON.parse(jsonData);

    return {
        key: attribute.name,
        name: regReplace(attribute.title, mapObj),
        xAxis,
        yAxis: attribute['field-y'].split(','),
        colors: attribute['colors'] && attribute['colors'].split(';'),
        xColors,
        data: tableData.data
    }
}

module.exports = queryFunFromLocal