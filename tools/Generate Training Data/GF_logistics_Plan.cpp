#include"GF_logistics.h"
#include"Tab.h"
#define PI acos(-1)

extern array<double, 7> TargetValue_0;
extern Tab* ShownTab;

extern array<int, 48> MissionsNumber_times;
extern int test;
extern int test_2;
extern fstream txt_Ok;
extern fstream txt_noOk;

class Plan {
    public:
		Plan(int length);
		void CalculateAndPush(int* MissionsNumber);
		void printMissionsNumber_times();
		void print();

    private:
		vector<array<double, 14>> List;
        array<double, 7> TargetValue;
        int List_length;

        double Norm_Target;
        int _MissionsNumber[4];
        array<double, 7> _CurrentValue;
        double _PlanValue_1;
		double _PlanValue_2;

        double getDotProduct(array<double, 7>vector1, array<double, 7>vector2);
        double calculateValue_1();
		double Value_0(double Target, double Current);
		double calculateValue_2();
        bool thisPlanIsBetterThan(int row);
        bool eachCurrentValueIsBigger(int row);

        array<double, 7> CorrectTargetValue() {
            array<double, 4> ResourceValue = CorrectResourceValue();
            array<double, 3> ContractValue = CorrectContractValue();
            array<double, 7> Total;
            for (int i = 0; i < 4; i++) {
                Total[i] = ResourceValue[i];
            }
            for (int i = 4; i < 7; i++) {
                Total[i] = ContractValue[i - 4];
            }
            return Total;
        }
        array<double, 4> CorrectResourceValue() {
            array<double, 4> ResourceValue;
            double Resource_CalibrationValue = 1000;
            for (int i = 0; i < 4; i++) {
                ResourceValue[i] = TargetValue_0[i];
            }
            if (ValuesNotAll0(ResourceValue)) {
                ResourceValue = CorrectValue(ResourceValue, Resource_CalibrationValue);
            }
            return ResourceValue;
        }
        array<double, 3> CorrectContractValue() {
            array<double, 3> ContractValue;
            double Contract_CalibrationValue = 1000;
            for (int i = 0; i < 3; i++) {
                ContractValue[i] = TargetValue_0[i + 4];
            }
            if (ValuesNotAll0(ContractValue)) {
                ContractValue = CorrectValue(ContractValue, Contract_CalibrationValue);
            }
            return ContractValue;
        }
        template<typename T> bool ValuesNotAll0(T Values) {
            for (int i = 0; i < Values.size(); i++) {
                if (Values[i] != 0) return true;
            }
            return false;
        }
        template<typename T> T CorrectValue(const T Values, double CalibrationValue) {
            T Values_0;
            double CorrectionRate = CalibrationValue / ArrayMax(Values);
            for (int i = 0; i < Values.size(); i++) {
                Values_0[i] = CorrectionRate * Values[i];
            }
            return Values_0;
        }
        template<typename T> double ArrayMax(T Arr) {
            double maxValue = 0;
            for (int i = 0; i < Arr.size(); i++) {
                maxValue = max(maxValue, Arr[i]);
            }
            return maxValue;
        }

        template<typename T> double getNorm(T Value_vector) {
            double norm;
            double SumOfSquares = 0;
            for (int i = 0; i < Value_vector.size(); i++) {
                SumOfSquares += pow(Value_vector[i], 2);
            }
            norm = pow(SumOfSquares, 0.5);
            return norm;
        }

        void push_FirstEmptyrow() {
            int row = List_length - 1;
            while (row != 0 && List[row - 1][2] == 0 && List[row - 1][3] == 0) row--;
            PushIntoThisRow(row);
            SortListByValue(row);
        }
        void push() {
            if (!thisPlanIsBetterThan(List_length - 1)) return;
            PushIntoThisRow(List_length - 1);
            SortListByValue(List_length - 1);
        }
        void PushIntoThisRow(int RowNumber) {
            for (int i = 0; i < 4; i++) {
                List[RowNumber][i] = _MissionsNumber[i];
            }
            for (int i = 0; i < 7; i++) {
                List[RowNumber][i + 4] = _CurrentValue[i];
            }
            List[RowNumber][11] = _PlanValue_1;
			List[RowNumber][12] = _PlanValue_2;
        }
        void SortListByValue(int thisrow) {
            for (int i = thisrow - 1; i >= 0; i--) {
                if (thisPlanIsBetterThan(i)) {
                    ExchangeTheseTwoRows(i);
                }
                else break;
            }
        }
        void ExchangeTheseTwoRows(int RowNumber) {
            for (int i = 0; i < 14; i++) {
                List[RowNumber + 1][i] = List[RowNumber][i];
            }
            PushIntoThisRow(RowNumber);
        }
};

Plan::Plan(int length) {
	List_length = length;
	array<double, 14> row = { 0,0,0,0,0,0,0,0,0,0,0,0,0,0 };
	for (int i = 0; i < List_length; i++) {
		//List.insert(List.begin(), 1, row);
		List.push_back(row);
	}
	TargetValue = CorrectTargetValue();
	Norm_Target = getNorm(TargetValue);
}

void Plan::CalculateAndPush(int* MissionsNumber) {
	_MissionsNumber[0] = MissionsNumber[0];
	_MissionsNumber[1] = MissionsNumber[1];
	_MissionsNumber[2] = MissionsNumber[2];
	_MissionsNumber[3] = MissionsNumber[3];
	_CurrentValue = ShownTab->Calculate_Current(MissionsNumber);
	_PlanValue_1 = calculateValue_1();
	_PlanValue_2 = calculateValue_2();
	if (List[List_length - 1][2] == 0 && List[List_length - 1][3] == 0) {
		push_FirstEmptyrow();
	}
	else push();
}

