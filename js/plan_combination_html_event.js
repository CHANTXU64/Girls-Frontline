$("#PlanCombinationSwitch").on("click", function () {
    switchPlanCombination();
});

$("#PlanCombination_startDate").on("input propertychange", function () {
    PlanCombinationCharts.printChart_Timetable();
    PlanCombinationPlans.init();
    PlanCombinationTimePeriod.setMaxAndMinDate();
});

$("#PlanCombination_endDate").on("input propertychange", function () {
    PlanCombinationCharts.printChart_Timetable();
    PlanCombinationPlans.init();
    PlanCombinationTimePeriod.setMaxAndMinDate();
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
