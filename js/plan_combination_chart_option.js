function plan_combination_getChartOption(startDate, endDate) {
    let totalDays = calcDaysBetween2Dates(startDate, endDate);
    let xAxisData = new Array(totalDays + 1).fill(0);
    let is_sameYear = startDate.slice(0, 4) === endDate.slice(0, 4);
    let animation = false;
    if (!IsMobile())
        animation = true;

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
        tooltip: {
            trigger: 'axis'
        },
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                minValueSpan: 7,
                filterMode: 'none'
                // filterMode: 'weakFilter'
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                showDataShadow: false,
                bottom: 9,
                height: 10,
                // filterMode: 'weakFilter',
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
                data: PlanCombinationChart._reAndcoData[0],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
            },
            {
                data: PlanCombinationChart._reAndcoData[1],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
            },
            {
                data: PlanCombinationChart._reAndcoData[2],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
            },
            {
                data: PlanCombinationChart._reAndcoData[3],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
            },
            {
                data: PlanCombinationChart._reAndcoData[4],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
            },
            {
                data: PlanCombinationChart._reAndcoData[5],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
            },
            {
                data: PlanCombinationChart._reAndcoData[6],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
            },
            {
                data: PlanCombinationChart._reAndcoData[7],
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
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
                yAxisIndex: 1,
            },
            {
                type: 'custom',
                renderItem: PC_renderItem_Consumption,
                data: PlanCombinationChart._ConsumptionTimetableData,
                clip: true,
                xAxisIndex: 1,
                yAxisIndex: 1,
            }
        ],
        // animation: animation,
    };
    return option;
}
