//有问题
function Value(){
    return Mw * Value_0(MT, MC) + Aw * Value_0(AT, AC) + Rw * Value_0(RT, RC) + Pw * Value_0(PT, PC);
}
// function Value_0(Target, Current) {
//     if (Target == 0) return 0;
//     if (Target > Current) return (Target - Current) * (10 + (Target - Current) / 40) / Target;
//     else {
//         if ((10 - (Current - Target) / 50) > 9) return (Target - Current) / Target;
//         else return (Target - Current) * (10 - (Current - Target) / 50) / Target;
//     }
// }

function Value_0(Target, Current) {
    if (Target == 0) return 0;
    if (Target > Current) {//Y=5.5*x^3+4.5*x
        // var ratio = (Target - Current) / Target;
        // var Value = (Target - Current) * (5.5 * Math.pow(ratio, 3) + 4.5 * ratio);
        // return Value;
        return (Target - Current) * (5.5 * Math.pow((Target - Current) / Target, 3) + 4.5 * (Target - Current) / Target);
    }
    else {//Y=-0.04*x^3 -0.01*x
        // var ratio = (Target - Current) / Target;
        // var Value = (Current - Target) * (- 0.04 * Math.pow(ratio, 3) - 0.01 * ratio);
        // return Value;
        return (Current - Target) * (- 0.04 * Math.pow((Target - Current) / Target, 3) - 0.01 * (Target - Current) / Target);
    }
}





var Plan_length = 36;//Plan.lenth
var Plan = new Array(Plan_length);//方案
for (var i = 0; i < Plan.length; i++){
    Plan[i] = new Array(13);
}
var Hours;
var MT, AT, RT, PT, GT, ET, FT;//目标值
var Mw, Aw, Rw, Pw, Gw, Ew, Fw;//权重
var MC, AC, RC, PC, GC, EC, FC;//现值
var Plan_value;//方案总价值
var Block_Numbers;//不能进行的后勤
var Addition_rate;//大成功加成率
var ProbUP = 0;//大成功UP
var method = 1;
var hour_or_day = "hour";
var One_cycle_time;

function getPlan() {
    switch (method) {
        case 1:
            getPlan_1(); break;
        case 2:
            getPlan_2(); break;
        case 3:
            getPlan_3(); break;
    }
}

