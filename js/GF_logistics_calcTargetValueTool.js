function calcTargetValueTool_Clear() {
    Input_setCalcTargetValueTool_Target();
    Input_setCalcTargetValueTool_Current();
    Input_setCalcTargetValueTool_InputExecutionTimes();
    var resultName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    for (var i = 0; i < 8; i++) {
        $("#calcTargetValueTool_Result_" + resultName[i] + "_value").html("");
    }
}

function calcTargetValueTool_startCalc() {
    var resultValue = [0, 0, 0, 0, 0, 0, 0, 0];
    var TargetValue = Input_getCalcTargetValueTool_Target(true);
    var CurrentValue = Input_getCalcTargetValueTool_Current(true);
    var ExecutionTimes = Input_getCalcTargetValueTool_InputExecutionTimes(true);
    for (var i = 0; i < 8; i++) {
        resultValue[i] = Math.max(0, (TargetValue[i] - CurrentValue[i]) / ExecutionTimes);
    }
    var resultName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    for (var i = 0; i < 8; i++) {
        $("#calcTargetValueTool_Result_" + resultName[i] + "_value").html(NumberAutoExact(resultValue[i]));
    }
    return resultValue;
}

function calcTargetValueTool_apply() {
    var resultValue = calcTargetValueTool_startCalc();
    if (is_CalculateByHour()) {
        var ShownTab = getShownTab();
        ShownTab.setTime();
        var TotalTime = ShownTab.TotalTime / 60;
        for (var i = 0; i < 8; i++) {
            resultValue[i] /= TotalTime;
        }
    }
    Input_setTarget(resultValue);
}