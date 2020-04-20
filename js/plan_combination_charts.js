class PlanCombinationCharts {
    static resize_Timetable() {
        let Chart_elem = document.getElementById("PlanCombination_chart");
        if (Chart_elem.getAttribute("_echarts_instance_") === null || !document.getElementById("PlanCombinationSwitch").checked)
            return ;
        let Chart = echarts.getInstanceByDom(Chart_elem);
        Chart.resize();
    }

    static printChart_Timetable(plansTimeData) {
        let Chart_elem = document.getElementById("PlanCombination_chart");
        let Chart; //图表实例
        if (Chart_elem.getAttribute("_echarts_instance_") === null)
            Chart = echarts.init(Chart_elem);
        else
            Chart = echarts.getInstanceByDom(Chart_elem);

        let startDate = Input_getPC_startDate();
        let endDate = Input_getPC_endDate();
        let is_sameYear = startDate.slice(0, 4) === endDate.slice(0, 4);
        let totalDays = calcDaysBetween2Dates(startDate, endDate);
        let data = this.plansTimeDataToChartData(plansTimeData, totalDays);
        this._data = data;

        let animation = false;
        if (!IsMobile())
            animation = true;

        let testData = [10000, 20000, 20000, 10000, 20000, 20000, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        let xAxisData = new Array(totalDays + 1).fill(0);

        let option = {
            grid: [
                {
                    left: 50,
                    right: 15,
                    top: 10,
                    height: 125
                },
                {
                    left: 50,
                    right: 15,
                    bottom: 45,
                    height: 70
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    minValueSpan: 7,
                    filterMode: 'weakFilter'
                },
                {
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    showDataShadow: false,
                    bottom: 9,
                    height: 10,
                    filterMode: 'weakFilter',
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
            xAxis: [
                {
                    max: totalDays,
                    data: xAxisData,
                    axisTick: {show: false},
                    axisLabel: {
                        show: false,
                    },
                    boundaryGap: false,
                    gridIndex: 0
                },
                {
                    min: 0,
                    // type: 'time',
                    scale: true,
                    // boundaryGap: false,
                    // data: xAxisData,
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
                    type: 'value',
                    gridIndex: 0
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
                    data: testData,
                    type: 'line',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                },
                {
                    type: 'custom',
                    renderItem: PC_renderItem,
                    encode: {
                        x: [0, 1],
                        y: 2,
                        itemName: 3
                    },
                    data: data,
                    clip: true,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                }
            ],
            // animation: animation,
        };

        Chart.setOption(option);
    }

    // static _calcXAxisData(startDate, totalDays, is_sameYear) {
    //     let data = [];
    //     let length = totalDays + 1;
    //     for (let i = 0; i < length; ++i) {
    //         let date = addDate(startDate, i);
    //         let shortDate = date.slice(5);
    //         if (is_sameYear)
    //             data.push(shortDate);
    //         else {
    //             let year = date.slice(0, 4);
    //             data.push(shortDate + '\n' + year);
    //         }
    //     }
    //     return data;
    // }

    static plansTimeDataToChartData(plansTimeData, totalDays) {
        if(!plansTimeData)
            return ;

        let data = [];
        let timetable = new Array(totalDays);
        timetable.fill(0);

        let plans_length = plansTimeData.length;
        for (let i = 0; i < plans_length; ++i) {
            let newData = {};
            newData.name = plansTimeData[i].number;
            let thisTimeData = plansTimeData[i];
            let thisPlanTotalTime = thisTimeData.time;
            //格式[height, (xindex, yindex, width,) (xindex......]
            newData.value = [thisPlanTotalTime];
            let timePeriod_length = thisTimeData.timePeriod.length;
            for (let ii = 0; ii < timePeriod_length; ++ii) {
                let startDate = thisTimeData.timePeriod[ii][0];
                let endDate = thisTimeData.timePeriod[ii][1];
                let lastYIndex = -1;
                for (let date = startDate; date < endDate; ++date) {
                    timetable[date] += thisPlanTotalTime;
                    let yIndex = timetable[date];
                    let timeData = newData.value;
                    if (yIndex === lastYIndex) {
                        timeData[timeData.length - 1]++;
                    }
                    else {
                        let xIndex = date;
                        timeData.push(xIndex);
                        timeData.push(yIndex);
                        timeData.push(1);
                        lastYIndex = timetable[date];
                    }
                }
            }
            newData.itemStyle = {};
            newData.itemStyle.color = this.colorList[i];
            data.push(newData);
        }
        return data;
    }
}

PlanCombinationCharts.colorList = [
    "#D98880", "#F1948A", "#C39BD3", "#A569BD", "#7FB3D5", "#85C1E9", "#76D7C4",
    "#73C6B6", "#A9DFBF", "#2ECC71", "#F7DC6F", "#F8C471", "#F0B27A", "#BFC9CA",
    "#B2BABB", "#85929E"
];

PlanCombinationCharts._data = [];

function PC_renderItem(params, api) {
    let style = api.style();
    let groupChildren = [];
    let totalTime = api.value(0);
    let index = params.dataIndex;
    let data_value = PlanCombinationCharts._data[index].value;
    let i = 0;
    while (!isNaN(data_value[3 * i + 1])) {
        let start = api.coord([data_value[3 * i + 1], data_value[3 * i + 2]]);
        let size = api.size([data_value[3 * i + 3], totalTime]);
        let child = {};
        child.type = 'rect';
        child.shape = {};
        child.shape.x = start[0];
        child.shape.y = start[1];
        child.shape.width = size[0];
        child.shape.height = size[1];
        child.style = style;
        groupChildren.push(child);
        ++i;
    }

    return {
        type: 'group',
        children: groupChildren,
   };
}
