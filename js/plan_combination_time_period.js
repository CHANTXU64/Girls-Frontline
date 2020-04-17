class PlanCombinationTimePeriod {
    static setMaxAndMinDate(totalTimePeriod_min, totalTimePeriod_max) {
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
        return timeperiod;
    }
}

PlanCombinationTimePeriod._timePeriod = [];
