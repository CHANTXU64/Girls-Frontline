function stringSliceFromLast_(str, end) {
    var start = str.lastIndexOf("_");
    if (end === undefined)
        return str.slice(start + 1);
    else
        return str.slice(start + 1, end);
}

function NumberAutoExact(number) {
    if (number > 100)
        return Math.round(number);
    else if (number > 10)
        return Math.round(number * 10) / 10;
    else
        return Math.round(number * 100) / 100;
}

function TimeFormat(Minutes) {
    var hours = parseInt(Minutes / 60);
    var minutes = Minutes % 60;
    if ((minutes + "").length < 2)
        minutes = "0" + minutes;
    return hours + ':' + minutes;
}

function is_NonPositiveNumberOrInfinity(x) {
    if (x === "" || isNaN(x) || x < 0 || x === "Infinity")
        return true;
    else
        return false;
}

function getPositiveValueFromHTML(JQ_elem, NeedCorrection = false) {
    let Value;
    if (is_NonPositiveNumberOrInfinity(JQ_elem.val()))
        Value = 0;
    else
        Value = parseFloat(JQ_elem.val());
    if (NeedCorrection)
        JQ_elem.val(Value);
    return Value;
}

Array.prototype.remove = function(val) {
    let i = 0;
    while (i < this.length) {
        if (this[i] === val)
            this.splice(i, 1);
        else
            i++;
    }
};

Array.prototype.remove_First = function(val) {
    let i = 0;
    while (i < this.length) {
        if (this[i] === val) {
            this.splice(i, 1);
            break;
        }
        else
            i++;
    }
};
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
//https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F#JavaScript
class Range {
    constructor(s = 0, e = 0) {
        this.start = s;
        this.end = e;
    }
}

function quick_sort_descending(arr) {
    // r[]模擬堆疊,p為數量,r[p++]為push,r[--p]為pop且取得元素
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) 
            continue;
        var mid = arr[range.end];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left] > mid && left < right) left++;
            while (arr[right] <= mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left] <= arr[range.end])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else 
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

function quick_sort_expand_descending(arr, compare_Column) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) 
            continue;
        var mid = arr[range.end][compare_Column];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left][compare_Column] > mid && left < right) left++;
            while (arr[right][compare_Column] <= mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left][compare_Column] <= arr[range.end][compare_Column])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else 
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

function quick_sort_expand_ascending(arr, compare_Column) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) 
            continue;
        var mid = arr[range.end][compare_Column];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left][compare_Column] < mid && left < right) left++;
            while (arr[right][compare_Column] >= mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left][compare_Column] >= arr[range.end][compare_Column])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else 
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}
var language;
var languages = 
{
    "zh-CN": {
        "lang": "zh-Hans",
        "title": "少女前线-后勤组合排序器",
        "HTML": {
            "header": "后勤组合排序器",
            "Config_text": "全局数据",
            "description_text": "计算结果只和资源（或契约）之间的比例有关。计算结果为均值。",
            "neverShowAgain_description": "[&times;]<u>不再显示</u>",
            "localstorageDoesNotWork": "因某些原因，Web存储无法工作，需要手动导出配置",
            "localstorageWarning_text": "网页使用Web存储，清除浏览器缓存会导致数据清除，请定期手动导出并保存你的数据。",
            "neverShowAgain_localstorageWarning": "[&times;]<u>不再显示</u>",
            "setting": "设置",
            "Tab_Anytime_name": "随时能收后勤",
            "Tab_Timetable_name": "时间计划表",
            "tab_Anytime_time": "后勤总时长",
            "tab_Anytime_hour": "小时",
            "tab_Anytime_minute": "分钟",
            "tab_Anytime_MinimumIntervalTime": "最短间隔时间",
            "tab_Anytime_MinimumIntervalTime_minute": "分钟",
            "tab_Timetable_time": "后勤总时长",
            "tab_Timetable_hour": "小时",
            "tab_Timetable_minute": "分钟",
            "tab_Timetable_addtimeh5": "新添加一个收取后勤时间点:",
            "tab_Timetable_new_hour": "小时",
            "tab_Timetable_new_minute": "分钟",
            "h4GreatSuccessRate": "后勤队伍平均大成功概率",
            "GreatSuccessRateUp_text": "后勤大成功UP",
            "h4ChapterLimit": "关卡解锁",
            "chapter6": "第六战役",
            "chapter7": "第七战役",
            "chapter8": "第八战役",
            "chapter9": "第九战役",
            "chapter10": "第十战役",
            "chapter11": "第十一战役",
            "chapter12": "第十二战役",
            "Display_PerHour_text": "以每小时显示",
            "Display_Total_text": "以总计显示",
            "ContractWeight_notImportant": "契约不重要",
            "ContractWeight_Important": "契约重要",
            "start_sorting": "开始排序",
            "clear_sorting": "清除排序结果",
            "result": "排序结果",
            "Manp": "人力",
            "Ammu": "弹药",
            "Rati": "口粮",
            "Part": "零件",
            "TPro": "人形",
            "Equi": "装备",
            "QPro": "快建",
            "QRes": "快修",
            "setTarget_HG": "手枪HG",
            "setTarget_SMG": "冲锋枪SMG",
            "setTarget_RF": "步枪RF",
            "setTarget_AR": "突击步枪AR",
            "setTarget_MG": "机枪MG",
            "setTarget_SG": "霰弹枪SG",
            "setTarget_2221": "均衡",
            "setTarget_Clear": "清零",
            "MissionTableTitle": "关卡",
            "MissionTable_head_Mission": "关卡",
            "MissionTable_head_Manp": "人力",
            "MissionTable_head_Ammu": "弹药",
            "MissionTable_head_Rati": "口粮",
            "MissionTable_head_Part": "零件",
            "MissionTable_head_TPro": "人形",
            "MissionTable_head_Equi": "装备",
            "MissionTable_head_QPro": "快建",
            "MissionTable_head_QRes": "快修",
            "MissionTable_head_Time": "时间",
            "PlanDetailsTitle": "方案详情",
            "PlanDetails_Mission": "关卡",
            "PlanDetails_Manp": "人力",
            "PlanDetails_Ammu": "弹药",
            "PlanDetails_Rati": "口粮",
            "PlanDetails_Part": "零件",
            "PlanDetails_TPro": "人形",
            "PlanDetails_Equi": "装备",
            "PlanDetails_QPro": "快建",
            "PlanDetails_QRes": "快修",
            "PlanDetails_Time": "时间",
            "savePlan": "保存方案",
            "Capture": "捕获",
            "Saved_Title": "已保存的",
            "NoSaved": "空",
            "start_sorting_html": "点击 <span style=\"color:#165399\">开始排序</span> 按钮，排序前十六的结果将在这里显示",
            "permanentAddress": "永久地址",
        },
        "HTMLJS": {
            "placeholder": {
                "Config_importInput": "要导入的数据",
                "Time_Anytime_hours": "总时长小时数",
                "Time_Anytime_minutes": "总时长分钟数",
                "Tab_Anytime_MinimumIntervalTime_minutes": "最小时间间隔分钟数",
                "Time_Timetable_hours": "总时长小时数",
                "Time_Timetable_minutes": "总时长分钟数",
                "Tab_Timetable_new_hours": "新时间点小时数",
                "Tab_Timetable_new_minutes": "新时间点分钟数",
                "GreatSuccessRate": "大成功基础概率",
                "MT": "人力需求量",
                "AT": "弹药需求量",
                "RT": "口粮需求量",
                "PT": "零件需求量",
                "TT": "人形需求量",
                "ET": "装备需求量",
                "QPT": "快建需求量",
                "QRT": "快修需求量",
                "importSaved_input": "要导入的数据",
            },
            "title": {
                "Config_importButton": "导入全局数据",
                "Config_export": "导出全局数据",
                "tab_Timetable_deleteall": "删除全部时间点",
                "Tab_Timetable_AddNewTimePoint": "添加一个收取后勤时间点",
                "ChapterLimit": "最大已解锁的战役章节",
                "ContractWeight": "契约权重",
                "Target_minus_100_MT": "人力需求量减少100",
                "Target_minus_10_MT": "人力需求量减少10",
                "Target_plus_10_MT": "人力需求量增加10",
                "Target_plus_100_MT": "人力需求量增加100",
                "Target_minus_100_AT": "弹药需求量减少100",
                "Target_minus_10_AT": "弹药需求量减少10",
                "Target_plus_10_AT": "弹药需求量增加10",
                "Target_plus_100_AT": "弹药需求量增加100",
                "Target_minus_100_RT": "口粮需求量减少100",
                "Target_minus_10_RT": "口粮需求量减少10",
                "Target_plus_10_RT": "口粮需求量增加10",
                "Target_plus_100_RT": "口粮需求量增加100",
                "Target_minus_100_PT": "零件需求量减少100",
                "Target_minus_10_PT": "零件需求量减少10",
                "Target_plus_10_PT": "零件需求量增加10",
                "Target_plus_100_PT": "零件需求量增加100",
                "Target_minus_1_TT": "人形需求量减少1",
                "Target_minus_0.1_TT": "人形需求量减少0.1",
                "Target_plus_0.1_TT": "人形需求量增加0.1",
                "Target_plus_1_TT": "人形需求量增加1",
                "Target_minus_1_ET": "装备需求量减少1",
                "Target_minus_0.1_ET": "装备需求量减少0.1",
                "Target_plus_0.1_ET": "装备需求量增加0.1",
                "Target_plus_1_ET": "装备需求量增加1",
                "Target_minus_1_QPT": "快建需求量减少1",
                "Target_minus_0.1_QPT": "快建需求量减少0.1",
                "Target_plus_0.1_QPT": "快建需求量增加0.1",
                "Target_plus_1_QPT": "快建需求量增加1",
                "Target_minus_1_QRT": "快修需求量减少1",
                "Target_minus_0.1_QRT": "快修需求量减少0.1",
                "Target_plus_0.1_QRT": "快修需求量增加0.1",
                "Target_plus_1_QRT": "快修需求量增加1",
                "importSaved_importButton": "导入数据",
            },
            "Demand_hour": "平均每小时需求量",
            "Demand_total": "总需求量",
            "Timetable_deletePoint": "删除这个时间点",
            "SavedTable_apply": "应用方案",
            "SavedTable_name": "方案名称",
            "SavedTable_rename": "重命名方案",
            "SavedTable_up": "往上移动",
            "SavedTable_down": "往下移动",
            "SavedTable_export": "导出方案",
            "SavedTable_delete": "删除方案",
            "FineTuning_minus": "减小需求量",
            "FineTuning_plus": "增大需求量",
        },
        "JS": {
            "Manp": "人力",
            "Ammu": "弹药",
            "Rati": "口粮",
            "Part": "零件",
            "TPro": "人形",
            "Equi": "装备",
            "QPro": "快建",
            "QRes": "快修",
            "FineTuningTool": "微调工具",
            "TargetValue0_alert": "需求不能全为0！",
            "tab_Anytime_alert1": "总时长不能为0！",
            "tab_Timetable_alert1": "不需要在后勤开始点再添加收取时间点",
            "tab_Timetable_alert2": "添加的收取时间点不能超过最大时限",
            "tab_Timetable_alert3": "已经添加过这个收取时间点",
            "tab_Timetable_alert4": "总时长不能为0！",
            "Mission": "关卡",
            "MinIntervalTime": "最短间隔",
            "NoPlan": "没有合适的方案",
            "NoMission": "没有可用的关卡",
            "Time": "时间",
            "PlanDetails_calculateMethod": "计算方式",
            "total_time": "总时长",
            "total_greatSuccessRate": "大成功总概率",
            "PerHour": "平均/h",
            "Total" : "总计",
            "plzInputPlanName": "请输入方案名称",
            "planDefaultName": "自定义",
            "deleteSavedWarning_1": "是否要删除这个名为",
            "deleteSavedWarning_2": "的配置？",
            "Saved_alert": "导入的数据有问题！",
            "config_alert": "这将会覆盖现有所有的数据，是否要继续？",
        }
    },
    "zh-TW": {
        "lang": "zh-Hant",
        "title": "少女前線-後勤組合排序器",
        "HTML": {
            "header": "後勤組合排序器",
            "Config_text": "全局數據",
            "description_text": "計算結果只和資源（或契約）之間的比例有關。計算結果為期望值。",
            "neverShowAgain_description": "[&times;]<u>不再顯示</u>",
            "localstorageDoesNotWork": "因某些原因，Web存儲無法工作，需要手動導出配置",
            "localstorageWarning_text": "網頁使用Web存儲，清除瀏覽器緩存會導致數據清除，請定期手動導出並保存你的數據。",
            "neverShowAgain_localstorageWarning": "[&times;]<u>不再顯示</u>",
            "setting": "設置",
            "Tab_Anytime_name": "隨時能收後勤",
            "Tab_Timetable_name": "時間計劃表",
            "tab_Anytime_time": "後勤總時長",
            "tab_Anytime_hour": "小時",
            "tab_Anytime_minute": "分鐘",
            "tab_Anytime_MinimumIntervalTime": "最短間隔時間",
            "tab_Anytime_MinimumIntervalTime_minute": "分鐘",
            "tab_Timetable_time": "後勤總時長",
            "tab_Timetable_hour": "小時",
            "tab_Timetable_minute": "分鐘",
            "tab_Timetable_addtimeh5": "新添加一個收取後勤時間點:",
            "tab_Timetable_new_hour": "小時",
            "tab_Timetable_new_minute": "分鐘",
            "h4GreatSuccessRate": "後勤隊伍平均大成功概率",
            "GreatSuccessRateUp_text": "後勤大成功UP",
            "h4ChapterLimit": "關卡解鎖",
            "chapter6": "第六戰役",
            "chapter7": "第七戰役",
            "chapter8": "第八戰役",
            "chapter9": "第九戰役",
            "chapter10": "第十戰役",
            "chapter11": "第十一戰役",
            "chapter12": "第十二戰役",
            "Display_PerHour_text": "以每小時顯示",
            "Display_Total_text": "以總計顯示",
            "ContractWeight_notImportant": "契約不重要",
            "ContractWeight_Important": "契約重要",
            "start_sorting": "開始排序",
            "clear_sorting": "清除排序結果",
            "result": "排序結果",
            "Manp": "人力",
            "Ammu": "彈藥",
            "Rati": "口糧",
            "Part": "零件",
            "TPro": "人形",
            "Equi": "裝備",
            "QPro": "快建",
            "QRes": "快修",
            "setTarget_HG": "手槍HG",
            "setTarget_SMG": "衝鋒槍SMG",
            "setTarget_RF": "步槍RF",
            "setTarget_AR": "突擊步槍AR",
            "setTarget_MG": "機槍MG",
            "setTarget_SG": "霰彈槍SG",
            "setTarget_2221": "均衡",
            "setTarget_Clear": "清零",
            "MissionTableTitle": "關卡",
            "MissionTable_head_Mission": "關卡",
            "MissionTable_head_Manp": "人力",
            "MissionTable_head_Ammu": "彈藥",
            "MissionTable_head_Rati": "口糧",
            "MissionTable_head_Part": "零件",
            "MissionTable_head_TPro": "人形",
            "MissionTable_head_Equi": "裝備",
            "MissionTable_head_QPro": "快建",
            "MissionTable_head_QRes": "快修",
            "MissionTable_head_Time": "時間",
            "PlanDetailsTitle": "方案詳情",
            "PlanDetails_Mission": "關卡",
            "PlanDetails_Manp": "人力",
            "PlanDetails_Ammu": "彈藥",
            "PlanDetails_Rati": "口糧",
            "PlanDetails_Part": "零件",
            "PlanDetails_TPro": "人形",
            "PlanDetails_Equi": "裝備",
            "PlanDetails_QPro": "快建",
            "PlanDetails_QRes": "快修",
            "PlanDetails_Time": "時間",
            "savePlan": "保存方案",
            "Capture": "捕獲",
            "Saved_Title": "已保存的",
            "NoSaved": "空",
            "start_sorting_html": "點擊 <span style=\"color:#165399\">開始排序</span> 按鈕，排序前十六的結果將在這裡顯示",
            "permanentAddress": "永久地址",
        },
        "HTMLJS": {
            "placeholder": {
                "Config_importInput": "要導入的數據",
                "Time_Anytime_hours": "總時長小時數",
                "Time_Anytime_minutes": "總時長分鐘數",
                "Tab_Anytime_MinimumIntervalTime_minutes": "最小時間間隔分鐘數",
                "Time_Timetable_hours": "總時長小時數",
                "Time_Timetable_minutes": "總時長分鐘數",
                "Tab_Timetable_new_hours": "新時間點小時數",
                "Tab_Timetable_new_minutes": "新時間點分鐘數",
                "GreatSuccessRate": "大成功基礎概率",
                "MT": "人力需求量",
                "AT": "彈藥需求量",
                "RT": "口糧需求量",
                "PT": "零件需求量",
                "TT": "人形需求量",
                "ET": "裝備需求量",
                "QPT": "快建需求量",
                "QRT": "快修需求量",
                "importSaved_input": "要導入的數據",
            },
            "title": {
                "Config_importButton": "導入全局數據",
                "Config_export": "導出全局數據",
                "tab_Timetable_deleteall": "刪除全部時間點",
                "Tab_Timetable_AddNewTimePoint": "添加一個收取後勤時間點",
                "ChapterLimit": "最大已解鎖的戰役章節",
                "ContractWeight": "契約權重",
                "Target_minus_100_MT": "人力需求量減少100",
                "Target_minus_10_MT": "人力需求量減少10",
                "Target_plus_10_MT": "人力需求量增加10",
                "Target_plus_100_MT": "人力需求量增加100",
                "Target_minus_100_AT": "彈藥需求量減少100",
                "Target_minus_10_AT": "彈藥需求量減少10",
                "Target_plus_10_AT": "彈藥需求量增加10",
                "Target_plus_100_AT": "彈藥需求量增加100",
                "Target_minus_100_RT": "口糧需求量減少100",
                "Target_minus_10_RT": "口糧需求量減少10",
                "Target_plus_10_RT": "口糧需求量增加10",
                "Target_plus_100_RT": "口糧需求量增加100",
                "Target_minus_100_PT": "零件需求量減少100",
                "Target_minus_10_PT": "零件需求量減少10",
                "Target_plus_10_PT": "零件需求量增加10",
                "Target_plus_100_PT": "零件需求量增加100",
                "Target_minus_1_TT": "人形需求量減少1",
                "Target_minus_0.1_TT": "人形需求量減少0.1",
                "Target_plus_0.1_TT": "人形需求量增加0.1",
                "Target_plus_1_TT": "人形需求量增加1",
                "Target_minus_1_ET": "裝備需求量減少1",
                "Target_minus_0.1_ET": "裝備需求量減少0.1",
                "Target_plus_0.1_ET": "装备需求量增加0.1",
                "Target_plus_1_ET": "装备需求量增加1",
                "Target_minus_1_QPT": "快建需求量減少1",
                "Target_minus_0.1_QPT": "快建需求量減少0.1",
                "Target_plus_0.1_QPT": "快建需求量增加0.1",
                "Target_plus_1_QPT": "快建需求量增加1",
                "Target_minus_1_QRT": "快修需求量減少1",
                "Target_minus_0.1_QRT": "快修需求量減少0.1",
                "Target_plus_0.1_QRT": "快修需求量增加0.1",
                "Target_plus_1_QRT": "快修需求量增加1",
                "importSaved_importButton": "導入數據",
            },
            "Demand_hour": "平均每小時需求量",
            "Demand_total": "總需求量",
            "Timetable_deletePoint": "刪除這個時間點",
            "SavedTable_apply": "應用方案",
            "SavedTable_name": "方案名稱",
            "SavedTable_rename": "重命名方案",
            "SavedTable_up": "往上移動",
            "SavedTable_down": "往下移動",
            "SavedTable_export": "導出方案",
            "SavedTable_delete": "刪除方案",
            "FineTuning_minus": "減小需求量",
            "FineTuning_plus": "增大需求量",
        },
        "JS": {
            "Manp": "人力",
            "Ammu": "彈藥",
            "Rati": "口糧",
            "Part": "零件",
            "TPro": "人形",
            "Equi": "裝備",
            "QPro": "快建",
            "QRes": "快修",
            "FineTuningTool": "微調工具",
            "TargetValue0_alert": "需求不能全為0！",
            "tab_Anytime_alert1": "總時長不能為0！",
            "tab_Timetable_alert1": "不需要在後勤開始點再添加收取時間點",
            "tab_Timetable_alert2": "添加的收取時間點不能超過最大時限",
            "tab_Timetable_alert3": "已經添加過這個收取時間點",
            "tab_Timetable_alert4": "總時長不能為0！",
            "Mission": "關卡",
            "MinIntervalTime": "最短間隔",
            "NoPlan": "沒有合適的方案",
            "NoMission": "沒有可用的關卡",
            "Time": "時間",
            "PlanDetails_calculateMethod": "計算方式",
            "total_time": "總時長",
            "total_greatSuccessRate": "大成功總概率",
            "PerHour": "平均/h",
            "Total" : "總計",
            "plzInputPlanName": "請輸入方案名稱",
            "planDefaultName": "自定義",
            "deleteSavedWarning_1": "是否要刪除這個名為",
            "deleteSavedWarning_2": "的配置？",
            "Saved_alert": "導入的數據有問題！",
            "config_alert": "這將會覆蓋現有所有的數據，是否要繼續？",
        }
    }
};
var CAN_LOCALSTORAGE_WORK;

