window.onload = function () {
    checkLocalStorageWork();
    setLanguage();
    loadHTML_Target();
    setPageByLocalStorage();
    setQContract(Input_getTotalGreatSuccessRate(true));
    PrintMissionTable();
    PrintPlanDetails();
    loadHTML_language();
    MobileOptimization();
};

function get_TABLE_CALCULATE_TOTAL_TIME() {
    if (is_CalculateByHour())
        return 60;
    else {
        let ShownTab = getShownTab();
        ShownTab.setTime(false);
        return ShownTab.TotalTime;
    }
}

function setLanguage() {
    let lang = storageGetItem("lang");
    if (lang === "noStorage")
        lang = navigator.language||navigator.userLanguage;
    if (lang.substr(0, 2) === 'zh') {
        switch(lang) {
            case 'zh-HK':
            case 'zh-TW':
            case 'zh-MO':
                language = languages["zh-hk"];
                storageSetItem("lang", "zh-hk");
                break;
            default:
                language = languages["zh-cn"];
                storageSetItem("lang", "zh-cn");
        }
    }
    else {
        language = languages["zh-cn"];
        storageSetItem("lang", "zh-cn");
    }
}

function changeLanguage(lang) {
    switch(lang) {
        case 'zh-CN':
            storageSetItem("lang", 'zh-cn');
            language = languages["zh-cn"];
            break;
        case 'zh-TW':
            storageSetItem("lang", 'zh-hk');
            language = languages["zh-hk"];
            break;
    }
    loadHTML_language();
}

