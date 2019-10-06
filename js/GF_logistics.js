function Value(){
    return Mw * Weights(MT, MC) + Aw * Weights(AT, AC) + Rw * Weights(RT, RC) + Pw * Weights(PT, PC);
}

//权重计算, 顺便乘上(a-b)
function Weights(Target, Current){
    if (Target < Current) {
        if (10 - (Current - Target) / 5 > 9) return (Target - Current);
		else return (10 - (Current - Target) / 5) * (Target - Current);
    }
    else return (10 + (Target - Current) / 4) * (Target - Current);
}

var Q = [//后勤战役-人力 弹药 口粮 零件 人形 装备 快建 时间(hour)
    [0,       174,     174,     0,       0, 0, 0, 0.8333],//0-1
    [183.333, 0,       0,       116.667, 0, 0, 0, 3],
    [75,      75,      75,      20.833,  0, 0, 0, 12],
    [0,       50,      33.333,  31.25,   0, 0, 0, 24],
    [40,      120,     60,      0,       0, 0, 0, 0.25],//1-1
    [0,       80,      120,     0,       0, 0, 0, 0.5],
    [30,      0,       30,      10,      0, 0, 0, 1],
    [80,      80,      0,       0,       0, 0, 0, 2],
    [150,     0,       0,       45,      0, 0, 0, 0.6666],//2-1
    [40,      133.33,  53.333,  0,       0, 0, 0, 1.5],
    [2.5,     2.5,     2.5,     57.5,    0, 0, 0, 4],
    [0,       41.667,  100,     10,      0, 0, 0, 6],
    [150,     0,       225,     0,       0, 0, 0, 0.3333],//3-1
    [0,       160,     93.333,  40,      0, 0, 0, 0.75],
    [0,       200,     0,       0,       0, 0, 0, 1.5],
    [0,       0,       60,      60,      0, 0, 0, 5],
    [0,       185,     185,     0,       0, 0, 0, 1],//4-1
    [0,       0,       0,       105,     0, 0, 0, 2],
    [133.333, 91.667,  0,       0,       0, 0, 0, 6],
    [50,      50,      50,      18.75,   0, 0, 0, 8],
    [0,       0,       200,     90,      0, 0, 0, 0.5],//5-1
    [0,       240,     120,     0,       0, 0, 0, 2.5],
    [200,     100,     100,     0,       0, 0, 0, 4],
    [14.286,  0,       0,       100,     0, 0, 0, 7],
    [150,     150,     0,       50,      0, 0, 0, 2],//6-1
    [0,       66.667,  183.333, 33.333,  0, 0, 0, 3],
    [0,       0,       40,      100,     0, 0, 0, 5],
    [66.667,  66.667,  66.667,  0,       0, 0, 0, 12],
    [260,     0,       260,     0,       0, 0, 0, 2.5],//7-1
    [0,       162.5,   0,       75,      0, 0, 0, 4],
    [163.636, 109.09,  109.09,  0,       0, 0, 0, 5.5],
    [31.25,   31.25,   31.25,   75,      0, 0, 0, 8],
    [150,     150,     150,     0,       0, 0, 0, 1],//8-1
    [0,       0,       0,       150,     0, 0, 0, 3],
    [66.667,  133.333, 133.333, 0,       0, 0, 0, 6],
    [166.667, 44.444,  44.444,  11.111,  0, 0, 0, 9],
    [0,       0,       200,     100,     0, 0, 0, 0.5],//9-1
    [120,     0,       120,     66.667,  0, 0, 0, 1.5],
    [166.667, 166.667, 0,       0,       0, 0, 0, 4.5],
    [71.423,  128.571, 128.571, 0,       0, 0, 0, 7],
    [210,     300,     0,       0,       0, 0, 0, 0.6666],//10-1
    [0,       144,     108,     0,       0, 0, 0, 1.6666],
    [0,       90,      90,      56.25,   0, 0, 0, 5.3333],
    [66,      66,      66,      33,      0, 0, 0, 10],
    [87.5,    262.5,   0,       0,       0, 0, 0, 4],//11-1
    [90,      135,     135,     0,       0, 0, 0, 4],
    [0,       93.75,   187.5,   31.25,   0, 0, 0, 8],
    [0,       165,     0,       90,      0, 0, 0, 10]];
