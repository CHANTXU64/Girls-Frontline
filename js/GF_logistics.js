var test_chant_2 = 0;
//有问题
function Value(Weights, TargetValue, CurrentValue){
    test_chant_2++;
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

var Hours;
var UnableLogistic;//不能进行的后勤
var method = 1;
var One_cycle_time;

function setUnableLogistic(MapLimit) {
    var UnableLogistic;
    switch (MapLimit) {
        case 6:
            UnableLogistic = [29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 7:
            UnableLogistic = [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 8:
            UnableLogistic = [37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 9:
            UnableLogistic = [41,42,43,44,45,46,47,48]; break;
        case 10:
            UnableLogistic = [45,46,47,48]; break;
        case 11:
            UnableLogistic = []; break;
    }
    return UnableLogistic;
}

//计算大成功资源加成率
function CalculateResourceIncreasingRate() {
    var GreatSuccessRate_UP = Function_GreatSuccessRateUP();
    var GreatSuccessRate = parseFloat($("#GreatSuccessRate").val());
    var ResourceIncreasingRate = 1 + (GreatSuccessRate + GreatSuccessRate_UP) / 200;
    return ResourceIncreasingRate;
}

//目标值修正函数
function CorrectTargetValue(TargetValue, ResourceIncreasingRate) { 
    var CorrectionFactor_Resource = 0; //资源目标值修正系数
    var CorrectionFactor_Contract = 0; //契约目标值修正系数
    var X = 0; var Xi;//MT' or AT' or RT' or PT'
    var XX = 0; var XXi;//TT' or ET' or QT'
    if (TargetValue[0] >= TargetValue[1] && TargetValue[0] >= TargetValue[2] && TargetValue[0] >= TargetValue[3]) Xi = 1;
    else {
        if (TargetValue[1] >= TargetValue[2] && TargetValue[1] >= TargetValue[3]) Xi = 2;
        else {
            if (TargetValue[2] >= TargetValue[3]) Xi = 3;
            else Xi = 4;
        }
    }
    if (TargetValue[4] >= TargetValue[5] && TargetValue[4] >= TargetValue[6]) XXi = 5;
    else {
        if (TargetValue[5] >= TargetValue[6]) XXi = 6;
        else XXi = 7;
    }
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        if (UnableLogistic.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            if (UnableLogistic.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                if (UnableLogistic.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    if (UnableLogistic.indexOf(n4) != -1) continue;
                    switch (method) {
                        case 1:
                            X = Math.max(X, (ResourceIncreasingRate * (Q[n1 - 1][Xi] + Q[n2 - 1][Xi] + Q[n3 - 1][Xi] + Q[n4 - 1][Xi])));
                            XX = Math.max(XX, (Q[n1 - 1][XXi] + Q[n2 - 1][XXi] + Q[n3 - 1][XXi] + Q[n4 - 1][XXi]));
                            break;
                        case 2:
                            X = Math.max(X, (ResourceIncreasingRate * (Q[n1-1][Xi] * Q[n1-1][8] + Q[n2-1][Xi] * Q[n2-1][8] + Q[n3-1][Xi] * Q[n3-1][8] + Q[n4-1][Xi] * Q[n4-1][8]) / Hours));
                            XX = Math.max(XX, (Q[n1-1][XXi] * Q[n1-1][8] + Q[n2-1][XXi] * Q[n2-1][8] + Q[n3-1][XXi] * Q[n3-1][8] + Q[n4-1][XXi] * Q[n4-1][8]) / Hours);
                            break;
                        case 3:
                            var times = [1, 1, 1, 1];
                            var number = [n1, n2, n3, n4];
                            var X_n = [0, 0, 0, 0];
                            var XX_n = [0, 0, 0, 0];
                            for (var i = 0; i < 4; i++) {
                                while (times[i] * Hours < Q[number[i] - 1][8]) times[i] += 1;
                                X_n[i] = Q[number[i] - 1][Xi] * Q[number[i] - 1][8] / (times[i] * Hours);
                                XX_n[i] = Q[number[i] - 1][XXi] * Q[number[i] - 1][8] / (times[i] * Hours);
                            }
                            X = Math.max(X, (ResourceIncreasingRate * (X_n[0] + X_n[1] + X_n[2] + X_n[3])));
                            XX = Math.max(XX, (XX_n[0] + XX_n[1] + XX_n[2] + XX_n[3]));
                            break;
                    }
                }
            }
        }
    }
    switch (Xi) {
        case 1:
            CorrectionFactor_Resource = X / TargetValue[0]; break;
        case 2:
            CorrectionFactor_Resource = X / TargetValue[1]; break;
        case 3:
            CorrectionFactor_Resource = X / TargetValue[2]; break;
        case 4:
            CorrectionFactor_Resource = X / TargetValue[3]; break;
    }
    switch (XXi) {
        case 5:
            CorrectionFactor_Contract = XX / TargetValue[4]; break;
        case 6:
            CorrectionFactor_Contract = XX / TargetValue[5]; break;
        case 7:
            CorrectionFactor_Contract = XX / TargetValue[6]; break;
    }
    if (TargetValue[0] == 0 && TargetValue[1] == 0 && TargetValue[2] == 0 && TargetValue[3] == 0) ;
    else {
        TargetValue[0] *= CorrectionFactor_Resource;
        TargetValue[1] *= CorrectionFactor_Resource;
        TargetValue[2] *= CorrectionFactor_Resource;
        TargetValue[3] *= CorrectionFactor_Resource;
    }
    if (TargetValue[4] == 0 && TargetValue[5] == 0 && TargetValue[6] == 0) ;
    else {
        TargetValue[4] *= CorrectionFactor_Contract;
        TargetValue[5] *= CorrectionFactor_Contract;
        TargetValue[6] *= CorrectionFactor_Contract;
    }
}

var test_chant = 0;
class Plan {
    constructor(length, width) {
        this.List = new Array(length);
        for (var i = 0; i < length; i++) {
            this.List[i] = new Array(width);
            for (var ii = 0; ii < width; ii++) {
                this.List[i][ii] = 0;
            }
        }
    }

    push(MissionsNumber, CurrentValue, PlanValue) {
        for (var i = this.List.length - 1; i >= 0; i--) {
            if (this.ThisRowIsEmpty(i)) {
                while (i != 0 && this.List[i - 1][0] == 0) i--;
                this.PushIntoThisRow(i, MissionsNumber, CurrentValue, PlanValue);
                continue;
            }
            if (PlanValue >= this.List[i][11]) {
                test_chant += 1;
                break;
            }
            else {
                test_chant += 1;
                if (i == this.List.length - 1) {
                    this.PushIntoThisRow(i, MissionsNumber, CurrentValue, PlanValue);
                }
                else {
                    this.ExchangeTheseTwoRows(i, MissionsNumber, CurrentValue, PlanValue);
                }
            }
        }
    }
    ThisRowIsEmpty(RowNumber) {
        if (this.List[RowNumber][0] == 0) return true;
        else return false;
    }
    PushIntoThisRow(RowNumber, MissionsNumber, CurrentValue, PlanValue) {
        for (var i = 0; i < 4; i++) {
            this.List[RowNumber][i] = MissionsNumber[i];
        }
        for (var i = 0; i < 7; i++) {
            this.List[RowNumber][i + 4] = CurrentValue[i];
        }
        this.List[RowNumber][11] = PlanValue;
        if (method === 3) this.List[RowNumber][12] = One_cycle_time;
    }
    ExchangeTheseTwoRows(RowNumber, MissionsNumber, CurrentValue, PlanValue) {
        for (var i = 0; i < 12; i++) {
            this.List[RowNumber + 1][i] = this.List[RowNumber][i];
        }
        this.PushIntoThisRow(RowNumber, MissionsNumber, CurrentValue, PlanValue);
    }
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
    return arr;
}
function CheckDataLegalityAndCorrect_Target() {
    var arr = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QT")];
    for (var i = 0; i < 7; i++) {
        if (is_Non_positive_number(arr[i].val())) arr[i].val(0);
    }
}
function is_Non_positive_number(x) {
	if (x==="" || isNaN(x) || x < 0) return true;
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

function AdjustWeightsByTargetValue(Weights, TargetValue) {
    for (var i = 0; i < 7; i++) {
        if (TargetValue[i] == 0) Weights[i] = 0;
    }
}

function Get_Plan_Main() {
    test_chant = 0;
    test_chant_2 = 0;
    Hours = 0;
    var plan = new Plan(100, 13)
    // switch (method) {
    //     case 1:
    //         JudgeEmpty($("#Time_Anytime_hours"));
    //         JudgeEmpty($("#Time_Anytime_minutes"));
    //         break;
    //     case 2:
    //         JudgeEmpty($("#Time_SingleTime_hours"));
    //         JudgeEmpty($("#Time_SingleTime_minutes"));
    //         break;
    //     case 3:
    //         JudgeEmpty($("#Time_Intervals_hours"));
    //         JudgeEmpty($("#Time_Intervals_minutes"));
    //         break;
    // }
    var TargetValue = getTargetValue();//目标值
    var Weights = getWeights();
    AdjustWeightsByTargetValue(Weights, TargetValue);
    var CurrentValue = [0, 0, 0, 0, 0, 0, 0];//现值
    var ResourceIncreasingRate = CalculateResourceIncreasingRate();
    UnableLogistic = setUnableLogistic(parseFloat($("#MapLimit").val()));
    Q_init_Contract();//一定要在后面
    switch (method) {
        case 1:
            Hours = parseFloat($("#Time_Anytime_hours").val()) + parseFloat($("#Time_Anytime_minutes").val()) / 60;
            if (Hours == 0) {
                confirm("每天执行后勤时长不能为0！");
                return 0;
            }
            break;
        case 2:
            Hours = parseFloat($("#Time_SingleTime_hours").val()) + parseFloat($("#Time_SingleTime_minutes").val()) / 60;
            if (Hours == 0) {
                confirm("时长不能为0！");
                return 0;
            }
            //排除超时后勤
            for (var i = 1; i <= Q.length; i++) {
                if (Q[i - 1][8] > Hours) {
                    if (UnableLogistic.indexOf(i) == -1) {
                        UnableLogistic.push(i);
                    }
                }
            }
            break;
        case 3:
            Hours = parseFloat($("#Time_Intervals_hours").val()) + parseFloat($("#Time_Intervals_minutes").val()) / 60;
            if (Hours == 0) {
                var r = confirm("间隔时长为0，请使用\"随时能收后勤\"一栏来计算组合方案");
                if (r == true) {
                    $('a[href="#method_1"]').tab('show');
                    method = 1;
                }
                return 0;
            }
            break;
    }
    CorrectTargetValue(TargetValue, ResourceIncreasingRate);//目标值修正
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        if (UnableLogistic.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            if (UnableLogistic.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                if (UnableLogistic.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    if (UnableLogistic.indexOf(n4) != -1) continue;
                    var Plan_value = 0;
                    switch(method) {
                        case 1:
                            for (var i = 0; i < 4; i++) {
                                CurrentValue[i] = ResourceIncreasingRate * (Q[n1 - 1][i + 1] + Q[n2 - 1][i + 1] + Q[n3 - 1][i + 1] + Q[n4 - 1][i + 1]);
                            }
                            for (var i = 4; i < 7; i++) {
                                CurrentValue[i] = Q[n1 - 1][i + 1] + Q[n2 - 1][i + 1] + Q[n3 - 1][i + 1] + Q[n4 - 1][i + 1]
                            }
                            break;
                        case 2:
                            for (var i = 0; i < 4; i++) {
                                CurrentValue[i] = ResourceIncreasingRate * 
                                    (Q[n1 - 1][i + 1] * Q[n1 - 1][8] + Q[n2 - 1][i + 1]* Q[n2 - 1][8] + Q[n3 - 1][i + 1]* Q[n3 - 1][8] + Q[n4 - 1][i + 1]* Q[n4 - 1][8]) / Hours;
                            }
                            for (var i = 4; i < 7; i++) {
                                CurrentValue[i] = (Q[n1 - 1][i + 1] * Q[n1 - 1][8] + Q[n2 - 1][i + 1]* Q[n2 - 1][8] + Q[n3 - 1][i + 1]* Q[n3 - 1][8] + Q[n4 - 1][i + 1]* Q[n4 - 1][8]) / Hours;
                            }
                            break;
                        case 3:
                            var times = [1, 1, 1, 1];
                            var number = [n1, n2, n3, n4];
                            var MC_n = [0, 0, 0, 0];
                            var AC_n = [0, 0, 0, 0];
                            var RC_n = [0, 0, 0, 0];
                            var PC_n = [0, 0, 0, 0];
                            var GC_n = [0, 0, 0, 0];
                            var EC_n = [0, 0, 0, 0];
                            var FC_n = [0, 0, 0, 0];
                            for (var i = 0; i < 4; i++) {
                                while (times[i] * Hours < Q[number[i] - 1][8]) times[i] += 1;
                                MC_n[i] = Q[number[i] - 1][1] * Q[number[i] - 1][8] / (times[i] * Hours);
                                AC_n[i] = Q[number[i] - 1][2] * Q[number[i] - 1][8] / (times[i] * Hours);
                                RC_n[i] = Q[number[i] - 1][3] * Q[number[i] - 1][8] / (times[i] * Hours);
                                PC_n[i] = Q[number[i] - 1][4] * Q[number[i] - 1][8] / (times[i] * Hours);
                                GC_n[i] = Q[number[i] - 1][5] * Q[number[i] - 1][8] / (times[i] * Hours);
                                EC_n[i] = Q[number[i] - 1][6] * Q[number[i] - 1][8] / (times[i] * Hours);
                                FC_n[i] = Q[number[i] - 1][7] * Q[number[i] - 1][8] / (times[i] * Hours);
                            }
                            CurrentValue[0] = ResourceIncreasingRate * (MC_n[0] + MC_n[1] + MC_n[2] + MC_n[3]);
                            CurrentValue[1] = ResourceIncreasingRate * (AC_n[0] + AC_n[1] + AC_n[2] + AC_n[3]);
                            CurrentValue[2] = ResourceIncreasingRate * (RC_n[0] + RC_n[1] + RC_n[2] + RC_n[3]);
                            CurrentValue[3] = ResourceIncreasingRate * (PC_n[0] + PC_n[1] + PC_n[2] + PC_n[3]);
                            CurrentValue[4] = GC_n[0] + GC_n[1] + GC_n[2] + GC_n[3];
                            CurrentValue[5] = EC_n[0] + EC_n[1] + EC_n[2] + EC_n[3];
                            CurrentValue[6] = FC_n[0] + FC_n[1] + FC_n[2] + FC_n[3];
                            One_cycle_time = CalculateArrayLeastCommonMultiple(times) * Hours;
                            break;
                    }
                    Plan_value = Value(Weights, TargetValue, CurrentValue);
                    var MissionsNumber = [n1, n2, n3, n4];
                    plan.push(MissionsNumber, CurrentValue, Plan_value)
                }
            }
        }
    }
    Print_Table(method, plan.List, Hours);
}

//求一个数组的最小公倍数
function CalculateArrayLeastCommonMultiple(array) {
    var arr = array;
    for (var i = 0; i < (arr.length - 1); i++) {
        arr[i+1] = arr[i] * arr[i+1] / gcd(arr[i], arr[i + 1]);
    }
    return arr[arr.length - 1];
}
function gcd(a, b) {
    if (b) while ((a %= b) && (b %= a));
    return a + b;
}