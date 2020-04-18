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

function Input_getPC_endDate(NeedCorrection = false) {
    let end_elem = document.getElementById("PlanCombination_endDate");
    let endDate = end_elem.value;
    if (endDate === "") {
        endDate = addDate(new Date().toISOString().slice(0, 10), 7);
        if (NeedCorrection)
            end_elem.value = endDate;
    }
    return endDate;
}

function Input_getPC_planStartDate(NeedCorrection = false) {
    let startDate_elem = document.getElementById("PlanCombination_planStartDate");
    let startDate = startDate_elem.value;
    let startStartDate = Input_getPC_startDate();
    let startEndDate = addDate(Input_getPC_endDate(), -1);
    if (new Date(startDate) < new Date(startStartDate) || new Date(startDate) > new Date(startEndDate)) {
        if (NeedCorrection)
            startDate_elem.value = "";
        return "error";
    }
    return startDate;
}

function Input_resetPC_planStartDate() {
    let startDate_elem = document.getElementById("PlanCombination_planStartDate");
    startDate_elem.value = "";
}

function Input_getPC_planEndDate(NeedCorrection = false) {
    let endDate_elem = document.getElementById("PlanCombination_planEndDate");
    let endDate = endDate_elem.value;
    let endStartDate = addDate(Input_getPC_startDate(), 1);
    let endEndDate = Input_getPC_endDate();
    if (new Date(endDate) < new Date(endStartDate) || new Date(endDate) > new Date(endEndDate)) {
        if (NeedCorrection)
            endDate_elem.value = "";
        return "error";
    }
    return endDate;
}

function Input_resetPC_planEndDate() {
    let endDate_elem = document.getElementById("PlanCombination_planEndDate");
    endDate_elem.value = "";
}
