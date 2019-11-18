var ShownTab = new Tab_Anytime;
var Q_Backup = [];
var test = 0;
var test_2 = 0;
var test_3 = 0;

function Get_Plan_Main() {
    test = 0;
    test_2 = 0;
    test_3 = 0;
    Q_init_Contract();
    Q_AdjustTheOrder();
    ShownTab.setTime();
    var UnableLogistic = ShownTab.getUnableLogistic();
    //调整目标值, 标准化归一化
    //----------
    var plan = new Plan(8);
    for (var n1 = 0; n1 < (Q.length - 3); n1++) {
        if (UnableLogistic.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 < (Q.length - 2); n2++) {
            if (UnableLogistic.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 < (Q.length - 1); n3++) {
                if (UnableLogistic.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 < Q.length; n4++) {
                    if (UnableLogistic.indexOf(n4) != -1) continue;
                    plan.CalculateAndPush_Normalization([n1, n2, n3, n4]);
                }
            }
        }
    }
    var TargetValue = CorrectTargetValueByPlanList(plan);
    for (var i = 0; i < 7; i++) {
        TargetValue[i] /= plan.CurrentValue_MAX[i];
    }
    //----------
    test = 0;
    test_2 = 0;
    test_3 = 0;
    plan = new Plan(30, TargetValue, plan.CurrentValue_MAX);
    for (var n1 = 0; n1 < (Q.length - 3); n1++) {
        if (UnableLogistic.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 < (Q.length - 2); n2++) {
            if (UnableLogistic.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 < (Q.length - 1); n3++) {
                if (UnableLogistic.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 < Q.length; n4++) {
                    if (UnableLogistic.indexOf(n4) != -1) continue;
                    plan.CalculateAndPush([n1, n2, n3, n4]);
                }
            }
        }
    }
    plan.print();
    Q_RecoveryOrder();
}

function CorrectTargetValueByPlanList(plan) {
    var TargetValue = getTargetByList(plan.List);
    var Target_Resource = TargetValue.slice(0, 4);
    var Target_Contract = TargetValue.slice(4, 7);
    var Resource_CalibrationValue = getCalibration(Target_Resource, plan);
    var Contract_CalibrationValue = getCalibration(Target_Contract, plan);
    for (var i = 0; i < 4; i++) {
        if (Resource_CalibrationValue != 0) {
            TargetValue[i] = plan.TargetValue_html[i] / Resource_CalibrationValue;
        }
        else {
            TargetValue[i] = 0;
        }
    }
    for (var i = 4; i < 7; i++) {
        if (Contract_CalibrationValue != 0) {
            TargetValue[i] = plan.TargetValue_html[i] / Contract_CalibrationValue;
        }
        else {
            TargetValue[i] = 0;
        }
    }
    return TargetValue;
}
function getTargetByList(List) {
    var TargetValue = new Array(7);
    TargetValue.fill(0);
    var validlength = new Array(7);
    validlength.fill(List.length);
    for (var i = 0; i < 7; i++) {
        for (var ii = 0; ii < List.length; ii++) {
            TargetValue[i] += List[ii][i + 4];
            if (List[ii][i + 4] == 0) {
                validlength[i]--;
            }
        }
    }
    for (var i = 0; i < 7; i++) {
        if (validlength[i] == 0) {
            TargetValue[i] = 0;
        }
        else {
            TargetValue[i] /= validlength[i];
        }
    }
    return TargetValue;
}
function getCalibration(Target_0, plan) {
    var Target_0_html = getTarget0html(Target_0.length, plan);
    var Current_0_MAX = getCurrent0MAX(Target_0.length, plan);
    var Calibration = 0;
    var validlength = Target_0.length;
    for (var i = 0; i < Target_0.length; i++) {
        if (Target_0[i] != 0) {
            Calibration += (Target_0_html[i] / Target_0[i]);
            if (Target_0_html[i] == 0) {
                validlength--;
            }
        }
        else {
            validlength--;
        }
    }
    if (Calibration != 0) {
        Calibration /= validlength;
    }
    else {
        var Current_0_AMAX = 0;
        var validlength = Target_0.length;
        for (var i = 0; i < Target_0.length; i++) {
            if (Current_0_MAX[i] != 0) {
                Current_0_AMAX += Current_0_MAX[i];
            }
            else {
                validlength--;
            }
        }
        if (validlength == 0) {
            Current_0_AMAX = 0;
        }
        else {
            Current_0_AMAX /= validlength;
        }
        var Target_0_html_MAX = ArrayMax(Target_0_html);
        Calibration = Target_0_html_MAX / Current_0_AMAX;
    }
    return Calibration;
}
function getTarget0html(Target0length, plan) {
    var Target_0_html = new Array(Target0length);
    if (Target0length == 4) {
        Target_0_html = plan.TargetValue_html.slice(0, 4);
    }
    else {
        Target_0_html = plan.TargetValue_html.slice(4, 7);
    }
    return Target_0_html;
}
function getCurrent0MAX(Target0length, plan) {
    var Current_0_MAX = new Array(Target0length);
    if (Target0length == 4) {
        Current_0_MAX = plan.CurrentValue_MAX.slice(0, 4);
    }
    else {
        Current_0_MAX = plan.CurrentValue_MAX.slice(4, 7);
    }
    return Current_0_MAX;
}

