#include"GF_logistics.h"

extern int GreatSuccessRate;
extern int GreatSuccessRate_UP;
extern double Time_Limit_start;
extern double Time_Limit_end;
extern double Time_TotalTime;
extern vector<double> Time_Tab_Timetable_TimeList;
extern array<array<double, 9>, 48> Q;
extern int MapLimit;
template<typename T> int indexOf(const vector<T>& myvector, const T& value);
template<typename T> vector<T> splice(const vector<T>& myvector, const int number);
vector<int> SetUnableLogistic();

class Tab {
    public:
		virtual void setTime();
        void _setTime(double Time) {
            TotalTime = Time;
        }
        double _getTime() {
            return TotalTime;
        }

		void setResourceIncreasingRate();
        
		bool notInLimitTime(double xTime, double startTime, double endTime) {
            if (xTime < startTime && abs(xTime - startTime) > 0.02) return true;
            if (xTime > endTime && abs(xTime - endTime) > 0.02) return true;
            return false;
        }
		virtual vector<int> SetUnableLogisticCustomize_1(vector<int>& UnableLogistic);
		virtual vector<int> SetUnableLogisticCustomize_2(vector<int>& UnableLogistic);
		vector<int> GetUnableLogistic(); 
        
		virtual array<double, 7> Calculate_Current(int* MissionsNumber);
        array<double, 7> calculateCurrentByResourceIncreasingRate(array<double, 7> CurrentValue) {
            for (int i = 0; i < 4; i++) {
                CurrentValue[i] *= ResourceIncreasingRate;
            }
            return CurrentValue;
        }

    private:
        double ResourceIncreasingRate;
        double TotalTime;
};
void Tab::setTime() {};
void Tab::setResourceIncreasingRate() {
	ResourceIncreasingRate = 1 + ((double)GreatSuccessRate + (double)GreatSuccessRate_UP) / 200;
}
vector<int> Tab::GetUnableLogistic() {
	vector<int> Unable_0, Unable_1, Unable_2;
	Unable_0 = SetUnableLogistic();
	Unable_1 = SetUnableLogisticCustomize_1(Unable_0);
	Unable_2 = SetUnableLogisticCustomize_2(Unable_1);
	return Unable_2;
}
vector<int> Tab::SetUnableLogisticCustomize_1(vector<int>& UnableLogistic) {
	double startTime = Time_Limit_start;
	double endTime = Time_Limit_end;
	for (int i = 0; i < Q.size(); i++) {
		if (notInLimitTime(Q[i][8], startTime, endTime)) {
			if (indexOf(UnableLogistic, i) == -1) {
				UnableLogistic.push_back(i);
			}
		}
	}
	return UnableLogistic;
}
vector<int> Tab::SetUnableLogisticCustomize_2(vector<int>& UnableLogistic) {
	return UnableLogistic;
}
array<double, 7> Tab::Calculate_Current(int* MissionsNumber) {
	return { 0, 0, 0, 0, 0, 0, 0 };
}

class Tab_Anytime : public Tab {
    public:
		void setTime();
		array<double, 7> Calculate_Current(int* Number);
};
void Tab_Anytime::setTime() {
	_setTime(Time_TotalTime);
}
array<double, 7> Tab_Anytime::Calculate_Current(int* Number) {
	array<double, 7> CurrentValue;
	for (int i = 0; i < 7; i++) {
		CurrentValue[i] = Q[Number[0]][i + 1] + Q[Number[1]][i + 1] + Q[Number[2]][i + 1] + Q[Number[3]][i + 1];
	}
	return calculateCurrentByResourceIncreasingRate(CurrentValue);
}

class Tab_SingleTime : public Tab {
    public:
		void setTime();
		vector<int> SetUnableLogisticCustomize_2(vector<int>& UnableLogistic);
		array<double, 7> Calculate_Current(int* Number);
};
void Tab_SingleTime::setTime() {
	_setTime(Time_TotalTime);
}
vector<int> Tab_SingleTime::SetUnableLogisticCustomize_2(vector<int>& UnableLogistic) {
	double Time = _getTime();
	for (int i = 0; i < Q.size(); i++) {
		if (Q[i][8] > Time) {
			if (indexOf(UnableLogistic, i) == -1) {
				UnableLogistic.push_back(i);
			}
		}
	}
	return UnableLogistic;
}
array<double, 7> Tab_SingleTime::Calculate_Current(int* Number) {
	array<double, 7> CurrentValue;
	for (int i = 0; i < 7; i++) {
		CurrentValue[i] = (Q[Number[0]][i + 1] * Q[Number[0]][8] + Q[Number[1]][i + 1] * Q[Number[1]][8] + Q[Number[2]][i + 1] * Q[Number[2]][8] + Q[Number[3]][i + 1] * Q[Number[3]][8]) / _getTime();
	}
	return calculateCurrentByResourceIncreasingRate(CurrentValue);
}

