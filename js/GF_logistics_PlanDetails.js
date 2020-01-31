function PrintPlanDetails() {
    _PrintPlanDetails_ShownTab();
    _PrintPlanDetails_TotalTime();
    _PrintPlanDetails_GreatSuccessRate();
    _PrintPlanDetails_ExecutionTimes();

    document.getElementById("PlanDetails_Mission_1").innerHTML = "";
    document.getElementById("PlanDetails_Mission_2").innerHTML = "";
    document.getElementById("PlanDetails_Mission_3").innerHTML = "";
    document.getElementById("PlanDetails_Mission_4").innerHTML = "";
    document.getElementById("PlanDetails_PerHour").innerHTML = "";
    document.getElementById("PlanDetails_Total").innerHTML = "";
    let Chart = echarts.init(document.getElementById("PlanDetails_Chart"));
    Chart.dispose();
    document.getElementById("PlanDetails_Chart").style.width = 0;
    document.getElementById("PlanDetails_Chart").style.height = 0;

    if (MISSION_TABLE_SELECT.length !== 0) {
        let selectedMissions = _PlanDetails_getMissionTableSelect();
        _PrintPlanDetails_Mission(selectedMissions);
        _PrintPlanDetails_PerHour(selectedMissions);
        let ShownTab = getShownTab();
        ShownTab.setTime(false);
        let TotalMinutes = ShownTab.TotalTime;
        let ExecutionTimes = Input_getExecutionTimes();
        _PrintPlanDetails_Total(selectedMissions, TotalMinutes, ExecutionTimes);
        print_chart(selectedMissions, TotalMinutes);
    }
}
function _PrintPlanDetails_ShownTab() {
    var ShownTab_Name;
    switch (HTML_TAB) {
        case "Anytime":
            ShownTab_Name = language.HTML.Tab_Anytime_name;
            break;
        case "Timetable":
            ShownTab_Name = language.HTML.Tab_Timetable_name;
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
function _PrintPlanDetails_ExecutionTimes() {
    let ExecutionTimes = Input_getExecutionTimes();
    document.getElementById("PlanDetails_ExecutionTimes").innerHTML = language.JS.ExecutionTimes + ": " + ExecutionTimes;
}

function _PlanDetails_getMissionTableSelect() {
    let selectedMissions = [];
    let missionTableSelect = MISSION_TABLE_SELECT.slice().sort(sortStringNumber);
    let mission_table = MISSION_TABLE;
    for (let i = 0; i < missionTableSelect.length; i++) {
        var number;
        for (let ii = 0; ii < mission_table.length; ii++) {
            if (missionTableSelect[i] === mission_table[ii][0]) {
                number = ii;
                break;
            }
        }
        selectedMissions.push(mission_table[number]);
    }
    return selectedMissions;
}

function _PrintPlanDetails_Mission(selectedMissions) {
    let color = ['#C5D8FF', '#FFBFBE', '#B6F4B5', '#FFEBC7'];
    for (let i = 0; i < selectedMissions.length; i++) {
        let tab = "";
        tab += "<td style='text-align:center; width: 61px;'>" + selectedMissions[i][0] + "</td>";
        for (let ii = 1; ii < 9; ii++) {
            tab += "<td style='text-align:center; width: 61px;'>";
            tab += NumberAutoExact(selectedMissions[i][ii] * 60);
            tab += "</td>";
        }
        tab += "<td style='text-align:center;'>" + TimeFormat(selectedMissions[i][9]) + "</td>";
        document.getElementById("PlanDetails_Mission_" + (i + 1)).innerHTML = tab;
        document.getElementById("PlanDetails_Mission_" + (i + 1)).style.backgroundColor = color[i];
    }
}

function _PrintPlanDetails_PerHour(selectedMissions) {
    let tab = "";
    tab += "<td style='text-align:center; width: 61px;'id='PlanDetails_PerHour_title'>" + language.JS.PerHour + "</td>";
    for (let i = 1; i < 9; i++) {
        tab += "<td style='text-align:center; width: 61px;'>";
        let ResourceContractValue = 0;
        for (let ii = 0; ii < selectedMissions.length; ii++) {
            ResourceContractValue += selectedMissions[ii][i];
        }
        tab += NumberAutoExact(ResourceContractValue * 60);
        tab += "</td>";
    }
    if (HTML_TAB !== "Anytime")
        tab += "<td></td>";
    else
        tab += "<td id='PlanDetails_AnytimeMinIntervalTime'>" + language.JS.MinIntervalTime + "</td>";
    document.getElementById("PlanDetails_PerHour").innerHTML = tab;
}

function _PrintPlanDetails_Total(selectedMissions, TotalMinutes, ExecutionTimes) {
    let tab = "<td style='text-align:center; width: 61px;'id='PlanDetails_Total_title'>" + language.JS.Total + "</td>";
    for (let i = 1; i < 9; i++) {
        tab += "<td style='text-align:center; width: 61px;'>";
        let ResourceContractValue = 0;
        for (let ii = 0; ii < selectedMissions.length; ii++) {
            ResourceContractValue += selectedMissions[ii][i];
        }
        tab += NumberAutoExact(ResourceContractValue * TotalMinutes * ExecutionTimes);
        tab += "</td>";
    }
    if (HTML_TAB !== "Anytime")
        tab += "<td></td>";
    else {
        var MissionTime = [];
        for (var i = 0; i < selectedMissions.length; i++) {
            MissionTime.push(selectedMissions[i][9]);
        }
        for (var i = selectedMissions.length; i < 4; i++) {
            MissionTime.push(TotalMinutes);
        }
        quick_sort_ascending(MissionTime);
        var MinIntervalTime = calculateIntervalTimeMin(MissionTime, TotalMinutes);
        tab += "<td>" + TimeFormat(MinIntervalTime) + "</td>";
    }
    document.getElementById("PlanDetails_Total").innerHTML = tab;
}

function print_chart(selectedMissions_table, TotalMinutes) {
    if (TotalMinutes > 4320)
        return;
    document.getElementById('PlanDetails_Chart').style.width = "610px";
    document.getElementById('PlanDetails_Chart').style.height = "120px";
    let Chart = echarts.init(document.getElementById('PlanDetails_Chart'));

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
    let xAxis_interval;
    if (TotalMinutes <= 960)
        xAxis_interval = 60;
    else if (TotalMinutes <= 1920)
        xAxis_interval = 120;
    else if (TotalMinutes <= 2880)
        xAxis_interval = 180;
    else if (TotalMinutes <= 3840)
        xAxis_interval = 240;
    else
        xAxis_interval = 300;
    let startTime = Input_getStartTime();
    
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
                    return TimeFormat_Day(val + startTime);
                },
            },
            max: TotalMinutes,
            interval: xAxis_interval,
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