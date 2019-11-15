#include<iostream>
#include<cmath>
#include<array>
#include<vector>
#include<algorithm>
using namespace std;
#include"Plan.h"
#include"Tab.h"

extern array<array<double, 9>, 48> Q;
array<array<double, 9>, Q.size()> Q_Backup;
extern Tab* ShownTab;
void initdata(vector<double> init);
void deletedata();
void Q_init_Contract();
void Q_AdjustTheOrder();//为了减少方案之间的比较次数, 优先排出场率高的后勤
void Q_RecoveryOrder();
template<typename T> int indexOf(const vector<T>& myvector, const T& value);
array<double, 7> CorrectTargetValueByPlanList(Plan* plan);

int main_0(vector<double> init) {
    initdata(init);
    Q_init_Contract();
    Q_AdjustTheOrder();
    ShownTab->setTime();
    ShownTab->setResourceIncreasingRate();
    vector<int> UnableLogistic = ShownTab->GetUnableLogistic();
    //调整目标值
    //----------
    Plan* plan = new Plan(8);
    for (int n1 = 0; n1 < Q.size() - 3; n1++) {
        if (indexOf(UnableLogistic, n1) != -1) continue;
        for (int n2 = n1 + 1; n2 < Q.size() - 2; n2++) {
            if (indexOf(UnableLogistic, n2) != -1) continue;
            for (int n3 = n2 + 1; n3 < Q.size() -1; n3++) {
                if (indexOf(UnableLogistic, n3) != -1) continue;
                for (int n4 = n3 + 1; n4 < Q.size(); n4++) {
                    if (indexOf(UnableLogistic, n4) != -1) continue;
                    int MissionsNumber[4] = {n1, n2, n3, n4};
                    plan->CalculateAndPush(MissionsNumber);
                }
            } 
        }
    }
    array<double, 7> TargetValue = CorrectTargetValueByPlanList(plan);
    delete plan;
    //----------
    plan = new Plan(30, TargetValue);
    for (int n1 = 0; n1 < Q.size() - 3; n1++) {
        if (indexOf(UnableLogistic, n1) != -1) continue;
        for (int n2 = n1 + 1; n2 < Q.size() - 2; n2++) {
            if (indexOf(UnableLogistic, n2) != -1) continue;
            for (int n3 = n2 + 1; n3 < Q.size() -1; n3++) {
                if (indexOf(UnableLogistic, n3) != -1) continue;
                for (int n4 = n3 + 1; n4 < Q.size(); n4++) {
                    if (indexOf(UnableLogistic, n4) != -1) continue;
                    int MissionsNumber[4] = {n1, n2, n3, n4};
                    plan->CalculateAndPush(MissionsNumber);
                }
            } 
        }
    }
    plan->printMissionsNumber_times();
    plan->print();
    Q_RecoveryOrder();
    delete plan;
    deletedata();
    delete ShownTab;
    return 0;
}

array<int, 48> MissionsNumber_times;
int test = 0;
int test_2 = 0;
fstream txt_Ok;
fstream txt_noOk;

