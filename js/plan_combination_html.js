function switchPlanCombination() {
    if (document.getElementById("PlanCombinationSwitch").checked) {
        $("#plan_combination_card").removeClass("d-none");
        PlanCombinationCharts.printChart_Timetable();
        $("#PlanCombination_addPlan").removeClass("d-none");
        $("#PC_addPlan").removeClass("d-none");
        $("#target").addClass("d-none");
        $("#start_ranking").addClass("d-none");
        $("#result_card").addClass("d-none");
    }
    else {
        $("#plan_combination_card").addClass("d-none");
        $("#PlanCombination_addPlan").addClass("d-none");
        $("#PC_addPlan").addClass("d-none");
        $("#target").removeClass("d-none");
        $("#start_ranking").removeClass("d-none");
        $("#result_card").removeClass("d-none");
    }
    PlanCombinationCharts.resize_Timetable();
}