var Plan_length = 36;//Plan.lenth
var Plan = new Array(Plan_length);//方案
for (var i = 0; i < Plan.length; i++){
    Plan[i] = new Array(9);
}
var Hours;
var MT, AT, RT, PT, GT, ET, FT;//目标值
var Mw, Aw, Rw, Pw, Gw, Ew, Fw;//权重
var MC, AC, RC, PC, GC, EC, FC;//现值
var Plan_value;//该方案总价值
var Block_Numbers;//不能进行的后勤
var Addition_rate;//大成功加成率
var ProbUP = 0;//大成功UP
var method = 1;
var hour_or_day = "hour";
var One_cycle_time;

//监听标签页
$(function (){
    $('[href=#hour]').on("shown.bs.tab", function(){hour_or_day = "hour";});
    $('[href=#day]').on("shown.bs.tab", function(){hour_or_day = "day";});
    $('[href=#method_1]').on("shown.bs.tab", function(){method = 1});
    $('[href=#method_2]').on("shown.bs.tab", function(){method = 2});
    $('[href=#method_3]').on("shown.bs.tab", function(){method = 3});
})

//同步更新每小时与每天资源需求量
$(function (){
    $("#MT1").on('input propertychange',function() {$("#MTd1").val($(this).val() * document.getElementById('Hours').value)});
    $("#AT1").on('input propertychange',function() {$("#ATd1").val($(this).val() * document.getElementById('Hours').value)});
    $("#RT1").on('input propertychange',function() {$("#RTd1").val($(this).val() * document.getElementById('Hours').value)});
    $("#PT1").on('input propertychange',function() {$("#PTd1").val($(this).val() * document.getElementById('Hours').value)});
    $("#GT1").on('input propertychange',function() {$("#GTd1").val($(this).val() * document.getElementById('Hours').value)});
    $("#ET1").on('input propertychange',function() {$("#ETd1").val($(this).val() * document.getElementById('Hours').value)});
    $("#FT1").on('input propertychange',function() {$("#FTd1").val($(this).val() * document.getElementById('Hours').value)});
    $("#MTd1").on('input propertychange',function() {$("#MT1").val($(this).val() / document.getElementById('Hours').value)});
    $("#ATd1").on('input propertychange',function() {$("#AT1").val($(this).val() / document.getElementById('Hours').value)});
    $("#RTd1").on('input propertychange',function() {$("#RT1").val($(this).val() / document.getElementById('Hours').value)});
    $("#PTd1").on('input propertychange',function() {$("#PT1").val($(this).val() / document.getElementById('Hours').value)});
    $("#GTd1").on('input propertychange',function() {$("#GT1").val($(this).val() / document.getElementById('Hours').value)});
    $("#ETd1").on('input propertychange',function() {$("#ET1").val($(this).val() / document.getElementById('Hours').value)});
    $("#FTd1").on('input propertychange',function() {$("#FT1").val($(this).val() / document.getElementById('Hours').value)});
    $("#Hours").on('input propertychange',function() {
        $("#MT1").val(document.getElementById('MTd1').value / document.getElementById('Hours').value);
        $("#AT1").val(document.getElementById('ATd1').value / document.getElementById('Hours').value);
        $("#RT1").val(document.getElementById('RTd1').value / document.getElementById('Hours').value);
        $("#PT1").val(document.getElementById('PTd1').value / document.getElementById('Hours').value);
        $("#GT1").val(document.getElementById('GTd1').value / document.getElementById('Hours').value);
        $("#ET1").val(document.getElementById('ETd1').value / document.getElementById('Hours').value);
        $("#FT1").val(document.getElementById('FTd1').value / document.getElementById('Hours').value);
    });
})

