window.onload = function () {
    checkDefaultLanguage();
    checkLocalStorage();
    loadHTML_Target();
    loadHTML_language();
    HTMLtab = "Anytime";
    TABLE_CALCULATE_TOTAL_TIME = get_TABLE_CALCULATE_TOTAL_TIME();
    setQContract(Input_getTotalGreatSuccessRate(true));
    ChangeTab_Anytime();
}

function get_TABLE_CALCULATE_TOTAL_TIME() {
    if (is_CalculateByHour())
        return 60;
    else {
        var ShownTab = getShownTab();
        ShownTab.setTime(false);
        return ShownTab.TotalTime;
    }
}

function checkDefaultLanguage() {
    var lang = navigator.language||navigator.userLanguage;
    if (lang.substr(0, 2) == 'zh') {
        switch(lang) {
            case 'zh-HK':
            case 'zh-TW':
            case 'zh-MO':
                language = languages["zh-hk"];
                break;
            default:
                language = languages["zh-cn"];
        }
    }
    else {
        language = languages["zh-cn"];
    }
}

//change language
$(function (){
    $('[href=#lang-zh-CN]').on('click', function(){changelang('zh-CN')});
    $('[href=#lang-zh-TW]').on('click', function(){changelang('zh-TW')});
})
function changelang(lang) {
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

//注释
$(function (){$("[data-toggle='tooltip']").tooltip();})

//标签页
var HTMLtab;
$(function (){
    $('[href=#Tab_Anytime]').on("shown.bs.tab", function(){ChangeTab_Anytime()});
    $('[href=#Tab_Timetable]').on("shown.bs.tab", function(){ChangeTab_Timetable()});
})

function ChangeTab_Anytime() {
    HTMLtab = "Anytime";
    document.getElementById("Plan_Table").innerHTML = language.HTMLJS.plantabletip;
    HTML_AllowInput();
    if (!is_CalculateByHour()) {
        var ShownTab = getShownTab();
        ShownTab.setTime(false);
        TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
    }
    PrintMissionTable();
    PrintPlanDetails();
}
function ChangeTab_Timetable() {
    HTMLtab = "Timetable";
    document.getElementById("Plan_Table").innerHTML = language.HTMLJS.plantabletip;
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
    if (document.getElementById('Display_PerHour').checked) {
        return true;
    }
    else {
        return false;
    }
}

$(function (){
    $('input[id^=Display_]').on("click", function(){
        if (is_CalculateByHour()) {
            changeCalculateOutput_Hour();
        }
        else {
            changeCalculateOutput_Total();
        }
    })
})
function changeCalculateOutput_Hour() {
    $("#Demand").html(language.HTMLJS.Demand_hour);
    var ShownTab = getShownTab();
    ShownTab.setTime();
    TABLE_CALCULATE_TOTAL_TIME = 60;
    var time = ShownTab.TotalTime;
    var id = ["#MT","#AT","#RT","#PT","#TT","#ET","#QPT","#QRT"];
    for (var i = 0 ; i < 8; i++) {
        $(id[i]).val(Math.round($(id[i]).val() / time * 6000) / 100);
    }
    PrintMissionTable();
    var Plan_Table_innerHTML = document.getElementById("Plan_Table").innerHTML;
    if (Plan_Table_innerHTML !== language.HTMLJS.plantabletip && Plan_Table_innerHTML !== language.JS.NoPlan) {
        print_result_plan(false, RESULT_PLAN, TABLE_CALCULATE_TOTAL_TIME);
    }
}
function changeCalculateOutput_Total() {
    $("#Demand").html(language.HTMLJS.Demand_total);
    var ShownTab = getShownTab();
    ShownTab.setTime();
    TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
    var time = ShownTab.TotalTime;
    var id = ["#MT","#AT","#RT","#PT","#TT","#ET","#QPT","#QRT"];
    for (var i = 0 ; i < 8; i++) {
        $(id[i]).val(Math.round($(id[i]).val() * time * 100 / 60) / 100);
    }
    PrintMissionTable();
    var Plan_Table_innerHTML = document.getElementById("Plan_Table").innerHTML;
    if (Plan_Table_innerHTML !== language.HTMLJS.plantabletip && Plan_Table_innerHTML !== language.JS.NoPlan) {
        print_result_plan(false, RESULT_PLAN, TABLE_CALCULATE_TOTAL_TIME);
    }
}

//Tab_Timetable\
//-----------
var Tab_Timetable_TIMELIST = [];
$(function (){
    $("#Time_Timetable_hours").on('input propertychange',function() {Tab_Timetable_ChangeMaxTime()});
    $("#Time_Timetable_minutes").on('input propertychange',function() {Tab_Timetable_ChangeMaxTime()});
})

function Tab_Timetable_ChangeMaxTime() {
    var total_time = Input_getTimetableTotalTime();
    var stringTime = TimeFormat(total_time);
    document.getElementById('Tab_Timetable_range_tooltip_0_value').innerHTML = stringTime;
    if (!is_CalculateByHour()) {
        TABLE_CALCULATE_TOTAL_TIME = total_time;
    }
    PrintMissionTable();
    PrintPlanDetails();
}

$(function() {
    $('#Tab_Timetable_AddNewTimePoint').on('click', function() {Tab_Timetable_AddNewTimePoint()});
})
function Tab_Timetable_AddNewTimePoint() {
    Tab_Timetable_InputTotalTime_disable();
    var total_time = Input_getTimetableNewTotalTime_Correct();
    switch(true) {
        case total_time == 0:
            if (Tab_Timetable_TIMELIST.length == 0) {
                Tab_Timetable_InputTotalTime_enable();
            }
            alert(language.JS.tab_Timetable_alert1);
            break;
        case total_time >= Input_getTimetableTotalTime():
            if (Tab_Timetable_TIMELIST.length == 0) {
                Tab_Timetable_InputTotalTime_enable();
            }
            alert(language.JS.tab_Timetable_alert2);
            break;
        case Tab_Timetable_TIMELIST.indexOf(total_time) != -1:
            alert(language.JS.tab_Timetable_alert3);
            break;
        default:
            Tab_Timetable_AddNewTimePoint_main(total_time);
    }
    PrintMissionTable();
    PrintPlanDetails();
}
function Tab_Timetable_InputTotalTime_disable() {
    $("#Time_Timetable_hours").attr('disabled', "true");
    $("#Time_Timetable_minutes").attr('disabled', "true");
}

function Tab_Timetable_AddNewTimePoint_main(time) {
    Tab_Timetable_TIMELIST.push(time);
    var maxtime = Input_getTimetableTotalTime();
    var position = (time / maxtime) * 100 + '%';
    Tab_Timetable_AddNewThumb(time, position);
    Tab_Timetable_AddNewTooltip(time, position);
}
function Tab_Timetable_AddNewThumb(time, position) {
    var newThumb = '<button class="slider-button" id="Tab_Timetable_range_thumb_' + time + '"';
    newThumb += 'style="left:' + position + ';">';
    newThumb += '<span class="glyphicon glyphicon-remove-circle" style="font-size: 22px;"></span></button>';
    $("#Tab_Timetable_range").append(newThumb);
}
function Tab_Timetable_AddNewTooltip(time, position) {
    var stringTime = TimeFormat(time);
    var newTooltip = '<div id="Tab_Timetable_range_tooltip_' + time + '"';
    if (Tab_Timetable_TIMELIST.indexOf(time) % 2 == 0) {
        newTooltip += 'class="tooltip top custom-tooltip"';
        newTooltip += 'style="left:' + position + '; top:-32px; margin-left: -15px;">';
    }
    else {
        newTooltip += 'class="tooltip bottom custom-tooltip"';
        newTooltip += 'style="left:' + position + '; top:12px; margin-left: -15px;">';
    }
    newTooltip += '<div class="tooltip-arrow"></div><div class="tooltip-inner">';
    newTooltip += stringTime + '</div></div>';
    $("#Tab_Timetable_range").append(newTooltip);
}

$(function() {
    $("#Tab_Timetable_range").on('click', 'button[id^=Tab_Timetable_range_thumb_]', function() {
        var time = parseFloat(stringSliceFromLast_(this.id));
        Tab_Timetable_DeleteThisTimePoint(time);
    })
})
function Tab_Timetable_DeleteThisTimePoint(time) {
    Tab_Timetable_TIMELIST.remove(time);
    var thumb_id = "Tab_Timetable_range_thumb_" + time;
    var tooltip_id = "Tab_Timetable_range_tooltip_" + time;
    var thumb_obj = document.getElementById(thumb_id);
    var tooltip_obj = document.getElementById(tooltip_id);
    var parent_obj = document.getElementById('Tab_Timetable_range');
    parent_obj.removeChild(thumb_obj);
    parent_obj.removeChild(tooltip_obj);
    if (Tab_Timetable_TIMELIST.length == 0)
        Tab_Timetable_InputTotalTime_enable();
    PrintMissionTable();
    PrintPlanDetails();
}
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}
function Tab_Timetable_InputTotalTime_enable() {
    $("#Time_Timetable_hours").removeAttr("disabled");
    $("#Time_Timetable_minutes").removeAttr("disabled");
}

