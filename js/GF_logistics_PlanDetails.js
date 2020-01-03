function PrintPlanDetails() {
    _PrintPlanDetails_ShownTab();
    _PrintPlanDetails_TotalTime();
    _PrintPlanDetails_GreatSuccessRate();

    document.getElementById("PlanDetails_Mission_1").innerHTML = "";
    document.getElementById("PlanDetails_Mission_2").innerHTML = "";
    document.getElementById("PlanDetails_Mission_3").innerHTML = "";
    document.getElementById("PlanDetails_Mission_4").innerHTML = "";
    document.getElementById("PlanDetails_PerHour").innerHTML = "";
    document.getElementById("PlanDetails_Total").innerHTML = "";
    Chart = echarts.init(document.getElementById('PlanDetails_Chart'));
    Chart.dispose();

    if (MISSION_TABLE_SELECT.length !== 0) {
        var missionTableSelect = MISSION_TABLE_SELECT.slice();
        var mission_table = MISSION_TABLE;
        missionTableSelect = missionTableSelect.sort(sortStringNumber);
        var ResourceContractValue = new Array(8);
        ResourceContractValue.fill(0);
        var tab_td_start = "<td style='text-align:center;'>";
        var tab_td_end = "</td>";
        var selectedMissions_table = [];
        var color = ['#C5D8FF', '#FFBFBE', '#B6F4B5', '#FFEBC7'];
        for (var i = 0; i < missionTableSelect.length; i++) {
            var number;
            for (var ii = 0; ii < mission_table.length; ii++) {
                if (missionTableSelect[i] === mission_table[ii][0]) {
                    number = ii;
                    break;
                }
            }
            selectedMissions_table.push(mission_table[number]);
            var tab = "";
            tab += tab_td_start + mission_table[number][0] + tab_td_end;
            for (var ii = 1; ii < 9; ii++) {
                tab += tab_td_start;
                tab += NumberAutoExact(mission_table[number][ii] * 60);
                ResourceContractValue[ii - 1] += mission_table[number][ii];
                tab += tab_td_end;
            }
            tab += tab_td_start + TimeFormat(mission_table[number][9]) + tab_td_end;
            document.getElementById("PlanDetails_Mission_" + (i + 1)).innerHTML = tab;
            document.getElementById("PlanDetails_Mission_" + (i + 1)).style.backgroundColor = color[i];
        }

        var tab = "";
        tab += "<td style='text-align:center;'id='PlanDetails_PerHour_title'>" + language.JS.PerHour + tab_td_end;
        for (var i = 0; i < 8; i++) {
            tab += tab_td_start;
            tab += NumberAutoExact(ResourceContractValue[i] * 60);
            tab += tab_td_end;
        }
        tab += "<td></td>";
        document.getElementById("PlanDetails_PerHour").innerHTML = tab;

        var ShownTab = getShownTab();
        ShownTab.setTime(false);
        var TotalMinutes = ShownTab.TotalTime;
        tab = "<td style='text-align:center;'id='PlanDetails_Total_title'>" + language.JS.Total + tab_td_end;
        for (var i = 0; i < 8; i++) {
            tab += tab_td_start;
            tab += NumberAutoExact(ResourceContractValue[i] * TotalMinutes);
            tab += tab_td_end;
        }
        tab += "<td></td>";
        document.getElementById("PlanDetails_Total").innerHTML = tab;

        print_chart(selectedMissions_table, TotalMinutes);
    }
}
function _PrintPlanDetails_ShownTab() {
    var ShownTab_Name;
    switch (HTML_TAB) {
        case "Anytime":
            ShownTab_Name = language.HTML.tab_Anytime;
            break;
        case "Timetable":
            ShownTab_Name = language.HTML.tab_Timetable;
            break;
    }
    document.getElementById("PlanDetails_ShownTab").innerHTML = language.JS.PlanDetails_calculateMethod + ': ' + ShownTab_Name;
}
function _PrintPlanDetails_TotalTime() {
    var ShownTab = getShownTab();
    ShownTab.setTime(false);
    var TotalMinutes = ShownTab.TotalTime;
    document.getElementById("PlanDetails_TotalTime").innerHTML = language.JS.total_time + ": " + TimeFormat(TotalMinutes);
}
function _PrintPlanDetails_GreatSuccessRate() {
    var TotalGreatSuccessRate = Input_getTotalGreatSuccessRate();
    document.getElementById("PlanDetails_GreatSuccessRate").innerHTML = language.JS.total_greatSuccessRate + ": " + TotalGreatSuccessRate + "%";
}

var Chart;
function print_chart(selectedMissions_table, TotalMinutes) {
    Chart = echarts.init(document.getElementById('PlanDetails_Chart'));

    var missions_name = [];
    var missions_time = [];
    var missions_CollectTimetable = [];
    var dataCount = [];
    var types = [];
    var color = ['#A1C0FF', '#FF8C8A', '#75d874', '#FFDA93'];
    for (var i = selectedMissions_table.length - 1; i >= 0; i--) {
        missions_name.push(selectedMissions_table[i][0]);
        missions_time.push(selectedMissions_table[i][9]);
        missions_CollectTimetable.push(selectedMissions_table[i][10]);
        dataCount.push(selectedMissions_table[i][10].length);
        types.push({name: selectedMissions_table[i][0], color: color[i]});
    }

    var data = [];
    var categories = ['0', '1', '2', '3'];
    
    // Generate mock data
    echarts.util.each(categories, function (category, index) {
        var baseTime;
        for (var i = 0; i < dataCount[category]; i++) {
            var typeItem = types[category];
            var duration = missions_time[category];
            data.push({
                name: typeItem.name,
                value: [
                    index,
                    baseTime = missions_CollectTimetable[category][i] - duration,
                    baseTime += duration - 1,
                    duration - 1
                ],
                itemStyle: {
                    normal: {
                        color: typeItem.color
                    }
                }
            });
            data.push({
                name: 'none',
                value: [
                    index,
                    baseTime = missions_CollectTimetable[category][i] - 1,
                    baseTime += 1,
                    1
                ],
                itemStyle: {
                    normal: {
                        color: '#000000'
                    }
                }
            });
        }
    });

    var option = {
        title: {
            show:false
        },
        grid: {
            left: 35,
            right: 20,
            top: 5,
            bottom: 20,
            height: 'auto'
        },
        xAxis: {
            min: 0,
            scale: true,
            axisLabel: {
                formatter: function (val) {
                    return TimeFormat(val);
                },
            },
            max: TotalMinutes,
            interval: 60,
        },
        yAxis: {
            data: missions_name
        },
        series: [{
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data
        }],
        animation:false,
        backgroundColor: "#FFFFFF"
    };

    Chart.setOption(option);
}

function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.5;

    var rectShape = echarts.graphic.clipRectByRect({
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
    }, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
    });

    return rectShape && {
        type: 'rect',
        shape: rectShape,
        style: api.style()
    };
}