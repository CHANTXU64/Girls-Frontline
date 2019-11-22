class Tab_SingleTime extends Tab {
    setTime() {
        this._checkDataLegalityAndCorrect_Time();
        var Hours = parseFloat($("#Time_SingleTime_hours").val());
        var Minutes = parseFloat($("#Time_SingleTime_minutes").val());
        this.TotalTime = Hours + Minutes / 60;
    }
    _checkDataLegalityAndCorrect_Time() {
        var Hours = getPositiveValueFromHTML($("#Time_SingleTime_hours"));
        var Minutes = getPositiveValueFromHTML($("#Time_SingleTime_minutes"));
        var total_time = Hours + Minutes / 60;
        if (total_time == 0) {
            alert("时长不能为0！");
            throw"--";
        }
    }

    setValidQAndReturnLength() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) == -1) {
                var newrow = new Array;
                newrow.push(Q[i][0]);
                for (var ii = 1; ii < 9; ii++) {
                    newrow.push(Q[i][ii] * Q[i][9] / this.TotalTime);
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
        title = this._title + '<th>人力</th><th>弹药</th><th>口粮</th><th>零件</th><th>人形</th><th>装备</th><th>快建</th><th>快修</th>' + this._titleEnd;
        return title;
    }

    get_Hours_PrintResourceContract() {
        return this.TotalTime;
    }
}