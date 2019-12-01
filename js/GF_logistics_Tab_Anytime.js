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
            title = this._title + '<th>'+language.JS.Manp+'/d</th><th>'+language.JS.Ammu+'/d</th><th>'+language.JS.Rati+'/d</th><th>'+language.JS.Part+'/d</th><th>'+language.JS.TPro+'/d</th><th>'+language.JS.Equi+'/d</th><th>'+language.JS.QPro+'/d</th><th>'+language.JS.QRes+'/d</th><th>'+language.JS.MinTime+'</th><th>'+language.JS.MaxTime+'</th>' + this._titleEnd;
        }
        else {
            title = this._title + '<th>'+language.JS.Manp+'/h</th><th>'+language.JS.Ammu+'/h</th><th>'+language.JS.Rati+'/h</th><th>'+language.JS.Part+'/h</th><th>'+language.JS.TPro+'/h</th><th>'+language.JS.Equi+'/h</th><th>'+language.JS.QPro+'/h</th><th>'+language.JS.QRes+'/h</th><th>'+language.JS.MinTime+'</th><th>'+language.JS.MaxTime+'</th>' + this._titleEnd;
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