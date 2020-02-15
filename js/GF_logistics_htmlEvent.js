function is_KeyIsEnter(e) {
    return e.which == 13;
}

//language
$(function() {
    $("#lang-zh-CN").on("click", function() {changeLanguage("zh-CN");});
    $("#lang-zh-TW").on("click", function() {changeLanguage("zh-TW");});
    $("#lang-en").on("click", function() {changeLanguage("en");});
});

//Config
$(function() {
    $("#Config_export").on("click", function() {config_export();});
    $("#Config_importButton").on("click", function() {
        let input_JQ_selector = $("#Config_importInput");
        const input = input_JQ_selector.val();
        setPageByImport(input);
        input_JQ_selector.val("");
    });
});

//Never Show Again
$(function() {
    $("#neverShowAgain_description").on("click", function() {
        storageSetItem("Description_Display", false);
        document.getElementById("description").style.display = "none";
    });
    $("#neverShowAgain_localstorageWarning").on("click", function() {
        storageSetItem("LocalstorageWarning_Display", false);
        document.getElementById("localstorageWarning").style.display = "none";
    });
});

//Tab
$(function() {
    $("#Tab_Anytime_name").on("click", function() {
        let ShownTab = getShownTab();
        if (ShownTab.name !== "Anytime")
            ChangeTab_Anytime();
    });
    $("#Tab_Timetable_name").on("click", function() {
        let ShownTab = getShownTab();
        if (ShownTab.name !== "Timetable")
            ChangeTab_Timetable();
    });
});

//Hourly Total
$(function() {
    $("input[id^=Display_]").on("click", function() {
        if (is_CalculateByHour())
            changeCalculateOutput_Hourly();
        else
            changeCalculateOutput_Total();
    });
    $("#Display_PerHour_text").on("keyup", function(e){
        if (is_KeyIsEnter(e)) {
            document.getElementById("Display_PerHour").checked = true;
            changeCalculateOutput_Hourly();
        }
    });
    $("#Display_Total_text").on("keyup", function(e){
        if (is_KeyIsEnter(e)) {
            document.getElementById("Display_Total").checked = true;
            changeCalculateOutput_Total();
        }
    });
});

//GreatSuccess
$(function() {
    let JQ_selector_GreatSuccessRate = $("#GreatSuccessRate");
    JQ_selector_GreatSuccessRate.on("input propertychange",function() {
        const Rate = Input_getGreatSuccessRate();
        const is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP, false);
        const TotalRate = Rate + Input_getGreatSuccessUpRate(Rate);
        setQContract(TotalRate);
        MissionsDetails.print();
        printPlanDetails();
    });
    JQ_selector_GreatSuccessRate.blur(function() {
        const Rate = Input_getGreatSuccessRate();
        storageSetItem("GreatSuccessRate", Rate);
    });
    $("#GreatSuccessRateUp").on("click", function() {
        const is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP);
        const TotalRate = Input_getTotalGreatSuccessRate(true);
        setQContract(TotalRate);
        MissionsDetails.print();
        printPlanDetails();
        storageSetItem("Is_GreatSuccessRateUP", is_RateUP);
    });
});

//ChapterLimit
$(function() {
    $("#ChapterLimit").on("change", function() {
        MissionsDetails.print();
        printPlanDetails();
        storageSetItem("ChapterLimit", Input_getSelectChapter());
    });
});

