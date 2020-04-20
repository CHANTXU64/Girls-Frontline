const G_ELEM_addTimePeriod_startDate = document.getElementById("PlanCombination_planStartDate");
const G_ELEM_addTimePeriod_endDate = document.getElementById("PlanCombination_planEndDate");
const G_ELEM_totalTimePeriod_startDate = document.getElementById("PlanCombination_startDate");
const G_ELEM_totalTimePeriod_endDate = document.getElementById("PlanCombination_endDate");
const G_DateTimePeriod_MIN = addDate(new Date().toISOString().slice(0, 10), -60);
const G_DateTimePeriod_MAX = addDate(new Date().toISOString().slice(0, 10), 365);

function Input_getPC_startDate(NeedCorrection = false) {
    let start_elem = G_ELEM_totalTimePeriod_startDate;
    let startDate = start_elem.value;
    let min = start_elem.getAttribute("min");
    let max = start_elem.getAttribute("max");
    if (startDate === "" || startDate < min || startDate > max) {
        startDate = new Date().toISOString().slice(0, 10);
        if (NeedCorrection)
            start_elem.value = startDate;
    }
    return startDate;
}

function Input_setPC_startDate(startDate) {
    let start_elem = G_ELEM_totalTimePeriod_startDate;
    start_elem.value = startDate;
}

function Input_setPC_startDate_MAXMIN() {
    let start_elem = G_ELEM_totalTimePeriod_startDate;
    start_elem.setAttribute("min", G_DateTimePeriod_MIN);
    let max = addDate(Input_getPC_endDate(), -1);
    start_elem.setAttribute("max", max);
}

function Input_getPC_endDate(NeedCorrection = false) {
    let end_elem = G_ELEM_totalTimePeriod_endDate;
    let endDate = end_elem.value;
    let min = end_elem.getAttribute("min");
    let max = end_elem.getAttribute("max");
    if (endDate === "" || endDate < min || endDate > max) {
        endDate = addDate(new Date().toISOString().slice(0, 10), 7);
        if (NeedCorrection)
            end_elem.value = endDate;
    }
    return endDate;
}

function Input_setPC_endDate_MAXMIN() {
    let end_elem = G_ELEM_totalTimePeriod_endDate;
    end_elem.setAttribute("max", G_DateTimePeriod_MAX);
    let min = addDate(Input_getPC_startDate(), 1);
    end_elem.setAttribute("min", min);
}

function Input_getPC_planStartDate(NeedCorrection = false) {
    let startDate_elem = G_ELEM_addTimePeriod_startDate;
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
    let startDate_elem = G_ELEM_addTimePeriod_startDate;
    startDate_elem.value = "";
}

function Input_setPC_planStartDate_MAXMIN() {
    let startDate_elem = G_ELEM_addTimePeriod_startDate;
    let totalTimePeriod_min = Input_getPC_startDate();
    startDate_elem.setAttribute("min", totalTimePeriod_min);
    let max;
    let endDate = Input_getPC_planEndDate();
    if (endDate !== "")
        max = addDate(endDate, -1);
    else
        max = addDate(Input_getPC_endDate(), -1);
    startDate_elem.setAttribute("max", max);
}

function Input_getPC_planEndDate(NeedCorrection = false) {
    let endDate_elem = G_ELEM_addTimePeriod_endDate;
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
    let endDate_elem = G_ELEM_addTimePeriod_endDate;
    endDate_elem.value = "";
}

function Input_setPC_planEndDate_MAXMIN() {
    let endDate_elem = G_ELEM_addTimePeriod_endDate;
    let totalTimePeriod_max = Input_getPC_endDate();
    endDate_elem.setAttribute("max", totalTimePeriod_max);
    let min;
    let startDate = Input_getPC_planStartDate();
    if (startDate !== "")
        min = addDate(startDate, 1);
    else
        min = addDate(Input_getPC_startDate(), 1);
    endDate_elem.setAttribute("min", min);
}
