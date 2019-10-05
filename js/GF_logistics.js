//权重计算, 顺便乘上(a-b)
function Weights(Target, Current){
    if (Target < Current) {
        if (10 - (Current - Target) / 5 > 9) return (Target - Current);
		else return (10 - (Current - Target) / 5) * (Target - Current);
    }
    else return (10 + (Target - Current) / 4) * (Target - Current);
}

var Q = [//后勤战役-人力 弹药 口粮 零件 人形 装备 快建 时间(分钟)
    [0,       174,     174,     0,       0, 0, 0, 50],//0-1
    [183.333, 0,       0,       116.667, 0, 0, 0, 180],
    [75,      75,      75,      20.833,  0, 0, 0, 720],
    [0,       50,      33.333,  31.25,   0, 0, 0, 1440],
    [40,      120,     60,      0,       0, 0, 0, 15],//1-1
    [0,       80,      120,     0,       0, 0, 0, 30],
    [30,      0,       30,      10,      0, 0, 0, 60],
    [80,      80,      0,       0,       0, 0, 0, 120],
    [150,     0,       0,       45,      0, 0, 0, 40],//2-1
    [40,      133.33,  53.333,  0,       0, 0, 0, 90],
    [2.5,     2.5,     2.5,     57.5,    0, 0, 0, 240],
    [0,       41.667,  100,     10,      0, 0, 0, 360],
    [150,     0,       225,     0,       0, 0, 0, 20],//3-1
    [0,       160,     93.333,  40,      0, 0, 0, 45],
    [0,       200,     0,       0,       0, 0, 0, 90],
    [0,       0,       60,      60,      0, 0, 0, 300],
    [0,       185,     185,     0,       0, 0, 0, 60],//4-1
    [0,       0,       0,       105,     0, 0, 0, 120],
    [133.333, 91.667,  0,       0,       0, 0, 0, 360],
    [50,      50,      50,      18.75,   0, 0, 0, 480],
    [0,       0,       200,     90,      0, 0, 0, 30],//5-1
    [0,       240,     120,     0,       0, 0, 0, 150],
    [200,     100,     100,     0,       0, 0, 0, 240],
    [14.286,  0,       0,       100,     0, 0, 0, 420],
    [150,     150,     0,       50,      0, 0, 0, 120],//6-1
    [0,       66.667,  183.333, 33.333,  0, 0, 0, 180],
    [0,       0,       40,      100,     0, 0, 0, 300],
    [66.667,  66.667,  66.667,  0,       0, 0, 0, 720],
    [260,     0,       260,     0,       0, 0, 0, 150],//7-1
    [0,       162.5,   0,       75,      0, 0, 0, 240],
    [163.636, 109.09,  109.09,  0,       0, 0, 0, 330],
    [31.25,   31.25,   31.25,   75,      0, 0, 0, 480],
    [150,     150,     150,     0,       0, 0, 0, 60],//8-1
    [0,       0,       0,       150,     0, 0, 0, 180],
    [66.667,  133.333, 133.333, 0,       0, 0, 0, 360],
    [166.667, 44.444,  44.444,  11.111,  0, 0, 0, 540],
    [0,       0,       200,     100,     0, 0, 0, 30],//9-1
    [120,     0,       120,     66.667,  0, 0, 0, 90],
    [166.667, 166.667, 0,       0,       0, 0, 0, 270],
    [71.423,  128.571, 128.571, 0,       0, 0, 0, 420],
    [210,     300,     0,       0,       0, 0, 0, 40],//10-1
    [0,       144,     108,     0,       0, 0, 0, 100],
    [0,       90,      90,      56.25,   0, 0, 0, 320],
    [66,      66,      66,      33,      0, 0, 0, 600],
    [87.5,    262.5,   0,       0,       0, 0, 0, 240],//11-1
    [90,      135,     135,     0,       0, 0, 0, 240],
    [0,       93.75,   187.5,   31.25,   0, 0, 0, 480],
    [0,       165,     0,       90,      0, 0, 0, 600]];
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
var hour_or_day = "hour";

function hour_day(x) {
    if (x === false) hour_or_day = "hour";
    else hour_or_day = "day";
}

