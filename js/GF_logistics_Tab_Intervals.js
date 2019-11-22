class Tab_Intervals extends Tab {
    setTime() {
        this._checkDataLegalityAndCorrect_Time();
        var Hours = parseFloat($("#Time_Intervals_hours").val());
        var Minutes = parseFloat($("#Time_Intervals_minutes").val());
        this.TotalTime = Hours + Minutes / 60;
    }
    _checkDataLegalityAndCorrect_Time() {
        var Hours = getPositiveValueFromHTML($("#Time_Intervals_hours"));
        var Minutes = getPositiveValueFromHTML($("#Time_Intervals_minutes"));
        var total_time = Hours + Minutes / 60;
        if (total_time == 0) {
            var r = confirm("间隔时长为0，请使用\"随时能收后勤\"一栏来计算组合方案");
            if (r == true) {
                location.reload();
            }
            throw"--";
        }
    }

    setValidQAndReturnLength() {
        var UnableLogistic = this._getUnableLogistic();
        for (var i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) == -1) {
                var newrow = new Array;
                newrow.push(Q[i][0]);
                var times = 0;
                while (times * this.TotalTime < Q[i][9]) times++;
                for (var ii = 1; ii < 9; ii++) {
                    newrow.push(Q[i][ii] * Q[i][9] / times / this.TotalTime);
                }
                newrow.push(Q[i][9]);
                newrow.push(times);
                this.Qvalid.push(newrow);
            }
        }
        return this.Qvalid.length;
    }

    PrintPlanTableTitle() {
        var title;
        title = this._title + '<th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>快修/h</th><th>最长时间</th><th><a href="#" data-toggle="tooltip" data-placement="top" title="一周期指从全部后勤同时开始到下一次全部后勤同时收取这段时间">一个周期</a></th>' + this._titleEnd;
        return title;
    }

    PrintTableCustomize(plan, row) {
        var tab = "";
        tab += ("<td>" + (Math.round(Math.max(this.Qvalid[plan.List[row][0]][9],this.Qvalid[plan.List[row][1]][9],this.Qvalid[plan.List[row][2]][9],this.Qvalid[plan.List[row][3]][9]) * 100) / 100) + "h</td>");
        var times = [this.Qvalid[plan.List[row][0]][10],this.Qvalid[plan.List[row][1]][10],this.Qvalid[plan.List[row][2]][10],this.Qvalid[plan.List[row][3]][10]];
        var One_cycle_time = _calculateArrayLeastCommonMultiple(times) * this.TotalTime;
        tab += ("<td>" + (Math.round(One_cycle_time * 10) / 10) + "h</td>");
        return tab;
    }
}
function _calculateArrayLeastCommonMultiple(array) {
    var arr = array;
    for (var i = 0; i < (arr.length - 1); i++) {
        arr[i+1] = arr[i] * arr[i+1] / _gcd(arr[i], arr[i + 1]);
    }
    return arr[arr.length - 1];
}
function _gcd(a, b) {
    if (b) while ((a %= b) && (b %= a));
    return a + b;
}