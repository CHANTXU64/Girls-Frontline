class Tab_Anytime extends Tab {
    setTime() {
        if (!is_Tab_Anytime_CalculateOneDay()) {
            this.TotalTime = 1;
            return;
        }
        this.TotalTime = parseFloat($("#Tab_Anytime_Time").val());
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
        if (is_Tab_Anytime_CalculateOneDay()) {
            title = this._title + '<th>人力/d</th><th>弹药/d</th><th>口粮/d</th><th>零件/d</th><th>人形/d</th><th>装备/d</th><th>快建/d</th><th>快修/d</th><th>最短时间</th><th>最长时间</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>快修/h</th><th>最短时间</th><th>最长时间</th>' + this._titleEnd;
        }
        return title;
    }

    get_Hours_PrintResourceContract() {
        if (is_Tab_Anytime_CalculateOneDay()) return this.TotalTime;
        else return 1;
    }

    PrintTableCustomize(plan, row) {
        var tab = "";
        tab += ("<td>" + (Math.round(Math.min(this.Qvalid[plan.List[row][0]][9],this.Qvalid[plan.List[row][1]][9],this.Qvalid[plan.List[row][2]][9],this.Qvalid[plan.List[row][3]][9]) * 100) / 100) + "h</td>");
        tab += ("<td>" + (Math.round(Math.max(this.Qvalid[plan.List[row][0]][9],this.Qvalid[plan.List[row][1]][9],this.Qvalid[plan.List[row][2]][9],this.Qvalid[plan.List[row][3]][9]) * 100) / 100) + "h</td>");
        return tab;
    }
}