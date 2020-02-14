function calcTargetValueTool_Clear() {
    Input_setCalcTargetValueTool_Target();
    Input_setCalcTargetValueTool_Current();
    Input_setCalcTargetValueTool_InputExecutionTimes();
    const resultName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    for (let i = 0; i < 8; i++) {
        $("#calcTargetValueTool_Result_" + resultName[i] + "_value").html("");
    }
}

/**计算需求量并返回 */
function calcTargetValueTool_startCalc() {
    let resultValue = [0, 0, 0, 0, 0, 0, 0, 0];
    const TargetValue = Input_getCalcTargetValueTool_Target(true);
    const CurrentValue = Input_getCalcTargetValueTool_Current(true);
    const ExecutionTimes = Input_getCalcTargetValueTool_InputExecutionTimes(true);
    for (let i = 0; i < 8; i++) {
        resultValue[i] = Math.max(0, (TargetValue[i] - CurrentValue[i]) / ExecutionTimes);
    }
    const resultName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    for (let i = 0; i < 8; i++) {
        $("#calcTargetValueTool_Result_" + resultName[i] + "_value").html(NumberAutoExact(resultValue[i]));
    }
    return resultValue;
}

function calcTargetValueTool_apply() {
    let resultValue = calcTargetValueTool_startCalc();
    if (is_CalculateByHour()) {
        let ShownTab = getShownTab();
        const TotalTime = ShownTab.getTotalTime() / 60;
        for (let i = 0; i < 8; i++) {
            resultValue[i] /= TotalTime;
        }
    }
    Input_setTarget(resultValue);
}