function Function_ProbUP() {
    if (document.getElementById('ProbUp').checked) {
        var Display_Prob = document.getElementById('Display_Prob');
        Display_Prob.innerHTML = "+20";
        ProbUP = 20;
    }
    else {
        var Display_Prob = document.getElementById('Display_Prob');
        Display_Prob.innerHTML = "";
        ProbUP = 0;
    }
};

function setTarget_1(TargetInfo) {
    var MT = document.getElementById('MT1');
    var AT = document.getElementById('AT1');
    var RT = document.getElementById('RT1');
    var PT = document.getElementById('PT1');
    var MTd = document.getElementById('MTd1');
    var ATd = document.getElementById('ATd1');
    var RTd = document.getElementById('RTd1');
    var PTd = document.getElementById('PTd1');
    var Hour = document.getElementById('Hours').value;
    switch (TargetInfo) {
        case 1:
            MT.value = 130; AT.value = 130; RT.value = 130; PT.value = 130; break;
        case 2:
            MT.value = 430; AT.value = 430; RT.value = 130; PT.value = 230; break;
        case 3:
            MT.value = 430; AT.value = 130; RT.value = 430; PT.value = 230; break;
        case 4:
            MT.value = 130; AT.value = 430; RT.value = 430; PT.value = 130; break;
        case 5:
            MT.value = 730; AT.value = 630; RT.value = 130; PT.value = 430; break;
        case 6:
            MT.value = 600; AT.value = 200; RT.value = 600; PT.value = 400; break;
        case 7:
            MT.value = 0; AT.value = 0; RT.value = 0; PT.value = 1; break;
    }
    MTd.value = MT.value * Hour; ATd.value = AT.value * Hour; RTd.value = RT.value * Hour; PTd.value = PT.value * Hour;
}
function setTarget_2(TargetInfo) {
    var MT = document.getElementById('MT2');
    var AT = document.getElementById('AT2');
    var RT = document.getElementById('RT2');
    var PT = document.getElementById('PT2');
    switch (TargetInfo) {
        case 1:
            MT.value = 130; AT.value = 130; RT.value = 130; PT.value = 130; break;
        case 2:
            MT.value = 430; AT.value = 430; RT.value = 130; PT.value = 230; break;
        case 3:
            MT.value = 430; AT.value = 130; RT.value = 430; PT.value = 230; break;
        case 4:
            MT.value = 130; AT.value = 430; RT.value = 430; PT.value = 130; break;
        case 5:
            MT.value = 730; AT.value = 630; RT.value = 130; PT.value = 430; break;
        case 6:
            MT.value = 600; AT.value = 200; RT.value = 600; PT.value = 400; break;
        case 7:
            MT.value = 0; AT.value = 0; RT.value = 0; PT.value = 1; break;
    }
}
function setTarget_3(TargetInfo) {
    var MT = document.getElementById('MT3');
    var AT = document.getElementById('AT3');
    var RT = document.getElementById('RT3');
    var PT = document.getElementById('PT3');
    switch (TargetInfo) {
        case 1:
            MT.value = 130; AT.value = 130; RT.value = 130; PT.value = 130; break;
        case 2:
            MT.value = 430; AT.value = 430; RT.value = 130; PT.value = 230; break;
        case 3:
            MT.value = 430; AT.value = 130; RT.value = 430; PT.value = 230; break;
        case 4:
            MT.value = 130; AT.value = 430; RT.value = 430; PT.value = 130; break;
        case 5:
            MT.value = 730; AT.value = 630; RT.value = 130; PT.value = 430; break;
        case 6:
            MT.value = 600; AT.value = 200; RT.value = 600; PT.value = 400; break;
        case 7:
            MT.value = 0; AT.value = 0; RT.value = 0; PT.value = 1; break;
    }
}