//同步更新每小时与每天资源需求量
$(function (){
    $("#MT").on('input propertychange change',function() {$("#MTd").val($(this).val() * document.getElementById('Hours').value)});
    $("#AT").on('input propertychange',function() {$("#ATd").val($(this).val() * document.getElementById('Hours').value)});
    $("#RT").on('input propertychange',function() {$("#RTd").val($(this).val() * document.getElementById('Hours').value)});
    $("#PT").on('input propertychange',function() {$("#PTd").val($(this).val() * document.getElementById('Hours').value)});
    $("#GT").on('input propertychange',function() {$("#GTd").val($(this).val() * document.getElementById('Hours').value)});
    $("#ET").on('input propertychange',function() {$("#ETd").val($(this).val() * document.getElementById('Hours').value)});
    $("#FT").on('input propertychange',function() {$("#FTd").val($(this).val() * document.getElementById('Hours').value)});
    $("#MTd").on('input propertychange',function() {$("#MT").val($(this).val() / document.getElementById('Hours').value)});
    $("#ATd").on('input propertychange',function() {$("#AT").val($(this).val() / document.getElementById('Hours').value)});
    $("#RTd").on('input propertychange',function() {$("#RT").val($(this).val() / document.getElementById('Hours').value)});
    $("#PTd").on('input propertychange',function() {$("#PT").val($(this).val() / document.getElementById('Hours').value)});
    $("#GTd").on('input propertychange',function() {$("#GT").val($(this).val() / document.getElementById('Hours').value)});
    $("#ETd").on('input propertychange',function() {$("#ET").val($(this).val() / document.getElementById('Hours').value)});
    $("#FTd").on('input propertychange',function() {$("#FT").val($(this).val() / document.getElementById('Hours').value)});
    $("#Hours").on('input propertychange',function() {
        $("#MT").val(document.getElementById('MTd').value / document.getElementById('Hours').value);
        $("#AT").val(document.getElementById('ATd').value / document.getElementById('Hours').value);
        $("#RT").val(document.getElementById('RTd').value / document.getElementById('Hours').value);
        $("#PT").val(document.getElementById('PTd').value / document.getElementById('Hours').value);
        $("#GT").val(document.getElementById('GTd').value / document.getElementById('Hours').value);
        $("#ET").val(document.getElementById('ETd').value / document.getElementById('Hours').value);
        $("#FT").val(document.getElementById('FTd').value / document.getElementById('Hours').value);
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

function setTarget(TargetInfo) {
    var MT = document.getElementById('MT');
    var AT = document.getElementById('AT');
    var RT = document.getElementById('RT');
    var PT = document.getElementById('PT');
    var MTd = document.getElementById('MTd');
    var ATd = document.getElementById('ATd');
    var RTd = document.getElementById('RTd');
    var PTd = document.getElementById('PTd');
    var Hours = document.getElementById('Hours').value;
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
    MTd.value = MT.value * Hours; ATd.value = AT.value * Hours; RTd.value = RT.value * Hours; PTd.value = PT.value * Hours;
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

//计算大成功加成率
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

function initialize_1() {
    Hours = parseFloat(document.getElementById('Hours').value);
    for (var i = 0; i < Plan_length; i++){
        for (var ii = 0; ii < 9; ii++){
            Plan[i][ii] = 0;
        }
    }
    JudgeEmpty(document.getElementById('MTd'));
    JudgeEmpty(document.getElementById('ATd'));
    JudgeEmpty(document.getElementById('RTd'));
    JudgeEmpty(document.getElementById('PTd'));
    JudgeEmpty(document.getElementById('GTd'));
    JudgeEmpty(document.getElementById('ETd'));
    JudgeEmpty(document.getElementById('FTd'));
    MT = JudgeEmpty(document.getElementById('MT'));
    AT = JudgeEmpty(document.getElementById('AT'));
    RT = JudgeEmpty(document.getElementById('RT'));
    PT = JudgeEmpty(document.getElementById('PT'));
    GT = JudgeEmpty(document.getElementById('GT'));
    ET = JudgeEmpty(document.getElementById('ET'));
    FT = JudgeEmpty(document.getElementById('FT'));
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
                    Plan_value = Mw * Weights(MT, MC) + Aw * Weights(AT, AC) + Rw * Weights(RT, RC) + Pw * Weights(PT, PC);
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
                            //改变方案
                            break;
                        }
                    }
                }
            }
        }
    }
    Print_Table(Plan);
}

window.onload = function () {
    var Table = document.getElementById("Plan_Table");
    var tab = '点击 <span style="color:deepskyblue">开始排序</span> 按钮，排序前三十六的结果将在这里显示';
    Table.innerHTML = tab;
}

function Print_Table(Plan){
    var Table = document.getElementById("Plan_Table");
    if (hour_or_day === "hour") var tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最短时间</th><th>最长时间</th></tr></thead>';
    else var tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/d</th><th>弹药/d</th><th>口粮/d</th><th>零件/d</th><th>人形/d</th><th>装备/d</th><th>快建/d</th><th>最短时间</th><th>最长时间</th></tr></thead>';
    tab += '<tbody>';
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
        tab += ("<td>" + (Math.round(Math.min(Q[Plan[i-1][0]-1][7],Q[Plan[i-1][1]-1][7],Q[Plan[i-1][2]-1][7],Q[Plan[i-1][3]-1][7]) / 0.6) / 100) + "h</td>");
        tab += ("<td>" + (Math.round(Math.max(Q[Plan[i-1][0]-1][7],Q[Plan[i-1][1]-1][7],Q[Plan[i-1][2]-1][7],Q[Plan[i-1][3]-1][7]) / 0.6) / 100) + "h</td></tr>");
    }
    Table.innerHTML = tab;
}
