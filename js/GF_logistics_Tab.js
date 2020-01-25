class Tab {
    constructor() {
        this._title = '<thead><tr style="cursor: pointer;"><th style="text-align: center;width:20%;" colspan="4" tabindex="0" id="resultPlan_Mission">'+ language.JS.Mission +'</th>';
        this._titleEnd = '</tr></thead>';
        this.Qvalid = [];
    }

    setTime() {}

    setValidQAndReturnLengthAndSetCurrentMax() {}
    _setCurrentMax() {
        var CurrentValueMax = [0, 0, 0, 0, 0, 0, 0, 0];
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
                if (this.CurrentValue_MAX[ii] !== 0) {
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
                if (UnableLogistic.indexOf(i) === -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    Calculate_Current(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
        var CurrentValue = [0, 0, 0, 0, 0, 0, 0, 0];
        var Qvalid = this.Qvalid;
        var n1 = Qvalid[Mission_n1];
        var n2 = Qvalid[Mission_n2];
        var n3 = Qvalid[Mission_n3];
        var n4 = Qvalid[Mission_n4];
        for (var i = 0; i < 8; i++) {
            CurrentValue[i] = n1[i + 1] + n2[i + 1] + n3[i + 1] + n4[i + 1];
        }
        return CurrentValue;
    }

    PrintPlanTableTitle() {}

    PrintTableCustomize(plan, row) {
        return "";
    }

    Saved_Custom() {
        return [];
    }

    ApplySaved_Custom(Saved_Custom) {}
}
function _setUnableLogistic() {
    var UnableMap;
    switch (Input_getSelectChapter()) {
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
        if (UnableMap.indexOf(Q[i][0]) !== -1) UnableNumber.push(i);
    }
    return UnableNumber;
}

class Tab_Anytime extends Tab {
    constructor() {
        super();
        this.PlanTableResourceAndContractWidth = "8.88%";
        this.Qvalid_Time = [];
    }

    setTime(NeedCorrection = true) {
        this.TotalTime = Input_getAnytimeTotalTime(NeedCorrection);
        if (NeedCorrection) {
            if (this.TotalTime === 0) {
                alert(language.JS.tab_Anytime_alert1);
                HTML_AllowInput();
                throw"--";
            }
        }
        this.MinimumIntervalTime = Input_getAnytimeMinimumIntervalTime(NeedCorrection);
    }

    setValidQAndReturnLengthAndSetCurrentMax() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) === -1) {
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
                this.Qvalid_Time.push(Q[i][9]);
            }
        }
        //为优化后面计算最小间隔时间做准备
        quick_sort_expand_ascending(this.Qvalid, 9);
        quick_sort_ascending(this.Qvalid_Time);
        this._setCurrentMax();
        return this.Qvalid.length;
    }
    _setUnableLogisticCustomize(UnableLogistic) {
        for (var i = 0; i < Q.length; i++) {
            if (Q[i][9] > this.TotalTime || Q[i][9] < this.MinimumIntervalTime) {
                if (UnableLogistic.indexOf(i) === -1) {
                    UnableLogistic.push(i);
                }
            }
            var IntervalTime_lastTimeToTotalTime = this.TotalTime % Q[i][9];
            if (IntervalTime_lastTimeToTotalTime < this.MinimumIntervalTime && IntervalTime_lastTimeToTotalTime !== 0) {
                if (UnableLogistic.indexOf(i) === -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    Calculate_Current(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
        var Qvalid = this.Qvalid;
        var Qvalid_Time = this.Qvalid_Time;
        var MinimumIntervalTime = this.MinimumIntervalTime;
        if (MinimumIntervalTime) {
            var Time = [Qvalid_Time[Mission_n1], Qvalid_Time[Mission_n2], Qvalid_Time[Mission_n3], Qvalid_Time[Mission_n4]];
            var IntervalTime = Math.min((Time[1] - Time[0])===0?MinimumIntervalTime:Time[1] - Time[0], (Time[2] - Time[1])===0?MinimumIntervalTime:Time[2] - Time[1], (Time[3] - Time[2])===0?MinimumIntervalTime:Time[3] - Time[2]);
            if (IntervalTime < MinimumIntervalTime)
                return [-1, -1, -1, -1, -1, -1, -1, -1];
            IntervalTime = calculateIntervalTimeMin(Time, this.TotalTime);
            if (IntervalTime < MinimumIntervalTime)
                return [-1, -1, -1, -1, -1, -1, -1, -1];
        }
        var CurrentValue = [0, 0, 0, 0, 0, 0, 0, 0];
        var n1 = Qvalid[Mission_n1];
        var n2 = Qvalid[Mission_n2];
        var n3 = Qvalid[Mission_n3];
        var n4 = Qvalid[Mission_n4];
        for (var i = 0; i < 8; i++) {
            CurrentValue[i] = n1[i + 1] + n2[i + 1] + n3[i + 1] + n4[i + 1];
        }
        return CurrentValue;
    }

    PrintPlanTableTitle() {
        var title;
        if (is_CalculateByHour()) {
            title = this._title + '<th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Manp">'+language.JS.Manp+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Ammu">'+language.JS.Ammu+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Rati">'+language.JS.Rati+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Part">'+language.JS.Part+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_TPro">'+language.JS.TPro+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Equi">'+language.JS.Equi+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_QPro">'+language.JS.QPro+'/h</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_QRes">'+language.JS.QRes+'/h</th><th style="text-align: center;width:8.88%;cursor:default;">'+language.JS.MinIntervalTime+'</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Manp">'+language.JS.Manp+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Ammu">'+language.JS.Ammu+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Rati">'+language.JS.Rati+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Part">'+language.JS.Part+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_TPro">'+language.JS.TPro+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_Equi">'+language.JS.Equi+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_QPro">'+language.JS.QPro+'</th><th style="text-align: center;width:8.88%;"tabindex="0" id="resultPlan_QRes">'+language.JS.QRes+'</th><th style="text-align: center;width:8.88%;cursor:default;">'+language.JS.MinIntervalTime+'</th>' + this._titleEnd;
        }
        return title;
    }

    PrintTableCustomize(plan, row) {
        var tab = [];
        var Number = [plan.List[row][0], plan.List[row][1], plan.List[row][2], plan.List[row][3]];
        var NumberTime = [this.Qvalid_Time[Number[0]], this.Qvalid_Time[Number[1]], this.Qvalid_Time[Number[2]], this.Qvalid_Time[Number[3]]];
        tab.push(calculateIntervalTimeMin(NumberTime, this.TotalTime) + "m");
        return tab;
    }

    Saved_Custom() {
        var Saved_Custom = [];
        var TotalTime = Input_getAnytimeTotalTime();
        Saved_Custom.push(TotalTime);
        var MinimumIntervalTime = Input_getAnytimeMinimumIntervalTime();
        Saved_Custom.push(MinimumIntervalTime);
        return Saved_Custom;
    }

    ApplySaved_Custom(Saved_Custom) {
        var TotalTime = Saved_Custom[0];
        var MinimumIntervalTime = Saved_Custom[1];
        Input_setAnytimeTotalTime(TotalTime);
        Input_setAnytimeMinimumIntervalTime(MinimumIntervalTime);
        storageSetItem("TabAnytimeCustom", Saved_Custom);
    }
}
//calculateIntervalTimeMin会改变Time_Arr!!!输入Time_Arr必须从小到大排序
function calculateIntervalTimeMin(Time_Arr, Total_Time) {
    var minIntervalTime = Time_Arr[0];
    for (var i = 0; i < 4; i++) {
        var IntervalTime_lastTimeToTotalTime = Total_Time % Time_Arr[i];
        if (IntervalTime_lastTimeToTotalTime !== 0)
            minIntervalTime = minIntervalTime < IntervalTime_lastTimeToTotalTime ? minIntervalTime : IntervalTime_lastTimeToTotalTime;
    }
    var n0 = Time_Arr[0];
    var n1 = Time_Arr[1];
    var n2 = Time_Arr[2];
    var n3 = Time_Arr[3];
    var Timetable_Arr_length = 4;
    var TotalTime = Total_Time;
    if (n3 % n2 === 0 || n3 % n1 === 0 || n3 % n0 === 0) {
        Timetable_Arr_length--;
    }
    if (n2 % n1 === 0 || n2 % n0 === 0) {
        if (Timetable_Arr_length === 3)
            Timetable_Arr_length--;
        else
            Time_Arr[2] = TotalTime;
    }
    if (n1 % n0 === 0) {
        if (Timetable_Arr_length === 2)
            Timetable_Arr_length--;
        else
            Time_Arr[1] = TotalTime;
    }
    if (Timetable_Arr_length === 1)
        return minIntervalTime;
    var Timetable_Arr_min_0 = n0;
    while (Timetable_Arr_min_0 < TotalTime) {
        var Timetable_Arr_min = TotalTime;
        var ii = 0;
        var i = -1;
        while (++i < Timetable_Arr_length) {
            if (Time_Arr[i] <= Timetable_Arr_min) {
                Timetable_Arr_min = Time_Arr[i];
                ii = i;
            }
        }
        switch (ii) {
            case 0:
                Time_Arr[0] += n0; break;
            case 1:
                Time_Arr[1] += n1; break;
            case 2:
                Time_Arr[2] += n2; break;
            case 3:
                Time_Arr[3] += n3; break;
        }
        var IntervalTime = Timetable_Arr_min - Timetable_Arr_min_0;
        if (IntervalTime === 0)
            continue;
        Timetable_Arr_min_0 = Timetable_Arr_min;
        minIntervalTime = minIntervalTime < IntervalTime ? minIntervalTime : IntervalTime;
    }
    return minIntervalTime;
}

class Tab_Timetable extends Tab {
    constructor() {
        super();
        this.Qvalid = [];
        this.TimeList = [];
        this.PlanTableResourceAndContractWidth = "10%";
    }

    setTime(NeedCorrection = true) {
        this.TimeList = Tab_Timetable_TIMELIST.slice().sort(sortNumber);
        this.TimeList.unshift(0);
        this.TotalTime = Input_getTimetableTotalTime(NeedCorrection);
        if (NeedCorrection) {
            if (this.TotalTime === 0) {
                alert(language.JS.tab_Timetable_alert4);
                HTML_AllowInput();
                throw"--";
            }
        }
        this.TimeList.push(this.TotalTime);
    }

    setValidQAndReturnLengthAndSetCurrentMax() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) === -1) {
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
            title = this._title + '<th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Manp">'+language.JS.Manp+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Ammu">'+language.JS.Ammu+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Rati">'+language.JS.Rati+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Part">'+language.JS.Part+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_TPro">'+language.JS.TPro+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Equi">'+language.JS.Equi+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_QPro">'+language.JS.QPro+'/h</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_QRes">'+language.JS.QRes+'/h</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Manp">'+language.JS.Manp+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Ammu">'+language.JS.Ammu+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Rati">'+language.JS.Rati+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Part">'+language.JS.Part+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_TPro">'+language.JS.TPro+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_Equi">'+language.JS.Equi+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_QPro">'+language.JS.QPro+'</th><th style="text-align: center;width:10%;"tabindex="0" id="resultPlan_QRes">'+language.JS.QRes+'</th>' + this._titleEnd;
        }
        return title;
    }

    Saved_Custom() {
        var Saved_Custom = [];
        var TotalTime = Input_getTimetableTotalTime();
        Saved_Custom.push(TotalTime);
        var Timetable = Tab_Timetable_TIMELIST.slice();
        Saved_Custom.push(Timetable);
        return Saved_Custom;
    }

    ApplySaved_Custom(Saved_Custom) {
        var TotalTime = Saved_Custom[0];
        Input_setTimetableTotalTime(TotalTime);
        var Timetable = Saved_Custom[1];
        Input_setTimetableTimetable(Timetable);
        storageSetItem("TabTimetableCustom", Saved_Custom);
    }
}
function sortNumber(a, b) {
    return a - b;
}