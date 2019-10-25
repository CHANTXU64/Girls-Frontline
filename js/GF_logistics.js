var ShownTab = new Tab_Anytime;
var _Customizer;//Plan暂存区

function Get_Plan_Main() {
    Q_init_Contract();
    ShownTab.setTime();
    ShownTab.setResourceIncreasingRate();

    var plan = new Plan(36);
    var TargetValue = getLegalityTargetValue();
    var Weights = getLegalityWeights();
    TargetValue = CorrectTargetValue(TargetValue);//目标值修正
    var UnableLogistic = ShownTab.getUnableLogistic();
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
                    CurrentValue = ShownTab.Calculate_Current(MissionsNumber);
                    Plan_value = Value(Weights, TargetValue, CurrentValue);
                    plan.push(MissionsNumber, CurrentValue, Plan_value)
                }
            }
        }
    }
    plan.print();
}

function getLegalityTargetValue() {
    var HTMLTargetArr = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QT")];
    var TargetArr = getPositiveValueFromHTML(HTMLTargetArr);
    if (TargetArr.toString() == "0,0,0,0,0,0,0") {
        alert("需求不能全为0！");
        throw"--";
    }
    return TargetArr;
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
function is_Non_positive_number(x) {
    if (x === "" || isNaN(x) || x < 0 || x === "Infinity") return true;
    else return false;
}

function getLegalityWeights() {
    var HTMLWeightsArr = [$("#Mw"), $("#Aw"), $("#Rw"), $("#Pw"), $("#Tw"), $("#Ew"), $("#Qw")];
    var WeightsArr = getPositiveValueFromHTML(HTMLWeightsArr);
    if (WeightsArr.toString() == "0,0,0,0,0,0,0") {
        alert("权重不能全为0！");
        throw"--";
    }
    return WeightsArr;
}

//目标值修正函数
function CorrectTargetValue(TargetValue) {
    var ResourceValue = new Array(4);
    var Resource_CalibrationValue = 600;
    for (var i = 0; i < 4; i++) {
        ResourceValue[i] = TargetValue[i];
    }
    if (ValuesNotAll0(ResourceValue)) CorrectValue(ResourceValue, Resource_CalibrationValue);
    var ContractValue = new Array(3);
    var Contract_CalibrationValue = 1;
    for (var i = 0; i < 3; i++) {
        ContractValue[i] = TargetValue[i + 4];
    }
    if (ValuesNotAll0(ContractValue)) CorrectValue(ContractValue, Contract_CalibrationValue);
    return ResourceValue.concat(ContractValue);
}
function ValuesNotAll0(Values) {
    for (var i = 0; i < Values.length; i++) {
        if (Values[i] != 0) return true;
    }
    return false;
}
function CorrectValue(Values, CalibrationValue) {
    var CorrectionRate = CalibrationValue / ValueMax(Values);
    for (var i = 0; i < Values.length; i++) {
        Values[i] *= CorrectionRate;
    }
}
function ValueMax(xValue) {
    var max = 0;
    for (var i = 0; i < xValue.length; i++) {
        max = Math.max(max, xValue[i]);
    }
    return max;
}

//有问题
function Value(Weights, TargetValue, CurrentValue) {
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