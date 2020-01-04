var Array_GreatSuccessRate = [ "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15 / 16", "15 / 16", "16", "16", "16 / 17", "17", "17 / 18", "17 / 18", "17 / 18", "18 / 19", "18 / 19", "19", "19", "19 / 20", "20", "20 / 21", "20 / 21", "20 / 21", "21 / 22", "21 / 22", "22", "22", "22 / 23", "23", "23 / 24", "23 / 24", "23 / 24", "24 / 25", "24 / 25", "25", "25", "25 / 26", "26", "26 / 27", "26 / 27", "26 / 27", "27 / 28", "27 / 28", "28", "28", "28 / 29", "29", "29 / 30", "29 / 30", "29 / 30", "30 / 31", "30 / 31", "31", "31", "31 / 21", "32", "32 / 33", "32 / 33", "32", "31"];

function Input_getGreatSuccessRate(NeedCorrection = false) {
    var Rate_elem = $("#GreatSuccessRate");
    var Rate = Rate_elem.val();
    if (is_NonPositiveNumberOrInfinity(Rate) || Rate < 15)
        Rate = 15;
    else if (Rate > 69)
        Rate = 69;
    else
        Rate = Math.round(Rate);
    if (NeedCorrection)
        Rate_elem.val(Rate);
    return Rate;
}

function Input_setGreatSuccessRate(Rate) {
    $("#GreatSuccessRate").val(Rate);
    setQContract(Input_getTotalGreatSuccessRate());
    storageSetItem("GreatSuccessRate", Rate);
}

function IsGreatSuccessRateUp() {
    if (document.getElementById('GreatSuccessRateUp').checked)
        return true;
    else
        return false;
}

function Input_getGreatSuccessUpRate(GreatSuccessRate) {
    if (IsGreatSuccessRateUp())
        return parseInt(Array_GreatSuccessRate[GreatSuccessRate].substr(0, 2));
    else
        return 0;
}

function Input_getTotalGreatSuccessRate(NeedCorrection = false) {
    var BaseRate = Input_getGreatSuccessRate(NeedCorrection);
    var UpRate = Input_getGreatSuccessUpRate(BaseRate);
    return BaseRate + UpRate;
}

function Input_setGreatSuccessUpRate(is_RateUP, NeedCorrectBaseRate = true) {
    var checkbox_elem = document.getElementById("GreatSuccessRateUp");
    var UpRateText_elem = document.getElementById("Display_UPRate");
    if (is_RateUP === false) {
        checkbox_elem.checked = false;
        UpRateText_elem.innerHTML = "";
    }
    else {
        checkbox_elem.checked = true;
        var BaseRate = Input_getGreatSuccessRate(NeedCorrectBaseRate);
        UpRateText_elem.innerHTML = "+" + Array_GreatSuccessRate[BaseRate];
    }
    setQContract(Input_getTotalGreatSuccessRate());
    storageSetItem("is_GreatSuccessRateUP", is_RateUP);
}

function Input_getTarget_Correct(Target_JQ_elem = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QPT"), $("#QRT")], NeedCorrection = true) {
    if (Array.isArray(Target_JQ_elem))
        return _getTarget_Arr(Target_JQ_elem, NeedCorrection);
    else
        return _getTarget_one(Target_JQ_elem, NeedCorrection);
}
function _getTarget_Arr(Target_JQ_elem_Arr, NeedCorrection) {
    var TargetValue_Arr = [];
    for (var i = 0; i < Target_JQ_elem_Arr.length; i++) {
        TargetValue_Arr.push(getPositiveValueFromHTML(Target_JQ_elem_Arr[i], NeedCorrection));
    }
    return TargetValue_Arr;
}
function _getTarget_one(Target_JQ_elem, NeedCorrection) {
    return getPositiveValueFromHTML(Target_JQ_elem, NeedCorrection);
}

function Input_setTarget(TargetValue = [0,0,0,0,0,0,0,0], Target_JQ_elem = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QPT"), $("#QRT")]) {
    if (Array.isArray(TargetValue))
        _setTarget_arr(TargetValue, Target_JQ_elem);
    else
        _setTarget_one(TargetValue, Target_JQ_elem);
    storageSetItem("TargetValue", Input_getTarget_Correct());
}
function _setTarget_arr(TargetValue_Arr, Target_JQ_elem_Arr) {
    for (var i = 0; i < TargetValue_Arr.length; i++) {
        _setTarget_one(TargetValue_Arr[i], Target_JQ_elem_Arr[i]);
    }
}
function _setTarget_one(TargetValue, Target_JQ_elem) {
    if (TargetValue < 0)
        Target_JQ_elem.val(0);
    else
        Target_JQ_elem.val(Math.round(TargetValue * 100) / 100);
}

function Input_getContractWeight() {
    return parseInt($('#ContractWeight').val());
}

