var ShownTab = new Tab_Anytime;

function Get_Plan_Main() {
    Q_init_Contract();
    ShownTab.setTime();
    ShownTab.setResourceIncreasingRate();
    var plan = new Plan(36);
    var UnableLogistic = ShownTab.getUnableLogistic();
    for (var n1 = 0; n1 < (Q.length - 3); n1++) {
        if (UnableLogistic.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 < (Q.length - 2); n2++) {
            if (UnableLogistic.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 < (Q.length - 1); n3++) {
                if (UnableLogistic.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 < Q.length; n4++) {
                    if (UnableLogistic.indexOf(n4) != -1) continue;
                    plan.CaculateAndPush([n1, n2, n3, n4]);
                }
            }
        }
    }
    plan.print();
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
        Value_0(TargetValue[2], CurrentValue[2]) + Value_0(TargetValue[3], CurrentValue[3]);
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