var test_chant = 0;
class Plan {
    constructor(length) {
        this.List = new Array(length);
        for (var i = 0; i < length; i++) {
            this.List[i] = new Array(11);
            for (var ii = 0; ii < 11; ii++) {
                this.List[i][ii] = 0;
            }
            this.List[i].Customizer = ShownTab.CustomizePlanList();
            this.List[i].Value = 0;//该方案价值
        }
        _Customizer = this.List[0].Customizer;
    }
    push(MissionsNumber, CurrentValue, PlanValue) {
        for (var i = this.List.length - 1; i >= 0; i--) {
            if (this._ThisRowIsEmpty(i)) {
                while (i != 0 && this._ThisRowIsEmpty(i - 1))
                    i--;
                this._PushIntoThisRow(i, MissionsNumber, CurrentValue, PlanValue);
                continue;
            }
            if (PlanValue >= this.List[i].Value) {
                test_chant += 1;
                break;
            }
            else {
                test_chant += 1;
                if (i == this.List.length - 1) {
                    this._PushIntoThisRow(i, MissionsNumber, CurrentValue, PlanValue);
                }
                else {
                    this._ExchangeTheseTwoRows(i, MissionsNumber, CurrentValue, PlanValue);
                }
            }
        }
    }
    _ThisRowIsEmpty(RowNumber) {
        if (this.List[RowNumber][0] == 0 && this.List[RowNumber][1] == 0 && this.List[RowNumber][2] == 0 && this.List[RowNumber][3] == 0)
            return true;
        else
            return false;
    }
    _PushIntoThisRow(RowNumber, MissionsNumber, CurrentValue, PlanValue) {
        for (var i = 0; i < 4; i++) {
            this.List[RowNumber][i] = MissionsNumber[i];
        }
        for (var i = 0; i < 7; i++) {
            this.List[RowNumber][i + 4] = CurrentValue[i];
        }
        this.List[RowNumber].Value = PlanValue;
        this.List[RowNumber].Customizer = _Customizer;
    }
    _ExchangeTheseTwoRows(RowNumber, MissionsNumber, CurrentValue, PlanValue) {
        for (var i = 0; i < 11; i++) {
            this.List[RowNumber + 1][i] = this.List[RowNumber][i];
        }
        this.List[RowNumber + 1].Value = this.List[RowNumber].Value;
        this.List[RowNumber + 1].Customizer = this.List[RowNumber].Customizer;
        this._PushIntoThisRow(RowNumber, MissionsNumber, CurrentValue, PlanValue);
    }

    print() {
        var Table = document.getElementById("Plan_Table");
        var tab = '<table class="table table-striped table-bordered table-hover">';
        tab += (ShownTab.PrintPlanTableTitle() + '<tbody>');
        for (var i = 0; i < this.List.length; i++) {
            if (this.List[i][0] == 0 && this.List[i][1] == 0 && this.List[i][2] == 0 && this.List[i][3] == 0) break;
            tab += ("<tr><td>" + (i+1) + "</td>");
            tab += this._PrintMissionsNumber(i);
            tab += this._PrintResourceContract(i);
            tab += ShownTab.PrintTableCustomize(this.List, i);
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
