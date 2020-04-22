class PC_ConsumptionPlan {
    static init() {
        let startDate = Input_getPC_startDate();
        let endDate = Input_getPC_endDate();
        this.clear();
        this._table_clear();
        this._startDate = startDate;
        this._endDate = endDate;
        let days = calcDaysBetween2Dates(startDate, endDate);
        if (days > 0) {
            this._totalDays = days;
            this._planFlag = new Array(days);
            this._planFlag.fill(0);
        }
    }

    static clear() {
        this._startDate = "";
        this._endDate = "";
        this._plans = [];
        this._plansNumber = 0;
        this._tableNumber = 0;
        this._totalDays = 0;
        this._planFlag = [];
    }

    static table_add() {
        let consumption = Input_getPC_Consumption_reAndco();
        let times = Input_getPC_Consumption_times();
        let html = this._table_getHTML(consumption, times);
        $("#Consumption_tbody").append(html);
        let tableData = this._tableData;
        for (let i = 0; i < 8; ++i) {
            consumption[i] *= times;
            tableData[0][i] += consumption[i];
        }
        tableData.push(consumption);
        this._table_printTotal(this._tableData[0]);
    }

    static _table_getHTML(consumption, times) {
        let row = this._tableNumber++;
        let html = '<tr id="Consumption_table_row_' + row + '">';
        for (let i = 0; i < 8; ++i) {
            html += '<td>' + consumption[i] + '</td>';
        }
        html += '<td>' + times + '</td>';
        html += '<td><button id="Consumption_table_close_row_' + row + '" class="close">×</button></td>';
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
            this._tableData[0][i] -= consumption[i];
        }
        this._table_printTotal(this._tableData[0]);
        this._tableData.splice(row + 1, 1);
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
            html += '<td>' + totalData[i] + '</td>';
        }
        html += '</tr>';
        document.getElementById("Consumption_total").innerHTML = html;
    }

    static add() {
        let timePeriod = PlanCombinationTimePeriod.getTimePeriod();
        let timePeriod_length = timePeriod.length;
        if (timePeriod_length === 0) {

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

                    return ;
                }
            }
        }

        //格式[height, (xindex, yindex, width,) (xindex......]
        let TimetableData = [240];
        for (let i = 0; i < timePeriod_length; ++i) {
            TimetableData.push(timePeriod[i][0]);
            TimetableData.push(1680);
            TimetableData.push(timePeriod[i][1] - timePeriod[i][0]);
        }

        let newPlan = {};
        newPlan.timePeriod = timePeriod;
        newPlan.number = this._plansNumber++;
        newPlan.reAndco = this._tableData[0].slice();
        newPlan.TimetableData = TimetableData;
        this._plans.push(newPlan);

        PlanCombinationTimePeriod.clear();
        PlanCombination_disabledDate();
        this._plansHasChanged();
    }

    static _plansHasChanged() {
        PlanCombinationChart.printFromConsumptionPlan(this._plans);
    }

    static chartGetPlans() {
        return this._plans;
    }
}

PC_ConsumptionPlan._plans = [];
PC_ConsumptionPlan._plansNumber = 0;
PC_ConsumptionPlan._tableNumber = 0;
PC_ConsumptionPlan._startDate = "";
PC_ConsumptionPlan._endDate = "";
PC_ConsumptionPlan._totalDays = 0;
PC_ConsumptionPlan._planFlag = [];
PC_ConsumptionPlan._tableData = [[0, 0, 0, 0, 0, 0, 0, 0]];