//为了减少方案之间的比较次数, 优先排出场率高的后勤
function Q_AdjustTheOrder() {
    Q_Backup = Q.slice();
    _AdjustTheOrder();
}
function Q_RecoveryOrder() {
    Q = Q_Backup.slice();
}

function IsGreatSuccessRateUp() {
    if (document.getElementById('GreatSuccessRateUp').checked) return 1;
    else return 0;
}

function CheckDataLegalityAndCorrect_GreatSuccessRate() {
    var Rate = $("#GreatSuccessRate");
    if (is_Non_positive_number(Rate.val()) || Rate.val() < 15) Rate.val(15);
    if (Rate.val() > 60) Rate.val(60);
}

function is_Non_positive_number(x) {
    if (x === "" || isNaN(x) || x < 0 || x === "Infinity") return true;
    else return false;
}

function getPositiveValueFromHTML(HTMLValue) {
    if (Array.isArray(HTMLValue)) return _getPositiveValueFromHTML_array(HTMLValue);
    else return _getPositiveValueFromHTML_one(HTMLValue);
}
function _getPositiveValueFromHTML_one(HTMLNumber) {
    if (is_Non_positive_number(HTMLNumber.val())) HTMLNumber.val(0);
    return parseFloat(HTMLNumber.val());
}
function _getPositiveValueFromHTML_array(HTMLArr) {
    var Arr = new Array(HTMLArr.length);
    for (var i = 0; i < HTMLArr.length; i++) {
        if (is_Non_positive_number(HTMLArr[i].val())) HTMLArr[i].val(0);
        Arr[i] = parseFloat(HTMLArr[i].val());
    }
    return Arr;
}

function ArrayMax(Arr) {
    var max = 0;
    for (var i = 0; i < Arr.length; i++) {
        max = Math.max(max, Arr[i]);
    }
    return max;
}

//有问题
function Value(TargetValue, CurrentValue) {
    return Value_0(TargetValue[0], CurrentValue[0]) + Value_0(TargetValue[1], CurrentValue[1]) +
        Value_0(TargetValue[2], CurrentValue[2]) + Value_0(TargetValue[3], CurrentValue[3] +
        Value_0(TargetValue[4], CurrentValue[4]) + Value_0(TargetValue[5], CurrentValue[5]) + Value_0(TargetValue[6], CurrentValue[6]));
}
function Value_0(Target, Current) {
    if (Target == 0) return 0;
    if (Target > Current) {//Y=5.5*x^3+4.5*x
        return (Target - Current) * (5.5 * Math.pow((Target - Current) / Target, 3) + 4.5 * (Target - Current) / Target);
    }
    else {//Y=-0.04*x^3 -0.01*x
        return (Target - Current) * (- 0.04 * Math.pow((Target - Current) / Target, 3) - 0.01 * (Target - Current) / Target);
    }
}

function setUnableLogistic() {
    var UnableMap;
    switch (parseFloat($("#MapLimit").val())) {
        case 6:
            UnableMap = ["7-1","7-2","7-3","7-4","8-1","8-2","8-3","8-4","9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4"]; break;
        case 7:
            UnableMap = ["8-1","8-2","8-3","8-4","9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4"]; break;
        case 8:
            UnableMap = ["9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4"]; break;
        case 9:
            UnableMap = ["10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4"]; break;
        case 10:
            UnableMap = ["11-1","11-2","11-3","11-4"]; break;
        case 11:
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

function _AdjustTheOrder() {
    Q[0] = Q_Backup[28];
    Q[1] = Q_Backup[1];
    Q[2] = Q_Backup[22];
    Q[3] = Q_Backup[30];
    Q[4] = Q_Backup[17];
    Q[5] = Q_Backup[32];
    Q[6] = Q_Backup[37];
    Q[7] = Q_Backup[24];
    Q[8] = Q_Backup[41];
    Q[9] = Q_Backup[46];
    Q[10] = Q_Backup[44];
    Q[11] = Q_Backup[25];
    Q[12] = Q_Backup[47];
    Q[13] = Q_Backup[16];
    Q[14] = Q_Backup[26];
    Q[15] = Q_Backup[35];
    Q[16] = Q_Backup[33];
    Q[17] = Q_Backup[21];
    Q[18] = Q_Backup[23];
    Q[19] = Q_Backup[39];
    Q[20] = Q_Backup[40];
    Q[21] = Q_Backup[34];
    Q[22] = Q_Backup[45];
    Q[23] = Q_Backup[38];
    Q[24] = Q_Backup[7];
    Q[25] = Q_Backup[11];
    Q[26] = Q_Backup[36];
    Q[27] = Q_Backup[18];
    Q[28] = Q_Backup[14];
    Q[29] = Q_Backup[15];
    Q[30] = Q_Backup[8];
    Q[31] = Q_Backup[29];
    Q[32] = Q_Backup[2];
    Q[33] = Q_Backup[20];
    Q[34] = Q_Backup[0];
    Q[35] = Q_Backup[31];
    Q[36] = Q_Backup[10];
    Q[37] = Q_Backup[12];
    Q[38] = Q_Backup[6];
    Q[39] = Q_Backup[4];
    Q[40] = Q_Backup[13];
    Q[41] = Q_Backup[43];
    Q[42] = Q_Backup[19];
    Q[43] = Q_Backup[5];
    Q[44] = Q_Backup[42];
    Q[45] = Q_Backup[9];
    Q[46] = Q_Backup[27];
    Q[47] = Q_Backup[3];
}