class Tab_Timetable : public Tab {
    public:
        vector<double> TimeList;
		void setTime();
		vector<int> SetUnableLogisticCustomize_2(vector<int>& UnableLogistic);
		array<double, 7> Calculate_Current(int* Number);
};
void Tab_Timetable::setTime() {
	_setTime(Time_TotalTime);
	TimeList.push_back(0);
	for (int i = 0; i < Time_Tab_Timetable_TimeList.size(); i++) {
		TimeList.push_back(Time_Tab_Timetable_TimeList[i]);
	}
	TimeList.push_back(_getTime());
}
vector<int> Tab_Timetable::SetUnableLogisticCustomize_2(vector<int>& UnableLogistic) {
	double Time = _getTime();
	for (int i = 0; i < Q.size(); i++) {
		if (Q[i][8] > Time) {
			if (indexOf(UnableLogistic, i) == -1) {
				UnableLogistic.push_back(i);
			}
		}
	}
	return UnableLogistic;
}
array<double, 7> Tab_Timetable::Calculate_Current(int* Number) {
	double Time = _getTime();
	array<double, 7> CurrentValue;
	int times[4] = { 0, 0, 0, 0 };
	double CurrentValue_n[7][4] = { 0 };
	for (int i = 0; i < 4; i++) {
		vector<double> Time_List;
		for (int ii = 0; ii < TimeList.size(); ii++) {
			Time_List.push_back(TimeList[ii]);
		}
		for (int ii = 1; ii < Time_List.size(); ii++) {
			if (Q[Number[i]][8] <= Time_List[ii] - Time_List[0]) {
				times[i]++;
				Time_List = splice(Time_List, ii);
				ii = 0;
			}
		}
		for (int ii = 0; ii < 7; ii++) {
			CurrentValue_n[ii][i] = Q[Number[i]][ii + 1] * Q[Number[i]][8] * times[i] / Time;
		}
	}
	for (int i = 0; i < 7; i++) {
		CurrentValue[i] = CurrentValue_n[i][0] + CurrentValue_n[i][1] + CurrentValue_n[i][2] + CurrentValue_n[i][3];
	}
	return calculateCurrentByResourceIncreasingRate(CurrentValue);
}

class Tab_Intervals : public Tab {
	public:
		void setTime();
		array<double, 7> Calculate_Current(int* Number);
};
void Tab_Intervals::setTime() {
	_setTime(Time_TotalTime);
}
array<double, 7> Tab_Intervals::Calculate_Current(int* Number) {
	double Time = _getTime();
	array<double, 7> CurrentValue;
	int times[4] = { 1, 1, 1, 1 };
	double CurrentValue_n[7][4] = { 0 };
	for (int i = 0; i < 4; i++) {
		while (times[i] * Time < Q[Number[i]][8]) times[i]++;
		for (int ii = 0; ii < 7; ii++) {
			CurrentValue_n[ii][i] = Q[Number[i]][ii + 1] * Q[Number[i]][8] / (times[i] * Time);
		}
	}
	for (int i = 0; i < 7; i++) {
		CurrentValue[i] = CurrentValue_n[i][0] + CurrentValue_n[i][1] + CurrentValue_n[i][2] + CurrentValue_n[i][3];
	}
	return calculateCurrentByResourceIncreasingRate(CurrentValue);
}

template<typename T>
vector<T> splice(const vector<T>& myvector, const int number) {
    vector<T> othervector;
    for (int i = number; i < myvector.size(); i++) {
        othervector.push_back(myvector[i]);
    }
    return othervector;
}

vector<int> SetUnableLogistic() {
    vector<double> UnableMap;
    switch (MapLimit) {
        case 6:
            UnableMap = {28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47}; break;
        case 7:
            UnableMap = {32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47}; break;
        case 8:
            UnableMap = {36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47}; break;
        case 9:
            UnableMap = {40, 41, 42, 43, 44, 45, 46, 47}; break;
        case 10:
            UnableMap = {44, 45, 46, 47}; break;
        case 11:
            UnableMap = {}; break;
        default:
            UnableMap = {};
    }
    vector<int> UnableNumber;
    for (int i = 0; i < Q.size(); i++) {
        if (indexOf(UnableMap, Q[i][0]) != -1) UnableNumber.push_back(i);
    }
    return UnableNumber;
}

template<typename T>
int indexOf(const vector<T>& myvector, const T& value) {
    auto it = find(myvector.begin(), myvector.end(), value);
    int index;
    if (it != myvector.end()) index = distance(myvector.begin(), it);
    else index = -1;
    return index;
}