function checkLocalStorageWork() {
    CAN_LOCALSTORAGE_WORK = _localStorageWorks();
    if (CAN_LOCALSTORAGE_WORK !== true) {
        CAN_LOCALSTORAGE_WORK = false;
        document.getElementById("localstorageWarning").style.display = "none";
        document.getElementById("neverShowAgain_description").style.display = "none";
    }
    else
        document.getElementById("localstorageDoesNotWork").style.display = "none";
}
function _localStorageWorks() {
    try {
        localStorage.setItem("test_Dlz3bH", "KwNYPCpyH7yl2S1K");
        var result = localStorage.getItem("test_Dlz3bH") == "KwNYPCpyH7yl2S1K";
        localStorage.removeItem("test_Dlz3bH");
        return result;
    } catch (ex) {}
}

function storageSetItem(Key, Value) {
    if (CAN_LOCALSTORAGE_WORK) {
        var storageValue = JSON.stringify(Value);
        localStorage.setItem(Key, storageValue);
    }
}

function storageGetItem(Key) {
    if (CAN_LOCALSTORAGE_WORK) {
        var storageValue = localStorage.getItem(Key);
        if (storageValue === null)
            return "noStorage";
        else
            return JSON.parse(storageValue);
    }
    else
        return "noStorage";
}

function setPageByLocalStorage() {
    LS_setDescription();
    LS_setLocalstorageWarning();
    LS_setHTMLtab();
    LS_setPerHourOrTotal();
    LS_setTabAnytimeCustom();
    LS_setTabTimetableCustom();
    LS_setGreatSuccessRate();
    LS_setGreatSuccessRateUP();
    LS_setSelectChapter();
    LS_setContractWeight();
    LS_setTarget();
    LS_setSaved();
    LS_setSavedOrMissionsShow();
}

function LS_setDescription(display = storageGetItem("Description_Display")) {
    if (display === false)
        document.getElementById("description").style.display = "none";
}

function LS_setLocalstorageWarning(display = storageGetItem("LocalstorageWarning_Display")) {
    if (display === false)
        document.getElementById("localstorageWarning").style.display = "none";
}

function LS_setHTMLtab(htmltab = storageGetItem("HTML_TAB")) {
    if (htmltab === "Timetable") {
        IS_ChangeTabByJS = true;
        ChangeTab(htmltab);
    }
    else {
        IS_ChangeTabByJS = true;
        ChangeTab("Anytime");
    }
}

function LS_setPerHourOrTotal(PerHourOrTotal = storageGetItem("PerHourOrTotal")) {
    if (PerHourOrTotal === "PerHour") {
        storageSetItem("PerHourOrTotal", "PerHour");
        TABLE_CALCULATE_TOTAL_TIME = 60;
        document.getElementById("Display_PerHour").checked = true;
    }
    else {
        storageSetItem("PerHourOrTotal", "Total");
        var ShownTab = getShownTab();
        ShownTab.setTime();
        TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
        document.getElementById("Display_Total").checked = true;
    }
}

function LS_setTabAnytimeCustom(Custom = storageGetItem("TabAnytimeCustom")) {
    if (Custom !== "noStorage") {
        var Tab = new Tab_Anytime;
        Tab.ApplySaved_Custom(Custom);
    }
}

function LS_setTabTimetableCustom(Custom = storageGetItem("TabTimetableCustom")) {
    if (Custom !== "noStorage") {
        var Tab = new Tab_Timetable;
        Tab.ApplySaved_Custom(Custom);
    }
}

function LS_setGreatSuccessRate(Rate = storageGetItem("GreatSuccessRate")) {
    if (Rate !== "noStorage")
        Input_setGreatSuccessRate(Rate);
}

function LS_setGreatSuccessRateUP(is_UP = storageGetItem("is_GreatSuccessRateUP")) {
    if (is_UP !== "noStorage")
        Input_setGreatSuccessUpRate(is_UP, false);
}

function LS_setSelectChapter(Chapter = storageGetItem("SelectChapter")) {
    if (Chapter !== "noStorage")
        Input_setSelectChapter(Chapter);
}

function LS_setContractWeight(Weight = storageGetItem("ContractWeight")) {
    if (Weight !== "noStorage")
        Input_setContractWeight(Weight);
}

function LS_setTarget(Target = storageGetItem("TargetValue")) {
    if (Target !== "noStorage")
        Input_setTarget(Target);
}

function LS_setSaved(Saved = storageGetItem("SAVED")) {
    if (Saved !== "noStorage")
        Saved_importAndCover_SAVED(Saved);
}

function LS_setSavedOrMissionsShow(IsSavedShow = storageGetItem("IsSavedShow")) {
    if (IsSavedShow === true) {
        if (SAVED.length === 0)
            storageSetItem("IsSavedShow", false);
        else {
            document.getElementById("MissionTable_panel").style.transition = "none";
            document.getElementById("Saved").style.transition = "none";
            $("#Saved").collapse('show');
            $("#MissionTable_panel").collapse('hide');
        }
    }
}

//ShownTab-PerHourOrTotal-TabAnytimeCustom-TabTimetableCustom-GreatSuccessRate-GreatSuccessRateUP-SelectChapter-ContractWeight-Target-Saved
function Config_export(){
    var data = [];
    data.push(HTML_TAB);
    if (is_CalculateByHour())
        data.push("PerHour");
    else
        data.push("Total");
    var Tab = new Tab_Anytime;
    data.push(Tab.Saved_Custom());
    Tab = new Tab_Timetable;
    data.push(Tab.Saved_Custom());
    data.push(Input_getGreatSuccessRate());
    data.push(IsGreatSuccessRateUp());
    data.push(Input_getSelectChapter());
    data.push(Input_getContractWeight());
    data.push(Input_getTarget_Correct());
    data.push(SAVED);
    var SHA1 = sha1(JSON.stringify(data));
    var config = {data: [], SHA1: ""};
    config.data = data;
    config.SHA1 = SHA1;
    prompt("export", JSON.stringify(config));
}

