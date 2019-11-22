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
        if (is_Tab_Timetable_CalculateOnce()) {
            title = this._title + '<th>人力</th><th>弹药</th><th>口粮</th><th>零件</th><th>人形</th><th>装备</th><th>快建</th><th>快修</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>快修/h</th>' + this._titleEnd;
        }
        return title;
    }

    get_Hours_PrintResourceContract() {
        if (is_Tab_Timetable_CalculateOnce()) return this.TotalTime;
        else return 1;
    }
}

function sortNumber(a, b) {
    return a - b;
}