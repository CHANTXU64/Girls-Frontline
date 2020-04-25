function switchPlanCombination() {
    if (document.getElementById("PlanCombinationSwitch").checked) {
        PlanCombination_on();
    }
    else {
        PlanCombination_off();
    }
    PlanCombinationChart.resize_Timetable();
}

function PlanCombination_on() {
    Input_setStartTime();
    Saved.cancelSelected();
    delete_rankingResults();
    HTML_AllowRankingInput();
    $("#plan_combination_card").removeClass("d-none");
    $("#PlanCombination_addTimePeriod").removeClass("d-none");
    $("#PC_addLogisticsPlan").removeClass("d-none");
    $("#target").addClass("d-none");
    $("#start_ranking").addClass("d-none");
    $("#result_card").addClass("d-none");
}

function PlanCombination_off() {
    switchLogisticsSetting();
    $("#plan_combination_card").addClass("d-none");
    $("#PlanCombination_addTimePeriod").addClass("d-none");
    $("#PC_addLogisticsPlan").addClass("d-none");
    $("#PC_addConsumptionPlan").addClass("d-none");
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

function LogisticsConsumptionPlanSwitch() {
    if (document.getElementById("LogisticsConsumptionPlanSwitch").checked) {
        switchConsumptionSetting();
    }
    else {
        switchLogisticsSetting();
    }
}

function switchConsumptionSetting() {
    document.getElementById("LogisticsConsumptionPlanSwitch").checked = true;
    $("#ConsumptionPlan_setting").removeClass("d-none");
    $("#PC_addLogisticsPlan").addClass("d-none");
    $("#PC_addConsumptionPlan").removeClass("d-none");
    $("#plan_setting").addClass("d-none");
}

function switchLogisticsSetting() {
    document.getElementById("LogisticsConsumptionPlanSwitch").checked = false;
    $("#ConsumptionPlan_setting").addClass("d-none");
    $("#PC_addLogisticsPlan").removeClass("d-none");
    $("#PC_addConsumptionPlan").addClass("d-none");
    $("#plan_setting").removeClass("d-none");
}

const ResourceSoftcap_List = [0, 3000, 3200, 3400, 3600, 3800, 4000, 4200, 4500, 4700, 5000, 5200, 5500, 5700, 6000, 6300, 6600, 6900, 7200, 7500, 7800, 8100, 8400, 8700, 9100, 9400, 9700, 10100, 10400, 10800, 11200, 11500, 11900, 12300, 12700, 13100, 13500, 13900, 14300, 14700, 15100, 15500, 16000, 16400, 16900, 17300, 17800, 18200, 18700, 19200, 19600, 20100, 20600, 21100, 21600, 22100, 22600, 23100, 23600, 24200, 24700, 25200, 25800, 26300, 26900, 27400, 28000, 28600, 29100, 29700, 30300, 30900, 31500, 32100, 32700, 33300, 33900, 34600, 35200, 35800, 36500, 37100, 37800, 38400, 39100, 39700, 40400, 41100, 41800, 42500, 43200, 43900, 44600, 45300, 46000, 46700, 47400, 48200, 48900, 49600, 50400, 51100, 51900, 52600, 53400, 54200, 55000, 55700, 56500, 57300, 58100, 58900, 59700, 60600, 61400, 62200, 63000, 63900, 64700, 65500, 66400, 67300, 68100, 69000, 69800, 70700, 71600, 72500, 73400, 74300, 75200, 76100, 77000, 77900, 78800, 79800, 80700, 81600, 82600, 83500, 84500, 85400, 86400, 87400, 88400, 89300, 90300, 91300, 92300, 93300, 94300, 95300, 96300, 97400, 98400, 99400, 100000];

function getResourceSoftcap(CommanderLevel) {
    let index = CommanderLevel;
    if (index > 156)
        return 100000 + 200 * (index - 156);
    else
        return ResourceSoftcap_List[index];
}

function PC_calcDemand() {
    let currentValue = Input_getPC_current(true);
    let startDate = Input_getPC_startDate();
    let endDate = Input_getPC_endDate();
    let totalDays = calcDaysBetween2Dates(startDate, endDate);
    let data = PlanCombinationChart._calcReAndCoData(currentValue, PC_LogisticsPlan.chartGetPlans(), PC_ConsumptionPlan.chartGetPlans(), totalDays);
    let demandValue = [];
    let data_lastIndex = data[0].length - 1;
    let targetValue = Input_getPC_target(true);
    for (let i = 0; i < 8; ++i) {
        let a = data[i][data_lastIndex];
        a = Math.max(0, targetValue[i] - a);
        demandValue.push(a);
    }
    Input_setPC_demand(demandValue);
}

function PC_saveAll() {
    let plans_length = PC_LogisticsPlan._plans.length;
    for (let i = 0; i < plans_length; ++i) {
        Saved._saved.push(PC_LogisticsPlan._plans[i].saved);
        Saved._printLastSaved();
    }
}

function plan_combination_init(data) {
    if (data === "LocalStorage") {
        let date = PC_storageGetItem("Date");
        if (date === "noStorage") {
            Input_setPC_startDate(new Date().toISOString().slice(0, 10));
            Input_setPC_endDate(addDate(new Date().toISOString().slice(0, 10), 7));
        }
        else {
            Input_setPC_startDate(date.start);
            Input_setPC_endDate(date.end);
        }
        let current = PC_storageGetItem("current");
        if (current !== "noStorage")
            Input_setPC_current(current);
        let target = PC_storageGetItem("target");
        if (target !== "noStorage")
            Input_setPC_target(target);
        let demand = PC_storageGetItem("demand");
        if (demand !== "noStorage")
            Input_setPC_demand(demand);
        PC_LogisticsPlan.init(PC_storageGetItem("LogisticsPlan"));
        PC_ConsumptionPlan.init(PC_storageGetItem("ConsumptionPlan"));
    }
    else {
        let date = data.date;
        Input_setPC_startDate(date.start);
        Input_setPC_endDate(date.end);
        let current = data.current;
        Input_setPC_current(current);
        let target = data.target;
        Input_setPC_target(target);
        let demand = data.demand;
        Input_setPC_demand(demand);
        PC_LogisticsPlan.init(data.LogisticsData);
        PC_ConsumptionPlan.init(data.ConsumptionData);
    }
    Input_setPC_startDate_MAXMIN();
    Input_setPC_endDate_MAXMIN();
    Input_setPC_planStartDate_MAXMIN();
    Input_setPC_planEndDate_MAXMIN();
    PlanCombinationChart.print(PC_LogisticsPlan.chartGetPlans(), PC_ConsumptionPlan.chartGetPlans());
}

function plan_combination_getConfigData() {
    let data = {};
    data.date = {};
    data.date.start = Input_getPC_startDate();
    data.date.end = Input_getPC_endDate();
    data.current = Input_getPC_current();
    data.target = Input_getPC_target();
    data.demand = Input_getPC_demand();
    data.LogisticsData = PC_LogisticsPlan.exportData();
    data.ConsumptionData = PC_ConsumptionPlan.exportData();
    return data;
}