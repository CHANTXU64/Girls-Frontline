class Tab {
    constructor() {
        this.Qvalid = new Array;
    }

    setTime() {}
    _checkDataLegalityAndCorrect_Time() {}

    setValidQAndReturnLength() {
        this.Qvalid = Q.slice(0);
        return this.Qvalid.length;
    }
    _getUnableLogistic() {
        var Unable_0 = _setUnableLogistic();
        var Unable_1 = this._setUnableLogisticCustomize_1(Unable_0);
        var Unable_2 = this._setUnableLogisticCustomize_2(Unable_1);
        return Unable_2;
    }
    _setUnableLogisticCustomize_1(UnableLogistic) {
        return UnableLogistic;
    }
    _notInLimitTime(xtime, startTime, endTime) {
        if (xtime < startTime && Math.abs(xtime - startTime) > 0.02) return true;
        if (xtime > endTime && Math.abs(xtime - endTime) > 0.02) return true;
        return false;
    }
    _setUnableLogisticCustomize_2(UnableLogistic) {
        return UnableLogistic;
    }

    Calculate_Current(Number) {
        var CurrentValue = new Array(8);
        for (var i = 0; i < 8; i++) {
            CurrentValue[i] = this.Qvalid[Number[0]][i + 1] + this.Qvalid[Number[1]][i + 1] + this.Qvalid[Number[2]][i + 1] + this.Qvalid[Number[3]][i + 1];
        }
        return CurrentValue;
    }

    PrintPlanTableTitle() {}
    _title = '<thead><tr><th class="col-0.3">#</th><th>'+ language.JS.Mission +'1</th><th>'+ language.JS.Mission +'2</th><th>'+ language.JS.Mission +'3</th><th>'+ language.JS.Mission +'4</th>';
    _titleEnd = '</tr></thead>';

    PrintTableCustomize(plan, row) {
        return "";
    }
};
function _setUnableLogistic() {
    var UnableMap;
    switch (parseFloat($("#MapLimit").val())) {
        case 6:
            UnableMap = ["7-1","7-2","7-3","7-4","8-1","8-2","8-3","8-4","9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4"]; break;
        case 7:
            UnableMap = ["8-1","8-2","8-3","8-4","9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4"]; break;
        case 8:
            UnableMap = ["9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4"]; break;
        case 9:
            UnableMap = ["10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4"]; break;
        case 10:
            UnableMap = ["11-1","11-2","11-3","11-4"]; break;
        case 11:
            UnableMap = []; break;
        default:
            UnableMap = [];
    }
    var UnableNumber = [];
    for (var i = 0; i < Q.length; i++) {
        if (UnableMap.indexOf(Q[i][0]) != -1) UnableNumber.push(i);
    }
    return UnableNumber;
}

class Tab_Anytime extends Tab {
    // setTime() {
    //     if (!is_Tab_Anytime_CalculateOneDay()) {
    //         this.TotalTime = 1;
    //         return;
    //     }
    //     this.TotalTime = parseFloat($("#Tab_Anytime_Time").val());
    // }
    setTime() {
        this._checkDataLegalityAndCorrect_Time();
        var Hours = parseFloat($("#Time_Anytime_hours").val());
        var Minutes = parseFloat($("#Time_Anytime_minutes").val());
        this.TotalTime = Hours + Minutes / 60;
    }
    _checkDataLegalityAndCorrect_Time() {
        var Hours = getPositiveValueFromHTML($("#Time_Anytime_hours"));
        var Minutes = getPositiveValueFromHTML($("#Time_Anytime_minutes"));
        var total_time = Hours + Minutes / 60;
        if (total_time == 0) {
            alert(language.JS.tab_Anytime_alert1);/////////////////////////////////////////////////////
            throw"--";
        }
    }