//Tab_Anytime
$(function() {
    let JQ_selector_Time_Anytime_hours = $("#Time_Anytime_hours");
    let JQ_selector_Time_Anytime_minutes = $("#Time_Anytime_minutes");
    let JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes = $("#Tab_Anytime_MinimumIntervalTime_minutes");
    JQ_selector_Time_Anytime_hours.on("input propertychange", function() {
        var TotalTime = Input_getAnytimeTotalTime();
        if (TotalTime > 4320)
            Input_setAnytimeTotalTime(4320);
        MissionsDetails.print();
        printPlanDetails();
    });
    JQ_selector_Time_Anytime_hours.blur(function() {Tab_Anytime_changeStorageCustom();});
    JQ_selector_Time_Anytime_minutes.on("input propertychange", function() {
        var TotalTime = Input_getAnytimeTotalTime();
        if (TotalTime > 4320)
            Input_setAnytimeTotalTime(4320);
        MissionsDetails.print();
        printPlanDetails();
    });
    JQ_selector_Time_Anytime_minutes.blur(function() {Tab_Anytime_changeStorageCustom();});
    JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes.on("input propertychange", function() {
        MissionsDetails.print();
        printPlanDetails();
    });
    JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes.blur(function() {Tab_Anytime_changeStorageCustom();});
});
function Tab_Anytime_changeStorageCustom() {
    let tab = new Tab_Anytime;
    storageSetItem("TabAnytimeCustom", tab.getSavedCustom());
}
//End Tab_Anytime

