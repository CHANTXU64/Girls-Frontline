function Input_getPC_startDate(NeedCorrection = false) {
    let start_elem = document.getElementById("PlanCombination_startDate");
    let startDate = start_elem.value;
    if (startDate === "") {
        startDate = new Date().toISOString().slice(0, 10);
        if (NeedCorrection)
            start_elem.value = startDate;
    }
    return startDate;
}

function Input_setPC_startDate(startDate) {
    let start_elem = document.getElementById("PlanCombination_startDate");
    start_elem.value = startDate;
}

function Input_getPC_totalDays(NeedCorrection = false) {
    let days_elem = $("#PlanCombination_totalDays");
    let days = getPositiveValueFromHTML($("#PlanCombination_totalDays"));
    days = Math.round(days);
    if (days === 0)
        days = 1;
    if (NeedCorrection)
        days_elem.val(days);
    return days;
}
