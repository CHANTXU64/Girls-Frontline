class Plan {
    constructor(length) {
        this.List = new Array(length);
        for (var i = 0; i < length; i++) {
            this.List[i] = new Array(11);
            this.List[i].Customizer = ShownTab.CustomizePlanList();
            this.List[i].Value = 0;//该方案价值
        }
        _Customizer = this.List[0].Customizer;
    }
    push(MissionsNumber, CurrentValue, PlanValue) {
        this._MissionsNumber = MissionsNumber;
        this._CurrentValue = CurrentValue;
        this._PlanValue = PlanValue;
        if (!(0 in this.List[this.List.length - 1])) {
            this._push_FirstEmptyRow();
        }
        else this._push();
    }
    _push_FirstEmptyRow() {
        var row = this.List.length - 1;
        while (row != 0 && !(0 in this.List[row - 1])) row--;
        this._PushIntoThisRow(row);
        this._SortListByValue(row);
    }
    _push() {
        if (this._PlanValue >= this.List[this.List.length - 1].Value) return;
        this._PushIntoThisRow(this.List.length - 1);
        this._SortListByValue(this.List.length - 1);
    }
    _PushIntoThisRow(RowNumber) {
        for (var i = 0; i < 4; i++) {
            this.List[RowNumber][i] = this._MissionsNumber[i];
        }
        for (var i = 0; i < 7; i++) {
            this.List[RowNumber][i + 4] = this._CurrentValue[i];
        }
        this.List[RowNumber].Value = this._PlanValue;
        this.List[RowNumber].Customizer = _Customizer;
    }
    _SortListByValue(thisrow) {
        for (var i = thisrow - 1; i >= 0; i--) {
            if (this._PlanValue < this.List[i].Value) {
                test_chant += 1;
                this._ExchangeTheseTwoRows(i);
            }
            else {
                test_chant += 1;
                break;
            }
        }
    }
    _ExchangeTheseTwoRows(RowNumber) {
        for (var i = 0; i < 11; i++) {
            this.List[RowNumber + 1][i] = this.List[RowNumber][i];
        }
        this.List[RowNumber + 1].Value = this.List[RowNumber].Value;
        this.List[RowNumber + 1].Customizer = this.List[RowNumber].Customizer;
        this._PushIntoThisRow(RowNumber);
    }

    print() {
        var Table = document.getElementById("Plan_Table");
        var tab = '<table class="table table-striped table-bordered table-hover">';
        tab += (ShownTab.PrintPlanTableTitle() + '<tbody>');
        for (var i = 0; i < this.List.length; i++) {
            if (!(0 in this.List[i])) break;
            tab += ("<tr><td>" + (i+1) + "</td>");
            tab += this._PrintMissionsNumber(i);
            tab += this._PrintResourceContract(i);
            tab += ShownTab.PrintTableCustomize(this, i);
            tab += '</tr>';
        }
        tab += '</tbody>'
        Table.innerHTML = tab;
        $(function (){$("[data-toggle='tooltip']").tooltip();})
    }
    _PrintMissionsNumber(row) {
        var tab = "";
        for (var i = 0; i < 4; i++) {
            if ((this.List[row][i] + 1) % 4 == 0) tab += ("<td>" + (parseInt((this.List[row][i] + 1) / 4) - 1) + "-4</td>");
            else tab += ("<td>" + (parseInt((this.List[row][i] + 1) / 4)) + "-" + (this.List[row][i] + 1) % 4 + "</td>");
        }
        return tab;
    }
    _PrintResourceContract(row) {
        var tab = "";
        var Hours = ShownTab.get_Hours_PrintResourceContract();
        for (var i = 4; i < 8; i++) {
            tab += ("<td>" + (Math.round(this.List[row][i] * Hours * 10) / 10) + "</td>");
        }
        for (var i = 8; i < 11; i++) {
            tab += (this.List[row][i] == 0 ? ("<td>--</td>") : ("<td>" + (Math.round(this.List[row][i] * Hours * 100) / 100) + "</td>"));
        }
        return tab;
    }
}