//Tab_Timetable
$(function() {
    let JQ_selector_Time_Timetable_hours = $("#Time_Timetable_hours");
    let JQ_selector_Time_Timetable_minutes = $("#Time_Timetable_minutes");
    JQ_selector_Time_Timetable_hours.on("input propertychange",function() {Tab_Timetable_changeSliderTotalTime();});
    JQ_selector_Time_Timetable_hours.blur(function() {Tab_Timetable_changeStorageCustom();});
    JQ_selector_Time_Timetable_minutes.on("input propertychange",function() {Tab_Timetable_changeSliderTotalTime();});
    JQ_selector_Time_Timetable_minutes.blur(function() {Tab_Timetable_changeStorageCustom();});
    let JQ_selector_Tab_Timetable_new_hours = $("#Tab_Timetable_new_hours");
    let JQ_selector_Tab_Timetable_new_minutes = $("#Tab_Timetable_new_minutes");
    JQ_selector_Tab_Timetable_new_hours.keyup(function(e) {
        if (is_KeyIsEnter(e))
            JQ_selector_Tab_Timetable_new_minutes.focus();
    });
    JQ_selector_Tab_Timetable_new_minutes.keyup(function(e) {
        if (is_KeyIsEnter(e)) {
            if (JQ_selector_Tab_Timetable_new_hours.val() !== "")
                JQ_selector_Tab_Timetable_new_hours.focus();
            Tab_Timetable_AddNew();
        }
    });
    $("#Tab_Timetable_AddNewTimePoint").on("click", function() {Tab_Timetable_AddNew();});
    $("#Tab_Timetable_range").on("click", "button[id^=Tab_Timetable_range_thumb_]", function() {
        let time = parseFloat(stringSliceFromLast_(this.id));
        Tab_Timetable_DeleteThisTimePoint(time);
        MissionsDetails.print();
        printPlanDetails();
        Tab_Timetable_changeStorageCustom();
    });
    $("#tab_Timetable_deleteall").on("click", function() {
        Tab_Timetable_DeleteAllTimePoint();
        MissionsDetails.print();
        printPlanDetails();
        Tab_Timetable_changeStorageCustom();
    });
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
            alert(language.JS.tab_Timetable_alert1);
            break;
        case newTime > TotalTime:
            alert(language.JS.tab_Timetable_alert2);
            break;
        case newTime === TotalTime || Tab_Timetable_TIMELIST.indexOf(newTime) !== -1:
            alert(language.JS.tab_Timetable_alert3);
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
    Tab_Timetable_changeStorageCustom();
}
//End Tab_Timetable

//Target
$(function() {
    let JQ_selector_target = $("#target");
    JQ_selector_target.on("click", "button[id^=setTarget_]", function() {
        setTarget(stringSliceFromLast_(this.id));
    });
    $("#ContractWeight").change(function() {
        storageSetItem("ContractWeight", Input_getContractWeight());
    });
    JQ_selector_target.on("click", "button[id^=Target_minus_]", function() {ChangeTarget(this.id);});
    JQ_selector_target.on("click", "button[id^=Target_plus_]", function() {ChangeTarget(this.id);});
    JQ_selector_target.on("blur", "#MT", function() {TargetChangeStorage();});
    JQ_selector_target.on("keyup", "#MT", function(e) {
        if (is_KeyIsEnter(e))
            $("#AT").focus();
    });
    JQ_selector_target.on("blur", "#AT", function() {TargetChangeStorage();});
    JQ_selector_target.on("keyup", "#AT", function(e) {
        if (is_KeyIsEnter(e))
            $("#RT").focus();
    });
    JQ_selector_target.on("blur", "#RT", function() {TargetChangeStorage();});
    JQ_selector_target.on("keyup", "#RT", function(e) {
        if (is_KeyIsEnter(e))
            $("#PT").focus();
    });
    JQ_selector_target.on("blur", "#PT", function() {TargetChangeStorage();});
    JQ_selector_target.on("keyup", "#PT", function(e) {
        if (is_KeyIsEnter(e))
            $("#TT").focus();
    });
    JQ_selector_target.on("blur", "#TT", function() {TargetChangeStorage();});
    JQ_selector_target.on("keyup", "#TT", function(e) {
        if (is_KeyIsEnter(e))
            $("#ET").focus();
    });
    JQ_selector_target.on("blur", "#ET", function() {TargetChangeStorage();});
    JQ_selector_target.on("keyup", "#ET", function(e) {
        if (is_KeyIsEnter(e))
            $("#QPT").focus();
    });
    JQ_selector_target.on("blur", "#QPT", function() {TargetChangeStorage();});
    JQ_selector_target.on("keyup", "#QPT", function(e) {
        if (is_KeyIsEnter(e))
            $("#QRT").focus();
    });
    JQ_selector_target.on("blur", "#QRT", function() {TargetChangeStorage();});
});
function TargetChangeStorage() {
    storageSetItem("TargetValue", Input_getTarget_Correct());
}
//End Target

//start_ranking
$(function() {
    $("#start_ranking").on("click", function() {start_ranking();});
    $("#clear_ranking").on("click", function() {
        delete_rankingResults();
        HTML_AllowRankingInput();
    });
});

//Result Plan
$(function() {
    //排序结果点击
    let JQ_selector_Plan_Table = $("#Plan_Table");
    JQ_selector_Plan_Table.on("click", "tr[id^=print_result_plan_tr_]", function() {
        ResultsPlan_clickRow(parseInt(stringSliceFromLast_(this.id)));
    });
    JQ_selector_Plan_Table.on("keyup", "tr[id^=print_result_plan_tr_]", function(e) {
        if (is_KeyIsEnter(e))
            ResultsPlan_clickRow(parseInt(stringSliceFromLast_(this.id)));
    });
    //对排序结果某一项排序
    JQ_selector_Plan_Table.on("click", "th[id^=resultPlan_]", function() {
        _PlanSort(this.id);
    });
    JQ_selector_Plan_Table.on("keyup", "th[id^=resultPlan_]", function(e) {
        if (is_KeyIsEnter(e))
            _PlanSort(this.id);
    });
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
$(function() {
    let JQ_selector_FineTuning = $("#FineTuning");
    JQ_selector_FineTuning.on("click", "button[id^=FineTuning_minus_]", function() {fineTuning_rank(-1, stringSliceFromLast_(this.id));});
    JQ_selector_FineTuning.on("click", "button[id^=FineTuning_plus_]", function() {fineTuning_rank(1, stringSliceFromLast_(this.id));});
});

//Saved
$(function() {
    let JQ_selector_Saved_heading = $("#Saved_heading");
    JQ_selector_Saved_heading.on("keyup", function(e) {
        if (is_KeyIsEnter(e)) {
            if ($("#Saved_heading").attr("aria-expanded") === "false") {
                $("#MissionTable_panel").collapse("hide");
                $("#Saved").collapse("show");
            }
            else
                $("#Saved").collapse("hide");
        }
    });
    JQ_selector_Saved_heading.on("click", function() {
        if ($("#Saved_heading").attr("aria-expanded") === "false") {
            $("#MissionTable_panel").collapse("hide");
            $("#Saved").collapse("show");
        }
        else
            $("#Saved").collapse("hide");
    });
    $("#importSaved_importButton").on("click", function() {
        const input_selector = $("#importSaved_input");
        const input = input_selector.val();
        Saved.import(input);
        input_selector.val("");
    });
    let JQ_selector_Saved_Body = $("#Saved_Body");
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_apply_]", function() {Saved.apply(parseInt(stringSliceFromLast_(this.id)));});
    JQ_selector_Saved_Body.on("keydown", "input[id^=SavedTable_name_]", function(e) {
        if (is_KeyIsEnter(e)) {
            $("#" + this.id).attr("readOnly", true);
            let row = stringSliceFromLast_(this.id);
            if (this.value !== Saved.getSaved()[row].name)
                Saved.rename(this.value, row);
        }
    });
    JQ_selector_Saved_Body.on("blur", "input[id^=SavedTable_name_]", function() {
        $("#" + this.id).attr("readOnly", true);
        let row = stringSliceFromLast_(this.id);
        if (this.value !== Saved.getSaved()[row].name)
            Saved.rename(this.value, row);
    });
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_rename_]", function() {
        const Row = parseInt(stringSliceFromLast_(this.id));
        const JQ_selector = $("#SavedTable_name_" + Row);
        JQ_selector.attr("readOnly", false);
        JQ_selector.focus();
        JQ_selector.select();
    });
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_up_]", function() {Saved.upThisRow(parseInt(stringSliceFromLast_(this.id)));});
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_down_]", function() {Saved.downThisRow(parseInt(stringSliceFromLast_(this.id)));});
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_export_]", function() {Saved.export(parseInt(stringSliceFromLast_(this.id)));});
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_delete_]", function() {Saved.deleteThisRow(parseInt(stringSliceFromLast_(this.id)));});
});
//End Saved

