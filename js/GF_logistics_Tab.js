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
        var startTime = parseFloat($("#Time_Limit_start").val());
        var endTime = parseFloat($("#Time_Limit_end").val());
        for (var i = 0; i < Q.length; i++) {
            if (this._notInLimitTime(Q[i][9], startTime, endTime)) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
        }
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
    _title = '<thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th>';
    _titleEnd = '</tr></thead>';

    get_Hours_PrintResourceContract() {//用于计算平均每小时还是总共 资源和契约量
        return 1;
    }

    PrintTableCustomize(plan, row) {
        return "";
    }
}
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