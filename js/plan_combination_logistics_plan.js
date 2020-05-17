class PC_LogisticsPlan {
    static init(data) {
        if (data !== "noStorage" && data !== undefined) {
            this._startDate = data.startDate;
            this._endDate = data.endDate;
            this._totalDays = data.totalDays;
            this._totalTimePerDay = data.totalTimePerDay;
            this._plans = data.plans;
            this._plansNumber = data.plansNumber;
            if (this._plans.length !== 0)
                PlanCombination_disabledDate();
        }
        else {
            let startDate = Input_getPC_startDate();
            let endDate = Input_getPC_endDate();
            this._startDate = startDate;
            this._endDate = endDate;
            let days = calcDaysBetween2Dates(startDate, endDate);
            if (days > 0) {
                this._totalDays = days;
                this._totalTimePerDay = new Array(days);
                this._totalTimePerDay.fill(0);
            }
            this._plans = [];
            this._plansNumber = 0;
        }
        this.setStorage();
    }

    static changeDate(newStartDate, newEndDate) {
        let data = {};
        data.startDate = newStartDate;
        data.endDate = newEndDate;
        data.totalDays = calcDaysBetween2Dates(newStartDate, newEndDate);
        data.plansNumber = this._plansNumber;
        let startDate = this._startDate;
        let endDate = this._endDate;
        let interval_startDate = calcDaysBetween2Dates(startDate, newStartDate);
        let interval_endDate = calcDaysBetween2Dates(endDate, newEndDate);
        if (interval_startDate > 0) {
            this._changeDate_PostponeStartDate(interval_startDate, newStartDate);
        }
        else if (interval_startDate < 0) {
            this._changeDate_AdvanceStartDate(-interval_startDate);
        }
        if (interval_endDate > 0) {
            this._changeDate_PostponeEndDate(interval_endDate);
        }
        else if (interval_endDate < 0) {
            this._changeDate_AdvanceEndDate(-interval_endDate, newStartDate, data.totalDays);
        }
        data.totalTimePerDay = this._totalTimePerDay;
        data.plans = this._plans;
        this.init(data);
    }
    static _changeDate_PostponeStartDate(interval_startDate, newStartDate) {
        this._totalTimePerDay.splice(0, interval_startDate);
        for (let i = 0; i < this._plans.length; ++i) {
            let plan = this._plans[i];
            let PlanName = "";
            for (let ii = 0; ii < plan.timePeriod.length; ++ii) {
                if (plan.timePeriod[ii][1] <= interval_startDate) {
                    plan.timePeriod.splice(ii, 1);
                    --ii;
                }
                else {
                    plan.timePeriod[ii][0] = Math.max(plan.timePeriod[ii][0] - interval_startDate, 0);
                    plan.timePeriod[ii][1] -= interval_startDate;
                    PlanName += addDate(newStartDate, plan.timePeriod[ii][0]).slice(5) + '~';
                    PlanName += addDate(newStartDate, plan.timePeriod[ii][1]).slice(5) + ', ';
                }
            }
            if (plan.timePeriod.length === 0) {
                this._plans.splice(i, 1);
                --i;
                continue;
            }
            PlanName = PlanName.slice(0, -2);
            plan.saved.name = PlanName;
        }
    }
    static _changeDate_AdvanceStartDate(interval_startDate) {
        for (let i = 0; i < interval_startDate; ++i) {
            this._totalTimePerDay.unshift(0);
        }
        for (let i = 0; i < this._plans.length; ++i) {
            let plan = this._plans[i];
            for (let ii = 0; ii < plan.timePeriod.length; ++ii) {
                plan.timePeriod[ii][0] += interval_startDate;
                plan.timePeriod[ii][1] += interval_startDate;
            }
        }
    }
    static _changeDate_PostponeEndDate(interval_endDate) {
        for (let i = 0; i < interval_endDate; ++i) {
            this._totalTimePerDay.push(0);
        }
    }
    static _changeDate_AdvanceEndDate(interval_endDate, newStartDate, totalDays) {
        this._totalTimePerDay.splice(-interval_endDate, interval_endDate);
        for (let i = 0; i < this._plans.length; ++i) {
            let plan = this._plans[i];
            let PlanName = "";
            for (let ii = 0; ii < plan.timePeriod.length; ++ii) {
                if (plan.timePeriod[ii][0] >= totalDays) {
                    plan.timePeriod.splice(ii, 1);
                    --ii;
                }
                else {
                    plan.timePeriod[ii][1] = Math.min(plan.timePeriod[ii][1], totalDays);
                    PlanName += addDate(newStartDate, plan.timePeriod[ii][0]).slice(5) + '~';
                    PlanName += addDate(newStartDate, plan.timePeriod[ii][1]).slice(5) + ', ';
                }
            }
            if (plan.timePeriod.length === 0) {
                this._plans.splice(i, 1);
                --i;
                continue;
            }
            PlanName = PlanName.slice(0, -2);
            plan.saved.name = PlanName;
        }
    }

    static reset() {
        let startDate = Input_getPC_startDate();
        let endDate = Input_getPC_endDate();
        this._startDate = startDate;
        this._endDate = endDate;
        this._plans = [];
        this._plansNumber = 0;
        let days = calcDaysBetween2Dates(startDate, endDate);
        if (days > 0) {
            this._totalDays = days;
            this._totalTimePerDay = new Array(days);
            this._totalTimePerDay.fill(0);
        }
        this.setStorage();
    }

    static setStorage() {
        let data = this.exportData();
        PC_storageSetItem("LogisticsPlan", data);
    }

    static exportData() {
        let data = {};
        data.startDate = this._startDate;
        data.endDate = this._endDate;
        data.totalDays = this._totalDays;
        data.totalTimePerDay = this._totalTimePerDay;
        data.plans = this._plans;
        data.plansNumber = this._plansNumber;
        return data;
    }

    static add() {
        let timePeriod = PlanCombinationTimePeriod.getTimePeriod();
        let timePeriod_length = timePeriod.length;
        if (timePeriod_length === 0) {
            Modal.alert(language.JS.PC_L_alert1);
            return ;
        }
        if (this._plans.length >= 32) {
            Modal.alert(language.JS.PC_L_alert3);
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
                    let date = addDate(this._startDate, ii);
                    Modal.alert(language.JS.PC_L_alert2_1 + date + language.JS.PC_L_alert2_2);
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
        const is_calcByHour = false;
        newPlan.reAndco = Saved.getReAndCoBySaved(newPlan.saved, is_calcByHour);
        this._plans.push(newPlan);

        PlanCombinationTimePeriod.clear();
        PlanCombination_disabledDate();
        this._plansHasChanged();
    }

    static apply(plan_number) {
        document.getElementById("LogisticsConsumptionPlanSwitch").checked = false;
        switchLogisticsSetting();
        let index = 0;
        while(1) {
            if (this._plans[index].number === plan_number)
                break;
            ++index;
        }
        Saved.apply(this._plans[index].saved);
        PlanCombinationTimePeriod.setTimePeriod(this._plans[index].timePeriod);
    }

    static deleteAll() {
        this.reset();
        PlanCombination_enabledDate();
        this._plansHasChanged();
    }

    static deleteThis(plan_number) {
        let index = 0;
        while(1) {
            if (this._plans[index].number === plan_number)
                break;
            ++index;
        }
        let totalTime = this._plans[index].time;
        let timePeriod_length = this._plans[index].timePeriod.length;
        for (let i = 0; i < timePeriod_length; ++i) {
            let startDate = this._plans[index].timePeriod[i][0];
            let endDate = this._plans[index].timePeriod[i][1];
            for (let ii = startDate; ii < endDate; ++ii) {
                this._totalTimePerDay[ii] -= totalTime;
            }
        }
        this._plans.splice(index, 1);
        this._plansHasChanged();
        if (this._plans.length === 0 && PC_ConsumptionPlan._plans.length === 0)
            PlanCombination_enabledDate();
    }

    static _plansHasChanged() {
        PlanCombinationChart.printFromLogisticsPlan(this._plans);
        this.setStorage();
    }

    static chartGetPlans() {
        return this._plans;
    }

    static rankingGetPlans() {
        return this._plans;
    }
}

PC_LogisticsPlan._plans = [];
PC_LogisticsPlan._plansNumber = 0;
PC_LogisticsPlan._startDate = "";
PC_LogisticsPlan._endDate = "";
PC_LogisticsPlan._totalDays = 0;
PC_LogisticsPlan._totalTimePerDay = [];
