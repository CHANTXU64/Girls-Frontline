var test = 0;
var test_2 = 0;
var test_3 = 0;
var test_4 = 0;
var test_5 = 0;
$(function() {
$('#start_sorting').on('click', function() {
    test = 0;
    test_2 = 0;
    test_3 = 0;
    test_4 = 0;
    test_5 = 0;
    console.time('total');
    Q_init_Contract();
    var ShownTab = getShownTab();
    ShownTab.setTime();
    var Q_Valid_length = ShownTab.setValidQAndReturnLength();
    var CurrentValue_MAX = getCurrentMax(ShownTab.Qvalid);
    //调整目标值, 标准化归一化
    //----------
    var plan = new Plan(ShownTab, 8, CurrentValue_MAX);
    console.time();
    if (Q_Valid_length > 36) {
        for (var n1 = 0; n1 < (Q_Valid_length - 3); n1++) {
            for (var n2 = n1 + 1; n2 < (Q_Valid_length - 2); n2++) {
                for (var n3 = n2 + 1; n3 < (Q_Valid_length - 1); n3++) {
                    for (var n4 = n3 + 1; n4 < Q_Valid_length; n4++) {
                        plan.CalculateAndPush_Normalization_And_CalculateMissionsValue([n1, n2, n3, n4]);
                    }
                }
            }
        }
        ///////////////////////////////////
        var log2 = new Array(ShownTab.Qvalid.length);
        for (var i = 0; i < ShownTab.Qvalid.length; i++) {
            var log2_0 = new Array(2);
            log2_0[0] = ShownTab.Qvalid[i][0];
            log2_0[1] = ShownTab.Qvalid[i][11];
            log2 [i] = log2_0;
        }
        console.log(log2);
        ///////////////////////////////////
        var Q_valid_backup = new Array(ShownTab.Qvalid.length);
        for (var i = 0; i < ShownTab.Qvalid.length; i++) {
            Q_valid_backup[i] = [i, ShownTab.Qvalid[i][11]];
        }
        quick_sort_expand_descending(Q_valid_backup, 1);
        while (Q_Valid_length > 36) {
            ShownTab.Qvalid.splice(Q_valid_backup[Q_Valid_length - 1][0], 1);
            Q_Valid_length--;
        }
        ///////////////////////////////////
        log2 = new Array(ShownTab.Qvalid.length);
        for (var i = 0; i < ShownTab.Qvalid.length; i++) {
            var log2_0 = new Array(2);
            log2_0[0] = ShownTab.Qvalid[i][0];
            log2_0[1] = ShownTab.Qvalid[i][11];
            log2 [i] = log2_0;
        }
        console.log(log2);
        ///////////////////////////////////
    }
    else {
        for (var n1 = 0; n1 < (Q_Valid_length - 3); n1++) {
            for (var n2 = n1 + 1; n2 < (Q_Valid_length - 2); n2++) {
                for (var n3 = n2 + 1; n3 < (Q_Valid_length - 1); n3++) {
                    for (var n4 = n3 + 1; n4 < Q_Valid_length; n4++) {
                        plan.CalculateAndPush_Normalization([n1, n2, n3, n4]);
                    }
                }
            }
        }
    }
    console.timeEnd();
    console.time();
    var TargetValue = CorrectTargetValueByPlanList(plan);
    ///////////////////////////////////////
    var log1 = new Array(8);
    for (var i = 0; i < 8; i++) {
        log1[i] = TargetValue[i] * 60;
    }
    console.log(log1);
    console.log(plan.List);
    ///////////////////////////////////////
    for (var i = 0; i < 8; i++) {
        TargetValue[i] /= CurrentValue_MAX[i];
    }
    //----------
    plan = new Plan(ShownTab, 16, CurrentValue_MAX, TargetValue);
    for (var i = 0; i < ShownTab.Qvalid.length; i++) {
        for (var ii = 0; ii < 8; ii++) {
            if (CurrentValue_MAX[ii] != 0) 
                ShownTab.Qvalid[i][ii + 1] /= CurrentValue_MAX[ii];
        }
    }
    for (var n1 = 0; n1 < (Q_Valid_length - 3); n1++) {
        for (var n2 = n1 + 1; n2 < (Q_Valid_length - 2); n2++) {
            for (var n3 = n2 + 1; n3 < (Q_Valid_length - 1); n3++) {
                for (var n4 = n3 + 1; n4 < Q_Valid_length; n4++) {
                    plan.CalculateAndPush([n1, n2, n3, n4]);
                }
            }
        }
    }
    plan.print();
    console.timeEnd();
    console.timeEnd('total');
    console.log(test);
    console.log(test_2);
    console.log(test_3);
    console.log(test_4);
    console.log(test_5);
})
})

