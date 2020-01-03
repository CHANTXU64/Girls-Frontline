//后勤战役编号-人力 弹药 口粮 零件 人形 装备 快建 快修 时间(hour)
//The Logistics Support Number-Manpower-Ammunition-Rations-Parts-
//T_Doll Production Contract-Equipment Development Contract-
//Quick Production Contract-Quick Restoration Contract-Time(minute)
let Q = [
    ["0-1",  0,    145,   145,   0,     0, 0, 0, 0, 50],
    ["0-2",  550,  0,     0,     350,   0, 0, 0, 0, 180],
    ["0-3",  900,  900,   900,   250,   0, 0, 0, 0, 720],
    ["0-4",  0,    1200,  800,   750,   0, 0, 0, 0, 1440],
    ["1-1",  10,   30,    15,    0,     0, 0, 0, 0, 15],
    ["1-2",  0,    40,    60,    0,     0, 0, 0, 0, 30],
    ["1-3",  30,   0,     30,    10,    0, 0, 0, 0, 60],
    ["1-4",  160,  160,   0,     0,     0, 0, 0, 0, 120],
    ["2-1",  100,  0,     0,     30,    0, 0, 0, 0, 40],
    ["2-2",  60,   200,   80,    0,     0, 0, 0, 0, 90],
    ["2-3",  10,   10,    10,    230,   0, 0, 0, 0, 240],
    ["2-4",  0,    250,   600,   60,    0, 0, 0, 0, 360],
    ["3-1",  50,   0,     75,    0,     0, 0, 0, 0, 20],
    ["3-2",  0,    120,   70,    30,    0, 0, 0, 0, 45],
    ["3-3",  0,    300,   0,     0,     0, 0, 0, 0, 90],
    ["3-4",  0,    0,     300,   300,   0, 0, 0, 0, 300],
    ["4-1",  0,    185,   185,   0,     0, 0, 0, 0, 60],
    ["4-2",  0,    0,     0,     210,   0, 0, 0, 0, 120],
    ["4-3",  800,  550,   0,     0,     0, 0, 0, 0, 360],
    ["4-4",  400,  400,   400,   150,   0, 0, 0, 0, 480],
    ["5-1",  0,    0,     100,   45,    0, 0, 0, 0, 30],
    ["5-2",  0,    600,   300,   0,     0, 0, 0, 0, 150],
    ["5-3",  800,  400,   400,   0,     0, 0, 0, 0, 240],
    ["5-4",  100,  0,     0,     700,   0, 0, 0, 0, 420],
    ["6-1",  300,  300,   0,     100,   0, 0, 0, 0, 120],
    ["6-2",  0,    200,   550,   100,   0, 0, 0, 0, 180],
    ["6-3",  0,    0,     200,   500,   0, 0, 0, 0, 300],
    ["6-4",  800,  800,   800,   0,     0, 0, 0, 0, 720],
    ["7-1",  650,  0,     650,   0,     0, 0, 0, 0, 150],
    ["7-2",  0,    650,   0,     300,   0, 0, 0, 0, 240],
    ["7-3",  900,  600,   600,   0,     0, 0, 0, 0, 330],
    ["7-4",  250,  250,   250,   600,   0, 0, 0, 0, 480],
    ["8-1",  150,  150,   150,   0,     0, 0, 0, 0, 60],
    ["8-2",  0,    0,     0,     450,   0, 0, 0, 0, 180],
    ["8-3",  400,  800,   800,   0,     0, 0, 0, 0, 360],
    ["8-4",  1500, 400,   400,   100,   0, 0, 0, 0, 540],
    ["9-1",  0,    0,     100,   50,    0, 0, 0, 0, 30],
    ["9-2",  180,  0,     180,   100,   0, 0, 0, 0, 90],
    ["9-3",  750,  750,   0,     0,     0, 0, 0, 0, 270],
    ["9-4",  500,  900,   900,   0,     0, 0, 0, 0, 420],
    ["10-1", 140,  200,   0,     0,     0, 0, 0, 0, 40],
    ["10-2", 0,    240,   180,   0,     0, 0, 0, 0, 100],
    ["10-3", 0,    480,   480,   300,   0, 0, 0, 0, 320],
    ["10-4", 660,  660,   660,   330,   0, 0, 0, 0, 600],
    ["11-1", 350,  1050,  0,     0,     0, 0, 0, 0, 240],
    ["11-2", 360,  540,   540,   0,     0, 0, 0, 0, 240],
    ["11-3", 0,    750,   1500,  250,   0, 0, 0, 0, 480],
    ["11-4", 0,    1650,  0,     900,   0, 0, 0, 0, 600],
    ["12-1", 0,    220,   220,   0,     0, 0, 0, 0, 60],
    ["12-2", 360,  0,     0,     120,   0, 0, 0, 0, 90],
    ["12-3", 800,  1200,  1200,  0,     0, 0, 0, 0, 540],
    ["12-4", 1800, 0,     1800,  0,     0, 0, 0, 0, 720]
];

