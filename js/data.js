/**
 * 0后勤战役编号-1人力-2弹药-3口粮-4零件-5人形-6装备-7快建-8快修-9时间(minute)
 *
 * 0The Logistics Support Number-1Manpower-2Ammunition-3Ratins-4Parts-5T_Doll Production Contract-
 * 6Equipment Development Contract-7Quick Production Contract-8Quick Restoration Contract-9Time(minute)
 *
 * 契约值表示获取概率(%)
 * @type {Array.<[string, number, number, number, number, number, number, number, number, number]>}
 */
const Q = [
    ["0-1",  0,    145,   145,   0,     0,    0,    20,   50,   50],
    ["0-2",  550,  0,     0,     350,   50,   0,    0,    0,    180],
    ["0-3",  900,  900,   900,   250,   0,    40,   0,    40,   720],
    ["0-4",  0,    1200,  800,   750,   0,    0,    0,    0,    1440],
    ["1-1",  10,   30,    15,    0,     0,    0,    0,    0,    15],
    ["1-2",  0,    40,    60,    0,     0,    0,    0,    0,    30],
    ["1-3",  30,   0,     30,    10,    0,    0,    0,    60,   60],
    ["1-4",  160,  160,   0,     0,     20,   0,    0,    0,    120],
    ["2-1",  100,  0,     0,     30,    0,    0,    0,    0,    40],
    ["2-2",  60,   200,   80,    0,     0,    0,    0,    30,   90],
    ["2-3",  10,   10,    10,    230,   0,    0,    50,   50,   240],
    ["2-4",  0,    250,   600,   60,    80,   0,    0,    0,    360],
    ["3-1",  50,   0,     75,    0,     0,    0,    0,    0,    20],
    ["3-2",  0,    120,   70,    30,    0,    0,    0,    0,    45],
    ["3-3",  0,    300,   0,     0,     0,    0,    40,   45,   90],
    ["3-4",  0,    0,     300,   300,   40,   40,   0,    0,    300], //T??? E???
    ["4-1",  0,    185,   185,   0,     0,    20,   0,    0,    60],
    ["4-2",  0,    0,     0,     210,   0,    0,    50,   0,    120],
    ["4-3",  800,  550,   0,     0,     70,   0,    0,    30,   360],
    ["4-4",  400,  400,   400,   150,   0,    0,    100,  0,    480],
    ["5-1",  0,    0,     100,   45,    0,    0,    0,    0,    30],
    ["5-2",  0,    600,   300,   0,     0,    0,    0,    80,   150],
    ["5-3",  800,  400,   400,   0,     0,    50,   0,    0,    240],
    ["5-4",  100,  0,     0,     700,   40,   0,    0,    0,    420],
    ["6-1",  300,  300,   0,     100,   0,    0,    0,    0,    120],
    ["6-2",  0,    200,   550,   100,   0,    0,    20,   50,   180], //P???
    ["6-3",  0,    0,     200,   500,   0,    60,   0,    0,    300],
    ["6-4",  800,  800,   800,   0,     0,    0,    0,    0,    720],
    ["7-1",  650,  0,     650,   0,     0,    0,    0,    0,    150],
    ["7-2",  0,    650,   0,     300,   60,   0,    0,    40,   240],
    ["7-3",  900,  600,   600,   0,     0,    70,   0,    0,    330],
    ["7-4",  250,  250,   250,   600,   0,    0,    80,   0,    480], //P???
    ["8-1",  150,  150,   150,   0,     0,    40,   0,    0,    60],
    ["8-2",  0,    0,     0,     450,   0,    0,    0,    80,   180],
    ["8-3",  400,  800,   800,   0,     0,    0,    60,   30,   360], //P??? R???
    ["8-4",  1500, 400,   400,   100,   90,   0,    0,    0,    540], //T???
    ["9-1",  0,    0,     100,   50,    0,    0,    0,    0,    30],
    ["9-2",  180,  0,     180,   100,   0,    0,    25,   0,    90],
    ["9-3",  750,  750,   0,     0,     70,   0,    0,    0,    270], //T???
    ["9-4",  500,  900,   900,   0,     0,    100,  0,    0,    420],
    ["10-1", 140,  200,   0,     0,     0,    0,    0,    0,    40],
    ["10-2", 0,    240,   180,   0,     75,   0,    25,   0,    100],
    ["10-3", 0,    480,   480,   300,   0,    0,    30,   50,   320], //P??? R???
    ["10-4", 660,  660,   660,   330,   0,    50,   0,    0,    600], //E???(12/10)60%
    ["11-1", 350,  1050,  0,     0,     50,   50,   0,    0,    240], //T??? E???
    ["11-2", 360,  540,   540,   0,     100,  0,    0,    0,    240], //T???
    ["11-3", 0,    750,   1500,  250,   0,    0,    0,    50,   480], //R???(10/7)60%
    ["11-4", 0,    1650,  0,     900,   0,    0,    100,  0,    600], //P???
    ["12-1", 0,    220,   220,   0,     0,    60,   0,    0,    60],  //E???(42/7)60%
    ["12-2", 360,  0,     0,     120,   0,    0,    0,    0,    90],
    ["12-3", 800,  1200,  1200,  0,     0,    0,    100,  0,    540], //P???
    ["12-4", 1800, 0,     1800,  0,     100,  0,    0,    0,    720]  //T???
];