$(function (){
    $('#tab_Timetable_deleteall').on('click', function() {
        var times = Tab_Timetable_TIMELIST.length;
        for (var i = 0; i < times; i++) {
            Tab_Timetable_DeleteThisTimePoint(Tab_Timetable_TIMELIST[0]);
        }
        Tab_Timetable_InputTotalTime_enable();
    }
)})
//-----------

$(function() {
    $("#target").on('click', 'button[id^=setTarget_]', function() {
        setTarget(stringSliceFromLast_(this.id));
    })
})
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

$(function() {
    $("#target").on('click', 'button[id^=Target_minus_]', function() {ChangeTarget(this.id)});
    $("#target").on('click', 'button[id^=Target_plus_]', function() {ChangeTarget(this.id)});
})
function ChangeTarget(FullID) {
    var ID = stringSliceFromLast_(FullID);
    var IDstart = FullID.indexOf(ID);
    var FullID_2 = FullID.slice(0, IDstart - 1);
    var changevalue = parseFloat(stringSliceFromLast_(FullID_2));
    if (FullID_2.slice(7, 8) == "m")
        changevalue *= -1;
    var OriginalValue = Input_getTarget_Correct($('#' + ID), false);
    Input_setTarget(OriginalValue + changevalue, $('#' + ID));
}