//MissionTable
$(function() {
    let JQ_selector_MissionTable_heading = $("#MissionTable_heading");
    let JQ_selector_MissionTable_panel = $("#MissionTable_panel");
    JQ_selector_MissionTable_heading.on("keyup", function(e) {
        if (is_KeyIsEnter(e)) {
            if (JQ_selector_MissionTable_panel.attr("aria-expanded") === "false") {
                JQ_selector_MissionTable_panel.collapse("show");
                $("#Saved").collapse("hide");
            }
            else
                JQ_selector_MissionTable_panel.collapse("hide");
        }
    });
    JQ_selector_MissionTable_heading.on("click", function() {
        if (JQ_selector_MissionTable_panel.attr("aria-expanded") === "false") {
            JQ_selector_MissionTable_panel.collapse("show");
            $("#Saved").collapse("hide");
        }
        else
            JQ_selector_MissionTable_panel.collapse("hide");
    });
    $("th[id^=MissionTable_head_]").on("click", function() {
        MissionsDetails.print(stringSliceFromLast_(this.id));
    });
    $("th[id^=MissionTable_head_]").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            MissionsDetails.print(stringSliceFromLast_(this.id));
    });
    JQ_selector_MissionTable_panel.on("click", "tr[id^=MissionTable_]", function() {
        let row = parseInt(stringSliceFromLast_(this.id));
        MissionsDetails_clickRow(row);
    });
    JQ_selector_MissionTable_panel.on("keyup", "tr[id^=MissionTable_]", function(e) {
        if (is_KeyIsEnter(e)) {
            let row = parseInt(stringSliceFromLast_(this.id));
            MissionsDetails_clickRow(row);
        }
    });
});
//End MissionTable

//Saved MissionTable Panel
$(function() {
    let JQ_selector_MissionTable_panel = $("#MissionTable_panel");
    JQ_selector_MissionTable_panel.on("shown.bs.collapse", function() {
        storageSetItem("IsSavedPanelShow", false);
    });
    JQ_selector_MissionTable_panel.on("hidden.bs.collapse", function() {
        if (!IsMobile())
            document.getElementById("MissionTable_panel").style.transition = "";
    });
    $("#Saved").on("shown.bs.collapse", function() {
        storageSetItem("IsSavedPanelShow", true);
        if (!IsMobile())
            document.getElementById("Saved").style.transition = "";
    });
});
//End Saved MissionTable Panel

