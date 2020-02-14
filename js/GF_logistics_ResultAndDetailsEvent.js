/**
 * 打印方案结果列表, 包括微调工具.
 * @param {Array.<Array>=} result_plan - 需要打印的方案, 默认按上次的方案打印
 * @param {string=} sortBy - 根据哪种方式进行排序, 默认按上次排序方式排序
 * @public
 */
function printResultsPlan(result_plan, sortBy) {
    ResultsPlan.print(result_plan, sortBy);
    FineTuning.print();
    
    //如果已经在MissionTable选择了四个关卡, 且这四个关卡就是result_plan的某一个方案, 则高亮
    let selectedMissions = MissionsDetails.getSelectedMissions();
    if (selectedMissions.length === 4)
        highlightResultsPlanRow(selectedMissions);
}

/**
 * 按照排序方式重新打印方案结果列表, 包括微调工具.
 * @param {string} sortBy - 根据哪种方式进行排序
 */
function sortResultsPlan(sortBy) {
    let result_plan = ResultsPlan.getLastResultsPlan();
    printResultsPlan(result_plan, sortBy);
}

/**
 * 若排序结果的某一方案满足missionsName, 高亮
 * @param {Array.<string>} missionsName - 4个关卡名称
 */
function highlightResultsPlanRow(missionsName) {
    const result_plan = ResultsPlan.getLastResultsPlan().slice();
    const result_plan_length = result_plan.length;
    for (let i = 0; i < result_plan_length; i++) {
        if (missionsName[0] === result_plan[i][1] && missionsName[1] === result_plan[i][2] &&
            missionsName[2] === result_plan[i][3] && missionsName[3] === result_plan[i][4]) {
                $("#print_result_plan_tr_" + i).addClass("success");
                break;
            }
    }
}

/**
 * 点击某行的事件
 * @param {number} Row - 点击的行数
 */
function ResultsPlan_clickRow(Row) {
    const row_JQ_selector = $("#print_result_plan_tr_" + Row);
    if (!row_JQ_selector.hasClass("success")) { //该行未被选中, 选中
        //若其他行已被选中, 取消之前的选择
        const result_plan = ResultsPlan.getLastResultsPlan();
        const result_plan_length = result_plan.length;
        for (let i = 0; i < result_plan_length; i++) {
            const planRow_JQ_selector = $("#print_result_plan_tr_" + i);
            if (planRow_JQ_selector.hasClass("success"))
                planRow_JQ_selector.removeClass("success");
        }

        row_JQ_selector.addClass("success");

        //取消之前选择
        let selectedMissions = MissionsDetails.getSelectedMissions(false);
        for (let i = 0; i < selectedMissions.length; i++) {
            const index = MissionsDetails.getMissionsTableRowIndex(selectedMissions[i]);
            $("#MissionTable_" + index).removeClass("success");
        }
        for (let i = 0; i < 4; i++) {
            selectedMissions[i] = result_plan[Row][i + 1];
        }

        MissionsDetails.setSelectedMissions(selectedMissions);
        printPlanDetails();
        for (let i = 0; i < 4; i++) {
            const index = MissionsDetails.getMissionsTableRowIndex(selectedMissions[i]);
            $("#MissionTable_" + index).addClass("success");
        }
    }
    else //该行已被选中, 取消选中
        row_JQ_selector.removeClass("success");
}

/**
 * 点击某行的事件
 * @param {number} Row - 点击的行数
 */
function MissionsDetails_clickRow(Row) {
    const row_JQ_selector = $("#MissionTable_" + Row);
    if (!row_JQ_selector.hasClass("success")) { //该行未被选中, 选中
        row_JQ_selector.addClass("success");
        //若已经选择了4个关卡, 则取消最开始选中的关卡
        const selectedMissions = MissionsDetails.getSelectedMissions(false);
        if (selectedMissions.length === 4) {
            const firstSelectedMissionIndex = MissionsDetails.getMissionsTableRowIndex(selectedMissions[0]);
            $("#MissionTable_" + firstSelectedMissionIndex).removeClass("success");
            MissionsDetails.deleteSelectedMission();
        }

        const missionName = MissionsDetails.getMissionsTable("quick")[Row][0];
        MissionsDetails.selectMission(missionName);
        printPlanDetails();

        //若已经选择了4个关卡, 则这四个关卡可能为排序结果的某一方案, 高亮那个方案
        if (selectedMissions.length >= 3 && hasResultPlan()) {
            const selectedMissions = MissionsDetails.getSelectedMissions();
            highlightResultsPlanRow(selectedMissions);
        }
    }
    else { //该行已被选中, 取消选中
        row_JQ_selector.removeClass("success");
        const missionName = MissionsDetails.getMissionsTable("quick")[Row][0];
        MissionsDetails.deleteSelectedMission(missionName);
        printPlanDetails();

        //若存在排序结果, 也取消排序结果的高亮
        if (hasResultPlan()) {
            const result_plan_length = ResultsPlan.getLastResultsPlan().length;
            for (let i = 0; i < result_plan_length; i++) {
                let tr_selector = $("#print_result_plan_tr_" + i);
                if (tr_selector.hasClass("success"))
                    tr_selector.removeClass("success");
            }
        }
    }
}