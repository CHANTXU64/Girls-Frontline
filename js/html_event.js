function is_KeyIsEnter(e) {
    return e.which == 13;
}

$(function () {
    window.onresize = function () {
        if (window.PLAN_COMBINATION) {
            PlanCombinationChart.resize_Timetable();
        }
    }
})

//language
$("#lang-zh-CN").on("click", function () {
    changeLanguage("zh-CN");
});
$("#lang-zh-TW").on("click", function () {
    changeLanguage("zh-TW");
});
$("#lang-en").on("click", function () {
    changeLanguage("en");
});

$("#help").on("click", function () {
    let help_wiki = language.help_wiki;
    window.open(help_wiki, "_blank");
});

//Config
$("#Config_export").on("click", function () {
    if ($("#Config_export").attr("aria-expanded") !== "true")
        config_export();
});
$("#Config_importInput").on("keyup", function (e) {
    if (is_KeyIsEnter(e))
        Config_import();
});
$("#Config_importButton").on("click", function () {
    Config_import();
});
$("#Config_export_group").on("shown.bs.dropdown", function () {
    let exportInput = $("#Config_exportInput");
    exportInput.focus();
    exportInput.select();
});
function Config_import() {
    let input_JQ_selector = $("#Config_importInput");
    const input = input_JQ_selector.val();
    setPageByImport(input);
    input_JQ_selector.val("");
}

//Never Show Again
$("#neverShowAgain_description").on("click", function () {
    storageSetItem("Description_Display", false);
    // document.getElementById("description").style.display = "none";
});
$("#neverShowAgain_localstorageWarning").on("click", function () {
    storageSetItem("LocalstorageWarning_Display", false);
    // document.getElementById("localstorageWarning").style.display = "none";
});

//Tab
$("#Tab_Anytime_name").on("click", function () {
    let ShownTab = getShownTab();
    if (ShownTab.name !== "Anytime")
        ChangeTab_Anytime();
});
$("#Tab_Timetable_name").on("click", function () {
    let ShownTab = getShownTab();
    if (ShownTab.name !== "Timetable")
        ChangeTab_Timetable();
});

//Hourly Total
$("input[id^=Display_]").on("click", function () {
    if (is_CalculateByHour()) {
        if (DISPLAY_BY_TOTAL === true) {
            changeCalculateOutput_Hourly();
            DISPLAY_BY_TOTAL = false;
        }
    }
    else {
        if (DISPLAY_BY_TOTAL === false) {
            changeCalculateOutput_Total();
            DISPLAY_BY_TOTAL = true;
        }
    }
});

//GreatSuccess
let JQ_selector_GreatSuccessRate = $("#GreatSuccessRate");
JQ_selector_GreatSuccessRate.on("input propertychange", function () {
    const is_RateUP = IsGreatSuccessRateUp();
    Input_setGreatSuccessUpRate(is_RateUP, false);
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
});
JQ_selector_GreatSuccessRate.blur(function () {
    const Rate = Input_getGreatSuccessRate();
    storageSetItem("GreatSuccessRate", Rate);
});
$("#GreatSuccessRateUp").on("click", function () {
    const is_RateUP = IsGreatSuccessRateUp();
    Input_setGreatSuccessUpRate(is_RateUP);
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
    storageSetItem("Is_GreatSuccessRateUP", is_RateUP);
});

//ChapterLimit
$("#ChapterLimit").on("change", function () {
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
    storageSetItem("ChapterLimit", Input_getSelectChapter());
});

//Tab_Anytime
let JQ_selector_Time_Anytime_hours = $("#Time_Anytime_hours");
let JQ_selector_Time_Anytime_minutes = $("#Time_Anytime_minutes");
let JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes = $("#Tab_Anytime_MinimumIntervalTime_minutes");
JQ_selector_Time_Anytime_hours.on("input propertychange", function () {
    var TotalTime = Input_getAnytimeTotalTime();
    if (TotalTime > 4320)
        Input_setAnytimeTotalTime(4320);
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
});
JQ_selector_Time_Anytime_hours.blur(function () {
    Tab_Anytime_changeStorageCustom();
});
JQ_selector_Time_Anytime_minutes.on("input propertychange", function () {
    var TotalTime = Input_getAnytimeTotalTime();
    if (TotalTime > 4320)
        Input_setAnytimeTotalTime(4320);
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
});
JQ_selector_Time_Anytime_minutes.blur(function () {
    Tab_Anytime_changeStorageCustom();
});
JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes.on("input propertychange", function () {
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
});
JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes.blur(function () {
    Tab_Anytime_changeStorageCustom();
});
function Tab_Anytime_changeStorageCustom() {
    let tab = new Tab_Anytime;
    storageSetItem("TabAnytimeCustom", tab.getSavedCustom());
}
//End Tab_Anytime