function Block_Maps(MapLimit) {
    var Block_Numbers;
    switch (MapLimit) {
        case 1:
            Block_Numbers = [1,2,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 2:
            Block_Numbers = [1,2,3,4,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 3:
            Block_Numbers = [1,2,3,4,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 4:
            Block_Numbers = [1,2,3,4,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 4.5:
            Block_Numbers = [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
        case 5:
            Block_Numbers = [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]; break;
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
function JudgeEmpty(document_getElementById) {
    var X = document_getElementById;
    if (X.value === "") {
        X.value = 0;
        return 0;
    }
    else return parseFloat(X.value);
}

//计算大成功资源加成率
function JudgeProbability(document_getElementById) {
    var X = document_getElementById;
    if (X.value === "" || X.value < 0) {
        X.value = 0;
        return ProbUP / 200 + 1;
    }
    if (X.value > 60) {
        X.value = 60;
        return ProbUP / 200 + 1.3;
    }
    return (parseFloat(X.value) + ProbUP) / 200 + 1;
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
            Plan[ii - 1][8] = Plan_value;
            if (method === 3) Plan[ii - 1][9] = One_cycle_time;
            break;
        }//方案列表未满 
        if (Plan_value >= Plan[ii - 1][8]) continue;
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
                if (method === 3) Plan[iii - 1][9] = Plan[iii - 2][9];
            }
            Plan[ii - 1][0] = n1;
            Plan[ii - 1][1] = n2;
            Plan[ii - 1][2] = n3;
            Plan[ii - 1][3] = n4;
            Plan[ii - 1][4] = MC;
            Plan[ii - 1][5] = AC;
            Plan[ii - 1][6] = RC;
            Plan[ii - 1][7] = PC;
            Plan[ii - 1][8] = Plan_value;
            if (method === 3) Plan[ii - 1][9] = One_cycle_time;
            //改变方案
            break;
        }
    }
}

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

function initialize_1() {
    Hours = parseFloat(document.getElementById('Hours').value);
    for (var i = 0; i < Plan_length; i++){
        for (var ii = 0; ii < 9; ii++){
            Plan[i][ii] = 0;
        }
    }
    JudgeEmpty(document.getElementById('MTd1'));
    JudgeEmpty(document.getElementById('ATd1'));
    JudgeEmpty(document.getElementById('RTd1'));
    JudgeEmpty(document.getElementById('PTd1'));
    JudgeEmpty(document.getElementById('GTd1'));
    JudgeEmpty(document.getElementById('ETd1'));
    JudgeEmpty(document.getElementById('FTd1'));
    MT = JudgeEmpty(document.getElementById('MT1'));
    AT = JudgeEmpty(document.getElementById('AT1'));
    RT = JudgeEmpty(document.getElementById('RT1'));
    PT = JudgeEmpty(document.getElementById('PT1'));
    GT = JudgeEmpty(document.getElementById('GT1'));
    ET = JudgeEmpty(document.getElementById('ET1'));
    FT = JudgeEmpty(document.getElementById('FT1'));
    Mw = JudgeEmpty(document.getElementById('Mw'));
    Aw = JudgeEmpty(document.getElementById('Aw'));
    Rw = JudgeEmpty(document.getElementById('Rw'));
    Pw = JudgeEmpty(document.getElementById('Pw'));
    Gw = JudgeEmpty(document.getElementById('Gw'));
    Ew = JudgeEmpty(document.getElementById('Ew'));
    Fw = JudgeEmpty(document.getElementById('Fw'));
    if (MT === 0) Mw = 0;
    if (AT === 0) Aw = 0;
    if (RT === 0) Rw = 0;
    if (PT === 0) Pw = 0;
    if (GT === 0) Gw = 0;
    if (ET === 0) Ew = 0;
    if (FT === 0) Fw = 0;
    if (Mw===0&&Aw===0&&Rw===0&&Pw===0&&Gw===0&&Ew===0&&Fw===0) {
        Mw=1; Aw=1; Rw=1; Pw=1; Gw=1; Ew=1; Fw=1;
    }
    MC = 0; AC = 0; RC = 0; PC = 0; GC = 0; EC = 0; FC = 0;
    Plan_value = 0;
    Addition_rate = JudgeProbability(document.getElementById('Probability'));
    Block_Numbers = Block_Maps(parseFloat(document.getElementById('MapLimit').value));
}

function getPlan_1() {
    initialize_1();
    var conti_1, conti_2, conti_3, conti_4;
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        conti_1 = false;
        for (var ii = 1; ii <= Block_Numbers.length; ii++) {
            if (n1 === Block_Numbers[ii-1]) {
                conti_1 = true;
                break;
            }
        }
        if (conti_1 === true) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            conti_2 = false;
            for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                if (n2 === Block_Numbers[ii-1]) {
                    conti_2 = true;
                    break;
                }
            }
            if (conti_2 === true) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                conti_3 = false;
                for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                    if (n3 === Block_Numbers[ii-1]) {
                        conti_3 = true;
                        break;
                    }
                }
                if (conti_3 === true) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    conti_4 = false;
                    for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                        if (n4 === Block_Numbers[ii-1]) {
                            conti_4 = true;
                            break;
                        }
                    }
                    if (conti_4 === true) continue;

                    if (hour_or_day === "hour") {
                        MC = Addition_rate * (Q[n1 - 1][0] + Q[n2 - 1][0] + Q[n3 - 1][0] + Q[n4 - 1][0]);
                        AC = Addition_rate * (Q[n1 - 1][1] + Q[n2 - 1][1] + Q[n3 - 1][1] + Q[n4 - 1][1]);
                        RC = Addition_rate * (Q[n1 - 1][2] + Q[n2 - 1][2] + Q[n3 - 1][2] + Q[n4 - 1][2]);
                        PC = Addition_rate * (Q[n1 - 1][3] + Q[n2 - 1][3] + Q[n3 - 1][3] + Q[n4 - 1][3]);
                    }
                    else {
                        MC = Addition_rate * Hours * (Q[n1 - 1][0] + Q[n2 - 1][0] + Q[n3 - 1][0] + Q[n4 - 1][0]);
                        AC = Addition_rate * Hours * (Q[n1 - 1][1] + Q[n2 - 1][1] + Q[n3 - 1][1] + Q[n4 - 1][1]);
                        RC = Addition_rate * Hours * (Q[n1 - 1][2] + Q[n2 - 1][2] + Q[n3 - 1][2] + Q[n4 - 1][2]);
                        PC = Addition_rate * Hours * (Q[n1 - 1][3] + Q[n2 - 1][3] + Q[n3 - 1][3] + Q[n4 - 1][3]);
                    }
                    Plan_value = Value();
                    Plan_Push(n1, n2, n3, n4);
                }
            }
        }
    }
    Print_Table();
}

