function switchPlanCombination() {
    if (document.getElementById("PlanCombinationSwitch").checked) {
        $("#plan_combination_card").removeClass("d-none");
        PlanCombinationCharts.printChart_Timetable();
    }
    else {
        $("#plan_combination_card").addClass("d-none");
    }
}
