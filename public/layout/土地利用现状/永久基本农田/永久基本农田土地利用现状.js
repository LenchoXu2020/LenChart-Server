(function () {
    const linkLayout = [{
        "title": {
            "isChecked": false,
            "isCanClick": true
        },
        "layout": {
            "grid-area": "d"
        },
        "key": "永久基本农田内耕地坡度分级面积_各耕地面积",
        "type": "column_4",
        "row": 1,
        "rowSpan": 1,
        "column": 59,
        "columnSpan": 14,
        "legend": {
            "show": false
        },
        "titleClick": true,
        "click": {
            "canClick": true,
            "canSelect": true
        },
        "canMaximized": true,
        "maxItem": {
            "canFulled": true,
            "layout": {
                "display": "grid",
                "grid-template-rows": "100%",
                "grid-template-columns": "50% 50%",
                "grid-template-areas": "'a b'"
            },
            "charts": [
                {
                    "title": {
                        "isChecked": false,
                        "isCanClick": false
                    },
                    "layout": {
                        "grid-area": "b"
                    },
                    "key": "永久基本农田土地利用现状",
                    "type": "pie_1",
                    "row": 1,
                    "rowSpan": 1,
                    "column": 44,
                    "columnSpan": 15,
                    "legend": {
                        "show": false
                    },
                    "titleClick": true,
                    "click": {
                        "canClick": true,
                        "canSelect": true
                    },
                    "canMaximized": false
                }
            ],
            "fullItem": {
                "rowStyle": "3fr 5fr",
                "charts": [
                    {
                        "key": "永久基本农田种植类型面积->各种植属性",
                        "type": "column_4",
                        "row": 1,
                        "rowSpan": 1,
                        "column": 1,
                        "columnSpan": 72,
                        "legend": {
                            "show": true
                        }
                    },
                    {
                        "key": "永久基本农田种植类型面积->各种植属性",
                        "type": "table_1",
                        "row": 2,
                        "rowSpan": 1,
                        "column": 1,
                        "columnSpan": 72
                    }
                ]
            }
        }
    }]

    let parentLayout = {}
    const layoutMap = {}

    function pushLayoutData(layoutData) {
        console.log("pushLayoutData", layoutData);
        const gridArea = layoutData.layout["grid-area"];
        let index = parentLayout.findIndex(v => v.layout["grid-area"] == gridArea);
        if (index < 0) return;
        const oldLayoutData = parentLayout.splice(index, 1, layoutData)[0];
        if (!layoutMap.hasOwnProperty(gridArea))
            layoutMap[gridArea] = [oldLayoutData];
        else layoutMap[gridArea].push(oldLayoutData);
    }

    function popLayoutData(gridArea) {
        console.log("popLayoutData:" + gridArea);
        if (layoutMap.hasOwnProperty(gridArea) && layoutMap[gridArea].length > 0) {
            let index = parentLayout.findIndex(v => v.layout["grid-area"] == gridArea);
            if (index < 0) return;
            // const lastLayoutData = layoutMap[gridArea].pop();
            const lastLayoutData = layoutMap[gridArea][0];
            parentLayout.splice(index, 1, lastLayoutData);
        }
    }

    const changeLinkChart = function (parentLayoutData, params) {
        console.log('changeLinkChart被调用了', parentLayoutData, params)
        parentLayout = parentLayoutData;
        const {isSelect} = params;
        if(isSelect){
            const layoutData = linkLayout[0]
            layoutData.params = params
            console.log('layoutData.......',layoutData)
            pushLayoutData(layoutData)
        }else {
            popLayoutData("d")
        }
    }

    return {changeLinkChart}
})()