function is_CalculateByHour() {
    return !!document.getElementById('Display_PerHour').checked;
}

/** @returns {number} */
function Input_getGreatSuccessRate(NeedCorrection = false) {
    const Rate_elem = $("#GreatSuccessRate");
    let Rate = Rate_elem.val();
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

/** @param {number} Rate - 大成功基础概率 */
function Input_setGreatSuccessRate(Rate) {
    $("#GreatSuccessRate").val(Rate);
    setQContract(Input_getTotalGreatSuccessRate());
    storageSetItem("GreatSuccessRate", Rate);
}

function IsGreatSuccessRateUp() {
    return !!document.getElementById('GreatSuccessRateUp').checked;
}

/**
 * 根据基础大成功概率返回增加的概率, 必须为整数
 * @param {number} Index_BaseRate - 基础大成功概率
 * @returns {string} 增加的概率
 */
function _getGreatSuccessUpRate(Index_BaseRate) {
    /**当基础后勤大成功概率为i时, 增加的概率为第i个元素 */
    const Array_GreatSuccessRate = ["15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15 / 16", "15 / 16", "16", "16", "16 / 17", "17", "17 / 18", "17 / 18", "17 / 18", "18 / 19", "18 / 19", "19", "19", "19 / 20", "20", "20 / 21", "20 / 21", "20 / 21", "21 / 22", "21 / 22", "22", "22", "22 / 23", "23", "23 / 24", "23 / 24", "23 / 24", "24 / 25", "24 / 25", "25", "25", "25 / 26", "26", "26 / 27", "26 / 27", "26 / 27", "27 / 28", "27 / 28", "28", "28", "28 / 29", "29", "29 / 30", "29 / 30", "29 / 30", "30 / 31", "30 / 31", "31", "31", "31 / 21", "32", "32 / 33", "32 / 33", "32", "31"];
    return Array_GreatSuccessRate[Index_BaseRate];
}

/** @param {number} GreatSuccessRate - 大成功基础概率 */
function Input_getGreatSuccessUpRate(GreatSuccessRate) {
    if (IsGreatSuccessRateUp())
        return parseInt(_getGreatSuccessUpRate(GreatSuccessRate).substr(0, 2));
    else
        return 0;
}

function Input_getTotalGreatSuccessRate(NeedCorrection = false) {
    const BaseRate = Input_getGreatSuccessRate(NeedCorrection);
    const UpRate = Input_getGreatSuccessUpRate(BaseRate);
    return BaseRate + UpRate;
}

/** @param {boolean} is_RateUP - 是否大成功概率提升 */
function Input_setGreatSuccessUpRate(is_RateUP, NeedCorrectBaseRate = true) {
    const checkbox_elem = document.getElementById("GreatSuccessRateUp");
    const checkbtn_JQ_selector = $("#GreatSuccessRateUp_btn");
    const UpRateText_elem = document.getElementById("Display_UPRate");
    if (is_RateUP === false) {
        checkbox_elem.checked = false;
        checkbtn_JQ_selector.removeClass("active");
        UpRateText_elem.innerHTML = "";
    }
    else {
        checkbox_elem.checked = true;
        checkbtn_JQ_selector.addClass("active");
        const BaseRate = Input_getGreatSuccessRate(NeedCorrectBaseRate);
        UpRateText_elem.innerHTML = "+" + _getGreatSuccessUpRate(BaseRate);
    }
    setQContract(Input_getTotalGreatSuccessRate());
    storageSetItem("Is_GreatSuccessRateUP", is_RateUP);
}

/**
 * 返回目标值(需求量), NeedCorrection 默认为true 
 * @param {*} Target_JQ_selector - Target的jQuery选择器, 也可以是选择器数组
 */
function Input_getTarget_Correct(Target_JQ_selector = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QPT"), $("#QRT")],
                                    NeedCorrection = true) {
    if (Array.isArray(Target_JQ_selector))
        return _getValue_Arr(Target_JQ_selector, NeedCorrection);
    else
        return getPositiveValueFromHTML(Target_JQ_selector, NeedCorrection);
}
/**
 * @param {Array} Target_JQ_selector_Arr - jQuery选择器数组
 * @param {boolean} NeedCorrection - 是否需要修正
 */
function _getValue_Arr(Target_JQ_selector_Arr, NeedCorrection) {
    let TargetValue_Arr = [];
    for (let i = 0; i < Target_JQ_selector_Arr.length; i++) {
        TargetValue_Arr.push(getPositiveValueFromHTML(Target_JQ_selector_Arr[i], NeedCorrection));
    }
    return TargetValue_Arr;
}

/**
 * 
 * @param {number|Array.<number>} TargetValue
 * @param {*} Target_JQ_selector - Target的jQuery选择器, 也可以是选择器数组
 */
function Input_setTarget(TargetValue = [0, 0, 0, 0, 0, 0, 0, 0], 
                            Target_JQ_selector = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QPT"), $("#QRT")]) {
    if (Array.isArray(TargetValue))
        _setTarget_arr(TargetValue, Target_JQ_selector);
    else
        _setTarget_one(TargetValue, Target_JQ_selector);
    storageSetItem("TargetValue", Input_getTarget_Correct());
}
/**
 * 
 * @param {Array.<number>} TargetValue_Arr
 * @param {Array} Target_JQ_selector_Arr - jQuery选择器数组
 */
function _setTarget_arr(TargetValue_Arr, Target_JQ_selector_Arr) {
    for (let i = 0; i < TargetValue_Arr.length; i++) {
        _setTarget_one(TargetValue_Arr[i], Target_JQ_selector_Arr[i]);
    }
}
/** @param {number} TargetValue */
function _setTarget_one(TargetValue, Target_JQ_selector) {
    if (TargetValue < 0)
        Target_JQ_selector.val(0);
    else
        Target_JQ_selector.val(Math.round(TargetValue * 100) / 100);
}

function Input_getContractWeight() {
    return parseInt($('#ContractWeight').val());
}

function Input_setContractWeight(ContractWeight = 50) {
    $("#ContractWeight").val(ContractWeight);
    const ContractWeight_Corrected = Input_getContractWeight();
    storageSetItem("ContractWeight", ContractWeight_Corrected);
}

function Input_getSelectChapter() {
    return parseInt($("#ChapterLimit").val());
}

function Input_setSelectChapter(ChapterValue = Q.length / 4 - 1) {
    $("#ChapterLimit").val(ChapterValue);
    const Chapter = $("#ChapterLimit").val();
    if (Chapter === null)
        $("#ChapterLimit").val(Q.length / 4 - 1);
    storageSetItem("ChapterLimit", Input_getSelectChapter());
}

//Anytime---------
function Input_getAnytimeHours(NeedCorrection = false) {
    return getPositiveValueFromHTML($("#Time_Anytime_hours"), NeedCorrection);
}
function Input_getAnytimeMinutes(NeedCorrection = false) {
    return getPositiveValueFromHTML($("#Time_Anytime_minutes"), NeedCorrection);
}
function Input_getAnytimeTotalTime(NeedCorrection = false) {
    const hours = Input_getAnytimeHours(NeedCorrection);
    const minutes = Input_getAnytimeMinutes(NeedCorrection);
    return hours * 60 + minutes;
}

function Input_setAnytimeHours(hours = 16) {
    $("#Time_Anytime_hours").val(hours);
}
function Input_setAnytimeMinutes(minutes = 0) {
    $("#Time_Anytime_minutes").val(minutes);
}
function Input_setAnytimeTotalTime(TotalMinutes = 960) {
    const hours = parseInt(TotalMinutes / 60);
    const minutes = TotalMinutes % 60;
    Input_setAnytimeHours(hours);
    Input_setAnytimeMinutes(minutes);
}

function Input_getAnytimeMinimumIntervalTime(NeedCorrection = false) {
    return getPositiveValueFromHTML($("#Tab_Anytime_MinimumIntervalTime_minutes"), NeedCorrection);
}

function Input_setAnytimeMinimumIntervalTime(MinimumIntervalTime = 0) {
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
    const hours = Input_getTimetableHours(NeedCorrection);
    const minutes = Input_getTimetableMinutes(NeedCorrection);
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
    const hours = parseInt(TotalMinutes / 60);
    const minutes = TotalMinutes % 60;
    Input_setTimetableHours(hours);
    Input_setTimetableMinutes(minutes);
}

/**NeedCorrection 默认为true */
function Input_getTimetableNewHours_Correct(NeedCorrection = true) {
    const hours = getPositiveValueFromHTML($("#Tab_Timetable_new_hours"), NeedCorrection);
    if (NeedCorrection)
        $("#Tab_Timetable_new_hours").val("");
    return hours;
}
/**NeedCorrection 默认为true */
function Input_getTimetableNewMinutes_Correct(NeedCorrection = true) {
    const minutes = getPositiveValueFromHTML($("#Tab_Timetable_new_minutes"), NeedCorrection);
    if (NeedCorrection)
        $("#Tab_Timetable_new_minutes").val("");
    return minutes;
}
/**NeedCorrection 默认为true */
function Input_getTimetableNewTotalTime_Correct(NeedCorrection = true) {
    const hours = Input_getTimetableNewHours_Correct(NeedCorrection);
    const minutes = Input_getTimetableNewMinutes_Correct(NeedCorrection);
    return hours * 60 + minutes;
}

/** @param {Array.<number>} TimeList */
function Input_setTimetableTimetable(TimeList) {
    // Tab_Timetable_DeleteAllTimePoint();
    Tab_Timetable_setTimePoints(TimeList);
}
//----------------

/**
 * 获取设置后勤开始时间
 * @returns {number} 从零点开始到开始时间的总分钟数
 */
function Input_getStartTime() {
    let startTime = $("#PlanDetails_InputStartTime").val();
    let hours = parseFloat(startTime.substr(0, 2));
    if (isNaN(hours))
        return 0;
    let minutes = parseFloat(startTime.substr(3, 2));
    if (isNaN(minutes))
        minutes = 0;
    return hours * 60 + minutes;
}

/** @param {number} StartTime - 从零点开始到开始时间的总分钟数 */
function Input_setStartTime(StartTime = 0) {
    let startTimeString = TimeFormat_Day(StartTime);
    if (startTimeString.indexOf(":") !== 2)
        startTimeString = "0" + startTimeString;
    $("#PlanDetails_InputStartTime").val(startTimeString);
}

/** @returns {number} Number of executions */
function Input_getExecutionTimes(NeedCorrection = false) {
    const Times_elem = $("#PlanDetails_InputExecutionTimes");
    let Times = Times_elem.val();
    if (is_NonPositiveNumberOrInfinity(Times) || Times < 1)
        Times = 1;
    else if (Times > 999)
        Times = 999;
    else
        Times = Math.round(Times);
    if (NeedCorrection)
        Times_elem.val(Times);
    return Times;
}

//calcTargetValueTool-------
function Input_getCalcTargetValueTool_Target(NeedCorrection = false) {
    const Target_JQ_selector = [$("#calcTargetValueTool_Target_Manp"),
        $("#calcTargetValueTool_Target_Ammu"), $("#calcTargetValueTool_Target_Rati"),
        $("#calcTargetValueTool_Target_Part"), $("#calcTargetValueTool_Target_TPro"),
        $("#calcTargetValueTool_Target_Equi"), $("#calcTargetValueTool_Target_QPro"), $("#calcTargetValueTool_Target_QRes")
    ];
    return _getValue_Arr(Target_JQ_selector, NeedCorrection);
}

function Input_setCalcTargetValueTool_Target(TargetValue = [0, 0, 0, 0, 0, 0, 0, 0]) {
    const Target_JQ_selector = [$("#calcTargetValueTool_Target_Manp"),
        $("#calcTargetValueTool_Target_Ammu"), $("#calcTargetValueTool_Target_Rati"),
        $("#calcTargetValueTool_Target_Part"), $("#calcTargetValueTool_Target_TPro"),
        $("#calcTargetValueTool_Target_Equi"), $("#calcTargetValueTool_Target_QPro"), $("#calcTargetValueTool_Target_QRes")
    ];
    _setTarget_arr(TargetValue, Target_JQ_selector);
    storageSetItem("CalcTargetValueTool_Target", Input_getCalcTargetValueTool_Target());
}

function Input_getCalcTargetValueTool_Current(NeedCorrection = false) {
    const Current_JQ_selector = [$("#calcTargetValueTool_Current_Manp"),
        $("#calcTargetValueTool_Current_Ammu"), $("#calcTargetValueTool_Current_Rati"),
        $("#calcTargetValueTool_Current_Part"), $("#calcTargetValueTool_Current_TPro"),
        $("#calcTargetValueTool_Current_Equi"), $("#calcTargetValueTool_Current_QPro"), $("#calcTargetValueTool_Current_QRes")
    ];
    return _getValue_Arr(Current_JQ_selector, NeedCorrection);
}

function Input_setCalcTargetValueTool_Current(CurrentValue = [0, 0, 0, 0, 0, 0, 0, 0]) {
    const Current_JQ_selector = [$("#calcTargetValueTool_Current_Manp"),
        $("#calcTargetValueTool_Current_Ammu"), $("#calcTargetValueTool_Current_Rati"),
        $("#calcTargetValueTool_Current_Part"), $("#calcTargetValueTool_Current_TPro"),
        $("#calcTargetValueTool_Current_Equi"), $("#calcTargetValueTool_Current_QPro"), $("#calcTargetValueTool_Current_QRes")
    ];
    _setTarget_arr(CurrentValue, Current_JQ_selector);
    storageSetItem("CalcTargetValueTool_Current", Input_getCalcTargetValueTool_Current());
}

/** @returns {number} Number of executions */
function Input_getCalcTargetValueTool_InputExecutionTimes(NeedCorrection = false) {
    const Times_elem = $("#calcTargetValueTool_InputExecutionTimes");
    let Times = Times_elem.val();
    if (is_NonPositiveNumberOrInfinity(Times) || Times < 1)
        Times = 1;
    else if (Times > 999)
        Times = 999;
    else
        Times = Math.round(Times);
    if (NeedCorrection)
        Times_elem.val(Times);
    return Times;
}

function Input_setCalcTargetValueTool_InputExecutionTimes(ExecutionTimes = 1) {
    const Times_elem = $("#calcTargetValueTool_InputExecutionTimes");
    ExecutionTimes = Math.round(ExecutionTimes);
    Times_elem.val(ExecutionTimes);
    storageSetItem("CalcTargetValueTool_ExecutionTimes", Input_getCalcTargetValueTool_InputExecutionTimes());
}
//--------------------------