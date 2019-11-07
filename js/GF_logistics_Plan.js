class Plan {
    constructor(length) {
        this._setList(length);
        this.TargetValue = this._getLegalityTargetValue();
        this._CorrectTargetValue();
        this._Norm_Target = this._getNorm(this.TargetValue);
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
        var Resource_CalibrationValue = 1000;
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
        var Contract_CalibrationValue = 1000;
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

	_getNorm(vector) {
		var norm;
		var SumOfSquares = 0;
		for (var i = 0; i < vector.length; i++) {
			SumOfSquares += Math.pow(vector[i], 2);
		}
        norm = Math.pow(SumOfSquares, 0.5);
        return norm;
	}

    CalculateAndPush(MissionsNumber) {
        this._MissionsNumber = MissionsNumber;
        this._CurrentValue = ShownTab.Calculate_Current(MissionsNumber);
        this._PlanValue = this._calculateValue();
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
            if (this._thisPlanIsBetterThan(i)) {
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
    _thisPlanIsBetterThan(number) {
        if (this._eachCurrentValueIsBigger(number)) {
            test_2++;
            return true;
        }
        else {
            if (this._PlanValue > this.List[number].Value) return true;
            else return false;
        }
    }
    _eachCurrentValueIsBigger(number) {
        for (var i = 0; i < 4; i++) {
            if (this._CurrentValue[i] < this.List[number][i + 4]) return false;
        }
        return true;
    }

    _calculateValue() {
        var CurrentValue = new Array(7);
        for (var i = 0; i < 7; i++) {
            CurrentValue[i] = this._CurrentValue[i];
        }
        CurrentValue[4] *= 500;
        CurrentValue[5] *= 500;
        CurrentValue[6] *= 500;
        var Norm_Current = this._getNorm(CurrentValue);
        var Dot_product = this._getDotProduct(CurrentValue, this.TargetValue);
        var CurrentScalarProjection = Dot_product / this._Norm_Target;
        for (var i = 0; i < 7; i++) {
            if (this.TargetValue[i] == 0) CurrentValue[i] = 0;
        }
        Norm_Current = this._getNorm(CurrentValue);
        Dot_product = this._getDotProduct(CurrentValue, this.TargetValue);
        var COStheta = Dot_product / this._Norm_Target / Norm_Current;
        //var COStheta = CurrentScalarProjection / Norm_Current;
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