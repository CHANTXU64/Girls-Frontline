function plan_combination_getChartOption(startDate, endDate) {
    let totalDays = calcDaysBetween2Dates(startDate, endDate);
    let xAxisData = new Array(totalDays + 1);
    for (let i = 0; i < totalDays + 1; ++i) {
        xAxisData[i] = addDate(startDate, i);
    }
    let is_sameYear = startDate.slice(0, 4) === endDate.slice(0, 4);
    let lang = language.JS;
    let animation = false;
    let level = Input_getPC_CommanderLevel();
    let softcap = getResourceSoftcap(level);
    let is_regen = (level !== -1);
    let resourceMarkLine;
    if (is_regen) {
        resourceMarkLine = [{yAxis: 0}, {yAxis: softcap}, {yAxis: 300000}];
    }
    else {
        resourceMarkLine = [{yAxis: 0},{yAxis: 300000}];
    }
    if (!IsMobile())
        animation = true;

    let option = {
        grid: [
            {
                left: 60,
                right: 45,
                top: 50,
                height: 125,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                    },
                }
            },
            {
                left: 60,
                right: 45,
                bottom: 55,
                height: 70,
                tooltip: {
                    type: 'item',
                }
            }
        ],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(245, 245, 245, 0.9)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000'
            },
            position: function (pos, params, el, elRect, size) {
                var obj = {top: 10};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            formatter: function (params) {
                let text = "";
                text += xAxisData[params[0].axisValue] + '&nbsp;&nbsp;0:00<br>';
                for (let i = 0; i < params.length; ++i) {
                    text += params[i].marker + params[i].seriesName + ': ';
                    let val = params[i].data[1];
                    if (val < 0)
                        text += '<span style="color: red;">';
                    else if (val === 0)
                        text += '<span>';
                    else if (val < softcap && params[i].componentIndex < 4)
                        text += '<span style="color: blue;">';
                    else if (val >= 300000 && params[i].componentIndex < 4)
                        text += '<span style="color: green;">';
                    else
                        text += '<span>';
                    text += val.toLocaleString() + '</span><br>';
                }
                return text;
            },
            extraCssText: 'width: 170px'
        },
        toolbox: {
            right: 30,
            feature: {
                saveAsImage: {
                    name: 'GF',
                    title: ' ',
                }
            }
        },
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                minValueSpan: 7,
                filterMode: 'none'
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                showDataShadow: false,
                bottom: 9,
                height: 10,
                filterMode: 'none',
                borderColor: 'transparent',
                backgroundColor: '#e2e2e2',
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
                handleSize: 16,
                handleStyle: {
                    shadowBlur: 6,
                    shadowOffsetX: 1,
                    shadowOffsetY: 2,
                    shadowColor: '#aaa'
                },
                minValueSpan: 7,
                labelFormatter: ''
            }
        ],
        legend: {
            left: 0
        },
        xAxis: [
            {
                type: 'value',
                min: 0,
                max: totalDays,
                axisTick: {show: false},
                scale: true,
                axisLabel: {
                    show: false,
                },
                boundaryGap: false,
                gridIndex: 0,
                axisLine: {onZero: false},
            },
            {
                type: 'value',
                min: 0,
                scale: true,
                minInterval: 1,
                axisLabel: {
                    formatter: function (val) {
                        let date = addDate(startDate, val);
                        let shortDate = date.slice(5);
                        if (is_sameYear)
                            return shortDate;
                        else {
                            let year = date.slice(0, 4);
                            return shortDate + '\n' + year;
                        }
                    },
                },
                max: totalDays,
                gridIndex: 1
            }
        ],
        yAxis: [
            {
                name: language.JS.resource,
                nameGap: 9,
                type: 'value',
                scale: true,
                gridIndex: 0,
                splitLine: {
                    show: false
                },
                minInterval: 1
            },
            {
                name: language.JS.contract,
                nameGap: 9,
                type: 'value',
                scale: true,
                gridIndex: 0,
                splitLine: {
                    show: false
                },
                minInterval: 1
            },
            {
                max: 1680,
                interval: 1440,
                axisLine: {
                    show: true,
                    step: 1440,
                },
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                },
                gridIndex: 1
            },
        ],
        series: [
            {
                name: language.JS.Manp,
                data: PlanCombinationChart._reAndcoData[0],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                markLine: {
                    silent: true,
                    label: {show: false},
                    data: resourceMarkLine,
                    symbol: 'none',
                    precision: 0,
                }
            },
            {
                name: language.JS.Ammu,
                data: PlanCombinationChart._reAndcoData[1],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                markLine: {
                    silent: true,
                    label: {show: false},
                    data: resourceMarkLine,
                    symbol: 'none',
                    precision: 0,
                }
            },
            {
                name: language.JS.Rati,
                data: PlanCombinationChart._reAndcoData[2],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                markLine: {
                    silent: true,
                    label: {show: false},
                    data: resourceMarkLine,
                    symbol: 'none',
                    precision: 0,
                }
            },
            {
                name: language.JS.Part,
                data: PlanCombinationChart._reAndcoData[3],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                markLine: {
                    silent: true,
                    label: {show: false},
                    data: resourceMarkLine,
                    symbol: 'none',
                    precision: 0,
                }
            },
            {
                name: language.JS.TPro,
                data: PlanCombinationChart._reAndcoData[4],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 1,
                markLine: {
                    silent: true,
                    label: {show: false},
                    data: {
                        yAxis: 0
                    },
                    symbol: 'none',
                    precision: 0,
                }
            },
            {
                name: language.JS.Equi,
                data: PlanCombinationChart._reAndcoData[5],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 1,
                markLine: {
                    silent: true,
                    label: {show: false},
                    data: {
                        yAxis: 0
                    },
                    symbol: 'none',
                    precision: 0,
                }
            },
            {
                name: language.JS.QPro,
                data: PlanCombinationChart._reAndcoData[6],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 1,
                markLine: {
                    silent: true,
                    label: {show: false},
                    data: {
                        yAxis: 0
                    },
                    symbol: 'none',
                    precision: 0,
                }
            },
            {
                name: language.JS.QRes,
                data: PlanCombinationChart._reAndcoData[7],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 1,
                markLine: {
                    silent: true,
                    label: {show: false},
                    data: {
                        yAxis: 0
                    },
                    symbol: 'none',
                    precision: 0,
                }
            },
            {
                type: 'custom',
                renderItem: PC_renderItem_Logistics,
                encode: {
                    x: [0, 1],
                    y: 2,
                    itemName: 3
                },
                data: PlanCombinationChart._LogisticsTimetableData ,
                clip: true,
                xAxisIndex: 1,
                yAxisIndex: 2,
                tooltip: {
                    formatter: function (params) {
                        let index = params.dataIndex;
                        let name = language.JS.chartTooltip_L;
                        let LogisticsPlanData = PlanCombinationChart._LogisticsTimetableOriginalData[index];
                        let Missions = LogisticsPlanData.saved.Missions;
                        let color = ['#A1C0FF', '#FF8C8A', '#75d874', '#FFDA93'];
                        let marker1 = "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:";
                        let marker2 = ";'></span>";
                        let text = name + '<br>';
                        text += language.JS.Mission + ': <br>';
                        for (let i = 0; i < Missions.length; ++i) {
                            text += marker1 + color[i] + marker2;
                            text += Missions[i] + '<br>';
                        }
                        return text;
                    }
                },
            },
            {
                type: 'custom',
                renderItem: PC_renderItem_Consumption,
                data: PlanCombinationChart._ConsumptionTimetableData,
                clip: true,
                xAxisIndex: 1,
                yAxisIndex: 2,
                tooltip: {
                    formatter: function (params) {
                        let index = params.dataIndex;
                        let name = language.JS.chartTooltip_C;
                        let consumptionData = PlanCombinationChart._ConsumptionTimetableOriginalData[index];
                        let reAndco = consumptionData.reAndco;
                        let text = name + '<br>';
                        let color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a'];
                        let marker1 = "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:";
                        let marker2 = ";'></span>";
                        const class_name = ['Manp', 'Ammu', 'Rati', 'Part', 'TPro', 'Equi', 'QPro', 'QRes'];
                        for (let i = 0; i < 8; ++i) {
                            text += marker1 + color[i] + marker2;
                            text += language.JS[class_name[i]];
                            text += ': ';
                            if (reAndco[i] > 0)
                                text += '<span style="color: green;">+';
                            else if (reAndco[i] < 0)
                                text += '<span style="color: red;">';
                            else
                                text += '<span>';
                            text += NumberAutoExact(reAndco[i]).toLocaleString() + '</span><br>';
                        }
                        return text;
                    }
                },
            }
        ],
        animation: animation,
    };
    return option;
}
