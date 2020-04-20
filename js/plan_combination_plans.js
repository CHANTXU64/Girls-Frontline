class PlanCombinationPlans {
    static init() {
        let startDate = Input_getPC_startDate();
        let endDate = Input_getPC_endDate();
        this.clear();
        this._startDate = startDate;
        this._endDate = endDate;
        let days = calcDaysBetween2Dates(startDate, endDate);
        if (days > 0) {
            this._totalDays = days;
            this._totalTimePerDay = new Array(days);
            this._totalTimePerDay.fill(0);
        }
    }

    static clear() {
        this._startDate = "";
        this._endDate = "";
        this._plans = [];
        this._plansNumber = 0;
        this._totalDays = 0;
        this._totalTimePerDay = [];
    }

    static add() {
        let timePeriod = PlanCombinationTimePeriod.getTimePeriod();
        let timePeriod_length = timePeriod.length;
        if (timePeriod_length === 0) {

            return ;
        }
        let PlanName = "";
        for (let i = 0; i < timePeriod_length; ++i) {
            PlanName += timePeriod[i][0].slice(5) + '~' + timePeriod[i][1].slice(5) + ', ';
            timePeriod[i][0] = calcDaysBetween2Dates(this._startDate, timePeriod[i][0]);
            timePeriod[i][1] = calcDaysBetween2Dates(this._startDate, timePeriod[i][1]);
        }
        PlanName = PlanName.slice(0, -2);

        let tab = getShownTab();
        let planTime = tab.getTotalTime();
        let totalTimePerDay_backup = this._totalTimePerDay.slice();
        for (let i = 0; i < timePeriod_length; ++i) {
            let start = timePeriod[i][0];
            let end = timePeriod[i][1];
            for (let ii = start; ii < end; ++ii) {
                this._totalTimePerDay[ii] += planTime;
                if (this._totalTimePerDay[ii] > 1440) {
                    this._totalTimePerDay = totalTimePerDay_backup;

                    return ;
                }
            }
        }

        let savedData = Saved.getSavedDataFromPage(PlanName);
        let newPlan = {};
        newPlan.timePeriod = timePeriod;
        newPlan.saved = savedData;
        newPlan.time = planTime;
        newPlan.number = this._plansNumber++;
        this._plans.push(newPlan);

        PlanCombinationTimePeriod.clear();
        PlanCombination_disabledDate();
        this._plansHasChanged();
    }

    static deleteAll() {
        this.clear();
        PlanCombination_enabledDate();
        this._plansHasChanged();
    }

    static _plansHasChanged() {
        this._printChart();
    }

    static _printChart() {
        let data = [];
        let plan_length = this._plans.length;
        for (let i = 0; i < plan_length; ++i) {
            let newData = {};
            newData.time = this._plans[i].time;
            newData.timePeriod = [];
            newData.number = this._plans[i].number;
            let timePeriod_length = this._plans[i].timePeriod.length;
            for (let ii = 0; ii < timePeriod_length; ++ii) {
                newData.timePeriod.push(this._plans[i].timePeriod[ii].slice());
            }
            data.push(newData);
        }
        PlanCombinationCharts.printChart_Timetable(data);
    }
}

PlanCombinationPlans._plans = [];
PlanCombinationPlans._plansNumber = 0;
PlanCombinationPlans._startDate = "";
PlanCombinationPlans._endDate = "";
PlanCombinationPlans._totalDays = 0;
PlanCombinationPlans._totalTimePerDay = [];
