var MISSION_TABLE = [];
var MISSION_TABLE_SELECT = [];

function PrintMissionTable() {
    MISSION_TABLE = _getMissionTableByShownTab();
    var MissionTable = MISSION_TABLE;
    var tbody = document.getElementById("MissionTable_tbody");
    var tab = '';
    var MissionTable_length = MissionTable.length;
    for (var i = 0; i < MissionTable_length; i++) {
        var TotalMinutes = MissionTable[i][9];
        tab += '<tr id="MissionTable_' + i + '">';
        tab += '<td style="width: 10%; text-align: center;">' + MissionTable[i][0] + '</td>';
        for (var ii = 1; ii < 5; ii++) {
            if (MissionTable[i][ii] * 60 > 100)
                tab += '<td style="width: 10%; text-align: center;">' + Math.round(MissionTable[i][ii] * 60) + '</td>';
            else if (MissionTable[i][ii] * 60 > 10)
                tab += '<td style="width: 10%; text-align: center;">' + Math.round(MissionTable[i][ii] * 60 * 10) / 10 + '</td>';
            else
                tab += '<td style="width: 10%; text-align: center;">' + Math.round(MissionTable[i][ii] * 60 * 100) / 100 + '</td>';
        }
        for (var ii = 5; ii < 9; ii++) {
            if (MissionTable[i][ii] * 60 > 100)
                tab += '<td style="width: 10%; text-align: center;">' + Math.round(MissionTable[i][ii] * 60) + '</td>';
            else if (MissionTable[i][ii] * 60 > 10)
                tab += '<td style="width: 10%; text-align: center;">' + Math.round(MissionTable[i][ii] * 60 * 10) / 10 + '</td>';
            else
                tab += '<td style="width: 10%; text-align: center;">' + Math.round(MissionTable[i][ii] * 60 * 100) / 100 + '</td>';
        }
        var hours = parseInt(TotalMinutes / 60);
        var minutes = TotalMinutes % 60;
        if ((minutes + "").length < 2)
            minutes = "0" + minutes;
        var time = hours + ':' + minutes;
        tab += '<td style="width: 10%; text-align: center;">' + time + '</td>';
        tab += '<tr>';
    }
    if (MissionTable_length === 0)
        tab = '<tr><td>' + language.JS.NoMission + '</td></tr>';
    tbody.innerHTML = tab;
}

function _getMissionTableByShownTab() {
    var ShownTab = getShownTab();
    ShownTab.setTime_NotCorrected();
    ShownTab.setValidQAndReturnLengthAndSetCurrentMax();
    var MissionTable = ShownTab.Qvalid;
    var MissionTable_length = MissionTable.length;
    for (var i = 0; i < MissionTable_length; i++) {
        var MissionName = MissionTable[i][0];
        var minusSignIndex = MissionName.indexOf('-');
        var chapter = MissionName.slice(0, minusSignIndex);
        var number = MissionName.slice(minusSignIndex + 1);
        var MissionNumber = 4 * parseInt(chapter) + parseInt(number);
        MissionTable[i].push(MissionNumber);
    }
    quick_sort_expand_ascending(MissionTable, 12);
    var TotalRate = getTotalGreatSuccessRate();
    var ResourceIncreasingRate = 1 + (TotalRate) / 200;
    for (var i = 0; i < MissionTable_length; i++) {
        MissionTable[i][1] *= ResourceIncreasingRate;
        MissionTable[i][2] *= ResourceIncreasingRate;
        MissionTable[i][3] *= ResourceIncreasingRate;
        MissionTable[i][4] *= ResourceIncreasingRate;
    }
    return MissionTable;
}

$(function() {
    $("#MapLimit").on('change', function() {PrintMissionTable()});
    $("#Time_Anytime_hours").on('input propertychange', function() {PrintMissionTable()});
    $("#Time_Anytime_minutes").on('input propertychange', function() {PrintMissionTable()});
    $("#Tab_Anytime_MinimumIntervalTime_minutes").on('input propertychange', function() {PrintMissionTable()});
})

//排序结果点击
$(function() {
    $("#Plan_Table").on('click', 'tr[id^=print_result_plan_tr_]', function() {
        var number = stringSliceFromLast_(this.id);
        if (this.className != "success") {
            for (var i = 0; i < RESULT_PLAN.length; i++) {
                if (i !== number) {
                    document.getElementById("print_result_plan_tr_" + i).className = "";
                }
            }
            this.className = "success";
            MissionTable_resultPlan_select(number);
        }
        else
            this.className = "";
    })
})

function MissionTable_resultPlan_select(number) {
    var missionTable_length = MISSION_TABLE.length;
    var missionTable = MISSION_TABLE;
    for (var i = 0; i < missionTable_length; i++) {
        document.getElementById("MissionTable_" + i).className = "";
    }
    var Missions = [];
    for (var i = 0; i < 4; i++) {
        Missions.push(RESULT_PLAN[number][i + 1]);
    }
    MISSION_TABLE_SELECT = Missions;
    for (var i = 0; i < 4; i++) {
        for (var ii = 0; ii < missionTable_length; ii++) {
            if (missionTable[ii][0] === Missions[i]) {
                document.getElementById("MissionTable_" + ii).className = "success";
                break;
            }
        }
    }
}

$(function() {
    $("#MissionTable_panel").on('click', 'tr[id^=MissionTable_]', function() {
        var number = stringSliceFromLast_(this.id);
        if (this.className === "success")
            MissionTable_cancelSelectThisRow(number);
        else
            MissionTable_selectThisRow(number);
    })
})

function MissionTable_selectThisRow(number) {
    if (MISSION_TABLE_SELECT.length === 4) {
        var mission_table_select_first_mission = MISSION_TABLE_SELECT[0];
        MISSION_TABLE_SELECT.shift();
        var mission_table_select_first_mission_number;
        for (var i = 0; i < MISSION_TABLE.length; i++) {
            if (mission_table_select_first_mission === MISSION_TABLE[i][0]) {
                mission_table_select_first_mission_number = i;
                break;
            }
        }
        document.getElementById("MissionTable_" + mission_table_select_first_mission_number).className = "";
    }
    var selectedMission = MISSION_TABLE[number][0];
    MISSION_TABLE_SELECT.push(selectedMission);
    document.getElementById("MissionTable_" + number).className = "success";
}

function MissionTable_cancelSelectThisRow(number) {
    var mission = MISSION_TABLE[number][0];
    var index = MISSION_TABLE_SELECT.indexOf(mission);
    MISSION_TABLE_SELECT.splice(index, 1);
    document.getElementById("MissionTable_" + number).className = "";
}