class PlanCombinationChart {
    static resize_Timetable() {
        let Chart_elem = document.getElementById("PlanCombination_chart");
        if (Chart_elem.getAttribute("_echarts_instance_") === null || !document.getElementById("PlanCombinationSwitch").checked)
            return ;
        let Chart = echarts.getInstanceByDom(Chart_elem);
        Chart.resize();
    }

    static printFromLogisticsPlan(LogisticsPlanData) {
        let ConsumptionPlanData = PC_ConsumptionPlan.chartGetPlans();
        this.print(LogisticsPlanData, ConsumptionPlanData);
    }

    static printFromConsumptionPlan(ConsumptionPlanData) {
        let LogisticsPlanData = PC_LogisticsPlan.chartGetPlans();
        this.print(LogisticsPlanData, ConsumptionPlanData);
    }

    static print(LogisticsPlanData, ConsumptionPlanData) {
        let L_length;
        if (LogisticsPlanData === undefined)
            L_length = 0;
        else
            L_length = LogisticsPlanData.length;
        let C_length;
        if (ConsumptionPlanData === undefined)
            C_length = 0;
        else
            C_length = ConsumptionPlanData.length;
        if (L_length === 0 && C_length === 0)
            this._print_main();
        else if (L_length === 0 && C_length !== 0)
            this._print_main(undefined, ConsumptionPlanData);
        else if (L_length !== 0 && C_length === 0)
            this._print_main(LogisticsPlanData);
        else if (L_length !== 0 && C_length !== 0)
            this._print_main(LogisticsPlanData, ConsumptionPlanData);
    }

    static _print_main(LogisticsPlanData = [{timePeriod: [0, 0], time: 0, number: -1, reAndco: []}], ConsumptionPlanData = [{timePeriod: [0, 0], TimetableData: [0], number: -1, reAndco: []}]) {
        let Chart_elem = document.getElementById("PlanCombination_chart");
        let Chart; //图表实例
        if (Chart_elem.getAttribute("_echarts_instance_") === null || Chart_elem.getAttribute("_echarts_instance_") === "")
            Chart = echarts.init(Chart_elem);
        else {
            Chart = echarts.getInstanceByDom(Chart_elem);
            Chart.off("click");
            Chart.clear();
            // Chart.dispose();
            // Chart = echarts.init(Chart_elem);
        }

        let startDate = Input_getPC_startDate();
        let endDate = Input_getPC_endDate();
        let totalDays = calcDaysBetween2Dates(startDate, endDate);

        this._LogisticsTimetableData = this._LogisticsPlanDataToTimetableData(LogisticsPlanData, totalDays);
        this._ConsumptionTimetableData = this._ConsumptionPlanDataToTimetableData(ConsumptionPlanData, totalDays);
        let currentValue = Input_getPC_current(true);
        this._reAndcoData = this._calcReAndCoData(currentValue, LogisticsPlanData, ConsumptionPlanData, totalDays);

        let option = plan_combination_getChartOption(startDate, endDate);
        Chart.setOption(option);

        Chart.on("click", {seriesIndex: 8}, function (params) {
            let plan_number = params.data.name;
            PC_LogisticsPlan.apply(plan_number);
            $("#PC_deletePlan").removeAttr("disabled");
            $("#PC_deletePlan").off();
            $("#PC_deletePlan").on("click", function () {
                PC_LogisticsPlan.deleteThis(plan_number);
                $("#PC_deletePlan").attr("disabled", "true");
            });
            Saved.cancelSelected();
        });

        Chart.on("click", {seriesIndex: 9}, function (params) {
            let plan_number = params.data.name;
            $("#PC_deletePlan").removeAttr("disabled");
            $("#PC_deletePlan").off();
            $("#PC_deletePlan").on("click", function () {
                PC_ConsumptionPlan.deleteThis(plan_number);
                $("#PC_deletePlan").attr("disabled", "true");
            });
        });
    }

    static _LogisticsPlanDataToTimetableData(LogisticsPlanData, totalDays) {
        let data = [];
        let timetable = new Array(totalDays);
        timetable.fill(0);

        let plans_length = LogisticsPlanData.length;
        for (let i = 0; i < plans_length; ++i) {
            let newData = {};
            newData.name = LogisticsPlanData[i].number;
            let thisTimeData = LogisticsPlanData[i];
            let thisPlanTotalTime = thisTimeData.time;
            //格式[height, (xindex, yindex, width,) (xindex......]
            newData.value = [thisPlanTotalTime];
            let timePeriod_length = thisTimeData.timePeriod.length;
            for (let ii = 0; ii < timePeriod_length; ++ii) {
                let startDate = thisTimeData.timePeriod[ii][0];
                let endDate = thisTimeData.timePeriod[ii][1];
                let lastYIndex = -1;
                for (let date = startDate; date < endDate; ++date) {
                    timetable[date] += thisPlanTotalTime;
                    let yIndex = timetable[date];
                    let timeData = newData.value;
                    if (yIndex === lastYIndex) {
                        timeData[timeData.length - 1]++;
                    }
                    else {
                        let xIndex = date;
                        timeData.push(xIndex);
                        timeData.push(yIndex);
                        timeData.push(1);
                        lastYIndex = timetable[date];
                    }
                }
            }
            newData.itemStyle = {};
            newData.itemStyle.color = this.colorList[i];
            data.push(newData);
        }
        return data;
    }