//Tab_Timetable
let JQ_selector_Time_Timetable_hours = $("#Time_Timetable_hours");
let JQ_selector_Time_Timetable_minutes = $("#Time_Timetable_minutes");
JQ_selector_Time_Timetable_hours.on("input propertychange", function () {
    Tab_Timetable_changeSliderTotalTime();
    Saved.cancelSelected();
});
JQ_selector_Time_Timetable_hours.blur(function () {
    Tab_Timetable_changeStorageCustom();
});
JQ_selector_Time_Timetable_minutes.on("input propertychange", function () {
    Tab_Timetable_changeSliderTotalTime();
    Saved.cancelSelected();
});
JQ_selector_Time_Timetable_minutes.blur(function () {
    Tab_Timetable_changeStorageCustom();
});
let JQ_selector_Tab_Timetable_new_hours = $("#Tab_Timetable_new_hours");
let JQ_selector_Tab_Timetable_new_minutes = $("#Tab_Timetable_new_minutes");
JQ_selector_Tab_Timetable_new_hours.keyup(function (e) {
    if (is_KeyIsEnter(e))
        JQ_selector_Tab_Timetable_new_minutes.focus();
});
JQ_selector_Tab_Timetable_new_minutes.keyup(function (e) {
    if (is_KeyIsEnter(e)) {
        if (JQ_selector_Tab_Timetable_new_hours.val() !== "")
            JQ_selector_Tab_Timetable_new_hours.focus();
        Tab_Timetable_AddNew();
    }
});
$("#Tab_Timetable_AddNewTimePoint").on("click", function () {
    Tab_Timetable_AddNew();
});
$("#Tab_Timetable_range").on("click", "button[id^=Tab_Timetable_range_thumb_]", function () {
    let time = parseFloat(stringSliceFromLast_(this.id));
    Tab_Timetable_DeleteThisTimePoint(time);
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
    Tab_Timetable_changeStorageCustom();
});
$("#tab_Timetable_deleteall").on("click", function () {
    Tab_Timetable_DeleteAllTimePoint();
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
    Tab_Timetable_changeStorageCustom();
});
function Tab_Timetable_changeStorageCustom() {
    let Tab = new Tab_Timetable;
    storageSetItem("TabTimetableCustom", Tab.getSavedCustom());
}
function Tab_Timetable_AddNew() {
    const newTime = Input_getTimetableNewTotalTime_Correct();
    const TotalTime = Input_getTimetableTotalTime();
    switch (true) {
        case newTime === 0:
            Modal.alert(language.JS.tab_Timetable_alert1);
            break;
        case newTime > TotalTime:
            Modal.alert(language.JS.tab_Timetable_alert2);
            break;
        case newTime === TotalTime || Tab_Timetable_TIMELIST.indexOf(newTime) !== -1:
            Modal.alert(language.JS.tab_Timetable_alert3);
            break;
        default:
            Tab_Timetable_AddNewTimePoint(newTime);
    }
    if (Tab_Timetable_TIMELIST.length === 0)
        Tab_Timetable_InputTotalTime_enable();
    else
        Tab_Timetable_InputTotalTime_disable();
    MissionsDetails.print();
    printPlanDetails();
    Saved.cancelSelected();
    Tab_Timetable_changeStorageCustom();
}
//End Tab_Timetable

//Target
$("#setTarget_saved").on("click", "a[id^=setTarget_row_]", function () {
    SetTargetSaved.click(parseInt(stringSliceFromLast_(this.id)));
});
$("#setTarget_saved").on("click", "button[id^=setTarget_close_row_]", function () {
    SetTargetSaved.delete(parseInt(stringSliceFromLast_(this.id)));
});
$("#setTarget_saved_button").on("click", function () {
    SetTargetSaved.save();
});
$("#setTarget_Clear").on("click", function () {
    Input_setTarget();
    Input_setContractWeight();
});
let JQ_selector_target = $("#target");
$("#ContractWeight").change(function () {
    storageSetItem("ContractWeight", Input_getContractWeight());
});
JQ_selector_target.on("click", "button[id^=Target_minus_]", function () {
    ChangeTarget(this.id);
});
JQ_selector_target.on("click", "button[id^=Target_plus_]", function () {
    ChangeTarget(this.id);
});
JQ_selector_target.on("blur", "#MT", function () {
    TargetChangeStorage();
});
JQ_selector_target.on("blur", "#AT", function () {
    TargetChangeStorage();
});
JQ_selector_target.on("blur", "#RT", function () {
    TargetChangeStorage();
});
JQ_selector_target.on("blur", "#PT", function () {
    TargetChangeStorage();
});
JQ_selector_target.on("blur", "#TT", function () {
    TargetChangeStorage();
});
JQ_selector_target.on("blur", "#ET", function () {
    TargetChangeStorage();
});
JQ_selector_target.on("blur", "#QPT", function () {
    TargetChangeStorage();
});
JQ_selector_target.on("blur", "#QRT", function () {
    TargetChangeStorage();
});
function TargetChangeStorage() {
    storageSetItem("TargetValue", Input_getTarget_Correct());
}
//End Target

