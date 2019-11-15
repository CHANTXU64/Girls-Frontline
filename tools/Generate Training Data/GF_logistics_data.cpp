#include"GF_logistics.h"
#include"Tab.h"

int GreatSuccessRate;
int GreatSuccessRate_UP;
int IsGreatSuccessRateUp; //0or1
double Time_Limit_start;
double Time_Limit_end;
double Time_TotalTime;
vector<double> Time_Tab_Timetable_TimeList;
int MapLimit;
array<double, 7> TargetValue_html;
Tab* ShownTab = nullptr;

array<array<double, 9>, 48> Q = {{
    {0,  0,       174,     174,     0,       0, 0, 0, 0.8333},
    {1,  183.333, 0,       0,       116.667, 0, 0, 0, 3},
    {2,  75,      75,      75,      20.833,  0, 0, 0, 12},
    {3,  0,       50,      33.333,  31.25,   0, 0, 0, 24},
    {4,  40,      120,     60,      0,       0, 0, 0, 0.25},
    {5,  0,       80,      120,     0,       0, 0, 0, 0.5},
    {6,  30,      0,       30,      10,      0, 0, 0, 1},
    {7,  80,      80,      0,       0,       0, 0, 0, 2},
    {8,  150,     0,       0,       45,      0, 0, 0, 0.6666},
    {9,  40,      133.33,  53.333,  0,       0, 0, 0, 1.5},
    {10,  2.5,     2.5,     2.5,     57.5,    0, 0, 0, 4},
    {11,  0,       41.667,  100,     10,      0, 0, 0, 6},
    {12,  150,     0,       225,     0,       0, 0, 0, 0.3333},
    {13,  0,       160,     93.333,  40,      0, 0, 0, 0.75},
    {14,  0,       200,     0,       0,       0, 0, 0, 1.5},
    {15,  0,       0,       60,      60,      0, 0, 0, 5},
    {16,  0,       185,     185,     0,       0, 0, 0, 1},
    {17,  0,       0,       0,       105,     0, 0, 0, 2},
    {18,  133.333, 91.667,  0,       0,       0, 0, 0, 6},
    {19,  50,      50,      50,      18.75,   0, 0, 0, 8},
    {20,  0,       0,       200,     90,      0, 0, 0, 0.5},
    {21,  0,       240,     120,     0,       0, 0, 0, 2.5},
    {22,  200,     100,     100,     0,       0, 0, 0, 4},
    {23,  14.286,  0,       0,       100,     0, 0, 0, 7},
    {24,  150,     150,     0,       50,      0, 0, 0, 2},
    {25,  0,       66.667,  183.333, 33.333,  0, 0, 0, 3},
    {26,  0,       0,       40,      100,     0, 0, 0, 5},
    {27,  66.667,  66.667,  66.667,  0,       0, 0, 0, 12},
    {28,  260,     0,       260,     0,       0, 0, 0, 2.5},
    {29,  0,       162.5,   0,       75,      0, 0, 0, 4},
    {30,  163.636, 109.09,  109.09,  0,       0, 0, 0, 5.5},
    {31,  31.25,   31.25,   31.25,   75,      0, 0, 0, 8},
    {32,  150,     150,     150,     0,       0, 0, 0, 1},
    {33,  0,       0,       0,       150,     0, 0, 0, 3},
    {34,  66.667,  133.333, 133.333, 0,       0, 0, 0, 6},
    {35,  166.667, 44.444,  44.444,  11.111,  0, 0, 0, 9},
    {36,  0,       0,       200,     100,     0, 0, 0, 0.5},
    {37,  120,     0,       120,     66.667,  0, 0, 0, 1.5},
    {38,  166.667, 166.667, 0,       0,       0, 0, 0, 4.5},
    {39,  71.423,  128.571, 128.571, 0,       0, 0, 0, 7},
    {40, 210,     300,     0,       0,       0, 0, 0, 0.6666},
    {41, 0,       144,     108,     0,       0, 0, 0, 1.6666},
    {42, 0,       90,      90,      56.25,   0, 0, 0, 5.3333},
    {43, 66,      66,      66,      33,      0, 0, 0, 10},
    {44, 87.5,    262.5,   0,       0,       0, 0, 0, 4},
    {45, 90,      135,     135,     0,       0, 0, 0, 4},
    {46, 0,       93.75,   187.5,   31.25,   0, 0, 0, 8},
    {47, 0,       165,     0,       90,      0, 0, 0, 10}
}};

