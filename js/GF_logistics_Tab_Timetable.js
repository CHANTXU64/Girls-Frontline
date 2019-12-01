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
        if (is_Tab_Timetable_CalculateOnce()) {
            title = this._title + '<th>'+language.JS.Manp+'</th><th>'+language.JS.Ammu+'</th><th>'+language.JS.Rati+'</th><th>'+language.JS.Part+'</th><th>'+language.JS.TPro+'</th><th>'+language.JS.Equi+'</th><th>'+language.JS.QPro+'</th><th>'+language.JS.QRes+'</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th>'+language.JS.Manp+'/h</th><th>'+language.JS.Ammu+'/h</th><th>'+language.JS.Rati+'/h</th><th>'+language.JS.Part+'/h</th><th>'+language.JS.TPro+'/h</th><th>'+language.JS.Equi+'/h</th><th>'+language.JS.QPro+'/h</th><th>'+language.JS.QRes+'/h</th>' + this._titleEnd;
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