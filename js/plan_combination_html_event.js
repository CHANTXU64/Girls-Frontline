Input_setPC_startDate_MAXMIN();
Input_setPC_endDate_MAXMIN();
Input_getPC_startDate(true);
Input_getPC_endDate(true);

$("#PlanCombinationSwitch").on("click", function () {
    switchPlanCombination();
});

const JQ_selector_PC_startDate = $("#PlanCombination_startDate");

JQ_selector_PC_startDate.on("input propertychange", function () {
    PC_totalTimePeriodStartDateHasChanged();
});

JQ_selector_PC_startDate.on("blur", function () {
    Input_getPC_startDate(true);
    PlanCombinationCharts.printChart_Timetable();
    PlanCombinationPlans.init();
});

const JQ_selector_PC_endDate = $("#PlanCombination_endDate");

JQ_selector_PC_endDate.on("input propertychange", function () {
    PC_totalTimePeriodEndDateHasChanged();
});

JQ_selector_PC_endDate.on("blur", function () {
    Input_getPC_endDate(true);
    PlanCombinationCharts.printChart_Timetable();
    PlanCombinationPlans.init();
});

const JQ_selector_PC_addTimePeriodStartDate = $("#PlanCombination_planStartDate");

JQ_selector_PC_addTimePeriodStartDate.on("blur", function () {
    Input_getPC_planStartDate(true);
    Input_setPC_planEndDate_MAXMIN();
})

const JQ_selector_PC_addTimePeriodEndDate = $("#PlanCombination_planEndDate");

JQ_selector_PC_addTimePeriodEndDate.on("blur", function () {
    Input_getPC_planEndDate(true);
    Input_setPC_planStartDate_MAXMIN();
})

$("#PC_deleteAllPlans").on("click", function () {
    PlanCombinationPlans.deleteAll();
});

$("#addNewTimePeriod").on("click", function () {
    PlanCombinationTimePeriod.add();
});

$("#deleteAllTimePeriod").on("click", function () {
    PlanCombinationTimePeriod.clear();
});

$("#PC_addPlan").on("click", function () {
    PlanCombinationPlans.add();
});
