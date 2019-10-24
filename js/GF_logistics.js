var ShownTab = new Tab_Anytime;
var plan;
var test_chant = 0;
var test_chant2;

function Get_Plan_Main() {
    console.time("main");
    test_chant = 0;
    test_chant2 = 0;
    Q_init_Contract();
    ShownTab.setTime();
    plan = new Plan(36);
    var TargetValue = getTargetValue();
    var Weights = getWeights();
    AdjustWeightsByTargetValue(Weights, TargetValue);
    var ResourceIncreasingRate = CalculateResourceIncreasingRate();
    var UnableLogistic = ShownTab.getUnableLogistic();
    CorrectTargetValue(TargetValue);//目标值修正
    for (var n1 = 0; n1 < (Q.length - 3); n1++) {
        if (UnableLogistic.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 < (Q.length - 2); n2++) {
            if (UnableLogistic.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 < (Q.length - 1); n3++) {
                if (UnableLogistic.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 < Q.length; n4++) {
                    if (UnableLogistic.indexOf(n4) != -1) continue;
                    var CurrentValue = [0, 0, 0, 0, 0, 0, 0];
                    var Plan_value = 0;
                    var MissionsNumber = [n1, n2, n3, n4];
                    CurrentValue = ShownTab.Calculate_Current(MissionsNumber, ResourceIncreasingRate);
                    Plan_value = Value(Weights, TargetValue, CurrentValue);
                    plan.push(MissionsNumber, CurrentValue, Plan_value)
                }
            }
        }
    }
    console.timeEnd("main");
    plan.print();
    // alert(test_chant);
    // alert(test_chant2);
    // alert(test_chant - test_chant2);
}

function getTargetValue() {
    CheckDataLegalityAndCorrect_Target();
    var arr = new Array(7);
    arr[0] = parseFloat($("#MT").val());
    arr[1] = parseFloat($("#AT").val());
    arr[2] = parseFloat($("#RT").val());
    arr[3] = parseFloat($("#PT").val());
    arr[4] = parseFloat($("#TT").val());
    arr[5] = parseFloat($("#ET").val());
    arr[6] = parseFloat($("#QT").val());
    if (arr.toString() == "0,0,0,0,0,0,0") {
        alert("需求不能全为0！");
        throw"--";
    }
    return arr;
}
function CheckDataLegalityAndCorrect_Target() {
    var arr = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QT")];
    for (var i = 0; i < 7; i++) {
        if (is_Non_positive_number(arr[i].val())) arr[i].val(0);
    }
}
function is_Non_positive_number(x) {
    if (x === "" || isNaN(x) || x < 0) return true;
    else return false;
}

function getWeights() {
    CheckDataLegalityAndCorrect_Weight();
    var arr = new Array(7);
    arr[0] = parseFloat($("#Mw").val());
    arr[1] = parseFloat($("#Aw").val());
    arr[2] = parseFloat($("#Rw").val());
    arr[3] = parseFloat($("#Pw").val());
    arr[4] = parseFloat($("#Tw").val());
    arr[5] = parseFloat($("#Ew").val());
    arr[6] = parseFloat($("#Qw").val());
    return arr;
}
function CheckDataLegalityAndCorrect_Weight() {
    var arr = [$("#Mw"), $("#Aw"), $("#Rw"), $("#Pw"), $("#Tw"), $("#Ew"), $("#Qw")];
    for (var i = 0; i < 7; i++) {
        if (is_Non_positive_number(arr[i].val())) arr[i].val(0);
    }
}

//目标值为0, 对应权重也为0
function AdjustWeightsByTargetValue(Weights, TargetValue) {
    for (var i = 0; i < 7; i++) {
        if (TargetValue[i] == 0) Weights[i] = 0;
    }
}

function CalculateResourceIncreasingRate() {
    var GreatSuccessRate_UP = Function_GreatSuccessRateUP();
    var GreatSuccessRate = parseFloat($("#GreatSuccessRate").val());
    var ResourceIncreasingRate = 1 + (GreatSuccessRate + GreatSuccessRate_UP) / 200;
    return ResourceIncreasingRate;
}

//目标值修正函数
function CorrectTargetValue(TargetValue) {
    if (ResourceValuesNotAll0(TargetValue)) CorrectTargetValue_Resource(TargetValue);
    if (ContractValuesNotAll0(TargetValue)) CorrectTargetValue_Contract(TargetValue);
}
function ResourceValuesNotAll0(TargetValue) {
    for (var i = 0; i < 4; i++) {
        if (TargetValue[i] != 0) return true;
    }
    return false;
}
function CorrectTargetValue_Resource(TargetValue) {
    var Resource_CalibrationValue = 600;
    var CorrectionRate_Resource = Resource_CalibrationValue / ResourceValueMax(TargetValue);
    for (var i = 0; i < 4; i++) {
        TargetValue[i] *= CorrectionRate_Resource;
    }
}
function ResourceValueMax(TargetValue) {
    var max = 0;
    for (var i = 0; i < 4; i++) {
        max = Math.max(max, TargetValue[i]);
    }
    return max;
}
function ContractValuesNotAll0(TargetValue) {
    for (var i = 4; i < 7; i++) {
        if (TargetValue[i] != 0) return true;
    }
    return false;
}
function CorrectTargetValue_Contract(TargetValue) {
    var Contract_CalibrationValue = 1;
    var CorrectionRate_Contract = Contract_CalibrationValue / ContractValueMax(TargetValue);
    for (var i = 4; i < 7; i++) {
        TargetValue[i] *= CorrectionRate_Contract;
    }
}
function ContractValueMax(TargetValue) {
    var max = 0;
    for (var i = 4; i < 7; i++) {
        max = Math.max(max, TargetValue[i]);
    }
    return max;
}

//有问题
function Value(Weights, TargetValue, CurrentValue) {
    test_chant2++;
    return Weights[0] * Value_0(TargetValue[0], CurrentValue[0]) + Weights[1] * Value_0(TargetValue[1], CurrentValue[1]) +
        Weights[2] * Value_0(TargetValue[2], CurrentValue[2]) + Weights[3] * Value_0(TargetValue[3], CurrentValue[3]);
}
function Value_0(Target, Current) {
    if (Target == 0) return 0;
    if (Target > Current) {//Y=5.5*x^3+4.5*x
        return (Target - Current) * (5.5 * Math.pow((Target - Current) / Target, 3) + 4.5 * (Target - Current) / Target);
    }
    else {//Y=-0.04*x^3 -0.01*x
        return (Current - Target) * (- 0.04 * Math.pow((Target - Current) / Target, 3) - 0.01 * (Target - Current) / Target);
    }
}

function setUnableLogistic() {
    var Unable;
    switch (parseFloat($("#MapLimit").val())) {
        case 6:
            Unable = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]; break;
        case 7:
            Unable = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]; break;
        case 8:
            Unable = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]; break;
        case 9:
            Unable = [40, 41, 42, 43, 44, 45, 46, 47]; break;
        case 10:
            Unable = [44, 45, 46, 47]; break;
        case 11:
            Unable = []; break;
        default:
            Unable = [];
    }
    return Unable;
}