function IsMobile(){
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

function MobileOptimization() {
    if (IsMobile()) {
        document.getElementById("Saved").style.transition = "none";
        document.getElementById("MissionTable_panel").style.transition = "none";
    }
}

//注释
$(function (){$("[data-toggle='tooltip']").tooltip();});

//标签页
let HTML_TAB;
function ChangeTab(htmltab) {
    switch (htmltab) {
        case "Anytime":
            if (HTML_TAB === "Anytime" || HTML_TAB === undefined)
                IS_ChangeTabByJS = false;
            $('[href=#Tab_Anytime]').tab("show");
            break;
        case "Timetable":
            if (HTML_TAB === "Timetable" || HTML_TAB === undefined)
                IS_ChangeTabByJS = false;
            $('[href=#Tab_Timetable]').tab("show");
            break;
    }
    HTML_TAB = htmltab;
    storageSetItem("HTML_TAB", HTML_TAB);
}
function ChangeTab_Anytime() {
    HTML_TAB = "Anytime";
    storageSetItem("HTML_TAB", HTML_TAB);
    delete_PlanTable();
    HTML_AllowInput();
    if (!is_CalculateByHour()) {
        let ShownTab = getShownTab();
        ShownTab.setTime(false);
        TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
    }
    PrintMissionTable();
    PrintPlanDetails();
}
function ChangeTab_Timetable() {
    HTML_TAB = "Timetable";
    storageSetItem("HTML_TAB", HTML_TAB);
    delete_PlanTable();
    HTML_AllowInput();
    if (!is_CalculateByHour()) {
        var ShownTab = getShownTab();
        ShownTab.setTime(false);
        TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
    }
    PrintMissionTable();
    PrintPlanDetails();
}

function is_CalculateByHour() {
    if (document.getElementById('Display_PerHour').checked)
        return true;
    else
        return false;
}

function changeCalculateOutput_Hour() {
    storageSetItem("PerHourOrTotal", "PerHour");
    $("#Demand").html(language.HTMLJS.Demand_hour);
    let ShownTab = getShownTab();
    ShownTab.setTime();
    TABLE_CALCULATE_TOTAL_TIME = 60;
    const time = ShownTab.TotalTime;
    let TargetValue = Input_getTarget_Correct();
    for (let i = 0; i < 8; i++) {
        TargetValue[i] = Math.round(TargetValue[i] / time * 6000) / 100;
    }
    Input_setTarget(TargetValue);
    PrintMissionTable();
    const Plan_Table_innerHTML = document.getElementById("Plan_Table").innerHTML;
    if (Plan_Table_innerHTML !== "" && Plan_Table_innerHTML !== language.JS.NoPlan) {
        print_result_plan(false, RESULT_PLAN, TABLE_CALCULATE_TOTAL_TIME);
    }
}
function changeCalculateOutput_Total() {
    storageSetItem("PerHourOrTotal", "Total");
    $("#Demand").html(language.HTMLJS.Demand_total);
    let ShownTab = getShownTab();
    ShownTab.setTime();
    TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
    const time = ShownTab.TotalTime;
    let TargetValue = Input_getTarget_Correct();
    for (let i = 0; i < 8; i++) {
        TargetValue[i] = Math.round(TargetValue[i] * time * 100 / 60) / 100;
    }
    Input_setTarget(TargetValue);
    PrintMissionTable();
    const Plan_Table_innerHTML = document.getElementById("Plan_Table").innerHTML;
    if (Plan_Table_innerHTML !== "" && Plan_Table_innerHTML !== language.JS.NoPlan) {
        print_result_plan(false, RESULT_PLAN, TABLE_CALCULATE_TOTAL_TIME);
    }
}

//Tab_Timetable\
//-----------
let Tab_Timetable_TIMELIST = [];

function Tab_Timetable_AddNewTimePoint(time) {
    Tab_Timetable_TIMELIST.push(time);
    const maxTime = Input_getTimetableTotalTime();
    const position = (time / maxTime) * 100 + '%';
    _Tab_Timetable_AddNewThumb(time, position);
    _Tab_Timetable_AddNewTooltip(time, position);
}
function _Tab_Timetable_AddNewThumb(time, position) {
    let newThumb = '<button class="slider-button" id="Tab_Timetable_range_thumb_' + time + '"';
    newThumb += 'style="left:' + position + ';">';
    newThumb += '<span class="glyphicon glyphicon-remove-circle" style="font-size: 22px;"></span></button>';
    $("#Tab_Timetable_range").append(newThumb);
}
function _Tab_Timetable_AddNewTooltip(time, position) {
    let newTooltip = '<div id="Tab_Timetable_range_tooltip_' + time + '"';
    if (Tab_Timetable_TIMELIST.indexOf(time) % 2 === 0) {
        newTooltip += 'class="tooltip top custom-tooltip"';
        newTooltip += 'style="left:' + position + '; top:-32px; margin-left: -15px;">';
    }
    else {
        newTooltip += 'class="tooltip bottom custom-tooltip"';
        newTooltip += 'style="left:' + position + '; top:12px; margin-left: -15px;">';
    }
    newTooltip += '<div class="tooltip-arrow"></div><div class="tooltip-inner">';
    newTooltip += TimeFormat(time) + '</div></div>';
    $("#Tab_Timetable_range").append(newTooltip);
}

function Tab_Timetable_DeleteThisTimePoint(time) {
    Tab_Timetable_TIMELIST.remove_First(time);
    const thumb_id = "Tab_Timetable_range_thumb_" + time;
    const tooltip_id = "Tab_Timetable_range_tooltip_" + time;
    const thumb_obj = document.getElementById(thumb_id);
    const tooltip_obj = document.getElementById(tooltip_id);
    let parent_obj = document.getElementById('Tab_Timetable_range');
    parent_obj.removeChild(thumb_obj);
    parent_obj.removeChild(tooltip_obj);
    if (Tab_Timetable_TIMELIST.length === 0)
        Tab_Timetable_InputTotalTime_enable();
}

function Tab_Timetable_DeleteAllTimePoint() {
    const times = Tab_Timetable_TIMELIST.length;
    for (let i = 0; i < times; i++) {
        Tab_Timetable_DeleteThisTimePoint(Tab_Timetable_TIMELIST[0]);
    }
}

function Tab_Timetable_InputTotalTime_enable() {
    $("#Time_Timetable_hours").removeAttr("disabled");
    $("#Time_Timetable_minutes").removeAttr("disabled");
}

function Tab_Timetable_InputTotalTime_disable() {
    $("#Time_Timetable_hours").attr('disabled', "true");
    $("#Time_Timetable_minutes").attr('disabled', "true");
}
//-----------

function setTarget(TargetInfo) {
    switch (TargetInfo) {
        case 'HG':
            Input_setTarget([130, 130, 130, 130, 0, 0, 0, 0]); break;
        case 'SMG':
            Input_setTarget([430, 430, 130, 230, 0, 0, 0, 0]); break;
        case 'RF':
            Input_setTarget([430, 130, 430, 230, 0, 0, 0, 0]); break;
        case 'AR':
            Input_setTarget([130, 430, 430, 130, 0, 0, 0, 0]); break;
        case 'MG':
            Input_setTarget([730, 630, 130, 430, 0, 0, 0, 0]); break;
        case 'SG':
            Input_setTarget([800, 200, 800, 400, 0, 0, 0, 0]); break;
        case '2221':
            Input_setTarget([400, 400, 400, 200, 0, 0, 0, 0]); break;
        case 'Clear':
            Input_setTarget(); break;
    }
}

function ChangeTarget(FullID) {
    const ID = stringSliceFromLast_(FullID);
    const IDStart = FullID.indexOf(ID);
    const FullID_2 = FullID.slice(0, IDStart - 1);
    let changeValue = parseFloat(stringSliceFromLast_(FullID_2));
    if (FullID_2.slice(7, 8) === "m")
        changeValue *= -1;
    const OriginalValue = Input_getTarget_Correct($('#' + ID), false);
    Input_setTarget(OriginalValue + changeValue, $('#' + ID));
}

function HTML_DisableInput() {
    $("#Time_Anytime_hours").attr('disabled', "true");
    $("#Time_Anytime_minutes").attr('disabled', "true");
    $("#Tab_Anytime_MinimumIntervalTime_minutes").attr('disabled', "true");
    $("#Time_Timetable_hours").attr('disabled', "true");
    $("#Time_Timetable_minutes").attr('disabled', "true");
    $("#tab_Timetable_deleteall").attr('disabled', "true");
    $("button[id^=Tab_Timetable_range_thumb_]").attr('disabled', "true");
    $("#Tab_Timetable_new_hours").attr('disabled', "true");
    $("#Tab_Timetable_new_minutes").attr('disabled', "true");
    $("#Tab_Timetable_AddNewTimePoint").attr('disabled', "true");
    $("#GreatSuccessRate").attr('disabled', "true");
    $("#GreatSuccessRateUp").attr('disabled', "true");
    document.getElementById("greatsuccessrateup").style.cursor='not-allowed';
    document.getElementById("GreatSuccessRateUp_label").style.cursor='not-allowed';
    $("#MapLimit").attr('disabled', "true");
    $("#ContractWeight").attr('disabled', "true");
    document.getElementById("ContractWeight_thumb").style.backgroundColor='#CCC';
    $("button[id^=setTarget_]").attr('disabled', "true");
    $("#MT").attr('disabled', "true");
    $("#AT").attr('disabled', "true");
    $("#RT").attr('disabled', "true");
    $("#PT").attr('disabled', "true");
    $("#TT").attr('disabled', "true");
    $("#ET").attr('disabled', "true");
    $("#QPT").attr('disabled', "true");
    $("#QRT").attr('disabled', "true");
    $("button[id^=Target_minus_]").attr('disabled', "true");
    $("button[id^=Target_plus_]").attr('disabled', "true");
    $("#start_sorting").attr('disabled', "true");
    $("#clear_sorting").removeAttr("disabled");
}

function HTML_AllowInput() {
    $("#Time_Anytime_hours").removeAttr("disabled");
    $("#Time_Anytime_minutes").removeAttr("disabled");
    $("#Tab_Anytime_MinimumIntervalTime_minutes").removeAttr("disabled");
    if (Tab_Timetable_TIMELIST.length === 0) {
        $("#Time_Timetable_hours").removeAttr("disabled");
        $("#Time_Timetable_minutes").removeAttr("disabled");
    }
    $("#tab_Timetable_deleteall").removeAttr("disabled");
    $("button[id^=Tab_Timetable_range_thumb_]").removeAttr("disabled");
    $("#Tab_Timetable_new_hours").removeAttr("disabled");
    $("#Tab_Timetable_new_minutes").removeAttr("disabled");
    $("#Tab_Timetable_AddNewTimePoint").removeAttr("disabled");
    $("#GreatSuccessRate").removeAttr("disabled");
    $("#GreatSuccessRateUp").removeAttr("disabled");
    document.getElementById("greatsuccessrateup").style.cursor='pointer';
    document.getElementById("GreatSuccessRateUp_label").style.cursor='pointer';
    $("#MapLimit").removeAttr("disabled");
    $("#ContractWeight").removeAttr("disabled");
    document.getElementById("ContractWeight_thumb").style.backgroundColor='rgb(112, 166, 236)';
    $("button[id^=setTarget_]").removeAttr("disabled");
    $("#MT").removeAttr("disabled");
    $("#AT").removeAttr("disabled");
    $("#RT").removeAttr("disabled");
    $("#PT").removeAttr("disabled");
    $("#TT").removeAttr("disabled");
    $("#ET").removeAttr("disabled");
    $("#QPT").removeAttr("disabled");
    $("#QRT").removeAttr("disabled");
    $("button[id^=Target_minus_]").removeAttr("disabled");
    $("button[id^=Target_plus_]").removeAttr("disabled");
    $("#start_sorting").removeAttr("disabled");
    $("#clear_sorting").attr('disabled', "true");
}

function resultPlan_sortByColumn(Column, method = "descending") {
    if (method === "ascending") {
        quick_sort_expand_ascending(RESULT_PLAN, Column);
        print_result_plan(false, RESULT_PLAN, TABLE_CALCULATE_TOTAL_TIME);
    }
    else {
        quick_sort_expand_descending(RESULT_PLAN, Column);
        print_result_plan(false, RESULT_PLAN, TABLE_CALCULATE_TOTAL_TIME);
    }
}

function delete_PlanTable() {
    document.getElementById("start_sorting_html").style.display = "";
    document.getElementById("Plan_Table").innerHTML = "";
}