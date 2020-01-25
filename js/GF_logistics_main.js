let RESULT_PLAN = [];
let RESULT_PLAN_SORT_BY = "";
let TABLE_CALCULATE_TOTAL_TIME;

function start_sorting_main() {
    var ShownTab = getShownTab();
    ShownTab.setTime();
    var Q_Valid_length = ShownTab.setValidQAndReturnLengthAndSetCurrentMax();
    //调整目标值, 标准化归一化
    //----------
    var plan = new Plan(ShownTab, 8);
    if (Q_Valid_length > 38) {
        var n1, n2, n3, n4, n1_max = Q_Valid_length - 3, n2_max = Q_Valid_length - 2, n3_max = Q_Valid_length - 1, n4_max = Q_Valid_length;
        for (n1 = 0; n1 < n1_max; n1++) {
            for (n2 = n1 + 1; n2 < n2_max; n2++) {
                for (n3 = n2 + 1; n3 < n3_max; n3++) {
                    for (n4 = n3 + 1; n4 < n4_max; n4++) {
                        plan.CalculateAndPush_Standardization_And_CalculateMissionsValue(n1, n2, n3, n4);
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
        if (HTML_TAB === "Anytime") {
            var Qvalid_Time = [];
            for (var i = 0; i < ShownTab.Qvalid.length; i++) {
                Qvalid_Time.push(ShownTab.Qvalid[i][9]);
            }
            ShownTab.Qvalid_Time = Qvalid_Time;
        }
    }
    else {
        var n1, n2, n3, n4, n1_max = Q_Valid_length - 3, n2_max = Q_Valid_length - 2, n3_max = Q_Valid_length - 1, n4_max = Q_Valid_length;
        for (n1 = 0; n1 < n1_max; n1++) {
            for (n2 = n1 + 1; n2 < n2_max; n2++) {
                for (n3 = n2 + 1; n3 < n3_max; n3++) {
                    for (n4 = n3 + 1; n4 < n4_max; n4++) {
                        plan.CalculateAndPush_Standardization(n1, n2, n3, n4);
                    }
                }
            }
        }
    }
    var TargetValue = CorrectTargetValueByPlanList(plan);
    for (var i = 0; i < 8; i++) {
        TargetValue[i] = Math.min(1, TargetValue[i] / ShownTab.CurrentValue_MAX[i]);
    }
    //----------
    setFineTuning_TargetValue(TargetValue);
    setFineTuning_ShownTab(ShownTab);
    ShownTab.normalizedQValid();
    plan = new Plan(ShownTab, 16, TargetValue);
    var n1, n2, n3, n4, n1_max = Q_Valid_length - 3, n2_max = Q_Valid_length - 2, n3_max = Q_Valid_length - 1, n4_max = Q_Valid_length;
    for (n1 = 0; n1 < n1_max; n1++) {
        for (n2 = n1 + 1; n2 < n2_max; n2++) {
            for (n3 = n2 + 1; n3 < n3_max; n3++) {
                for (n4 = n3 + 1; n4 < n4_max; n4++) {
                    plan.CalculateAndPush(n1, n2, n3, n4);
                }
            }
        }
    }
    HTML_DisableInput();
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