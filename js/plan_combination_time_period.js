class PlanCombinationTimePeriod {
    static add() {
        let startDate = Input_getPC_planStartDate(true);
        let endDate = Input_getPC_planEndDate(true);
        if (startDate === "" || endDate === "") {

            return ;
        }
        if (startDate === "error" || endDate === "error") {

            return ;
        }
        let HTML = this._getATimePeriodHTML(startDate, endDate, this._number++);
        this._timePeriod.push([startDate, endDate]);
        $("#PC_DateTimePeriod_body").append(HTML);
    }

    static _getATimePeriodHTML(startDate, endDate, row) {
        let HTML = '';
        HTML += '<code class="list-group-item p-2" id="PC_TimePeriod_' + row + '">';
        HTML += startDate + ' ~ ' + endDate + '<button class="close" id="PC_TimePeriod_close_' + row + '">×</button></code>';
        return HTML;
    }

    static deleteThisRow(id) {
        let tr_elem = document.getElementById(id);
        let row = 0;
        while(1) {
            if ($("#PC_DateTimePeriod_body").children()[row].id === id) {
                document.getElementById("PC_DateTimePeriod_body").removeChild(tr_elem);
                break;
            }
            else
                ++row;
        }
        this._timePeriod.splice(row, 1);
    }

    static clear() {
        let timeperiod = this._timePeriod;
        this._timePeriod = [];
        this._number = 0;
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

    static setTimePeriod(TimePeriod) {
        this.clear();
        let length = TimePeriod.length;
        let date = Input_getPC_startDate();
        for (let i = 0; i < length; ++i) {
            let startDate = addDate(date, TimePeriod[i][0]);
            let endDate = addDate(date, TimePeriod[i][1]);
            this._timePeriod.push([startDate, endDate]);
            let HTML = this._getATimePeriodHTML(startDate, endDate, this._number++);
            $("#PC_DateTimePeriod_body").append(HTML);
        }
    }
}

PlanCombinationTimePeriod._timePeriod = [];
PlanCombinationTimePeriod._number = 0;
