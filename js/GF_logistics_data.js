//后勤战役编号-人力 弹药 口粮 零件 人形 装备 快建 快修 时间(hour)
//The Logistics Support Number-Manpower-Ammunition-Rations-Parts-
//T_Doll Production Contract-Equipment Development Contract-
//Quick Production Contract-Quick Restoration Contract-Time(hour)
var Q = [
    ["0-1",  0,       174,     174,     0,       0, 0, 0, 0, 0.8333],
    ["0-2",  183.333, 0,       0,       116.667, 0, 0, 0, 0, 3],
    ["0-3",  75,      75,      75,      20.833,  0, 0, 0, 0, 12],
    ["0-4",  0,       50,      33.333,  31.25,   0, 0, 0, 0, 24],
    ["1-1",  40,      120,     60,      0,       0, 0, 0, 0, 0.25],
    ["1-2",  0,       80,      120,     0,       0, 0, 0, 0, 0.5],
    ["1-3",  30,      0,       30,      10,      0, 0, 0, 0, 1],
    ["1-4",  80,      80,      0,       0,       0, 0, 0, 0, 2],
    ["2-1",  150,     0,       0,       45,      0, 0, 0, 0, 0.6666],
    ["2-2",  40,      133.33,  53.333,  0,       0, 0, 0, 0, 1.5],
    ["2-3",  2.5,     2.5,     2.5,     57.5,    0, 0, 0, 0, 4],
    ["2-4",  0,       41.667,  100,     10,      0, 0, 0, 0, 6],
    ["3-1",  150,     0,       225,     0,       0, 0, 0, 0, 0.3333],
    ["3-2",  0,       160,     93.333,  40,      0, 0, 0, 0, 0.75],
    ["3-3",  0,       200,     0,       0,       0, 0, 0, 0, 1.5],
    ["3-4",  0,       0,       60,      60,      0, 0, 0, 0, 5],
    ["4-1",  0,       185,     185,     0,       0, 0, 0, 0, 1],
    ["4-2",  0,       0,       0,       105,     0, 0, 0, 0, 2],
    ["4-3",  133.333, 91.667,  0,       0,       0, 0, 0, 0, 6],
    ["4-4",  50,      50,      50,      18.75,   0, 0, 0, 0, 8],
    ["5-1",  0,       0,       200,     90,      0, 0, 0, 0, 0.5],
    ["5-2",  0,       240,     120,     0,       0, 0, 0, 0, 2.5],
    ["5-3",  200,     100,     100,     0,       0, 0, 0, 0, 4],
    ["5-4",  14.286,  0,       0,       100,     0, 0, 0, 0, 7],
    ["6-1",  150,     150,     0,       50,      0, 0, 0, 0, 2],
    ["6-2",  0,       66.667,  183.333, 33.333,  0, 0, 0, 0, 3],
    ["6-3",  0,       0,       40,      100,     0, 0, 0, 0, 5],
    ["6-4",  66.667,  66.667,  66.667,  0,       0, 0, 0, 0, 12],
    ["7-1",  260,     0,       260,     0,       0, 0, 0, 0, 2.5],
    ["7-2",  0,       162.5,   0,       75,      0, 0, 0, 0, 4],
    ["7-3",  163.636, 109.09,  109.09,  0,       0, 0, 0, 0, 5.5],
    ["7-4",  31.25,   31.25,   31.25,   75,      0, 0, 0, 0, 8],
    ["8-1",  150,     150,     150,     0,       0, 0, 0, 0, 1],
    ["8-2",  0,       0,       0,       150,     0, 0, 0, 0, 3],
    ["8-3",  66.667,  133.333, 133.333, 0,       0, 0, 0, 0, 6],
    ["8-4",  166.667, 44.444,  44.444,  11.111,  0, 0, 0, 0, 9],
    ["9-1",  0,       0,       200,     100,     0, 0, 0, 0, 0.5],
    ["9-2",  120,     0,       120,     66.667,  0, 0, 0, 0, 1.5],
    ["9-3",  166.667, 166.667, 0,       0,       0, 0, 0, 0, 4.5],
    ["9-4",  71.423,  128.571, 128.571, 0,       0, 0, 0, 0, 7],
    ["10-1", 210,     300,     0,       0,       0, 0, 0, 0, 0.6666],
    ["10-2", 0,       144,     108,     0,       0, 0, 0, 0, 1.6666],
    ["10-3", 0,       90,      90,      56.25,   0, 0, 0, 0, 5.3333],
    ["10-4", 66,      66,      66,      33,      0, 0, 0, 0, 10],
    ["11-1", 87.5,    262.5,   0,       0,       0, 0, 0, 0, 4],
    ["11-2", 90,      135,     135,     0,       0, 0, 0, 0, 4],
    ["11-3", 0,       93.75,   187.5,   31.25,   0, 0, 0, 0, 8],
    ["11-4", 0,       165,     0,       90,      0, 0, 0, 0, 10]
];

