function switchPlanCombination() {
    if (document.getElementById("PlanCombinationSwitch").checked) {
        PlanCombination_on();
    }
    else {
        PlanCombination_off();
    }
    PlanCombinationCharts.resize_Timetable();
}

function PlanCombination_on() {
    Input_setStartTime();
    delete_rankingResults();
    HTML_AllowRankingInput();
    $("#plan_combination_card").removeClass("d-none");
    $("#PlanCombination_addTimePeriod").removeClass("d-none");
    $("#PC_addPlan").removeClass("d-none");
    $("#target").addClass("d-none");
    $("#start_ranking").addClass("d-none");
    $("#result_card").addClass("d-none");
    PlanCombinationCharts.printChart_Timetable();
    PlanCombinationPlans.init();
    PlanCombinationTimePeriod.setMaxAndMinDate();
}

function PlanCombination_off() {
    $("#plan_combination_card").addClass("d-none");
    $("#PlanCombination_addTimePeriod").addClass("d-none");
    $("#PC_addPlan").addClass("d-none");
    $("#target").removeClass("d-none");
    $("#start_ranking").removeClass("d-none");
    $("#result_card").removeClass("d-none");
}

function PlanCombination_disabledDate() {
    $("#PlanCombination_startDate").attr("disabled", "true");
    $("#PlanCombination_endDate").attr("disabled", "true");
}

function PlanCombination_enabledDate() {
    $("#PlanCombination_startDate").removeAttr("disabled");
    $("#PlanCombination_endDate").removeAttr("disabled");
}

function PC_totalTimePeriodStartDateHasChanged() {
    Input_setPC_endDate_MAXMIN();
    Input_setPC_planStartDate_MAXMIN();
    Input_setPC_planEndDate_MAXMIN();
    PlanCombinationTimePeriod.clear();
}

function PC_totalTimePeriodEndDateHasChanged() {
    Input_setPC_startDate_MAXMIN();
    Input_setPC_planStartDate_MAXMIN();
    Input_setPC_planEndDate_MAXMIN();
    PlanCombinationTimePeriod.clear();
}