    static _ConsumptionPlanDataToTimetableData(ConsumptionPlanData, totalDays) {
        let data = [];
        let plans_length = ConsumptionPlanData.length;
        for (let i = 0; i < plans_length; ++i) {
            let newData = {};
            newData.name = ConsumptionPlanData[i].number;
            newData.value = ConsumptionPlanData[i].TimetableData;
            newData.itemStyle = {};
            newData.itemStyle.color = this.colorList[i];
            data.push(newData);
        }
        return data;
    }

    static _calcReAndCoData(currentValue, LogisticsPlanData, ConsumptionPlanData, totalDays) {
        let data = [];
        for (let i = 0; i < 8; ++i) {
            let newData = new Array(totalDays);
            newData.fill(0);
            newData[0] = currentValue[i];
            let L_plans_length = LogisticsPlanData.length;
            for (let ii = 0; ii < L_plans_length; ++ii) {
                let reORco = LogisticsPlanData[ii].reAndco[i];
                let timePeriod_length = LogisticsPlanData[ii].timePeriod.length;
                for (let iii = 0; iii < timePeriod_length; ++iii) {
                    let startDate = LogisticsPlanData[ii].timePeriod[iii][0];
                    let endDate = LogisticsPlanData[ii].timePeriod[iii][1];
                    for (let date = startDate; date < endDate; ++date) {
                        newData[date] += reORco;
                    }
                }
            }
            let C_plans_length = ConsumptionPlanData.length;
            for (let ii = 0; ii < C_plans_length; ++ii) {
                let reORco = ConsumptionPlanData[ii].reAndco[i];
                let timePeriod_length = ConsumptionPlanData[ii].timePeriod.length;
                for (let iii = 0; iii < timePeriod_length; ++iii) {
                    let startDate = ConsumptionPlanData[ii].timePeriod[iii][0];
                    let endDate = ConsumptionPlanData[ii].timePeriod[iii][1];
                    for (let date = startDate; date < endDate; ++date) {
                        newData[date] += reORco;
                    }
                }
            }

            if (i < 4)
                newData[0] = Math.min(Math.round(newData[0]), 300000);
            else
                newData[0] = Math.round(newData[0]);
            for (let ii = 1; ii < totalDays; ++ii) {
                let value = Math.round(newData[ii] + newData[ii - 1]);
                if (i < 4)
                    newData[ii] = value < 300000 ? value : 300000;
                else
                    newData[ii] = value;
            }
            newData.unshift(Math.round(currentValue[i]));
            data.push(newData);
        }
        return data;
    }
}

PlanCombinationChart.colorList = [
    "#D98880", "#F1948A", "#C39BD3", "#A569BD", "#7FB3D5", "#85C1E9", "#76D7C4",
    "#73C6B6", "#A9DFBF", "#2ECC71", "#F7DC6F", "#F8C471", "#F0B27A", "#BFC9CA",
    "#B2BABB", "#85929E"
];

function PC_renderItem_Logistics(params, api) {
    let style = api.style();
    let groupChildren = [];
    let totalTime = api.value(0);
    let index = params.dataIndex;
    let data_value = PlanCombinationChart._LogisticsTimetableData[index].value;
    let i = 0;
    while (!isNaN(data_value[3 * i + 1])) {
        let start = api.coord([data_value[3 * i + 1], data_value[3 * i + 2]]);
        let size = api.size([data_value[3 * i + 3], totalTime]);
        let child = {};
        child.type = 'rect';
        child.shape = {};
        child.shape.x = start[0];
        child.shape.y = start[1];
        child.shape.width = size[0];
        child.shape.height = size[1];
        child.style = style;
        groupChildren.push(child);
        ++i;
    }

    return {
        type: 'group',
        children: groupChildren,
   };
}

function PC_renderItem_Consumption(params, api) {
    let style = api.style();
    let groupChildren = [];
    let totalTime = api.value(0);
    let index = params.dataIndex;
    let data_value = PlanCombinationChart._ConsumptionTimetableData[index].value;
    let i = 0;
    while (!isNaN(data_value[3 * i + 1])) {
        let start = api.coord([data_value[3 * i + 1], data_value[3 * i + 2]]);
        let size = api.size([data_value[3 * i + 3], totalTime]);
        let child = {};
        child.type = 'rect';
        child.shape = {};
        child.shape.x = start[0];
        child.shape.y = start[1];
        child.shape.width = size[0];
        child.shape.height = size[1];
        child.style = style;
        groupChildren.push(child);
        ++i;
    }

    return {
        type: 'group',
        children: groupChildren,
   };
}
