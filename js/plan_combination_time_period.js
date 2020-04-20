class PlanCombinationTimePeriod {
    static setMaxAndMinDate(totalTimePeriod_min = Input_getPC_startDate(), totalTimePeriod_max = Input_getPC_endDate()) {
        let startDate_elem = document.getElementById("PlanCombination_planStartDate");
        let endDate_elem = document.getElementById("PlanCombination_planEndDate");
        startDate_elem.setAttribute("min", totalTimePeriod_min);
        startDate_elem.setAttribute("max", addDate(totalTimePeriod_max, -1));
        endDate_elem.setAttribute("min", addDate(totalTimePeriod_min, 1));
        endDate_elem.setAttribute("max", totalTimePeriod_max);
    }

    static add() {
        let startDate = Input_getPC_planStartDate(true);
        let endDate = Input_getPC_planEndDate(true);
        if (startDate === "" || endDate === "") {

            return ;
        }
        if (startDate === "error" || endDate === "error") {

            return ;
        }
        let HTML = this._getATimePeriodHTML(startDate, endDate, 0);
        this._timePeriod.push([startDate, endDate]);
        $("#PC_DateTimePeriod_body").append(HTML);
    }

    static _getATimePeriodHTML(startDate, endDate, row) {
        let HTML = '';
        HTML += '<code class="list-group-item p-2" id="PC_TimePeriod_' + row + '">';
        HTML += startDate + ' ~ ' + endDate + '</code>';
        return HTML;
    }

    static clear() {
        let timeperiod = this._timePeriod;
        this._timePeriod = [];
        $("#PC_DateTimePeriod_body").html("");
        Input_resetPC_planStartDate();
        Input_resetPC_planEndDate();
        Input_setPC_planStartDate_MAXMIN();
        Input_setPC_planEndDate_MAXMIN();
        return timeperiod;
    }

    static getTimePeriod() {
        let timePeriod = [];
        let length = this._timePeriod.length;
        for (let i = 0; i < length; ++i) {
            timePeriod.push(this._timePeriod[i].slice());
        }
        return timePeriod.slice();
    }
}

PlanCombinationTimePeriod._timePeriod = [];