//start_ranking
$("#start_ranking").on("click", function () {
    ranking_loading_start();
    setTimeout(start_ranking, 1);
    setTimeout(ranking_loading_end, 1);
});
$("#clear_ranking").on("click", function () {
    delete_rankingResults();
    HTML_AllowRankingInput();
});
function ranking_loading_start() {
    $("#start_ranking").attr("disabled", "true");
    document.getElementById("ranking_loading").style.display = "";
}
function ranking_loading_end() {
    document.getElementById("ranking_loading").style.display = "none";
    $("#start_ranking").removeAttr("disabled");
}

//Result Plan
//排序结果点击
let JQ_selector_Plan_Table = $("#Plan_Table");
JQ_selector_Plan_Table.on("click", "tr[id^=print_result_plan_tr_]", function () {
    ResultsPlan_clickRow(parseInt(stringSliceFromLast_(this.id)));
});
JQ_selector_Plan_Table.on("keyup", "tr[id^=print_result_plan_tr_]", function (e) {
    if (is_KeyIsEnter(e))
        ResultsPlan_clickRow(parseInt(stringSliceFromLast_(this.id)));
});
//对排序结果某一项排序
JQ_selector_Plan_Table.on("click", "th[id^=resultPlan_]", function () {
    _PlanSort(this.id);
});
JQ_selector_Plan_Table.on("keyup", "th[id^=resultPlan_]", function (e) {
    if (is_KeyIsEnter(e))
        _PlanSort(this.id);
});
function _PlanSort(elem_id) {
    var sortBy = stringSliceFromLast_(elem_id);
    if (sortBy === "Mission")
        sortBy = "Ranking";
    //如果重复点击同一排序方式, 跳过
    if (sortBy !== ResultsPlan.getLastSortBy())
        sortResultsPlan(sortBy);
}
//End Result Plan

//Fine Tuning Tool
let JQ_selector_FineTuning = $("#FineTuning");
JQ_selector_FineTuning.on("click", "button[id^=FineTuning_minus_]", function () {
    fineTuning_rank(-1, stringSliceFromLast_(this.id));
});
JQ_selector_FineTuning.on("click", "button[id^=FineTuning_plus_]", function () {
    fineTuning_rank(1, stringSliceFromLast_(this.id));
});

//Saved
$("#importSaved_input").on("keyup", function (e) {
    if (is_KeyIsEnter(e))
        Saved_import();
});
$("#importSaved_importButton").on("click", function () {
    Saved_import();
});
$("#exportSaved_button").on("click", function () {
    if ($("#exportSaved_button").attr("aria-expanded") !== "true")
        Saved.exportSelected();
});
const JQ_selector_Saved_renameInput = $("#renameSaved_input");
const JQ_selector_Saved_renameApplyButton = $("#renameSaved_applyButton");
$("#renameSaved_button").on("click", function () {
    if ($("#renameSaved_button").attr("aria-expanded") !== "true") {
        let name = Saved.getSelectedName();
        const input = JQ_selector_Saved_renameInput;
        input.removeClass("is-valid is-invalid");
        if (Saved.checkNameValid(name)) {
            input.addClass("is-valid");
            JQ_selector_Saved_renameApplyButton.removeAttr("disabled");
        }
        else {
            input.addClass("is-invalid");
            JQ_selector_Saved_renameApplyButton.attr("disabled", "true");
        }
        input.val(name);
        input.focus();
    }
});
JQ_selector_Saved_renameInput.on("keyup", function (e) {
    const input = JQ_selector_Saved_renameInput;
    let name = input.val();
    if (is_KeyIsEnter(e)) {
        if (Saved.checkNameValid(name))
            JQ_selector_Saved_renameApplyButton.click();
        return ;
    }
});
JQ_selector_Saved_renameInput.on("input propertychange", function () {
    const input = JQ_selector_Saved_renameInput;
    let name = input.val();
    input.removeClass("is-valid is-invalid");
    if (Saved.checkNameValid(name)) {
        input.addClass("is-valid");
        JQ_selector_Saved_renameApplyButton.removeAttr("disabled");
    }
    else {
        input.addClass("is-invalid");
        JQ_selector_Saved_renameApplyButton.attr("disabled", "true");
    }
});
JQ_selector_Saved_renameApplyButton.on("click", function () {
    Saved.renameSelected();
});
$("#moveSaved_up").on("click", function () {
    Saved.moveSelected_up();
});
$("#moveSaved_down").on("click", function () {
    Saved.moveSelected_down();
});
$("#deleteSaved").on("click", function () {
    Saved.deleteSelected();
});
let JQ_selector_Saved_Body = $("#Saved_Body");
JQ_selector_Saved_Body.on("click", "a[id^=SavedTable_row_]", function () {
    Saved.clickThisRow(parseInt(stringSliceFromLast_(this.id)));
});
JQ_selector_Saved_Body.on("keydown", "a[id^=SavedTable_row_]", function (e) {
    if (is_KeyIsEnter(e))
        Saved.clickThisRow(parseInt(stringSliceFromLast_(this.id)));
});
$("#exportSaved_group").on("shown.bs.dropdown", function () {
    $("#exportSaved_input").focus();
});
$("#renameSaved_group").on("shown.bs.dropdown", function () {
    JQ_selector_Saved_renameInput.focus();
});
function Saved_import() {
    const input_selector = $("#importSaved_input");
    const input = input_selector.val();
    Saved.import(input);
    input_selector.val("");
}
//End Saved

