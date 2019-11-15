#include"GF_logistics.h"
#include"Plan.h"

extern array<double, 7> TargetValue_html;

array<double, 7> getTargetByList(vector<array<double, 14>> List);
vector<double> getTarget0html(int Target0length, Plan* plan);
vector<double> getCurrent0MAX(int Target0length, Plan* plan);
double getCalibration(vector<double> Target_0, Plan* plan);

array<double, 7> CorrectTargetValueByPlanList(Plan* plan) {
    array<double, 7> TargetValue = getTargetByList(plan->getList());
    vector<double> Target_Resource;
    for (int i = 0; i < 4; i++) {
        Target_Resource.push_back(TargetValue[i]);
    }
    vector<double> Target_Contract;
    for (int i = 0; i < 3; i++) {
        Target_Contract.push_back(TargetValue[i + 4]);
    }
    double Resource_CalibrationValue = getCalibration(Target_Resource, plan);
    double Contract_CalibrationValue = getCalibration(Target_Contract, plan);
    for (int i = 0; i < 4; i++) {
        if (Resource_CalibrationValue != 0) {
            TargetValue[i] = TargetValue_html[i] / Resource_CalibrationValue;
        }
        else {
            TargetValue[i] = 0;
        }
    }
    for (int i = 4; i < 7; i++) {
        if (Contract_CalibrationValue != 0) {
            TargetValue[i] = TargetValue_html[i] / Contract_CalibrationValue;
        }
        else {
            TargetValue[i] = 0;
        }
    }
    return TargetValue;
}

array<double, 7> getTargetByList(vector<array<double, 14>> List) {
    array<double, 7> TargetValue = { 0 };
    for (int i = 0; i < List.size(); i++) {
        for (int ii = 0; ii < 7; ii++) {
            TargetValue[ii] += List[i][ii + 4];
            if (i != 0) {
                TargetValue[ii] /= 2;
            }
        }
    }
    return TargetValue;
}

template<typename T> double ArrayMax(const T& Arr) {
    double maxValue = 0;
    for (int i = 0; i < Arr.size(); i++) {
        maxValue = max(maxValue, Arr[i]);
    }
    return maxValue;
}

double getCalibration(vector<double> Target_0, Plan* plan) {
    vector<double> Target_0_html = getTarget0html(Target_0.size(), plan);
    vector<double> Current_0_MAX = getCurrent0MAX(Target_0.size(), plan);
    double Calibration = 0;
    for (int i = 0; i < Target_0.size(); i++) {
        if (Target_0[i] != 0) {
            Calibration += (Target_0_html[i] / Target_0[i]);
            if (i != 0) {
                Calibration /= 2;
            }
        }
    }
    if (Calibration == 0) {
        double Current_0_AMAX = 0;
        for (int i = 0; i < Target_0.size(); i++) {
            if (Current_0_MAX[i] != 0) {
                Current_0_AMAX += Current_0_MAX[i];
                if (i != 0) {
                    Current_0_AMAX /= 2;
                }
            }
        }
        double Target_0_html_MAX = ArrayMax(Target_0_html);
        Calibration = Target_0_html_MAX / Current_0_AMAX;
    }
    return Calibration;
}
vector<double> getTarget0html(int Target0length, Plan* plan) {
    vector<double> Target_0_html;
    if (Target0length == 4) {
        Target_0_html.push_back(TargetValue_html[0]);
        Target_0_html.push_back(TargetValue_html[1]);
        Target_0_html.push_back(TargetValue_html[2]);
        Target_0_html.push_back(TargetValue_html[3]);
    }
    else {
        Target_0_html.push_back(TargetValue_html[4]);
        Target_0_html.push_back(TargetValue_html[5]);
        Target_0_html.push_back(TargetValue_html[6]);
    }
    return Target_0_html;
}
vector<double> getCurrent0MAX(int Target0length, Plan* plan) {
    vector<double> Current_0_MAX;
    array<double, 7> CurrentValue = plan->getCurrentValueMAX();
    if (Target0length == 4) {
        Current_0_MAX.push_back(CurrentValue[0]);
        Current_0_MAX.push_back(CurrentValue[1]);
        Current_0_MAX.push_back(CurrentValue[2]);
        Current_0_MAX.push_back(CurrentValue[3]);
    }
    else {
        Current_0_MAX.push_back(CurrentValue[4]);
        Current_0_MAX.push_back(CurrentValue[5]);
        Current_0_MAX.push_back(CurrentValue[6]);
    }
    return Current_0_MAX;
}