function setQContract(TotalGreatSuccessRate) {
    const TotalRate = TotalGreatSuccessRate / 100;
    //人形契约 T-Doll Production Contract
    Q[1][5] = calculateContractValue(50, 50, TotalRate);//0-2
    Q[7][5] = calculateContractValue(20, 20, TotalRate);//1-4
    Q[11][5] = calculateContractValue(80, 80, TotalRate);//2-4
    Q[15][5] = calculateContractValue(40, 80, TotalRate);//???//3-4
    Q[18][5] = 0.7;//4-3
    Q[23][5] = calculateContractValue(40, 40, TotalRate);//5-4
    Q[29][5] = 0.6;//7-2
    Q[35][5] = calculateContractValue(90, 90, TotalRate);//???//8-4
    Q[38][5] = calculateContractValue(70, 70, TotalRate);//???//9-3
    Q[41][5] = 0.75;//10-2
    Q[44][5] = 8 / 16;//???//11-1
    Q[45][5] = 12 / 12;//???//11-2
    Q[51][5] = 12 / 12;//???//12-4
    //装备契约 Equipment Development Contract
    Q[2][6] = calculateContractValue(40, 80, TotalRate);//0-3
    Q[15][6] = calculateContractValue(40, 80, TotalRate);//???//3-4
    Q[16][6] = calculateContractValue(20, 20, TotalRate);//4-1
    Q[22][6] = calculateContractValue(50, 50, TotalRate);//5-3
    Q[26][6] = calculateContractValue(60, 60, TotalRate);//6-3
    Q[30][6] = calculateContractValue(70, 70, TotalRate);//7-3
    Q[32][6] = calculateContractValue(40, 40, TotalRate);//8-1
    Q[39][6] = 1;//9-4
    Q[43][6] = calculateContractValue(50, 50, TotalRate);//???//10-4 (12 / 10) 60%
    Q[44][6] = 8 / 16;//???//11-1
    Q[48][6] = calculateContractValue(60, 60, TotalRate);//12-1 (42 / 7) 60%GreatSuccessRate
    //快建 Quick Production Contract
    Q[0][7] = calculateContractValue(20, 70, TotalRate);//0-1
    Q[10][7] = 0.5;//2-3
    Q[14][7] = calculateContractValue(40, 85, TotalRate);//3-3
    Q[17][7] = calculateContractValue(50, 50, TotalRate);//4-2
    Q[19][7] = 1;//4-4
    Q[25][7] = calculateContractValue(20, 70, TotalRate);//???//6-2
    Q[31][7] = calculateContractValue(80, 80, TotalRate);//???//7-4
    Q[34][7] = calculateContractValue(60, 90, TotalRate);//???//8-3
    Q[37][7] = calculateContractValue(25, 25, TotalRate);//9-2
    Q[41][7] = 0.25;//10-2
    Q[42][7] = calculateContractValue(30, 80, TotalRate);//???//10-3
    Q[47][7] = 1;//???//11-4
    Q[50][7] = 12 / 12;//???//12-3
    //快修 Quick Restoration Contract
    Q[0][8] = calculateContractValue(50, 70, TotalRate);//0-1
    Q[2][8] = calculateContractValue(40, 80, TotalRate);//0-3
    Q[6][8] = calculateContractValue(60, 60, TotalRate);//1-3
    Q[9][8] = calculateContractValue(30, 30, TotalRate);//2-2
    Q[10][8] = 0.5;//2-3
    Q[14][8] = calculateContractValue(45, 85, TotalRate);//3-3
    Q[18][8] = 0.3;//4-3
    Q[21][8] = calculateContractValue(80, 80, TotalRate);//5-2
    Q[25][8] = calculateContractValue(50, 70, TotalRate);//6-2
    Q[29][8] = 0.4;//7-2
    Q[33][8] = calculateContractValue(80, 80, TotalRate);//8-2
    Q[34][8] = calculateContractValue(30, 90, TotalRate);//???//8-3
    Q[42][8] = calculateContractValue(50, 80, TotalRate);//???//10-3
    Q[46][8] = calculateContractValue(50, 50, TotalRate);//???//11-3 (10 / 7) 60%
}
function calculateContractValue(BaseValue, SumValue, TotalRate) {
    return BaseValue / 100 + (BaseValue / SumValue - BaseValue / 100) * TotalRate;
}