//MissionTable
$("th[id^=MissionTable_head_]").on("click", function () {
    MissionsDetails.print(stringSliceFromLast_(this.id));
});
$("th[id^=MissionTable_head_]").on("keyup", function (e) {
    if (is_KeyIsEnter(e))
        MissionsDetails.print(stringSliceFromLast_(this.id));
});
$("#MissionTable_tbody").on("click", "tr[id^=MissionTable_]", function () {
    let row = parseInt(stringSliceFromLast_(this.id));
    MissionsDetails_clickRow(row);
    Saved.cancelSelected();
});
$("#MissionTable_tbody").on("keyup", "tr[id^=MissionTable_]", function (e) {
    if (is_KeyIsEnter(e)) {
        let row = parseInt(stringSliceFromLast_(this.id));
        MissionsDetails_clickRow(row);
        Saved.cancelSelected();
    }
});
//End MissionTable

//Saved MissionTable Panel
let JQ_selector_MissionTable_card = $("#MissionTable_card");
JQ_selector_MissionTable_card.on("shown.bs.collapse", function () {
    storageSetItem("IsSavedPanelShow", false);
});
JQ_selector_MissionTable_card.on("hidden.bs.collapse", function () {
    if (!IsMobile())
        document.getElementById("MissionTable_card").style.transition = "";
});
$("#Saved_card").on("shown.bs.collapse", function () {
    storageSetItem("IsSavedPanelShow", true);
    if (!IsMobile())
        document.getElementById("Saved_card").style.transition = "";
});
//End Saved MissionTable Panel

//Plan Details
$("#savePlan").on("click", function () {
    Saved.saveThisPlan();
});
$("#Capture").on("click", function () {
    html2canvas(document.getElementById("PlanDetails"), {logging: false}).then(function (canvas) {
        let link = document.createElement("a");
        link.download = "Capture.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});
$("#PlanDetails_InputStartTime").on("input propertychange", function () {
    Saved.cancelSelected();
    if (MissionsDetails.getSelectedMissions(false).length === 0)
        return;
    let selectedMissions = MissionsDetails.getSelectedMissionsDetails();
    let ShownTab = getShownTab();
    let TotalMinutes = ShownTab.getTotalTime(false);
    PlanDetails.printChart(selectedMissions, TotalMinutes, Input_getStartTime());
});
$("#PlanDetails_InputExecutionTimes").on("input propertychange", function () {
    PlanDetails.printExecutionTimes(Input_getExecutionTimes());
    if (MissionsDetails.getSelectedMissions(false).length !== 0) {
        let selectedMissions = MissionsDetails.getSelectedMissionsDetails();
        let ShownTab = getShownTab();
        let TotalMinutes = ShownTab.getTotalTime(false);
        let ExecutionTimes = Input_getExecutionTimes();
        PlanDetails.printMissionsTotal(selectedMissions, TotalMinutes, ExecutionTimes, ShownTab.name);
    }
});
//End Plan Details

//按enter自动切换下一个input
$(".autoEnter").on("keyup", function (e) {
    if (is_KeyIsEnter(e)) {
        if (this.className.indexOf("autoEnterEnd") !== -1)
            return ;
        let autoEnterArray = $(".autoEnter");
        let length = autoEnterArray.length - 1;
        let index;
        for (let i = 0; i < length; ++i) {
            if (autoEnterArray[i] == this) {
                index = i;
                break;
            }
        }
        autoEnterArray[index + 1].focus();
    }
});

$("#version").on("click", function () {
    showAllReleaseNotes();
})
