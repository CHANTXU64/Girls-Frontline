class PC_ConsumptionPlan {
    static init(data) {
        this._table_clear();
        if (data !== "noStorage" && data !== undefined) {
            this._startDate = data.startDate;
            this._endDate = data.endDate;
            this._totalDays = data.totalDays;
            this._planFlag = data.planFlag;
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
                this._planFlag = new Array(days);
                this._planFlag.fill(0);
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
            this._changeDate_PostponeStartDate(interval_startDate);
        }
        else if (interval_startDate < 0) {
            this._changeDate_AdvanceStartDate(-interval_startDate);
        }
        if (interval_endDate > 0) {
            this._changeDate_PostponeEndDate(interval_endDate);
        }
        else if (interval_endDate < 0) {
            this._changeDate_AdvanceEndDate(-interval_endDate, data.totalDays);
        }
        data.planFlag = this._planFlag;
        data.plans = this._plans;
        this.init(data);
    }
    static _changeDate_PostponeStartDate(interval_startDate) {
        this._planFlag.splice(0, interval_startDate);
        for (let i = 0; i < this._plans.length; ++i) {
            let plan = this._plans[i];
            for (let ii = 0; ii < plan.timePeriod.length; ++ii) {
                if (plan.timePeriod[ii][1] <= interval_startDate) {
                    plan.timePeriod.splice(ii, 1);
                    --ii;
                }
                else {
                    plan.timePeriod[ii][0] = Math.max(plan.timePeriod[ii][0] - interval_startDate, 0);
                    plan.timePeriod[ii][1] -= interval_startDate;
                }
            }
            if (plan.timePeriod.length === 0) {
                this._plans.splice(i, 1);
                --i;
                continue;
            }
            plan.TimetableData = this._calcTimetableData(plan.timePeriod);
        }
    }
    static _changeDate_AdvanceStartDate(interval_startDate) {
        for (let i = 0; i < interval_startDate; ++i) {
            this._planFlag.unshift(0);
        }
        for (let i = 0; i < this._plans.length; ++i) {
            let plan = this._plans[i];
            for (let ii = 0; ii < plan.timePeriod.length; ++ii) {
                plan.timePeriod[ii][0] += interval_startDate;
                plan.timePeriod[ii][1] += interval_startDate;
            }
            plan.TimetableData = this._calcTimetableData(plan.timePeriod);
        }
    }
    static _changeDate_PostponeEndDate(interval_endDate) {
        for (let i = 0; i < interval_endDate; ++i) {
            this._planFlag.push(0);
        }
    }
    static _changeDate_AdvanceEndDate(interval_endDate, totalDays) {
        this._planFlag.splice(-interval_endDate, interval_endDate);
        for (let i = 0; i < this._plans.length; ++i) {
            let plan = this._plans[i];
            for (let ii = 0; ii < plan.timePeriod.length; ++ii) {
                if (plan.timePeriod[ii][0] >= totalDays) {
                    plan.timePeriod.splice(ii, 1);
                    --ii;
                }
                else {
                    plan.timePeriod[ii][1] = Math.min(plan.timePeriod[ii][1], totalDays);
                }
            }
            if (plan.timePeriod.length === 0) {
                this._plans.splice(i, 1);
                --i;
                continue;
            }
            plan.TimetableData = this._calcTimetableData(plan.timePeriod);
        }
    }

    static reset() {
        let startDate = Input_getPC_startDate();
        let endDate = Input_getPC_endDate();
        this._startDate = startDate;
        this._endDate = endDate;
        this._plans = [];
        this._table_clear();
        this._plansNumber = 0;
        this._tableNumber = 0;
        let days = calcDaysBetween2Dates(startDate, endDate);
        if (days > 0) {
            this._totalDays = days;
            this._planFlag = new Array(days);
            this._planFlag.fill(0);
        }
    }

    static setStorage() {
        let data = this.exportData();
        PC_storageSetItem("ConsumptionPlan", data);
    }

    static exportData() {
        let data = {};
        data.startDate = this._startDate;
        data.endDate = this._endDate;
        data.totalDays = this._totalDays;
        data.planFlag = this._planFlag;
        data.plans = this._plans;
        data.plansNumber = this._plansNumber;
        return data;
    }

    static table_add() {
        let consumption = Input_getPC_Consumption_reAndco();
        let times = Input_getPC_Consumption_times();
        let html = this._table_getHTML(consumption, times);
        $("#Consumption_tbody").append(html);
        let tableData = this._tableData;
        for (let i = 0; i < 8; ++i) {
            // consumption[i] *= times;
            tableData[0][i] += consumption[i] * times;
        }
        consumption.push(times);
        tableData.push(consumption);
        this._table_printTotal(this._tableData[0]);
    }

    static _table_getHTML(consumption, times) {
        let row = this._tableNumber++;
        let html = '<tr id="Consumption_table_row_' + row + '">';
        for (let i = 0; i < 8; ++i) {
            html += '<td>';
            if (consumption[i] > 0)
                html += '+'
            html += NumberAutoExact(consumption[i]) + '</td>';
        }
        html += '<td>' + times + '</td>';
        html += '<td style="min-width: 3.2rem;"><button id="Consumption_table_apply_row_' + row + '" style="float: left;" class="close" title="' + language.JS.apply + '">✓</button>';
        html += '<button id="Consumption_table_close_row_' + row + '" class="close" title="' + language.JS.delete_ + '">×</button></td>';
        return html;
    }

    static _table_deleteThisRow(id) {
        let tr_elem = document.getElementById(id);
        let row = 0;
        while(1) {
            if ($("#Consumption_tbody").children()[row].id === id) {
                document.getElementById("Consumption_tbody").removeChild(tr_elem);
                break;
            }
            else
                ++row;
        }
        let consumption = this._tableData[row + 1];
        for (let i = 0; i < 8; ++i) {
            let times = consumption[8];
            this._tableData[0][i] -= consumption[i] * times;
        }
        this._table_printTotal(this._tableData[0]);
        this._tableData.splice(row + 1, 1);
    }

    static table_applyThisRow(id) {
        let tr_elem = document.getElementById(id);
        let row = 0;
        while(1) {
            if ($("#Consumption_tbody").children()[row].id === id)
                break;
            else
                ++row;
        }
        Input_setPC_Consumption_reAndco(this._tableData[row + 1]);
        Input_setPC_Consumption_times(this._tableData[row + 1][8]);
    }

    static _table_clear() {
        this._tableData = [[0, 0, 0, 0, 0, 0, 0, 0]];
        this._tableNumber = 0;
        document.getElementById("Consumption_tbody").innerHTML = "";
        this._table_printTotal(this._tableData[0]);
    }

    static _table_printTotal(totalData) {
        let html = '<tr>';
        for (let i = 0; i < 8; ++i) {
            html += '<td>';
            if (totalData[i] > 0)
                html += '+';
            html += NumberAutoExact(totalData[i]) + '</td>';
        }
        html += '<td colspan="2" id="consumption_total_td">' + language.JS.consumption_total_td + '</td>';
        html += '</tr>';
        document.getElementById("Consumption_total").innerHTML = html;
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

        let planFlag_backup = this._planFlag.slice();
        for (let i = 0; i < timePeriod_length; ++i) {
            timePeriod[i][0] = calcDaysBetween2Dates(this._startDate, timePeriod[i][0]);
            timePeriod[i][1] = calcDaysBetween2Dates(this._startDate, timePeriod[i][1]);
            let start = timePeriod[i][0];
            let end = timePeriod[i][1];
            for (let ii = start; ii < end; ++ii) {
                ++this._planFlag[ii];
                if (this._planFlag[ii] > 1) {
                    this._planFlag = planFlag_backup;
                    let date = addDate(this._startDate, ii);
                    Modal.alert(language.JS.PC_C_alert2_1 + date + language.JS.PC_C_alert2_2);
                    return ;
                }
            }
        }

        //格式[height, (xindex, yindex, width,) (xindex......]
        let TimetableData = this._calcTimetableData(timePeriod);

        let newPlan = {};
        newPlan.timePeriod = timePeriod;
        newPlan.number = this._plansNumber++;
        newPlan.reAndco = this._tableData[0].slice();
        newPlan.TimetableData = TimetableData;
        let tableData = [];
        for (let i = 0; i < this._tableData.length; ++i) {
            tableData.push(this._tableData[i].slice());
        }
        newPlan.tableData = tableData.slice();
        this._plans.push(newPlan);

        PlanCombinationTimePeriod.clear();
        PlanCombination_disabledDate();
        this._plansHasChanged();
    }

    static _calcTimetableData(timePeriod) {
        let timePeriod_length = timePeriod.length;
        let TimetableData = [240];
        for (let i = 0; i < timePeriod_length; ++i) {
            TimetableData.push(timePeriod[i][0]);
            TimetableData.push(1680);
            TimetableData.push(timePeriod[i][1] - timePeriod[i][0]);
        }
        return TimetableData;
    }

    static apply(plan_number) {
        document.getElementById("LogisticsConsumptionPlanSwitch").checked = true;
        switchConsumptionSetting();
        this._table_clear();
        let index = 0;
        while(1) {
            if (this._plans[index].number === plan_number)
                break;
            ++index;
        }
        PlanCombinationTimePeriod.setTimePeriod(this._plans[index].timePeriod);
        let tableData = [];
        if (this._plans[index].tableData === undefined) {
            tableData.push(this._plans[index].reAndco.slice());
            tableData.push(this._plans[index].reAndco.slice());
            tableData[1].push(1);
        }
        else
            tableData = this._plans[index].tableData;
        for (let i = 1; i < tableData.length; ++i) {
            let table = tableData[i];
            let html = this._table_getHTML([table[0], table[1], table[2], table[3], table[4], table[5], table[6], table[7]], table[8]);
            $("#Consumption_tbody").append(html);
        }
        this._table_printTotal(this._plans[index].reAndco);
        this._tableData = [];
        for (let i = 0; i < tableData.length; ++i) {
            this._tableData.push(tableData[i].slice());
        }
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
        let timePeriod_length = this._plans[index].timePeriod.length;
        for (let i = 0; i < timePeriod_length; ++i) {
            let startDate = this._plans[index].timePeriod[i][0];
            let endDate = this._plans[index].timePeriod[i][1];
            for (let ii = startDate; ii < endDate; ++ii) {
                this._planFlag[ii] = 0;
            }
        }
        this._plans.splice(index, 1);
        this._plansHasChanged();
        if (this._plans.length === 0 && PC_LogisticsPlan._plans.length === 0)
            PlanCombination_enabledDate();
    }

    static _plansHasChanged() {
        PlanCombinationChart.printFromConsumptionPlan(this._plans);
        this.setStorage();
    }

    static chartGetPlans() {
        return this._plans;
    }
}

PC_ConsumptionPlan._plans = [];
PC_ConsumptionPlan._plansNumber = 0;
PC_ConsumptionPlan._startDate = "";
PC_ConsumptionPlan._endDate = "";
PC_ConsumptionPlan._totalDays = 0;
PC_ConsumptionPlan._planFlag = [];
PC_ConsumptionPlan._tableNumber = 0;
PC_ConsumptionPlan._tableData = [[0, 0, 0, 0, 0, 0, 0, 0]];