function Q_init_Contract() {
    var IsUP = IsGreatSuccessRateUp();//0or1
    var levels = EstimateLevels();
    //人形契约 T-Doll Production Contract
    Q[41][5] = 0.45;//10-2
    Q[7][5] = (0.0018*levels + 0.16) * (1 + 0.3529*IsUP);//1-4
    Q[1][5] = (0.00076*levels + 0.191) * (1 + 0.1875*IsUP);//0-2
    Q[38][5] = (0.0003*levels + 0.166) * (1 + 0.1023*IsUP);//9-3
    Q[11][5] = (0.00014*levels + 0.139) * (1 + 0.0652*IsUP);//2-4
    Q[29][5] = 0.15;//7-2
    Q[15][5] = 10 / 20 / Q[15][9];//???//3-4
    Q[18][5] = 8 / 14 / Q[18][9];//???//4-3
    Q[23][5] = 10 / 14 / Q[23][9];//???//5-4
    Q[35][5] = 14 / 14 / Q[35][9];//???//8-4
    Q[45][5] = 9 / 9 / Q[45][9];//???//11-2
    //装备契约 Equipment Development Contract
    Q[32][6] = (0.0027*levels + 0.49) * (1 + 0.2368*IsUP);//8-1
    Q[16][6] = (0.0036*levels + 0.32) * (1 + 0.3529*IsUP);//4-1
    Q[22][6] = (0.0005625*levels + 0.14375) * (1 + 0.1875*IsUP);//5-3
    Q[26][6] = (0.00036*levels + 0.132) * (1 + 0.1429*IsUP);//6-3
    Q[30][6] = (0.000244546*levels + 0.1355454) * (1 + 0.1023*IsUP);//7-3
    Q[39][6] = 0.00000286*levels + 0.142714;//9-4
    Q[15][6] = 10 / 20 / Q[15][9];//???//3-4
    Q[43][6] = 7 / 7 / Q[43][9];//???//10-4
    //快建 Quick Production Contract
    Q[37][7] = (0.00226*levels + 0.241) * (1 + 0.3214*IsUP);//9-2
    Q[17][7] = (0.00112*levels + 0.288) * (1 + 0.1875*IsUP);//4-2
    Q[0][7] = (0.00046*levels + 0.256) * (1 + 0.1023*IsUP);//0-1
    Q[14][7] = (0.00022*levels + 0.273) * (1 + 0.0479*IsUP);//3-3
    Q[10][7] = 0.125;//2-3
    Q[19][7] = 0.125;//4-4
    Q[47][7] = 8 / 8 / Q[47][9];//???//11-4
    //快修 Quick Restoration Contract

}
function EstimateLevels() {
    CheckDataLegalityAndCorrect_GreatSuccessRate();
    var GreatSuccessRate = parseFloat($("#GreatSuccessRate").val());
    if (GreatSuccessRate == 15) return 1;
    return Math.ceil((GreatSuccessRate - 15) / 45 * 100);
}