function initialize_2() {
    Hours = 0;
    for (var i = 0; i < Plan_length; i++){
        for (var ii = 0; ii < 9; ii++){
            Plan[i][ii] = 0;
        }
    }
    MT = JudgeEmpty(document.getElementById('MT2'));
    AT = JudgeEmpty(document.getElementById('AT2'));
    RT = JudgeEmpty(document.getElementById('RT2'));
    PT = JudgeEmpty(document.getElementById('PT2'));
    GT = JudgeEmpty(document.getElementById('GT2'));
    ET = JudgeEmpty(document.getElementById('ET2'));
    FT = JudgeEmpty(document.getElementById('FT2'));
    Mw = JudgeEmpty(document.getElementById('Mw'));
    Aw = JudgeEmpty(document.getElementById('Aw'));
    Rw = JudgeEmpty(document.getElementById('Rw'));
    Pw = JudgeEmpty(document.getElementById('Pw'));
    Gw = JudgeEmpty(document.getElementById('Gw'));
    Ew = JudgeEmpty(document.getElementById('Ew'));
    Fw = JudgeEmpty(document.getElementById('Fw'));
    if (MT === 0) Mw = 0;
    if (AT === 0) Aw = 0;
    if (RT === 0) Rw = 0;
    if (PT === 0) Pw = 0;
    if (GT === 0) Gw = 0;
    if (ET === 0) Ew = 0;
    if (FT === 0) Fw = 0;
    if (Mw===0&&Aw===0&&Rw===0&&Pw===0&&Gw===0&&Ew===0&&Fw===0) {
        Mw=1; Aw=1; Rw=1; Pw=1; Gw=1; Ew=1; Fw=1;
    }
    MC = 0; AC = 0; RC = 0; PC = 0; GC = 0; EC = 0; FC = 0;
    Plan_value = 0;
    Addition_rate = JudgeProbability(document.getElementById('Probability'));
    Block_Numbers = Block_Maps(parseFloat(document.getElementById('MapLimit').value));
}

