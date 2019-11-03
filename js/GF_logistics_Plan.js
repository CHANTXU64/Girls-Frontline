class Plan {
    constructor(length) {
        this._setList(length);
        this.TargetValue = this._getLegalityTargetValue();
        this._CorrectTargetValue();
    }
    _setList(length) {
        this.List = new Array(length);
        for (var i = 0; i < length; i++) {
            this.List[i] = new Array(11);
            this.List[i].Customizer = [];
            this.List[i].Value = 0;//该方案价值
        }
    }
    _getLegalityTargetValue() {
        var HTMLTargetArr = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QT")];
        var TargetArr = getPositiveValueFromHTML(HTMLTargetArr);
        if (TargetArr.toString() == "0,0,0,0,0,0,0") {
            alert("需求不能全为0！");
            throw"--";
        }
        return TargetArr;
    }
    _CorrectTargetValue() {
        this._TargetValueMultiplyWeight();
        var ResourceValue = this._CorrectResourceValue();
        var ContractValue = this._CorrectContractValue();
        this.TargetValue = ResourceValue.concat(ContractValue);
    }
    _TargetValueMultiplyWeight() {
        var Weights = this._getLegalityWeights();
        for(var i = 0; i < 7; i++) {
            this.TargetValue[i] *= Weights[i];
        }
    }
    _getLegalityWeights() {
        var HTMLWeightsArr = [$("#Mw"), $("#Aw"), $("#Rw"), $("#Pw"), $("#Tw"), $("#Ew"), $("#Qw")];
        var WeightsArr = getPositiveValueFromHTML(HTMLWeightsArr);
        if (WeightsArr.toString() == "0,0,0,0,0,0,0") {
            alert("权重不能全为0！");
            throw"--";
        }
        return WeightsArr;
    }
    _CorrectResourceValue() {
        var ResourceValue = new Array(4);
        var Resource_CalibrationValue = 600;
        for (var i = 0; i < 4; i++) {
            ResourceValue[i] = this.TargetValue[i];
        }
        if (this._ValuesNotAll0(ResourceValue)) {
            this._CorrectValue(ResourceValue, Resource_CalibrationValue);
        }
        return ResourceValue;
    }
    _CorrectContractValue() {
        var ContractValue = new Array(3);
        var Contract_CalibrationValue = 1;
        for (var i = 0; i < 3; i++) {
            ContractValue[i] = this.TargetValue[i + 4];
        }
        if (this._ValuesNotAll0(ContractValue)) {
            this._CorrectValue(ContractValue, Contract_CalibrationValue);
        }
        return ContractValue;
    }
    _ValuesNotAll0(Values) {
        for (var i = 0; i < Values.length; i++) {
            if (Values[i] != 0) return true;
        }
        return false;
    }
    _CorrectValue(Values, CalibrationValue) {
        var CorrectionRate = CalibrationValue / ArrayMax(Values);
        for (var i = 0; i < Values.length; i++) {
            Values[i] *= CorrectionRate;
        }
    }

    CaculateAndPush(MissionsNumber) {
        this._MissionsNumber = MissionsNumber;
        this._CurrentValue = ShownTab.Calculate_Current(MissionsNumber);
        this._PlanValue = Value(this.TargetValue, this._CurrentValue);
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
        if (!this._thisPlanIsBetter(this.List.length - 1)) {
            test++;
            return;
        }
        test++;
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
        this.List[RowNumber].Customizer = ShownTab.getPlanListCustomizer();
    }
    _SortListByValue(thisrow) {
        for (var i = thisrow - 1; i >= 0; i--) {
            if (this._thisPlanIsBetter(i)) {
                test++;
                this._ExchangeTheseTwoRows(i);
            }
            else {
                test++;
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
    _thisPlanIsBetter(number) {
        if (this._eachCurrentValueIsBigger(number)) {
            test_2++;
            return true;
        }
        else {
            if (this._PlanValue < this.List[number].Value) return true;
            else return false;
        }
    }
    _eachCurrentValueIsBigger(number) {
        for (var i = 0; i < 7; i++) {
            if (this._CurrentValue[i] <= this.List[number][i + 4]) return false;
        }
        return true;
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
        tab += '</tbody>';
        Table.innerHTML = tab;
        $(function (){$("[data-toggle='tooltip']").tooltip();});
    }
    _PrintMissionsNumber(row) {
        var tab = "";
        var MissionsNumber = new Array(4);
        for (var i = 0; i < 4; i++) {
            MissionsNumber[i] = Q[this.List[row][i]][0];
        }
        MissionsNumber = MissionsNumber.sort(sortStringNumber);
        for (var i = 0; i < 4; i++) {
            tab += ("<td>" + MissionsNumber[i] + "</td>");
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

function sortStringNumber(a, b) {
    var aa, bb;
    aa = parseInt(a.replace(/[^0-9]/ig,""));
    bb = parseInt(b.replace(/[^0-9]/ig,""));
    return aa - bb;
}