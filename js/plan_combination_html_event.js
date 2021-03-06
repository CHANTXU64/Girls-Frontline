$("#PlanCombinationSwitch").on("click", function () {
    switchPlanCombination();
});

const JQ_selector_PC_startDate = $("#PlanCombination_startDate");

JQ_selector_PC_startDate.on("input propertychange", function () {
    PC_totalTimePeriodStartDateHasChanged();
});

JQ_selector_PC_startDate.on("blur", function () {
    let startDate = Input_getPC_startDate(true);
    let endDate = Input_getPC_endDate();
    PC_storageSetItem("Date", {start: startDate, end: endDate});
    PC_LogisticsPlan.reset();
    PC_ConsumptionPlan.reset();
    PlanCombinationChart.print();
});

const JQ_selector_PC_endDate = $("#PlanCombination_endDate");

JQ_selector_PC_endDate.on("input propertychange", function () {
    PC_totalTimePeriodEndDateHasChanged();
});

JQ_selector_PC_endDate.on("blur", function () {
    let endDate = Input_getPC_endDate(true);
    let startDate = Input_getPC_startDate();
    PC_storageSetItem("Date", {start: startDate, end: endDate});
    PC_LogisticsPlan.reset();
    PC_ConsumptionPlan.reset();
    PlanCombinationChart.print();
});

$("#CommanderLevel").on("blur", function () {
    PC_storageSetItem("level", Input_getPC_CommanderLevel());
    PlanCombinationChart.print(PC_LogisticsPlan.chartGetPlans(), PC_ConsumptionPlan.chartGetPlans());
})

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
        PC_ConsumptionPlan.deleteAll();
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

$("#consumption_saved").on("click", "a[id^=consumption_saved_row_]", function () {
    ConsumptionSaved.click(parseInt(stringSliceFromLast_(this.id)));
});
$("#consumption_saved").on("click", "button[id^=consumption_close_row_]", function () {
    ConsumptionSaved.delete(parseInt(stringSliceFromLast_(this.id)));
});
$("#consumption_saved_button").on("click", function () {
    ConsumptionSaved.save();
});

$("#Consumption_reset").on("click", function () {
    $("#Consumption_select").val(0);
    Input_setPC_Consumption_reAndco([0, 0, 0, 0, 0, 0, 0, 0]);
    Input_setPC_Consumption_times();
});

$("#Consumption_tbody").on("click", "button[id^=Consumption_table_close_row_]", function () {
    let row = stringSliceFromLast_(this.id);
    let tr_id = "Consumption_table_row_" + row;
    PC_ConsumptionPlan._table_deleteThisRow(tr_id);
});

$("#Consumption_tbody").on("click", "button[id^=Consumption_table_apply_row_]", function () {
    let row = stringSliceFromLast_(this.id);
    let tr_id = "Consumption_table_row_" + row;
    PC_ConsumptionPlan.table_applyThisRow(tr_id);
});

$("#PC_startRanking").on("click", function () {
    PC_start_ranking();
})

$("#PlanCombination_current_box").on("blur", "input[id^=PC_current_]", function () {
    PlanCombinationChart.print(PC_LogisticsPlan.chartGetPlans(), PC_ConsumptionPlan.chartGetPlans());
    PC_storageSetItem("current", Input_getPC_current());
});

$("#PlanCombination_current_box").on("focus", "input[id^=PC_current_]", function () {
    this.select();
});

$("#PlanCombination_demand_card").on("blur", "input[id^=PC_target_]", function () {
    PC_storageSetItem("target", Input_getPC_target());
});

$("#PlanCombination_demand_card").on("focus", "input[id^=PC_target_]", function () {
    this.select();
});

$("#PlanCombination_demand_card").on("blur", "input[id^=PC_demand_]", function () {
    PC_storageSetItem("demand", Input_getPC_demand());
});

$("#PlanCombination_demand_card").on("focus", "input[id^=PC_demand_]", function () {
    this.select();
});

$("#PC_calcDemand").on("click", function () {
    PC_calcDemand();
});

$("#PC_saveAll").on("click", function () {
    Modal.confirm(language.JS.PC_saveAll_confirm, function () {
        PC_saveAll();
    });
});

$("#Consumption_select").on("change", function () {
    let value = consumption_preset[this.selectedIndex - 1];
    Input_setPC_Consumption_reAndco(value);
    $("#Consumption_select").val(0);
});

$("input[id^=Consumption_]").on("focus", function () {
    this.select();
})

$("#PC_changeStartDate").on("click", function () {
    PC_changeStartDate();
});

$("#PC_changeEndDate").on("click", function () {
    PC_changeEndDate();
});