function setPageByImport(input) {
    var flag = true;
    if (SAVED.length !== 0)
        flag = confirm(language.JS.config_alert);
    if (flag !== true)
        return;
    try {
        var config = JSON.parse(input);
        var SHA1 = sha1(JSON.stringify(config.data));
        var result = SHA1 === config.SHA1;
    } catch (ex) {}
    if (result) {
        setPageByImport_main(config.data);
    }
    else
        alert(language.JS.Saved_alert);
}

function setPageByImport_main(data) {
    LS_setHTMLtab(data[0]);
    LS_setPerHourOrTotal(data[1]);
    LS_setTabAnytimeCustom(data[2]);
    LS_setTabTimetableCustom(data[3]);
    LS_setGreatSuccessRate(data[4]);
    LS_setGreatSuccessRateUP(data[5]);
    LS_setSelectChapter(data[6]);
    LS_setContractWeight(data[7]);
    LS_setTarget(data[8]);
    LS_setSaved(data[9]);
    setQContract(Input_getTotalGreatSuccessRate());
    MISSION_TABLE_SELECT = [];
    PrintMissionTable();
    PrintPlanDetails();
}
function loadHTML_Target() {
    var HTML = '';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_HG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_SMG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_RF" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_AR" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_MG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_SG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_2221" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-danger"id="setTarget_Clear" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    document.getElementById("setTargetButton").innerHTML = HTML;
    HTML = '';
    var TargetName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    var Target = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    for (var i = 0; i < 4; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_minus_100_'+Target[i]+'"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '<b>&minus;</b></button><button class="btn btn-default"type="button"id="Target_minus_10_'+Target[i]+'"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '&minus;</button></div><input type="number" pattern="\d*" min="0"class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_plus_10_'+Target[i]+'"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-default"type="button"id="Target_plus_100_'+Target[i]+'"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '<b>&plus;</b></button></div></div>';
    }
    for (var i = 4; i < 8; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"id="Target_minus_1_'+Target[i]+'"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '<b>&minus;</b></button><button class="btn btn-default"type="button"id="Target_minus_0.1_'+Target[i]+'"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '&minus;</button></div><input type="number" pattern="\d*" min="0" step="0.01" class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_plus_0.1_'+Target[i]+'"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-default"type="button"id="Target_plus_1_'+Target[i]+'"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '<b>&plus;</b></button></div></div>';
    }
    document.getElementById("setTargetInput").innerHTML = HTML;
}

function loadHTML_language() {
    document.documentElement.lang = language.lang;
    document.title = language.title;
    for (let i in language.HTML) {
        $('#'+i).html(language.HTML[i]);
    }

    //ResultPlan--------
    delete_PlanTable();
    HTML_AllowInput();
    //------------------

    for (let i in language.HTMLJS.placeholder) {
        document.getElementById(i).placeholder = language.HTMLJS.placeholder[i];
    }
    for (let i in language.HTMLJS.title) {
        document.getElementById(i).title = language.HTMLJS.title[i];
    }

    //Timetable
    $("button[id^=Tab_Timetable_range_thumb_]").attr("title", language.HTMLJS.Timetable_deletePoint);

    //Saved------------
    $("button[id^=SavedTable_apply_]").attr("title", language.HTMLJS.SavedTable_apply);
    $("input[id^=SavedTable_name_]").attr("placeholder", language.HTMLJS.SavedTable_name);
    $("button[id^=SavedTable_rename_]").attr("title", language.HTMLJS.SavedTable_rename);
    $("button[id^=SavedTable_up_]").attr("title", language.HTMLJS.SavedTable_up);
    $("button[id^=SavedTable_down_]").attr("title", language.HTMLJS.SavedTable_down);
    $("button[id^=SavedTable_export_]").attr("title", language.HTMLJS.SavedTable_export);
    $("button[id^=SavedTable_delete_]").attr("title", language.HTMLJS.SavedTable_delete);
    //-----------------

    //PlanDetails------
    _PrintPlanDetails_ShownTab();
    _PrintPlanDetails_TotalTime();
    _PrintPlanDetails_GreatSuccessRate();
    $("#PlanDetails_PerHour_title").html(language.JS.PerHour);
    $("#PlanDetails_Total_title").html(language.JS.Total);
    //-----------------

    if (is_CalculateByHour()) {
        $("#Demand").html(language.HTMLJS.Demand_hour);
    }
    else {
        $("#Demand").html(language.HTMLJS.Demand_total);
    }
}
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
    if (document.getElementById("setTargetInput").clientWidth <= 260)
        disableTargetButton();
};

$(window).resize(function () {
    if (document.getElementById("setTargetInput").clientWidth <= 260)
        disableTargetButton();
    else
        enableTargetButton();
})

function disableTargetButton() {
    $("button[id^=Target_plus_10_]").attr("style", "display:none;");
    $("button[id^=Target_plus_0]").attr("style", "display:none;");
    $("button[id^=Target_minus_10_]").attr("style", "display:none;");
    $("button[id^=Target_minus_0]").attr("style", "display:none;");
}
function enableTargetButton() {
    $("button[id^=Target_plus_10_]").attr("style", "padding-right:10px;padding-left:10px;border-radius:0;");
    $("button[id^=Target_plus_0]").attr("style", "padding-right:10px;padding-left:10px;border-radius:0;");
    $("button[id^=Target_minus_10_]").attr("style", "padding-right:10px;padding-left:10px;border-radius:0;");
    $("button[id^=Target_minus_0]").attr("style", "padding-right:10px;padding-left:10px;border-radius:0;");
}

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
                language = languages["zh-TW"];
                storageSetItem("lang", "zh-TW");
                break;
            default:
                language = languages["zh-CN"];
                storageSetItem("lang", "zh-CN");
        }
    }
    else {
        language = languages["zh-CN"];
        storageSetItem("lang", "zh-CN");
    }
}

function changeLanguage(lang) {
    switch(lang) {
        case 'zh-CN':
            storageSetItem("lang", 'zh-CN');
            language = languages["zh-CN"];
            break;
        case 'zh-TW':
            storageSetItem("lang", 'zh-TW');
            language = languages["zh-TW"];
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
    newThumb += 'style="left:' + position + ';" title="' + language.HTMLJS.Timetable_deletePoint + '">';
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
    document.getElementById("GreatSuccessRateUp_text").style.cursor='not-allowed';
    document.getElementById("GreatSuccessRateUp_label").style.cursor='not-allowed';
    $("#ChapterLimit").attr('disabled', "true");
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
    document.getElementById("GreatSuccessRateUp_text").style.cursor='pointer';
    document.getElementById("GreatSuccessRateUp_label").style.cursor='pointer';
    $("#ChapterLimit").removeAttr("disabled");
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
$(function (){
    $('#lang-zh-CN').on('click', function(){changeLanguage('zh-CN');});
    $('#lang-zh-TW').on('click', function(){changeLanguage('zh-TW');});
});

$(function (){
    $("#neverShowAgain_description").on('click', function(){
        storageSetItem("Description_Display", false);
        document.getElementById("description").style.display = "none";
    });
    $("#neverShowAgain_localstorageWarning").on('click', function() {
        storageSetItem("LocalstorageWarning_Display", false);
        document.getElementById("localstorageWarning").style.display = "none";
    });
});

var IS_ChangeTabByJS = false;
$(function (){
    $('[href=#Tab_Anytime]').on("shown.bs.tab", function(){
        if (IS_ChangeTabByJS)
            IS_ChangeTabByJS = false;
        else
            ChangeTab_Anytime();
    });
    $('[href=#Tab_Timetable]').on("shown.bs.tab", function(){
        if (IS_ChangeTabByJS)
            IS_ChangeTabByJS = false;
        else
            ChangeTab_Timetable();
    });
});

$(function (){
    $('input[id^=Display_]').on("click", function(){
        if (is_CalculateByHour())
            changeCalculateOutput_Hour();
        else
            changeCalculateOutput_Total();
    });
    $("#Display_PerHour_text").on("keyup", function(e){
        if (e.which == 13) {
            document.getElementById("Display_PerHour").checked = true;
            changeCalculateOutput_Hour();
        }
    });
    $("#Display_Total_text").on("keyup", function(e){
        if (e.which == 13) {
            document.getElementById("Display_Total").checked = true;
            changeCalculateOutput_Total();
        }
    });
});

$(function (){
    $("#GreatSuccessRate").on('input propertychange',function() {
        const Rate = Input_getGreatSuccessRate();
        const is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP, false);
        const TotalRate = Rate + Input_getGreatSuccessUpRate(Rate);
        setQContract(TotalRate);
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#GreatSuccessRate").blur(function() {
        const Rate = Input_getGreatSuccessRate();
        storageSetItem("GreatSuccessRate", Rate);
    });
    $('#GreatSuccessRateUp').on('click', function() {
        const is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP);
        const TotalRate = Input_getTotalGreatSuccessRate(true);
        setQContract(TotalRate);
        PrintMissionTable();
        PrintPlanDetails();
        storageSetItem("is_GreatSuccessRateUP", is_RateUP);
    });
});

$(function() {
    $("#ChapterLimit").on('change', function() {
        PrintMissionTable();
        PrintPlanDetails();
        storageSetItem("SelectChapter", Input_getSelectChapter());
    });
});

