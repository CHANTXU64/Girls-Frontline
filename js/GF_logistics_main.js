var Q = [
    //后勤战役编号-人力 弹药 口粮 零件 人形 装备 快建 时间(hour)
    //The Logistics Support Number-Manpower-Ammunition-Rations-Parts-
    //T_Doll Production Contract-Equipment Development Contract-
    //Quick Production Contract-Time(hour)
    [0,  0,       174,     174,     0,       0, 0, 0, 0.8333],//0-1
    [1,  183.333, 0,       0,       116.667, 0, 0, 0, 3],
    [2,  75,      75,      75,      20.833,  0, 0, 0, 12],
    [3,  0,       50,      33.333,  31.25,   0, 0, 0, 24],
    [4,  40,      120,     60,      0,       0, 0, 0, 0.25],//1-1
    [5,  0,       80,      120,     0,       0, 0, 0, 0.5],
    [6,  30,      0,       30,      10,      0, 0, 0, 1],
    [7,  80,      80,      0,       0,       0, 0, 0, 2],
    [8,  150,     0,       0,       45,      0, 0, 0, 0.6666],//2-1
    [9,  40,      133.33,  53.333,  0,       0, 0, 0, 1.5],
    [10, 2.5,     2.5,     2.5,     57.5,    0, 0, 0, 4],
    [11, 0,       41.667,  100,     10,      0, 0, 0, 6],
    [12, 150,     0,       225,     0,       0, 0, 0, 0.3333],//3-1
    [13, 0,       160,     93.333,  40,      0, 0, 0, 0.75],
    [14, 0,       200,     0,       0,       0, 0, 0, 1.5],
    [15, 0,       0,       60,      60,      0, 0, 0, 5],
    [16, 0,       185,     185,     0,       0, 0, 0, 1],//4-1
    [17, 0,       0,       0,       105,     0, 0, 0, 2],
    [18, 133.333, 91.667,  0,       0,       0, 0, 0, 6],
    [19, 50,      50,      50,      18.75,   0, 0, 0, 8],
    [20, 0,       0,       200,     90,      0, 0, 0, 0.5],//5-1
    [21, 0,       240,     120,     0,       0, 0, 0, 2.5],
    [22, 200,     100,     100,     0,       0, 0, 0, 4],
    [23, 14.286,  0,       0,       100,     0, 0, 0, 7],
    [24, 150,     150,     0,       50,      0, 0, 0, 2],//6-1
    [25, 0,       66.667,  183.333, 33.333,  0, 0, 0, 3],
    [26, 0,       0,       40,      100,     0, 0, 0, 5],
    [27, 66.667,  66.667,  66.667,  0,       0, 0, 0, 12],
    [28, 260,     0,       260,     0,       0, 0, 0, 2.5],//7-1
    [29, 0,       162.5,   0,       75,      0, 0, 0, 4],
    [30, 163.636, 109.09,  109.09,  0,       0, 0, 0, 5.5],
    [31, 31.25,   31.25,   31.25,   75,      0, 0, 0, 8],
    [32, 150,     150,     150,     0,       0, 0, 0, 1],//8-1
    [33, 0,       0,       0,       150,     0, 0, 0, 3],
    [34, 66.667,  133.333, 133.333, 0,       0, 0, 0, 6],
    [35, 166.667, 44.444,  44.444,  11.111,  0, 0, 0, 9],
    [36, 0,       0,       200,     100,     0, 0, 0, 0.5],//9-1
    [37, 120,     0,       120,     66.667,  0, 0, 0, 1.5],
    [38, 166.667, 166.667, 0,       0,       0, 0, 0, 4.5],
    [39, 71.423,  128.571, 128.571, 0,       0, 0, 0, 7],
    [40, 210,     300,     0,       0,       0, 0, 0, 0.6666],//10-1
    [41, 0,       144,     108,     0,       0, 0, 0, 1.6666],
    [42, 0,       90,      90,      56.25,   0, 0, 0, 5.3333],
    [43, 66,      66,      66,      33,      0, 0, 0, 10],
    [44, 87.5,    262.5,   0,       0,       0, 0, 0, 4],//11-1
    [45, 90,      135,     135,     0,       0, 0, 0, 4],
    [46, 0,       93.75,   187.5,   31.25,   0, 0, 0, 8],
    [47, 0,       165,     0,       90,      0, 0, 0, 10]];
var PlanTable_length = 36;
var PlanTable = new Array(PlanTable_length);
for (var i = 0; i < PlanTable.length; i++){
    PlanTable[i] = new Array(13);
}
var Block_Numbers;//不能进行的后勤
var Addition_rate;//大成功加成率
var method = 1;
var One_cycle_time;