function getPlan_2() {
    initialize_2();
    var Time_hours = parseFloat(document.getElementById('Time2_hours').value);
    var Time_minutes = parseFloat(document.getElementById('Time2_minutes').value);
    Hours = Time_hours + Time_minutes / 60;
    //排除超时后勤
    for (var i = 1; i <= Q.length; i++) {
        if (Q[i - 1][7] > Hours) {
            if (Block_Numbers.indexOf(i) == -1) {
                Block_Numbers.push(i);
            }
        }
    }
    var conti_1, conti_2, conti_3, conti_4;
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        conti_1 = false;
        for (var ii = 1; ii <= Block_Numbers.length; ii++) {
            if (n1 === Block_Numbers[ii-1]) {
                conti_1 = true;
                break;
            }
        }
        if (conti_1 === true) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            conti_2 = false;
            for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                if (n2 === Block_Numbers[ii-1]) {
                    conti_2 = true;
                    break;
                }
            }
            if (conti_2 === true) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                conti_3 = false;
                for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                    if (n3 === Block_Numbers[ii-1]) {
                        conti_3 = true;
                        break;
                    }
                }
                if (conti_3 === true) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    conti_4 = false;
                    for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                        if (n4 === Block_Numbers[ii-1]) {
                            conti_4 = true;
                            break;
                        }
                    }
                    if (conti_4 === true) continue;

                    MC = Addition_rate * (Q[n1-1][0] * Q[n1-1][7] + Q[n2-1][0] * Q[n2-1][7] + Q[n3-1][0] * Q[n3-1][7] + Q[n4-1][0] * Q[n4-1][7]);
                    AC = Addition_rate * (Q[n1-1][1] * Q[n1-1][7] + Q[n2-1][1] * Q[n2-1][7] + Q[n3-1][1] * Q[n3-1][7] + Q[n4-1][1] * Q[n4-1][7]);
                    RC = Addition_rate * (Q[n1-1][2] * Q[n1-1][7] + Q[n2-1][2] * Q[n2-1][7] + Q[n3-1][2] * Q[n3-1][7] + Q[n4-1][2] * Q[n4-1][7]);
                    PC = Addition_rate * (Q[n1-1][3] * Q[n1-1][7] + Q[n2-1][3] * Q[n2-1][7] + Q[n3-1][3] * Q[n3-1][7] + Q[n4-1][3] * Q[n4-1][7]);
                    Plan_value = Value();
                    Plan_Push(n1, n2, n3, n4);
                }
            }
        }
    }
    Print_Table();
}