    setValidQAndReturnLength() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) == -1) {
                this.Qvalid.push(Q[i].slice(0, 10));
            }
        }
        return this.Qvalid.length;
    }

    PrintPlanTableTitle() {
        var title;
        if (is_CalculateByHour()) {
            title = this._title + '<th>'+language.JS.Manp+'/h</th><th>'+language.JS.Ammu+'/h</th><th>'+language.JS.Rati+'/h</th><th>'+language.JS.Part+'/h</th><th>'+language.JS.TPro+'/h</th><th>'+language.JS.Equi+'/h</th><th>'+language.JS.QPro+'/h</th><th>'+language.JS.QRes+'/h</th><th>'+language.JS.MinTime+'</th><th>'+language.JS.MaxTime+'</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th>'+language.JS.Manp+'</th><th>'+language.JS.Ammu+'</th><th>'+language.JS.Rati+'</th><th>'+language.JS.Part+'</th><th>'+language.JS.TPro+'</th><th>'+language.JS.Equi+'</th><th>'+language.JS.QPro+'</th><th>'+language.JS.QRes+'</th><th>'+language.JS.MinTime+'</th><th>'+language.JS.MaxTime+'</th>' + this._titleEnd;
        }
        return title;
    }

    PrintTableCustomize(plan, row) {
        var tab = "";
        tab += ("<td>" + (Math.round(Math.min(this.Qvalid[plan.List[row][0]][9],this.Qvalid[plan.List[row][1]][9],this.Qvalid[plan.List[row][2]][9],this.Qvalid[plan.List[row][3]][9]) * 100) / 100) + "h</td>");
        tab += ("<td>" + (Math.round(Math.max(this.Qvalid[plan.List[row][0]][9],this.Qvalid[plan.List[row][1]][9],this.Qvalid[plan.List[row][2]][9],this.Qvalid[plan.List[row][3]][9]) * 100) / 100) + "h</td>");
        return tab;
    }
};

class Tab_Timetable extends Tab {
    constructor() {
        super();
        this.Qvalid = new Array(0);
        this.TimeList = [];
    }

    setTime() {
        for (var i = 0; i < Tab_Timetable_TimeList_html.length; i++) {
            this.TimeList[i] = Tab_Timetable_TimeList_html[i];
        }
        this.TimeList = this.TimeList.sort(sortNumber);
        this.TimeList.unshift(0);
        this.TotalTime = Tab_Timetable_getMaxTime();
        if (this.TotalTime == 0) {
            alert(language.JS.tab_Timetable_alert4);
            throw"--";
        }
        this.TimeList.push(this.TotalTime);
    }

    setValidQAndReturnLength() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) == -1) {
                var newrow = new Array;
                newrow.push(Q[i][0]);
                var times = 0;
                var ii0 = 0;
                for (var ii = 1; ii < this.TimeList.length; ii++) {
                    if (Q[i][9] <= this.TimeList[ii] - this.TimeList[ii0]) {
                        times++;
                        ii0 = ii;
                    }
                }
                for (var ii = 1; ii < 9; ii++) {
                    newrow.push(Q[i][ii] * Q[i][9] * times / this.TotalTime);
                }
                this.Qvalid.push(newrow);
            }
        }
        return this.Qvalid.length;
    }

    _setUnableLogisticCustomize_2(UnableLogistic) { //排除超时后勤
        for (var i = 0; i < Q.length; i++) {
            if (Q[i][9] > this.TotalTime) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    PrintPlanTableTitle() {
        var title;
        if (is_CalculateByHour()) {
            title = this._title + '<th>'+language.JS.Manp+'/h</th><th>'+language.JS.Ammu+'/h</th><th>'+language.JS.Rati+'/h</th><th>'+language.JS.Part+'/h</th><th>'+language.JS.TPro+'/h</th><th>'+language.JS.Equi+'/h</th><th>'+language.JS.QPro+'/h</th><th>'+language.JS.QRes+'/h</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th>'+language.JS.Manp+'</th><th>'+language.JS.Ammu+'</th><th>'+language.JS.Rati+'</th><th>'+language.JS.Part+'</th><th>'+language.JS.TPro+'</th><th>'+language.JS.Equi+'</th><th>'+language.JS.QPro+'</th><th>'+language.JS.QRes+'</th>' + this._titleEnd;
        }
        return title;
    }
}
function sortNumber(a, b) {
    return a - b;
}