function Block_Maps(MapLimit) {
    var Block_Numbers;
    switch (MapLimit) {
        case 6:
            Block_Numbers = [29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 7:
            Block_Numbers = [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 8:
            Block_Numbers = [37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 9:
            Block_Numbers = [41,42,43,44,45,46,47,48]; break;
        case 10:
            Block_Numbers = [45,46,47,48]; break;
        case 11:
            Block_Numbers = []; break;
    }
    return Block_Numbers;
}

//判断是否为空, 补0
function JudgeEmpty(X) {
    if (X.val() === "" || isNaN(X.val())) {
        X.val(0);
        return 0;
    }
    else return parseFloat(X.val());
}

//计算大成功资源加成率
function JudgeProbability(X) {
    if (X.val() === "" || X.val() < 15) {
        X.val(15);
        return ProbUP / 200 + 1.075;
    }
    if (X.val() > 60) {
        X.val(60);
        return ProbUP / 200 + 1.3;
    }
    return (parseFloat(X.val()) + ProbUP) / 200 + 1;
}

//目标值修正函数
function Correct_Target() { 
    var Correction_Factor_X = 0; //资源目标值修正系数
    var Correction_Factor_XX = 0; //契约目标值修正系数
    var X = 0; var Xi;//MT' or AT' or RT' or PT'
    var XX = 0; var XXi;//GT' or ET' or FT'
    if (MT >= AT && MT >= RT && MT >= PT) Xi = 0;
    else {
        if (AT >= RT && AT >= PT) Xi = 1;
        else {
            if (RT >= PT) Xi = 2;
            else Xi = 3;
        }
    }
    if (GT >= ET && GT >= FT) XXi = 4;
    else {
        if (ET >= FT) XXi = 5;
        else XXi = 6;
    }
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        if (Block_Numbers.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            if (Block_Numbers.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                if (Block_Numbers.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    if (Block_Numbers.indexOf(n4) != -1) continue;
                    switch (method) {
                        case 1:
                            X = Math.max(X, (Addition_rate * (Q[n1 - 1][Xi] + Q[n2 - 1][Xi] + Q[n3 - 1][Xi] + Q[n4 - 1][Xi])));
                            XX = Math.max(XX, (Q[n1 - 1][XXi] + Q[n2 - 1][XXi] + Q[n3 - 1][XXi] + Q[n4 - 1][XXi]));
                            break;
                        case 2:
                            X = Math.max(X, (Addition_rate * (Q[n1-1][Xi] * Q[n1-1][7] + Q[n2-1][Xi] * Q[n2-1][7] + Q[n3-1][Xi] * Q[n3-1][7] + Q[n4-1][Xi] * Q[n4-1][7]) / Hours));
                            XX = Math.max(XX, (Q[n1-1][XXi] * Q[n1-1][7] + Q[n2-1][XXi] * Q[n2-1][7] + Q[n3-1][XXi] * Q[n3-1][7] + Q[n4-1][XXi] * Q[n4-1][7]) / Hours);
                            break;
                        case 3:
                            var times = [1, 1, 1, 1];
                            var number = [n1, n2, n3, n4];
                            var X_n = [0, 0, 0, 0];
                            var XX_n = [0, 0, 0, 0];
                            for (var i = 0; i < 4; i++) {
                                while (times[i] * Hours < Q[number[i] - 1][7]) times[i] += 1;
                                X_n[i] = Q[number[i] - 1][Xi] * Q[number[i] - 1][7] / (times[i] * Hours);
                                XX_n[i] = Q[number[i] - 1][XXi] * Q[number[i] - 1][7] / (times[i] * Hours);
                            }
                            X = Math.max(X, (Addition_rate * (X_n[0] + X_n[1] + X_n[2] + X_n[3])));
                            XX = Math.max(XX, (XX_n[0] + XX_n[1] + XX_n[2] + XX_n[3]));
                            break;
                    }
                }
            }
        }
    }
    switch (Xi) {
        case 0:
            Correction_Factor_X = X / MT; break;
        case 1:
            Correction_Factor_X = X / AT; break;
        case 2:
            Correction_Factor_X = X / RT; break;
        case 3:
            Correction_Factor_X = X / PT; break;
    }
    switch (XXi) {
        case 4:
            Correction_Factor_XX = XX / GT; break;
        case 5:
            Correction_Factor_XX = XX / ET; break;
        case 6:
            Correction_Factor_XX = XX / FT; break;
    }
    if (MT == 0 && AT == 0 && RT == 0 && PT == 0) ;
    else {
        MT = Correction_Factor_X * MT;
        AT = Correction_Factor_X * AT;
        RT = Correction_Factor_X * RT;
        PT = Correction_Factor_X * PT;
    }
    if (GT == 0 && ET == 0 && FT == 0) ;
    else {
        GT = Correction_Factor_XX * GT;
        ET = Correction_Factor_XX * ET;
        FT = Correction_Factor_XX * FT;
    }
}

//将方案添加进方案列表中
function Plan_Push(n1, n2, n3, n4) {
    for (var ii = 1; ii <= Plan.length; ii++) {
        if (Plan[ii - 1][0] === 0) {
            Plan[ii - 1][0] = n1;
            Plan[ii - 1][1] = n2;
            Plan[ii - 1][2] = n3;
            Plan[ii - 1][3] = n4;
            Plan[ii - 1][4] = MC;
            Plan[ii - 1][5] = AC;
            Plan[ii - 1][6] = RC;
            Plan[ii - 1][7] = PC;
            Plan[ii - 1][8] = GC;
            Plan[ii - 1][9] = EC;
            Plan[ii - 1][10] = FC;
            Plan[ii - 1][11] = Plan_value;
            if (method === 3) Plan[ii - 1][12] = One_cycle_time;
            break;
        }//方案列表未满 
        if (Plan_value >= Plan[ii - 1][11]) continue;
        else {
            for (var iii = Plan.length; iii > ii; iii--) {
                Plan[iii - 1][0] = Plan[iii - 2][0];
                Plan[iii - 1][1] = Plan[iii - 2][1];
                Plan[iii - 1][2] = Plan[iii - 2][2];
                Plan[iii - 1][3] = Plan[iii - 2][3];
                Plan[iii - 1][4] = Plan[iii - 2][4];
                Plan[iii - 1][5] = Plan[iii - 2][5];
                Plan[iii - 1][6] = Plan[iii - 2][6];
                Plan[iii - 1][7] = Plan[iii - 2][7];
                Plan[iii - 1][8] = Plan[iii - 2][8];
                Plan[iii - 1][9] = Plan[iii - 2][9];
                Plan[iii - 1][10] = Plan[iii - 2][10];
                Plan[iii - 1][11] = Plan[iii - 2][11];
                if (method === 3) Plan[iii - 1][12] = Plan[iii - 2][12];
            }
            Plan[ii - 1][0] = n1;
            Plan[ii - 1][1] = n2;
            Plan[ii - 1][2] = n3;
            Plan[ii - 1][3] = n4;
            Plan[ii - 1][4] = MC;
            Plan[ii - 1][5] = AC;
            Plan[ii - 1][6] = RC;
            Plan[ii - 1][7] = PC;
            Plan[ii - 1][8] = GC;
            Plan[ii - 1][9] = EC;
            Plan[ii - 1][10] = FC;
            Plan[ii - 1][11] = Plan_value;
            if (method === 3) Plan[ii - 1][12] = One_cycle_time;
            //改变方案
            break;
        }
    }
}

function initialize() {
    Hours = 0;
    for (var i = 0; i < Plan_length; i++){
        for (var ii = 0; ii < 13; ii++){
            Plan[i][ii] = 0;
        }
    }
    switch (method) {
        case 1:
            JudgeEmpty($("#Time1_hours"));
            JudgeEmpty($("#Time1_minutes"));
            JudgeEmpty($("#MTd1"));
            JudgeEmpty($("#ATd1"));
            JudgeEmpty($("#RTd1"));
            JudgeEmpty($("#PTd1"));
            JudgeEmpty($("#GTd1"));
            JudgeEmpty($("#ETd1"));
            JudgeEmpty($("#FTd1"));
            MT = JudgeEmpty($("#MT1"));
            AT = JudgeEmpty($("#AT1"));
            RT = JudgeEmpty($("#RT1"));
            PT = JudgeEmpty($("#PT1"));
            GT = JudgeEmpty($("#GT1"));
            ET = JudgeEmpty($("#ET1"));
            FT = JudgeEmpty($("#FT1"));
            break;
        case 2:
            JudgeEmpty($("#Time2_hours"));
            JudgeEmpty($("#Time2_minutes"));
            MT = JudgeEmpty($("#MT2"));
            AT = JudgeEmpty($("#AT2"));
            RT = JudgeEmpty($("#RT2"));
            PT = JudgeEmpty($("#PT2"));
            GT = JudgeEmpty($("#GT2"));
            ET = JudgeEmpty($("#ET2"));
            FT = JudgeEmpty($("#FT2"));
            break;
        case 3:
            JudgeEmpty($("#Time3_hours"));
            JudgeEmpty($("#Time3_minutes"));
            MT = JudgeEmpty($("#MT3"));
            AT = JudgeEmpty($("#AT3"));
            RT = JudgeEmpty($("#RT3"));
            PT = JudgeEmpty($("#PT3"));
            GT = JudgeEmpty($("#GT3"));
            ET = JudgeEmpty($("#ET3"));
            FT = JudgeEmpty($("#FT3"));
            break;
    }
    Mw = JudgeEmpty($("#Mw"));
    Aw = JudgeEmpty($("#Aw"));
    Rw = JudgeEmpty($("#Rw"));
    Pw = JudgeEmpty($("#Pw"));
    Gw = JudgeEmpty($("#Gw"));
    Ew = JudgeEmpty($("#Ew"));
    Fw = JudgeEmpty($("#Fw"));
    if (MT === 0) Mw = 0;
    if (AT === 0) Aw = 0;
    if (RT === 0) Rw = 0;
    if (PT === 0) Pw = 0;
    if (GT === 0) Gw = 0;
    if (ET === 0) Ew = 0;
    if (FT === 0) Fw = 0;
    if (Mw===0&&Aw===0&&Rw===0&&Pw===0&&Gw===0&&Ew===0&&Fw===0) {
        return true;
    }
    MC = 0; AC = 0; RC = 0; PC = 0; GC = 0; EC = 0; FC = 0;
    Plan_value = 0;
    Addition_rate = JudgeProbability($("#Probability"));
    Block_Numbers = Block_Maps(parseFloat($("#MapLimit").val()));
    Q_blueprint();//一定要在后面
    return false;
}

function getPlan_1() {
    if (initialize()) var r = confirm("需求不能全为0");
    Hours = parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60;
    if (Hours == 0) {
        confirm("每天执行后勤时长不能为0！");
        return 0;
    }
    Correct_Target();//目标值修正
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        if (Block_Numbers.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            if (Block_Numbers.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                if (Block_Numbers.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    if (Block_Numbers.indexOf(n4) != -1) continue;
                    MC = Addition_rate * (Q[n1 - 1][0] + Q[n2 - 1][0] + Q[n3 - 1][0] + Q[n4 - 1][0]);
                    AC = Addition_rate * (Q[n1 - 1][1] + Q[n2 - 1][1] + Q[n3 - 1][1] + Q[n4 - 1][1]);
                    RC = Addition_rate * (Q[n1 - 1][2] + Q[n2 - 1][2] + Q[n3 - 1][2] + Q[n4 - 1][2]);
                    PC = Addition_rate * (Q[n1 - 1][3] + Q[n2 - 1][3] + Q[n3 - 1][3] + Q[n4 - 1][3]);
                    GC = Q[n1 - 1][4] + Q[n2 - 1][4] + Q[n3 - 1][4] + Q[n4 - 1][4];
                    EC = Q[n1 - 1][5] + Q[n2 - 1][5] + Q[n3 - 1][5] + Q[n4 - 1][5];
                    FC = Q[n1 - 1][6] + Q[n2 - 1][6] + Q[n3 - 1][6] + Q[n4 - 1][6];
                    Plan_value = Value();
                    Plan_Push(n1, n2, n3, n4);
                }
            }
        }
    }
    Print_Plan();
}

function getPlan_2() {
    if (initialize()) var r = confirm("需求不能全为0");
    Hours = parseFloat($("#Time2_hours").val()) + parseFloat($("#Time2_minutes").val()) / 60;
    if (Hours == 0) {
        confirm("时长不能为0！");
        return 0;
    }
    //排除超时后勤
    for (var i = 1; i <= Q.length; i++) {
        if (Q[i - 1][7] > Hours) {
            if (Block_Numbers.indexOf(i) == -1) {
                Block_Numbers.push(i);
            }
        }
    }
    Correct_Target();//目标值修正
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        if (Block_Numbers.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            if (Block_Numbers.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                if (Block_Numbers.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    if (Block_Numbers.indexOf(n4) != -1) continue;
                    MC = Addition_rate * (Q[n1-1][0] * Q[n1-1][7] + Q[n2-1][0] * Q[n2-1][7] + Q[n3-1][0] * Q[n3-1][7] + Q[n4-1][0] * Q[n4-1][7]) / Hours;
                    AC = Addition_rate * (Q[n1-1][1] * Q[n1-1][7] + Q[n2-1][1] * Q[n2-1][7] + Q[n3-1][1] * Q[n3-1][7] + Q[n4-1][1] * Q[n4-1][7]) / Hours;
                    RC = Addition_rate * (Q[n1-1][2] * Q[n1-1][7] + Q[n2-1][2] * Q[n2-1][7] + Q[n3-1][2] * Q[n3-1][7] + Q[n4-1][2] * Q[n4-1][7]) / Hours;
                    PC = Addition_rate * (Q[n1-1][3] * Q[n1-1][7] + Q[n2-1][3] * Q[n2-1][7] + Q[n3-1][3] * Q[n3-1][7] + Q[n4-1][3] * Q[n4-1][7]) / Hours;
                    GC = (Q[n1-1][4] * Q[n1-1][7] + Q[n2-1][4] * Q[n2-1][7] + Q[n3-1][4] * Q[n3-1][7] + Q[n4-1][4] * Q[n4-1][7]) / Hours;
                    EC = (Q[n1-1][5] * Q[n1-1][7] + Q[n2-1][5] * Q[n2-1][7] + Q[n3-1][5] * Q[n3-1][7] + Q[n4-1][5] * Q[n4-1][7]) / Hours;
                    FC = (Q[n1-1][6] * Q[n1-1][7] + Q[n2-1][6] * Q[n2-1][7] + Q[n3-1][6] * Q[n3-1][7] + Q[n4-1][6] * Q[n4-1][7]) / Hours;
                    Plan_value = Value();
                    Plan_Push(n1, n2, n3, n4);
                }
            }
        }
    }
    Print_Plan();
}