function Get_Plan_Main() {
    CheckDataLegalityAndCorrect();
    var TargetValue = getTarget();
    if (TargetValue == [0,0,0,0,0,0,0]) {
        confirm("需求不能全为0");
        return 0;
    }
    var Weights = getWeight();
    var Time = getTime();
    
    Q_init_Contract();



    
}

function CheckDataLegalityAndCorrect() {
    CheckDataLegalityAndCorrect_TargetWeight();
    CheckDataLegalityAndCorrect_Time();
    CheckDataLegalityAndCorrect_GreatSuccessRate();
}
function CheckDataLegalityAndCorrect_TargetWeight() {
    var arr = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QT"),
        $("#Mw"), $("#Aw"), $("#Rw"), $("#Pw"), $("#Tw"), $("#Ew"), $("#Qw")];
    for (var i = 0; i < 14; i++) {
        if (arr[i].val()==="" || isNaN(arr[i].val()) || arr[i]<0) arr[i].val(0);
    }
}
function CheckDataLegalityAndCorrect_Time() {
    ////////////////////////////////////////////////
}
function CheckDataLegalityAndCorrect_GreatSuccessRate() {
    var Rate = $("#GreatSuccessRate");
    if (Rate.val()==="" || isNaN(Rate.val()) || Rate.val()<15) Rate.val(15);
    if (Rate.val()>60) Rate.val(60);
}

function getTarget() {
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
function getWeight() {
    var arr = new Array(7);
    CheckDataLegalityAndCorrect_TargetWeight();//////////////////////
    arr[0] = $("#MT").val() == 0? 0:parseFloat($("#Mw").val());
    arr[1] = $("#AT").val() == 0? 0:parseFloat($("#Aw").val());
    arr[2] = $("#RT").val() == 0? 0:parseFloat($("#Rw").val());
    arr[3] = $("#PT").val() == 0? 0:parseFloat($("#Pw").val());
    arr[4] = $("#TT").val() == 0? 0:parseFloat($("#Tw").val());
    arr[5] = $("#ET").val() == 0? 0:parseFloat($("#Ew").val());
    arr[6] = $("#QT").val() == 0? 0:parseFloat($("#Qw").val());
    return arr;
}
function getTime() {

}

function Q_init_Contract() {
    ClearQContract();
    var IsUP = IsGreatSuccessRateUp();
    var levels = EstimateLevels();
    //人形契约 T-Doll Production Contract
    Q[41][4] = 0.45;//10-2
    Q[7][4] = (0.0018*levels + 0.16) * (1 + 0.3529*IsUP);//1-4
    Q[1][4] = (0.00076*levels + 0.191) * (1 + 0.1875*IsUP);//0-2
    Q[38][4] = (0.0003*levels + 0.166) * (1 + 0.1023*IsUP);//9-3
    Q[11][4] = (0.00014*levels + 0.139) * (1 + 0.0652*IsUP);//2-4
    Q[29][4] = 0.15;//7-2
    //装备契约 Equipment Development Contract
    Q[32][5] = (0.0027*levels + 0.49) * (1 + 0.2368*IsUP);//8-1
    Q[16][5] = (0.0036*levels + 0.32) * (1 + 0.3529*IsUP);//4-1
    Q[22][5] = (0.0005625*levels + 0.14375) * (1 + 0.1875*IsUP);//5-3
    Q[26][5] = (0.00036*levels + 0.132) * (1 + 0.1429*IsUP);//6-3
    Q[30][5] = (0.000244546*levels + 0.1355454) * (1 + 0.1023*IsUP);//7-3
    Q[39][5] = 0.00000286*levels + 0.142714;//9-4
    //快建 Quick Production Contract
    Q[37][6] = (0.00226*levels + 0.241) * (1 + 0.3214*IsUP);//9-2
    Q[17][6] = (0.00112*levels + 0.288) * (1 + 0.1875*IsUP);//4-2
    Q[0][6] = (0.00046*levels + 0.256) * (1 + 0.1023*IsUP);//0-1
    Q[14][6] = (0.00022*levels + 0.273) * (1 + 0.0479*IsUP);//3-3
    Q[10][6] = 0.125;//2-3
    Q[19][6] = 0.125;//4-4
}
function ClearQContract() {
    for (var i = 1; i <= Q.length; i++) {
        Q[i - 1][4] = 0; 
        Q[i - 1][5] = 0; 
        Q[i - 1][6] = 0;
    }
}
function IsGreatSuccessRateUp() {
    if (document.getElementById('ProbUp').checked) return 1;
    else return 0;
}
function EstimateLevels() {
    var GreatSuccessRate = $("#Probability").val();
    if (GreatSuccessRate == 15) return 1;
    return Math.ceil((GreatSuccessRate - 15) / 45 * 100);
}



















function CalculateArrayLeastCommonMultiple(arr) {
    //arr.length !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (var i = 1; i < arr.length; i++) {

    }
}