int main() {
    txt_Ok.open("Ok.txt", ios::out | ios::ate);
    txt_noOk.open("noOk.txt", ios::out | ios::ate);
    MissionsNumber_times.fill(0);
    array<int, 4> Rate = {60, 50, 40, 15};
    array<int, 2> Up = { 0, 1 };
    array<array<double, 7>, 16> Target = {{
        {100,100,100,50,0,0,0},
        {200,100,100,50,0,0,0},
        {430,430,130,230,0,0,0},
        {430,130,430,230,0,0,0},
        {130,430,430,130,0,0,0},
        {730,630,130,430,0,0,0},
        {800,200,800,400,0,0,0},
        {100,0,0,0,0,0,0},
        {0,100,0,0,0,0,0},
        {0,0,100,0,0,0,0},
        {0,0,0,100,0,0,0},
        {0,0,0,0,1,0,0},
        {0,0,0,0,0,1,0},
        {0,0,0,0,0,0,1},
        {200,300,400,100,1,1,1},
        {300,300,300,300,1,1,1}
    }};
    int Limit_start = 0;
    int Limit_end = 24;
    array<double, 10> TotalTime = {3, 5, 8, 4, 2, 3.5, 12, 7, 6, 1};
    int MapLimit = 11;
    array<int, 3> Tab_number = { 1,2,4};

    //for (int Ratei = 0; Ratei < 4; Ratei++) {
    //	for (int Upi = 0; Upi < 2; Upi++) {
    //		for (int Targeti = 0; Targeti < 16; Targeti++) {
    //			for (int Tab_numberi = 0; Tab_numberi < Tab_number.size(); Tab_numberi++) {
    //				int TotalTimei = 0;
    //				if (Tab_number[Tab_numberi] == 1) {
    //					TotalTimei = 9;
    //				}
    //				for (; TotalTimei < 10; TotalTimei++) {
    //					test = 0;
    //					test_2 = 0;
    //					//Rate--Up(0or1)--Target--Limit_start--Limit_end--TotalTime--MapLimit--Tab_number--Timetable
    //					vector<double> init;
    //					init.push_back(Rate[Ratei]);
    //					init.push_back(Up[Upi]);
    //					init.push_back(Target[Targeti][0]);
    //					init.push_back(Target[Targeti][1]);
    //					init.push_back(Target[Targeti][2]);
    //					init.push_back(Target[Targeti][3]);
    //					init.push_back(Target[Targeti][4]);
    //					init.push_back(Target[Targeti][5]);
    //					init.push_back(Target[Targeti][6]);
    //					init.push_back(Limit_start);
    //					init.push_back(Limit_end);
    //					init.push_back(TotalTime[TotalTimei]);
    //					init.push_back(MapLimit);
    //					init.push_back(Tab_number[Tab_numberi]);
    //					//vector<double> init = { 60, 0, 300,400,200,100,0,0,0, 0, 24, 8, 11, 4, 0,1,3,4.5,6,7,8 };
    //					main_0(init);
    //					cout << test_2 - test << endl;
    //				}
    //			}
    //		}
    //	}
    //}

    vector<double> init = { 60, 0, 300,400,200,100,1,1,1, 0, 24, 8, 11, 1, 0,1,3,4.5,6,7,8 };
    main_0(init);
    cout << "比较次数-方案总数:" << endl;
    cout << test_2 - test << endl;

    cout << "#######后勤关卡在列表中出现次数########" << endl;
    for (int i = 0; i < 48; i++) {
        cout << MissionsNumber_times[i] << endl;
    }
    
    txt_Ok.close();
    txt_noOk.close();
    getchar();
    return 0;
}

void _AdjustTheOrder();
void Q_AdjustTheOrder() {
    for (int i = 0; i < Q.size(); i++) {
        Q_Backup[i] = Q[i];
    }
    _AdjustTheOrder();
}
void Q_RecoveryOrder() {
    for (int i = 0; i < Q.size(); i++) {
        Q[i] = Q_Backup[i];
    }
}

void _AdjustTheOrder() {
    Q[0] = Q_Backup[28];
    Q[1] = Q_Backup[1];
    Q[2] = Q_Backup[22];
    Q[3] = Q_Backup[30];
    Q[4] = Q_Backup[17];
    Q[5] = Q_Backup[32];
    Q[6] = Q_Backup[37];
    Q[7] = Q_Backup[24];
    Q[8] = Q_Backup[41];
    Q[9] = Q_Backup[46];
    Q[10] = Q_Backup[44];
    Q[11] = Q_Backup[25];
    Q[12] = Q_Backup[47];
    Q[13] = Q_Backup[16];
    Q[14] = Q_Backup[26];
    Q[15] = Q_Backup[35];
    Q[16] = Q_Backup[33];
    Q[17] = Q_Backup[21];
    Q[18] = Q_Backup[23];
    Q[19] = Q_Backup[39];
    Q[20] = Q_Backup[40];
    Q[21] = Q_Backup[34];
    Q[22] = Q_Backup[45];
    Q[23] = Q_Backup[38];
    Q[24] = Q_Backup[7];
    Q[25] = Q_Backup[11];
    Q[26] = Q_Backup[36];
    Q[27] = Q_Backup[18];
    Q[28] = Q_Backup[14];
    Q[29] = Q_Backup[15];
    Q[30] = Q_Backup[8];
    Q[31] = Q_Backup[29];
    Q[32] = Q_Backup[2];
    Q[33] = Q_Backup[20];
    Q[34] = Q_Backup[0];
    Q[35] = Q_Backup[31];
    Q[36] = Q_Backup[10];
    Q[37] = Q_Backup[12];
    Q[38] = Q_Backup[6];
    Q[39] = Q_Backup[4];
    Q[40] = Q_Backup[13];
    Q[41] = Q_Backup[43];
    Q[42] = Q_Backup[19];
    Q[43] = Q_Backup[5];
    Q[44] = Q_Backup[42];
    Q[45] = Q_Backup[9];
    Q[46] = Q_Backup[27];
    Q[47] = Q_Backup[3];
}