function getShownTab() {
    var ShownTab;
    switch (HTMLtab) {
        case "Anytime":
            ShownTab = new Tab_Anytime;
            break;
        case "Timetable":
            ShownTab = new Tab_Timetable;
            break;
    }
    return ShownTab;
}

function getCurrentMax(Qvalid) {
    var CurrentValueMax = new Array(8);
    for (var i = 0; i < 8; i++) {
        var CurrentValueMax_0 = new Array(Qvalid.length);
        for (var ii = 0; ii < Qvalid.length; ii++) {
            CurrentValueMax_0[ii] = Qvalid[ii][i + 1];
        }
        quick_sort_descending(CurrentValueMax_0);
        CurrentValueMax[i] = CurrentValueMax_0[0] + CurrentValueMax_0[1] + CurrentValueMax_0[2] + CurrentValueMax_0[3];
    }
    return CurrentValueMax;
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
    for (var i = 0; i < Target_0.length; i++) {
        if (Target_0[i] != 0) {
            Calibration += (Target_0_html[i] / Target_0[i]);
            if (Target_0_html[i] == 0)
                validlength--;
        }
        else
            validlength--;
    }
    if (Calibration != 0)
        Calibration /= validlength;
    else {
        var Current_0_AMAX = 0;
        var validlength = Target_0.length;
        for (var i = 0; i < Target_0.length; i++) {
            if (Current_0_MAX[i] != 0)
                Current_0_AMAX += Current_0_MAX[i];
            else
                validlength--;
        }
        if (validlength == 0)
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
    if (Target0class == "Resource")
        Target_0_html = plan.TargetValue_html.slice(0, 4);
    else
        Target_0_html = plan.TargetValue_html.slice(4, 8);
    return Target_0_html;
}
function getCurrent0MAX(Target0class, plan) {
    var Current_0_MAX = new Array(4);
    if (Target0class == "Resource")
        Current_0_MAX = plan.CurrentValue_MAX.slice(0, 4);
    else
        Current_0_MAX = plan.CurrentValue_MAX.slice(4, 8);
    return Current_0_MAX;
}

function ArrayMax(Arr) {
    var max = 0;
    for (var i = 0; i < Arr.length; i++)
        max = Math.max(max, Arr[i]);
    return max;
}

//有问题
function Value(TargetValue, CurrentValue) {
    var Value = 0;
    for (var i = 0; i < 8; i++) {
        Value += Value_0(TargetValue[i], CurrentValue[i]);
    }
    return Value;
}
function Value_0(Target, Current) {
    if (Target == 0)
        return 0;
    if (Target > Current)//Y=5.5*x^3+4.5*x
        return (Target - Current) * (-5.5 * Math.pow((Target - Current) / Target, 3) - 4.5 * (Target - Current) / Target);
    else//Y=-4*x^3 -x
        return (Target - Current) * (-0.01 * Math.pow((Target - Current) / Target, 3) - 0.3 * (Target - Current) / Target);
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
        //Value += Value_0(TargetValue[i], CurrentValue[i]);
    }
    return Value;
}
function Value_2(Target, Current, minval) {
    if (Target == 0)
        return 0;
    return Math.min(Current, 1.5 * Target * minval) + 0.5 * Math.min(Current, Target) - Math.min(Current, 1.5 * Target * minval);
}