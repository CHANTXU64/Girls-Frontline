#include"GF_logistics.h"
class Tab {
public:
	virtual void setTime();
	void _setTime(double Time);
	double _getTime();

	void setResourceIncreasingRate();
	
	bool notInLimitTime(double xTime, double startTime, double endTime);
	virtual vector<int> SetUnableLogisticCustomize_1(vector<int>& UnableLogistic);
	virtual vector<int> SetUnableLogisticCustomize_2(vector<int>& UnableLogistic);
	vector<int> GetUnableLogistic();

	virtual array<double, 7> Calculate_Current(int* MissionsNumber);
	array<double, 7> calculateCurrentByResourceIncreasingRate(array<double, 7> CurrentValue);
private:
	double ResourceIncreasingRate;
	double TotalTime;
};

class Tab_Anytime : public Tab {
public:
	void setTime();
	array<double, 7> Calculate_Current(int* Number);
};
class Tab_SingleTime : public Tab {
public:
	void setTime();
	vector<int> SetUnableLogisticCustomize_2(vector<int>& UnableLogistic);
	array<double, 7> Calculate_Current(int* Number);
};
class Tab_Timetable : public Tab {
public:
	vector<double> TimeList;
	void setTime();
	vector<int> SetUnableLogisticCustomize_2(vector<int>& UnableLogistic);
	array<double, 7> Calculate_Current(int* Number);
};
class Tab_Intervals : public Tab {
public:
	void setTime();
	array<double, 7> Calculate_Current(int* Number);
};