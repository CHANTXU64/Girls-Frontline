class Plan {
    constructor(ShownTab, List_length, Target_Value) {
        this._setResourceIncreasingRate();
        this._setList(List_length);
        this.ShownTab = ShownTab;
        this.CurrentValue_MAX = ShownTab.CurrentValue_MAX;
        if (Target_Value === undefined) {
            this.TargetValue_html = this._getLegalityTargetValue();
            this.TargetValue = this._CorrectTargetValue();
        }
        else {
            this.TargetValue = Target_Value;
        }
        this._Norm_Target = this._getNorm(this.TargetValue);
    }
    _setResourceIncreasingRate() {
        var TotalRate = getTotalGreatSuccessRate();
        this.ResourceIncreasingRate = 1 + (TotalRate) / 200;
    }
    _setList(length) {
        this.List = new Array(length);
        for (var i = 0; i < length; i++) {
            this.List[i] = new Array(12);
            this.List[i].Value = 0;//该方案价值
        }
    }
    _getLegalityTargetValue() {
        var HTMLTargetArr = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QPT"), $("#QRT")];
        var TargetArr = getPositiveValueFromHTML(HTMLTargetArr);
        if (TargetArr.toString() == "0,0,0,0,0,0,0,0") {
            alert(language.JS.TargetValue0_alert);
            clear_sorting_html();
            throw"--";
        }
        return TargetArr;
    }
    _CorrectTargetValue() {
        var ResourceValue = this._CorrectResourceValue();
        var ContractValue = this._CorrectContractValue();
        var TargetValue = ResourceValue.concat(ContractValue);
        if (TargetValue.toString() == "0,0,0,0,0,0,0,0") {
            alert(language.JS.TargetValue0_alert);
            clear_sorting_html();
            throw"--";
        }
        return TargetValue;
    }
    _CorrectResourceValue() {
        var ResourceValue = this.TargetValue_html.slice(0, 4);
        var Resource_CalibrationValue = 100 - parseInt($('#ContractWeight').val());
        if (this._ValuesNotAll0(ResourceValue)) {
            this._CorrectValue(ResourceValue, Resource_CalibrationValue);
        }
        return ResourceValue;
    }
    _CorrectContractValue() {
        var ContractValue = this.TargetValue_html.slice(4, 8);
        var Contract_CalibrationValue = parseInt($('#ContractWeight').val());
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

	_getNorm(vector) {
		var norm;
		var SumOfSquares = 0;
		for (var i = 0; i < vector.length; i++) {
			SumOfSquares += Math.pow(vector[i], 2);
		}
        norm = Math.pow(SumOfSquares, 0.5);
        return norm;
    }
    
    CalculateAndPush_Standardization_And_CalculateMissionsValue(MissionsNumber) {
        this._CurrentValue = this.ShownTab.Calculate_Current(MissionsNumber);
        if (this._CurrentValue[0] === -1) {
            return;
        }
        this._MissionsNumber = MissionsNumber;
        this._PlanValue = this._calculateValue();
        this.ShownTab.Qvalid[MissionsNumber[0]][11] += this._PlanValue;
        this.ShownTab.Qvalid[MissionsNumber[1]][11] += this._PlanValue;
        this.ShownTab.Qvalid[MissionsNumber[2]][11] += this._PlanValue;
        this.ShownTab.Qvalid[MissionsNumber[3]][11] += this._PlanValue;
        if (!(0 in this.List[this.List.length - 1])) {
            this._push_FirstEmptyRow();
        }
        else this._push();
    }

    CalculateAndPush_Standardization(MissionsNumber) {
        this._CurrentValue = this.ShownTab.Calculate_Current(MissionsNumber);
        if (this._CurrentValue[0] === -1) {
            return;
        }
        this._MissionsNumber = MissionsNumber;
        this._PlanValue = this._calculateValue();
        if (!(0 in this.List[this.List.length - 1])) {
            this._push_FirstEmptyRow();
        }
        else this._push();
    }
    CalculateAndPush(MissionsNumber) {
        this._CurrentValue = this.ShownTab.Calculate_Current(MissionsNumber);
        if (this._CurrentValue[0] === -1) {
            return;
        }
        for (var i = 0; i < 7; i++) {
            if (this._CurrentValue[i] < (this.TargetValue[i] * 0.5)) {
                return;
            }
        }
        this._MissionsNumber = MissionsNumber;
        this._PlanValue = this._calculateValue_2();
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
        if (!this._thisPlanIsBetterThan(this.List.length - 1)) {
            return;
        }
        this._PushIntoThisRow(this.List.length - 1);
        this._SortListByValue(this.List.length - 1);
    }
    _PushIntoThisRow(RowNumber) {
        this.List[RowNumber] = this._MissionsNumber.concat(this._CurrentValue);
        this.List[RowNumber].Value = this._PlanValue;
    }
    _SortListByValue(thisrow) {
        for (var i = thisrow - 1; i >= 0; i--) {
            if (this._thisPlanIsBetterThan(i)) {
                this._ExchangeTheseTwoRows(i);
            }
            else {
                break;
            }
        }
    }
    _ExchangeTheseTwoRows(RowNumber) {
        this.List[RowNumber + 1] = this.List[RowNumber].slice();
        this.List[RowNumber + 1].Value = this.List[RowNumber].Value;
        this._PushIntoThisRow(RowNumber);
    }
    _thisPlanIsBetterThan(number) {
        // if (this._eachCurrentValueIsBigger(number)) {
        //     return true;
        // }
        // else {
        //     if (this._PlanValue > this.List[number].Value) return true;
        //     else return false;
        // }
        if (this._PlanValue > this.List[number].Value) {
            return true;
        }
        else {
            return false;
        }
    }
    _eachCurrentValueIsBigger(number) {
        for (var i = 0; i < 8; i++) {
            if (this._CurrentValue[i] < this.List[number][i + 4]) return false;
        }
        return true;
    }

    _calculateValue() {
        var CurrentValue = this._CurrentValue.slice();
        CurrentValue[4] *= 500;
        CurrentValue[5] *= 500;
        CurrentValue[6] *= 500;
        CurrentValue[7] *= 500;
        for (var i = 0; i < 8; i++) {
            if (this.TargetValue[i] == 0) CurrentValue[i] = 0;
        }
        var Norm_Current = this._getNorm(CurrentValue);
        if (Norm_Current === 0)
            return 0;
        var Dot_product = this._getDotProduct(CurrentValue, this.TargetValue);
        var CurrentScalarProjection = Dot_product / this._Norm_Target;
        var COStheta = Math.min(1, CurrentScalarProjection / Norm_Current);
        var theta = Math.acos(COStheta);
        var CosineSimilarity_0 = 1 - 2 * theta / Math.PI;
        var CosineSimilarity = Math.pow(CosineSimilarity_0, 2);
        return CurrentScalarProjection * CosineSimilarity;
    }
    _getDotProduct(vector1, vector2) {
        if (vector1.length != vector2.length) throw"getDotProduct error";
        var Dot_product = 0;
        for (var i = 0; i < vector1.length; i++) {
            Dot_product += (vector1[i] * vector2[i]);
        }
        return Dot_product;
    }

    _calculateValue_2() {
        return Value2(this.TargetValue, this._CurrentValue);
    }

    print(fineTuningExpanded) {
        var Table = document.getElementById("Plan_Table");
        if (!(0 in this.List[0])) {
            Table.innerHTML = language.JS.NoPlan;
            throw"--";
        }
        var tab = getHTMLFineTuningTool(fineTuningExpanded);
        tab += '<div class="table-responsive">';
        tab += '<table class="table table-striped table-hover table-responsive text-nowrap">';//table-bordered
        tab += (this.ShownTab.PrintPlanTableTitle() + '<tbody>');
        for (var i = 0; i < this.List.length; i++) {
            if (!(0 in this.List[i])) break;
            tab += "<tr>";
            tab += this._PrintMissionsNumber(i);
            tab += this._PrintResourceContract(i);
            tab += this.ShownTab.PrintTableCustomize(this, i);
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
            MissionsNumber[i] = this.ShownTab.Qvalid[this.List[row][i]][0];
        }
        MissionsNumber = MissionsNumber.sort(sortStringNumber);
        for (var i = 0; i < 4; i++) {
            tab += "<td>" + MissionsNumber[i] + "</td>";
        }
        return tab;
    }
    _PrintResourceContract(row) {
        var tab = "";
        var Minutes;
        if (is_CalculateByHour()) {
            Minutes = 60;
        }
        else {
            Minutes = this.ShownTab.TotalTime;
        }
        for (var i = 4; i < 8; i++) {
            tab += "<td>" + (Math.round(this.List[row][i] * this.ResourceIncreasingRate * Minutes * 10 * this.CurrentValue_MAX[i - 4]) / 10) + "</td>";
        }
        for (var i = 8; i < 12; i++) {
            tab += "<td>" + (Math.round(this.List[row][i] * Minutes * 100 * this.CurrentValue_MAX[i - 4]) / 100) + "</td>";
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