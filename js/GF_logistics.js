//有问题
function Value(){
    return Mw * Value_0(MT, MC) + Aw * Value_0(AT, AC) + Rw * Value_0(RT, RC) + Pw * Value_0(PT, PC);
}
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
//
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
function Q_blueprint() {//契约参考:bbs.nga.cn/read.php?tid=13814613 图片存档:imgur.com/XY6kEqh
    var UP, levels;
    if (document.getElementById('ProbUp').checked) UP = 1;
    else UP = 0;
    if ($("#Probability").val() == 15) levels = 1;
    else levels = Math.ceil(($("#Probability").val() - 15) / 45 * 100);
    //人形契约
        Q[41][4] = 0.45;//10-2
        Q[7][4] = (0.0018 * levels + 0.16) * (1 + UP * 0.3529);//1-4
        Q[1][4] = (0.00076 * levels + 0.191) * (1 + UP * 0.1875);//0-2
        Q[38][4] = (0.0003 * levels + 0.166) * (1 + UP * 0.1023);//9-3
        Q[11][4] = (0.00014 * levels + 0.139) * (1 + UP * 0.0652);//2-4
        Q[29][4] = 0.15;//7-2
    //装备契约
        Q[32][5] = (0.0027 * levels + 0.49) * (1 + UP * 0.2368);//8-1
        Q[16][5] = (0.0036 * levels + 0.32) * (1 + UP * 0.3529);//4-1
        Q[22][5] = (0.0005625 * levels + 0.14375) * (1 + UP * 0.1875);//5-3
        Q[26][5] = (0.00036 * levels + 0.132) * (1 + UP * 0.1429);//6-3
        Q[30][5] = (0.000244546 * levels + 0.1355454) * (1 + UP * 0.1023);//7-3
        Q[39][5] = 0.00000286 * levels + 0.142714;//9-4
    //快建
        Q[37][6] = (0.00226 * levels + 0.241) * (1 + UP * 0.3214);//9-2
        Q[17][6] = (0.00112 * levels + 0.288) * (1 + UP * 0.1875);//4-2
        Q[0][6] = (0.00046 * levels + 0.256) * (1 + UP * 0.1023);//0-1
        Q[14][6] = (0.00022 * levels + 0.273) * (1 + UP * 0.0479);//3-3
        Q[10][6] = 0.125;//2-3
        Q[19][6] = 0.125;//4-4
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
var Plan_value;//该方案总价值
var Block_Numbers;//不能进行的后勤
var Addition_rate;//大成功加成率
var ProbUP = 0;//大成功UP
var method = 1;
var hour_or_day = "hour";
var One_cycle_time;

window.onload = function () {
    var Table = document.getElementById("Plan_Table");
    var tab = '点击 <span style="color:deepskyblue">开始排序</span> 按钮，排序前三十六的结果将在这里显示';
    Table.innerHTML = tab;
}

//监听标签页
$(function (){
    $('[href=#hour]').on("shown.bs.tab", function(){hour_or_day = "hour";});
    $('[href=#day]').on("shown.bs.tab", function(){hour_or_day = "day";});
    $('[href=#method_1]').on("shown.bs.tab", function(){method = 1});
    $('[href=#method_2]').on("shown.bs.tab", function(){method = 2});
    $('[href=#method_3]').on("shown.bs.tab", function(){method = 3});
})

//method1同步更新每小时与每天资源需求量
$(function (){
    $("#MT1").on('input propertychange',function() {$("#MTd1").val($(this).val() * (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#AT1").on('input propertychange',function() {$("#ATd1").val($(this).val() * (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#RT1").on('input propertychange',function() {$("#RTd1").val($(this).val() * (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#PT1").on('input propertychange',function() {$("#PTd1").val($(this).val() * (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#GT1").on('input propertychange',function() {$("#GTd1").val($(this).val() * (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#ET1").on('input propertychange',function() {$("#ETd1").val($(this).val() * (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#FT1").on('input propertychange',function() {$("#FTd1").val($(this).val() * (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#MTd1").on('input propertychange',function() {$("#MT1").val($(this).val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#ATd1").on('input propertychange',function() {$("#AT1").val($(this).val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#RTd1").on('input propertychange',function() {$("#RT1").val($(this).val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#PTd1").on('input propertychange',function() {$("#PT1").val($(this).val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#GTd1").on('input propertychange',function() {$("#GT1").val($(this).val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#ETd1").on('input propertychange',function() {$("#ET1").val($(this).val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#FTd1").on('input propertychange',function() {$("#FT1").val($(this).val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60))});
    $("#Time1_hours").on('input propertychange',function() {
        $("#MT1").val($("#MTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#AT1").val($("#ATd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#RT1").val($("#RTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#PT1").val($("#PTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#GT1").val($("#GTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#ET1").val($("#ETd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#FT1").val($("#FTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
    });
    $("#Time1_minutes").on('input propertychange',function() {
        $("#MT1").val($("#MTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#AT1").val($("#ATd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#RT1").val($("#RTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#PT1").val($("#PTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#GT1").val($("#GTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#ET1").val($("#ETd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
        $("#FT1").val($("#FTd1").val() / (parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60));
    });
    //同步更新大成功UP增加概率
    $("#Probability").on('input propertychange',function() {
        if (document.getElementById('ProbUp').checked) {
            if ($("#Probability").val() < 15) ProbUP = 15;
            if ($("#Probability").val() > 60) ProbUP = 30;
            if ($("#Probability").val() <= 60 && $("#Probability").val() >= 15) {
                ProbUP = 15 + Math.floor(($("#Probability").val() - 15) / 3);
            }
            document.getElementById('Display_Prob').innerHTML = ("+" + ProbUP);
        }
    });
})

function Function_ProbUP() {
    if (document.getElementById('ProbUp').checked) {
        ProbUP = 15 + Math.floor(($("#Probability").val() - 15) / 3);
        document.getElementById('Display_Prob').innerHTML = ("+" + ProbUP);
    }
    else {
        document.getElementById('Display_Prob').innerHTML = "";
        ProbUP = 0;
    }
};

function setTarget(TargetInfo) {
    switch (method) {
        case 1:
            var MT = $("#MT1");
            var AT = $("#AT1");
            var RT = $("#RT1");
            var PT = $("#PT1");
            var MTd = $("#MTd1");
            var ATd = $("#ATd1");
            var RTd = $("#RTd1");
            var PTd = $("#PTd1");
            var Hour = parseFloat($("#Time1_hours").val()) + parseFloat($("#Time1_minutes").val()) / 60;
            break;
        case 2:
            var MT = $("#MT2");
            var AT = $("#AT2");
            var RT = $("#RT2");
            var PT = $("#PT2");
            break;
        case 3:
            var MT = $("#MT3");
            var AT = $("#AT3");
            var RT = $("#RT3");
            var PT = $("#PT3");
            break;
    }
    switch (TargetInfo) {
        case 1:
            MT.val(130); AT.val(130); RT.val(130); PT.val(130); break;
        case 2:
            MT.val(430); AT.val(430); RT.val(130); PT.val(230); break;
        case 3:
            MT.val(430); AT.val(130); RT.val(430); PT.val(230); break;
        case 4:
            MT.val(130); AT.val(430); RT.val(430); PT.val(130); break;
        case 5:
            MT.val(730); AT.val(630); RT.val(130); PT.val(430); break;
        case 6:
            MT.val(8000); AT.val(2000); RT.val(8000); PT.val(4000); break;
        case 7:
            MT.val(1); AT.val(1); RT.val(1); PT.val(1); break;
        case 8:
            MT.val(1); AT.val(0); RT.val(0); PT.val(0); break;
        case 9:
            MT.val(0); AT.val(1); RT.val(0); PT.val(0); break;
        case 10:
            MT.val(0); AT.val(0); RT.val(1); PT.val(0); break;
        case 11:
            MT.val(0); AT.val(0); RT.val(0); PT.val(1); break;
    }
    if (method === 1) MTd.val(MT.val() * Hour); ATd.val(AT.val() * Hour); RTd.val(RT.val() * Hour); PTd.val(PT.val() * Hour);
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
    Print_Table();
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
    Print_Table();
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
    Print_Table();
}

function Print_Table(){
    for (var i = 1; i <= Q.length; i++) {//清空契约
        Q[i - 1][4] = 0; Q[i - 1][5] = 0; Q[i - 1][6] = 0;
    }
    var Table = document.getElementById("Plan_Table");
    var tab;
    switch (method) {
        case 1:
            if (hour_or_day === "hour") tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最短时间</th><th>最长时间</th></tr></thead>';
            else tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/d</th><th>弹药/d</th><th>口粮/d</th><th>零件/d</th><th>人形/d</th><th>装备/d</th><th>快建/d</th><th>最短时间</th><th>最长时间</th></tr></thead>';
            tab += '<tbody>'; break;
        case 2:
            tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力</th><th>弹药</th><th>口粮</th><th>零件</th><th>人形</th><th>装备</th><th>快建</th></tr></thead>';
            tab += '<tbody>'; break;
        case 3:
            tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最长时间</th><th><a href="#" data-toggle="tooltip" data-placement="top" title="一周期指从全部后勤同时开始到下一次全部后勤同时收取这段时间">一个周期</a></th></tr></thead>';
            tab += '<tbody>'; break;
    }
    for (var i = 1; i <= Plan.length; i++) {
        if (Plan[i - 1][0] === 0) break;
        tab += ("<tr><td>" + i + "</td>");
        for (var ii = 0; ii <= 3; ii++) {
            if (Plan[i - 1][ii] % 4 === 0) tab += ("<td>" + (parseInt(Plan[i - 1][ii] / 4) - 1) + "-4</td>");
            else tab += ("<td>" + (parseInt(Plan[i - 1][ii] / 4)) + "-" + Plan[i - 1][ii] % 4 + "</td>");
        }
        if ((method === 1 && hour_or_day === "day") || method === 2) {
            tab += ("<td>" + (Math.round(Plan[i - 1][4] * Hours * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][5] * Hours * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][6] * Hours * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][7] * Hours * 10) / 10) + "</td>");
            if (Plan[i - 1][8] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][8] * Hours * 100) / 100) + "</td>");
            if (Plan[i - 1][9] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][9] * Hours * 100) / 100) + "</td>");
            if (Plan[i - 1][10] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][10] * Hours * 100) / 100) + "</td>");
        }
        else {
            tab += ("<td>" + (Math.round(Plan[i - 1][4] * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][5] * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][6] * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][7] * 10) / 10) + "</td>");
            if (Plan[i - 1][8] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][8] * 100) / 100) + "</td>");
            if (Plan[i - 1][9] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][9] * 100) / 100) + "</td>");
            if (Plan[i - 1][10] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][10] * 100) / 100) + "</td>");
        }
        switch (method) {
            case 1:
                tab += ("<td>" + (Math.round(Math.min(Q[Plan[i-1][0]-1][7],Q[Plan[i-1][1]-1][7],Q[Plan[i-1][2]-1][7],Q[Plan[i-1][3]-1][7]) * 100) / 100) + "h</td>");
                tab += ("<td>" + (Math.round(Math.max(Q[Plan[i-1][0]-1][7],Q[Plan[i-1][1]-1][7],Q[Plan[i-1][2]-1][7],Q[Plan[i-1][3]-1][7]) * 100) / 100) + "h</td></tr>");
                break;
            case 2:
                tab += "</tr>"; break;
            case 3:
                tab += ("<td>" + (Math.round(Math.max(Q[Plan[i-1][0]-1][7],Q[Plan[i-1][1]-1][7],Q[Plan[i-1][2]-1][7],Q[Plan[i-1][3]-1][7]) * 100) / 100) + "h</td>");
                tab += ("<td>" + (Math.round(Plan[i - 1][12] * 10) / 10) + "h</td></tr>");
                break;
        }
    }
    Table.innerHTML = tab;
    $(function (){$("[data-toggle='tooltip']").tooltip();})
}