function Input_setContractWeight(ContractWeight = 50) {
    $("#ContractWeight").val(ContractWeight);
    var ContractWeight_Corrected = Input_getContractWeight();
    document.getElementById("ContractWeight_range").style.right = 100 - ContractWeight_Corrected + "%";
    document.getElementById("ContractWeight_thumb").style.left = ContractWeight_Corrected + "%";
    storageSetItem("ContractWeight", ContractWeight_Corrected);
}

function Input_getSelectChapter() {
    return parseInt($("#ChapterLimit").val());
}

function Input_setSelectChapter(ChapterValue = 12) {
    $("#ChapterLimit").val(ChapterValue);
    var Chapter = $("#ChapterLimit").val();
    if (Chapter === null)
        $("#ChapterLimit").val(12);
    storageSetItem("SelectChapter", Input_getSelectChapter());
}

//Anytime---------
function Input_getAnytimeHours(NeedCorrection = false) {
    return getPositiveValueFromHTML($("#Time_Anytime_hours"), NeedCorrection);
}
function Input_getAnytimeMinutes(NeedCorrection = false) {
    return getPositiveValueFromHTML($("#Time_Anytime_minutes"), NeedCorrection);
}
function Input_getAnytimeTotalTime(NeedCorrection = false) {
    var hours = Input_getAnytimeHours(NeedCorrection);
    var minutes = Input_getAnytimeMinutes(NeedCorrection);
    return hours * 60 + minutes;
}

function Input_setAnytimeHours(hours = 16) {
    $("#Time_Anytime_hours").val(hours);
}
function Input_setAnytimeMinutes(minutes = 0) {
    $("#Time_Anytime_minutes").val(minutes);
}
function Input_setAnytimeTotalTime(TotalMinutes = 960) {
    var hours = parseInt(TotalMinutes / 60);
    var minutes = TotalMinutes % 60;
    Input_setAnytimeHours(hours);
    Input_setAnytimeMinutes(minutes);
}

function Input_getAnytimeMinimumIntervalTime(NeedCorrection = false) {
    return getPositiveValueFromHTML($("#Tab_Anytime_MinimumIntervalTime_minutes"), NeedCorrection);
}

function Input_setAnytimeMinimumIntervalTime(MinimumIntervalTime) {
    $("#Tab_Anytime_MinimumIntervalTime_minutes").val(MinimumIntervalTime);
}
//----------------

//Timetable-------
function Input_getTimetableHours(NeedCorrection = false) {
    return getPositiveValueFromHTML($("#Time_Timetable_hours"), NeedCorrection);
}
function Input_getTimetableMinutes(NeedCorrection = false) {
    return getPositiveValueFromHTML($("#Time_Timetable_minutes"), NeedCorrection);
}
function Input_getTimetableTotalTime(NeedCorrection = false) {
    var hours = Input_getTimetableHours(NeedCorrection);
    var minutes = Input_getTimetableMinutes(NeedCorrection);
    return hours * 60 + minutes;
}

function Input_setTimetableHours(hours = 5) {
    $("#Time_Timetable_hours").val(hours);
}
function Input_setTimetableMinutes(minutes = 0) {
    $("#Time_Timetable_minutes").val(minutes);
}
function Input_setTimetableTotalTime(TotalMinutes = 300, NeedDrawing = true) {
    if (NeedDrawing)
        document.getElementById('Tab_Timetable_range_tooltip_0_value').innerHTML = TimeFormat(TotalMinutes);
    var hours = parseInt(TotalMinutes / 60);
    var minutes = TotalMinutes % 60;
    Input_setTimetableHours(hours);
    Input_setTimetableMinutes(minutes);
}

function Input_getTimetableNewHours_Correct(NeedCorrection = true) {
    var hours = getPositiveValueFromHTML($("#Tab_Timetable_new_hours"), NeedCorrection);
    if (NeedCorrection)
        $("#Tab_Timetable_new_hours").val("");
    return hours;
}
function Input_getTimetableNewMinutes_Correct(NeedCorrection = true) {
    var minutes = getPositiveValueFromHTML($("#Tab_Timetable_new_minutes"), NeedCorrection);
    if (NeedCorrection)
        $("#Tab_Timetable_new_minutes").val("");
    return minutes;
}
function Input_getTimetableNewTotalTime_Correct(NeedCorrection = true) {
    var hours = Input_getTimetableNewHours_Correct(NeedCorrection);
    var minutes = Input_getTimetableNewMinutes_Correct(NeedCorrection);
    return hours * 60 + minutes;
}

function Input_setTimetableTimetable(TimeList) {
    Tab_Timetable_DeleteAllTimePoint();
    for (var i = 0; i < TimeList.length; i++) {
        Tab_Timetable_AddNewTimePoint(TimeList[i]);
    }
    if (Tab_Timetable_TIMELIST.length === 0)
        Tab_Timetable_InputTotalTime_enable();
    else
        Tab_Timetable_InputTotalTime_disable();
}
//----------------