const regReplace = (querySql, mapObj) => {
    const retVal = querySql.replace(/\{(\w+)\}/g, (oVal, mVal, index) => {
        // console.log(oVal, mVal, index);
        if (mapObj.hasOwnProperty(mVal))
            return mapObj[mVal]
        return oVal
    })
    return retVal
}

module.exports = regReplace