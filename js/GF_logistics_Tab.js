class Tab {
    constructor() {
        this.Qvalid = [];
    }

    setTime() {}

    setTime_NotCorrected() {}

    setValidQAndReturnLengthAndSetCurrentMax() {}
    _setCurrentMax() {
        var CurrentValueMax = new Array(8);
        for (var i = 0; i < 8; i++) {
            var CurrentValueMax_0 = new Array(this.Qvalid.length);
            for (var ii = 0; ii < this.Qvalid.length; ii++) {
                CurrentValueMax_0[ii] = this.Qvalid[ii][i + 1];
            }
            quick_sort_descending(CurrentValueMax_0);
            CurrentValueMax[i] = CurrentValueMax_0[0] + CurrentValueMax_0[1] + CurrentValueMax_0[2] + CurrentValueMax_0[3];
        }
        this.CurrentValue_MAX = CurrentValueMax;
    }

    normalizedQValid() {
        for (var i = 0; i < this.Qvalid.length; i++) {
            for (var ii = 0; ii < 8; ii++) {
                if (this.CurrentValue_MAX[ii] != 0) {
                    this.Qvalid[i][ii + 1] /= this.CurrentValue_MAX[ii];
                }
            }
        }
    }

    _getUnableLogistic() {
        var Unable_0 = _setUnableLogistic();
        var Unable_1 = this._setUnableLogisticCustomize(Unable_0);
        return Unable_1;
    }
    _setUnableLogisticCustomize(UnableLogistic) { //排除超时后勤
        for (var i = 0; i < Q.length; i++) {
            if (Q[i][9] > this.TotalTime) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    Calculate_Current(Number) {
        var CurrentValue = new Array(8);
        var Qvalid = this.Qvalid;
        for (var i = 0; i < 8; i++) {
            CurrentValue[i] = Qvalid[Number[0]][i + 1] + Qvalid[Number[1]][i + 1] + Qvalid[Number[2]][i + 1] + Qvalid[Number[3]][i + 1];
        }
        return CurrentValue;
    }

    PrintPlanTableTitle() {}
    _title = '<thead><tr><th style="text-align: center;width:5%;" id="resultPlan_Mission_1">'+ language.JS.Mission +'1</th><th style="text-align: center;width:5%;" id="resultPlan_Mission_2">'+ language.JS.Mission +'2</th><th style="text-align: center;width:5%;" id="resultPlan_Mission_3">'+ language.JS.Mission +'3</th><th style="text-align: center;width:5%;" id="resultPlan_Mission_4">'+ language.JS.Mission +'4</th>';
    _titleEnd = '</tr></thead>';

    PrintTableCustomize(plan, row) {
        return "";
    }
};
function _setUnableLogistic() {
    var UnableMap;
    switch (parseFloat($("#MapLimit").val())) {
        case 6:
            UnableMap = ["7-1","7-2","7-3","7-4","8-1","8-2","8-3","8-4","9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 7:
            UnableMap = ["8-1","8-2","8-3","8-4","9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 8:
            UnableMap = ["9-1","9-2","9-3","9-4","10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 9:
            UnableMap = ["10-1","10-2","10-3","10-4","11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 10:
            UnableMap = ["11-1","11-2","11-3","11-4","12-1","12-2","12-3","12-4"]; break;
        case 11:
            UnableMap = ["12-1","12-2","12-3","12-4"]; break;
        case 12:
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
    setTime() {
        this.TotalTime = this._checkDataLegalityAndCorrect_TotalTime();
        this.MinimumIntervalTime = this._checkDataLegalityAndCorrect_MinimumIntervalTime();
    }
    _checkDataLegalityAndCorrect_TotalTime() {
        var Hours = getPositiveValueFromHTML($("#Time_Anytime_hours"));
        var Minutes = getPositiveValueFromHTML($("#Time_Anytime_minutes"));
        var total_time = Hours * 60 + Minutes;
        if (total_time == 0) {
            alert(language.JS.tab_Anytime_alert1);
            clear_sorting_html();
            throw"--";
        }
        return total_time;
    }
    _checkDataLegalityAndCorrect_MinimumIntervalTime() {
        var Minutes = getPositiveValueFromHTML($('#Tab_Anytime_MinimumIntervalTime_minutes'));
        var MinimumIntervalTime = Minutes;
        return MinimumIntervalTime;
    }

    setTime_NotCorrected() {
        this.TotalTime = this._checkDataLegality_TotalTime();
        this.MinimumIntervalTime = this._checkDataLegality_MinimumIntervalTime();
    }
    _checkDataLegality_TotalTime() {
        var Hours, Minutes;
        if (is_NonPositiveNumberOrInfinity($("#Time_Anytime_hours").val()))
            Hours = 0;
        else
            Hours = parseFloat($("#Time_Anytime_hours").val());
        if (is_NonPositiveNumberOrInfinity($("#Time_Anytime_minutes").val()))
            Minutes = 0;
        else
            Minutes = parseFloat($("#Time_Anytime_minutes").val());
        return Hours * 60 + Minutes;
    }
    _checkDataLegality_MinimumIntervalTime() {
        var Minutes;
        if (is_NonPositiveNumberOrInfinity($('#Tab_Anytime_MinimumIntervalTime_minutes').val()))
            Minutes = 0;
        else
            Minutes = parseFloat($('#Tab_Anytime_MinimumIntervalTime_minutes').val());
        return Minutes;
    }

    setValidQAndReturnLengthAndSetCurrentMax() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) == -1) {
                var newrow = [];
                newrow.push(Q[i][0]);
                var times = 0;
                while((++times + 1) * Q[i][9] <= this.TotalTime);
                for (var ii = 1; ii < 9; ii++) {
                    newrow.push(Q[i][ii] * times / this.TotalTime);
                }
                newrow.push(Q[i][9]);
                var CollectTimetable = [];
                for (var ii = 1; ii <= times; ii++) {
                    CollectTimetable.push(Q[i][9] * ii);
                }
                newrow.push(CollectTimetable);
                //用于储存该方案的价值， 以减少下一次计算的总方案个数
                newrow.push(0);
                this.Qvalid.push(newrow);
            }
        }
        //为优化后面计算最小间隔时间做准备
        quick_sort_expand_ascending(this.Qvalid, 9);
        this._setCurrentMax();
        return this.Qvalid.length;
    }
    _setUnableLogisticCustomize(UnableLogistic) {
        for (var i = 0; i < Q.length; i++) {
            if (Q[i][9] > this.TotalTime || Q[i][9] < this.MinimumIntervalTime) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    Calculate_Current(Number) {
        var Qvalid = this.Qvalid;
        if (this.MinimumIntervalTime) {
            var Time = [Qvalid[Number[0]][9], Qvalid[Number[1]][9], Qvalid[Number[2]][9], Qvalid[Number[3]][9]];
            var IntervalTime_1 = Math.min((Time[1] - Time[0])===0?this.MinimumIntervalTime:Time[1] - Time[0], (Time[2] - Time[1])===0?this.MinimumIntervalTime:Time[2] - Time[1], (Time[3] - Time[2])===0?this.MinimumIntervalTime:Time[3] - Time[2]);
            if (IntervalTime_1 < this.MinimumIntervalTime) {
                return [-1, -1, -1, -1, -1, -1, -1, -1];
            }
            var IntervalTime = this._calculateIntervalTimeMin(Number);
            if (IntervalTime < this.MinimumIntervalTime) {
                return [-1, -1, -1, -1, -1, -1, -1, -1];
            }
        }
        var CurrentValue = new Array(8);
        for (var i = 0; i < 8; i++) {
            CurrentValue[i] = Qvalid[Number[0]][i + 1] + Qvalid[Number[1]][i + 1] + Qvalid[Number[2]][i + 1] + Qvalid[Number[3]][i + 1];
        }
        return CurrentValue;
    }
    _calculateIntervalTimeMin(Number) {
        var CollectTimetable_0 = [this.Qvalid[Number[0]][10], this.Qvalid[Number[1]][10], this.Qvalid[Number[2]][10], this.Qvalid[Number[3]][10]];
        var A = [CollectTimetable_0[0].length - 1, CollectTimetable_0[1].length - 1, CollectTimetable_0[2].length - 1, CollectTimetable_0[3].length - 1];
        for (var i = 0; i < 3; i++) {
            if (CollectTimetable_0[i][0] == CollectTimetable_0[i + 1][0]) {
                A[i + 1] = -1;
            }
        }
        if (CollectTimetable_0[3][0] % CollectTimetable_0[2][0] === 0) {
            A[3] = -1;
        }
        else if (CollectTimetable_0[3][0] % CollectTimetable_0[1][0] === 0) {
            A[3] = -1;
        }
        else if (CollectTimetable_0[3][0] % CollectTimetable_0[0][0] === 0) {
            A[3] = -1;
        }
        if (CollectTimetable_0[2][0] % CollectTimetable_0[1][0] === 0) {
            A[2] = -1;
        }
        else if (CollectTimetable_0[2][0] % CollectTimetable_0[0][0] === 0) {
            A[2] = -1;
        }
        if (CollectTimetable_0[1][0] % CollectTimetable_0[0][0] === 0) {
            A[1] = -1;
        }
        var IntervalTime = CollectTimetable_0[0][0];
        var maxTime = 999999999;
        while(A[0] !== -1) {
            var a = 0;
            var b = 0;
            while(++b < 4) {
                if (A[b] !== -1) {
                    if (CollectTimetable_0[a][A[a]] < CollectTimetable_0[b][A[b]]) {
                        a = b;
                    }
                    else if (CollectTimetable_0[a][A[a]] === CollectTimetable_0[b][A[b]]) {
                        A[b]--;
                    }
                }
            }
            var maxValue = CollectTimetable_0[a][A[a]];
            A[a]--;
            IntervalTime = Math.min(IntervalTime, maxTime - maxValue);
            maxTime = maxValue;
        }
        return IntervalTime;
    }

    PrintPlanTableTitle() {
        var title;
        if (is_CalculateByHour()) {
            title = this._title + '<th style="text-align: center;width:8%;" id="resultPlan_Manp">'+language.JS.Manp+'/h</th><th style="text-align: center;width:8%;" id="resultPlan_Ammu">'+language.JS.Ammu+'/h</th><th style="text-align: center;width:8%;" id="resultPlan_Rati">'+language.JS.Rati+'/h</th><th style="text-align: center;width:8%;" id="resultPlan_Part">'+language.JS.Part+'/h</th><th style="text-align: center;width:8%;" id="resultPlan_TPro">'+language.JS.TPro+'/h</th><th style="text-align: center;width:8%;" id="resultPlan_Equi">'+language.JS.Equi+'/h</th><th style="text-align: center;width:8%;" id="resultPlan_QPro">'+language.JS.QPro+'/h</th><th style="text-align: center;width:8%;" id="resultPlan_QRes">'+language.JS.QRes+'/h</th><th style="text-align: center;width:8%;">'+language.JS.MinIntervalTime+'</th><th style="text-align: center;width:8%;">'+language.JS.MaxTime+'</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th style="text-align: center;width:8%;" id="resultPlan_Manp">'+language.JS.Manp+'</th><th style="text-align: center;width:8%;" id="resultPlan_Ammu">'+language.JS.Ammu+'</th><th style="text-align: center;width:8%;" id="resultPlan_Rati">'+language.JS.Rati+'</th><th style="text-align: center;width:8%;" id="resultPlan_Part">'+language.JS.Part+'</th><th style="text-align: center;width:8%;" id="resultPlan_TPro">'+language.JS.TPro+'</th><th style="text-align: center;width:8%;" id="resultPlan_Equi">'+language.JS.Equi+'</th><th style="text-align: center;width:8%;" id="resultPlan_QPro">'+language.JS.QPro+'</th><th style="text-align: center;width:8%;" id="resultPlan_QRes">'+language.JS.QRes+'</th><th style="text-align: center;width:8%;">'+language.JS.MinIntervalTime+'</th><th style="text-align: center;width:8%;">'+language.JS.MaxTime+'</th>' + this._titleEnd;
        }
        return title;
    }

    PrintTableCustomize(plan, row) {
        var tab = [];
        var Number = [plan.List[row][0], plan.List[row][1], plan.List[row][2], plan.List[row][3]];
        tab.push(this._calculateIntervalTimeMin(Number) + "m");
        tab.push((Math.round(Math.max(this.Qvalid[Number[0]][9],this.Qvalid[Number[1]][9],this.Qvalid[Number[2]][9],this.Qvalid[Number[3]][9]) * 100 / 60) / 100) + "h");
        return tab;
    }
};

class Tab_Timetable extends Tab {
    constructor() {
        super();
        this.Qvalid = [];
        this.TimeList = [];
    }

    setTime() {
        this.TimeList = Tab_Timetable_TimeList_html.slice().sort(sortNumber);
        this.TimeList.unshift(0);
        this.TotalTime = Tab_Timetable_getMaxTime();
        if (this.TotalTime == 0) {
            alert(language.JS.tab_Timetable_alert4);
            clear_sorting_html();
            throw"--";
        }
        this.TimeList.push(this.TotalTime);
    }

    setTime_NotCorrected() {
        this.TimeList = Tab_Timetable_TimeList_html.slice().sort(sortNumber);
        this.TimeList.unshift(0);
        this.TotalTime = Tab_Timetable_getMaxTime();
        this.TimeList.push(this.TotalTime);
    }

    setValidQAndReturnLengthAndSetCurrentMax() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) == -1) {
                var newrow = [];
                newrow.push(Q[i][0]);
                var times = 0;
                var CollectTimetable = [];
                var ii0 = 0;
                for (var ii = 1; ii < this.TimeList.length; ii++) {
                    if (Q[i][9] <= this.TimeList[ii] - this.TimeList[ii0]) {
                        times++;
                        CollectTimetable.push(this.TimeList[ii0] + Q[i][9]);
                        ii0 = ii;
                    }
                }
                for (var ii = 1; ii < 9; ii++) {
                    newrow.push(Q[i][ii] * times / this.TotalTime);
                }
                newrow.push(Q[i][9]);
                newrow.push(CollectTimetable);
                //用于储存该方案的价值， 以减少下一次计算的总方案个数
                newrow.push(0);
                this.Qvalid.push(newrow);
            }
        }
        this._setCurrentMax();
        return this.Qvalid.length;
    }

    PrintPlanTableTitle() {
        var title;
        if (is_CalculateByHour()) {
            title = this._title + '<th style="text-align: center;width:10%;" id="resultPlan_Manp">'+language.JS.Manp+'/h</th><th style="text-align: center;width:10%;" id="resultPlan_Ammu">'+language.JS.Ammu+'/h</th><th style="text-align: center;width:10%;" id="resultPlan_Rati">'+language.JS.Rati+'/h</th><th style="text-align: center;width:10%;" id="resultPlan_Part">'+language.JS.Part+'/h</th><th style="text-align: center;width:10%;" id="resultPlan_TPro">'+language.JS.TPro+'/h</th><th style="text-align: center;width:10%;" id="resultPlan_Equi">'+language.JS.Equi+'/h</th><th style="text-align: center;width:10%;" id="resultPlan_QPro">'+language.JS.QPro+'/h</th><th style="text-align: center;width:10%;" id="resultPlan_QRes">'+language.JS.QRes+'/h</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th style="text-align: center;width:10%;" id="resultPlan_Manp">'+language.JS.Manp+'</th><th style="text-align: center;width:10%;" id="resultPlan_Ammu">'+language.JS.Ammu+'</th><th style="text-align: center;width:10%;" id="resultPlan_Rati">'+language.JS.Rati+'</th><th style="text-align: center;width:10%;" id="resultPlan_Part">'+language.JS.Part+'</th><th style="text-align: center;width:10%;" id="resultPlan_TPro">'+language.JS.TPro+'</th><th style="text-align: center;width:10%;" id="resultPlan_Equi">'+language.JS.Equi+'</th><th style="text-align: center;width:10%;" id="resultPlan_QPro">'+language.JS.QPro+'</th><th style="text-align: center;width:10%;" id="resultPlan_QRes">'+language.JS.QRes+'</th>' + this._titleEnd;
        }
        return title;
    }
}
function sortNumber(a, b) {
    return a - b;
}