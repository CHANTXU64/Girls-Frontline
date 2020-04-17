class PlanCombinationCharts {
    static resize_Timetable() {
        let Chart_elem = document.getElementById("PlanCombination_chart");
        if (Chart_elem.getAttribute("_echarts_instance_") === null || !document.getElementById("PlanCombinationSwitch").checked)
            return ;
        let Chart = echarts.getInstanceByDom(Chart_elem);
        Chart.resize();
    }

    static printChart_Timetable() {
        let Chart_elem = document.getElementById("PlanCombination_chart");
        let Chart; //图表实例
        if (Chart_elem.getAttribute("_echarts_instance_") === null)
            Chart = echarts.init(Chart_elem);
        else
            Chart = echarts.getInstanceByDom(Chart_elem);

        // var data = [[10, 18, 3, 'A', 0], [10, 22, 1, 'B', 12], [18, 26, 12, 'C', 0], [26, 32, 22, 'D', 0], [32, 56, 7, 'E', 0], [56, 62, 17, 'F', 0]];
        var data = [[0,5,15,'A',0], [0,7,8,'B',15], [5, 7, 15, 'C',0]];

        let animation = false;
        if (!IsMobile())
            animation = true;

        data = echarts.util.map(data, function (item, index) {
            return {
                value: item,
                itemStyle: {
                    color: PlanCombinationCharts.colorList[index]
                }
            };
        });

        function renderItem(params, api) {
            var yValue = api.value(2);
            var start = api.coord([api.value(0), yValue + api.value(4)]);
            var size = api.size([api.value(1) - api.value(0), yValue]);
            var style = api.style();

            return {
                type: 'rect',
                shape: {
                    x: start[0],
                    y: start[1],
                    width: size[0],
                    height: size[1]
                },
                style: style
            };
        }

        let option = {
            grid: {
                left: 20,
                right: 20,
                top: 5,
                bottom: 25,
                height: 'auto'
            },
            xAxis: {
                min: 0,
                scale: true,
                axisLabel: {
                    formatter: function (val) {
                        return addDate(Input_getPC_startDate(true), val).slice(5);
                    },
                },
                max: calcDaysBetween2Dates(Input_getPC_startDate(true), Input_getPC_endDate(true)),
            },
            yAxis: {
                max: 28,
                interval: 24,
                axisLine: {
                    show: true,
                    step: 24,
                },
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                    // alignWithLabel: true,
                }
            },
            series: [{
                type: 'custom',
                renderItem: renderItem,
                encode: {
                    x: [0, 1],
                    y: 2,
                    itemName: 3
                },
                data: data
            }],
            animation: animation,
        };

        Chart.setOption(option);
    }
}

PlanCombinationCharts.colorList = [
    "#D98880", "#F1948A", "#C39BD3", "#A569BD", "#7FB3D5", "#85C1E9", "#76D7C4",
    "#73C6B6", "#A9DFBF", "#2ECC71", "#F7DC6F", "#F8C471", "#F0B27A", "#BFC9CA",
    "#B2BABB", "#85929E"
];
