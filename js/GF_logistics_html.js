window.onload = function () {
    checkDefaultLanguage();
    checkLocalStorage();
    loadHTML_Target();
    ChangeTab_Anytime();
    loadHTML_language();
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

function changelang(lang) {
    switch(lang) {
        case 'zh-cn':
            storageSetItem("lang", 'zh-cn');
            language = languages["zh-cn"];
            break;
        case 'zh-hk':
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
    $('[href=#Tab_SingleTime]').on("shown.bs.tab", function(){ChangeTab_SingleTime()});
    $('[href=#Tab_Timetable]').on("shown.bs.tab", function(){ChangeTab_Timetable()});
    $('[href=#Tab_Intervals]').on("shown.bs.tab", function(){ChangeTab_Intervals()});
})

function ChangeTab_Anytime() {
    HTMLtab = "Anytime";
    if (is_Tab_Anytime_CalculateOneDay()) {
        $("#Demand").html(language.HTMLJS.Demand_daily);
    }
    else {
        $("#Demand").html(language.HTMLJS.Demand_hour);
    }
    TimeLimit_enable();
}
function ChangeTab_SingleTime() {
    HTMLtab = "SingleTime";
    $("#Demand").html(language.HTMLJS.Demand_single);
    TimeLimit_disable();
}
function ChangeTab_Timetable() {
        HTMLtab = "Timetable";
        if (is_Tab_Timetable_CalculateOnce()) {
            $("#Demand").html(language.HTMLJS.Demand_total);
        }
        else {
            $("#Demand").html(language.HTMLJS.Demand_hour);
        }
        TimeLimit_disable();
}
function ChangeTab_Intervals() {
        HTMLtab = "Intervals";
        $("#Demand").html(language.HTMLJS.Demand_hour);
        TimeLimit_disable();
}
function TimeLimit_enable() {
    $("#Time_Limit_start").removeAttr("disabled");
    $("#Time_Limit_end").removeAttr("disabled");
    document.getElementById('thumb_limit_start').style.backgroundColor='rgb(112, 166, 236)';
    document.getElementById('thumb_limit_end').style.backgroundColor='rgb(112, 166, 236)';
}
function TimeLimit_disable() {
    $("#Time_Limit_start").val(0);
    $("#Time_Limit_start").attr('disabled', "true");
    $("#Time_Limit_end").val(MissionsTimeMax);
    $("#Time_Limit_end").attr('disabled', "true");
    document.getElementById('range_limit').style.left='0%';
    document.getElementById('range_limit').style.right='0%';
    document.getElementById('sign_limit_start').style.left='0%';
    document.getElementById('sign_limit_end').style.left='100%';
    document.getElementById('thumb_limit_start').style.backgroundColor='#CCC';
    document.getElementById('thumb_limit_start').style.left='0%';
    document.getElementById('thumb_limit_end').style.backgroundColor='#CCC';
    document.getElementById('thumb_limit_end').style.left='100%';
    document.getElementById('sign_limit_start_value').innerHTML='0';
    document.getElementById('sign_limit_end_value').innerHTML=MissionsTimeMax;
}
function is_Tab_Anytime_CalculateOneDay() {
    if (document.getElementById('Tab_Anytime_toggle-event').checked) return true;
    else return false;
}
function is_Tab_Timetable_CalculateOnce() {
    if (document.getElementById('Tab_Timetable_toggle-event').checked) return false;
    else return true;
}

function Tab_Anytime_hourorday() {
    var time = parseFloat($("#Tab_Anytime_Time").val());
    if (is_Tab_Anytime_CalculateOneDay()) {
        $("#Demand").html(language.HTMLJS.Demand_daily);
        $("#Tab_Anytime_Time").removeAttr("disabled");
        document.getElementById("Tab_Anytime_thumb").style.backgroundColor='rgb(112, 166, 236)';
        var id = ["#MT","#AT","#RT","#PT","#TT","#ET","#QPT","#QRT"];
        for (var i = 0 ; i < 8; i++) {
            $(id[i]).val(Math.round($(id[i]).val() * time * 100) / 100);
        }
    }
    else {
        $("#Demand").html(language.HTMLJS.Demand_hour);
        $("#Tab_Anytime_Time").attr('disabled', "true");
        document.getElementById("Tab_Anytime_thumb").style.backgroundColor='#CCC';
        var id = ["#MT","#AT","#RT","#PT","#TT","#ET","#QPT","#QRT"];
        for (var i = 0 ; i < 8; i++) {
            $(id[i]).val(Math.round($(id[i]).val() / time * 100) / 100);
        }
    }
}

//Tab_Timetable\
//-----------
var Tab_Timetable_TimeList_html = new Array();
$(function (){
    $("#Time_Timetable_hours").on('input propertychange',function() {Tab_Timetable_ChangeMaxTime()});
    $("#Time_Timetable_minutes").on('input propertychange',function() {Tab_Timetable_ChangeMaxTime()});
})

function Tab_Timetable_ChangeMaxTime() {
    var total_time = Tab_Timetable_getMaxTime();
    var stringTime = Tab_Timetable_OutputStringTime(total_time);
    document.getElementById('Tab_Timetable_range_tooltip_0_value').innerHTML = stringTime;
}
function Tab_Timetable_getMaxTime() {
    var hours, minutes;
    if (is_Non_positive_number($("#Time_Timetable_hours").val())) hours = 0;
    else hours = parseFloat($("#Time_Timetable_hours").val());
    if (is_Non_positive_number($("#Time_Timetable_minutes").val())) minutes = 0;
    else minutes = parseFloat($("#Time_Timetable_minutes").val());
    return hours + minutes / 60;
}
function Tab_Timetable_OutputStringTime(time) {
    var hours = parseInt(time);
    var minutes = Math.round((time - hours) * 60);
    if ((minutes + "").length < 2) minutes = "0" + minutes;
    return hours + ":" + minutes;
}

function Tab_Timetable_AddNewTimePoint() {
    Tab_Timetable_InputTotalTime_disable();
    var hours = getPositiveValueFromHTML($("#Tab_Timetable_new_hours"));
    var minutes = getPositiveValueFromHTML($("#Tab_Timetable_new_minutes"));
    var total_time = hours + minutes / 60;
    switch(true) {
        case total_time == 0:
            if (Tab_Timetable_TimeList_html.length == 0) {
                Tab_Timetable_InputTotalTime_enable();
            }
            alert(language.HTMLJS.tab_Timetable_alert1);
            break;
        case total_time >= Tab_Timetable_getMaxTime():
            if (Tab_Timetable_TimeList_html.length == 0) {
                Tab_Timetable_InputTotalTime_enable();
            }
            alert(language.HTMLJS.tab_Timetable_alert2);
            break;
        case Tab_Timetable_TimeList_html.indexOf(total_time) != -1:
            alert(language.HTMLJS.tab_Timetable_alert3);
            break;
        default:
            Tab_Timetable_AddNewTimePoint_main(total_time);
    }
    Tab_Timetable_emptyInputNewTime(total_time);
}
function Tab_Timetable_InputTotalTime_disable() {
    $("#Time_Timetable_hours").attr('disabled', "true");
    $("#Time_Timetable_minutes").attr('disabled', "true");
}
function Tab_Timetable_emptyInputNewTime() {
    $("#Tab_Timetable_new_hours").val("");
    $("#Tab_Timetable_new_minutes").val("");
}

function Tab_Timetable_AddNewTimePoint_main(time) {
    Tab_Timetable_TimeList_html.push(time);
    var maxtime = Tab_Timetable_getMaxTime();
    var position = (time / maxtime) * 100 + '%';
    Tab_Timetable_AddNewThumb(time, position);
    Tab_Timetable_AddNewTooltip(time, position);
}
function Tab_Timetable_AddNewThumb(time, position) {
    var newThumb = '<span thumb id="Tab_Timetable_range_thumb_' + time + '"';
    newThumb += ('style="left:' + position + '; background-color:rgb(221, 155, 155);"');
    newThumb += ('onmousedown="Tab_Timetable_DeleteThisTimePoint(' + time + ')">');
    newThumb += ('<span class="glyphicon glyphicon-remove-circle" style="font-size: 22px;"></span></span>');
    $("#Tab_Timetable_range").append(newThumb);
}
function Tab_Timetable_AddNewTooltip(time, position) {
    var stringTime = Tab_Timetable_OutputStringTime(time);
    var newTooltip = '<div id="Tab_Timetable_range_tooltip_' + time + '"';
    if (Tab_Timetable_TimeList_html.indexOf(time) % 2 == 0) {
        newTooltip += 'class="tooltip top custom-tooltip"';
        newTooltip += ('style="left:' + position + '; top:-32px; margin-left: -15px;">');
    }
    else {
        newTooltip += 'class="tooltip bottom custom-tooltip"';
        newTooltip += ('style="left:' + position + '; top:12px; margin-left: -15px;">');
    }
    newTooltip += '<div class="tooltip-arrow"></div><div class="tooltip-inner">';
    newTooltip += (stringTime + '</div></div>');
    $("#Tab_Timetable_range").append(newTooltip);
}

function Tab_Timetable_DeleteThisTimePoint(time) {
    Tab_Timetable_TimeList_html.remove(time);
    var thumb_id = "Tab_Timetable_range_thumb_" + time;
    var tooltip_id = "Tab_Timetable_range_tooltip_" + time;
    var thumb_obj = document.getElementById(thumb_id);
    var tooltip_obj = document.getElementById(tooltip_id);
    var parent_obj = document.getElementById('Tab_Timetable_range');
    parent_obj.removeChild(thumb_obj);
    parent_obj.removeChild(tooltip_obj);
    if (Tab_Timetable_TimeList_html.length == 0) Tab_Timetable_InputTotalTime_enable();
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

function Tab_Timetable_DeleteAllTimePoints() {
    var times = Tab_Timetable_TimeList_html.length;
    for (var i = 0; i < times; i++) {
        Tab_Timetable_DeleteThisTimePoint(Tab_Timetable_TimeList_html[0]);
    }
    Tab_Timetable_InputTotalTime_enable();
}

function Tab_Timetable_hourorday() {
    if (is_Tab_Timetable_CalculateOnce()) $("#Demand").html(language.HTMLJS.Demand_total);
    else $("#Demand").html(language.HTMLJS.Demand_hour);
}
//-----------

//同步更新大成功UP增加概率
$(function (){
    $("#GreatSuccessRate").on('input propertychange',function() {
        if (IsGreatSuccessRateUp()) {
            var UpRate;
            var GreatSuccessRate = $("#GreatSuccessRate");
            if (is_Non_positive_number(GreatSuccessRate.val()) || GreatSuccessRate.val() < 15) {
                UpRate = 15;
            }
            else {
                if (GreatSuccessRate.val() > 60) UpRate = 30;
                else UpRate = 15 + Math.floor((GreatSuccessRate.val() - 15) / 3);
            }
            document.getElementById('Display_UPRate').innerHTML = ("+" + UpRate);
        }
    });
})

function Function_GreatSuccessRateUP() {
    CheckDataLegalityAndCorrect_GreatSuccessRate();
    var UpRate = 0;
    if (IsGreatSuccessRateUp()) {
        UpRate = 15 + Math.floor(($("#GreatSuccessRate").val() - 15) / 3);
        document.getElementById('Display_UPRate').innerHTML = ("+" + UpRate);
        return UpRate;
    }
    else {
        document.getElementById('Display_UPRate').innerHTML = "";
        return UpRate;
    }
}

function setTarget(TargetInfo) {
    var MT = $("#MT");
    var AT = $("#AT");
    var RT = $("#RT");
    var PT = $("#PT");
    var TT = $("#TT");
    var ET = $("#ET");
    var QPT = $("#QPT");
    var QRT = $("#QRT");
    switch (TargetInfo) {
        case 1:
            MT.val(130); AT.val(130); RT.val(130); PT.val(130); TT.val(0); ET.val(0); QPT.val(0); QRT.val(0); break;
        case 2:
            MT.val(430); AT.val(430); RT.val(130); PT.val(230); TT.val(0); ET.val(0); QPT.val(0); QRT.val(0); break;
        case 3:
            MT.val(430); AT.val(130); RT.val(430); PT.val(230); TT.val(0); ET.val(0); QPT.val(0); QRT.val(0); break;
        case 4:
            MT.val(130); AT.val(430); RT.val(430); PT.val(130); TT.val(0); ET.val(0); QPT.val(0); QRT.val(0); break;
        case 5:
            MT.val(730); AT.val(630); RT.val(130); PT.val(430); TT.val(0); ET.val(0); QPT.val(0); QRT.val(0); break;
        case 6:
            MT.val(800); AT.val(200); RT.val(800); PT.val(400); TT.val(0); ET.val(0); QPT.val(0); QRT.val(0); break;
        case 7:
            MT.val(400); AT.val(400); RT.val(400); PT.val(200); TT.val(0); ET.val(0); QPT.val(0); QRT.val(0); break;
        case 8:
            MT.val(0); AT.val(0); RT.val(0); PT.val(0); TT.val(0); ET.val(0); QPT.val(0); QRT.val(0); break;
    }
}

function ChangeTarget(ID, changevalue) {
    var OriginalValue = getPositiveValueFromHTML(ID);
    var totalValue = Math.round((OriginalValue + changevalue) * 1000) / 1000;
    ID.val(totalValue);
    if (ID.val() < 0) ID.val(0);
}