function HTML_DisableInput() {
    $("#Time_Anytime_hours").attr('disabled', "true");
    $("#Time_Anytime_minutes").attr('disabled', "true");
    $("#Tab_Anytime_MinimumIntervalTime_minutes").attr('disabled', "true");
    $("#Time_Timetable_hours").attr('disabled', "true");
    $("#Time_Timetable_minutes").attr('disabled', "true");
    $("#tab_Timetable_deleteall").attr('disabled', "true");
    $("button[id^=Tab_Timetable_range_thumb_").attr('disabled', "true");
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
    $("button[id^=setTarget_").attr('disabled', "true");
    $("#MT").attr('disabled', "true");
    $("#AT").attr('disabled', "true");
    $("#RT").attr('disabled', "true");
    $("#PT").attr('disabled', "true");
    $("#TT").attr('disabled', "true");
    $("#ET").attr('disabled', "true");
    $("#QPT").attr('disabled', "true");
    $("#QRT").attr('disabled', "true");
    $("button[id^=Target_minus_").attr('disabled', "true");
    $("button[id^=Target_plus_").attr('disabled', "true");
    $("#start_sorting").attr('disabled', "true");
    $("#clear_sorting").removeAttr("disabled");
}

$(function() {
    $("#clear_sorting").on('click', function() {HTML_AllowInput()});
})
function HTML_AllowInput() {
    $("#Time_Anytime_hours").removeAttr("disabled");
    $("#Time_Anytime_minutes").removeAttr("disabled");
    $("#Tab_Anytime_MinimumIntervalTime_minutes").removeAttr("disabled");
    $("#Time_Timetable_hours").removeAttr("disabled");
    $("#Time_Timetable_minutes").removeAttr("disabled");
    $("#tab_Timetable_deleteall").removeAttr("disabled");
    $("button[id^=Tab_Timetable_range_thumb_").removeAttr("disabled");
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
    $("button[id^=setTarget_").removeAttr("disabled");
    $("#MT").removeAttr("disabled");
    $("#AT").removeAttr("disabled");
    $("#RT").removeAttr("disabled");
    $("#PT").removeAttr("disabled");
    $("#TT").removeAttr("disabled");
    $("#ET").removeAttr("disabled");
    $("#QPT").removeAttr("disabled");
    $("#QRT").removeAttr("disabled");
    $("button[id^=Target_minus_").removeAttr("disabled");
    $("button[id^=Target_plus_").removeAttr("disabled");
    $("#start_sorting").removeAttr("disabled");
    $("#clear_sorting").attr('disabled', "true");
    document.getElementById("Plan_Table").innerHTML = language.HTMLJS.plantabletip;
}

//对排序结果某一项排序
$(function() {
    $("#Plan_Table").on('click', 'th[id^=resultPlan_Mission_]', function() {
        RESULT_PLAN_SORT_BY = "Ranking";
        resultPlan_sortByColumn(0, "ascending");
    });
    $("#Plan_Table").on('click', '#resultPlan_Manp', function() {
        RESULT_PLAN_SORT_BY = "Manp";
        resultPlan_sortByColumn(5);
    });
    $("#Plan_Table").on('click', '#resultPlan_Ammu', function() {
        RESULT_PLAN_SORT_BY = "Ammu";
        resultPlan_sortByColumn(6);
    });
    $("#Plan_Table").on('click', '#resultPlan_Rati', function() {
        RESULT_PLAN_SORT_BY = "Rati";
        resultPlan_sortByColumn(7);
    });
    $("#Plan_Table").on('click', '#resultPlan_Part', function() {
        RESULT_PLAN_SORT_BY = "Part";
        resultPlan_sortByColumn(8);
    });
    $("#Plan_Table").on('click', '#resultPlan_TPro', function() {
        RESULT_PLAN_SORT_BY = "TPro";
        resultPlan_sortByColumn(9);
    });
    $("#Plan_Table").on('click', '#resultPlan_Equi', function() {
        RESULT_PLAN_SORT_BY = "Equi";
        resultPlan_sortByColumn(10);
    });
    $("#Plan_Table").on('click', '#resultPlan_QPro', function() {
        RESULT_PLAN_SORT_BY = "QPro";
        resultPlan_sortByColumn(11);
    });
    $("#Plan_Table").on('click', '#resultPlan_QRes', function() {
        RESULT_PLAN_SORT_BY = "QRes";
        resultPlan_sortByColumn(12);
    });
})
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