void ClearQContract();
int EstimateLevels();
void Q_init_Contract() {
    ClearQContract();
    int IsUP = IsGreatSuccessRateUp; //0or1
    int levels = EstimateLevels();
    //人形契约 T-Doll Production Contract
    Q[41][5] = 0.45;//10-2
    Q[7][5] = (0.0018*levels + 0.16) * (1 + 0.3529*IsUP);//1-4
    Q[1][5] = (0.00076*levels + 0.191) * (1 + 0.1875*IsUP);//0-2
    Q[38][5] = (0.0003*levels + 0.166) * (1 + 0.1023*IsUP);//9-3
    Q[11][5] = (0.00014*levels + 0.139) * (1 + 0.0652*IsUP);//2-4
    Q[29][5] = 0.15;//7-2
    Q[15][5] = 0.5 / Q[15][8];//???//3-4
    Q[18][5] = 0.57143 / Q[18][8];//???//4-3
    Q[23][5] = 0.71429 / Q[23][8];//???//5-4
    Q[35][5] = 1 / Q[35][8];//???//8-4
    //装备契约 Equipment Development Contract
    Q[32][6] = (0.0027*levels + 0.49) * (1 + 0.2368*IsUP);//8-1
    Q[16][6] = (0.0036*levels + 0.32) * (1 + 0.3529*IsUP);//4-1
    Q[22][6] = (0.0005625*levels + 0.14375) * (1 + 0.1875*IsUP);//5-3
    Q[26][6] = (0.00036*levels + 0.132) * (1 + 0.1429*IsUP);//6-3
    Q[30][6] = (0.000244546*levels + 0.1355454) * (1 + 0.1023*IsUP);//7-3
    Q[39][6] = 0.00000286*levels + 0.142714;//9-4
    Q[15][6] = 0.5 / Q[15][8];//???//3-4
    //快建 Quick Production Contract
    Q[37][7] = (0.00226*levels + 0.241) * (1 + 0.3214*IsUP);//9-2
    Q[17][7] = (0.00112*levels + 0.288) * (1 + 0.1875*IsUP);//4-2
    Q[0][7] = (0.00046*levels + 0.256) * (1 + 0.1023*IsUP);//0-1
    Q[14][7] = (0.00022*levels + 0.273) * (1 + 0.0479*IsUP);//3-3
    Q[10][7] = 0.125;//2-3
    Q[19][7] = 0.125;//4-4
}
void ClearQContract() {
    for (int i = 0; i < Q.size(); i++) {
        Q[i][5] = 0;
        Q[i][6] = 0;
        Q[i][7] = 0;
    }
}
int EstimateLevels() {
    if (GreatSuccessRate == 15) return 1;
    return ceil(((double)GreatSuccessRate - 15) / 45 * 100);
}

int Function_GreatSuccessRateUP();
void initdata(vector<double> init) {
    GreatSuccessRate = init[0];
    IsGreatSuccessRateUp = init[1];
    TargetValue_html[0] = init[2];
    TargetValue_html[1] = init[3];
    TargetValue_html[2] = init[4];
    TargetValue_html[3] = init[5];
    TargetValue_html[4] = init[6];
    TargetValue_html[5] = init[7];
    TargetValue_html[6] = init[8];
    Time_Limit_start = init[9];
    Time_Limit_end = init[10];
    Time_TotalTime = init[11];
    MapLimit = init[12];
    int Tab_number = init[13];
    for (int i = 14; i < init.size(); i++) {
        Time_Tab_Timetable_TimeList.push_back(init[i]);
    }
    switch (Tab_number) {
        case 1:
            ShownTab = new Tab_Anytime;
            break;
        case 2:
            ShownTab = new Tab_SingleTime;
            break;
        case 3:
            ShownTab = new Tab_Timetable;
            break;
        case 4:
            ShownTab = new Tab_Intervals;
            break;
    }
    //-----
    GreatSuccessRate_UP = Function_GreatSuccessRateUP();
}
int Function_GreatSuccessRateUP() {
    int UpRate = 0;
    if (IsGreatSuccessRateUp) {
        UpRate = 15 + floor((GreatSuccessRate - 15) / 3);
    }
    return UpRate;
}

void deletedata() {
    delete ShownTab;
    ShownTab = nullptr;
}