//求一个数组的最小公倍数
//my.oschina.net/tearlight/blog/145135
//by: subying
function gcd(a,b){
    var minNum = Math.min(a,b), maxNum = Math.max(a,b), i=Math.floor(maxNum/minNum), vper=0;
    for(;i<=maxNum;i++){
        vper = minNum * i;
        if(vper % maxNum === 0){
            return vper;
        }
    }
}
function gcds(arr){
    var i = 0, midNum = 1;
    for(;i < arr.length; i++){
        midNum = gcd(midNum,arr[i]);
    }
    return midNum;
}

function getPlan_3() {
    if (initialize()) var r = confirm("需求不能全为0");
    Hours = parseFloat($("#Time3_hours").val()) + parseFloat($("#Time3_minutes").val()) / 60;
    if (Hours == 0) {
        var r = confirm("间隔时长为0，请使用\"随时能收后勤\"一栏来计算组合方案");
        if (r == true) {
            $('a[href="#method_1"]').tab('show');
            method = 1;
        }
        return 0;
    }
    Correct_Target();//目标值修正
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        if (Block_Numbers.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            if (Block_Numbers.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                if (Block_Numbers.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    if (Block_Numbers.indexOf(n4) != -1) continue;
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
                        while (times[i] * Hours < Q[number[i] - 1][7]) times[i] += 1;
                        MC_n[i] = Q[number[i] - 1][0] * Q[number[i] - 1][7] / (times[i] * Hours);
                        AC_n[i] = Q[number[i] - 1][1] * Q[number[i] - 1][7] / (times[i] * Hours);
                        RC_n[i] = Q[number[i] - 1][2] * Q[number[i] - 1][7] / (times[i] * Hours);
                        PC_n[i] = Q[number[i] - 1][3] * Q[number[i] - 1][7] / (times[i] * Hours);
                        GC_n[i] = Q[number[i] - 1][4] * Q[number[i] - 1][7] / (times[i] * Hours);
                        EC_n[i] = Q[number[i] - 1][5] * Q[number[i] - 1][7] / (times[i] * Hours);
                        FC_n[i] = Q[number[i] - 1][6] * Q[number[i] - 1][7] / (times[i] * Hours);
                    }
                    MC = Addition_rate * (MC_n[0] + MC_n[1] + MC_n[2] + MC_n[3]);
                    AC = Addition_rate * (AC_n[0] + AC_n[1] + AC_n[2] + AC_n[3]);
                    RC = Addition_rate * (RC_n[0] + RC_n[1] + RC_n[2] + RC_n[3]);
                    PC = Addition_rate * (PC_n[0] + PC_n[1] + PC_n[2] + PC_n[3]);
                    GC = GC_n[0] + GC_n[1] + GC_n[2] + GC_n[3];
                    EC = EC_n[0] + EC_n[1] + EC_n[2] + EC_n[3];
                    FC = FC_n[0] + FC_n[1] + FC_n[2] + FC_n[3];
                    One_cycle_time = gcds(times) * Hours;
                    Plan_value = Value();
                    Plan_Push(n1, n2, n3, n4);
                }
            }
        }
    }
    Print_Plan();
}