//Plan Details
$(function() {
    $("#savePlan").on("click", function() {Saved.saveThisPlan();});
    $("#Capture").on("click", function() {
        html2canvas(document.getElementById("PlanDetails"), {logging:false,scale:1}).then(function(canvas) {
            let link = document.createElement("a");
            link.href = canvas.toDataURL();
            link.download = "Capture.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
    $("#PlanDetails_InputStartTime").on("input propertychange", function() {
        if (MissionsDetails.getSelectedMissions(false).length === 0)
            return;
        let selectedMissions = MissionsDetails.getSelectedMissionsDetails();
        let ShownTab = getShownTab();
        let TotalMinutes = ShownTab.getTotalTime(false);
        PlanDetails.printChart(selectedMissions, TotalMinutes, Input_getStartTime());
    });
    $("#PlanDetails_InputExecutionTimes").on("input propertychange", function() {
        PlanDetails.printExecutionTimes(Input_getExecutionTimes());
        if (MissionsDetails.getSelectedMissions(false).length !== 0) {
            let selectedMissions = MissionsDetails.getSelectedMissionsDetails();
            let ShownTab = getShownTab();
            let TotalMinutes = ShownTab.getTotalTime(false);
            let ExecutionTimes = Input_getExecutionTimes();
            PlanDetails.printMissionsTotal(selectedMissions, TotalMinutes, ExecutionTimes, ShownTab.name);
        }
    });
});
//End Plan Details

//calcTargetValueTool
$(function() {
    $("#calcTargetValueTool_clear").on("click", function() {calcTargetValueTool_Clear();});
    $("#calcTargetValueTool_startCalc").on("click", function() {calcTargetValueTool_startCalc();});
    $("#calcTargetValueTool_apply").on("click", function() {calcTargetValueTool_apply();});
    $("input[id^=calcTargetValueTool_Target_]").on("blur", function() {storageSetItem("CalcTargetValueTool_Target", Input_getCalcTargetValueTool_Target());});
    $("input[id^=calcTargetValueTool_Current_]").on("blur", function() {storageSetItem("CalcTargetValueTool_Current", Input_getCalcTargetValueTool_Current());});
    $("#calcTargetValueTool_InputExecutionTimes").on("blur", function() {storageSetItem("CalcTargetValueTool_ExecutionTimes", Input_getCalcTargetValueTool_InputExecutionTimes());});
    $("#calcTargetValueTool_Target_Manp").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Target_Ammu").focus();
    });
    $("#calcTargetValueTool_Target_Ammu").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Target_Rati").focus();
    });
    $("#calcTargetValueTool_Target_Rati").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Target_Part").focus();
    });
    $("#calcTargetValueTool_Target_Part").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Target_TPro").focus();
    });
    $("#calcTargetValueTool_Target_TPro").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Target_Equi").focus();
    });
    $("#calcTargetValueTool_Target_Equi").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Target_QPro").focus();
    });
    $("#calcTargetValueTool_Target_QPro").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Target_QRes").focus();
    });
    $("#calcTargetValueTool_Target_QRes").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Current_Manp").focus();
    });
    $("#calcTargetValueTool_Current_Manp").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Current_Ammu").focus();
    });
    $("#calcTargetValueTool_Current_Ammu").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Current_Rati").focus();
    });
    $("#calcTargetValueTool_Current_Rati").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Current_Part").focus();
    });
    $("#calcTargetValueTool_Current_Part").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Current_TPro").focus();
    });
    $("#calcTargetValueTool_Current_TPro").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Current_Equi").focus();
    });
    $("#calcTargetValueTool_Current_Equi").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Current_QPro").focus();
    });
    $("#calcTargetValueTool_Current_QPro").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_Current_QRes").focus();
    });
    $("#calcTargetValueTool_Current_QRes").on("keyup", function(e) {
        if (is_KeyIsEnter(e))
            $("#calcTargetValueTool_InputExecutionTimes").focus();
    });
//End calcTargetValueTool
});