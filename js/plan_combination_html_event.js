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
    PlanCombinationChart.print();
    PC_LogisticsPlan.init();
});

const JQ_selector_PC_endDate = $("#PlanCombination_endDate");

JQ_selector_PC_endDate.on("input propertychange", function () {
    PC_totalTimePeriodEndDateHasChanged();
});

JQ_selector_PC_endDate.on("blur", function () {
    Input_getPC_endDate(true);
    PlanCombinationChart.print();
    PC_LogisticsPlan.init();
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
    Modal.confirm(language.JS.PC_deleteAll_confirm, function () {
        PC_LogisticsPlan.deleteAll();
    });
});

$("#LogisticsConsumptionPlanSwitch").on("click", function () {
    LogisticsConsumptionPlanSwitch();
});

$("#addNewTimePeriod").on("click", function () {
    PlanCombinationTimePeriod.add();
});

$("#deleteAllTimePeriod").on("click", function () {
    PlanCombinationTimePeriod.clear();
});

$("#PC_DateTimePeriod_body").on("click", "button[id^=PC_TimePeriod_close_]", function () {
    let row = stringSliceFromLast_(this.id);
    let tr_id = "PC_TimePeriod_" + row;
    PlanCombinationTimePeriod.deleteThisRow(tr_id);
});

$("#PC_addLogisticsPlan").on("click", function () {
    PC_LogisticsPlan.add();
});

$("#PC_addConsumptionPlan").on("click", function () {
    PC_ConsumptionPlan.add();
});

$("#Consumption_add").on("click", function () {
    PC_ConsumptionPlan.table_add();
});

$("#Consumption_reset").on("click", function () {
    Input_setPC_Consumption_reAndco();
    Input_setPC_Consumption_times();
    // PC_ConsumptionPlan.
});

$("#Consumption_tbody").on("click", "button[id^=Consumption_table_close_row_]", function () {
    let row = stringSliceFromLast_(this.id);
    let tr_id = "Consumption_table_row_" + row;
    PC_ConsumptionPlan._table_deleteThisRow(tr_id);
});

$("#PC_startRanking").on("click", function () {
    PC_ranking_start();
    setTimeout(PC_start_ranking, 1);
    setTimeout(PC_ranking_end, 1);
})
function PC_ranking_start() {
    html_waiting();
}
function PC_ranking_end() {
    html_waiting_cancel();
}

$("#PlanCombination_current_box").on("blur", "input[id^=PC_current_]", function () {
    PlanCombinationChart.print(PC_LogisticsPlan.chartGetPlans(), PC_ConsumptionPlan.chartGetPlans());
});

$("#PC_calcDemand").on("click", function () {
    PC_calcDemand();
});

$("#PC_saveAll").on("click", function () {
    Modal.confirm(language.JS.PC_saveAll_confirm, function () {
        PC_saveAll();
    });
});