//Tab_Anytime
$(function() {
    $("#Time_Anytime_hours").on('input propertychange', function() {
        if (!is_CalculateByHour()) {
            const TotalTime = Input_getAnytimeTotalTime();
            TABLE_CALCULATE_TOTAL_TIME = TotalTime;
        }
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Time_Anytime_hours").blur(function () {Tab_Anytime_changeStorageCustom();});
    $("#Time_Anytime_minutes").on('input propertychange', function() {
        if (!is_CalculateByHour()) {
            const TotalTime = Input_getAnytimeTotalTime();
            TABLE_CALCULATE_TOTAL_TIME = TotalTime;
        }
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Time_Anytime_minutes").blur(function () {Tab_Anytime_changeStorageCustom();});
    $("#Tab_Anytime_MinimumIntervalTime_minutes").on('input propertychange', function() {
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Tab_Anytime_MinimumIntervalTime_minutes").blur(function () {Tab_Anytime_changeStorageCustom();});
});
function Tab_Anytime_changeStorageCustom() {
    let tab = new Tab_Anytime;
    storageSetItem("TabAnytimeCustom", tab.Saved_Custom());
}

//Tab_Timetable
$(function() {
    $("#Time_Timetable_hours").on('input propertychange',function() {_Tab_Timetable_changeMaxTime();});
    $("#Time_Timetable_hours").blur(function() {Tab_Timetable_changeStorageCustom();});
    $("#Time_Timetable_minutes").on('input propertychange',function() {_Tab_Timetable_changeMaxTime();});
    $("#Time_Timetable_minutes").blur(function() {Tab_Timetable_changeStorageCustom();});
    $("#Tab_Timetable_new_hours").keyup(function(e) {
        if (e.which == 13)
            $("#Tab_Timetable_new_minutes").focus();
    });
    $("#Tab_Timetable_new_minutes").keyup(function(e) {
        if (e.which == 13) {
            if ($("#Tab_Timetable_new_hours").val() !== "")
                $("#Tab_Timetable_new_hours").focus();
            Tab_Timetable_AddNew();
        }
    });
    $('#Tab_Timetable_AddNewTimePoint').on('click', function() {Tab_Timetable_AddNew();});
    $("#Tab_Timetable_range").on('click', 'button[id^=Tab_Timetable_range_thumb_]', function() {
        var time = parseFloat(stringSliceFromLast_(this.id));
        Tab_Timetable_DeleteThisTimePoint(time);
        PrintMissionTable();
        PrintPlanDetails();
        Tab_Timetable_changeStorageCustom();
    });
    $('#tab_Timetable_deleteall').on('click', function() {
        Tab_Timetable_DeleteAllTimePoint();
        PrintMissionTable();
        PrintPlanDetails();
        Tab_Timetable_changeStorageCustom();
    });
});
function _Tab_Timetable_changeMaxTime() {
    const TotalTime = Input_getTimetableTotalTime();
    Input_setTimetableTotalTime(TotalTime);
    if (!is_CalculateByHour()) {
        TABLE_CALCULATE_TOTAL_TIME = TotalTime;
    }
    PrintMissionTable();
    PrintPlanDetails();
}
function Tab_Timetable_changeStorageCustom() {
    let Tab = new Tab_Timetable;
    storageSetItem("TabTimetableCustom", Tab.Saved_Custom());
}
function Tab_Timetable_AddNew() {
    const newTime = Input_getTimetableNewTotalTime_Correct();
    const TotalTime = Input_getTimetableTotalTime();
    switch (true) {
        case newTime === 0:
            alert(language.JS.tab_Timetable_alert1);
            break;
        case newTime > TotalTime:
            alert(language.JS.tab_Timetable_alert2);
            break;
        case newTime === TotalTime || Tab_Timetable_TIMELIST.indexOf(newTime) !== -1:
            alert(language.JS.tab_Timetable_alert3);
            break;
        default:
            Tab_Timetable_AddNewTimePoint(newTime);
    }
    if (Tab_Timetable_TIMELIST.length === 0)
        Tab_Timetable_InputTotalTime_enable();
    else
        Tab_Timetable_InputTotalTime_disable();
    PrintMissionTable();
    PrintPlanDetails();
    Tab_Timetable_changeStorageCustom();
}

$(function() {
    $("#ContractWeight").change(function() {
        storageSetItem("ContractWeight", Input_getContractWeight());
    });
});

$(function() {
    $("#target").on('click', 'button[id^=setTarget_]', function() {
        setTarget(stringSliceFromLast_(this.id));
    });
    $("#target").on('click', 'button[id^=Target_minus_]', function() {ChangeTarget(this.id);});
    $("#target").on('click', 'button[id^=Target_plus_]', function() {ChangeTarget(this.id);});
});

$(function() {
    $("#target").on('blur', "#MT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#MT", function(e) {
        if (e.which == 13)
            $("#AT").focus();
    });
    $("#target").on('blur', "#AT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#AT", function(e) {
        if (e.which == 13)
            $("#RT").focus();
    });
    $("#target").on('blur', "#RT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#RT", function(e) {
        if (e.which == 13)
            $("#PT").focus();
    });
    $("#target").on('blur', "#PT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#PT", function(e) {
        if (e.which == 13)
            $("#TT").focus();
    });
    $("#target").on('blur', "#TT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#TT", function(e) {
        if (e.which == 13)
            $("#ET").focus();
    });
    $("#target").on('blur', "#ET", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#ET", function(e) {
        if (e.which == 13)
            $("#QPT").focus();
    });
    $("#target").on('blur', "#QPT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#QPT", function(e) {
        if (e.which == 13)
            $("#QRT").focus();
    });
    $("#target").on('blur', "#QRT", function() {TargetChangeStorage();});
});
function TargetChangeStorage() {
    storageSetItem("TargetValue", Input_getTarget_Correct());
}

$(function() {
    $('#start_sorting').on('click', function() {start_sorting_main();});
    $("#clear_sorting").on('click', function() {
        delete_PlanTable();
        HTML_AllowInput();
    });
});

$(function() {
    $("#Plan_Table").on('shown.bs.collapse', '#FineTuningTool', function() {
        if (!IsMobile())
            document.getElementById("FineTuningTool").style.transition = "";
    });
});

//排序结果点击
$(function() {
    $("#Plan_Table").on('click', 'tr[id^=print_result_plan_tr_]', function() {
        _PlanSort(this);
    });
    $("#Plan_Table").on('keyup', 'tr[id^=print_result_plan_tr_]', function(e) {
        if (e.which == 13)
            _PlanSort(this);
    });
});
function _PlanSort(elem) {
    const number = parseInt(stringSliceFromLast_(elem.id));
    if (elem.className != "success") {
        for (let i = 0; i < RESULT_PLAN.length; i++) {
            document.getElementById("print_result_plan_tr_" + i).className = "";
        }
        elem.className = "success";
        MissionTable_resultPlan_select(number);
    }
    else
        elem.className = "";
}

//对排序结果某一项排序
$(function() {
    $("#Plan_Table").on('click', '#resultPlan_Mission', function() {
        RESULT_PLAN_SORT_BY = "Ranking";
        resultPlan_sortByColumn(0, "ascending");
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Mission', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Ranking";
            resultPlan_sortByColumn(0, "ascending");
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Manp', function() {
        RESULT_PLAN_SORT_BY = "Manp";
        resultPlan_sortByColumn(5);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Manp', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Manp";
            resultPlan_sortByColumn(5);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Ammu', function() {
        RESULT_PLAN_SORT_BY = "Ammu";
        resultPlan_sortByColumn(6);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Ammu', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Ammu";
            resultPlan_sortByColumn(6);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Rati', function() {
        RESULT_PLAN_SORT_BY = "Rati";
        resultPlan_sortByColumn(7);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Rati', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Rati";
            resultPlan_sortByColumn(7);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Part', function() {
        RESULT_PLAN_SORT_BY = "Part";
        resultPlan_sortByColumn(8);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Part', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Part";
            resultPlan_sortByColumn(8);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_TPro', function() {
        RESULT_PLAN_SORT_BY = "TPro";
        resultPlan_sortByColumn(9);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_TPro', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "TPro";
            resultPlan_sortByColumn(9);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Equi', function() {
        RESULT_PLAN_SORT_BY = "Equi";
        resultPlan_sortByColumn(10);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Equi', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Equi";
            resultPlan_sortByColumn(10);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_QPro', function() {
        RESULT_PLAN_SORT_BY = "QPro";
        resultPlan_sortByColumn(11);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_QPro', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "QPro";
            resultPlan_sortByColumn(11);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_QRes', function() {
        RESULT_PLAN_SORT_BY = "QRes";
        resultPlan_sortByColumn(12);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_QRes', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "QRes";
            resultPlan_sortByColumn(12);
        }
    });
});

$(function () {
    $("#Plan_Table").on('click', 'button[id^=FineTuning_minus_]', function() {FineTuning(-1, stringSliceFromLast_(this.id));});
    $("#Plan_Table").on('click', 'button[id^=FineTuning_plus_]', function() {FineTuning(1, stringSliceFromLast_(this.id));});
});

$(function() {
    $("#Saved_heading").on('keyup', function(e) {
        if (e.which == 13) {
            if ($("#Saved_heading").attr("aria-expanded") === "false") {
                $("#MissionTable_panel").collapse('hide');
                $("#Saved").collapse('show');
            }
            else
            $("#Saved").collapse('hide');
        }
    });
    $("#Saved_heading").on('click', function() {
        if ($("#Saved_heading").attr("aria-expanded") === "false") {
            $("#MissionTable_panel").collapse('hide');
            $("#Saved").collapse('show');
        }
        else
        $("#Saved").collapse('hide');
    });
    $("#importSaved_importButton").on('click', function() {
        const input = $("#importSaved_input").val();
        Saved_import(input);
        $("#importSaved_input").val("");
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_apply_]', function() {Saved_apply(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('input propertychange', 'input[id^=SavedTable_name_]', function() {Saved_rename(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('keyup', 'input[id^=SavedTable_name_]', function(e) {
        const key = e.which;
        if (key == 13) {
            const id = "#" + this.id;
            $(id).attr('readOnly', true);
        }
    });
    $("#Saved_Body").on('blur', 'input[id^=SavedTable_name_]', function() {
        const id = "#" + this.id;
        $(id).attr('readOnly', true);
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_rename_]', function() {
        const Row = parseInt(stringSliceFromLast_(this.id));
        const name_elem_id = "#SavedTable_name_" + Row;
        $(name_elem_id).attr('readOnly', false);
        $(name_elem_id).focus();
        $(name_elem_id).select();
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_up_]', function() {Saved_upThisRow(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_down_]', function() {Saved_downThisRow(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_export_]', function() {Saved_export(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_delete_]', function() {Saved_deleteThisRow(parseInt(stringSliceFromLast_(this.id)));});
});

$(function() {
    $("#MissionTable_heading").on('keyup', function(e) {
        if (e.which == 13) {
            if ($("#MissionTable_panel").attr("aria-expanded") === "false") {
                $("#MissionTable_panel").collapse('show');
                $("#Saved").collapse('hide');
            }
            else
                $("#MissionTable_panel").collapse('hide');
        }
    });
    $("#MissionTable_heading").on('click', function() {
        if ($("#MissionTable_panel").attr("aria-expanded") === "false") {
            $("#MissionTable_panel").collapse('show');
            $("#Saved").collapse('hide');
        }
        else
            $("#MissionTable_panel").collapse('hide');
    });
    $("#MissionTable_head_Mission").on('click', function() {
        quick_sort_expand_ascending(MISSION_TABLE, 12);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Mission").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_ascending(MISSION_TABLE, 12);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Manp").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 1);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Manp").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 1);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Ammu").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 2);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Ammu").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 2);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Rati").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 3);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Rati").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 3);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Part").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 4);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Part").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 4);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_TPro").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 5);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_TPro").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 5);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Equi").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 6);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Equi").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 6);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_QPro").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 7);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_QPro").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 7);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_QRes").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 8);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_QRes").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 8);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Time").on('click', function() {
        quick_sort_expand_ascending(MISSION_TABLE, 9);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Time").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_ascending(MISSION_TABLE, 9);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_panel").on('click', 'tr[id^=MissionTable_]', function() {MissionTable_clickThisRow(this);});
    $("#MissionTable_panel").on('keyup', 'tr[id^=MissionTable_]', function(e) {
        if (e.which == 13)
            MissionTable_clickThisRow(this);
    });
});
function MissionTable_clickThisRow(elem) {
    const number = parseInt(stringSliceFromLast_(elem.id));
    if (elem.className === "success")
        MissionTable_cancelSelectThisRow(number);
    else
        MissionTable_selectThisRow(number);
}

$(function() {
    $("#MissionTable_panel").on('shown.bs.collapse', function() {
        storageSetItem("IsSavedShow", false);
    });
    $("#MissionTable_panel").on('hidden.bs.collapse', function() {
        if (!IsMobile())
            document.getElementById("MissionTable_panel").style.transition = "";
    });
    $("#Saved").on('shown.bs.collapse', function() {
        storageSetItem("IsSavedShow", true);
        if (!IsMobile())
            document.getElementById("Saved").style.transition = "";
    });
});

$(function() {
    $("#savePlan").on('click', function() {saveThisPlan();});
});