double Plan::calculateValue_1() {
	test++;
    _CurrentValue[4] *= 500;
    _CurrentValue[5] *= 500;
    _CurrentValue[6] *= 500;
    double Norm_Current = getNorm(_CurrentValue);
    double Dot_product = getDotProduct(_CurrentValue, TargetValue);
    double CurrentScalarProjection = Dot_product / Norm_Target;
    double COStheta = CurrentScalarProjection / Norm_Current;
    double theta = acos(COStheta);
    double CosineSimilarity_0 = 1 - 2 * theta / PI;
    double CosineSimilarity = pow(CosineSimilarity_0, 2);
    _CurrentValue[4] /= 500;
    _CurrentValue[5] /= 500;
    _CurrentValue[6] /= 500;
    return CurrentScalarProjection * CosineSimilarity;
}
double Plan::getDotProduct(array<double, 7>vector1, array<double, 7>vector2) {
    double Dot_product = 0;
    for (int i = 0; i < 7; i++) {
        Dot_product += (vector1[i] * vector2[i]);
    }
    return Dot_product;
}

double Plan::calculateValue_2() {
	return Value_0(TargetValue[0], _CurrentValue[0]) + Value_0(TargetValue[1], _CurrentValue[1]) +
		Value_0(TargetValue[2], _CurrentValue[2]) + Value_0(TargetValue[3], _CurrentValue[3]);
}
double Plan::Value_0(double Target, double Current) {
	if (Target == 0) return 0;
	if (Target > Current) {//Y=5.5*x^3+4.5*x
		return (Target - Current) * (5.5 * pow((Target - Current) / Target, 3) + 4.5 * (Target - Current) / Target);
	}
	else {//Y=-0.04*x^3 -0.01*x
		return (Target - Current) * (-0.04 * pow((Target - Current) / Target, 3) - 0.01 * (Target - Current) / Target);
	}
}

bool Plan::thisPlanIsBetterThan(int number) {
	test_2++;
    /*if (eachCurrentValueIsBigger(number)) return true;
    else {
        if (_PlanValue_1 > List[number][11]) return true;
        else return false;
    }*/
	if ((_PlanValue_1 > List[number][11] && _PlanValue_2 < List[number][12])|| (_PlanValue_1 <= List[number][11] && _PlanValue_2 >= List[number][12])) {
		txt_Ok << TargetValue[0] << ",";
		txt_Ok << TargetValue[1] << ",";
		txt_Ok << TargetValue[2] << ",";
		txt_Ok << TargetValue[3] << ",";
		txt_Ok << TargetValue[4] << ",";
		txt_Ok << TargetValue[5] << ",";
		txt_Ok << TargetValue[6] << ",";
		txt_Ok << _CurrentValue[0] << ",";
		txt_Ok << _CurrentValue[1] << ",";
		txt_Ok << _CurrentValue[2] << ",";
		txt_Ok << _CurrentValue[3] << ",";
		txt_Ok << _CurrentValue[4] << ",";
		txt_Ok << _CurrentValue[5] << ",";
		txt_Ok << _CurrentValue[6] << ",";
		txt_Ok << List[number][4] << ",";
		txt_Ok << List[number][5] << ",";
		txt_Ok << List[number][6] << ",";
		txt_Ok << List[number][7] << ",";
		txt_Ok << List[number][8] << ",";
		txt_Ok << List[number][9] << ",";
		txt_Ok << List[number][10] << ",";
		if (_PlanValue_1 > List[number][11] && _PlanValue_2 < List[number][12]) {
			txt_Ok << 0 << endl;
		}
		else {
			txt_Ok << 1 << endl;
		}
		
	}
	else {
		txt_noOk << TargetValue[0] << ",";
		txt_noOk << TargetValue[1] << ",";
		txt_noOk << TargetValue[2] << ",";
		txt_noOk << TargetValue[3] << ",";
		txt_noOk << TargetValue[4] << ",";
		txt_noOk << TargetValue[5] << ",";
		txt_noOk << TargetValue[6] << ",";
		txt_noOk << _CurrentValue[0] << ",";
		txt_noOk << _CurrentValue[1] << ",";
		txt_noOk << _CurrentValue[2] << ",";
		txt_noOk << _CurrentValue[3] << ",";
		txt_noOk << _CurrentValue[4] << ",";
		txt_noOk << _CurrentValue[5] << ",";
		txt_noOk << _CurrentValue[6] << ",";
		txt_noOk << List[number][4] << ",";
		txt_noOk << List[number][5] << ",";
		txt_noOk << List[number][6] << ",";
		txt_noOk << List[number][7] << ",";
		txt_noOk << List[number][8] << ",";
		txt_noOk << List[number][9] << ",";
		txt_noOk << List[number][10] << ",";
		txt_noOk << endl;
	}

	if (_PlanValue_1 > List[number][11]) return true;
	else return false;
}
bool Plan::eachCurrentValueIsBigger(int number) {
    for (int i = 0; i < 7; i++) {
        if (_CurrentValue[i] < List[number][i + 4]) return false;
    }
    return true;
}

void Plan::printMissionsNumber_times() {
	for (int i = 0; i < List_length; i++) {
		for (int ii = 0; ii < 4; ii++) {
			MissionsNumber_times[List[i][ii]]++;
		}
	}
}

void Plan::print() {

}