class Plan {
public:
    Plan(int length);
    Plan(int length, array<double, 7> CalibratedTarget);
    void CalculateAndPush(int* MissionsNumber);
    void printMissionsNumber_times();
    void print();
    vector<array<double, 14>> getList();
    array<double, 7> getCurrentValueMAX();
private:
    vector<array<double, 14>> List;
    array<double, 7> TargetValue;
    int List_length;
    array<double, 7> CurrentValue_MAX;

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

    array<double, 7> CorrectTargetValue();
    array<double, 4> CorrectResourceValue();
    array<double, 3> CorrectContractValue();
    template<typename T> bool ValuesNotAll0(T Values);
    template<typename T> T CorrectValue(const T Values, double CalibrationValue);
    template<typename T> double ArrayMax(T Arr);
    template<typename T> double getNorm(T Value_vector);
    void push_FirstEmptyrow();
    void push();
    void PushIntoThisRow(int RowNumber);
    void SortListByValue(int thisrow);
    void ExchangeTheseTwoRows(int RowNumber);
};