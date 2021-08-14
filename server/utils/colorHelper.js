const {
    ColorConfig
} = require('../parseConfig/parseConfig')("legend")

const getColors = (colorCategary) => {
    const categoryItem = ColorConfig.Categorys.Category.find(item => item._attributes.Name === colorCategary)
    // console.log(categoryItem.ColorItems.ColorItem)
    return categoryItem.ColorItems.ColorItem.map(item => ({name: item.Name._text, color: `rgb(${item.Color._text})` }))
}

module.exports = getColors