function initialize_3() {
    Hours = 0;
    One_cycle_time = 0;
    for (var i = 0; i < Plan_length; i++){
        for (var ii = 0; ii < 10; ii++){
            Plan[i][ii] = 0;
        }
    }
    MT = JudgeEmpty(document.getElementById('MT3'));
    AT = JudgeEmpty(document.getElementById('AT3'));
    RT = JudgeEmpty(document.getElementById('RT3'));
    PT = JudgeEmpty(document.getElementById('PT3'));
    GT = JudgeEmpty(document.getElementById('GT3'));
    ET = JudgeEmpty(document.getElementById('ET3'));
    FT = JudgeEmpty(document.getElementById('FT3'));
    Mw = JudgeEmpty(document.getElementById('Mw'));
    Aw = JudgeEmpty(document.getElementById('Aw'));
    Rw = JudgeEmpty(document.getElementById('Rw'));
    Pw = JudgeEmpty(document.getElementById('Pw'));
    Gw = JudgeEmpty(document.getElementById('Gw'));
    Ew = JudgeEmpty(document.getElementById('Ew'));
    Fw = JudgeEmpty(document.getElementById('Fw'));
    if (MT === 0) Mw = 0;
    if (AT === 0) Aw = 0;
    if (RT === 0) Rw = 0;
    if (PT === 0) Pw = 0;
    if (GT === 0) Gw = 0;
    if (ET === 0) Ew = 0;
    if (FT === 0) Fw = 0;
    if (Mw===0&&Aw===0&&Rw===0&&Pw===0&&Gw===0&&Ew===0&&Fw===0) {
        Mw=1; Aw=1; Rw=1; Pw=1; Gw=1; Ew=1; Fw=1;
    }
    MC = 0; AC = 0; RC = 0; PC = 0; GC = 0; EC = 0; FC = 0;
    Plan_value = 0;
    Addition_rate = JudgeProbability(document.getElementById('Probability'));
    Block_Numbers = Block_Maps(parseFloat(document.getElementById('MapLimit').value));
}

//求一个数组的最小公倍数
//my.oschina.net/tearlight/blog/145135
//by: subying
function gcd(a,b){
    var minNum = Math.min(a,b),maxNum = Math.max(a,b),i=Math.floor(maxNum/minNum),vper=0;
    if(a ===0 || b===0){
        return maxNum;
    }

    for(;i<=maxNum;i++){
        vper = minNum * i;
        if(vper % maxNum === 0){
            return vper;
            break;
        }
    }
}
function gcds(arr){
    var onum = 0,i = 0,len = arr.length,midNum = 0;
    for(;i<len;i++){
        onum = Math.floor(arr[i]);//去掉小数
        midNum = gcd(midNum,onum);
    }
    return midNum;
}

function getPlan_3() {
    initialize_3();
    var Time_hours = parseFloat(document.getElementById('Time3_hours').value);
    var Time_minutes = parseFloat(document.getElementById('Time3_minutes').value);
    Hours = Time_hours + Time_minutes / 60;
    var conti_1, conti_2, conti_3, conti_4;
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        conti_1 = false;
        for (var ii = 1; ii <= Block_Numbers.length; ii++) {
            if (n1 === Block_Numbers[ii-1]) {
                conti_1 = true;
                break;
            }
        }
        if (conti_1 === true) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            conti_2 = false;
            for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                if (n2 === Block_Numbers[ii-1]) {
                    conti_2 = true;
                    break;
                }
            }
            if (conti_2 === true) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                conti_3 = false;
                for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                    if (n3 === Block_Numbers[ii-1]) {
                        conti_3 = true;
                        break;
                    }
                }
                if (conti_3 === true) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    conti_4 = false;
                    for (var ii = 1; ii <= Block_Numbers.length; ii++) {
                        if (n4 === Block_Numbers[ii-1]) {
                            conti_4 = true;
                            break;
                        }
                    }
                    if (conti_4 === true) continue;

                    var times = [1, 1, 1, 1];
                    var number = [n1, n2, n3, n4];
                    var MC_n = [0, 0, 0, 0];
                    var AC_n = [0, 0, 0, 0];
                    var RC_n = [0, 0, 0, 0];
                    var PC_n = [0, 0, 0, 0];
                    for (var i = 0; i < 4; i++) {
                        while (times[i] * Hours < Q[number[i] - 1][7]) times[i] += 1;
                        MC_n[i] = Q[number[i] - 1][0] * Q[number[i] - 1][7] / (times[i] * Hours);
                        AC_n[i] = Q[number[i] - 1][1] * Q[number[i] - 1][7] / (times[i] * Hours);
                        RC_n[i] = Q[number[i] - 1][2] * Q[number[i] - 1][7] / (times[i] * Hours);
                        PC_n[i] = Q[number[i] - 1][3] * Q[number[i] - 1][7] / (times[i] * Hours);
                    }
                    MC = MC_n[0] + MC_n[1] + MC_n[2] + MC_n[3];
                    AC = AC_n[0] + AC_n[1] + AC_n[2] + AC_n[3];
                    RC = RC_n[0] + RC_n[1] + RC_n[2] + RC_n[3];
                    PC = PC_n[0] + PC_n[1] + PC_n[2] + PC_n[3];
                    One_cycle_time = gcds(times) * Hours;
                    Plan_value = Value();
                    Plan_Push(n1, n2, n3, n4);
                }
            }
        }
    }
    Print_Table();
}