$(function() {
    $("#Capture").on('click', function() {
        html2canvas(document.getElementById("PlanDetails"), {logging:false,scale:1}).then(function(canvas) {
            let link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'Capture.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});

$(function() {
    $("#Config_export").on('click', function() {Config_export();});
    $("#Config_importButton").on('click', function() {
        const input = $("#Config_importInput").val();
        setPageByImport(input);
        $("#Config_importInput").val("");
    });
});
//后勤战役编号-人力 弹药 口粮 零件 人形 装备 快建 快修 时间(hour)
//The Logistics Support Number-Manpower-Ammunition-Rations-Parts-
//T_Doll Production Contract-Equipment Development Contract-
//Quick Production Contract-Quick Restoration Contract-Time(minute)
let Q = [
    ["0-1",  0,    145,   145,   0,     0, 0, 0, 0, 50],
    ["0-2",  550,  0,     0,     350,   0, 0, 0, 0, 180],
    ["0-3",  900,  900,   900,   250,   0, 0, 0, 0, 720],
    ["0-4",  0,    1200,  800,   750,   0, 0, 0, 0, 1440],
    ["1-1",  10,   30,    15,    0,     0, 0, 0, 0, 15],
    ["1-2",  0,    40,    60,    0,     0, 0, 0, 0, 30],
    ["1-3",  30,   0,     30,    10,    0, 0, 0, 0, 60],
    ["1-4",  160,  160,   0,     0,     0, 0, 0, 0, 120],
    ["2-1",  100,  0,     0,     30,    0, 0, 0, 0, 40],
    ["2-2",  60,   200,   80,    0,     0, 0, 0, 0, 90],
    ["2-3",  10,   10,    10,    230,   0, 0, 0, 0, 240],
    ["2-4",  0,    250,   600,   60,    0, 0, 0, 0, 360],
    ["3-1",  50,   0,     75,    0,     0, 0, 0, 0, 20],
    ["3-2",  0,    120,   70,    30,    0, 0, 0, 0, 45],
    ["3-3",  0,    300,   0,     0,     0, 0, 0, 0, 90],
    ["3-4",  0,    0,     300,   300,   0, 0, 0, 0, 300],
    ["4-1",  0,    185,   185,   0,     0, 0, 0, 0, 60],
    ["4-2",  0,    0,     0,     210,   0, 0, 0, 0, 120],
    ["4-3",  800,  550,   0,     0,     0, 0, 0, 0, 360],
    ["4-4",  400,  400,   400,   150,   0, 0, 0, 0, 480],
    ["5-1",  0,    0,     100,   45,    0, 0, 0, 0, 30],
    ["5-2",  0,    600,   300,   0,     0, 0, 0, 0, 150],
    ["5-3",  800,  400,   400,   0,     0, 0, 0, 0, 240],
    ["5-4",  100,  0,     0,     700,   0, 0, 0, 0, 420],
    ["6-1",  300,  300,   0,     100,   0, 0, 0, 0, 120],
    ["6-2",  0,    200,   550,   100,   0, 0, 0, 0, 180],
    ["6-3",  0,    0,     200,   500,   0, 0, 0, 0, 300],
    ["6-4",  800,  800,   800,   0,     0, 0, 0, 0, 720],
    ["7-1",  650,  0,     650,   0,     0, 0, 0, 0, 150],
    ["7-2",  0,    650,   0,     300,   0, 0, 0, 0, 240],
    ["7-3",  900,  600,   600,   0,     0, 0, 0, 0, 330],
    ["7-4",  250,  250,   250,   600,   0, 0, 0, 0, 480],
    ["8-1",  150,  150,   150,   0,     0, 0, 0, 0, 60],
    ["8-2",  0,    0,     0,     450,   0, 0, 0, 0, 180],
    ["8-3",  400,  800,   800,   0,     0, 0, 0, 0, 360],
    ["8-4",  1500, 400,   400,   100,   0, 0, 0, 0, 540],
    ["9-1",  0,    0,     100,   50,    0, 0, 0, 0, 30],
    ["9-2",  180,  0,     180,   100,   0, 0, 0, 0, 90],
    ["9-3",  750,  750,   0,     0,     0, 0, 0, 0, 270],
    ["9-4",  500,  900,   900,   0,     0, 0, 0, 0, 420],
    ["10-1", 140,  200,   0,     0,     0, 0, 0, 0, 40],
    ["10-2", 0,    240,   180,   0,     0, 0, 0, 0, 100],
    ["10-3", 0,    480,   480,   300,   0, 0, 0, 0, 320],
    ["10-4", 660,  660,   660,   330,   0, 0, 0, 0, 600],
    ["11-1", 350,  1050,  0,     0,     0, 0, 0, 0, 240],
    ["11-2", 360,  540,   540,   0,     0, 0, 0, 0, 240],
    ["11-3", 0,    750,   1500,  250,   0, 0, 0, 0, 480],
    ["11-4", 0,    1650,  0,     900,   0, 0, 0, 0, 600],
    ["12-1", 0,    220,   220,   0,     0, 0, 0, 0, 60],
    ["12-2", 360,  0,     0,     120,   0, 0, 0, 0, 90],
    ["12-3", 800,  1200,  1200,  0,     0, 0, 0, 0, 540],
    ["12-4", 1800, 0,     1800,  0,     0, 0, 0, 0, 720]
];

function setQContract(TotalGreatSuccessRate) {
    const TotalRate = TotalGreatSuccessRate / 100;
    //人形契约 T-Doll Production Contract
    Q[1][5] = calculateContractValue(50, 50, TotalRate);//0-2
    Q[7][5] = calculateContractValue(20, 20, TotalRate);//1-4
    Q[11][5] = calculateContractValue(80, 80, TotalRate);//2-4
    Q[15][5] = calculateContractValue(40, 80, TotalRate);//???//3-4
    Q[18][5] = 0.7;//4-3
    Q[23][5] = calculateContractValue(40, 40, TotalRate);//5-4
    Q[29][5] = 0.6;//7-2
    Q[35][5] = calculateContractValue(90, 90, TotalRate);//???//8-4
    Q[38][5] = calculateContractValue(70, 70, TotalRate);//???//9-3
    Q[41][5] = 0.75;//10-2
    Q[44][5] = 8 / 16;//???//11-1
    Q[45][5] = 12 / 12;//???//11-2
    Q[51][5] = 12 / 12;//???//12-4
    //装备契约 Equipment Development Contract
    Q[2][6] = calculateContractValue(40, 80, TotalRate);//0-3
    Q[15][6] = calculateContractValue(40, 80, TotalRate);//???//3-4
    Q[16][6] = calculateContractValue(20, 20, TotalRate);//4-1
    Q[22][6] = calculateContractValue(50, 50, TotalRate);//5-3
    Q[26][6] = calculateContractValue(60, 60, TotalRate);//6-3
    Q[30][6] = calculateContractValue(70, 70, TotalRate);//7-3
    Q[32][6] = calculateContractValue(40, 40, TotalRate);//8-1
    Q[39][6] = 1;//9-4
    Q[43][6] = calculateContractValue(50, 50, TotalRate);//???//10-4 (12 / 10) 60%
    Q[44][6] = 8 / 16;//???//11-1
    Q[48][6] = calculateContractValue(60, 60, TotalRate);//12-1 (42 / 7) 60%GreatSuccessRate
    //快建 Quick Production Contract
    Q[0][7] = calculateContractValue(20, 70, TotalRate);//0-1
    Q[10][7] = 0.5;//2-3
    Q[14][7] = calculateContractValue(40, 85, TotalRate);//3-3
    Q[17][7] = calculateContractValue(50, 50, TotalRate);//4-2
    Q[19][7] = 1;//4-4
    Q[25][7] = calculateContractValue(20, 70, TotalRate);//???//6-2
    Q[31][7] = calculateContractValue(80, 80, TotalRate);//???//7-4
    Q[34][7] = calculateContractValue(60, 90, TotalRate);//???//8-3
    Q[37][7] = calculateContractValue(25, 25, TotalRate);//9-2
    Q[41][7] = 0.25;//10-2
    Q[42][7] = calculateContractValue(30, 80, TotalRate);//???//10-3
    Q[47][7] = 1;//???//11-4
    Q[50][7] = 12 / 12;//???//12-3
    //快修 Quick Restoration Contract
    Q[0][8] = calculateContractValue(50, 70, TotalRate);//0-1
    Q[2][8] = calculateContractValue(40, 80, TotalRate);//0-3
    Q[6][8] = calculateContractValue(60, 60, TotalRate);//1-3
    Q[9][8] = calculateContractValue(30, 30, TotalRate);//2-2
    Q[10][8] = 0.5;//2-3
    Q[14][8] = calculateContractValue(45, 85, TotalRate);//3-3
    Q[18][8] = 0.3;//4-3
    Q[21][8] = calculateContractValue(80, 80, TotalRate);//5-2
    Q[25][8] = calculateContractValue(50, 70, TotalRate);//6-2
    Q[29][8] = 0.4;//7-2
    Q[33][8] = calculateContractValue(80, 80, TotalRate);//8-2
    Q[34][8] = calculateContractValue(30, 90, TotalRate);//???//8-3
    Q[42][8] = calculateContractValue(50, 80, TotalRate);//???//10-3
    Q[46][8] = calculateContractValue(50, 50, TotalRate);//???//11-3 (10 / 7) 60%
}
function calculateContractValue(BaseValue, SumValue, TotalRate) {
    return BaseValue / 100 + (BaseValue / SumValue - BaseValue / 100) * TotalRate;
}
class Tab {
    constructor() {
        this._title = '<thead><tr><th style="text-align: center;width:20%;" colspan="4" tabindex="0" id="resultPlan_Mission">'+ language.JS.Mission +'</th>';
        this._titleEnd = '</tr></thead>';
        this.Qvalid = [];
    }

    setTime() {}

    setValidQAndReturnLengthAndSetCurrentMax() {}
    _setCurrentMax() {
        var CurrentValueMax = new Array(8);
        for (var i = 0; i < 8; i++) {
            var CurrentValueMax_0 = new Array(this.Qvalid.length);
            for (var ii = 0; ii < this.Qvalid.length; ii++) {
                CurrentValueMax_0[ii] = this.Qvalid[ii][i + 1];
            }
            quick_sort_descending(CurrentValueMax_0);
            CurrentValueMax[i] = CurrentValueMax_0[0] + CurrentValueMax_0[1] + CurrentValueMax_0[2] + CurrentValueMax_0[3];
        }
        this.CurrentValue_MAX = CurrentValueMax;
    }

    normalizedQValid() {
        for (var i = 0; i < this.Qvalid.length; i++) {
            for (var ii = 0; ii < 8; ii++) {
                if (this.CurrentValue_MAX[ii] != 0) {
                    this.Qvalid[i][ii + 1] /= this.CurrentValue_MAX[ii];
                }
            }
        }
    }

    _getUnableLogistic() {
        var Unable_0 = _setUnableLogistic();
        var Unable_1 = this._setUnableLogisticCustomize(Unable_0);
        return Unable_1;
    }
    _setUnableLogisticCustomize(UnableLogistic) { //排除超时后勤
        for (var i = 0; i < Q.length; i++) {
            if (Q[i][9] > this.TotalTime) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    Calculate_Current(Number) {
        var CurrentValue = new Array(8);
        var Qvalid = this.Qvalid;
        for (var i = 0; i < 8; i++) {
            CurrentValue[i] = Qvalid[Number[0]][i + 1] + Qvalid[Number[1]][i + 1] + Qvalid[Number[2]][i + 1] + Qvalid[Number[3]][i + 1];
        }
        return CurrentValue;
    }

    PrintPlanTableTitle() {}

    PrintTableCustomize(plan, row) {
        return "";
    }

    Saved_Custom() {
        return [];
    }

    ApplySaved_Custom(Saved_Custom) {}
}
function _setUnableLogistic() {
    var UnableMap;
    switch (Input_getSelectChapter()) {
        case 6:
            UnableMap = ["7-1","7-2","7-3","7-4","8-1","8-2","8-3","8-4","9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 7:
            UnableMap = ["8-1","8-2","8-3","8-4","9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 8:
            UnableMap = ["9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 9:
            UnableMap = ["10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 10:
            UnableMap = ["11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 11:
            UnableMap = ["12-1","12-2","12-3","12-4"]; break;
        case 12:
            UnableMap = []; break;
        default:
            UnableMap = [];
    }
    var UnableNumber = [];
    for (var i = 0; i < Q.length; i++) {
        if (UnableMap.indexOf(Q[i][0]) != -1) UnableNumber.push(i);
    }
    return UnableNumber;
}

class Tab_Anytime extends Tab {
    setTime(NeedCorrection = true) {
        this.TotalTime = Input_getAnytimeTotalTime(NeedCorrection);
        if (NeedCorrection) {
            if (this.TotalTime === 0) {
                alert(language.JS.tab_Anytime_alert1);
                HTML_AllowInput();
                throw"--";
            }
        }
        this.MinimumIntervalTime = Input_getAnytimeMinimumIntervalTime(NeedCorrection);
    }

    setValidQAndReturnLengthAndSetCurrentMax() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) == -1) {
                var newrow = [];
                newrow.push(Q[i][0]);
                var times = 0;
                while((++times + 1) * Q[i][9] <= this.TotalTime);
                for (var ii = 1; ii < 9; ii++) {
                    newrow.push(Q[i][ii] * times / this.TotalTime);
                }
                newrow.push(Q[i][9]);
                var CollectTimetable = [];
                for (var ii = 1; ii <= times; ii++) {
                    CollectTimetable.push(Q[i][9] * ii);
                }
                newrow.push(CollectTimetable);
                //用于储存该方案的价值， 以减少下一次计算的总方案个数
                newrow.push(0);
                this.Qvalid.push(newrow);
            }
        }
        //为优化后面计算最小间隔时间做准备
        quick_sort_expand_ascending(this.Qvalid, 9);
        this._setCurrentMax();
        return this.Qvalid.length;
    }
    _setUnableLogisticCustomize(UnableLogistic) {
        for (var i = 0; i < Q.length; i++) {
            if (Q[i][9] > this.TotalTime || Q[i][9] < this.MinimumIntervalTime) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    Calculate_Current(Number) {
        var Qvalid = this.Qvalid;
        if (this.MinimumIntervalTime) {
            var Time = [Qvalid[Number[0]][9], Qvalid[Number[1]][9], Qvalid[Number[2]][9], Qvalid[Number[3]][9]];
            var IntervalTime_1 = Math.min((Time[1] - Time[0])===0?this.MinimumIntervalTime:Time[1] - Time[0], (Time[2] - Time[1])===0?this.MinimumIntervalTime:Time[2] - Time[1], (Time[3] - Time[2])===0?this.MinimumIntervalTime:Time[3] - Time[2]);
            if (IntervalTime_1 < this.MinimumIntervalTime) {
                return [-1, -1, -1, -1, -1, -1, -1, -1];
            }
            var NumberTime = [this.Qvalid[Number[0]][10], this.Qvalid[Number[1]][10], this.Qvalid[Number[2]][10], this.Qvalid[Number[3]][10]];
            var IntervalTime = this._calculateIntervalTimeMin(NumberTime);
            if (IntervalTime < this.MinimumIntervalTime) {
                return [-1, -1, -1, -1, -1, -1, -1, -1];
            }
        }
        var CurrentValue = new Array(8);
        for (var i = 0; i < 8; i++) {
            CurrentValue[i] = Qvalid[Number[0]][i + 1] + Qvalid[Number[1]][i + 1] + Qvalid[Number[2]][i + 1] + Qvalid[Number[3]][i + 1];
        }
        return CurrentValue;
    }
    _calculateIntervalTimeMin(NumberTime_Arr) {
        var CollectTimetable_0 = NumberTime_Arr;
        var A = [CollectTimetable_0[0].length - 1, CollectTimetable_0[1].length - 1, CollectTimetable_0[2].length - 1, CollectTimetable_0[3].length - 1];
        for (var i = 0; i < 3; i++) {
            if (CollectTimetable_0[i][0] == CollectTimetable_0[i + 1][0]) {
                A[i + 1] = -1;
            }
        }
        if (CollectTimetable_0[3][0] % CollectTimetable_0[2][0] === 0) {
            A[3] = -1;
        }
        else if (CollectTimetable_0[3][0] % CollectTimetable_0[1][0] === 0) {
            A[3] = -1;
        }
        else if (CollectTimetable_0[3][0] % CollectTimetable_0[0][0] === 0) {
            A[3] = -1;
        }
        if (CollectTimetable_0[2][0] % CollectTimetable_0[1][0] === 0) {
            A[2] = -1;
        }
        else if (CollectTimetable_0[2][0] % CollectTimetable_0[0][0] === 0) {
            A[2] = -1;
        }
        if (CollectTimetable_0[1][0] % CollectTimetable_0[0][0] === 0) {
            A[1] = -1;
        }
        var IntervalTime = CollectTimetable_0[0][0];
        var maxTime = 999999999;
        while(A[0] !== -1) {
            var a = 0;
            var b = 0;
            while(++b < 4) {
                if (A[b] !== -1) {
                    if (CollectTimetable_0[a][A[a]] < CollectTimetable_0[b][A[b]]) {
                        a = b;
                    }
                    else if (CollectTimetable_0[a][A[a]] === CollectTimetable_0[b][A[b]]) {
                        A[b]--;
                    }
                }
            }
            var maxValue = CollectTimetable_0[a][A[a]];
            A[a]--;
            IntervalTime = Math.min(IntervalTime, maxTime - maxValue);
            maxTime = maxValue;
        }
        return IntervalTime;
    }

    PrintPlanTableTitle() {
        var title;
        if (is_CalculateByHour()) {
            title = this._title + '<th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Manp">'+language.JS.Manp+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Ammu">'+language.JS.Ammu+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Rati">'+language.JS.Rati+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Part">'+language.JS.Part+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_TPro">'+language.JS.TPro+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Equi">'+language.JS.Equi+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_QPro">'+language.JS.QPro+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_QRes">'+language.JS.QRes+'/h</th><th style="text-align: center;width:8.88%;">'+language.JS.MinIntervalTime+'</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Manp">'+language.JS.Manp+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Ammu">'+language.JS.Ammu+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Rati">'+language.JS.Rati+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Part">'+language.JS.Part+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_TPro">'+language.JS.TPro+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Equi">'+language.JS.Equi+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_QPro">'+language.JS.QPro+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_QRes">'+language.JS.QRes+'</th><th style="text-align: center;width:8.88%;">'+language.JS.MinIntervalTime+'</th>' + this._titleEnd;
        }
        return title;
    }

    PrintTableCustomize(plan, row) {
        var tab = [];
        var Number = [plan.List[row][0], plan.List[row][1], plan.List[row][2], plan.List[row][3]];
        var NumberTime = [this.Qvalid[Number[0]][10], this.Qvalid[Number[1]][10], this.Qvalid[Number[2]][10], this.Qvalid[Number[3]][10]];
        tab.push(this._calculateIntervalTimeMin(NumberTime) + "m");
        return tab;
    }

    Saved_Custom() {
        var Saved_Custom = [];
        var TotalTime = Input_getAnytimeTotalTime();
        Saved_Custom.push(TotalTime);
        var MinimumIntervalTime = Input_getAnytimeMinimumIntervalTime();
        Saved_Custom.push(MinimumIntervalTime);
        return Saved_Custom;
    }

    ApplySaved_Custom(Saved_Custom) {
        var TotalTime = Saved_Custom[0];
        var MinimumIntervalTime = Saved_Custom[1];
        Input_setAnytimeTotalTime(TotalTime);
        Input_setAnytimeMinimumIntervalTime(MinimumIntervalTime);
        storageSetItem("TabAnytimeCustom", Saved_Custom);
    }
}

class Tab_Timetable extends Tab {
    constructor() {
        super();
        this.Qvalid = [];
        this.TimeList = [];
    }

    setTime(NeedCorrection = true) {
        this.TimeList = Tab_Timetable_TIMELIST.slice().sort(sortNumber);
        this.TimeList.unshift(0);
        this.TotalTime = Input_getTimetableTotalTime(NeedCorrection);
        if (NeedCorrection) {
            if (this.TotalTime === 0) {
                alert(language.JS.tab_Timetable_alert4);
                HTML_AllowInput();
                throw"--";
            }
        }
        this.TimeList.push(this.TotalTime);
    }

    setValidQAndReturnLengthAndSetCurrentMax() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) === -1) {
                var newrow = [];
                newrow.push(Q[i][0]);
                var times = 0;
                var CollectTimetable = [];
                var ii0 = 0;
                for (var ii = 1; ii < this.TimeList.length; ii++) {
                    if (Q[i][9] <= this.TimeList[ii] - this.TimeList[ii0]) {
                        times++;
                        CollectTimetable.push(this.TimeList[ii0] + Q[i][9]);
                        ii0 = ii;
                    }
                }
                for (var ii = 1; ii < 9; ii++) {
                    newrow.push(Q[i][ii] * times / this.TotalTime);
                }
                newrow.push(Q[i][9]);
                newrow.push(CollectTimetable);
                //用于储存该方案的价值， 以减少下一次计算的总方案个数
                newrow.push(0);
                this.Qvalid.push(newrow);
            }
        }
        this._setCurrentMax();
        return this.Qvalid.length;
    }

    PrintPlanTableTitle() {
        var title;
        if (is_CalculateByHour()) {
            title = this._title + '<th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Manp">'+language.JS.Manp+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Ammu">'+language.JS.Ammu+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Rati">'+language.JS.Rati+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Part">'+language.JS.Part+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_TPro">'+language.JS.TPro+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Equi">'+language.JS.Equi+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_QPro">'+language.JS.QPro+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_QRes">'+language.JS.QRes+'/h</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Manp">'+language.JS.Manp+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Ammu">'+language.JS.Ammu+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Rati">'+language.JS.Rati+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Part">'+language.JS.Part+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_TPro">'+language.JS.TPro+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Equi">'+language.JS.Equi+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_QPro">'+language.JS.QPro+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_QRes">'+language.JS.QRes+'</th>' + this._titleEnd;
        }
        return title;
    }

    Saved_Custom() {
        var Saved_Custom = [];
        var TotalTime = Input_getTimetableTotalTime();
        Saved_Custom.push(TotalTime);
        var Timetable = Tab_Timetable_TIMELIST.slice();
        Saved_Custom.push(Timetable);
        return Saved_Custom;
    }

    ApplySaved_Custom(Saved_Custom) {
        var TotalTime = Saved_Custom[0];
        Input_setTimetableTotalTime(TotalTime);
        var Timetable = Saved_Custom[1];
        Input_setTimetableTimetable(Timetable);
        storageSetItem("TabTimetableCustom", Saved_Custom);
    }
}
function sortNumber(a, b) {
    return a - b;
}
class Plan {
    constructor(ShownTab, List_length, Target_Value) {
        this._setResourceIncreasingRate();
        this._setList(List_length);
        this.ShownTab = ShownTab;
        this.CurrentValue_MAX = ShownTab.CurrentValue_MAX;
        if (Target_Value === undefined) {
            this.TargetValue_html = Input_getTarget_Correct(); 
            this.TargetValue = this._CorrectTargetValue();
        }
        else {
            this.TargetValue = Target_Value;
            this.TargetValue_half = this.TargetValue.slice();
            for (var i = 0; i < 8; i++) {
                this.TargetValue_half[i] = this.TargetValue_half[i] * 0.5;
            }
        }
        this._Norm_Target = this._getNorm(this.TargetValue);
    }
    _setResourceIncreasingRate() {
        var TotalRate = Input_getTotalGreatSuccessRate(true);
        this.ResourceIncreasingRate = 1 + (TotalRate) / 200;
    }
    _setList(length) {
        this.List = new Array(length);
        for (var i = 0; i < length; i++) {
            this.List[i] = new Array(12);
            this.List[i].Value = 0;//该方案价值
        }
    }
    _CorrectTargetValue() {
        var ResourceValue = this._CorrectResourceValue();
        var ContractValue = this._CorrectContractValue();
        var TargetValue = ResourceValue.concat(ContractValue);
        if (TargetValue.toString() == "0,0,0,0,0,0,0,0") {
            alert(language.JS.TargetValue0_alert);
            HTML_AllowInput();
            throw"--";
        }
        return TargetValue;
    }
    _CorrectResourceValue() {
        var ResourceValue = this.TargetValue_html.slice(0, 4);
        var Resource_CalibrationValue = 100 - Input_getContractWeight();
        if (this._ValuesNotAll0(ResourceValue)) {
            this._CorrectValue(ResourceValue, Resource_CalibrationValue);
        }
        return ResourceValue;
    }
    _CorrectContractValue() {
        var ContractValue = this.TargetValue_html.slice(4, 8);
        var Contract_CalibrationValue = Input_getContractWeight();
        if (this._ValuesNotAll0(ContractValue)) {
            this._CorrectValue(ContractValue, Contract_CalibrationValue);
        }
        return ContractValue;
    }
    _ValuesNotAll0(Values) {
        for (var i = 0; i < Values.length; i++) {
            if (Values[i] != 0) return true;
        }
        return false;
    }
    _CorrectValue(Values, CalibrationValue) {
        var CorrectionRate = CalibrationValue / ArrayMax(Values);
        for (var i = 0; i < Values.length; i++) {
            Values[i] *= CorrectionRate;
        }
    }

	_getNorm(vector) {
		var norm;
		var SumOfSquares = 0;
		for (var i = 0; i < vector.length; i++) {
			SumOfSquares += Math.pow(vector[i], 2);
		}
        norm = Math.pow(SumOfSquares, 0.5);
        return norm;
    }
    
    CalculateAndPush_Standardization_And_CalculateMissionsValue(MissionsNumber) {
        this._CurrentValue = this.ShownTab.Calculate_Current(MissionsNumber);
        if (this._CurrentValue[0] === -1) {
            return;
        }
        this._MissionsNumber = MissionsNumber;
        this._PlanValue = this._calculateValue();
        this.ShownTab.Qvalid[MissionsNumber[0]][11] += this._PlanValue;
        this.ShownTab.Qvalid[MissionsNumber[1]][11] += this._PlanValue;
        this.ShownTab.Qvalid[MissionsNumber[2]][11] += this._PlanValue;
        this.ShownTab.Qvalid[MissionsNumber[3]][11] += this._PlanValue;
        if (!(0 in this.List[this.List.length - 1])) {
            this._push_FirstEmptyRow();
        }
        else this._push();
    }

    CalculateAndPush_Standardization(MissionsNumber) {
        this._CurrentValue = this.ShownTab.Calculate_Current(MissionsNumber);
        if (this._CurrentValue[0] === -1) {
            return;
        }
        this._MissionsNumber = MissionsNumber;
        this._PlanValue = this._calculateValue();
        if (!(0 in this.List[this.List.length - 1])) {
            this._push_FirstEmptyRow();
        }
        else this._push();
    }
    CalculateAndPush(MissionsNumber) {
        this._CurrentValue = this.ShownTab.Calculate_Current(MissionsNumber);
        if (this._CurrentValue[0] === -1) {
            return;
        }
        for (var i = 0; i < 8; i++) {
            if (this._CurrentValue[i] < this.TargetValue_half[i])
                return;
        }
        this._MissionsNumber = MissionsNumber;
        this._PlanValue = this._calculateValue_2();
        if (!(0 in this.List[this.List.length - 1])) {
            this._push_FirstEmptyRow();
        }
        else this._push();
    }
    _push_FirstEmptyRow() {
        var row = this.List.length - 1;
        while (row != 0 && !(0 in this.List[row - 1])) row--;
        this._PushIntoThisRow(row);
        this._SortListByValue(row);
    }
    _push() {
        if (!this._thisPlanIsBetterThan(this.List.length - 1)) {
            return;
        }
        this._PushIntoThisRow(this.List.length - 1);
        this._SortListByValue(this.List.length - 1);
    }
    _PushIntoThisRow(RowNumber) {
        this.List[RowNumber] = this._MissionsNumber.concat(this._CurrentValue);
        this.List[RowNumber].Value = this._PlanValue;
    }
    _SortListByValue(thisrow) {
        for (var i = thisrow - 1; i >= 0; i--) {
            if (this._thisPlanIsBetterThan(i)) {
                this._ExchangeTheseTwoRows(i);
            }
            else {
                break;
            }
        }
    }
    _ExchangeTheseTwoRows(RowNumber) {
        this.List[RowNumber + 1] = this.List[RowNumber].slice();
        this.List[RowNumber + 1].Value = this.List[RowNumber].Value;
        this._PushIntoThisRow(RowNumber);
    }
    _thisPlanIsBetterThan(number) {
        if (this._PlanValue > this.List[number].Value)
            return true;
        else
            return false;
    }

    _calculateValue() {
        var CurrentValue = [0, 0, 0, 0, 0, 0, 0, 0];
        var TargetValue = this.TargetValue;
        var _CurrentValue = this._CurrentValue;
        if (TargetValue[0] !== 0)
            CurrentValue[0] = _CurrentValue[0];
        if (TargetValue[1] !== 0)
            CurrentValue[1] = _CurrentValue[1];
        if (TargetValue[2] !== 0)
            CurrentValue[2] = _CurrentValue[2];
        if (TargetValue[3] !== 0)
            CurrentValue[3] = _CurrentValue[3];
        if (TargetValue[4] !== 0)
            CurrentValue[4] = _CurrentValue[4] * 500;
        if (TargetValue[5] !== 0)
            CurrentValue[5] = _CurrentValue[5] * 500;
        if (TargetValue[6] !== 0)
            CurrentValue[6] = _CurrentValue[6] * 500;
        if (TargetValue[7] !== 0)
            CurrentValue[7] = _CurrentValue[7] * 500;
        var Norm_Current = this._getNorm(CurrentValue);
        if (Norm_Current === 0)
            return 0;
        var Dot_product = this._getDotProduct(CurrentValue, this.TargetValue);
        var CurrentScalarProjection = Dot_product / this._Norm_Target;
        var COStheta = Math.min(1, CurrentScalarProjection / Norm_Current);
        var theta = Math.acos(COStheta);
        var CosineSimilarity_0 = 1 - 2 * theta / Math.PI;
        var CosineSimilarity = Math.pow(CosineSimilarity_0, 2);
        return CurrentScalarProjection * CosineSimilarity;
    }
    _getDotProduct(vector1, vector2) {
        if (vector1.length !== vector2.length) throw"getDotProduct error";
        var Dot_product = 0;
        for (var i = 0; i < vector1.length; i++) {
            Dot_product += (vector1[i] * vector2[i]);
        }
        return Dot_product;
    }

    _calculateValue_2() {
        return Value2(this.TargetValue, this._CurrentValue);
    }

    print(fineTuningExpanded, SortBy = "Ranking") {
        if (!(0 in this.List[0])) {
            var Table = document.getElementById("Plan_Table");
            Table.innerHTML = language.JS.NoPlan;
            RESULT_PLAN = [];
            throw"--";
        }
        var result_plan = [];
        for (var i = 0; i < this.List.length; i++) {
            if (!(0 in this.List[i])) break;
            var one_plan = [];
            one_plan.push(i);
            var MissionsNumber = new Array(4);
            for (var ii = 0; ii < 4; ii++) {
                MissionsNumber[ii] = this.ShownTab.Qvalid[this.List[i][ii]][0];
            }
            MissionsNumber = MissionsNumber.sort(sortStringNumber);
            for (var ii = 0; ii < 4; ii++) {
                one_plan.push(MissionsNumber[ii]);
            }
            for (var ii = 0; ii < 4; ii++) {
                one_plan.push(this.List[i][ii + 4] * this.ResourceIncreasingRate * this.CurrentValue_MAX[ii]);
            }
            for (var ii = 4; ii < 8; ii++) {
                one_plan.push(this.List[i][ii + 4] * this.CurrentValue_MAX[ii]);
            }
            var customPrint = this.ShownTab.PrintTableCustomize(this, i);
            for (var ii = 0; ii < customPrint.length; ii++) {
                one_plan.push(customPrint[ii]);
            }
            result_plan.push(one_plan);
        }
        var Minutes;
        if (is_CalculateByHour())
            Minutes = 60;
        else
            Minutes = this.ShownTab.TotalTime;

        switch(SortBy) {
            case "Ranking":
                RESULT_PLAN_SORT_BY = "Ranking";
                break;
            case "Manp":
                quick_sort_expand_descending(result_plan, 5);
                RESULT_PLAN_SORT_BY = "Manp";
                break;
            case "Ammu":
                quick_sort_expand_descending(result_plan, 6);
                RESULT_PLAN_SORT_BY = "Ammu";
                break;
            case "Rati":
                quick_sort_expand_descending(result_plan, 7);
                RESULT_PLAN_SORT_BY = "Rati";
                break;
            case "Part":
                quick_sort_expand_descending(result_plan, 8);
                RESULT_PLAN_SORT_BY = "Part";
                break;
            case "TPro":
                quick_sort_expand_descending(result_plan, 9);
                RESULT_PLAN_SORT_BY = "TPro";
                break;
            case "Equi":
                quick_sort_expand_descending(result_plan, 10);
                RESULT_PLAN_SORT_BY = "Equi";
                break;
            case "QPro":
                quick_sort_expand_descending(result_plan, 11);
                RESULT_PLAN_SORT_BY = "QPro";
                break;
            case "QRes":
                quick_sort_expand_descending(result_plan, 12);
                RESULT_PLAN_SORT_BY = "QRes";
                break;
        }
        RESULT_PLAN = result_plan;
        print_result_plan(fineTuningExpanded, result_plan, Minutes);
    }
}

function sortStringNumber(a, b) {
    var aa, bb;
    aa = parseInt(a.replace(/[^0-9]/ig,""));
    bb = parseInt(b.replace(/[^0-9]/ig,""));
    return aa - bb;
}

function print_result_plan(fineTuningExpanded, result_plan, Minutes) {
    var focusedElementID = document.activeElement.id;
    var Table = document.getElementById("Plan_Table");
    var tab = getHTMLFineTuningTool();
    tab += '<div class="table-responsive">';
    tab += '<table class="table table-striped table-hover table-responsive text-nowrap" style="margin-bottom: 0px; cursor: default;">';
    var ShownTab = getShownTab();
    tab += (ShownTab.PrintPlanTableTitle() + '<tbody>');
    var is_selected;
    var selectedMissions;
    if (MISSION_TABLE_SELECT.length === 4) {
        is_selected = true;
        selectedMissions = MISSION_TABLE_SELECT.slice();
        selectedMissions.sort(sortStringNumber);
    }
    else
        is_selected = false;
    for (var i = 0; i < result_plan.length; i++) {
        if (is_selected) {
            if (result_plan[i][1] === selectedMissions[0] && result_plan[i][2] === selectedMissions[1] && result_plan[i][3] === selectedMissions[2] && result_plan[i][4] === selectedMissions[3])
                tab += "<tr tabindex='0' id='print_result_plan_tr_" + i + "' class='success'>";
            else
                tab += "<tr tabindex='0' id='print_result_plan_tr_" + i + "'>";
        }
        else
            tab += "<tr tabindex='0' id='print_result_plan_tr_" + i + "'>";
        for (var ii = 0; ii < 4; ii++) {
            tab += "<td style='text-align: center'>";
            tab += "" + result_plan[i][ii + 1];
            tab += "</td>";
        }
        for (var ii = 4; ii < 8; ii++) {
            tab += "<td style='text-align: center'>";
            tab += "" + Math.round(result_plan[i][ii + 1] * Minutes * 10) / 10;
            tab += "</td>";
        }
        for (var ii = 8; ii < 12; ii++) {
            tab += "<td style='text-align: center'>";
            tab += "" + Math.round(result_plan[i][ii + 1] * Minutes * 100) / 100;
            tab += "</td>";
        }
        var one_plan_length = result_plan[0].length;
        for (var ii = 13; ii < one_plan_length; ii++) {
            tab += "<td style='text-align: center'>";
            tab += result_plan[i][ii];
            tab += "</td>";
        }
        tab += "</tr>";
    }
    tab += '</tbody>';
    Table.innerHTML = tab;
    if (fineTuningExpanded) {
        document.getElementById("FineTuningTool").style.transition = "none";
        $("#FineTuningTool").collapse("show");
    }
    if (IsMobile())
        document.getElementById("FineTuningTool").style.transition = "none";
    document.getElementById("start_sorting_html").style.display = "none";
    if (focusedElementID !== "")
        document.getElementById(focusedElementID).focus();
}
let RESULT_PLAN = [];
let RESULT_PLAN_SORT_BY = "";
let TABLE_CALCULATE_TOTAL_TIME;

function start_sorting_main() {
    HTML_DisableInput();
    var ShownTab = getShownTab();
    ShownTab.setTime();
    var Q_Valid_length = ShownTab.setValidQAndReturnLengthAndSetCurrentMax();
    //调整目标值, 标准化归一化
    //----------
    var plan = new Plan(ShownTab, 8);
    if (Q_Valid_length > 38) {
        for (var n1 = 0; n1 < (Q_Valid_length - 3); n1++) {
            for (var n2 = n1 + 1; n2 < (Q_Valid_length - 2); n2++) {
                for (var n3 = n2 + 1; n3 < (Q_Valid_length - 1); n3++) {
                    for (var n4 = n3 + 1; n4 < Q_Valid_length; n4++) {
                        plan.CalculateAndPush_Standardization_And_CalculateMissionsValue([n1, n2, n3, n4]);
                    }
                }
            }
        }
        var Q_valid_backup = new Array(Q_Valid_length);
        for (var i = 0; i < Q_Valid_length; i++) {
            Q_valid_backup[i] = [i, ShownTab.Qvalid[i][11]];
        }
        quick_sort_expand_descending(Q_valid_backup, 1);
        Q_valid_backup.splice(0, 38);
        quick_sort_expand_descending(Q_valid_backup, 0);
        for (var i = 0; i < Q_valid_backup.length; i++) {
            ShownTab.Qvalid.splice(Q_valid_backup[i][0], 1);
            Q_Valid_length--;
        }
    }
    else {
        for (var n1 = 0; n1 < (Q_Valid_length - 3); n1++) {
            for (var n2 = n1 + 1; n2 < (Q_Valid_length - 2); n2++) {
                for (var n3 = n2 + 1; n3 < (Q_Valid_length - 1); n3++) {
                    for (var n4 = n3 + 1; n4 < Q_Valid_length; n4++) {
                        plan.CalculateAndPush_Standardization([n1, n2, n3, n4]);
                    }
                }
            }
        }
    }
    var TargetValue = CorrectTargetValueByPlanList(plan);
    for (var i = 0; i < 8; i++) {
        TargetValue[i] /= ShownTab.CurrentValue_MAX[i];
    }
    //----------
    setFineTuning_TargetValue(TargetValue);
    setFineTuning_ShownTab(ShownTab);
    ShownTab.normalizedQValid();
    plan = new Plan(ShownTab, 16, TargetValue);
    for (var n1 = 0; n1 < (Q_Valid_length - 3); n1++) {
        for (var n2 = n1 + 1; n2 < (Q_Valid_length - 2); n2++) {
            for (var n3 = n2 + 1; n3 < (Q_Valid_length - 1); n3++) {
                for (var n4 = n3 + 1; n4 < Q_Valid_length; n4++) {
                    plan.CalculateAndPush([n1, n2, n3, n4]);
                }
            }
        }
    }
    plan.print(false);
}

function getShownTab() {
    var ShownTab;
    switch (HTML_TAB) {
        case "Anytime":
            ShownTab = new Tab_Anytime;
            break;
        case "Timetable":
            ShownTab = new Tab_Timetable;
            break;
    }
    return ShownTab;
}

function CorrectTargetValueByPlanList(plan) {
    var TargetValue = getTargetByList(plan.List);
    var Target_Resource = TargetValue.slice(0, 4);
    Target_Resource.class = "Resource";
    var Target_Contract = TargetValue.slice(4, 8);
    Target_Contract.class = "Contract";
    var Resource_CalibrationValue = getCalibration(Target_Resource, plan);
    var Contract_CalibrationValue = getCalibration(Target_Contract, plan);
    for (var i = 0; i < 4; i++) {
        if (Resource_CalibrationValue != 0)
            TargetValue[i] = plan.TargetValue_html[i] / Resource_CalibrationValue;
        else
            TargetValue[i] = 0;
    }
    for (var i = 4; i < 8; i++) {
        if (Contract_CalibrationValue != 0)
            TargetValue[i] = plan.TargetValue_html[i] / Contract_CalibrationValue;
        else
            TargetValue[i] = 0;
    }
    return TargetValue;
}
function getTargetByList(List) {
    var TargetValue = new Array(8);
    TargetValue.fill(0);
    var validlength = new Array(8);
    validlength.fill(List.length);
    for (var i = 0; i < 8; i++) {
        for (var ii = 0; ii < List.length; ii++) {
            TargetValue[i] += List[ii][i + 4];
            if (List[ii][i + 4] == 0)
                validlength[i]--;
        }
    }
    for (var i = 0; i < 8; i++) {
        if (validlength[i] == 0)
            TargetValue[i] = 0;
        else
            TargetValue[i] /= validlength[i];
    }
    return TargetValue;
}
function getCalibration(Target_0, plan) {
    var Target_0_html = getTarget0html(Target_0.class, plan);
    var Current_0_MAX = getCurrent0MAX(Target_0.class, plan);
    var Calibration = 0;
    var validlength = Target_0.length;
    for (let i = 0; i < Target_0.length; i++) {
        if (Target_0[i] !== 0) {
            Calibration += (Target_0_html[i] / Target_0[i]);
            if (Target_0_html[i] === 0)
                validlength--;
        }
        else
            validlength--;
    }
    if (Calibration !== 0)
        Calibration /= validlength;
    else {
        var Current_0_AMAX = 0;
        var validlength = Target_0.length;
        for (var i = 0; i < Target_0.length; i++) {
            if (Current_0_MAX[i] !== 0)
                Current_0_AMAX += Current_0_MAX[i];
            else
                validlength--;
        }
        if (validlength === 0)
            Current_0_AMAX = 0;
        else
            Current_0_AMAX /= validlength;
        var Target_0_html_MAX = ArrayMax(Target_0_html);
        Calibration = Target_0_html_MAX / Current_0_AMAX;
    }
    return Calibration;
}
function getTarget0html(Target0class, plan) {
    var Target_0_html = new Array(4);
    if (Target0class === "Resource")
        Target_0_html = plan.TargetValue_html.slice(0, 4);
    else
        Target_0_html = plan.TargetValue_html.slice(4, 8);
    return Target_0_html;
}
function getCurrent0MAX(Target0class, plan) {
    var Current_0_MAX = new Array(4);
    if (Target0class === "Resource")
        Current_0_MAX = plan.CurrentValue_MAX.slice(0, 4);
    else
        Current_0_MAX = plan.CurrentValue_MAX.slice(4, 8);
    return Current_0_MAX;
}

function ArrayMax(Arr) {
    let max = 0;
    for (let i = 0; i < Arr.length; i++)
        max = Math.max(max, Arr[i]);
    return max;
}

//有问题
function Value2(TargetValue, CurrentValue) {
    var Value = 0;
    var minval = 99999999999;
    for (var i = 0; i < 8; i++) {
        if (TargetValue[i] != 0)
            minval = Math.min(minval, CurrentValue[i] / TargetValue[i]);
    }
    for (var i = 0; i < 8; i++) {
        Value += Value_2(TargetValue[i], CurrentValue[i], minval);
    }
    return Value;
}
function Value_2(Target, Current, minval) {
    if (Target === 0)
        return 0;
    return Math.min(Current, 1.5 * Target * minval) + 0.5 * (Math.min(Current, Target) - Math.min(Current, 1.5 * Target * minval));
}
let FineTuning_TargetValue_Original = new Array(8);
let FineTuning_TargetValue = new Array(8);
function setFineTuning_TargetValue(TargetValue) {
    for (let i = 0; i < 8; i++) {
        FineTuning_TargetValue_Original[i] = TargetValue[i];
        FineTuning_TargetValue[i] = TargetValue[i];
    }
}

let FineTuning_ShownTab;
function setFineTuning_ShownTab(ShownTab) {
    FineTuning_ShownTab = ShownTab;
}

function getHTMLFineTuningTool() {
    const TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    const lang = language.JS;
    const TargetHTMLText = [lang.Manp, lang.Ammu, lang.Rati, lang.Part, lang.TPro, lang.Equi, lang.QPro, lang.QRes];
    let HTML = '<div class="panel panel-default" style="margin-bottom:5px">';
    HTML += '<div class="panel-heading">';
    HTML += '<h4 class="panel-title"><a data-toggle="collapse" href="#FineTuningTool" class="collapsed">' + lang.FineTuningTool + '</a></h4></div>';
    HTML += '<div id="FineTuningTool" class="panel-collapse collapse">';
    HTML += '<div class="panel-body">';
    for (let i = 0; i < 8; i++) {
        if (i === 0)
            HTML += '<div class="col-lg-6 col-md-6 col-sm-6">';
        if (i === 4)
            HTML += '</div> <div class="col-lg-6 col-md-6 col-sm-6">';
        HTML += '<div class="form-group input-group" style="margin-bottom: 10px;">';
        HTML += '<span class="input-group-addon" id="FineTuningTool_' + TargetName[i] + '">' + TargetHTMLText[i] + '</span>';
        HTML += '<div class="input-group-btn">';
        HTML += '<button class="btn btn-default col-lg-6 col-md-6 col-sm-6 col-xs-6" type="button" id="FineTuning_minus_' + TargetName[i] + '"';
        if (FineTuning_TargetValue_Original[i] === 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 50 <= 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 50 < FineTuning_TargetValue_Original[i] * 0.9)
            HTML += 'disabled="disabled"';
        HTML += 'title="' + language.HTMLJS.FineTuning_minus + '"><b>-</b></button>';
        HTML += '<button class="btn btn-default col-lg-6 col-md-6 col-sm-6 col-xs-6" type="button" id="FineTuning_plus_' + TargetName[i] + '"';
        if (FineTuning_TargetValue_Original[i] === 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] + FineTuning_TargetValue_Original[i] / 50 >= 1)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 50 > FineTuning_TargetValue_Original[i] * 1.14)
            HTML += 'disabled="disabled"';
        HTML += 'title="' + language.HTMLJS.FineTuning_plus + '"><b>+</b></button>';
        HTML += '</div></div>';
    }
    HTML += '</div></div></div></div>';
    return HTML;
}

function FineTuning(Operator, ID) {
    const TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    const IDNumber = TargetName.indexOf(ID);
    if (Operator === -1) {
        FineTuning_TargetValue[IDNumber] -= FineTuning_TargetValue_Original[IDNumber] / 50;
    }
    else {
        FineTuning_TargetValue[IDNumber] += FineTuning_TargetValue_Original[IDNumber] / 50;
    }
    FineTuning_main();
}

function FineTuning_main() {
    let plan = new Plan(FineTuning_ShownTab, 16, FineTuning_TargetValue);
    const Q_Valid_length = FineTuning_ShownTab.Qvalid.length;
    const n1_max = Q_Valid_length - 3;
    const n2_max = Q_Valid_length - 2;
    const n3_max = Q_Valid_length - 1;
    const n4_max = Q_Valid_length;
    for (let n1 = 0; n1 < n1_max; n1++) {
        for (let n2 = n1 + 1; n2 < n2_max; n2++) {
            for (let n3 = n2 + 1; n3 < n3_max; n3++) {
                for (let n4 = n3 + 1; n4 < n4_max; n4++) {
                    plan.CalculateAndPush([n1, n2, n3, n4]);
                }
            }
        }
    }
    plan.print(true, RESULT_PLAN_SORT_BY); 
}
var MISSION_TABLE = [];
var MISSION_TABLE_SELECT = [];

function PrintMissionTable(NeedCalculate_MISSION_TABLE = true) {
    if (NeedCalculate_MISSION_TABLE)
        MISSION_TABLE = _getMissionTableByShownTab();
    var MissionTable = MISSION_TABLE;
    var time_calculate = TABLE_CALCULATE_TOTAL_TIME;
    var tab = '';
    var MissionTable_length = MissionTable.length;
    var selectMissions = MISSION_TABLE_SELECT.slice();
    for (var i = 0; i < MissionTable_length; i++) {
        tab += '<tr id="MissionTable_' + i + '" tabindex="0"';
        for (var ii = 0; ii < selectMissions.length; ii++) {
            if (selectMissions[ii] === MissionTable[i][0]) {
                selectMissions.splice(ii, 1);
                tab += 'class="success"';
                break;
            }
        }
        tab += '><td style="width: 10%;">' + MissionTable[i][0] + '</td>';
        for (var ii = 1; ii < 9; ii++) {
            tab += '<td style="width: 10%;">' + NumberAutoExact(MissionTable[i][ii] * time_calculate) + '</td>';
        }
        tab += '<td style="width: 10%;">' + TimeFormat(MissionTable[i][9]) + '</td>';
        tab += '<tr>';
    }
    for (var i = 0; i < selectMissions.length; i++) {
        MISSION_TABLE_SELECT.remove_First(selectMissions[i]);
    }
    if (MissionTable_length === 0)
        tab = '<tr><td>' + language.JS.NoMission + '</td></tr>';
    var tbody = document.getElementById("MissionTable_tbody");
    tbody.innerHTML = tab;
}

function _getMissionTableByShownTab() {
    var ShownTab = getShownTab();
    ShownTab.setTime(false);
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
    var TotalRate = Input_getTotalGreatSuccessRate();
    var ResourceIncreasingRate = 1 + (TotalRate) / 200;
    for (var i = 0; i < MissionTable_length; i++) {
        MissionTable[i][1] *= ResourceIncreasingRate;
        MissionTable[i][2] *= ResourceIncreasingRate;
        MissionTable[i][3] *= ResourceIncreasingRate;
        MissionTable[i][4] *= ResourceIncreasingRate;
    }
    return MissionTable;
}

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
    PrintPlanDetails();
    for (var i = 0; i < 4; i++) {
        for (var ii = 0; ii < missionTable_length; ii++) {
            if (missionTable[ii][0] === Missions[i]) {
                document.getElementById("MissionTable_" + ii).className = "success";
                break;
            }
        }
    }
}

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
    PrintPlanDetails();
}

function MissionTable_cancelSelectThisRow(number) {
    var mission = MISSION_TABLE[number][0];
    var index = MISSION_TABLE_SELECT.indexOf(mission);
    MISSION_TABLE_SELECT.splice(index, 1);
    document.getElementById("MissionTable_" + number).className = "";
    PrintPlanDetails();
}
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
        if (HTML_TAB !== "Anytime")
            tab += "<td></td>";
        else
            tab += "<td>" + language.JS.MinIntervalTime + "</td>";
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
        if (HTML_TAB !== "Anytime")
            tab += "<td></td>";
        else {
            var MissionTime = [];
            for (var i = 0; i < MISSION_TABLE_SELECT.length; i++) {
                for (var ii = 0; ii < MISSION_TABLE.length; ii++) {
                    if (MISSION_TABLE_SELECT[i] === MISSION_TABLE[ii][0]) {
                        MissionTime.push(MISSION_TABLE[ii][10])
                        break;
                    }
                }
            }
            quick_sort_expand_ascending(MissionTime, 0);
            for (var i = MissionTime.length; i < 4; i++) {
                MissionTime.push([MissionTime[0][MissionTime[0].length - 1]]);
            }
            var TAB = new Tab_Anytime;
            var MinIntervalTime =  TAB._calculateIntervalTimeMin(MissionTime);
            tab += "<td>" + TimeFormat(MinIntervalTime) + "</td>";
        }
        document.getElementById("PlanDetails_Total").innerHTML = tab;

        print_chart(selectedMissions_table, TotalMinutes);
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
var SAVED = [];

//[名称-计算方式-大成功概率-是否UP-关卡解锁-计算方式的详情-选择的关卡]-md5
function saveThisPlan() {
    var name = prompt(language.JS.plzInputPlanName, language.JS.planDefaultName);
    if (name == null)
        return;
    if (name == "")
        name = language.JS.planDefaultName;
    var GreatSuccessRate = Input_getGreatSuccessRate();
    var is_UP = IsGreatSuccessRateUp();
    var SelectChapter = Input_getSelectChapter();
    var newData = [];
    var ShownTab = getShownTab();
    var Saved_Custom = ShownTab.Saved_Custom();
    var SelectMissions = MISSION_TABLE_SELECT.slice();
    newData.push(name);
    newData.push(HTML_TAB);
    newData.push(GreatSuccessRate);
    newData.push(is_UP);
    newData.push(SelectChapter);
    newData.push(Saved_Custom);
    newData.push(SelectMissions);
    var newSave = {data:[], MD5:""};
    newSave.data = newData;
    newSave.MD5 = md5(JSON.stringify(newData));
    SAVED.push(newSave);
    storageSetItem("SAVED", SAVED);
    PrintSavedThisRow(SAVED.length - 1);
}

function PrintSavedThisRow(Row) {
    if (Row === 0)
        document.getElementById("NoSaved").style.display = "none";
    var HTML = "";
    HTML += '<tr id="SavedTable_row_' + Row + '"';
    HTML += '><td><button type="button" class="btn btn-default"id="SavedTable_apply_' + Row + '" title="' + language.HTMLJS.SavedTable_apply + '" style="background-color: #88E063;">';
    HTML += '<span class="glyphicon glyphicon-ok"style="top: 2px;" /></button></td><td><div class="form-group input-group" style="margin-bottom: 0px;">';
    HTML += '<input type="text" class="form-control" style="min-width: 140px;"id="SavedTable_name_' + Row + '" placeholder="' + language.HTMLJS.SavedTable_name + '"';
    HTML += 'value="' + SAVED[Row].data[0] + '"readonly="readonly">';
    HTML += '<div class="input-group-btn"><button type="button" class="btn btn-default"id="SavedTable_rename_' + Row + '" title="' + language.HTMLJS.SavedTable_rename + '"><span class="glyphicon glyphicon-pencil"style="top: 2px;" /></button></div>';
    HTML += '</div></td>';
    HTML += '<td><div class="btn-group" style="min-width: 80px;"><button type="button" class="btn btn-default"id="SavedTable_up_' + Row + '"" title="' + language.HTMLJS.SavedTable_up + '"';
    if (Row === 0)
        HTML += 'disabled="disabled"';
    HTML += '>';
    HTML += '<span class="glyphicon glyphicon-arrow-up"style="top: 2px;" /></button>';
    HTML += '<button type="button" class="btn btn-default"id="SavedTable_down_' + Row + '" title="' + language.HTMLJS.SavedTable_down + '"';
    if (Row === SAVED.length - 1)
        HTML += 'disabled="disabled"';
    HTML +='><span class="glyphicon glyphicon-arrow-down"style="top: 2px;" /></button></div></td>';
    HTML += '<td><button type="button" class="btn btn-default"id="SavedTable_export_' + Row + '" title="' + language.HTMLJS.SavedTable_export + '"><span class="glyphicon glyphicon-export"style="top: 2px;" /></button></td>';
    HTML += '<td><button type="button" class="btn btn-default"id="SavedTable_delete_' + Row + '" title="' + language.HTMLJS.SavedTable_delete + '" style="background-color: #F48380;"><span class="glyphicon glyphicon-trash"style="top: 2px;" /></button></td></tr>';
    $("#Saved_Body").append(HTML);
    if (Row !== 0)
        $("#SavedTable_down_" + (Row - 1)).removeAttr("disabled");
}

function Saved_apply(Row) {
    var savedData = SAVED[Row].data;
    var htmltab = savedData[1];
    IS_ChangeTabByJS = true;
    ChangeTab(htmltab);
    Input_setGreatSuccessRate(savedData[2]);
    Input_setGreatSuccessUpRate(savedData[3]);
    Input_setSelectChapter(savedData[4]);
    var ShownTab = getShownTab();
    ShownTab.ApplySaved_Custom(savedData[5]);
    MISSION_TABLE_SELECT = savedData[6].slice();
    delete_PlanTable();
    HTML_AllowInput();
    if (!is_CalculateByHour()) {
        ShownTab.setTime(false);
        TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
    }
    PrintMissionTable();
    PrintPlanDetails();
}

function Saved_rename(Row) {
    var elem_id = "#SavedTable_name_" + Row;
    var elem = $(elem_id);
    var newName = elem.val();
    SAVED[Row].data[0] = newName;
    SAVED[Row].MD5 = md5(JSON.stringify(SAVED[Row].data));
    storageSetItem("SAVED", SAVED);
}

function Saved_upThisRow(Row) {
    $("#SavedTable_name_" + Row).val(SAVED[Row - 1].data[0]);
    $("#SavedTable_name_" + (Row - 1)).val(SAVED[Row].data[0]);
    [SAVED[Row], SAVED[Row - 1]] = [SAVED[Row - 1], SAVED[Row]];
    storageSetItem("SAVED", SAVED);
}

function Saved_downThisRow(Row) {
    $("#SavedTable_name_" + Row).val(SAVED[Row + 1].data[0]);
    $("#SavedTable_name_" + (Row + 1)).val(SAVED[Row].data[0]);
    [SAVED[Row], SAVED[Row + 1]] = [SAVED[Row + 1], SAVED[Row]];
    storageSetItem("SAVED", SAVED);
}

function Saved_export(Row) {
    var text = JSON.stringify(SAVED[Row]);
    prompt("export", text);
}

function Saved_deleteThisRow(Row, NeedWarning = true) {
    var flag = true;
    if (NeedWarning) {
        var name = SAVED[Row].data[0];
        var warning = language.JS.deleteSavedWarning_1 + '"' + name + '"' + language.JS.deleteSavedWarning_2;
        var flag = confirm(warning);
    }
    if (flag) {
        for (var i = Row; i < SAVED.length - 1; i++) {
            $("#SavedTable_name_" + i).val(SAVED[i + 1].data[0]);
        }
        var removeElem = document.getElementById("SavedTable_row_" + (SAVED.length - 1));
        document.getElementById("Saved_Body").removeChild(removeElem);
        SAVED.splice(Row, 1);
        storageSetItem("SAVED", SAVED);
        if (SAVED.length !== 0) {
            $("#SavedTable_up_0").attr("disabled", "true");
            $("#SavedTable_down_" + (SAVED.length - 1)).attr("disabled", "true");
        }
        else
            document.getElementById("NoSaved").style.display = "";
    }
}

function Saved_import(input) {
    try {
        var newSaved = JSON.parse(input);
        var MD5 = md5(JSON.stringify(newSaved.data));
        var result = MD5 === newSaved.MD5
    } catch (ex) {}
    if (result) {
        SAVED.push(newSaved);
        storageSetItem("SAVED", SAVED);
        PrintSavedThisRow(SAVED.length - 1);
    }
    else
        alert(language.JS.Saved_alert);
}

function Saved_importAndCover_SAVED(Saved_Arr) {
    while(SAVED.length !== 0)
        Saved_deleteThisRow(0, false);
    for (var i = 0; i < Saved_Arr.length; i++) {
        if (md5(JSON.stringify(Saved_Arr[i].data)) !== Saved_Arr[i].MD5)
            return false;
        SAVED.push(Saved_Arr[i]);
        storageSetItem("SAVED", SAVED);
        PrintSavedThisRow(SAVED.length - 1);
    }
    return true;
}