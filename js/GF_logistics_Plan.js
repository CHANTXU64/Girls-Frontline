class Plan {
    constructor(ShownTab, List_length, Target_Value) {
        this._setResourceIncreasingRate();
        this._setList(List_length);
        this.ShownTab = ShownTab;
        this.CurrentValue_MAX = ShownTab.CurrentValue_MAX;
        if (Target_Value === undefined) {
            this.TargetValue_html = Input_getTarget_Correct(); 
            this.TargetValue = this._CorrectTargetValue();
        }
        else {
            this.TargetValue = Target_Value;
            this.TargetValue_half = this.TargetValue.slice();
            for (var i = 0; i < 8; i++) {
                this.TargetValue_half[i] = this.TargetValue_half[i] * 0.5;
            }
        }
        this._Norm_Target = this._getNorm(this.TargetValue);
    }
    _setResourceIncreasingRate() {
        var TotalRate = Input_getTotalGreatSuccessRate(true);
        this.ResourceIncreasingRate = 1 + (TotalRate) / 200;
    }
    _setList(length) {
        this.List = new Array(length);
        for (var i = 0; i < length; i++) {
            this.List[i] = new Array(12);
            this.List[i].Value = 0;//该方案价值
        }
    }
    _CorrectTargetValue() {
        var ResourceValue = this._CorrectResourceValue();
        var ContractValue = this._CorrectContractValue();
        var TargetValue = ResourceValue.concat(ContractValue);
        if (TargetValue.toString() == "0,0,0,0,0,0,0,0") {
            alert(language.JS.TargetValue0_alert);
            HTML_AllowInput();
            throw"--";
        }
        return TargetValue;
    }
    _CorrectResourceValue() {
        var ResourceValue = this.TargetValue_html.slice(0, 4);
        var Resource_CalibrationValue = 100 - Input_getContractWeight();
        if (this._ValuesNotAll0(ResourceValue)) {
            this._CorrectValue(ResourceValue, Resource_CalibrationValue);
        }
        return ResourceValue;
    }
    _CorrectContractValue() {
        var ContractValue = this.TargetValue_html.slice(4, 8);
        var Contract_CalibrationValue = Input_getContractWeight();
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
        for (var i = 0; i < 8; i++) {
            if (this._CurrentValue[i] < this.TargetValue_half[i])
                return;
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
        if (this._PlanValue > this.List[number].Value)
            return true;
        else
            return false;
    }

    _calculateValue() {
        var CurrentValue = [0, 0, 0, 0, 0, 0, 0, 0];
        var TargetValue = this.TargetValue;
        var _CurrentValue = this._CurrentValue;
        if (TargetValue[0] !== 0)
            CurrentValue[0] = _CurrentValue[0];
        if (TargetValue[1] !== 0)
            CurrentValue[1] = _CurrentValue[1];
        if (TargetValue[2] !== 0)
            CurrentValue[2] = _CurrentValue[2];
        if (TargetValue[3] !== 0)
            CurrentValue[3] = _CurrentValue[3];
        if (TargetValue[4] !== 0)
            CurrentValue[4] = _CurrentValue[4] * 500;
        if (TargetValue[5] !== 0)
            CurrentValue[5] = _CurrentValue[5] * 500;
        if (TargetValue[6] !== 0)
            CurrentValue[6] = _CurrentValue[6] * 500;
        if (TargetValue[7] !== 0)
            CurrentValue[7] = _CurrentValue[7] * 500;
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
        if (vector1.length !== vector2.length) throw"getDotProduct error";
        var Dot_product = 0;
        for (var i = 0; i < vector1.length; i++) {
            Dot_product += (vector1[i] * vector2[i]);
        }
        return Dot_product;
    }

    _calculateValue_2() {
        return Value2(this.TargetValue, this._CurrentValue);
    }

    print(fineTuningExpanded, SortBy = "Ranking") {
        if (!(0 in this.List[0])) {
            var Table = document.getElementById("Plan_Table");
            Table.innerHTML = language.JS.NoPlan;
            RESULT_PLAN = [];
            throw"--";
        }
        var result_plan = [];
        for (var i = 0; i < this.List.length; i++) {
            if (!(0 in this.List[i])) break;
            var one_plan = [];
            one_plan.push(i);
            var MissionsNumber = new Array(4);
            for (var ii = 0; ii < 4; ii++) {
                MissionsNumber[ii] = this.ShownTab.Qvalid[this.List[i][ii]][0];
            }
            MissionsNumber = MissionsNumber.sort(sortStringNumber);
            for (var ii = 0; ii < 4; ii++) {
                one_plan.push(MissionsNumber[ii]);
            }
            for (var ii = 0; ii < 4; ii++) {
                one_plan.push(this.List[i][ii + 4] * this.ResourceIncreasingRate * this.CurrentValue_MAX[ii]);
            }
            for (var ii = 4; ii < 8; ii++) {
                one_plan.push(this.List[i][ii + 4] * this.CurrentValue_MAX[ii]);
            }
            var customPrint = this.ShownTab.PrintTableCustomize(this, i);
            for (var ii = 0; ii < customPrint.length; ii++) {
                one_plan.push(customPrint[ii]);
            }
            result_plan.push(one_plan);
        }
        var Minutes;
        if (is_CalculateByHour())
            Minutes = 60;
        else
            Minutes = this.ShownTab.TotalTime;

        switch(SortBy) {
            case "Ranking":
                RESULT_PLAN_SORT_BY = "Ranking";
                break;
            case "Manp":
                quick_sort_expand_descending(result_plan, 5);
                RESULT_PLAN_SORT_BY = "Manp";
                break;
            case "Ammu":
                quick_sort_expand_descending(result_plan, 6);
                RESULT_PLAN_SORT_BY = "Ammu";
                break;
            case "Rati":
                quick_sort_expand_descending(result_plan, 7);
                RESULT_PLAN_SORT_BY = "Rati";
                break;
            case "Part":
                quick_sort_expand_descending(result_plan, 8);
                RESULT_PLAN_SORT_BY = "Part";
                break;
            case "TPro":
                quick_sort_expand_descending(result_plan, 9);
                RESULT_PLAN_SORT_BY = "TPro";
                break;
            case "Equi":
                quick_sort_expand_descending(result_plan, 10);
                RESULT_PLAN_SORT_BY = "Equi";
                break;
            case "QPro":
                quick_sort_expand_descending(result_plan, 11);
                RESULT_PLAN_SORT_BY = "QPro";
                break;
            case "QRes":
                quick_sort_expand_descending(result_plan, 12);
                RESULT_PLAN_SORT_BY = "QRes";
                break;
        }
        RESULT_PLAN = result_plan;
        print_result_plan(fineTuningExpanded, result_plan, Minutes);
    }
}

function sortStringNumber(a, b) {
    var aa, bb;
    aa = parseInt(a.replace(/[^0-9]/ig,""));
    bb = parseInt(b.replace(/[^0-9]/ig,""));
    return aa - bb;
}

function print_result_plan(fineTuningExpanded, result_plan, Minutes) {
    var focusedElementID = document.activeElement.id;
    var Table = document.getElementById("Plan_Table");
    var tab = getHTMLFineTuningTool();
    tab += '<div class="table-responsive">';
    tab += '<table class="table table-striped table-hover table-responsive text-nowrap" style="margin-bottom: 0px; cursor: default;">';
    var ShownTab = getShownTab();
    tab += (ShownTab.PrintPlanTableTitle() + '<tbody>');
    var is_selected;
    var selectedMissions;
    if (MISSION_TABLE_SELECT.length === 4) {
        is_selected = true;
        selectedMissions = MISSION_TABLE_SELECT.slice();
        selectedMissions.sort(sortStringNumber);
    }
    else
        is_selected = false;
    for (var i = 0; i < result_plan.length; i++) {
        if (is_selected) {
            if (result_plan[i][1] === selectedMissions[0] && result_plan[i][2] === selectedMissions[1] && result_plan[i][3] === selectedMissions[2] && result_plan[i][4] === selectedMissions[3])
                tab += "<tr tabindex='0' id='print_result_plan_tr_" + i + "' class='success'>";
            else
                tab += "<tr tabindex='0' id='print_result_plan_tr_" + i + "'>";
        }
        else
            tab += "<tr tabindex='0' id='print_result_plan_tr_" + i + "'>";
        for (var ii = 0; ii < 4; ii++) {
            tab += "<td style='text-align: center'>";
            tab += "" + result_plan[i][ii + 1];
            tab += "</td>";
        }
        for (var ii = 4; ii < 8; ii++) {
            tab += "<td style='text-align: center'>";
            tab += "" + Math.round(result_plan[i][ii + 1] * Minutes * 10) / 10;
            tab += "</td>";
        }
        for (var ii = 8; ii < 12; ii++) {
            tab += "<td style='text-align: center'>";
            tab += "" + Math.round(result_plan[i][ii + 1] * Minutes * 100) / 100;
            tab += "</td>";
        }
        var one_plan_length = result_plan[0].length;
        for (var ii = 13; ii < one_plan_length; ii++) {
            tab += "<td style='text-align: center'>";
            tab += result_plan[i][ii];
            tab += "</td>";
        }
        tab += "</tr>";
    }
    tab += '</tbody>';
    Table.innerHTML = tab;
    if (fineTuningExpanded) {
        document.getElementById("FineTuningTool").style.transition = "none";
        $("#FineTuningTool").collapse("show");
    }
    if (IsMobile())
        document.getElementById("FineTuningTool").style.transition = "none";
    document.getElementById("start_sorting_html").style.display = "none";
    if (focusedElementID !== "")
        document.getElementById(focusedElementID).focus();
}