window.onload = function () {
    var Table = document.getElementById("Plan_Table");
    var tab = '点击 <span style="color:deepskyblue">开始排序</span> 按钮，排序前三十六的结果将在这里显示';
    Table.innerHTML = tab;
}

function Print_Table(){
    var Table = document.getElementById("Plan_Table");
    var tab;
    switch (method) {
        case 1:
            if (hour_or_day === "hour") tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最短时间</th><th>最长时间</th></tr></thead>';
            else tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/d</th><th>弹药/d</th><th>口粮/d</th><th>零件/d</th><th>人形/d</th><th>装备/d</th><th>快建/d</th><th>最短时间</th><th>最长时间</th></tr></thead>';
            tab += '<tbody>'; break;
        case 2:
            tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th></tr></thead>';
            tab += '<tbody>'; break;
        case 3:
            tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th><a href="#" data-toggle="tooltip" data-placement="top" title="一周期指从全部后勤同时开始到下一次全部后勤同时收取这段时间">一个周期</a></th></tr></thead>';
            tab += '<tbody>'; break;
    }
    for (var i = 1; i <= Plan.length; i++) {
        if (Plan[i - 1][0] === 0) break;
        tab += ("<tr><td>" + i + "</td>");
        for (var ii = 0; ii <= 3; ii++) {
            if (Plan[i - 1][ii] % 4 === 0) tab += ("<td>" + (parseInt(Plan[i - 1][ii] / 4) - 1) + "-4</td>");
            else tab += ("<td>" + (parseInt(Plan[i - 1][ii] / 4)) + "-" + Plan[i - 1][ii] % 4 + "</td>");
        }
        tab += ("<td>" + (Math.round(Plan[i - 1][4] * 10) / 10) + "</td>");
        tab += ("<td>" + (Math.round(Plan[i - 1][5] * 10) / 10) + "</td>");
        tab += ("<td>" + (Math.round(Plan[i - 1][6] * 10) / 10) + "</td>");
        tab += ("<td>" + (Math.round(Plan[i - 1][7] * 10) / 10) + "</td>");
        tab += ("<td>--</td>");
        tab += ("<td>--</td>");
        tab += ("<td>--</td>");
        switch (method) {
            case 1:
                tab += ("<td>" + (Math.round(Math.min(Q[Plan[i-1][0]-1][7],Q[Plan[i-1][1]-1][7],Q[Plan[i-1][2]-1][7],Q[Plan[i-1][3]-1][7]) / 0.6) / 100) + "h</td>");
                tab += ("<td>" + (Math.round(Math.max(Q[Plan[i-1][0]-1][7],Q[Plan[i-1][1]-1][7],Q[Plan[i-1][2]-1][7],Q[Plan[i-1][3]-1][7]) / 0.6) / 100) + "h</td></tr>");
                break;
            case 3:
                tab += ("<td>" + (Math.round(Plan[i - 1][9] * 10) / 10) + "(h)</td>");
                break;
        }
    }
    Table.innerHTML = tab;
    $(function (){$("[data-toggle='tooltip']").tooltip();})
}